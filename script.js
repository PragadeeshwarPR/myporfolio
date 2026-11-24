// ===== Pragadeeshwar · Portfolio interactions =====
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // year
  document.getElementById("year").textContent = new Date().getFullYear();

  // nav shadow on scroll + active link
  const nav = document.querySelector(".nav");
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = -1;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
    links.forEach((a, i) => a.classList.toggle("active", i === current));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  links.forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  // reveal on scroll (staggered)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
      const idx = Math.max(0, siblings.indexOf(e.target));
      setTimeout(() => e.target.classList.add("in"), reduce ? 0 : Math.min(idx, 6) * 90);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // count-up stats
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, dec = +(el.dataset.decimals || 0), dur = 1600, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      reduce ? (el.textContent = end.toFixed(dec)) : requestAnimationFrame(tick);
      counter.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

  // typing effect
  const typed = document.querySelector(".typed");
  if (typed) {
    const words = JSON.parse(typed.dataset.words);
    let w = 0, c = 0, deleting = false;
    const type = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!deleting && c < word.length) c++;
      else if (deleting && c > 0) c--;
      else if (!deleting) { deleting = true; return setTimeout(type, 1600); }
      else { deleting = false; w = (w + 1) % words.length; }
      setTimeout(type, deleting ? 45 : 85);
    };
    reduce ? (typed.textContent = words[0]) : type();
  }

  // cursor glow
  const glow = document.querySelector(".cursor-glow");
  if (glow && !reduce) {
    window.addEventListener("pointermove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }

  // 3D tilt on polaroid
  const tilt = document.querySelector(".tilt");
  if (tilt && !reduce && window.matchMedia("(hover: hover)").matches) {
    tilt.addEventListener("pointermove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
    });
    tilt.addEventListener("pointerleave", () => (tilt.style.transform = ""));
  }
})();
