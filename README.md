# 3Business corporate portal — login prototype (Corporate_Portal)

Login pages only — copied from `3business-homepage-mockups/revamp/portal/`.

## Files

| File | Purpose |
|------|---------|
| `login-en.html` | English sign-in |
| `login.html` | Traditional Chinese sign-in |
| `css/newmain.css`, `css/portal-auth.css` | 3Business revamp + portal styles |
| `js/portal-auth.js` | Demo behaviour (no real auth) |
| `images/` | Logo + brand panel image |

Post-login hub, forgot-password pages, and full `npm run revamp` flow remain in:

`../3business-homepage-mockups/revamp/portal/`

## Deploy (Vercel)

| | URL |
|---|-----|
| GitHub | https://github.com/webbman2025/Corporate_Portal |
| Production | https://corporateportal-dusky.vercel.app |

Root `/` serves `login-en.html`. Traditional Chinese: `/login.html`.

## Preview locally

```bash
cd /Users/willcsh/Desktop/Corporate_Portal
npx --yes serve . -l 3460
```

- English: http://localhost:3460/login-en.html  
- 繁中: http://localhost:3460/login.html  

## Layout demo switcher

Bottom-right **Layout** control on login pages:

1. **3Business brand** — default split card (recommended).
2. **Marketing split** — Deel-style soft panel + floating form card.
3. **Hero + panel** — Vodafone-style full-height image + dark sign-in column.
4. **Dark + art split** — Epidemic-style dark form column + brand imagery (3Business colours).
5. **Centered card** — Klook-style blue brand canvas + white sign-in card.
6. **Card + promo** — Zoho-style split card; right panel is a **4-slide carousel** (security, billing, services, ASM support) with dots and auto-advance.
7. **Form + carousel** — Emergent-style split: sign-in left, gradient feature carousel right (prev/next, dots, auto-advance).

All variants use **3Business** tokens (`--blue`, `--teal`, logos, photography). Layout **1** stays the recommended default.

Choice is saved in `localStorage` for the session.

All layouts share a **mobile breakpoint** (≤899px): single-column stack, touch-friendly links, safe-area padding for the layout picker, and layout-specific tweaks (e.g. Zoho promo hidden, Emergent carousel band, Deel marketing panel in-flow).

### Login help UX (all layouts)

- **Forgot password** → `portal/forgot-*.html` prototype (reset flow).
- **First-time access** → opens **How do I get login details?** (`#help` accordion).
- **Need help?** → 3Business Contact Us.
- Help uses a native `<details>` disclosure with an in-panel chevron (not the browser’s default triangle on the border).

## Demo credentials

| Field | Value |
|-------|--------|
| Company / user ID | `demo` |
| Password | `demo123` |

Pre-filled on the login form. Any other non-empty ID + password also shows success in this prototype (except below).

- Password `fail` → error state.
- `?state=error` | `locked` | `timeout` → banner variants.

To redirect after sign-in to the full mock hub, set in the HTML script:

```html
<script>window.PORTAL_AUTH = { lang: "en", homeUrl: "../3business-homepage-mockups/revamp/portal/home-en.html" };</script>
```

(Only works when both folders are served from a common parent path.)
