# Firebase

The app expects the following to be configured in your Firebase project. These settings live in the Firebase console only — they are **not** version-controlled in this repo, so each environment must apply them.

## Authentication

Under **Authentication > Sign-in method**, enable:

- Email/Password
- Google (requires a project support email to save)

## Email verification

Registration (`src/register/register.jsx`) sends a verification link via `sendEmailVerification`. The chat is gated on `user.emailVerified`:

- signed out → `ChatLocked` (sign-in overlay)
- signed in, unverified → `ChatUnverified` (verify-email overlay with a resend button)
- signed in, verified → the live chat

Google sign-ins are auto-verified. **This gate is client-side only** — to enforce it server-side, add `request.auth.token.email_verified == true` to the Firestore `messages` rules below (note: that immediately blocks any currently-unverified account, including pre-existing ones, until they verify).

## Cloud Firestore

Chat messages live in the `messages` collection. Suggested rules:

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

## Realtime Database

Registration writes a `users/{uid}` record. Suggested rules:

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

## Two SDK initializations

The app initializes Firebase twice with different APIs:

- `src/firebase.js` — compat API (`firebase/compat/app`), exports `auth` (Authentication) and `database` (Realtime Database). Used by the login, register, and logout screens.
- `Chat-live/src/firebase.js` — modular v9 API, exports `auth` (Authentication) and `db` (Cloud Firestore). Used by the chat components, and also by `src/App.jsx` and `src/SignIn.jsx`.

Both point at the same project, so they share auth state. If you change auth-related code, check which import path is in play.

Google sign-in (`src/SignIn.jsx`) uses `signInWithPopup` rather than `signInWithRedirect`: the redirect flow bounces through the cross-origin auth handler at `your-project.firebaseapp.com`, which Chrome's bounce-tracking mitigation breaks (it silently drops the session on the way back), in both dev and production.
