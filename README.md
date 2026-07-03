# Project Locations Update — Workflow Guide

(For testing purposes only)

Interactive guide for the **Project Locations management workflow**: collecting project locations in the PLM, validating, uploading to ODP, aggregating, and publishing the portfolio map.

**Documentation site:** _Enable GitHub Pages (see below) and add the URL here._

## Quick links

| Resource | Location |
|----------|----------|
| Live guide (after deploy) | GitHub Pages URL |
| Workflow structure | [`workflow.yaml`](workflow.yaml) |
| Author / maintenance guide | [`docs/creating-the-workflow-guide.md`](docs/creating-the-workflow-guide.md) |

## Publish to GitHub Pages

1. Push this repository to GitHub.
2. In repository **Settings → Pages → Build and deployment**, set source to **GitHub Actions**.
3. Push to `main` — the workflow in [`.github/workflows/docs.yml`](.github/workflows/docs.yml) builds and deploys automatically.
4. Set `site_url` and `repo_url` in [`mkdocs.yml`](mkdocs.yml) to match your repository.

## Editing content

| Change | Edit |
|--------|------|
| Step order, roles, tool names, URLs | `workflow.yaml` |
| How-to instructions, screenshots | `docs/steps/XX-….md`, `docs/assets/images/` |
| Overview diagram | `docs/assets/workflow-diagram.svg` |
| Site navigation | `mkdocs.yml` |

See [`docs/creating-the-workflow-guide.md`](docs/creating-the-workflow-guide.md) for the full maintenance guide.

## Workflow steps

1. **Collect** — Project Locations Model (PLM)
2. **Validate** — Online validator
3. **Visual plausibility check** — Online validator
4. **Upload data** — Open Data Platform (ODP)
5. **Aggregate data** — Python script
6. **Create map** — ODP portfolio map
