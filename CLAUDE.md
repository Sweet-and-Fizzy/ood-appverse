# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000/appverse/ |
| `npm run build` | Build standard app |
| `npm run build:lib` | Build embeddable UMD/ES bundle to dist/ |
| `npm run serve:demo` | Build library and serve demo at http://localhost:3000/demo/index.html |

## Architecture

AppVerse Browser is an embeddable React app for browsing Open OnDemand software and apps. It can be used as a React component or embedded via CDN.

### Dual Entry Points

- **Development** (`src/main.jsx`): Standard Vite dev entry
- **Library** (`src/lib/index.js` → `src/lib/mount.jsx`): CDN/UMD entry that exports `mount()` function

Both use BrowserRouter. The widget reads and syncs with the browser URL at `/appverse/*` paths.

### Data Flow

`AppverseDataContext` fetches all data on mount from Drupal JSON:API:
- `/api/node/appverse_software` - Software items with logos
- `/api/node/appverse_app` - App implementations

Data is globally available via `useAppverseData()` hook. The context resolves logo URLs by fetching linked media and file resources.

### Configuration

`ConfigContext` provides runtime config passed to `mount()`:
- `apiBaseUrl` - Base URL for API calls (default: '/api')
- `siteBaseUrl` - Base URL for site assets

### Routes

| Path | Component |
|------|-----------|
| `/appverse/` | SoftwareHome - Grid with FilterSidebar, search syncs to URL params |
| `/appverse/software/:id` | SoftwareDetail - Detail view with AppList |

### API Proxy

Vite dev server proxies `/api` to `https://md-2622-accessmatch.pantheonsite.io/jsonapi`. API utilities in `src/utils/api.js` handle JSON:API response parsing and logo URL resolution.

### Design Tokens (Tailwind)

| Token | Value | Class |
|-------|-------|-------|
| Red | #C91235 | `appverse-red` |
| Black | #232323 | `appverse-black` |
| Light Gray | #DDDEDF | `appverse-gray` |
| Pink | #F2E2E5 | `appverse-pink` |
| Blue | #0076AF | `appverse-blue` |
| Green | #00857A | `appverse-green` |
| Border Radius | 8px | `rounded-appverse` |
