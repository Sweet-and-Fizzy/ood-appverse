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


## Drupal Links and Corresponding Endpoints

### All Software

#### Drupal Admin
https://md-2622-accessmatch.pantheonsite.io/admin/content?title=&type=appverse_software&status=All

#### API
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software

### All Apps

#### Drupal Admin
https://md-2622-accessmatch.pantheonsite.io/admin/content?title=&type=appverse_app&status=All

#### API
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app

## Software Endpoints (these happen to be the data we have for now)
### Abaqus
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software/097bde81-ab50-4be0-800e-d425d78d0817

### AlphaFold
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_software/5e8a0824-6b79-4ed6-91ca-b25bf8036754

## App Endpoints

### ICDS-Roar-OOD Protein Structure Prediction
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app/66415637-ec7b-46ca-881b-daf899f3bdad

### Batch Connect - OSC Abaqus/CAE (/appverse/app/CHPC-UofU/bc_osc_abaqus)
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app/469ded75-2b1f-4b7e-a8d3-fe570141ba4d?resourceVersion=id%3A15802

### Batch Connect - OSC Abaqus/CAE (osc-/bc_osc_abaqus)
https://md-2622-accessmatch.pantheonsite.io/jsonapi/node/appverse_app/0a13798c-d628-417d-a23f-a929648b4a91