# AppVerse Browser

A React 19 application for browsing Open OnDemand apps and software. Can be used as a React component or embedded via CDN.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/appverse/`

## Live Demo

https://ood-appverse-react.netlify.app/appverse/

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
| `/appverse/` | SoftwareHome | Main grid view with search and filters. |
| `/appverse/software/:uuid` | SoftwareDetail | Software detail with list of apps. |

**Note:** The `:uuid` is the Drupal node UUID (e.g., `097bde81-ab50-4be0-800e-d425d78d0817`).

### URL Parameters

| Page | Param | Purpose | Example |
|------|-------|---------|---------|
| Grid | `?topics=` | Filter by science domain | `?topics=Materials+Science` |
| Grid | `?type=` | Filter by app type | `?type=Interactive+Apps` |
| Grid | `?tags=` | Filter by tag | `?tags=singularity` |
| Detail | `?app=` | Expand README for specific app | `?app=469ded75-2b1f-...` |

Filter values use term **names** (not UUIDs). Multiple values: `?tags=singularity&tags=gpu`.

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

#### Drupal Embedding

The widget reads the browser URL to determine what to display. Drupal must serve pages at the expected paths.

**Required Drupal routes:**

| Drupal Path | What Widget Shows |
|-------------|-------------------|
| `/appverse/` | Software grid |
| `/appverse/software/*` | Software detail (wildcard catches any UUID) |

**Twig template example:**

```twig
{# templates/page--appverse.html.twig #}
{# Use for both /appverse/ and /appverse/software/* #}
<div id="appverse"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.umd.js"></script>
<script>
  AppVerse.mount('appverse');
</script>
```

**How it works:**
1. User visits `/appverse/` → Drupal serves the template → Widget shows grid
2. User clicks a tile → URL changes to `/appverse/software/uuid` (no page reload)
3. User shares link `/appverse/software/uuid` → Drupal serves template → Widget shows detail

**Note:** Client-side navigation (clicking tiles) does NOT reload the page. If you need full page reloads for each navigation, additional configuration would be needed.

### API

```javascript
// React Component
<AppVerseBrowser />

// CDN Mount
const instance = AppVerse.mount(elementId)
instance.unmount()
```

## How Routing Works

The widget uses React Router with `BrowserRouter`:

1. **On mount:** Widget reads current browser URL to determine view
2. **On navigation:** URL updates without page reload (client-side routing)
3. **On direct visit:** URL is read, correct view is shown

**Example URLs:**

| URL | What Shows |
|-----|------------|
| `/appverse/` | Grid with all software |
| `/appverse/?topics=Materials+Science` | Grid filtered by topic |
| `/appverse/software/097bde81-ab50-4be0-800e-d425d78d0817` | Abaqus detail page |
| `/appverse/software/097bde81-...?app=469ded75-...` | Detail with README expanded |

**Unmatched routes** redirect to `/appverse/`.

## Project Structure

```
src/
├── pages/
│   ├── SoftwareHome.jsx       # /appverse/
│   └── SoftwareDetail.jsx     # /appverse/software/:id
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

## Tech Stack

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 3

## License

MIT
