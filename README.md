# Skribble Network

A combined web app that pairs a real-time group chat with a Sudoku puzzle game, behind Firebase authentication. It was built by merging two formerly standalone Create React App projects into a single Vite + React application.

## Features

- Email/password and Google sign-in (Firebase Authentication)
- User registration with a stored profile record
- Real-time group chat backed by Cloud Firestore
- Auto-generated Sudoku puzzles (a fresh puzzle on every load)
- One combined view: chat and the game side by side once you are signed in

## Tech stack

- **Build tool:** Vite 4
- **UI:** React 18 (JSX), React Router 6
- **Auth & data:** Firebase 9 — Authentication, Cloud Firestore, Realtime Database
- **Helpers:** react-firebase-hooks, react-google-button, random-seed, jQuery

## Architecture

This repo is a single Vite app that consumes two sub-projects through cross-package relative imports:

- **Outer app** (`./`, package name `join`) — owns routing, the login/register screens, and the top-level layout. This is the only package whose `package.json` drives the production build.
- **`Chat-live/`** — the chat UI (originally CRA + Tailwind). Pulled in by `src/GameAndChat/GameAndChat.jsx`.
- **`c-game/`** — the Sudoku game (originally CRA + TypeScript). Pulled in by the same component.

The sub-projects' own `package.json`, `node_modules`, and Firebase config files are **not** used at build time — everything compiles through the outer `package.json`. When adding a dependency that any sub-project imports, install it in the **root** `package.json`.

**Note on the Firebase SDKs:** the app initializes Firebase twice — `src/firebase.js` (compat API: Auth + Realtime Database) and `Chat-live/src/firebase.js` (modular v9 API: Auth + Firestore). Both point at the same project, so they share auth state. If you change auth-related code, check which import path is in play.

## Prerequisites

- Node.js 18+ (developed on Node 25)
- npm — both `package-lock.json` and `yarn.lock` are checked in, but the commands below assume npm
- A Firebase project (for authentication and data)

## Getting started

1. **Clone and install:**

   ```bash
   git clone https://github.com/JabbaghYounes/skribblenetwork.git
   cd skribblenetwork
   npm install
   ```

2. **Configure Firebase env vars.** Copy the example file and fill in your Firebase web app config:

   ```bash
   cp .env.example .env.local
   ```

   Values come from **Firebase Console > Project Settings > General > Your apps > Web app**. Without `.env.local`, the SDK initializes with `undefined` and silently fails.

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
   VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxxxxxx
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Firebase web API keys are not true secrets (security comes from security rules and authorized domains), but they are sourced from env to keep them out of version control.

3. **Run the dev server:**

   ```bash
   npm run dev
   ```

   Serves on `http://localhost:5173` (or the next free port).

## Firebase project setup

The app expects the following to be configured in your Firebase project. These settings live in the Firebase console only — they are **not** version-controlled in this repo, so each environment must apply them.

**Authentication > Sign-in method** — enable:
- Email/Password
- Google (requires a project support email to save)

**Cloud Firestore** — chat messages live in the `messages` collection. Suggested rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

**Realtime Database** — registration writes a `users/{uid}` record. Suggested rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

If you start from Firebase Test Mode, replace its temporary rules with the above before the 30-day window expires, otherwise reads/writes will start being denied.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` (alias `npm run startLin`) | Start the Vite dev server |
| `npm run build` | Production build to `build-all/` |
| `npm run preview` | Preview the built output |

There is no lint, test, or standalone type-check step.

## Deployment

Hosting uses Firebase Hosting, which serves the `build-all/` directory (configured in `firebase.json`). The deploy target is set in `.firebaserc`.

```bash
# one-time, if you don't have the CLI
npm i -g firebase-tools
firebase login

# build and deploy
npm run build
firebase deploy --only hosting
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Login |
| `/Register` | Register |
| `/App` | Combined chat + Sudoku (requires authentication; redirects to `/` if not signed in) |

## Project structure

```
skribblenetwork/
├── src/                  outer app (routing, auth screens, layout)
│   ├── App.jsx           routes + auth gate
│   ├── firebase.js       compat SDK (Auth + Realtime Database)
│   ├── login/            login screen
│   ├── register/         register screen
│   ├── SignIn.jsx        Google sign-in button
│   ├── naveBar/          top navigation
│   └── GameAndChat/      mounts the chat and game together
├── Chat-live/            chat sub-app (Cloud Firestore)
├── c-game/               Sudoku sub-app (TypeScript)
├── public/               static assets served as-is
├── firebase.json         hosting config (serves build-all/)
└── .firebaserc           Firebase deploy target
```
