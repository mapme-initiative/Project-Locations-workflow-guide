# Project Locations Update — Workflow Guide

Interactive guide for the **Project Locations management workflow**: collecting project locations in the PLM, validating, uploading to ODP, aggregating, and publishing the portfolio map.

**Documentation site:** _Enable GitHub Pages (see below) and add the URL here._

## Quick links

| Resource | Location |
|----------|----------|
| Live guide (after deploy) | GitHub Pages URL |
| Workflow structure | [`workflow.yaml`](workflow.yaml) |
| Author / maintenance guide | [`docs/creating-the-workflow-guide.md`](docs/creating-the-workflow-guide.md) |
| Source presentation | [`2026-Project-Location-management-workflow-v0.pptx`](2026-Project-Location-management-workflow-v0.pptx) |

## Local preview

Previewing and publishing are **two related but separate steps**:

| Step | What it is | Changes your `.md` files? | What you see |
|------|------------|---------------------------|--------------|
| **Edit** | Source files in `docs/` | Yes (you edit these) | Raw Markdown in the editor |
| **Preview** | Local MkDocs server | **No** — read-only build | Same as the future website (tabs, images, glossary popups) |
| **Publish** | Git push → GitHub Pages | **No** — CI builds from source | Live site for readers |

The built-in **Cursor Markdown preview** (editor preview pane) is *not* sufficient for this project: it does not render MkDocs Material tabs, admonitions, snippet includes, or glossary popups. Use **MkDocs serve** instead.

### Preview in Cursor (recommended)

1. Install dependencies once:

   ```bash
   pip install -r requirements.txt
   ```

2. Start the preview server:
   - **Terminal:** `python3 -m mkdocs serve`
   - **Or:** `Cmd+Shift+P` → **Tasks: Run Task** → **Preview documentation (MkDocs)**

3. Open the site in a browser:
   - [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - **Or in Cursor:** `Cmd+Shift+P` → **Simple Browser: Show** → enter `http://127.0.0.1:8000`

4. Edit any file under `docs/`, save — the browser **auto-refreshes** with your changes.

Build output goes to `site/`, which is **gitignored**. Nothing in preview affects what you commit; only your edits to source files do.

### One-off build (optional)

```bash
python3 -m mkdocs build
```

Output is written to `site/` for inspection without running a server.

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
