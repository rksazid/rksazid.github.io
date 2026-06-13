/* ==========================================================================
   MD. Rezaul Karim — Portfolio interactions
   Vanilla JS · no dependencies
   ========================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- Nav: scrolled --------------------------- */
  const nav = $("#nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  };

  /* -------------------------- Nav: mobile toggle ------------------------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !e.target.closest(".nav")) closeMenu();
  });

  /* ------------------------- Active link on scroll ----------------------- */
  const linkMap = new Map();
  $$(".nav__link").forEach((link) => {
    const id = link.getAttribute("href");
    if (id && id.startsWith("#")) linkMap.set(id.slice(1), link);
  });
  const sections = $$("main section[id], header[id]").filter((s) => linkMap.has(s.id));

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            linkMap.forEach((l) => l.classList.remove("is-active"));
            const active = linkMap.get(entry.target.id);
            if (active) active.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ----------------------------- Scroll reveal --------------------------- */
  const reveals = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const ro = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => ro.observe(el));
  }

  /* ---------------------------- Project filter --------------------------- */
  const filters = $$(".filter");
  const projects = $$("#projects .project");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      projects.forEach((card) => {
        const show = cat === "all" || card.dataset.cat === cat;
        if (show) {
          card.classList.remove("is-hidden");
          if (!prefersReduced) {
            card.style.animation = "none";
            void card.offsetWidth; // reflow → replay entrance
            card.style.animation = "";
          }
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  /* ------------------------------ To-top --------------------------------- */
  const toTop = $("#toTop");
  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
    );
  }

  /* ------------------------------- Year ---------------------------------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* --------------------------- Contact form ------------------------------ */
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (form) {
    const setStatus = (msg, type) => {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove("is-ok", "is-err");
      if (type) status.classList.add(type === "ok" ? "is-ok" : "is-err");
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot — silently drop bots
      const trap = form.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) return;

      if (!form.checkValidity()) { form.reportValidity(); return; }

      const action = form.getAttribute("action") || "";
      const usingFallback = action.includes("YOUR_FORM_ID");
      const name = (form.querySelector('[name="name"]') || {}).value || "";
      const email = (form.querySelector('[name="email"]') || {}).value || "";
      const message = (form.querySelector('[name="message"]') || {}).value || "";

      // Fallback: open the visitor's mail client until Formspree is configured
      if (usingFallback) {
        const to = form.dataset.fallbackEmail || "rksazid@gmail.com";
        const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        setStatus("Opening your email app…", "ok");
        return;
      }

      const submitBtn = $("#cf-submit");
      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus("Sending your message…", null);

      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          setStatus("✓ Thanks! Your message has been sent.", "ok");
        } else {
          const data = await res.json().catch(() => ({}));
          const err = data.errors ? data.errors.map((x) => x.message).join(", ") : "Something went wrong.";
          setStatus(`✗ ${err} You can also email rksazid@gmail.com.`, "err");
        }
      } catch (_) {
        setStatus("✗ Network error. Please email rksazid@gmail.com instead.", "err");
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = original; }
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
