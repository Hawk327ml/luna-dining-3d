# Luna Dining — 3D Table Reservation

Interactive restaurant floor plan with **React Three Fiber**. Click a table, fill the form, and bookings persist in `localStorage`.

## Live

- **GitHub Pages:** https://hawk327ml.github.io/luna-dining-3d/
- Firebase Hosting (optional, when CLI auth works): https://luna-dining-3d.web.app

## Stack

- React 18 + Vite
- Tailwind CSS + DaisyUI (custom `luna` theme)
- Three.js via `@react-three/fiber` + `@react-three/drei`
- GitHub Pages (primary Live) · Firebase Hosting configs kept for optional later deploy

## Local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Deploy

### GitHub Pages (recommended)

Push to `main`. Actions builds and publishes automatically.

### Firebase Hosting (optional — anti-overwrite)

Only after `firebase login` works. Deploys **only** to site `luna-dining-3d` via target `luna`.

```bash
firebase use daisy-c2db8
firebase target:apply hosting luna luna-dining-3d
npm run build
firebase deploy --only hosting:luna
```

**Never** run bare `firebase deploy`.

After any Firebase deploy, spot-check:
- https://rosemary-care-notebook.web.app
- https://focusspace-3d.web.app (if used)
- https://luna-dining-3d.web.app (if used)

## Author

Hawk327ml · Multimedia Computing
