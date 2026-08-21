/**
 * Workflow navigation helpers:
 * - Inline SVG on the overview page (clickable step links)
 * - Normalize sidebar/content links for navigation.instant
 */
(function () {
  let svgTemplate = null;

  function isInternalRelative(href) {
    return (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:") &&
      !/^[a-z][a-z0-9+.-]*:/i.test(href)
    );
  }

  /**
   * Material instant navigation resolves some relative hrefs (e.g. ../02-validate/)
   * against the site root instead of the current page, producing /02-validate/ → 404.
   * Rewrite internal links to absolute pathnames so sidebar and TOC links match SVG clicks.
   */
  function normalizeInternalLinks(root = document) {
    root.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!isInternalRelative(href)) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          return;
        }
        link.setAttribute("href", url.pathname + url.search + url.hash);
      } catch (err) {
        // ignore malformed hrefs
      }
    });
  }

  function siteBase() {
    const el = document.getElementById("__config");
    if (!el) {
      return "";
    }
    try {
      return JSON.parse(el.textContent).base || "";
    } catch (err) {
      return "";
    }
  }

  function diagramUrl() {
    const base = siteBase();
    const prefix = base ? `${base.replace(/\/?$/, "/")}` : "";
    return `${prefix}assets/workflow-diagram.svg`;
  }

  function resolveStepPath(rawHref) {
    const url = new URL(rawHref, window.location.href);
    return url.pathname + url.search + url.hash;
  }

  function navigateTo(path) {
    if (typeof location$ !== "undefined") {
      location$.next(path);
      return;
    }
    window.location.assign(path);
  }

  function bindStepLinks(svg) {
    svg.querySelectorAll("a.workflow-step").forEach((link) => {
      if (link.dataset.workflowBound) {
        return;
      }
      link.dataset.workflowBound = "true";

      const raw =
        link.getAttribute("href") ||
        link.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (!raw) {
        return;
      }

      const path = resolveStepPath(raw);
      link.setAttribute("href", path);
      link.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);

      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigateTo(path);
      });
    });
  }

  async function loadSvgTemplate() {
    if (svgTemplate) {
      return svgTemplate;
    }

    const response = await fetch(diagramUrl());
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const markup = await response.text();
    const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
    const svg = doc.documentElement;
    if (svg.querySelector("parsererror")) {
      throw new Error("Invalid SVG");
    }
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svgTemplate = svg;
    return svgTemplate;
  }

  async function mountOverviewDiagram(container) {
    const existing = container.querySelector("svg");
    if (existing) {
      bindStepLinks(existing);
      return existing;
    }

    if (container.dataset.workflowLoading === "true") {
      return null;
    }
    container.dataset.workflowLoading = "true";

    try {
      await loadSvgTemplate();
      if (!container.isConnected || container.querySelector("svg")) {
        bindStepLinks(container.querySelector("svg"));
        return container.querySelector("svg");
      }

      const svg = svgTemplate.cloneNode(true);
      bindStepLinks(svg);
      svg.classList.add("workflow-overview__svg");
      svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
      container.appendChild(svg);
      return svg;
    } finally {
      delete container.dataset.workflowLoading;
    }
  }

  async function initOverviewDiagram() {
    const container = document.querySelector(".workflow-overview__diagram");
    if (!container) {
      return;
    }

    try {
      await mountOverviewDiagram(container);
    } catch (err) {
      container.innerHTML =
        '<p class="workflow-diagram__error">Workflow diagram unavailable.</p>';
      console.warn("workflow-overview:", err);
    }
  }

  function boot() {
    normalizeInternalLinks();
    initOverviewDiagram();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(boot);
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();
