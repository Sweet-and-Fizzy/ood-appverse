# AppVerse Browser

A React 19 application for browsing Open OnDemand apps and software. Can be used as a React component or embedded via CDN.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/appverse/`

## Live Demos

- **Standard React App:** https://ood-appverse-react.netlify.app/appverse/
- **CDN Embed Demo:** https://ood-appverse-react.netlify.app/demo/pretend-website/

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build standard app |
| `npm run build:lib` | Build embeddable UMD bundle |
| `npm run serve:demo` | Build library and serve demo |

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/appverse/` | SoftwareGrid | Main grid view with filters. Filter state syncs to URL params. |
| `/appverse/software/:id` | SoftwareDetail | Software detail with list of apps. Expanded README state syncs to URL params. |

## Usage

### React Component

```bash
npm install appverse-browser
```

```jsx
import { AppVerseBrowser } from 'appverse-browser'
import 'appverse-browser/style.css'

function MyApp() {
  return <AppVerseBrowser />
}
```

### CDN Embed

**Important:** Widget reads the current browser URL. Embed on pages at `/appverse/` or `/appverse/software/:id`.

```html
<div id="appverse"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.umd.js"></script>
<script>
  AppVerse.mount('appverse');
</script>
```

**Version pinning:**
- Production: `@1.0.0`
- Development: `@latest`

### API

```javascript
// React Component
<AppVerseBrowser />

// CDN Mount (production - uses BrowserRouter)
const instance = AppVerse.mount(elementId)

// CDN Mount (demo - uses HashRouter)
const instance = AppVerse.mount(elementId, { useHash: true })

// Cleanup
instance.unmount()
```

## How Routing Works

The widget supports two router modes:

**BrowserRouter (default, for production):**
- Widget reads current browser URL on mount
- Navigation updates URL without page reload
- Filter/README state syncs to URL params
- Catch-all redirects to `/appverse/`

**HashRouter (for demos, with `useHash: true` option):**
- Uses hash-based navigation (e.g., `#/appverse/`)
- Keeps base URL unchanged
- Useful for testing/demos on any path

**In Development:**
- `http://localhost:3000/appverse/` → Software grid
- `http://localhost:3000/appverse/software/123` → Software detail

**In Production (Drupal):**
- Drupal loads page at `/appverse/` or `/appverse/software/:id`
- Widget mounts with default BrowserRouter
- React Router handles all navigation after initial load

**On Netlify:**
- Standard app: https://ood-appverse-react.netlify.app/appverse/ (BrowserRouter)
- CDN demo: https://ood-appverse-react.netlify.app/demo/pretend-website/ (HashRouter)
- Both builds deployed together via `npm run build && npm run build:lib`

## Project Structure

```
src/
├── pages/
│   ├── SoftwareGrid.jsx      # /appverse/
│   └── SoftwareDetail.jsx    # /appverse/software/:id
├── lib/
│   └── mount.jsx              # CDN entry point
├── App.jsx                    # Routes
└── main.jsx                   # Dev entry point
```

## Design Tokens

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| Red | `#C91235` | `appverse-red` |
| Black | `#232323` | `appverse-black` |
| Light Gray | `#DDDEDF` | `appverse-gray` |
| Pink | `#F2E2E5` | `appverse-pink` |
| Blue | `#0076AF` | `appverse-blue` |
| Green | `#00857A` | `appverse-green` |
| Border Radius | 8px | `rounded-appverse` |

## Data Source

Drupal JSON:API endpoint:
```
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software
```

## Tech Stack

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 3

## License

MIT
