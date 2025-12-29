# AppVerse Schema (Simplified)

> Human-readable outline of content types and their fields.
> Last verified: 2024-12-29

---

## Content Types

### Software (`node--appverse_software`)

```
Software
├── title                              (text)
├── body                               (rich text)
├── field_appverse_software_doc        (link)
├── field_appverse_software_website    (link)
├── field_appverse_logo                → media--svg
├── field_appverse_topics              → taxonomy: appverse_science_domains
├── field_license                      → taxonomy: appverse_license
└── field_tags                         → taxonomy: tags
```

### App (`node--appverse_app`)

```
App
├── title                              (text)
├── field_implementation_details       (rich text)
├── field_appverse_software_implemen   → node: appverse_software  ← links app to its software
├── field_appverse_app_type            → taxonomy: appverse_app_type
├── field_add_implementation_tags      → taxonomy: tags
├── field_appverse_organization        → taxonomy: appverse_organization
└── field_license                      → taxonomy: appverse_license
```

---

## Taxonomy Values

| Taxonomy | Values |
|----------|--------|
| `appverse_science_domains` | engineering_and_technology, bioinformatics, biological sciences |
| `appverse_app_type` | batch_connect, dashboard, passenger_app, widget |
| `appverse_license` | Commercial License, Open-Source License |
| `appverse_organization` | Penn State, Ohio Supercomputer Center, University of Utah |
| `tags` | 50 terms (matlab, big-data, programming, hadoop, etc.) |


