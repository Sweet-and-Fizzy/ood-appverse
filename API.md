# API Reference

## Data Model

**Software** = The product (Matlab, Abaqus, etc)
**Apps** = Implementations of that software (different clusters/environments)

**Filters apply to APPS, display groups by SOFTWARE**

## Current State

**Software:** 2 items (Abaqus, Matlab)
**Apps:** 1 item (Abaqus/CAE) - **no tags/license/type assigned yet**

## Endpoints

**Base:** `https://md-2622-accessmatch.pantheonsite.io/jsonapi`

| Endpoint | Returns |
|----------|---------|
| `/node/appverse_software` | All software |
| `/node/appverse_software/{id}` | Single software |
| `/node/appverse_app` | All apps |
| `/node/appverse_app?filter[field_appverse_software_implemen.id]={id}` | Apps for specific software |
| `/file/file/{id}` | File URLs |

## Fields by Entity

### Software (`node--appverse_software`)

**Attributes:**
- `title` - Software name
- `body` - Description
- `field_appverse_software_doc` - Docs URL
- `field_appverse_software_website` - Website URL

**Relationships:**
- `field_appverse_logo` (media--svg) - Logo
- `field_appverse_topics` (taxonomy) - **Field exists, taxonomy doesn't (404)**
- `field_license` (taxonomy) - License
- `field_tags` (taxonomy) - Tags
- `field_domain_access` - Domains

### Apps (`node--appverse_app`)

**Attributes:**
- `title` - App name
- `field_implementation_details` - README/details

**Relationships (FILTER THESE):**
- `field_appverse_software_implemen` - Parent software
- `field_appverse_app_type` (taxonomy) - **Type filter**
- `field_add_implementation_tags` (taxonomy) - **Tags filter**
- `field_license` (taxonomy) - **License filter**
- `field_appvserse_organization` (taxonomy) - Org (typo in Drupal)

## Taxonomies

| Vocabulary | Field | Status | Count | Use |
|------------|-------|--------|-------|-----|
| `appverse_license` | `field_license` | ✅ | 2 | Commercial License, Open-Source License |
| `tags` | `field_add_implementation_tags` | ✅ | 50+ | matlab, big-data, programming, hadoop, aws, etc |
| `appverse_app_type` | `field_appverse_app_type` | ❌ | - | Vocabulary doesn't exist (404) |
| `appverse_organization` | `field_appvserse_organization` | ✅ | 0 | Empty |
| `appverse_science_domains` | - | ✅ | 0 | Empty |
| `appverse_topics` | `field_appverse_topics` | ❌ | - | Vocabulary doesn't exist (404) |

**Test:** `https://md-2622-accessmatch.pantheonsite.io/jsonapi/taxonomy_term/{vocabulary}`

### How to Determine Field → Taxonomy Mapping

**Method 1: Naming Convention (Usually Reliable)**
- `field_license` → `appverse_license` (strips `field_` prefix, adds namespace)
- `field_add_implementation_tags` → `tags` (strips `field_add_implementation_` prefix)
- `field_appverse_app_type` → `appverse_app_type` (strips `field_` prefix)
- `field_appverse_topics` → `appverse_topics` (strips `field_` prefix)

**Method 2: Check Relationship Type (Definitive)**
```bash
# Fetch with ?include= to see type in included[] array
curl '{endpoint}?include=field_license'
# In included[], look for: "type": "taxonomy_term--appverse_license"
```

## Building Filter UIs

### Approach A: Fetch Taxonomy Directly (Show Complete Surface)
```javascript
// Fetch all possible values from taxonomy vocabulary
const response = await fetch('/jsonapi/taxonomy_term/tags');
const allTags = response.data; // All 50+ tags

// Then count usage from apps
const tagCounts = {};
apps.forEach(app => {
  const appTags = app.relationships.field_add_implementation_tags.data || [];
  appTags.forEach(tag => {
    tagCounts[tag.id] = (tagCounts[tag.id] || 0) + 1;
  });
});

// Display: "Big Data (3)", "Machine Learning (0)" (grayed out)
```

**Use when:**
- You want to show ALL available options (even unused ones)
- Building admin/content creation interfaces
- Showing users the complete schema surface
- Want grayed-out options with (0) counts

### Approach B: Extract from Content Only (Show What's Used)
```javascript
// Extract only tags that are actually used
const usedTagIds = apps
  .flatMap(app => app.relationships.field_add_implementation_tags.data || [])
  .map(tag => tag.id);

// Fetch those specific tags
const response = await fetch(
  `/jsonapi/node/appverse_app?include=field_add_implementation_tags`
);
const usedTags = response.included.filter(i => i.type.startsWith('taxonomy_term--'));

// Display: Only "Big Data (3)", "Programming (2)" (no empty options)
```

**Use when:**
- User-facing filters where empty options aren't helpful
- Cleaner, focused UI
- Only care about what's actually in use

### Recommended: Hybrid Approach
```javascript
// 1. Fetch complete taxonomy (shows full surface)
const allTags = await fetch('/jsonapi/taxonomy_term/tags');

// 2. Count usage from apps
const counts = {};
apps.forEach(app => {
  (app.relationships.field_add_implementation_tags.data || []).forEach(tag => {
    counts[tag.id] = (counts[tag.id] || 0) + 1;
  });
});

// 3. Display ALL tags with counts, gray out zeros
allTags.data.forEach(tag => {
  const count = counts[tag.id] || 0;
  // Render: <Checkbox disabled={count === 0}>{tag.name} ({count})</Checkbox>
});
```

## JSON:API Basics

| Request | What You Get |
|---------|--------------|
| No `?include=` | `data[]`: nodes with attributes + relationships (IDs only) |
| `?include=field_logo` | `data[]`: same nodes<br>`included[]`: full logo entities |
| `?include=field_logo,field_license` | `data[]`: same nodes<br>`included[]`: logos + licenses |
| `?filter[field_name.id]={uuid}` | Filtered `data[]` |
| `?page[limit]=50&page[offset]=100` | Paginated `data[]` (default: 50) |
| `?fields[node--appverse_software]=title` | `data[]` with only specified attributes |

**Discovery:**
```bash
curl {endpoint} | jq '.data[0].relationships | keys'
```

## Filter Implementation Plan

1. Fetch all apps with `?include=field_add_implementation_tags,field_license,field_appverse_app_type`
2. Filter apps by selected tags/license/type
3. Group filtered apps by `field_appverse_software_implemen.data.id`
4. Display software tiles where software.id is in the filtered group
5. Badge shows count of matching apps for that software
