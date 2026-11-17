# 3Business corporate portal — UX prototype

**Scope:** Stakeholder-facing HTML only. **No real authentication**, APIs, or backend.

## Visual refresh (vs initial mock)

- **Split auth layout** on login: brand panel (gradient + `d1-kv5.webp`) + sign-in form
- **Homepage continuity**: `.grad` on portal title, eyebrow, mesh page background
- **Trust strip**: secure sign-in + portal terms
- **Hub polish**: icons, category accent borders, featured “Pay bill” card
- Prototype disclaimer moved here (not on visible login footer)

**Phase 2 (out of scope):** persistent app sidebar, MFA, full portal IA.

## Run locally

From repo root:

```bash
npm run revamp
```

| Page | URL |
|------|-----|
| 3Business homepage | http://localhost:3459/ |
| Sign in (EN) | http://localhost:3459/portal/login-en.html |
| Sign in (繁中) | http://localhost:3459/portal/login.html |
| Post-login hub (EN) | http://localhost:3459/portal/home-en.html |
| Post-login hub (TC) | http://localhost:3459/portal/home.html |
| Forgot / first-time (EN) | http://localhost:3459/portal/forgot-en.html |
| Forgot / first-time (TC) | http://localhost:3459/portal/forgot.html |

## What is faked

- Any non-empty ID + password signs in after a short delay (password `fail` → inline error).
- Hub task cards are not wired to the legacy production portal.
- Maintenance banner is illustrative.

## Stakeholder demo (≈3 min)

1. Open http://localhost:3459/ → **Corporate Portal**
2. Desktop: note split layout; resize to mobile (brand band + form).
3. Toggle **中文**.
4. Error states:
   - `login-en.html?state=error` | `locked` | `timeout`
   - Or password **`fail`**
5. Sign in → **home hub** (featured Pay bill card).
6. **Sign out**.

## Design system

- Base: `../css-new/newmain.css`
- Portal: `../css-new/portal-auth.css`
- Script: `portal-auth.js`

## Production baseline (reference)

Live sign-in on `corp.portal.three.com.hk` (legacy JSP login).
