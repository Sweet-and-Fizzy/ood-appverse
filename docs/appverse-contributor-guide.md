# Appverse Contributor Guide

> **Related Docs:**
> [Appverse Best Practices](https://openondemand.connectci.org/appverse-best-practices) |
> [Appverse Reviewer Checklist](https://openondemand.connectci.org/appverse-reviewer-checklist) |
> [Appverse README Template](https://github.com/tamu-edu/appverse_readme_template)

## 1. What Is the Appverse?

The Appverse is a shared catalog of Open OnDemand app configurations for HPC environments. The goal is to improve reuse and share deployment patterns instead of rebuilding them from scratch.

In simple terms:

- **Software** = the tool (e.g., Jupyter, RStudio, a visualization app)
- **App** = the Open OnDemand configuration that launches that software on an HPC system

This guide is for developers, HPC admins, and anyone who wants to contribute or improve apps in the catalog.

## 2. App Types

| Type | Description |
|------|-------------|
| **Batch Connect - Basic** | Interactive jobs that run an HTTP server on a compute node (Jupyter, RStudio, etc.) — set `template: "basic"` in `submit.yml.erb` |
| **Batch Connect - VNC** | Interactive jobs that run a VNC desktop on a compute node (MATLAB, Abaqus, remote desktops) — set `template: "vnc"` in `submit.yml.erb` |
| **Batch Connect - VNC Container** | Same as VNC but runs inside a container, for sites that don't install X11/XFCE on compute nodes — set `template: "vnc_container"` |
| **Passenger** | Web apps served via Open OnDemand (Ruby Rack, Python WSGI, or Node.js) |
| **Widgets** | Small UI components embedded in dashboards |
| **Dashboards** | Structured user interfaces (e.g., classroom portals, monitoring panels, etc.) |

## 3. Tags & Discoverability

Good tagging makes your app easier to discover in the catalog.

### Implementation Tags (for Apps)

Implementation tags describe how an app runs:

- Apptainer
- Batch Connect
- Classroom
- Containerized
- Docker
- GPU-enabled
- Modules
- Passenger 
- Source Install

### Topics (for Software)

Research area(s) of the associated software (e.g., AI/ML, genomics, chemistry, materials science).

### Tags (for Software)

Tags from the Connect.CI tag taxonomy of the associated software.

> **Tip:** Apps with good tagging are significantly easier to find. Aim for at least 3-5 relevant tags.

## 4. Contributing an App

### When to Contribute

Apps for software are always encouraged.

If the software already has app implementations, consider:

1. **Modified an existing app?** Contribute changes back to the original repository rather than publishing a new version. Forks that diverge silently create maintenance burden for everyone (see [Best Practices: Avoid Fork Rot](https://openondemand.connectci.org/appverse-best-practices#avoid-fork-rot)).
2. **Only changed site-specific configuration?** That likely doesn't warrant a new app — it's working as intended. Document your configuration instead.
3. **Added significant new functionality?** (e.g., GPU support, containerization, a different execution model) That's a good candidate for a new app.

### High-Level Workflow

1. Prepare your repository with required files and metadata
2. Create a new App entry linked to the repository in the Appverse
3. Review and validation (see [Reviewer Checklist](https://openondemand.connectci.org/appverse-reviewer-checklist))
4. Ongoing maintenance

> Currently we support repositories containing single apps. In the future we are considering adding packages of apps that work together; these could be distributed via repositories containing multiple apps.

## 5. Repository Essentials

Each app must live in a **public repository** (GitHub; GitLab support may be added in the future).

### Required Files

| File | Purpose |
|------|---------|
| `manifest.yml` | App metadata for the catalog (name, category, description) |
| `README.md` | Documentation for researchers and HPC administrators deploying the app |
| `LICENSE` | Open source license (MIT recommended by OOD community) |

### Recommended Files for Batch Connect Apps

| File | Purpose |
|------|---------|
| `CHANGELOG.md` | Version history with semantic versioning |
| `icon.png` or `icon.svg` | App icon for the OOD Dashboard |
| `form.yml` / `form.yml.erb` | User-facing launch form |
| `submit.yml.erb` | Job submission configuration |
| `template/` | Job template scripts |
| Screenshots | Visual documentation of the running app |

### Naming Your App and Repository

Your app name appears in the Appverse catalog and in the OOD dashboard. A good name helps deployers find your app and understand what it does at a glance.

**Conventions:**
- Start with the **software name** (e.g., "Jupyter", "RStudio", "MATLAB")
- Add a **differentiator** if there are multiple apps for the same software — describe what makes yours different (e.g., containerized, GPU-enabled, classroom mode)
- Keep it concise — aim for 2-4 words

**Good names:**
- `Jupyter Notebook` — clear, simple, no ambiguity
- `Jupyter (Apptainer)` — differentiates from a module-based version
- `RStudio Server (GPU)` — tells deployers this variant needs GPU nodes
- `MATLAB (Classroom)` — signals a specific use case

**Avoid:**
- Generic names that don't mention the software: `My HPC App`, `Interactive Job`
- Institution-specific names: `OSC Jupyter`, `TACC RStudio` — the catalog is for the whole community
- Redundant prefixes: `OOD Jupyter`, `Batch Connect Jupyter` — everything in the Appverse is an OOD app

**Repository naming:** Follow the OOD convention of prefixing with `bc_` for Batch Connect apps (e.g., `bc_jupyter`, `bc_rstudio_gpu`). This makes it immediately clear what type of app the repo contains.

### The manifest.yml

This file defines how your app appears in the catalog. It must include:

```yaml
name: My App Name
category: Interactive Apps        # Groups in navigation menus
subcategory: Servers              # Secondary grouping
role: batch_connect               # For interactive batch apps
description: |
  A brief description of what this app does
  and what it launches.
```

Optional but helpful fields:

```yaml
icon: icon.png                    # Custom icon path
url: ''                           # URL override (usually auto-generated)
new_window: false                 # Open in new browser window
caption: Launch My App            # Custom button text
metadata:
  field_of_science: Chemistry     # Additional categorization of research domain
```

> **Planned requirement:** A `contact` or `support_url` field will be added to `manifest.yml` as a required field. Apps without a contact or support URL will not be listed in the catalog. This ensures deployers always know where to get help or report issues. Details TBD — watch the [Appverse affinity group](https://openondemand.connectci.org/affinity-groups/ood-appverse) for updates.

See the [OOD manifest.yml reference](https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/manifest.html) for full details.

### The README

Write for **HPC administrators** who need to deploy your app on their system.

Use the [Appverse README Template](https://github.com/tamu-edu/appverse_readme_template) as your starting point. It provides the standard section structure. A good README should cover:

1. **Overview** — what the app launches and who it's for
2. **Features** — key capabilities of this OOD app (not just the upstream software)
3. **Requirements** — compute node software, OOD version, scheduler
4. **Installation** — step-by-step deployment instructions
5. **Configuration** — what to customize and where (cluster names, paths, module names)
6. **Troubleshooting** — common issues and solutions
7. **Testing** — where it's been deployed and how to verify installation
8. **Known limitations** — what doesn't work, what's untested

See the [README template with examples](https://github.com/tamu-edu/appverse_readme_template) for a filled-in version showing what good content looks like in each section.

**Example of a strong README in the wild:** [EpiGenomicsCode/ProteinStructure-OOD](https://github.com/EpiGenomicsCode/ProteinStructure-OOD) — includes features, prerequisites, installation, usage for multiple engines, monitoring, and troubleshooting.

**Example of a weak README:** A README that only contains the project name and a contact email. This tells deployers nothing about what they need to install or configure.

### Best Practices for Repository Setup

- **Avoid hardcoded cluster paths** — use variables or configuration files so others can adapt your app without editing core scripts.
- **Centralize configuration** — there should be one clear place for site-specific settings. Don't scatter paths and module names across multiple files.
- **Use release versions** — tag releases with semantic versioning (e.g., `v1.2.0`) so others can pin to stable versions.
- **Include a CHANGELOG** — helps deployers understand what changed between versions and whether they need to update.

## 6. How Batch Connect Apps Work

If you're building or modifying a Batch Connect app, it helps to understand how the pieces fit together at runtime. OOD uses ERB (Embedded Ruby) templates to wire form values into job scripts and session views.

### The execution flow

When a user fills out the form and clicks Launch:

1. **`form.yml`** (or `form.yml.erb`) renders the form and collects user input
2. **`submit.yml.erb`** translates form values into scheduler directives
3. **`template/before.sh.erb`** runs setup before the main script (ports, passwords, environment)
4. **`template/script.sh.erb`** launches the application
5. **`template/after.sh.erb`** runs cleanup when the session ends (not when the job ends)

### The `context` and `session` objects

Inside any `.erb` file, you have access to two objects that OOD populates for you:

**`context`** — every form field becomes a method on `context`. If your `form:` array includes `version` and `bc_num_hours`, you can use them in your scripts:

```bash
# In script.sh.erb
module load rstudio/<%= context.version %>

<%- if context.version == "4.3" -%>
  # Version-specific setup
<%- end -%>
```

**`session`** — runtime information about the batch connect session:

| Attribute | What it gives you |
|-----------|-------------------|
| `session.id` | Unique session identifier |
| `session.job_id` | The scheduler job ID |
| `session.cluster` | Cluster name (matches your `clusters.d/` config) |
| `session.staged_root` | Path to the session's staging directory |

### Built-in helper methods

OOD provides helpers that you should use instead of rolling your own:

**`find_port`** — finds an available port on the compute node:
```bash
port=$(find_port ${host})
```

**`create_passwd`** — generates a secure random password:
```bash
password="$(create_passwd 16)"
export RSTUDIO_PASSWORD="${password}"
```

### The `connection.yml` pattern

Apps that need to pass runtime data (like generated passwords or tokens) back to the session card use `connection.yml` together with `conn_params` in `submit.yml.erb`. This is how RStudio passes its generated password without exposing it.

In `before.sh.erb`, generate the data:
```bash
password="$(create_passwd 16)"
export RSTUDIO_PASSWORD="${password}"
```

In `submit.yml.erb`, declare what gets passed through:
```yaml
batch_connect:
  template: "basic"
  conn_params:
    - csrf_token
```

In `view.html.erb`, use it to build the connection UI:
```html
<form action="/rnode/<%= host %>/<%= port %>/auth-do-sign-in" method="post" target="_blank">
  <input type="hidden" name="username" value="<%= ENV["USER"] %>">
  <input type="hidden" name="password" value="<%= password %>">
  <button class="btn btn-primary" type="submit">Connect to RStudio</button>
</form>
```

This way the user never sees a login prompt — OOD handles it. See the [OSC Contributor Jam Guide](https://github.com/OSC/contributor_guide/blob/main/contributor_jam_guide.md) for more detail on these patterns.

### ERB syntax reminder

```erb
<%= expression %>     ← Renders the result as a string in the file
<%- statement -%>     ← Executes Ruby code but renders nothing (variables, conditionals)
```

The `=` means "output this." The `-` means "run this silently." Getting these mixed up is a common source of bugs.

## 7. How Apps Get Synced

The catalog pulls information from your repository **daily**. The sync can also be triggered manually if needed.

Currently only **GitHub** repositories are supported, but GitLab support may be added in the future.

### What Gets Synced

- Repository metadata (name, description, topics)
- manifest.yml contents
- README for display in the catalog
- Release/tag information

### Keeping Things Current

After making changes to your app:

1. Update the README if behavior changed
2. Update the CHANGELOG
3. Create a new release tag if it's a significant update
4. The catalog will pick up changes on the next sync cycle

## 8. Review, Maintenance & Community

### Review Process

New apps are evaluated against the [Reviewer Checklist](https://openondemand.connectci.org/appverse-reviewer-checklist) and the [Best Practices Guide](https://openondemand.connectci.org/appverse-best-practices). Reviewers look for:

- Complete metadata and documentation
- Clear, portable configuration
- Adherence to Open OnDemand conventions
- An open source license

### Maintenance

App maintainers are responsible for:

- Keeping metadata current
- Updating documentation when things change
- Responding to breaking changes in Open OnDemand or upstream software
- Addressing issues and pull requests from the community

Inactive apps may be archived, but we prefer revitalizing them with community help.

### Community & Governance

- Join the [Appverse Affinity Group](https://openondemand.connectci.org/affinity-groups/ood-appverse) to connect with other contributors and stay informed
- Follow contribution guidelines and code of conduct
- Propose new tags or app types through discussion
- Major policy decisions are community-driven
- Join the [OOD Discourse](https://discourse.openondemand.org/) for community support and monthly Tips & Tricks calls

## 9. Support

### The Appverse Support Policy: A Shared Responsibility Model

The Open OnDemand Appverse is a community-driven catalog, not a curated set of core-supported products. We follow a clear boundary between Platform Support and App Support.

### The Support Boundary

- **Platform Support (Discourse):** Use the Open OnDemand Discourse for issues related to the OOD platform itself (e.g., installation of the OOD portal, authentication, web server errors, or core Batch Connect functionality).
- **App Support (GitHub):** For issues specific to an app found in the Appverse (e.g., a Jupyter app won't load a specific module, or an RStudio form has a broken dropdown), support must happen at the source.

### Where to Go for Help

Because every app in the Appverse is hosted in a public GitHub repository, users should leverage the standard GitHub workflow for support:

- **Check the README:** Most deployment issues are covered in the app’s specific documentation.
- **Open a GitHub Issue:** If you find a bug or need help with an app's configuration, open an issue in that app’s specific repository. This alerts the actual author of the code.
- **Submit a Pull Request:** If you’ve found a fix for an app, contributing it back via a PR is the best way to help the community.

### A Note to Our Users & Admins

The core Open OnDemand developers provide the "highway" (the platform), but the community provides the "cars" (the apps). If your car has a flat tire, you should contact the manufacturer (the App Contributor), not the highway department.

**Important:** Core OOD developers may decline to troubleshoot issues that are clearly specific to a community-contributed app. In these cases, they will kindly redirect you to the app’s GitHub repository.


## Appendix

### Open OnDemand References

| Resource | URL |
|----------|-----|
| App Development Guide | https://osc.github.io/ood-documentation/latest/how-tos/app-development.html |
| Interactive Apps Docs | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive.html |
| form.yml Reference | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/form.html |
| manifest.yml Reference | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/manifest.html |
| submit.yml.erb Reference | https://osc.github.io/ood-documentation/latest/reference/files/submit-yml-erb.html |
| OOD Discourse Forum | https://discourse.openondemand.org/ |
| Community App List | https://discourse.openondemand.org/t/list-of-open-ondemand-apps/2107 |
| Appverse Affinity Group | https://openondemand.connectci.org/affinity-groups/ood-appverse |
| README Template | https://github.com/tamu-edu/appverse_readme_template |
| OSC Contributor Jam Guide | https://github.com/OSC/contributor_guide/blob/main/contributor_jam_guide.md |

### Standard Batch Connect App Structure

```
my-app/
├── manifest.yml          # App metadata (required)
├── form.yml              # User form (or form.yml.erb for dynamic forms)
├── submit.yml.erb        # Job submission config
├── icon.png              # App icon
├── README.md             # Documentation (required)
├── LICENSE               # Open source license (required)
├── CHANGELOG.md          # Version history (recommended)
├── connection.yml        # Passes runtime data (ports, tokens) to the session card
├── view.html.erb         # Connection view — the "Connect" button and any auth setup
├── info.md.erb           # Pre-launch info panel shown to users before they submit
├── completed.md.erb      # Post-completion message
├── form.js               # Client-side form logic (optional)
├── template/
│   ├── before.sh.erb     # Pre-launch setup
│   ├── script.sh.erb     # Main launch script
│   └── after.sh.erb      # Cleanup script
└── docs/                 # Additional documentation
```

### Glossary

| Term | Definition |
|------|------------|
| **Batch Connect** | OOD framework for launching interactive HPC jobs through a web form |
| **connection.yml** | Declares runtime parameters (ports, tokens) to pass from job scripts to the session card |
| **context** | ERB object available in `.erb` files — gives access to every form field the user submitted |
| **ERB** | Embedded Ruby — templating language used in OOD scripts |
| **Lmod** | Lua-based module system for managing software environments |
| **manifest.yml** | YAML file defining app metadata for the OOD dashboard |
| **Passenger** | Phusion Passenger — app server used by OOD for web applications |
| **session** | ERB object available in `.erb` files — runtime info like job ID, cluster, and staged_root |
| **Slug** | URL-friendly identifier derived from a name (e.g., "AlphaFold" → `alphafold`) |
| **VNC** | Virtual Network Computing — protocol for remote desktop access |
