--8<-- "includes/workflow-nav.md"

# Step 3: Visual plausibility check

!!! overview
    **Tool:** [Online validator](https://mapme-initiative.github.io/project_location_model/project-location-validator/index.html)

    **Performed by:** KfW operations (<span class="glossary-term" data-term="pmpa">PM/PA</span>)

    **Maintained by:** <span class="glossary-term" data-term="zdv">ZDV</span> (<span class="glossary-term" data-term="dai">DAI</span>)

    **Previous step:** [2 Validate](02-validate.md)

    **Next step:** [4 Upload data](04-upload-data.md)

## Purpose

Visually verify that validated project locations appear correctly on the map before uploading to the <span class="glossary-term" data-term="odp">ODP</span>.

## Requirements

- Validated <span class="glossary-term" data-term="geojson">GeoJSON</span> from [Step 2: Validate](02-validate.md)
- Access to the [online validator](https://mapme-initiative.github.io/project_location_model/project-location-validator/index.html)

## Procedure

1. Using the online validator, upload validated GeoJSON with the Upload File button and inspect the map view: confirm project locations are displayed in expected locations.


2. Check that multi-geometry features render correctly. If locations look implausible, return to [Collect](01-collect.md) to correct the data before re-validating.

!!! success "Plausible result"
    - Multi-geometry Project Locations displayed on the map
    - Locations fall within expected countries/ regions
    - No obvious outliers or missing projects

!!! failure "Implausible result"
    - No locations displayed
    - Locations in wrong geography

## Outputs

| Item | Format | Notes |
|------|--------|-------|
| Validated Project-level Locations (confirmed) | <span class="glossary-term" data-term="geojson">GeoJSON</span> | Ready for <span class="glossary-term" data-term="odp">ODP</span> upload |