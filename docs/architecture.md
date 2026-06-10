# Architecture

This repo is a single Vite app that consumes two sub-projects through cross-package relative imports.

## Three-package layout

- **Outer app** (`./`, package name `join`) — owns routing, the login/register screens, and the top-level layout. This is the only package whose `package.json` drives the production build.
- **`Chat-live/`** — the chat UI (originally CRA + Tailwind). Pulled in by `src/GameAndChat/GameAndChat.jsx`.
- **`c-game/`** — the Sudoku game (originally CRA + TypeScript). Pulled in by the same component.

The sub-projects' own `package.json`, `node_modules`, and Firebase config files are **not** used at build time — everything compiles through the outer `package.json`. When adding a dependency that any sub-project imports, install it in the **root** `package.json`.

For how Firebase is wired across these packages, see [Firebase](firebase.md).

## Routes

| Path | Screen |
| --- | --- |
| `/` | Combined Sudoku + chat — **public**. The game is open to all; the chat is gated inline (a sign-in overlay until you log in) |
| `/login` | Login |
| `/Register` | Register |
| `/about` | About |

## Project structure

```
skribblenetwork/
├── src/                  outer app (routing, auth screens, layout)
│   ├── App.jsx           routes
│   ├── firebase.js       compat SDK (Auth + Realtime Database)
│   ├── login/            login screen
│   ├── register/         register screen
│   ├── about/            about page
│   ├── SignIn.jsx        Google sign-in button
│   ├── naveBar/          top navigation
│   └── GameAndChat/      title bar, game, and chat (with ChatLocked sign-in overlay)
├── Chat-live/            chat sub-app (Cloud Firestore)
├── c-game/               Sudoku sub-app (TypeScript)
├── docs/                 project documentation
├── public/               static assets served as-is
├── firebase.json         hosting config (serves build-all/)
└── .firebaserc           Firebase deploy target
```
