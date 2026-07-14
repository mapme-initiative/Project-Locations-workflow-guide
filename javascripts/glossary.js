/**
 * Glossary terms: black by default, blue on hover; definition popover on hover/click.
 */
(function () {
  let glossary = null;
  let popover = null;
  let activeTrigger = null;

  function glossaryPath() {
    if (window.location.pathname.includes("/steps/")) {
      return "../assets/glossary.json";
    }
    return "assets/glossary.json";
  }

  function glossaryPagePath() {
    if (window.location.pathname.includes("/steps/")) {
      return "../glossary/";
    }
    return "glossary/";
  }

  async function loadGlossary() {
    if (glossary) {
      return glossary;
    }
    const response = await fetch(glossaryPath());
    glossary = await response.json();
    return glossary;
  }

  function clearActiveTerms() {
    document.querySelectorAll(".glossary-term--active").forEach((el) => {
      el.classList.remove("glossary-term--active");
    });
  }

  function buildPopover() {
    if (popover) {
      return popover;
    }

    popover = document.createElement("div");
    popover.className = "glossary-popover";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-labelledby", "glossary-popover-title");
    popover.hidden = true;
    popover.innerHTML = `
      <button type="button" class="glossary-popover__close" aria-label="Close definition" data-glossary-close>&times;</button>
      <p class="glossary-popover__label">Glossary</p>
      <h2 id="glossary-popover-title" class="glossary-popover__title"></h2>
      <p class="glossary-popover__name"></p>
      <p class="glossary-popover__definition"></p>
      <a class="glossary-popover__link" href="#">View full glossary</a>
    `;
    document.body.appendChild(popover);

    popover.querySelector("[data-glossary-close]").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      hidePopover();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && popover && !popover.hidden) {
        hidePopover();
      }
    });

    document.addEventListener("click", (event) => {
      if (!popover || popover.hidden) {
        return;
      }
      if (
        popover.contains(event.target) ||
        (activeTrigger && activeTrigger.contains(event.target))
      ) {
        return;
      }
      hidePopover();
    });

    return popover;
  }

  function positionPopover(trigger) {
    const rect = trigger.getBoundingClientRect();
    const margin = 8;
    const gap = 6;

    popover.style.visibility = "hidden";
    popover.hidden = false;

    const panelRect = popover.getBoundingClientRect();
    let top = rect.bottom + gap;
    let left = rect.left;

    if (left + panelRect.width > window.innerWidth - margin) {
      left = window.innerWidth - panelRect.width - margin;
    }
    if (left < margin) {
      left = margin;
    }

    if (top + panelRect.height > window.innerHeight - margin) {
      top = rect.top - panelRect.height - gap;
    }
    if (top < margin) {
      top = margin;
    }

    popover.style.top = `${top + window.scrollY}px`;
    popover.style.left = `${left + window.scrollX}px`;
    popover.style.visibility = "visible";
  }

  function hidePopover() {
    if (!popover) {
      return;
    }
    popover.hidden = true;
    popover.style.visibility = "";
    activeTrigger = null;
    clearActiveTerms();
  }

  async function showPopover(trigger) {
    await loadGlossary();
    const id = resolveTermId(trigger);
    const term = glossary[id];
    if (!term) {
      return;
    }

    buildPopover();
    clearActiveTerms();
    activeTrigger = trigger;
    trigger.classList.add("glossary-term--active");

    popover.querySelector(".glossary-popover__title").textContent = term.abbr;
    popover.querySelector(".glossary-popover__name").textContent = term.name;
    popover.querySelector(".glossary-popover__definition").textContent =
      term.definition.trim();
    popover.querySelector(".glossary-popover__link").href = `${glossaryPagePath()}#${term.id}`;

    popover.hidden = false;
    positionPopover(trigger);
  }

  function resolveTermId(element) {
    const raw = (element.dataset.term || element.textContent || "").trim();
    if (!glossary) {
      return raw.toLowerCase();
    }
    if (glossary[raw]) {
      return raw;
    }
    const lower = raw.toLowerCase();
    if (glossary[lower]) {
      return lower;
    }
    const byAbbr = Object.values(glossary).find(
      (t) => t.abbr.toLowerCase() === lower
    );
    return byAbbr ? byAbbr.id : lower;
  }

  function bindTerms() {
    document.querySelectorAll(".glossary-term").forEach((el) => {
      if (el.dataset.glossaryBound) {
        return;
      }
      el.dataset.glossaryBound = "true";
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("title", "Hover for glossary definition");

      const open = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (activeTrigger === el && popover && !popover.hidden) {
          return;
        }
        await showPopover(el);
      };

      el.addEventListener("mouseenter", open);
      el.addEventListener("focus", open);
      el.addEventListener("click", open);
      el.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          open(event);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadGlossary().then(bindTerms);
  });

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      hidePopover();
      loadGlossary().then(bindTerms);
    });
  }
})();
