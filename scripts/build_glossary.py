#!/usr/bin/env python3
"""Generate glossary.md and glossary.json from docs/glossary.yaml."""

import json
from pathlib import Path

try:
    import yaml
except ImportError:
    raise SystemExit("Install PyYAML: python3 -m pip install pyyaml")

ROOT = Path(__file__).resolve().parent.parent
YAML_PATH = ROOT / "docs" / "glossary.yaml"
MD_PATH = ROOT / "docs" / "glossary.md"
JSON_PATH = ROOT / "docs" / "assets" / "glossary.json"


def main() -> None:
    data = yaml.safe_load(YAML_PATH.read_text(encoding="utf-8"))
    terms = sorted(data["terms"], key=lambda t: t["abbr"].upper())

    JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    JSON_PATH.write_text(
        json.dumps({t["id"]: t for t in terms}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    lines = [
        "# Glossary",
        "",
        "Alphabetical reference for abbreviations used in this guide. "
        "Click any **highlighted term** on a step page to open a quick reminder, "
        "or browse the full list below.",
        "",
        "[← Back to workflow overview](index.md)",
        "",
        "---",
        "",
    ]

    for term in terms:
        abbr = term["abbr"]
        name = term["name"]
        definition = term["definition"].strip().replace("\n", " ")
        tid = term["id"]
        lines.extend(
            [
                f"## {abbr} {{#{tid}}}",
                "",
                f"**{name}**",
                "",
                definition,
                "",
                "---",
                "",
            ]
        )

    MD_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {MD_PATH}")
    print(f"Wrote {JSON_PATH} ({len(terms)} terms)")


if __name__ == "__main__":
    main()
