# Appverse Contributor Guide

> **Related Docs:**
> [Appverse README Template](https://github.com/tamu-edu/appverse_readme_template)

## What Is the Appverse?

The Appverse is a shared catalog of Open OnDemand apps. Instead of each HPC
site building its own app for Jupyter or RStudio, sites can find an app that
already works, install it, and improve it together.

Two words come up throughout this guide:

- **Software** is the tool itself, such as Jupyter, RStudio or MATLAB.
- **App** is the Open OnDemand configuration that launches that software on
  an HPC system. One piece of software can have several apps.

This guide is for anyone who builds or maintains an Open OnDemand app and
wants to share it. It covers what to put in your repository, how to write an
app other sites can install, and how the review works.

## Contributing an App

### When to Contribute

An app for software the catalog doesn't have yet is always welcome. If the
software already has an app, use this table to decide:

| Your situation | What to do |
|----------------|------------|
| You improved an existing app | Send your changes to the original repository instead of listing a copy. Copies that drift apart leave everyone maintaining the same fixes twice (see [Avoid Fork Rot](#avoid-fork-rot)). |
| You only changed settings for your site | That isn't a new app. Changing settings is what sites are meant to do. Document your settings instead. |
| You added something substantial, such as GPU support, a container, or a different way of running the software | That's a good candidate for a new app. |
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

The Open OnDemand team supports Open OnDemand itself. Each app's maintainer
supports their app.

- **Problems with Open OnDemand** (installing it, logging in, web server
  errors, Batch Connect itself) go to the
  [Open OnDemand Discourse](https://discourse.openondemand.org/).
- **Problems with an app** go to that app's GitHub repository. Check its
  README first, since most installation questions are answered there. If
  not, open an issue, which reaches the people who wrote the app. If you've
  found a fix, a pull request is the most useful thing you can send.

As a contributor, this means people will open issues on your repository. See
[Maintenance](#maintenance).

## Repository Essentials

Each app must be in a public GitHub repository.

### Naming Your App and Repository

Your app's name appears in the catalog and in the Open OnDemand dashboard.
A good name tells someone what the app runs and how it differs from other
apps for the same software.

- Start with the software's name, such as Jupyter, RStudio or MATLAB.
- If other apps exist for the same software, add what makes yours different,
  such as a container, GPUs or classroom use.
- Keep it to two to four words.

**Good names:**
- `Jupyter Notebook`
- `Jupyter (Apptainer)`, which runs in a container rather than from a module
- `RStudio Server (GPU)`, which needs GPU nodes
- `MATLAB (Classroom)`, for teaching

**Avoid:**
- Generic names that don't mention the software: `My HPC App`, `Interactive Job`
- Your institution's name: `OSC Jupyter`, `TACC RStudio`. The app is meant for every site.
- Redundant prefixes: `OOD Jupyter`, `Batch Connect Jupyter`

**Repository name:** Batch Connect app repositories usually start with
`bc_`, such as `bc_jupyter` or `bc_rstudio_gpu`.

### Required Files

Every repository needs these files:

| File | Purpose |
|------|---------|
| `manifest.yml` | The Open OnDemand manifest that runs your app. Always required: at the root, or in each app's folder in a [monorepo](#monorepos). |
| `README.md` | How a site installs and configures the app. At the root. |
| `LICENSE` | An open source license. The Open OnDemand community recommends MIT. At the root. |
| `appverse.yml` | Recommended. Tells the catalog how to list your app. At the root. See [The appverse.yml](#the-appverseyml). |

A Batch Connect app also needs:

| File | Purpose |
|------|---------|
| `form.yml` or `form.yml.erb` | The form users fill in to launch the app |
| `submit.yml.erb` | How the job is submitted to the scheduler |
| `template/` | The scripts the job runs |

and should have:

| File | Purpose |
|------|---------|
| `CHANGELOG.md` | What changed in each version |
| `icon.png` or `icon.svg` | The app's icon in the dashboard |

### The appverse.yml

An `appverse.yml` at your repository's root controls how your app appears in
the catalog. We recommend one for every repository, new or already listed.

Without one, the catalog builds a single app entry from your `manifest.yml`
and your GitHub details. That works, but it can't say which software your app
runs, its tags or its maintainer, and it can't list more than one app.

#### Adding an appverse.yml to an App Already in the Catalog

If your app is already listed, you can add an `appverse.yml` without
removing anything or submitting again. The catalog updates your entry in
place.

1. Add an `appverse.yml` to your repo root and push it to your default branch.
2. Go to your maintenance hub at **My Appverse** and click **Re-sync from GitHub** on the repo.
3. Your app keeps its existing catalog entry, its URL, and its review status. Only the metadata changes.

If your `appverse.yml` lists several apps under `apps:`, the re-sync creates
one catalog entry for each and removes the old single entry. See
[Monorepos](#monorepos).

Re-syncing also picks up any later change to your `appverse.yml`. The catalog
reads your repository on its own every few hours, so changes arrive anyway,
but a re-sync applies them right away. If your repository's layout changes,
for example from one app to several, the catalog waits for you to re-sync
rather than reorganizing your entries on its own.

> **Don't add the repository again.** The Add an Appverse repo page turns
> away a repository that's already registered. Re-sync instead.

#### Registering New Software

The `software:` field in your `appverse.yml` must name software already in
the [catalog](https://openondemand.connectci.org/appverse). If yours isn't
there, [ask the Appverse team](mailto:openondemand@sweetandfizzy.com?subject=Open%20OnDemand%20Appverse%20Software%20Request)
to add it.

#### App Types

Set your app's `app_type` in `appverse.yml` to one of these values. Spell it
exactly as shown. Capitals don't matter, but the hyphens and underscore do.

| `app_type` value | Description |
|------------------|-------------|
| `batch-connect-basic` | A job that runs a web server on a compute node, such as Jupyter or RStudio. Set `template: "basic"` in `submit.yml.erb`. |
| `batch-connect-VNC` | A job that runs a remote desktop on a compute node, such as MATLAB or Abaqus. Set `template: "vnc"` in `submit.yml.erb`. |
| `companion_app` | A web app that Open OnDemand serves directly (Passenger: Ruby Rack, Python WSGI or Node.js). |
| `widget` | A small component shown on a dashboard. |
| `dashboard` | A larger interface, such as a classroom portal or a monitoring panel. |

#### Tags & Discoverability

Good tagging makes your app easier to discover in the catalog.

Tags help people find your app. There are three kinds, set in different
places, and they overlap enough to be confusing:

| Field | Where you set it | What it describes | Examples |
|---|---|---|---|
| `implementation_tags` | Your app's `appverse.yml` | How your app runs | `apptainer`, `containerized`, `gpu-enabled`, `passenger`, `mcp` |
| `tags` (discovery) | Your `appverse.yml` (once per repository in a monorepo) | The HPC tools, systems and skills your app relates to | `slurm`, `globus`, `python`, `tensorflow`, `singularity` |
| Research domain | The Software entry, not your app | The research area the software serves | `artificial intelligence`, `genomics`, `chemistry` |

For example, `containerized` is an implementation tag because it says how
the app runs, while `docker` and `singularity` are discovery tags because
they name tools the app uses. A subject such as AI can be both a discovery
tag and the software's research domain, and that's fine. You don't set the
research domain yourself. It comes from the Software entry your `software:`
field names.

**Implementation Tags (for Apps)**

List them under `implementation_tags:` in your app's `appverse.yml`.
Capitals don't matter. A tag that's on the list below is applied. One that
isn't gets a "Did you mean…?" suggestion in the preview and is shown to the
reviewer. It doesn't stop your app being listed.

The current implementation tags, kept up to date from the catalog:

{{ APPVERSE_IMPLEMENTATION_TAGS }}

Example `appverse.yml`:

```yaml
software: Jupyter
implementation_tags:
  - batch connect
  - containerized
```

**Research domain (from the Software entry)**

The research areas the software serves, such as AI, genomics or chemistry.
This comes from the Software entry, so you don't set it on your app.

**Discovery Tags**

Discovery tags come from the shared Connect.CI tag list, which you can
browse at [openondemand.connectci.org/tags](https://openondemand.connectci.org/tags).
Add every tag that fits your app, not only ones already on the list. A tag
that's on the list is applied. One that isn't is kept and shown to the
reviewer, who can suggest adding it to the list. If the preview suggests a
close existing tag, use that. If your tag is genuinely new, keep it, because
that's how the list grows.

> **Tip:** Aim for at least three to five tags. Well-tagged apps are much
> easier to find.

#### Single-App Configuration

A repository with one app describes it with top-level fields:

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

The app needs `description`, `app_type`, `maintainer.name`,
`maintainer.support_url`, and a `software` value that names software in the
catalog. If any is missing, the app stays out of the catalog until you add it
and re-sync. `title` is optional, but set it: without it the catalog uses the
repository's name, and `bc_rstudio` makes a poor title.

Every field is explained in the
[annotated `appverse.yml` reference](https://github.com/Sweet-and-Fizzy/ood-appverse/blob/main/docs/appverse.yml).

### The manifest.yml

The `manifest.yml` is what Open OnDemand reads to run your app, so you need
one even when you have an `appverse.yml`. It must include:

```yaml
name: My App Name
category: Interactive Apps
subcategory: Servers
role: batch_connect
description: |
  A brief description of what this app does
  and what it launches.
```

These are optional but useful:

```yaml
icon: icon.png
new_window: false
caption: Launch My App
metadata:
  field_of_science: Chemistry
```

The [Open OnDemand manifest reference](https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/manifest.html) has the full list.

### The README

Write the README for the HPC administrator at another site who has to
install your app. Start from the
[Appverse README Template](https://github.com/tamu-edu/appverse_readme_template).

It should cover:

1. **Overview.** What the app launches and who it's for.
2. **Requirements.** What has to be on the compute nodes, which Open
   OnDemand version, and which scheduler.
3. **Installation.** Step by step.
4. **Configuration.** What a site changes and where. A table of the
   site-specific values works well.
5. **Known limitations.** What doesn't work or hasn't been tested.

It helps to add the app's main features, common problems and how to fix
them, and where it has been tested.

[EpiGenomicsCode/ProteinStructure-OOD](https://github.com/EpiGenomicsCode/ProteinStructure-OOD)
is a good example. A README with only the project name and a contact email,
or with the template's placeholder text still in it, will be sent back.

## Monorepos

A monorepo holds several apps in one repository. List them under `apps:` in
your `appverse.yml`, one entry per app, each in its own folder. Every app
inherits the repository's `maintainer` and `shared_implementation_tags`:

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

Most repositories hold one app and don't need this. Use a monorepo only when
one repository really does contain several separate apps that are released
together.

> **Note:** A monorepo's top-level `tags:` are discovery tags for the
> repository and aren't passed to its apps. `implementation_tags` (each app's
> own) and `shared_implementation_tags` (inherited by every app) say how the
> apps run.

## Collections

A collection is a hand-picked set of apps with a shared purpose, such as a
bioinformatics suite (AlphaFold, BLAST, RStudio) or a starter set for a new
HPC site. A monorepo is several apps in one repository. A collection gathers
apps from many repositories that are already in the catalog.

Each collection has a maintainer, who decides which apps belong, keeps the
list current, and explains what the set is for.

To propose a collection, get in touch through the [Appverse Affinity Group](https://openondemand.connectci.org/affinity-groups/ood-appverse) or [Open OnDemand Discourse](https://discourse.openondemand.org/).

## Best Practices

### Repository & Metadata

**Make releases.** Tag versions using semantic versioning, so a site can
install a known version instead of whatever is on `main` today.

```
v1.0.0  — Initial release
v1.1.0  — Added GPU support
v1.1.1  — Fixed module path for RHEL 9
```

Many apps have no releases, so a site can't tell whether pulling the latest
code will break something. [OSC/bc_osc_ansys_workbench](https://github.com/OSC/bc_osc_ansys_workbench)
is a good example. Each new release is also how a listed app gets reviewed
again (see [Review Process](#review-process)).

**Keep a CHANGELOG.** It tells a site whether to update and what to watch
for.

```markdown
## [1.1.0] - 2025-06-15
### Added
- GPU node support via `bc_num_slots`
### Changed
- Default memory increased to 4GB
### Fixed
- Module load failure on clusters without Lmod
```

**Include a license.** Without one, nobody else can legally use your code.
The Open OnDemand community recommends MIT. OSC's apps use MIT for code and
CC-BY-4.0 for documentation, and that works too.

### Configuration & Portability

A site-specific value is anything that has to change for your app to run
at another site: the cluster, partition, account, module, absolute paths and
container image. The goal is for a site to install your app without editing
your code.

**Put site-specific values in form attributes.** Then a site can set them in
its own Open OnDemand configuration instead of editing your repository.
Don't scatter module names, paths and partitions across your scripts.

```yaml
# form.yml: site-specific values as attributes, with your site's defaults
attributes:
  modules:
    value: "abaqus/2022"
  partition:
    value: "batch"
```

**Don't hardcode paths.** A path to your cluster's scratch or project space
means every other site has to edit your scripts.

```erb
# Do this:
export SCRATCH_DIR="<%= scratch_dir %>"

# Don't do this:
export SCRATCH_DIR="/fs/scratch/$USER"    # Only works at one site
```

**Load software with `module load`, not an absolute path.** Most HPC sites
use modules, so this works almost everywhere.

```erb
module load <%= modules %>
```

**Use Open OnDemand's automatic form fields.** Since version 4.0, Open
OnDemand can fill some form fields from the cluster itself. Use them instead
of hardcoded lists.

| Field | Use it instead of |
|---------|---------------|
| `auto_queues` | Hardcoded partition dropdown |
| `auto_accounts` | Hardcoded account list |
| `auto_modules_<MODULE>` | Hardcoded version list |
| `auto_groups` | Hardcoded Unix group list |

```yaml
# form.yml: fill partitions and accounts from the cluster (Slurm)
form:
  - auto_queues
  - auto_accounts
  - bc_num_hours
```

### Batch Connect Apps

This section explains how a Batch Connect app's files work together. Open
OnDemand uses ERB (Embedded Ruby) templates to put the user's form values
into the job's scripts.

**What happens when a user clicks Launch**

1. `form.yml` (or `form.yml.erb`) shows the form and collects the user's
   choices.
2. `submit.yml.erb` turns those choices into the scheduler request.
3. `template/before.sh.erb` does the setup, such as picking a port, making
   a password and setting the environment.
4. `template/script.sh.erb` starts the application.
5. `template/after.sh.erb` cleans up when the session ends.

**The `context` and `session` objects**

Two objects are available in any `.erb` file.

**`context`** holds the user's form values. Each form field becomes a method:

```bash
# In script.sh.erb
module load rstudio/<%= context.version %>

<%- if context.version == "4.3" -%>
  # Version-specific setup
<%- end -%>
```

**`session`** holds details of the running session:

| Attribute | What it gives you |
|-----------|-------------------|
| `session.id` | Unique session identifier |
| `session.job_id` | The scheduler job ID |
| `session.cluster` | Cluster name, as in your `clusters.d/` configuration |
| `session.staged_root` | Path to the session's staging directory |

**Built-in helper methods**

Use Open OnDemand's helpers instead of writing your own:

```bash
# Find an available port on the compute node:
port=$(find_port ${host})

# Generate a secure random password:
password="$(create_passwd 16)"
export RSTUDIO_PASSWORD="${password}"
```

**ERB syntax**

```erb
<%= expression %>     ← writes the result into the file
<%- statement -%>     ← runs Ruby code and writes nothing
```

`<%=` writes something into the file. `<%-` runs code without writing
anything. Mixing them up is a common bug.

### Code Quality

**Stop with a clear message when something fails.** If a script carries on
after a step fails, the user's job wastes its time allocation and the log
doesn't say why. Check the steps that matter, such as `cd`, `module load` and
`mkdir`.

```bash
#!/bin/bash

module load "<%= modules %>" || { echo "ERROR: could not load module '<%= modules %>'"; exit 1; }

if ! command -v jupyter >/dev/null; then
  echo "ERROR: jupyter not found after module load"
  exit 1
fi
```

Avoid `set -e` in job scripts. It can stop a script that starts processes in
the background.

**Explain numbers and formulas** with a comment.

```erb
# License tokens required: 5 * (cores ^ 0.422), rounded down
# See: https://www.simuleon.com/abaqus-tokens-calculator/
num_tokens = (5 * (nodes * ppn) ** 0.422).floor
```

**Don't copy and paste blocks.** If you have the same block for each node
type or cluster, generate it with ERB from a list instead.

**Remove commented-out code.** It confuses the next person who reads the
app. Git keeps the old version if you need it.

**Check form values before the job is submitted.** Give each number field
that reaches the scheduler a `min`, and make it `required`. A free-text field
that reaches the scheduler needs a `pattern`.

```yaml
attributes:
  bc_num_hours:
    widget: number_field
    min: 1
    step: 1
    value: 1
    label: "Wall time (hours)"
    required: true
```

A `max` is fine, but leave it out if it depends on your site's limits. A
`max: 72` that's right for your partition is wrong for another site, which
can set its own limit in its configuration.

### Anti-Patterns to Avoid

#### Avoid Fork Rot

Copying an app to make small changes for your site leaves you maintaining a
copy. It drifts from the original, misses its fixes, and fills the catalog
with near-identical apps.

A copy has drifted when its README still names the original institution,
nothing says what changed, commits stopped after the first changes, or its
version numbers no longer match the original's.

Send your improvements to the original repository instead. If you do need
your own copy, say exactly what differs and why. If the original is no
longer maintained, a fork that you maintain is welcome.

#### Don't Disable Security Settings Without Explanation

If you have to turn off a security setting, say why next to it, and what
the risk is.

```bash
auth-encrypt-password=0    # Say why this is off and what the risk is.
```

#### Don't Assume a Specific Scheduler

Where you can, use Open OnDemand's general scheduler settings rather than
Slurm-only directives. If your app does need a particular scheduler, list it
in the README's requirements.

#### Avoid Oversized Forms

A form with 15 or more fields is hard to use. Group related fields, choose
good defaults, and hide advanced options until the user asks for them.

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

### Checklist

A short list to go through before you submit. The
[automated review](#check-your-app-before-you-submit) checks most of it for
you.

**Must Have**
- [ ] `manifest.yml` with name, category, subcategory, role and description
- [ ] `README.md` with requirements, installation and configuration
- [ ] `LICENSE` (MIT recommended)
- [ ] No hardcoded absolute paths in scripts
- [ ] Site-specific values in form attributes

**Should Have**
- [ ] `CHANGELOG.md` with semantic versions
- [ ] `icon.png` or `icon.svg`
- [ ] Scripts stop with a message when an important step fails
- [ ] Number fields that reach the scheduler have a `min` and are `required`
- [ ] Comments on anything that isn't obvious
- [ ] At least one tagged release

**Nice to Have**
- [ ] Screenshots of the running app
- [ ] `info.md.erb` with guidance for users
- [ ] `completed.md.erb` with information after the job ends
- [ ] A troubleshooting section in the README
- [ ] Automated tests (CI)
- [ ] Environment variables documented

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

Once your app is listed, you look after it:

- Keep `appverse.yml` up to date.
- Update the README when the app changes.
- Update the CHANGELOG and tag a release for anything significant.
- Fix the app when a new Open OnDemand version or a new version of the
  software breaks it.
- Answer issues and pull requests.

If you can't maintain the app any more, archive the repository on GitHub.
We'd rather find the app a new maintainer than lose it.

### Community & Governance

- Join the [Appverse Affinity Group](https://openondemand.connectci.org/affinity-groups/ood-appverse) to meet other contributors and hear about changes.
- Join the [Open OnDemand Discourse](https://discourse.openondemand.org/) for help and the monthly Tips & Tricks calls.
- Propose new tags or app types in the Affinity Group or on Discourse. Major policy decisions are made by the community.
- Follow the [code of conduct](https://openondemand.connectci.org/code-of-conduct).

## Reference

### Open OnDemand References

| Resource | URL |
|----------|-----|
| App Development Guide | https://osc.github.io/ood-documentation/latest/how-tos/app-development.html |
| Interactive Apps Docs | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive.html |
| form.yml Reference | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/form.html |
| manifest.yml Reference | https://osc.github.io/ood-documentation/latest/how-tos/app-development/interactive/manifest.html |
| submit.yml.erb Reference | https://osc.github.io/ood-documentation/latest/reference/files/submit-yml-erb.html |
| Open OnDemand Discourse | https://discourse.openondemand.org/ |
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
├── view.html.erb         # Connection view: the "Connect" button and any login setup
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
| **Batch Connect** | The Open OnDemand framework for launching interactive HPC jobs from a web form |
| **connection.yml** | Declares runtime parameters (ports, tokens) to pass from job scripts to the session card |
| **context** | ERB object in `.erb` files that holds every form value the user submitted |
| **ERB** | Embedded Ruby, the template language Open OnDemand uses |
| **Lmod** | Lua-based module system for managing software environments |
| **manifest.yml** | The file that tells Open OnDemand how to show and run the app |
| **Passenger** | The app server Open OnDemand uses to run web apps |
| **session** | ERB object in `.erb` files that holds the running session's details, such as job ID, cluster and staged_root |
| **Slug** | URL-friendly identifier made from a name, such as "AlphaFold" → `alphafold` |
| **VNC** | Virtual Network Computing, the protocol for remote desktops |
