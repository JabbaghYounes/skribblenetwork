# Deployment

Hosting uses Firebase Hosting, which serves the `build-all/` directory (configured in `firebase.json`). The deploy target is set in `.firebaserc`.

## Prerequisites

Install the Firebase CLI if you don't have it, and sign in:

```bash
npm i -g firebase-tools
firebase login
```

## Build and deploy

```bash
npm run build
firebase deploy --only hosting
```

`npm run build` outputs to `build-all/` (this path is hard-coded in the build script and matched by `firebase.json`). The deploy ships that directory to the project named in `.firebaserc`.
