# AppVerse Browser

A React 19 application for browsing Open OnDemand apps and software. Can be used as a React component or embedded via CDN.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/#/`

## Live Demo

https://ood-appverse-react.netlify.app/#/

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build standard app |
| `npm run build:lib` | Build embeddable UMD bundle |
| `npm run serve:demo` | Build library and serve demo |

## Routes

Uses hash-based routing to avoid conflicts with server-side routing (e.g., Drupal).

| Route | Component | Purpose |
|-------|-----------|---------|
| `/#/` | SoftwareHome | Main grid view with search and filters. |
| `/#/:slug` | SoftwareDetail | Software detail by slug (e.g., `/#/abaqus`). |
| `/#/software/:uuid` | SoftwareDetail | Software detail by UUID (backward compatibility). |

**Slugs** are generated from software titles: `"AlphaFold"` → `alphafold`, `"LAMMPS"` → `lammps`.

### URL Parameters

| Page | Param | Purpose | Example |
|------|-------|---------|---------|
| Grid | `?topics=` | Filter by science domain | `/#/?topics=Materials+Science` |
| Grid | `?type=` | Filter by app type | `/#/?type=Interactive+Apps` |
| Grid | `?tags=` | Filter by tag | `/#/?tags=singularity` |
| Detail | `?app=` | Expand README for specific app | `/#/alphafold?app=icds-roar-ood--bc-osc-alphafold` |

Filter values use term **names** (not UUIDs). Multiple values: `?tags=singularity&tags=gpu`.

App slugs format: `org-name--app-title` (double hyphen separates org from title).

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

**Important:** Widget uses hash-based routing (`/#/...`). The server only needs to serve ONE page—all navigation happens via URL hash.

*Use Drupal "source" mode and add this to end of page (with updated commit hash)*
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@327e72c/dist/appverse.css">
<div id="appverse-root">
    &nbsp;
</div>
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@327e72c/dist/appverse.umd.js"></script><script>
  AppVerse.mount('appverse-root', {
    apiBaseUrl: '/jsonapi',
    siteBaseUrl: ''
  });
</script>
```

**Version pinning:**
- Production: `@1.0.0`
- Development: `@latest`

#### Drupal Embedding

With hash-based routing, Drupal only needs ONE page. All navigation happens via URL hash, which Drupal never sees.

**Required Drupal route:**

| Drupal Path | What Widget Shows |
|-------------|-------------------|
| `/appverse` | Everything! Hash routing handles the rest |

Example URLs (all served by the same Drupal page):
- `/appverse#/` → Software grid
- `/appverse#/abaqus` → Abaqus detail page
- `/appverse#/?tags=gpu` → Filtered grid

**Linking from Drupal content:**

When creating links to specific views within Drupal (menus, content, etc.), use the hash-based URLs:

| To link to... | Use this URL |
|---------------|--------------|
| Software grid | `/appverse#/` |
| Specific software | `/appverse#/abaqus` |
| Filtered grid | `/appverse#/?topics=Materials+Science` |
| Software with app README open | `/appverse#/alphafold?app=org-name--app-title` |

The `#` is required—it tells the browser to let the React widget handle routing instead of Drupal.

**Embed code for Drupal:**

In Drupal, create a Basic Page at `/appverse` with "Full HTML" text format. Click "Source" in the editor and paste:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.umd.js"></script>
<div id="appverse-root"></div>
<script>
  AppVerse.mount('appverse-root', {
    apiBaseUrl: '/jsonapi',
    siteBaseUrl: ''
  });
