# Appverse App Best Practices

> **Related Docs:**
> [Appverse Contributor Guide](https://openondemand.connectci.org/appverse-contributor-documentation) |
> [Appverse Reviewer Checklist](https://openondemand.connectci.org/appverse-reviewer-checklist) |
> [Appverse README Template](https://github.com/keeganasmith2003/appverse_readme_template)

Best practices for developing Open OnDemand apps for the Appverse catalog, based on analysis of community apps and OOD documentation.

## Repository & Metadata

### Use Semantic Versioning and Releases

Tag releases so deployers can pin to stable versions rather than tracking a moving branch.

**Do this:**
```
v1.0.0  — Initial release
v1.1.0  — Added GPU support
v1.1.1  — Fixed module path for RHEL 9
```

**Exemplar:** [OSC/bc_osc_ansys_workbench](https://github.com/OSC/bc_osc_ansys_workbench) — 43 releases with consistent semantic versioning.

**Common problem:** Many apps have zero releases. Deployers are forced to clone `main` with no way to know if things will break.

### Maintain a CHANGELOG

A CHANGELOG helps deployers decide whether to update and what to watch for.

**Do this:**
```markdown
## [1.1.0] - 2025-06-15
### Added
- GPU node support via `bc_num_slots`
### Changed
- Default memory increased to 4GB
### Fixed
- Module load failure on clusters without Lmod
```

**Common problem:** Apps change behavior between commits with no record of what changed or why.

### Write a Complete README

Your README is the first thing a potential deployer sees. A sparse README signals an app that will be hard to deploy and maintain.

Start with the [Appverse README Template](https://github.com/keeganasmith2003/appverse_readme_template) and fill in every section with real content. See the [filled-in template with examples](https://github.com/keeganasmith2003/appverse_readme_template) for guidance on what good content looks like.

**Must include:**
1. Overview — what it launches and who it's for
2. Requirements — compute node software, OOD version, scheduler
3. Installation — step-by-step deployment instructions
4. Configuration — what to customize and where (with a table of site-specific values)
5. Known limitations

**Should include:**
- Troubleshooting section with common issues and solutions
- Screenshots of the running app
- Testing section — where it's been deployed and how to verify
- Links to the upstream software documentation

**Exemplar:** [EpiGenomicsCode/ProteinStructure-OOD](https://github.com/EpiGenomicsCode/ProteinStructure-OOD) — covers features, prerequisites, dual-engine usage, monitoring, and troubleshooting.

**Anti-pattern:** A README that's still the unfilled template skeleton with "Key feature 1, Key feature 2" placeholders, or one that only contains the project name and a contact email.

### Include a License

The OOD community recommends MIT. Without a license, others legally cannot use your code.

OSC apps use dual licensing: MIT for code, CC-BY-4.0 for documentation. Either approach works.

## Configuration & Portability

### Centralize Site-Specific Configuration

There should be **one clear place** for a deployer to customize your app for their cluster. Don't scatter module names, paths, and queue names across multiple files.

**Do this:**
```yaml
# form.yml — all site-specific values in one attributes block
attributes:
  modules:
    value: "abaqus/2022"          # ← Change this for your site
  partition:
    value: "batch"                # ← Change this for your site
```

**Don't do this:**
```erb
# submit.yml.erb — hardcoded deep in template logic
<% if node_type == "gpu" %>
  module load cuda/11.7            <%# Buried in conditional %>
  #SBATCH --partition=gpu-a100     <%# Hardcoded partition %>
<% end %>
```

### Avoid Hardcoded Paths

Absolute paths to cluster-specific locations make your app impossible to deploy elsewhere without editing core scripts.

**Do this:**
```erb
export SCRATCH_DIR="<%= scratch_dir %>"
```

**Don't do this:**
```erb
export SCRATCH_DIR="/fs/scratch/$USER"    # Only works at one site
```

**Common problem:** [OSC/bc_osc_jupyter](https://github.com/OSC/bc_osc_jupyter) has paths like `/fs/project`, `/fs/scratch`, `/nfsroot` hardcoded in submit.yml.erb. This is fine for OSC's internal use but makes the app harder to adapt.

### Use Module Names, Not Absolute Paths

OOD apps should load software via `module load` rather than absolute paths. This is the most portable approach across HPC sites.

```erb
module load <%= modules %>
```

Most analyzed apps do this well. It's one of the strongest conventions in the OOD ecosystem.

### Use OOD's Built-In Form Features

OOD 4.0+ provides automatic form fields that adapt to the cluster. Use them instead of hardcoding options.

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

## Code Quality

### Add Error Handling to Scripts

Every app we analyzed lacked meaningful error handling in its template scripts. A script that fails silently wastes the user's allocation and produces no useful debugging information.

**Do this:**
```bash
#!/bin/bash
set -euo pipefail

module load "<%= modules %>" || { echo "ERROR: Failed to load module '<%= modules %>'"; exit 1; }

if [[ ! -x "$(command -v jupyter)" ]]; then
  echo "ERROR: jupyter not found after module load"
  exit 1
fi
```

**Don't do this:**
```bash
module load abaqus
cd /some/path
./run_app
```

If `module load` fails, the script continues and the user gets a cryptic error much later (or the job just exits with no output).

### Document Magic Numbers and Formulas

If your code contains calculations or constants that aren't self-explanatory, add a comment.

**Real example from OSC/bc_osc_abaqus:**
```erb
# License tokens required: 5 * (cores ^ 0.422), rounded down
# See: https://www.simuleon.com/abaqus-tokens-calculator/
num_tokens = (5 * (nodes * ppn) ** 0.422).floor
```

Without the comment, `0.422` is a mystery to anyone maintaining the code.

### Don't Repeat Yourself

Several apps duplicate large blocks of configuration for each node type or cluster.

**Common problem:** [WFU-HPC/OOD-apps.server.rstudio](https://github.com/WFU-HPC/OOD-apps.server.rstudio) defines 14 node types with identical `data` attributes, differing only in label and value. This makes the form fragile and hard to update.

**Better approach:** Use ERB to generate options from a data structure:
```erb
<%
node_types = {
  "Standard (36 cores)" => "standard",
  "GPU (V100)"          => "gpu",
  "Large Memory"        => "largemem",
}
%>
```

### Remove Dead Code

Commented-out code, unused variables, and abandoned features add noise and confuse deployers trying to understand what's active.

**Don't do this:**
```yaml
# - bc_num_slots
# - extra_jupyter_args    # TODO: maybe add this back later?
```

Either the code is needed or it isn't. Use version control to retrieve old code if needed.

### Validate Form Inputs

OOD provides built-in validation attributes. Use them to prevent invalid job submissions.

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

## Documentation Standards

### Write for Your Audience

The primary audience for an Appverse app README is an **HPC system administrator** who wants to deploy your app on their system. They need to know:

- What to install on compute nodes
- What to configure in the OOD app
- What might go wrong

A secondary audience is **end users** who want to understand what the app does. Consider an `info.md.erb` panel for user-facing guidance.

### Include Screenshots

A screenshot of the running app helps deployers verify their installation is working correctly and helps users understand what they'll get. Place screenshots in a `docs/` or `screenshots/` directory and reference them from the README.

### Document Environment Variables

If your scripts expect environment variables beyond what OOD provides, list them explicitly.

```markdown
## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ALPHAFOLD_DB` | Yes | Path to AlphaFold database directory |
| `SINGULARITY_IMAGE` | Yes | Path to container image |
| `CUDA_VISIBLE_DEVICES` | No | Set automatically by scheduler |
```

## Anti-Patterns to Avoid

### Avoid Fork Rot

Forking an app for minor site-specific changes creates a maintenance burden. The fork diverges from upstream, misses bug fixes, and confuses the catalog with near-identical entries.

**Signs of fork rot:**
- Fork README still references the original institution
- No documentation of what changed
- Commits stop after initial customization
- Version numbers diverge from upstream

**Better approach:** Contribute improvements upstream. If you must fork, document exactly what differs and why.

**Example:** [CHPC-UofU/bc_osc_abaqus](https://github.com/CHPC-UofU/bc_osc_abaqus) is a fork of OSC's app. It adds useful features (form.js for frontend logic) that could benefit the original but haven't been contributed back.

### Don't Disable Security Settings Without Explanation

Some apps disable security features for convenience without documenting why.

**Real example found in an RStudio app:**
```bash
auth-encrypt-password=0    # Why is password encryption disabled?
```

If you must weaken a security setting, document the reason and the risk.

### Don't Assume a Specific Scheduler

Where possible, use OOD's scheduler abstraction rather than SLURM-specific directives. If your app requires a specific scheduler, document that as a prerequisite.

### Avoid Oversized Forms

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

## Checklist Summary

Use this as a quick self-check before submitting your app.

### Must Have
- [ ] `manifest.yml` with name, category, subcategory, role, description
- [ ] `README.md` with prerequisites, installation, configuration
- [ ] `LICENSE` file (MIT recommended)
- [ ] No hardcoded absolute paths in scripts
- [ ] Site-specific values centralized and clearly marked

### Should Have
- [ ] `CHANGELOG.md` with semantic versioning
- [ ] `icon.png` or `icon.svg`
- [ ] Error handling in template scripts (`set -euo pipefail`)
- [ ] Input validation on form fields (min, max, required)
- [ ] Comments on non-obvious logic
- [ ] At least one tagged release

### Nice to Have
- [ ] Screenshots of the running app
- [ ] `info.md.erb` with user-facing guidance
- [ ] `completed.md.erb` with post-job information
- [ ] Troubleshooting section in README
- [ ] CI/CD pipeline
- [ ] Environment variable documentation
