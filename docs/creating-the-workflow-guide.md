# Creating the Project Locations workflow guide

This document outlines how to build and maintain an interactive workflow guide for Git and web hosting. It is written for contributors who update content when tools, roles, or procedures change.

## Goal

Produce a single guide that:

- Shows the **full workflow at a glance**
- Lets users **click on a step** to see details about requirements, tools, procedures, and expected outputs
- Is **editable in Git**
- Is **accessible to non-technical readers** on a website
- Can be **updated incrementally** when one step changes, without rebuilding everything

---

## Design principles

| Principle | What it means in practice |
|-----------|---------------------------|
| **Single source of truth** | Structure, roles, and step order live in `workflow.yaml`. Text and screenshots live in Markdown beside it. |
| **Separate structure from detail** | Change a tool name or role in YAML once; step pages pull it automatically. |
| **Overview always visible** | Every detail page shows the workflow in the Contents panel on the left. |
| **Git-friendly formats** | YAML + Markdown + SVG/PNG. |

---

## Recommended repository layout

```
Project-Locations-update/
├── workflow.yaml                 # Structure: steps, roles, links, inputs/outputs (already exists)
├── docs/
│   ├── creating-the-workflow-guide.md   # This file
│   ├── index.md                         # Site home: interactive overview
│   └── steps/
│       ├── 01-collect.md
│       ├── 02-validate.md
│       ├── 03-visual-plausibility-check.md
│       ├── 04-upload-data.md
│       ├── 05-aggregate-data.md
│       └── 06-create-map.md
│   ├── assets/
│   │   ├── workflow-diagram.svg      # Overview figure
│   │   ├── glossary.json             # Glossary popup data (generated)
│   │   └── images/                   # Step screenshots: {step}-{description}.png
├── mkdocs.yml                        # Site navigation and theme (MkDocs Material)
└── README.md
```

Keep filenames stable (`01-collect.md` not `collect-v2.md`) so links and bookmarks do not break.

---

## Technology stack

**Recommended: [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)**

| Why | Benefit |
|-----|---------|
| Content in Markdown | Editable in GitHub web UI, VS Code, or Cursor |
| Built-in search | Non-technical users can search “validator” or “GeoJSON” |
| GitHub Pages | Free hosting from the same repo |
| Custom HTML/JS | Embed interactive SVG workflow on the home page |
| Low maintenance | No database, no login, no build servers beyond CI |

---

## How to edit when something changes

Use this table to find the smallest edit surface:

| Change | Edit | Rebuild site? |
|--------|------|---------------|
| New validator URL | `workflow.yaml` → `steps.validate.links` | Yes (automatic via CI) |
| Step renamed | `workflow.yaml` → `title`; rename one Markdown file; update `mkdocs.yml` nav | Yes |
| New performer / maintainer for a step | `workflow.yaml` → `performer` / `maintainer` on that step | Yes |
| New how-to instructions | `docs/steps/XX-….md` only | Yes |
| New screenshot | Add PNG to `docs/assets/images/` as `{step}-description.png`; one line in Markdown | Yes |
| New workflow step | Add block in `workflow.yaml`; new Markdown file; update SVG diagram; update `mkdocs.yml` nav | Yes |
| Legend / colour rules | `workflow.yaml` → `legend`; update `legend.svg` if shown | Yes |
| Wording only on one page | Single Markdown file | Yes |
| Glossary term added or updated | `docs/glossary.yaml` → run `python3 scripts/build_glossary.py` | Yes |

**Do not** edit the published HTML by hand. Always change source files and let CI deploy.

---

## Authoring workflow (for non-technical editors)

1. Open the repo on GitHub (or clone locally)
2. Identify what changed (tool, link, procedure, screenshot)
3. Edit the **one** YAML or Markdown file from the table above
4. Open a pull request — diff shows exactly what changed
5. Request Team DAI reviewer to approve if the step is in their remit
6. Merge → site updates within a few minutes

Optional: add a short **CHANGELOG.md** entry for major workflow revisions (`2026-v1`, etc.) and bump `version` in `workflow.yaml`.

---

## Quality checklist before publishing

- [ ] Every step has: purpose, inputs, numbered how-to, outputs, links
- [ ] All URLs in `workflow.yaml` open correctly
- [ ] Overview diagram step order matches `flow.sequence`
- [ ] Role colours on diagram match `legend` in YAML
- [ ] Each detail page has “previous / next step” navigation
- [ ] Screenshots have alt text (accessibility)
- [ ] Search finds key terms (PLM, validator, ODP, GeoJSON)
- [ ] Site readable on desktop and mobile

---

## Optional later improvements

- **Validate YAML on PR** — GitHub Action runs a schema check so broken structure is caught before merge
- **Generate nav from YAML** — script builds `mkdocs.yml` step list from `workflow.yaml` so nav never drifts
- **PDF export** — `mkdocs-material` print button or `mkdocs-with-pdf` for offline use
- **Keep PPTX as export only** — generate slides from YAML for workshops, not the other way around

---

## Reference: current step assignments

From `workflow.yaml` — update this table by editing YAML only; do not duplicate role logic in Markdown.

| # | Step | Performer | Maintainer | Tool |
|---|------|-----------|------------|------|
| 1 | Collect | PIA | Geodata-Desk | Project Locations Model (PLM) |
| 2 | Validate | PIA | DAI | Online validator |
| 3 | Visual plausibility check | KfW operations | DAI | Online validator |
| 4 | Upload data | KfW operations | DAI | Open Data Platform (ODP) |
| 5 | Aggregate data | Geodata-Desk | Geodata-Desk | Python script |
| 6 | Create map | Geodata-Desk | DAI | Open Data Platform (ODP) |
