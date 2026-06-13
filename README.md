# Sudorky

Sudorky is a combined web app that pairs a Sudoku puzzle game with a real-time group chat. The puzzle is open to everyone; the chat is gated behind Firebase authentication. It was built by merging two formerly standalone Create React App projects into a single Vite + React application.

**Live:** <https://testing-bfc9f.web.app> — see [docs/deployment.md](docs/deployment.md) for deploy and the planned custom domain.

## Features

- Email/password and Google sign-in (Firebase Authentication)
- User registration with a stored profile record
- Real-time group chat backed by Cloud Firestore
- Auto-generated Sudoku puzzles (a fresh puzzle on every load)
- One combined view: the Sudoku game is public, with the live chat unlocking once you sign in

## Tech stack

Vite 4 · React 18 (JSX) · React Router 6 · Firebase 9 (Authentication, Cloud Firestore, Realtime Database)

## Quick start

```bash
git clone https://github.com/JabbaghYounes/skribblenetwork.git
cd skribblenetwork
npm install
cp .env.example .env.local   # then fill in your Firebase web app config
npm run dev
```

The app serves on `http://localhost:5173` (or the next free port). It needs a configured Firebase project to function — see the setup and Firebase guides below.

## Documentation

Detailed guides live in the [`docs/`](docs/) folder:

- [Setup](docs/setup.md) — prerequisites, installation, environment variables, and scripts
- [Firebase](docs/firebase.md) — Firebase project configuration, auth providers, and security rules
- [Architecture](docs/architecture.md) — the three-package layout, routing, and project structure
- [Deployment](docs/deployment.md) — building and deploying to Firebase Hosting

## License

Released under the [MIT License](LICENSE).
