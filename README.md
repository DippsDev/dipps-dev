# dipps.dev

Personal portfolio site for [Dipako Thupayatlase](https://github.com/DippsDev) — a full-stack software engineer.

Work is presented as a scroll-linked filmstrip with editorial chrome, a WebGL wave field, and a folder for project filters.

## Tech stack

- [Next.js](https://nextjs.org/) 15 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- [Framer Motion](https://www.framer.com/motion/) for the filmstrip
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll
- [OGL](https://github.com/oframe/ogl) for the GradientWaves background
- [matter-js](https://brm.io/matter-js/) for the folder physics

## Project structure

```
app/
  layout.tsx          # Fonts, theme, sound, chrome, wave field
  page.tsx            # Work filmstrip
  globals.css         # Theme tokens and layout
components/
  WorkSection.tsx     # Sticky filmstrip
  WorkTimeline.tsx    # Bottom title, year, and ticks
  WorkProvider.tsx    # Filter and featured project state
  SiteChrome.tsx      # Header, folder, About/Contact
  FolderFloat.tsx     # Folder menu
  WaveField.tsx       # Theme-aware GradientWaves wrapper
  GradientWaves.tsx   # WebGL wave field
  SmoothScroll.tsx    # Lenis
  ThemeProvider.tsx   # Light/dark
  SoundProvider.tsx   # Background audio toggle
lib/
  projects.ts         # Project data and filters
```

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # ESLint
```
