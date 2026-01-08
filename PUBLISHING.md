# Publishing AppVerse Browser

## Current Workflow (Development)

During active development, we use commit hashes for quick iteration:

```bash
# 1. Build
npm run build:lib

# 2. Commit
git add dist/
git commit -m "chore: rebuild dist for [description]"
git push

# 3. Get hash
git rev-parse --short HEAD  # e.g., 558a0d8

# 4. Update Drupal embed URLs in the "source" snippet on the /appverse node
# @OLD_HASH → @NEW_HASH
```

CDN URL format: `https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@558a0d8/dist/appverse.umd.js`

See README.md for full Drupal deployment steps.

---

## Future Workflow (Production)

Once stable, we'll switch to tagged releases for cleaner versioning:

```bash
# 1. Build
npm run build:lib

# 2. Bump version in package.json

# 3. Commit and tag
git add package.json dist/
git commit -m "Release v1.2.3"
git tag v1.2.3
git push origin main
git push origin v1.2.3

# 4. Create GitHub Release via web UI
# https://github.com/Sweet-and-Fizzy/ood-appverse/releases
```

CDN URL format: `https://cdn.jsdelivr.net/gh/Sweet-and-Fizzy/ood-appverse@1.2.3/dist/appverse.umd.js`


## Notes

- `dist/` is committed to git (required for jsdelivr CDN)
- Never reuse version numbers or tags
- jsdelivr may take a few minutes to pick up new releases
