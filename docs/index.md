# Project Locations management workflow

Welcome to the guide for updating **project locations** at <span class="glossary-term" data-term="kfw">KfW</span>. This workflow takes project-level location data from collection through validation, upload, aggregation, and map publication on the Open Data Platform (<span class="glossary-term" data-term="odp">ODP</span>).

**Version:** 2026-v0 · **[Glossary](glossary.md)** (hover over highlighted terms anywhere for a quick definition)

!!! warning "New collection or updating existing data?"
    - **New collection** or **updating existing collection already on ODP** → start at [Step 1: Collect](steps/01-collect.md)
    - **Existing collection with older version of PLM** → read [Updating existing data](updating-existing-data.md) first

---

## Interactive workflow

Click a step in the diagram below to open detailed instructions. The overview diagram is also linked from every step page.

<div class="workflow-overview" markdown="0">
<p class="workflow-overview-caption">Click a step box to open its instructions.</p>
<div class="workflow-overview__diagram" aria-label="Project Locations management workflow"></div>
</div>

---

## Steps at a glance

| # | Step | Tool | Performer | Maintainer |
|---|------|------|-----------|------------|
| 1 | [Collect](steps/01-collect.md) | Project Locations Model (PLM) | <span class="glossary-term" data-term="pia">PIA</span> | <span class="glossary-term" data-term="idv">Geodata-Desk</span> |
| 2 | [Validate](steps/02-validate.md) | Online validator | <span class="glossary-term" data-term="pia">PIA</span> | <span class="glossary-term" data-term="zdv">ZDV</span> (<span class="glossary-term" data-term="dai">DAI</span>) |
| 3 | [Visual plausibility check](steps/03-visual-plausibility-check.md) | Online validator | <span class="glossary-term" data-term="kfw">KfW</span> (<span class="glossary-term" data-term="pmpa">PM/PA</span>) | <span class="glossary-term" data-term="zdv">ZDV</span> (<span class="glossary-term" data-term="dai">DAI</span>) |
| 4 | [Upload data](steps/04-upload-data.md) | <span class="glossary-term" data-term="odp">ODP</span> | <span class="glossary-term" data-term="kfw">KfW</span> (<span class="glossary-term" data-term="pmpa">PM/PA</span>) | <span class="glossary-term" data-term="zdv">ZDV</span> (<span class="glossary-term" data-term="dai">DAI</span>) |
| 5 | [Aggregate data](steps/05-aggregate-data.md) | Python script | <span class="glossary-term" data-term="idv">Geodata-Desk</span> | <span class="glossary-term" data-term="idv">Geodata-Desk</span> |
| 6 | [Create map](steps/06-create-map.md) | <span class="glossary-term" data-term="odp">ODP</span> | <span class="glossary-term" data-term="idv">Geodata-Desk</span> | <span class="glossary-term" data-term="zdv">ZDV</span> (<span class="glossary-term" data-term="dai">DAI</span>) |

---

## For authors

See [Creating the workflow guide](creating-the-workflow-guide.md) for how to edit this documentation in Git.

Structural changes (steps, roles, links) → edit `workflow.yaml` in the repository root.  
Procedural detail and screenshots → edit the relevant file under `docs/steps/`.
