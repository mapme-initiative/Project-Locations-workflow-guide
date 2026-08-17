# Project Locations management workflow

(For testing purposes)

Welcome to the guide for collecting and updating **Project Locations** at KfW. This guide has been prepared for external consultants and members of KfW Sector Teams.

**Version:** 2026-v0 · **[Glossary](glossary.md)** (hover over highlighted terms anywhere for a quick definition)

!!! warning "New collection or updating existing data?" Please check the Project Locations Model (PLM) Excel template filename for the version number.
    - **New collection** or **updating existing collection** → start at [Step 1: Collect](steps/01-collect.md)
    - **Existing collection with older version of Project Location Model (PLM Excel template; older than version 4.0)** → read [Updating existing data](updating-existing-data.md) first

---

## Interactive workflow

Click a step in the diagram below to access more detailed instructions. The overview diagram is also linked from every step page.

<div class="workflow-overview" markdown="0">
<p class="workflow-overview-caption">Click a step box to open its instructions.</p>
<div class="workflow-overview__diagram" aria-label="Project Locations management workflow"></div>
</div>

---

## Steps at a glance

| # | Step | Tool | Performer | Maintainer |
|---|------|------|-----------|------------|
| 1 | [Collect](steps/01-collect.md) | Project Locations Model (PLM) | external consultants | KfW Geodata-Desk |
| 2 | [Validate](steps/02-validate.md) | Online validator | external consultants | KfW Team Data Analytics & Intelligence (DAI) |
| 3 | [Visual plausibility check](steps/03-visual-plausibility-check.md) | Online validator | KfW sector teams (project managers/ project analysts) | KfW Team Data Analytics & Intelligence (DAI) |
| 4 | [Upload data](steps/04-upload-data.md) | KfW Open Data Platform (ODP) | KfW sector teams (project managers/ project analysts) | KfW Team Data Analytics & Intelligence (DAI) |
| 5 | [Aggregate data](steps/05-aggregate-data.md) | Python script | KfW Geodata-Desk | KfW Geodata-Desk |
| 6 | [Create map](steps/06-create-map.md) | KfW Open Data Platform (ODP) | KfW Geodata-Desk | KfW Team Data Analytics & Intelligence (DAI) |

---

## For authors

See [Creating the workflow guide](creating-the-workflow-guide.md) for how to edit this documentation in Git.

Structural changes (steps, roles, links) → edit `workflow.yaml` in the repository root.  
Procedural detail and screenshots → edit the relevant file under `docs/steps/`.
