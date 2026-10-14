# Appverse Contributor Guide

> **Related Docs:**
> [Appverse README Template](https://github.com/tamu-edu/appverse_readme_template)

## What Is the Appverse?

The Appverse is a shared catalog of Open OnDemand app configurations for HPC environments. The goal is to improve reuse and share deployment patterns instead of rebuilding them from scratch.

In simple terms:

- **Software** = the tool (e.g., Jupyter, RStudio, a visualization app)
- **App** = the Open OnDemand configuration that launches that software on an HPC system

This guide is for developers, HPC admins, and anyone who wants to contribute or improve apps in the catalog.

## Contributing an App

### When to Contribute

Apps for software are always encouraged.

If the software already has app implementations, use this to decide:

| Your situation | What to do |
|----------------|------------|
| Modified an existing app | Contribute changes back to the original repository rather than publishing a new version. Forks that diverge silently create maintenance burden for everyone (see [Avoid Fork Rot](#avoid-fork-rot)). |
| Only changed site-specific configuration | That likely doesn't warrant a new app — it's working as intended. Document your configuration instead. |
| Added significant new functionality (e.g., GPU support, containerization, a different execution model) | That's a good candidate for a new app. |
| The original app is no longer maintained | A maintained fork is welcome. Say in your README which app it continues. |

### High-Level Workflow

1. **Prepare your repository.** It needs a `manifest.yml`, a `README.md` and a `LICENSE`, and we recommend an `appverse.yml`. See [Repository Essentials](#repository-essentials) and [Best Practices](#best-practices).
2. **Check it yourself.** Run the same automated review the catalog uses, on your own machine, and fix what it finds. See [Check your app before you submit](#check-your-app-before-you-submit).
3. **Add it** on the [Add an Appverse repo](https://openondemand.connectci.org/appverse/add-repo) page by pasting the repository URL. Then click **Send for review** on its card.
4. **Review.** An automated review runs, then a reviewer checks it and decides. See [Review Process](#review-process).
5. **Maintain it.** Once listed, keep the app current as Open OnDemand and the software it runs change. If you stop maintaining it, archive the GitHub repository.

### Check your app before you submit

The catalog reviews every app with Appverse Review, an automated review that
runs in [Claude Code](https://claude.ai/code). You can run the same review on
your own repository while you build the app, so you see what a reviewer will
see and can fix it first.

Install it once, in Claude Code:

```
/plugin marketplace add Sweet-and-Fizzy/appverse-review
/plugin install appverse-review@appverse-review
```

Then open Claude Code in your app's repository and run:

```
/appverse-review:review-app
```

The review checks the repository's structure, security, documentation,
portability, code quality and upkeep against the
[Review Rubric](https://openondemand.connectci.org/appverse-review-rubric). It
ends with a list of what to fix before you submit, most important first. Run
it again after your changes. The review is automated and can be wrong, so
read each item and decide whether it applies.

More detail, including how to review one aspect at a time, is in the
[Appverse Review README](https://github.com/Sweet-and-Fizzy/appverse-review#usage).

### Support

The Appverse follows a shared responsibility model. There's a clear boundary between platform support and app support.

- **Platform Support (Discourse):** Use the [Open OnDemand Discourse](https://discourse.openondemand.org/) for issues related to the OOD platform itself — installation, authentication, web server errors, or core Batch Connect functionality.
- **App Support (GitHub):** For issues specific to an app in the Appverse, support happens at the source. Open an issue in that app's GitHub repository — this alerts the actual author of the code.

When you need help with an app:

- **Check the README first.** Most deployment issues are covered in the app's documentation.
- **Open a GitHub Issue** if you find a bug or need help with configuration.
- **Submit a Pull Request** if you've found a fix — contributing it back is the best way to help the community.

The app maintainer is your best resource for app-specific issues — they know the code, the deployment context, and the edge cases. The OOD team maintains the platform; the contributor community maintains the apps.

## Repository Essentials

Each app must live in a **public repository** (GitHub; GitLab support may be added in the future).

### Naming Your App and Repository

Your app name appears in the Appverse catalog and in the OOD dashboard. A good name helps deployers find your app and understand what it does at a glance.

**Conventions:**
- Start with the **software name** (e.g., "Jupyter", "RStudio", "MATLAB")
- Add a **differentiator** if there are multiple apps for the same software — describe what makes yours different (e.g., containerized, GPU-enabled, classroom mode)
- Keep it concise — aim for 2–4 words

**Good names:**
- `Jupyter Notebook` — clear, simple, no ambiguity
- `Jupyter (Apptainer)` — differentiates from a module-based version
- `RStudio Server (GPU)` — tells deployers this variant needs GPU nodes
- `MATLAB (Classroom)` — signals a specific use case

**Avoid:**
- Generic names that don't mention the software: `My HPC App`, `Interactive Job`
- Institution-specific names: `OSC Jupyter`, `TACC RStudio` — the catalog is for the whole community
- Redundant prefixes: `OOD Jupyter`, `Batch Connect Jupyter`

**Repository naming:** Follow the OOD convention of prefixing with `bc_` for Batch Connect apps (e.g., `bc_jupyter`, `bc_rstudio_gpu`).

### Required Files

To register a repo in the Appverse, it needs catalog metadata at its root:

| File | Purpose |
|------|---------|
| `appverse.yml` | The recommended way to describe your app(s). See [The appverse.yml](#the-appverseyml) below. |
| `manifest.yml` | The standard OOD app manifest that runs your app inside Open OnDemand. Required even when you have an `appverse.yml`. |
| `README.md` | Documentation for researchers and HPC administrators deploying the app |
| `LICENSE` | Open source license (MIT recommended by OOD community) |

For Batch Connect apps, also include:

| File | Purpose |
|------|---------|
| `CHANGELOG.md` | Version history with semantic versioning |
| `icon.png` or `icon.svg` | App icon for the OOD Dashboard |
| `form.yml` / `form.yml.erb` | User-facing launch form |
| `submit.yml.erb` | Job submission configuration |
| `template/` | Job template scripts |

### The appverse.yml

An `appverse.yml` at your repo root lets you control exactly how your app appears in the catalog. It's the recommended approach for any repo, new or already listed.

If your repo has no `appverse.yml`, the catalog infers a single app from your `manifest.yml` and your GitHub metadata. That works, but it can't set the software your app implements, its tags, or its maintainer, and it can't describe a repo that ships more than one app. Adding an `appverse.yml` lets you control all of it.

#### Adding an appverse.yml to an App Already in the Catalog

If your app is already listed and you want to switch it to an `appverse.yml`, you don't need to remove anything or submit it again. The catalog updates your existing entry in place.

1. Add an `appverse.yml` to your repo root and push it to your default branch.
2. Go to your maintenance hub at **My Appverse** and click **Re-sync from GitHub** on the repo.
3. Your app keeps its existing catalog entry, its URL, and its review status. Only the metadata changes.

If your `appverse.yml` declares several apps with an `apps:` list, the re-sync creates one catalog entry per app and removes the original single entry, since that app is now described by one of the `apps:` entries. See [Monorepos](#monorepos).

Re-syncing is also how you pull in any later edit to your `appverse.yml`. The catalog re-reads your repo on its own every few hours, so a change will land eventually, but a re-sync applies it right away. If the catalog notices your repo's structure changed before you re-sync, it flags the repo and asks you to re-sync rather than restructuring your entries on its own.

> **Don't re-submit through the add-a-repo form.** The form rejects a repository that's already registered and points you back to your hub. Re-sync is the supported path.

#### Registering New Software

The `software:` field in your `appverse.yml` must reference an existing Software entry in the catalog. Before filling it in, check whether your software is already listed [in the catalog](https://openondemand.connectci.org/appverse). If it isn't, you'll need to request that it be added — by [contacting the Appverse team](mailto:openondemand@sweetandfizzy.com?subject=Open%20OnDemand%20Appverse%20Software%20Request).

#### App Types

Set one of these as your app's `app_type` in `appverse.yml`. The value must match exactly (case-insensitive, but keep the hyphens):

| `app_type` value | Description |
|------------------|-------------|
| `batch-connect-basic` | Interactive jobs that run an HTTP server on a compute node (Jupyter, RStudio, etc.) — set `template: "basic"` in `submit.yml.erb` |
| `batch-connect-VNC` | Interactive jobs that run a VNC desktop on a compute node (MATLAB, Abaqus, remote desktops) — set `template: "vnc"` in `submit.yml.erb` |
| `companion_app` | A Passenger-style web app served via Open OnDemand (Ruby Rack, Python WSGI, or Node.js) |
| `widget` | Small UI components embedded in a dashboard |
| `dashboard` | Structured user interfaces (e.g., classroom portals, monitoring panels) |

#### Tags & Discoverability

Good tagging makes your app easier to discover in the catalog.

**Which field for which kind of tag?**

There are three separate places tags live, and they're easy to mix up because they overlap. Here's what goes where:

| Field | Where you set it | What it describes | Examples |
|---|---|---|---|
| `implementation_tags` | Your app's `appverse.yml` | **How your app runs** — the delivery technology | `apptainer`, `containerized`, `gpu-enabled`, `passenger`, `mcp` |
| `tags` (discovery) | Your `appverse.yml` (repo-level for monorepos) | **HPC infrastructure, tools, and skills** your app relates to | `slurm`, `globus`, `python`, `tensorflow`, `singularity` |
| Field of science / research domain | The **Software entry** (not your app) | **The research area** the software serves | `artificial intelligence`, `genomics`, `chemistry` |

The overlaps are the confusing part. `containerized` is an *implementation* tag (how it runs), while `containers`, `docker`, and `singularity` are *discovery* tags (infrastructure it uses). A subject like AI/ML can legitimately appear in **both** the discovery `tags` and the Software entry's research domain — putting it in both is fine, not a mistake. You don't set the research domain directly; it comes from the Software entry your app points at via `software:`.

**Implementation Tags (for Apps)**

Implementation tags describe how an app runs. Declare them in your app's `appverse.yml` under an `implementation_tags:` list (case-insensitive matching against the catalog's vocabulary). A value that matches is applied; one that doesn't is flagged in the form preview with a "Did you mean…?" suggestion and kept as an *unresolved tag* shown to reviewers — it does **not** reject your app.

**Current valid implementation tags** (live from the catalog — updated automatically by the doc-sync process):

{{ APPVERSE_IMPLEMENTATION_TAGS }}

Example `appverse.yml`:

```yaml
software: Jupyter
implementation_tags:
  - batch connect
  - containerized
```

**Research domain (from the Software entry)**

The research area(s) the software serves (e.g., AI/ML, genomics, chemistry, materials science). You don't set this on your app directly — it comes from the Software entry your `software:` value points at.

**Discovery Tags**

Discovery tags come from the shared Connect.CI tag taxonomy — HPC infrastructure, tools, and skills (see the table above). Browse the current taxonomy at [openondemand.connectci.org/tags](https://openondemand.connectci.org/tags) to pick the tags that fit your app. Declare the ones you think apply; don't trim your list to only what already exists. A tag that matches is applied. A tag that doesn't match is **not dropped and doesn't block your app** — it's kept as an *unresolved tag* and shown to reviewers, who can recommend it be added to the taxonomy (an administrator makes the actual addition). The submit preview suggests a close existing term when there is one, so prefer that for a near-miss — but a genuinely relevant new tag is worth declaring, because that's how the catalog learns what's missing.

> **Tip:** Apps with good tagging are significantly easier to find. Aim for at least 3–5 relevant tags.

#### Single-App Configuration

A single-app repo describes its one app with top-level fields:

```yaml
title: "RStudio Server"
description: "RStudio Server on HPC via Open OnDemand."
software: "RStudio"               # must match a Software in the catalog
app_type: "batch-connect-basic"   # must match an App Type (see above)
implementation_tags:
  - "gpu-enabled"
maintainer:
  name: "OSC User Support"
  support_url: "https://example.org/support"
website: "https://example.org/rstudio"
docs: "https://example.org/rstudio/docs"
```

Each app needs `name`, `description`, `app_type`, `maintainer.name`, `maintainer.support_url`, and a `software` value that matches a software entry in the catalog. Miss any of these and the app stays off the catalog until you add it and re-sync.

For the complete field list, see the [annotated `appverse.yml` reference](https://github.com/Sweet-and-Fizzy/ood-appverse/blob/main/docs/appverse.yml).

### The manifest.yml

The `manifest.yml` is the standard Open OnDemand app manifest — it's what actually runs your app inside OOD. Even when you have an `appverse.yml`, you still need a `manifest.yml`.

It must include:

```yaml
name: My App Name
category: Interactive Apps
subcategory: Servers
role: batch_connect
description: |
  A brief description of what this app does
  and what it launches.
```

Optional but helpful:

```yaml
icon: icon.png
new_window: false
caption: Launch My App
metadata:
  field_of_science: Chemistry
```

See the [OOD manifest.yml reference](https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/manifest.html) for full details.

### The README

Write for **HPC administrators** who need to deploy your app on their system.

Use the [Appverse README Template](https://github.com/tamu-edu/appverse_readme_template) as your starting point.

**Must have:**
1. **Overview** — what the app launches and who it's for
2. **Requirements** — compute node software, OOD version, scheduler
3. **Installation** — step-by-step deployment instructions
4. **Configuration** — what to customize and where (a table of site-specific values works well here)
5. **Known limitations** — what doesn't work, what's untested

**Should have:**
- **Features** — key capabilities specific to this OOD app
- **Troubleshooting** — common issues and solutions
- **Testing** — where it's been deployed and how to verify

**Exemplar:** [EpiGenomicsCode/ProteinStructure-OOD](https://github.com/EpiGenomicsCode/ProteinStructure-OOD) — covers features, prerequisites, dual-engine usage, monitoring, and troubleshooting.

**Anti-pattern:** A README that only contains the project name and a contact email, or one still showing unfilled template placeholders.

## Monorepos

A Monorepo holds several apps in one repository. Add an `apps:` list to your `appverse.yml`, with one entry per app, each living in its own subpath. Repo-level `maintainer` and `shared_implementation_tags` are inherited by every app:

```yaml
title: "Example Monorepo"
description: "Two example apps."
shared_implementation_tags:
  - "batch connect"
maintainer:
  name: "Example Team"
  support_url: "https://example.org/support"
apps:
  - path: "jupyter"
    name: "Jupyter (Example)"
    description: "Example Jupyter."
    software: "Jupyter"
    app_type: "batch-connect-basic"
    implementation_tags:
      - "containerized"           # ends up with: batch connect, containerized
  - path: "rstudio"
    name: "RStudio (Example)"
    description: "Example RStudio."
    software: "RStudio"
    app_type: "batch-connect-basic"
    # inherits maintainer and "batch connect"
```

Most repos hold one app and don't need this. Reach for a Monorepo only when one repository really does contain several distinct apps that ship together.

> **Note:** A Monorepo's top-level `tags:` are discovery tags for finding the repo in the catalog — a different vocabulary that does not flow to member apps. `implementation_tags` (per app) and `shared_implementation_tags` (inherited) are the ones that describe how an app runs.

## Collections

A Collection is a curated, multi-app bundle assembled around a shared purpose — a research domain, a workflow, or an institutional deployment package. Examples include a Bioinformatics Suite (AlphaFold, BLAST, RStudio for genomics), or an institutional starter pack that bundles the apps a new HPC site is most likely to need.

Unlike a Monorepo — where multiple apps share a single repository — a Collection draws from apps across many different repositories. The apps already exist in the catalog; a Collection is the curation layer on top.

Collections have dedicated support in the Appverse through a schema, catalog UI, and maintainer tooling. A collection maintainer is responsible for deciding which apps belong, keeping the membership current, and describing the Collection's purpose clearly so deployers understand what they're getting as a set.

To propose or create a Collection, reach out through the [Appverse Affinity Group](https://openondemand.connectci.org/affinity-groups/ood-appverse) or [OOD Discourse](https://discourse.openondemand.org/).

## Best Practices

### Repository & Metadata

**Use semantic versioning and releases.** Tag releases so deployers can pin to stable versions rather than tracking a moving branch.

```
v1.0.0  — Initial release
v1.1.0  — Added GPU support
v1.1.1  — Fixed module path for RHEL 9
```

Many apps have zero releases, forcing deployers to clone `main` with no way to know if things will break. **Exemplar:** [OSC/bc_osc_ansys_workbench](https://github.com/OSC/bc_osc_ansys_workbench) — 43 releases with consistent semantic versioning.

**Maintain a CHANGELOG.** A CHANGELOG helps deployers decide whether to update and what to watch for.

```markdown
## [1.1.0] - 2025-06-15
### Added
- GPU node support via `bc_num_slots`
### Changed
- Default memory increased to 4GB
### Fixed
- Module load failure on clusters without Lmod
```

**Include a license.** The OOD community recommends MIT. Without a license, others legally cannot use your code. OSC apps use dual licensing: MIT for code, CC-BY-4.0 for documentation. Either approach works.

### Configuration & Portability

**Centralize site-specific configuration.** There should be one clear place for a deployer to customize your app for their cluster. Don't scatter module names, paths, and queue names across multiple files.

```yaml
# form.yml — all site-specific values in one attributes block
attributes:
  modules:
    value: "abaqus/2022"          # ← Change this for your site
  partition:
    value: "batch"                # ← Change this for your site
```

**Avoid hardcoded paths.** Absolute paths to cluster-specific locations make your app impossible to deploy elsewhere without editing core scripts.

```erb
# Do this:
export SCRATCH_DIR="<%= scratch_dir %>"

# Don't do this:
export SCRATCH_DIR="/fs/scratch/$USER"    # Only works at one site
```

**Use `module load`, not absolute paths.** This is the most portable approach across HPC sites.

```erb
module load <%= modules %>
```

**Use OOD's built-in form features.** OOD 4.0+ provides automatic form fields that adapt to the cluster. Use them instead of hardcoding options.

| Feature | Use Instead Of |
|---------|---------------|
| `auto_queues` | Hardcoded partition dropdown |
| `auto_accounts` | Hardcoded account list |
| `auto_modules_<MODULE>` | Hardcoded version list |
| `auto_groups` | Hardcoded Unix group list |

```yaml
# form.yml — automatic queue detection (Slurm)
form:
  - auto_queues
  - auto_accounts
  - bc_num_hours
```

### Batch Connect Apps

If you're building or modifying a Batch Connect app, it helps to understand how the pieces fit together at runtime. OOD uses ERB (Embedded Ruby) templates to wire form values into job scripts and session views.

**The execution flow**

When a user fills out the form and clicks Launch:

1. `form.yml` (or `form.yml.erb`) renders the form and collects user input
2. `submit.yml.erb` translates form values into scheduler directives
3. `template/before.sh.erb` runs setup before the main script (ports, passwords, environment)
4. `template/script.sh.erb` launches the application
5. `template/after.sh.erb` runs cleanup when the session ends

**The `context` and `session` objects**

Inside any `.erb` file, two objects are available:

**`context`** — every form field becomes a method on `context`:

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

**Built-in helper methods**

OOD provides helpers you should use instead of rolling your own:

```bash
# Find an available port on the compute node:
port=$(find_port ${host})

# Generate a secure random password:
password="$(create_passwd 16)"
export RSTUDIO_PASSWORD="${password}"
```

**ERB syntax**

```erb
<%= expression %>     ← Renders the result as a string in the file
<%- statement -%>     ← Executes Ruby code but renders nothing
```

The `=` means "output this." The `-` means "run this silently." Getting these mixed up is a common source of bugs.

### Code Quality

**Add error handling to scripts.** A script that fails silently wastes the user's allocation and produces no useful debugging information.

```bash
#!/bin/bash
set -euo pipefail

module load "<%= modules %>" || { echo "ERROR: Failed to load module '<%= modules %>'"; exit 1; }

if [[ ! -x "$(command -v jupyter)" ]]; then
  echo "ERROR: jupyter not found after module load"
  exit 1
fi
```

**Document magic numbers and formulas.**

```erb
# License tokens required: 5 * (cores ^ 0.422), rounded down
# See: https://www.simuleon.com/abaqus-tokens-calculator/
num_tokens = (5 * (nodes * ppn) ** 0.422).floor
```

**Don't repeat yourself.** Use ERB to generate options from a data structure rather than duplicating blocks of configuration for each node type or cluster.

**Remove dead code.** Commented-out code adds noise and confuses deployers. Use version control to retrieve old code if needed.

**Validate form inputs.** Use OOD's built-in validation attributes to prevent invalid job submissions.

```yaml
attributes:
  bc_num_hours:
    widget: number_field
    min: 1
    max: 72
    step: 1
    value: 1
    label: "Wall time (hours)"
    help: "Maximum is 72 hours for batch partition"
    required: true
```

### Anti-Patterns to Avoid

#### Avoid Fork Rot

Forking an app for minor site-specific changes creates a maintenance burden. The fork diverges from upstream, misses bug fixes, and confuses the catalog with near-identical entries.

**Signs of fork rot:**
- Fork README still references the original institution
- No documentation of what changed
- Commits stop after initial customization
- Version numbers diverge from upstream

**Better approach:** Contribute improvements upstream. If you must fork, document exactly what differs and why.

#### Don't Disable Security Settings Without Explanation

If you must weaken a security setting, document the reason and the risk.

```bash
auth-encrypt-password=0    # Why is this disabled? Document the reason.
```

#### Don't Assume a Specific Scheduler

Where possible, use OOD's scheduler abstraction rather than SLURM-specific directives. If your app requires a specific scheduler, document it as a prerequisite.

#### Avoid Oversized Forms

Forms with 15+ fields are overwhelming. Group related options, use sensible defaults, and hide advanced options behind conditional display.

```yaml
attributes:
  advanced_options:
    widget: check_box
    label: "Show advanced options"
    value: 0
    data:
      hide-custom-memory-when-un-checked: true
  custom_memory:
    widget: number_field
    label: "Memory (GB)"
```

### Checklist Summary

Use this as a quick self-check before submitting your app.

**Must Have**
- [ ] `manifest.yml` with name, category, subcategory, role, description
- [ ] `README.md` with prerequisites, installation, configuration
- [ ] `LICENSE` file (MIT recommended)
- [ ] No hardcoded absolute paths in scripts
- [ ] Site-specific values centralized and clearly marked

**Should Have**
- [ ] `CHANGELOG.md` with semantic versioning
- [ ] `icon.png` or `icon.svg`
- [ ] Error handling in template scripts (`set -euo pipefail`)
- [ ] Input validation on form fields (min, max, required)
- [ ] Comments on non-obvious logic
- [ ] At least one tagged release

**Nice to Have**
- [ ] Screenshots of the running app
- [ ] `info.md.erb` with user-facing guidance
- [ ] `completed.md.erb` with post-job information
- [ ] Troubleshooting section in README
- [ ] CI/CD pipeline
- [ ] Environment variable documentation

## After You Contribute

### Review Process

Every new app, and every update to a listed app, is reviewed before it
appears in the catalog. A review has two parts. First, the automated review
(the same one you can [run yourself](#check-your-app-before-you-submit))
writes a report. Then a reviewer reads the report, checks it against your
repository, corrects anything the automated review got wrong, and makes the
decision. Both follow the
[Review Rubric](https://openondemand.connectci.org/appverse-review-rubric).

**Sending your app.** On your app's card, click **Send for review**. The
card shows where the review is: Submitted, In review, Decision, Live. If you
need to stop the review, for example to make a large change first, click
**Withdraw from review…** and send it again when you're ready.

**The decision.** The reviewer emails you the decision. Replying to that
email reaches the reviewer directly. Once the decision is sent you can read
the whole review from your app's card: the levels it was given, each
finding with the evidence behind it, and what the reviewer wrote.

There are four decisions:

| Decision | What it means | What you do |
|---|---|---|
| **Accept** | The app is ready. Any remaining notes are small polish. | Nothing. A reviewer publishes it. |
| **Accept with suggestions** | The app can be listed, and the review suggests improvements, such as clearer documentation or fewer hardcoded site settings. | The suggestions are optional. Reply to the email if you'd like to make changes before it goes live. Otherwise a reviewer publishes it. |
| **Request changes** | Something must be fixed first, such as a missing license, a file that doesn't parse, or a serious security problem. | Fix the repository on GitHub, then click **Re-submit** on the card. |
| **Reject** | The app can't be listed. This is for apps that duplicate one already in the catalog, are no longer maintained, are not Open OnDemand apps, or have a security problem that can't be fixed without a redesign. | The review says why. Reply to the email if you have questions. |

Most problems lead to Request changes, not Reject. A missing file or a
failed check is something you can fix.

**What becomes public.** Once your app is published, its review is public
too: the levels, the findings, and a short summary from the reviewer. If the
reviewer changed a finding's severity, the review shows that. Findings the
reviewer dismissed and the reviewer's internal notes are never public.

**After it's listed.** The catalog refreshes from your repository
automatically every few hours. Clicking **Re-sync from GitHub** on the card
pulls your changes in right away. When you publish a new release (or a new
tag, if the repository doesn't use releases), that version is reviewed the
same way, and the current version stays live while it is.

### Maintenance

App maintainers are responsible for:

- Keeping metadata current in `appverse.yml`
- Updating the README when the app's behavior changes
- Updating the CHANGELOG and tagging a new release for anything significant
- Responding to breaking changes in Open OnDemand or upstream software
- Addressing issues and pull requests from the community

Inactive apps may be archived, but we prefer revitalizing them with community help.

### Community & Governance

- Join the [Appverse Affinity Group](https://openondemand.connectci.org/affinity-groups/ood-appverse) to connect with other contributors and stay informed
- Join the [OOD Discourse](https://discourse.openondemand.org/) for community support and monthly Tips & Tricks calls
- Propose new tags or app types through community discussion
- Major policy decisions are community-driven
- Follow contribution guidelines and the [code of conduct](https://openondemand.connectci.org/code-of-conduct)

## Reference

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
