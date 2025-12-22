# Publishing AppVerse Browser

This document describes how to create a new release of the AppVerse Browser for CDN distribution via GitHub releases.

## Overview

AppVerse Browser is distributed via CDN using GitHub releases. The workflow does NOT use npm. Instead:

1. Build the library locally
2. Commit the `dist/` folder to git
3. Tag the release with a version number
4. Create a GitHub release
5. CDN (jsdelivr) automatically serves from the GitHub release

## Release Workflow

### 1. Development

Develop features on a branch as normal:

```bash
git checkout -b feature/my-feature
# Make your changes
npm run dev  # Test locally
```

The `dist/` folder is tracked in git (unlike typical npm packages).

### 2. Build for Production

Before creating a release, build the library:

```bash
npm run build:lib
```

This creates:
- `dist/appverse.umd.js` - UMD bundle for CDN
- `dist/appverse.es.js` - ES module bundle
- `dist/appverse.css` - Styles
- `dist/*.map` - Source maps

### 3. Update Version

Update the version in `package.json`:

```json
{
  "version": "1.2.3"
}
```

Version format: `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes to the embed API
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes

### 4. Commit Build Artifacts

Commit the updated `dist/` folder along with version bump:

```bash
git add package.json dist/
git commit -m "Release v1.2.3"
```

### 5. Create and Push Git Tag

Create a git tag matching the version:

```bash
git tag v1.2.3
git push origin main
git push origin v1.2.3
```

**Important:** The tag name must start with `v` (e.g., `v1.2.3`, not `1.2.3`).

### 6. Create GitHub Release

1. Go to https://github.com/Sweet-and-Fizzy/ood-appverse/releases
2. Click "Draft a new release"
3. Select the tag you just created (`v1.2.3`)
4. Release title: `v1.2.3` (same as tag)
5. Describe changes in the release notes
6. Click "Publish release"

### 7. Verify CDN Access

After publishing the release, verify the CDN URLs work:

```html
<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.2.3/dist/appverse.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.2.3/dist/appverse.css">

<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.css">
```

**Note:** jsdelivr may take a few minutes to pick up new releases.

## CDN URLs

### Via jsdelivr (from GitHub)

```html
<!-- Pin to specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.2.3/dist/appverse.umd.js"></script>

<!-- Always get latest (useful for development/testing) -->
<script src="https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@latest/dist/appverse.umd.js"></script>
```

### Via unpkg (from npm, if you publish there later)

```html
<script src="https://unpkg.com/appverse-browser@1.2.3/dist/appverse.umd.js"></script>
```

## Quick Reference

```bash
# Complete release process
npm run build:lib
# Update package.json version
git add package.json dist/
git commit -m "Release v1.2.3"
git tag v1.2.3
git push origin main
git push origin v1.2.3
# Create GitHub release via web UI
```

## Checking Existing Releases

View existing tags:
```bash
git tag -l "v*"
```

View existing releases:
https://github.com/Sweet-and-Fizzy/ood-appverse/releases

## Important Notes

- **Never reuse version numbers** - Each version must be unique
- **Test before releasing** - Use `demo/index.html` to test the built bundle locally
- **Version tags must match package.json** - Keeps things consistent
- **dist/ is committed** - Unlike npm packages, we commit build artifacts for CDN distribution
- **Breaking changes = major version bump** - Any change to the `AppVerse.mount()` API signature

## Testing a Release Locally

Before pushing a release, test it locally:

```bash
# Build the library
npm run build:lib

# Serve from project root
npx serve .

# Open http://localhost:3000/demo/index.html
# Verify the widget loads and works correctly
```

## Netlify Deployment

The project is deployed to Netlify with both build modes:

**Site:** https://ood-appverse-react.netlify.app/

**Build Configuration:**
```toml
# netlify.toml
[build]
  command = "npm run build && npm run build:lib"
  publish = "dist"
```

**Deployed URLs:**
- Standard React app: https://ood-appverse-react.netlify.app/appverse/
- CDN demo: https://ood-appverse-react.netlify.app/demo/

The build runs both commands sequentially. The library build uses `emptyOutDir: false` in `vite.config.js` to preserve the standard app files while adding the UMD bundle.

## Rollback

If you need to rollback a bad release:

1. Create a new release with a patch version pointing to the previous working code
2. Do NOT delete git tags or GitHub releases (breaks CDN caching)
3. Users pinned to specific versions are unaffected
4. Users using `@latest` will get the rollback

## Automation (Future)

Consider adding GitHub Actions to automate this process:
- Trigger on version tag push
- Run tests
- Build library
- Create GitHub release automatically
- Notify team

For now, manual process ensures full control over releases.
