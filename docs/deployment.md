# Deployment

The app is deployed on **Firebase Hosting** and live at **https://testing-bfc9f.web.app** (a custom domain, `sudorky.nl`, is planned — see below). Hosting serves the `build-all/` directory (configured in `firebase.json`); the deploy target is set in `.firebaserc` (`testing-bfc9f`).

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

`npm run build` outputs to `build-all/` (hard-coded in the build script and matched by `firebase.json`). The deploy ships that directory to the project named in `.firebaserc`.

## Hosting config (`firebase.json`)

Beyond the basics, `firebase.json` carries:

- **SPA rewrite** — `{ "source": "**", "destination": "/index.html" }`. Without it, client-side routes (`/about`, `/login`, `/Register`) return 404 on direct load or refresh, because Firebase looks for a matching file first. Real files (e.g. `robots.txt`) still take precedence over the rewrite.
- **Security headers** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, and a `Permissions-Policy`, applied to all responses.

## Custom domain (planned: sudorky.nl via GoDaddy)

No code or redeploy is needed — a custom domain just serves the existing deploy. The work is DNS plus two console steps:

1. **Firebase Console → Hosting → Add custom domain** → enter `sudorky.nl` (add `www.sudorky.nl` too if wanted).
2. Add the **TXT** ownership record Firebase shows, in **GoDaddy → My Products → DNS → Manage DNS**.
3. Once verified, add the **two A records** (Firebase's IPs) on the root (`@`). GoDaddy auto-parks the domain with its own `@` A record — delete that or it conflicts. Add the record Firebase specifies for `www`.
4. Wait for **SSL** to auto-provision (Let's Encrypt; usually under an hour).
5. **Add `sudorky.nl` (and `www`) to Authentication → Settings → Authorized domains**, or Google sign-in fails with `auth/unauthorized-domain`.

GoDaddy notes: use real **DNS records**, not **Domain Forwarding** (forwarding breaks SSL and SPA routing); `.nl` needs no special handling.

What carries over automatically: the rewrite, security headers, `robots.txt`, Firestore/RTDB rules, and `VITE_FIREBASE_AUTH_DOMAIN` (stays `testing-bfc9f.firebaseapp.com` — do not change it).
