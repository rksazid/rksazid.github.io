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
  const toTop = $("#toTop");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  };

  /* -------------------------- Nav: mobile toggle ------------------------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  const closeMenu = () => {
    if (nav) nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", open);
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
    if (nav && nav.classList.contains("is-open") && !e.target.closest(".nav")) closeMenu();
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

  /* ------------------------- Stats count animation ----------------------- */
  const statNums = $$(".stat__num[data-target]");
  if (statNums.length && "IntersectionObserver" in window && !prefersReduced) {
    const statsObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || "";
            if (isNaN(target)) return;
            const duration = 1200;
            const startTime = performance.now();

            const updateCount = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(ease * target);
              el.textContent = `${current}${suffix}`;
              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                el.textContent = `${target}${suffix}`;
              }
            };
            requestAnimationFrame(updateCount);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    statNums.forEach((s) => statsObserver.observe(s));
  }

  /* ---------------------------- Project filter --------------------------- */
  const filters = $$(".filter");
  const projects = $$("#projects .project");
  const filterCounter = $("#filterCounter");

  const updateFilterCounter = (cat, visibleCount, totalCount) => {
    if (!filterCounter) return;
    if (cat === "all") {
      filterCounter.textContent = `Showing all ${totalCount} projects`;
    } else {
      filterCounter.textContent = `Showing ${visibleCount} of ${totalCount} projects`;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      let visible = 0;
      projects.forEach((card) => {
        const show = cat === "all" || card.dataset.cat === cat;
        if (show) {
          visible++;
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
      updateFilterCounter(cat, visible, projects.length);
    });
  });

  /* ------------------------ Card spotlight effect ------------------------ */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    projects.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* ----------------------- Interactive Terminal -------------------------- */
  const terminalDynamic = $("#terminalDynamic");
  const terminalForm = $("#terminalForm");
  const terminalInput = $("#terminalInput");
  const terminalBody = $("#terminalBody");
  const terminalCopyBtn = $("#terminalCopyBtn");
  const terminalClearBtn = $("#terminalClearBtn");

  const appendTerminalOutput = (cmd, outputHtml) => {
    if (!terminalDynamic) return;
    const block = document.createElement("div");
    block.className = "terminal__dynamic-block";
    block.innerHTML = `
      <div class="terminal__line"><span class="terminal__prompt">${escapeHtml(cmd)}</span></div>
      <div class="terminal__line terminal__out">${outputHtml}</div>
      <div class="terminal__line">&nbsp;</div>
    `;
    terminalDynamic.appendChild(block);
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  };

  const escapeHtml = (str) =>
    str.replace(/[&<>'"]/g, (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[tag] || tag));

  const runTerminalCommand = (rawCmd) => {
    const cmd = (rawCmd || "").trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();

    let reply = "";
    if (lower === "help") {
      reply = `Available commands:<br>
  → <span class="key">whoami</span>       : Developer identity<br>
  → <span class="key">skills</span>       : Tech stack &amp; architectures<br>
  → <span class="key">work</span>         : Selected systems &amp; scroll to work<br>
  → <span class="key">experience</span>   : Timeline &amp; companies<br>
  → <span class="key">beyond</span>       : Awards, education &amp; research<br>
  → <span class="key">contact</span>      : Reach out &amp; scroll to contact<br>
  → <span class="key">resume</span>       : View / download PDF résumé<br>
  → <span class="key">sudo hire</span>    : Fast-track recruit easter egg<br>
  → <span class="key">clear</span>        : Reset console`;
    } else if (lower === "whoami") {
      reply = `→ <span class="hl">MD. Rezaul Karim</span> (rksazid)<br>Lead Software Engineer based in Dhaka, Bangladesh.`;
    } else if (lower === "role" || lower === "cat role.txt") {
      reply = `→ <span class="hl">Lead Software Engineer</span> @ Liberate Labs (Bullseye Education US revamp).`;
    } else if (lower === "skills" || lower === "stack" || lower === "ls ~/stack") {
      reply = `→ <span class="key">Ruby on Rails</span> · <span class="key">Spring Boot</span> · <span class="key">Microservices</span> · <span class="key">AWS</span><br>→ <span class="hl">React · Vue.js · PostgreSQL · MySQL · Docker · TDD / RSpec</span>`;
    } else if (lower === "work" || lower === "projects") {
      reply = `→ Showing 12 production systems (Emergency Balance, Bullseye, VAT System, COVID portals).<br><span class="ok">Navigating to selected work...</span>`;
      const target = $("#work");
      if (target) setTimeout(() => target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" }), 250);
    } else if (lower === "experience") {
      reply = `→ 6+ years across Liberate Labs, RedDot Digital, and Nascenia.<br><span class="ok">Navigating to experience timeline...</span>`;
      const target = $("#experience");
      if (target) setTimeout(() => target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" }), 250);
    } else if (lower === "beyond" || lower === "awards" || lower === "education") {
      reply = `→ 1st place National Hackathon, 2nd Intra-KUET, Published IEEE TENSYMP paper.<br><span class="ok">Navigating to credentials...</span>`;
      const target = $("#beyond");
      if (target) setTimeout(() => target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" }), 250);
    } else if (lower === "contact") {
      reply = `→ Email: <a href="mailto:rksazid@gmail.com" class="hl">rksazid@gmail.com</a> | Phone: <span class="hl">+880 1521-453995</span><br><span class="ok">Scrolling down to contact form...</span>`;
      const target = $("#contact");
      if (target) setTimeout(() => target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" }), 250);
    } else if (lower === "resume" || lower === "cv") {
      reply = `→ Opening résumé (PDF)...`;
      window.open("assets/resume_rezaul_karim.pdf", "_blank", "noopener");
    } else if (lower === "sudo hire" || lower === "hire") {
      reply = `<span class="ok">✓ ACCESS GRANTED:</span> MD. Rezaul Karim is ready to accelerate your engineering team.<br>Direct line: <span class="hl">rksazid@gmail.com</span> — Let's talk!`;
    } else if (lower === "clear") {
      if (terminalDynamic) terminalDynamic.innerHTML = "";
      return;
    } else {
      reply = `zsh: command not found: <span class="hl">${escapeHtml(cmd)}</span>. Type <span class="key">help</span> to view available commands.`;
    }

    appendTerminalOutput(cmd, reply);
  };

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = "";
      runTerminalCommand(val);
    });
  }

  // Quick chips typewriter execution
  $$(".t-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const cmd = chip.dataset.cmd;
      if (!cmd || !terminalInput) return;
      terminalInput.value = "";
      let i = 0;
      const type = () => {
        if (i < cmd.length) {
          terminalInput.value += cmd.charAt(i);
          i++;
          setTimeout(type, 35);
        } else {
          setTimeout(() => {
            terminalInput.value = "";
            runTerminalCommand(cmd);
          }, 120);
        }
      };
      type();
    });
  });

  if (terminalClearBtn && terminalDynamic) {
    terminalClearBtn.addEventListener("click", () => {
      terminalDynamic.innerHTML = "";
    });
  }

  if (terminalCopyBtn && terminalBody) {
    terminalCopyBtn.addEventListener("click", async () => {
      try {
        const text = terminalBody.innerText;
        await navigator.clipboard.writeText(text);
        terminalCopyBtn.setAttribute("title", "Copied!");
        setTimeout(() => terminalCopyBtn.setAttribute("title", "Copy output"), 1500);
      } catch (_) {}
    });
  }

  /* ------------------------- Message Starters ---------------------------- */
  $$(".starter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const tmpl = chip.dataset.template;
      const msgField = $("#cf-msg");
      if (msgField && tmpl) {
        msgField.value = tmpl;
        msgField.focus();
        // trigger input event so any listeners or validation recognizes value
        msgField.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  /* -------------------------- Copy buttons ------------------------------- */
  $$(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add("is-copied");
        const prevTooltip = btn.getAttribute("data-tooltip");
        btn.setAttribute("data-tooltip", "Copied!");
        setTimeout(() => {
          btn.classList.remove("is-copied");
          if (prevTooltip) btn.setAttribute("data-tooltip", prevTooltip);
        }, 1800);
      } catch (_) {}
    });
  });

  /* ------------------------------ To-top --------------------------------- */
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
      if (msg) status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot — silently drop bots
      const trap = form.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) return;

      const name = (form.querySelector('[name="name"]') || {}).value?.trim() || "";
      const email = (form.querySelector('[name="email"]') || {}).value?.trim() || "";
      const message = (form.querySelector('[name="message"]') || {}).value?.trim() || "";

      if (!name || !email || !message) {
        setStatus("Please fill in all required fields (name, email, message).", "err");
        form.reportValidity();
        return;
      }

      const action = form.getAttribute("action") || "";
      const usingFallback = action.includes("YOUR_FORM_ID");

      // Fallback: open visitor's mail client until Formspree is configured
      if (usingFallback) {
        const to = form.dataset.fallbackEmail || "rksazid@gmail.com";
        const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        setStatus("Opening your email client… Or email directly to rksazid@gmail.com", "ok");
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