</script>
```

Replace `COMMIT_HASH` with the latest commit hash from `git rev-parse --short HEAD` (e.g., `327e72c`).

**Configuration options:**

| Option | Default | Description |
|--------|---------|-------------|
| `apiBaseUrl` | `'/api'` | Base URL for JSON:API calls. Use `'/jsonapi'` for Drupal. |
| `siteBaseUrl` | `''` | Base URL for assets (logos). Only needed if assets are on a different domain. |

**Cache busting:** The `@COMMIT_HASH` in the URL is a git commit hash (e.g., `@327e72c`). To get the latest version after updates, change it to the new commit hash or use `@main` (not recommended for production).

### Deploying Updates

After making changes, follow these steps to deploy:

1. **Rebuild the dist files** (this is the step most often forgotten!):
   ```bash
   npm run build:lib
   ```

2. **Commit the rebuilt dist files**:
   ```bash
   git add dist/
   git commit -m "chore: rebuild dist for CDN"
   ```

3. **Push to GitHub**:
   ```bash
   git push
   ```

4. **Purge the jsDelivr cache** (required — `@latest` is cached aggressively):
   ```bash
   curl https://purge.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.umd.js
   curl https://purge.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.css
   curl https://purge.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.umd.js.map
   ```

5. **Hard refresh** the site (`Cmd+Shift+R` / `Ctrl+Shift+R`) to bypass browser cache.

**Troubleshooting:** If changes still don't appear:
- Verify the dist files were included in the commit: `git show HEAD --stat | grep dist`
- Check the purge response — it should return `"status": "finished"`
- Add a query string to bust browser cache: `?v=2`

**Twig template example (alternative):**

```twig
{# templates/page--appverse.html.twig #}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.umd.js"></script>
<div id="appverse-root"></div>
<script>
  AppVerse.mount('appverse-root', {
    apiBaseUrl: '/jsonapi',
    siteBaseUrl: ''
  });
</script>
```

**How it works:**
1. User visits `/appverse` → Drupal serves the template → Widget shows grid at `#/`
2. User clicks a tile → URL hash changes to `#/abaqus` (no page reload, Drupal unaware)
3. User shares link `/appverse#/abaqus` → Drupal serves same template → Widget reads hash and shows detail

**Note:** All navigation happens via hash changes, which never trigger server requests. Drupal is only involved on initial page load.

#### Shadow DOM Embedding (CSS Isolation)

If AppVerse styles conflict with the host page (e.g., Tailwind resets affecting a Bootstrap navbar), use Shadow DOM to fully isolate the widget's CSS:

```html
<div id="appverse-shadow-host"></div>
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.umd.js"></script><script>
  (function() {
    var host = document.getElementById('appverse-shadow-host');
    var shadow = host.attachShadow({ mode: 'open' });

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@COMMIT_HASH/dist/appverse.css';
    shadow.appendChild(link);

    var root = document.createElement('div');
    root.id = 'appverse-root';
    shadow.appendChild(root);

    AppVerse.mount(root, {
      apiBaseUrl: '/jsonapi',
      siteBaseUrl: ''
    });
  })();
</script>
```

This loads the CSS inside the Shadow DOM so it cannot affect elements outside the widget.

### API

```javascript
// React Component
<AppVerseBrowser />

// CDN Mount — accepts an element ID (string) or a DOM element
const instance = AppVerse.mount('appverse-root', config)
const instance = AppVerse.mount(document.getElementById('appverse-root'), config)
instance.unmount()
```

## How Routing Works

The widget uses React Router with `HashRouter`:

1. **On mount:** Widget reads URL hash to determine view
2. **On navigation:** Hash updates without page reload (client-side routing)
3. **On direct visit/share:** Hash is read, correct view is shown

**Example URLs:**

| URL | What Shows |
|-----|------------|
| `/appverse#/` | Grid with all software |
| `/appverse#/?topics=Materials+Science` | Grid filtered by topic |
| `/appverse#/abaqus` | Abaqus detail page (slug route) |
| `/appverse#/alphafold?app=icds-roar-ood--bc-osc-alphafold` | Detail with README expanded |
| `/appverse#/software/097bde81-...` | Detail by UUID (backward compat) |

**Unmatched routes** redirect to `#/`.

## Project Structure

```
src/
├── pages/
│   ├── SoftwareHome.jsx       # /
│   └── SoftwareDetail.jsx     # /:slug or /software/:id
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
