# AppVerse Browser - Usage Examples

## Live Demos

- **Standard React App:** https://ood-appverse-react.netlify.app/appverse/
- **CDN Embed Demo (with HashRouter):** https://ood-appverse-react.netlify.app/demo/pretend-website/

## Production vs Demo Usage

**Production (Drupal):**
```javascript
AppVerse.mount('appverse');
// Uses BrowserRouter (default) - expects to be at /appverse/ path
```

**Demo/Testing:**
```javascript
AppVerse.mount('appverse', { useHash: true });
// Uses HashRouter - can be embedded anywhere, uses hash-based navigation
```

The demo uses `{ useHash: true }` to keep the URL at `/demo/pretend-website/` without redirecting. **For production Drupal deployment, do NOT use this option** - the default BrowserRouter behavior is what you want.

## Option 1: React Component (for React Apps)

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

## Option 2: CDN Embed (for Non-React Sites)

**Important:** The widget reads the current browser URL. Embed it on pages with URLs like `/appverse/` or `/appverse/software/:id`.

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.css">
</head>
<body>
  <div id="appverse-container"></div>

  <script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.umd.js"></script>
  <script>
    AppVerse.mount('appverse-container');
  </script>
</body>
</html>
```

### Drupal Example

Drupal page at `/appverse/` loads the widget, which reads the URL and shows the software grid:

```twig
{# templates/page--appverse.html.twig #}
<div id="appverse"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.umd.js"></script>
<script>
  AppVerse.mount('appverse');
</script>
```

## Version Management

```html
<!-- Production: Pin to specific version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.0.0/dist/appverse.umd.js"></script>

<!-- Development: Use latest -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.css">
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.umd.js"></script>
```

## API Reference

### React Component
```jsx
import { AppVerseBrowser } from 'appverse-browser'
<AppVerseBrowser />
```

### CDN Mount Function
```javascript
const instance = AppVerse.mount(elementId, options)

// Parameters:
// - elementId (string): ID of DOM element
// - options (object, optional):
//   - useHash (boolean): Use HashRouter instead of BrowserRouter (default: false)

// Returns:
// - { unmount: Function }

// Clean up:
instance.unmount();
```

## How Routing Works

The widget uses `BrowserRouter` and reads the current page URL:
- Page at `/appverse/` → Shows software grid
- Page at `/appverse/software/123` → Shows software detail for ID 123
- Filter state syncs to URL params: `/appverse/?software=jupyter&status=active`
- Navigation within widget updates the URL without page reload
