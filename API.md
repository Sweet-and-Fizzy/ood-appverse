# API Reference

## The Big Picture

The AppVerse website is a collection of "Software" and "Apps".
- **"Software"** is stuff like Matlab, Abaqus, etc.
- **"Apps"** are implementations of that software in a specific environment.

## Drupal

The data lives in Drupal.  You can edit it here: https://md-2622-accessmatch.pantheonsite.io/admin/content.  Actually I cannot edit it anymore because my Drupal user no longer seems to be admin. https://md-2622-accessmatch.pantheonsite.io/node/11317/edit is in my history, but I can't get back to it.

However, we can still comb through API and gain and understanding of the data.

### Discovery tip

To see all available relationship fields (which can be `include`d), run:

```bash
curl https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software | jq '.data[0].relationships | keys'
curl https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app | jq '.data[0].relationships | keys'
```

To see all available attributes:

```bash
curl https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software | jq '.data[0].attributes | keys'
curl https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app | jq '.data[0].attributes | keys'
```

## First Endpoint: https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software

This returns an array of `appverse_software` nodes.  Each node has the following properties:

| Path | Field | What it is |
|------|-------|------------|
| - | `type` | type of the object |
| - | `id` | UUID for this item |
| links | `self` | API URL to fetch this single item |
| attributes | `title` | Software name |
| attributes | `body` | Description (with raw value + processed HTML) |
| attributes | `field_appverse_software_website` | Link to software's homepage |
| attributes | `field_appverse_software_doc` | Link to documentation |
| attributes | `status` | Published or not |
| relationships | `field_appverse_logo` | Media entity (logo image) |
| relationships | `field_appverse_topics` | Taxonomy terms (science domains) |
| relationships | `field_license` | Taxonomy term (license type) |
| relationships | `field_tags` | Taxonomy terms (tags) |
| relationships | `field_domain_access` | Domain access control |
| relationships | `field_domain_source` | Domain source |


## Second Endpoint: https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app

This returns an array of `appverse_app` nodes.  Each node has the following properties:

| Path | Field | What it is |
|------|-------|------------|
| - | `type` | Content type identifier (`node--appverse_app`) |
| - | `id` | UUID for this item |
| links | `self` | API URL to fetch this single item |
| attributes | `title` | App name |
| attributes | `body` | Short description (with raw value + processed HTML) |
| attributes | `field_appverse_github_url` | Link to GitHub repository |
| attributes | `field_appverse_readme` | Full README content (raw markdown + processed HTML) |
| attributes | `field_appverse_lastupdated` | Unix timestamp of last update |
| attributes | `status` | Published or not |
| relationships | `field_appverse_software_implemen` | Reference to the parent `appverse_software` node |
| relationships | `field_appverse_app_type` | Taxonomy term (app type) |
| relationships | `field_appverse_organization` | Taxonomy term (organization) |
| relationships | `field_license` | Taxonomy term (license) |
| relationships | `field_add_implementation_tags` | Array of taxonomy terms (implementation tags) |
| relationships | `field_domain_access` | Domain access control |
| relationships | `field_domain_source` | Domain source |

We know the `relationships.field_appverse_app_type` has to be a value from the `appverse_app_type` taxonomy.  Because in the response we have something like this:

```json
"relationships": {
  "field_appverse_app_type": {
    "data": {
      "type": "taxonomy_term--appverse_app_type",
      "id": "123"
    }
  }
}
```

### Drupal `include` parameter
Now, it happens to be that in drupal, you can pull in related entities by using the `include` parameter.  For example:

```
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software?include=field_appverse_logo,field_license,field_tags,field_appverse_topics,field_domain_access
```

This will return the software object with the logo, license, tags, topics, and domain access included.

## Drupal `filter` parameter

The `filter` parameter is used to filter the results by a specific field.  For example:

```
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app?filter[field_appverse_software_implemen.id]=123
```

This will return all apps that have the software with the ID of 123 as the parent.

## Drupal `page` parameter

The `page` parameter is used to paginate the results. For example:

```
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app?page[limit]=10&page[offset]=20
```

This will return 10 apps, starting from the 21st result. Default limit is 50.

## Endpoints Reference

**Base URL:** `https://md-2622-accessmatch.pantheonsite.io/jsonapi`

### Active Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/node/appverse_software?include=field_appverse_logo` | Software list + logos |
| `/node/appverse_software/{id}?include=field_appverse_logo` | Single software by UUID |
| `/node/appverse_app?include=field_appverse_software_implemen` | All apps |
| `/node/appverse_app?filter[field_appverse_software_implemen.id]={id}` | Apps by software UUID |
| `/file/file/{id}` | File URLs (for logos) |

### Taxonomy Endpoints (available but unused)

| Endpoint | Data |
|----------|------|
| `/taxonomy_term/appverse_license` | Commercial License, Open-Source License |
| `/taxonomy_term/appverse_organization` | Empty |
| `/taxonomy_term/appverse_science_domains` | Empty |

## How JSON:API Works

| Request | What You Get | Use Case |
|---------|--------------|----------|
| No `?include=` | `data[]`: nodes with attributes + relationships (IDs only) | Just need node data, no related entities |
| `?include=field_logo` | `data[]`: same nodes<br>`included[]`: full logo entities | Avoid N+1 queries - get everything in one request |
| `?include=field_logo,field_license` | `data[]`: same nodes<br>`included[]`: logos + licenses | Load multiple relationships at once |
| `?filter[field_name.id]={uuid}` | Filtered `data[]` | Get nodes matching specific relationship |
| `?page[limit]=50&page[offset]=100` | Paginated `data[]` | Handle large datasets (default limit: 50) |
| `?fields[node--appverse_software]=title` | `data[]` with only specified attributes | Faster - only return what you need |

## See Everything

**Software with ALL relationships:**
```bash
curl "https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software?include=field_appverse_logo,field_license,field_tags,field_appverse_topics,field_domain_access" | jq
```

**App with ALL relationships:**
```bash
curl "https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app?include=field_appverse_software_implemen,field_appverse_app_type,field_add_implementation_tags,field_license,field_appverse_organization" | jq
```

**Result:** `data[]` has your nodes, `included[]` has all related entities (media, taxonomies, etc)

## Common Patterns

**Get everything for one item:** the `include` parameter is used to pull in related entities.
```
/node/appverse_software/{id}?include=field_appverse_logo,field_license,field_tags,field_appverse_topics
```

**Filter by taxonomy term:** the `filter` parameter is used to filter the results by a specific field.
```
/node/appverse_software?filter[field_license.id]={license_term_uuid}
```

**Get only what you need (faster):** the `fields` parameter is used to get only the attributes you need.
```
/node/appverse_software?fields[node--appverse_software]=title&page[limit]=100
```

**Deep includes (nested relationships):** the `include` parameter is used to pull in related entities.
```
?include=field_appverse_logo.field_media_image_1
```

## Taxonomies

| Vocabulary | Field | Status | Count | Values |
|------------|-------|--------|-------|--------|
| `appverse_license` | `field_license` | ✅ | 2 | Commercial License, Open-Source License |
| `tags` | `field_add_implementation_tags` | ✅ | 50+ | matlab, big-data, programming, hadoop, aws, etc |
| `appverse_app_type` | `field_appverse_app_type` | ❌ | - | Vocabulary doesn't exist (404) |
| `appverse_organization` | `field_appverse_organization` | ✅ | 0 | Empty |
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
