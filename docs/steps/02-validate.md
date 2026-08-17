--8<-- "includes/workflow-nav.md"

# Step 2: Validate

!!! overview
    **Tool:** [Online validator](https://mapme-initiative.github.io/project_location_model/project-location-validator/index.html)

    **Performed by:** external consultants

    **Maintained by:** KfW Team Data Analytics & Artificial Intelligence (DAI)

    **Previous step:** [1 Collect](01-collect.md)

    **Next step:** [3 Visual plausibility check](03-visual-plausibility-check.md)

## Purpose

Validate Project Location data from the Collect step. A successful validation produces a <span class="glossary-term" data-term="geojson">GeoJSON</span> file with a timestamp and unique filename.

## Requirements

- Output from [Step 1: Collect](01-collect.md) (Excel or <span class="glossary-term" data-term="geojson">GeoJSON</span>)
- Use the [Online validator](https://mapme-initiative.github.io/project_location_model/project-location-validator/index.html)

## Procedure

1. Upload the project-level locations file on the online validator website by selecting the blue File Upload button.

    <img
      src="../../assets/images/validate-file-upload.png"
      class="instruction-figure instruction-figure--90"
    />

2. Review the validation result on the screen. A failed screening will result in validation errors (red background) indicating the data row where the error occurs in the PLM and a short message describing the type of error - please see examples below. In these cases, please correct the errors and upload the updated file for validation again. 


3. If validation passes, the Download GeoJSON button will change from grey to blue (active). A GeoJSON file with a unique timestamp and filename is generated.

## Examples of validation results

=== "Errors in validation result"

    !!! failure "Validation errors"
        - No Project Locations displayed on the map or displayed incorrectly
        - <span class="glossary-term" data-term="geojson">GeoJSON</span> **will not** be generated; Download GeoJSON button remains grey (disabled)

        Review error messages in the validator and correct source data in the <span class="glossary-term" data-term="plm">PLM</span> before re-validating.
        

        ![Example validation errors](../assets/images/validate-errors-01.png)

        ![Validation error detail](../assets/images/validate-errors-02.png)

=== "Error-free validation result"

    !!! success "Validation passed"
        - Multi-geometry Project Locations displayed on the map
        - <span class="glossary-term" data-term="geojson">GeoJSON</span> of the validated file is generated and can be downloaded; Download GeoJSON button changes to blue (enabled)


        ![Successful validation – map view](../assets/images/validate-success-map.png)

        ![Successful validation – download GeoJSON](../assets/images/validate-success-download.png)

## Outputs

| Item | Format | Notes |
|------|--------|-------|
| Validated Project-level Locations | <span class="glossary-term" data-term="geojson">GeoJSON</span> | Timestamp + unique filename automatically generated |
