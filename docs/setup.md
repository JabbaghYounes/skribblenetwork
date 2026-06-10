# Setup

## Prerequisites

- Node.js 18+ (developed on Node 25)
- npm — both `package-lock.json` and `yarn.lock` are checked in, but the commands here assume npm
- A Firebase project (for authentication and data) — see [Firebase](firebase.md)

## Installation

```bash
git clone https://github.com/JabbaghYounes/skribblenetwork.git
cd skribblenetwork
npm install
```

## Environment variables

Copy the example file and fill in your Firebase web app config:

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

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` (alias `npm run startLin`) | Start the Vite dev server |
| `npm run build` | Production build to `build-all/` |
| `npm run preview` | Preview the built output |

There is no lint, test, or standalone type-check step.

Once running, the app needs Firebase services configured to be functional — continue to [Firebase](firebase.md). To ship a build, see [Deployment](deployment.md).
