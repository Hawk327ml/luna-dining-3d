# Luna Dining — 3D Table Reservation

Interactive restaurant floor with **React Three Fiber**. Click a table, complete the booking form, and reservations persist in `localStorage`.

**Portfolio:** https://hawk327ml.github.io/  
**Live:** https://luna-dining-3d.web.app · [GitHub Pages mirror](https://hawk327ml.github.io/luna-dining-3d/)

![Floor plan preview](docs/preview/floor-plan.png)

## What you can do

- Browse tables with **available / reserved** status in 3D
- Hover for scale feedback; click to select
- Submit name / party size / time via the booking form
- Persist bookings in the browser (`localStorage`) — demo only, no backend

## Stack

| Layer | Tech |
|-------|------|
| UI | React 18, Tailwind, DaisyUI (`luna` theme) |
| 3D | Three.js · `@react-three/fiber` · `@react-three/drei` |
| Build | Vite (`base: './'`) |
| Hosting | **Firebase** `luna-dining-3d` · GitHub Pages mirror |

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

### Firebase Hosting (primary)

```bash
npm run build
firebase deploy --only hosting:luna --project daisy-c2db8
```

**Never** run bare `firebase deploy`. After deploy, spot-check:
- https://rosemary-care-notebook.web.app
- https://focusspace-3d.web.app
- https://luna-dining-3d.web.app

### GitHub Pages (mirror)

Push to `main` → Actions publishes https://hawk327ml.github.io/luna-dining-3d/

## Author

Hawk327ml · Multimedia Computing · UPM
