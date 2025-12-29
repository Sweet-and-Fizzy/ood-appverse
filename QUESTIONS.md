# Open Questions & Uncertainties

> Living document for tracking design decisions, API ambiguities, and implementation questions.

---

---

## Data Model Questions

### Q: Why are Topics on Software but Tags on Apps?

The Drupal schema has:
- `field_appverse_topics` → Software only (points to `appverse_science_domains`)
- `field_add_implementation_tags` → Apps only (points to `tags`)
- `field_tags` → Software only (also points to `tags`)

This creates two separate tagging systems. Is this intentional?

**Status:** ⏳ Need to confirm with Drupal admin

---

### Q: What is the relationship between `field_tags` (on Software) and `field_add_implementation_tags` (on Apps)?

Both point to the same `tags` taxonomy. Are they meant to be used for different purposes?

**Status:** ⏳ Need to confirm with Drupal admin

---

## UI/UX Questions

### Q: What filters should appear in the sidebar?

**From design (`grid.jpg`):** Topics, Type, Tags

**Currently available in API:**
| Filter | Source Entity | Status |
|--------|---------------|--------|
| Topics | Software (`field_appverse_topics`) | ✅ Available |
| Type | App (`field_appverse_app_type`) | ✅ Available |
| Tags | App (`field_add_implementation_tags`) | ✅ Available |

**Implemented:** Type, Tags (both from Apps)
**Not yet implemented:** Topics (from Software)

**Status:** 🔧 In progress

---

### Q: Should Topics filter work differently since it's on Software not Apps?

If Topics is on Software directly, filtering by Topic would filter the software list directly (not via apps).

This is different from Type/Tags which filter apps first, then show software with matching apps.

**Status:** ⏳ Awaiting decision

---

## API Stability

### Q: How do we handle frequent Drupal schema changes?

The Drupal admin frequently updates the database, which can change:
- Available fields
- Taxonomy terms
- Relationship structures

**Current approach:**
- `API.md` documents current known state with timestamps
- Discovery `curl` commands in API.md for quick re-verification
- This QUESTIONS.md for tracking uncertainties

**Status:** 📋 Ongoing concern

---

## Logo Rendering

### Q: Why are logos not rendering?

Investigation showed `field_appverse_logo` relationship returns `null` for all software items.

**Possible causes:**
1. No logos uploaded in Drupal yet (content issue)
2. Logo field was removed/renamed in recent DB change
3. Media entity configuration issue

**Status:** ⏳ Need to confirm with Drupal admin

---

## Resolved Questions

### Q: When filters are active, should software with 0 matching apps be hidden or shown?

**Resolved:** 2024-12-29 - **Hide them.** When any filter is active, only show software that has at least one app matching the filter criteria. Software with 0 total apps still shows when no filters are active.

