gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageConfig = {
  email: "rouaid.kerroum@gmail.com",
  label: "PORTFOLIO / PROJETS",
  title: "Une selection de projets penses pour etre vus, parcourus et memorises.",
  lede:
    "Une galerie editoriale qui rassemble des projets web, video, motion et design graphique avec une lecture simple, premium et directe.",
  navLinks: [
    { label: "Accueil", href: "./index.html" },
    { label: "Projets", href: "./projects.html", current: true },
    { label: "A propos", href: "#", placeholder: true },
    { label: "Contact", href: "#footer-contact" }
  ],
  filters: [
    { value: "all", label: "Tout" },
    { value: "web-design", label: "Web design" },
    { value: "video", label: "Video" },
    { value: "motion-design", label: "Motion Design" },
    { value: "graphic-design", label: "Design graphique" }
  ],
  footer: {
    ctaLabel: "Collaborons",
    ctaHref: "mailto:rouaid.kerroum@gmail.com",
    email: "rouaid.kerroum@gmail.com",
    marqueeName: "ROUAI D KERROUM",
    footerLinks: [
      { label: "Accueil", href: "./index.html" },
      { label: "Projets", href: "./projects.html" },
      { label: "A propos", href: "#", placeholder: true },
      { label: "Contact", href: "#footer-contact" }
    ],
    cvLabel: "Telecharger mon CV",
    cvHref: "./data/project-assets/cv-rk-26.pdf"
  }
};

const state = {
  projects: [],
  activeFilter: "all"
};

const pageLabel = document.querySelector("[data-page-label]");
const pageTitle = document.querySelector("[data-page-title]");
const pageLede = document.querySelector("[data-page-lede]");
const desktopNav = document.querySelector("[data-nav-desktop]");
const mobileNav = document.querySelector("[data-nav-mobile]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navDrawer = document.querySelector("[data-nav-drawer]");
const filterBar = document.querySelector("[data-filter-bar]");
const galleryGrid = document.querySelector("[data-gallery-grid]");
const galleryStatus = document.querySelector("[data-gallery-status]");
const siteFooter = document.querySelector(".site-footer");
const footerCta = document.querySelector("[data-footer-cta]");
const footerCtaText = document.querySelector(".site-footer__cta-text");
const footerLinks = document.querySelector("[data-footer-links]");
const footerEmail = document.querySelector("[data-footer-email]");
const footerCvWrap = document.querySelector("[data-footer-cv]");
const footerMarquee = document.querySelector("[data-footer-marquee]");
const footerMarqueeTrack = document.querySelector("[data-footer-marquee-track]");

let lenisInstance;
let splitInstances = [];
let footerMarqueeTween;
let resizeTimer;
let introTimeline;
let introPlayed = false;
let galleryTransitionTimeline;

populateStaticContent();
setupNavigation();

const fontsReady = document.fonts && document.fonts.ready
  ? document.fonts.ready
  : Promise.resolve();

(async function initPage() {
  await fontsReady;
  await loadProjects();
  initSmoothScroll();
  prepareLineReveals();
  playIntroSequence();
  buildFooterMarquee();
  ScrollTrigger.refresh();
  window.addEventListener("resize", scheduleResize, { passive: true });
})();

function populateStaticContent() {
  pageLabel.textContent = pageConfig.label;
  pageTitle.textContent = pageConfig.title;
  pageLede.textContent = pageConfig.lede;

  const navMarkup = pageConfig.navLinks
    .map((link) => buildNavPillMarkup(link))
    .join("");

  desktopNav.innerHTML = navMarkup;
  mobileNav.innerHTML = navMarkup;

  filterBar.innerHTML = pageConfig.filters
    .map((filter) => buildFilterPillMarkup(filter, filter.value === state.activeFilter))
    .join("");

  footerCtaText.textContent = pageConfig.footer.ctaLabel;
  footerCta.href = pageConfig.footer.ctaHref;
  footerCta.setAttribute(
    "aria-label",
    "Prendre contact avec Rouaid Kerroum par email"
  );

  footerLinks.innerHTML = pageConfig.footer.footerLinks
    .map(
      (link) => `
        <a
          class="site-footer__nav-link"
          href="${link.href}"
          ${link.placeholder ? "data-placeholder-link" : ""}
        >
          ${escapeHtml(link.label)}
        </a>
      `
    )
    .join("");

  footerEmail.textContent = pageConfig.footer.email;
  footerEmail.href = `mailto:${pageConfig.footer.email}`;
  footerEmail.setAttribute(
    "aria-label",
    `Envoyer un email a ${pageConfig.footer.email}`
  );

  footerCvWrap.innerHTML = buildLinkPillMarkup({
    label: pageConfig.footer.cvLabel,
    href: pageConfig.footer.cvHref,
    classes: "nav-pill nav-pill--footer-cv",
    download: "cv-rk-26.pdf",
    iconMarkup: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4v10M8 10.8L12 14.8L16 10.8M5 18h14"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `
  });
}

function buildNavPillMarkup(link) {
  return buildLinkPillMarkup({
    label: link.label,
    href: link.href,
    classes: `nav-pill${link.current ? " is-current" : ""}`,
    placeholder: Boolean(link.placeholder)
  });
}

function buildLinkPillMarkup({
  label,
  href,
  classes,
  placeholder = false,
  iconMarkup = "",
  download = ""
}) {
  return `
    <a class="${classes}" href="${href}" data-nav-link ${placeholder ? "data-placeholder-link" : ""} ${download ? `download="${download}"` : ""}>
      <span class="nav-pill__border"></span>
      <span class="nav-pill__ripple"><span></span></span>
      <span class="nav-pill__title">
        <span data-text="${escapeHtml(label)}">${escapeHtml(label)}</span>
      </span>
      ${iconMarkup ? `<span class="nav-pill__icon" aria-hidden="true">${iconMarkup}</span>` : ""}
    </a>
  `;
}

function buildFilterPillMarkup(filter, isActive) {
  return `
    <button
      class="nav-pill nav-pill--filter${isActive ? " is-current" : ""}"
      type="button"
      data-filter-button
      data-filter="${filter.value}"
      aria-pressed="${String(isActive)}"
    >
      <span class="nav-pill__border"></span>
      <span class="nav-pill__ripple"><span></span></span>
      <span class="nav-pill__title">
        <span data-text="${escapeHtml(filter.label)}">${escapeHtml(filter.label)}</span>
      </span>
    </button>
  `;
}

function setupNavigation() {
  document.addEventListener("click", (event) => {
    const placeholderLink = event.target.closest("[data-placeholder-link]");

    if (placeholderLink) {
      event.preventDefault();
    }
  });

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  navToggle.addEventListener("click", () => {
    const shouldOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(shouldOpen));
    navToggle.setAttribute("aria-label", shouldOpen ? "Fermer le menu" : "Ouvrir le menu");
    navDrawer.hidden = !shouldOpen;
    document.body.classList.toggle("is-nav-open", shouldOpen);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter-button]");

    if (!button) {
      return;
    }

    const nextFilter = button.dataset.filter;

    if (!nextFilter || nextFilter === state.activeFilter || !state.projects.length) {
      return;
    }

    state.activeFilter = nextFilter;
    updateFilterButtons();
    transitionGallery();
  });
}

function closeMobileNav() {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Ouvrir le menu");
  navDrawer.hidden = true;
  document.body.classList.remove("is-nav-open");
}

async function loadProjects() {
  setStatus("Chargement des projets...", false);

  try {
    const response = await fetch("./data/projects.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.projects)) {
      throw new Error("Invalid payload");
    }

    state.projects = data.projects;
    renderGallery(false);
  } catch (error) {
    state.projects = [];
    galleryGrid.innerHTML = "";
    setStatus(
      "Impossible de charger les projets. Ouvre cette page via Live Server ou un serveur local.",
      true
    );
  }
}

function getFilteredProjects() {
  if (state.activeFilter === "all") {
    return state.projects;
  }

  return state.projects.filter(
    (project) => getProjectCategories(project).includes(state.activeFilter)
  );
}

function getProjectCategories(project) {
  if (Array.isArray(project.categories) && project.categories.length) {
    return project.categories;
  }

  return project.category ? [project.category] : [];
}

function transitionGallery() {
  const currentCards = gsap.utils.toArray("[data-gallery-card]");

  if (reducedMotion || !currentCards.length) {
    renderGallery(true);
    return;
  }

  const previousHeight = galleryGrid.offsetHeight;
  galleryTransitionTimeline?.kill();

  galleryTransitionTimeline = gsap.timeline({
    onComplete: () => {
      renderGallery(true, previousHeight);
      galleryTransitionTimeline = null;
    }
  });

  galleryTransitionTimeline.to(currentCards, {
    autoAlpha: 0,
    y: 20,
    duration: 0.22,
    stagger: 0.025,
    ease: "power2.in"
  });
}

function renderGallery(animateIn = false, previousHeight = null) {
  const projects = getFilteredProjects();

  if (!projects.length) {
    galleryGrid.innerHTML = "";
    setStatus("Aucun projet pour ce filtre.", false);
    return;
  }

  setStatus("", false);

  galleryGrid.innerHTML = projects
    .map((project) => {
      const isPlaceholder = project.href === "#";

      return `
        <a
          class="projects-card${isPlaceholder ? " is-placeholder" : ""}"
          href="${project.href}"
          data-gallery-card
          ${isPlaceholder ? "data-placeholder-link" : ""}
        >
          <figure class="projects-card__media">
            <img
              src="${project.thumbnail}"
              alt="Miniature du projet ${escapeHtml(project.title)}"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="projects-card__body">
            <div class="projects-card__meta">
              <span>${escapeHtml(project.categoryLabel)}</span>
              <span>${escapeHtml(project.date)}</span>
            </div>
            <h3 class="projects-card__title">${escapeHtml(project.title)}</h3>
            <p class="projects-card__caption">${escapeHtml(project.excerpt || project.description)}</p>
          </div>
        </a>
      `;
    })
    .join("");

  const cards = gsap.utils.toArray("[data-gallery-card]");

  if (previousHeight !== null && !reducedMotion) {
    const nextHeight = galleryGrid.scrollHeight;

    gsap.fromTo(
      galleryGrid,
      {
        height: previousHeight
      },
      {
        height: nextHeight,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "height"
      }
    );
  }

  if (!animateIn || reducedMotion) {
    gsap.set(cards, {
      autoAlpha: 1,
      y: 0
    });
    return;
  }

  gsap.fromTo(
    cards,
    {
      autoAlpha: 0,
      y: 26
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.06,
      ease: "power3.out"
    }
  );
}

function updateFilterButtons() {
  document.querySelectorAll("[data-filter-button]").forEach((button) => {
    const isActive = button.dataset.filter === state.activeFilter;
    button.classList.toggle("is-current", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setStatus(message, isError) {
  if (!message) {
    galleryStatus.hidden = true;
    galleryStatus.textContent = "";
    galleryStatus.classList.remove("is-error");
    return;
  }

  galleryStatus.hidden = false;
  galleryStatus.textContent = message;
  galleryStatus.classList.toggle("is-error", Boolean(isError));
}

function prepareLineReveals() {
  splitInstances.forEach((instance) => instance.revert());
  splitInstances = [];

  document.querySelectorAll('[data-reveal="lines"]').forEach((element) => {
    if (!element.textContent.trim()) {
      return;
    }

    const split = new SplitType(element, {
      types: "lines",
      lineClass: "line"
    });

    split.lines.forEach((line) => {
      const inner = document.createElement("span");
      inner.className = "line-inner";

      while (line.firstChild) {
        inner.appendChild(line.firstChild);
      }

      line.appendChild(inner);
    });

    splitInstances.push(split);
  });

  if (introPlayed) {
    setIntroVisible();
    return;
  }

  gsap.set(getRevealLineNodes(), {
    yPercent: reducedMotion ? 0 : 105,
    opacity: reducedMotion ? 1 : 0
  });
}

function playIntroSequence() {
  introTimeline?.kill();

  const lines = getRevealLineNodes();
  const filterButtons = gsap.utils.toArray("[data-filter-button]");
  const cards = gsap.utils.toArray("[data-gallery-card]");

  if (reducedMotion) {
    setIntroVisible();
    introPlayed = true;
    return;
  }

  introTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  introTimeline
    .fromTo(
      lines,
      {
        yPercent: 105,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.05
      },
      0.05
    )
    .fromTo(
      filterButtons,
      {
        y: 22,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.04
      },
      0.18
    )
    .fromTo(
      cards,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05
      },
      0.24
    );

  introTimeline.eventCallback("onComplete", () => {
    introPlayed = true;
  });
}

function setIntroVisible() {
  gsap.set(getRevealLineNodes(), {
    yPercent: 0,
    opacity: 1
  });

  gsap.set(
    [
      ...gsap.utils.toArray("[data-filter-button]"),
      ...gsap.utils.toArray("[data-gallery-card]")
    ],
    {
      y: 0,
      opacity: 1
    }
  );
}

function initSmoothScroll() {
  if (reducedMotion) {
    return;
  }

  lenisInstance = new Lenis({
    lerp: 0.08,
    smoothWheel: true
  });

  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function buildFooterMarquee() {
  footerMarqueeTween?.kill();

  footerMarqueeTween = buildLoopingMarquee({
    container: footerMarquee,
    track: footerMarqueeTrack,
    groupClass: "site-footer__marquee-group",
    itemClass: "site-footer__marquee-item",
    label: `${pageConfig.footer.marqueeName} \u2014`,
    widthMultiplier: 2.8,
    reducedDuration: 110,
    minDuration: 32,
    speedDivisor: 78
  });
}

function buildLoopingMarquee({
  container,
  track,
  groupClass,
  itemClass,
  label,
  widthMultiplier,
  reducedDuration,
  minDuration,
  speedDivisor
}) {
  if (!container || !track) {
    return null;
  }

  track.innerHTML = "";

  const group = document.createElement("div");
  group.className = groupClass;
  track.appendChild(group);

  const targetWidth = container.clientWidth * widthMultiplier;

  while (group.scrollWidth < targetWidth) {
    const item = document.createElement("span");
    item.className = itemClass;
    item.textContent = label;
    group.appendChild(item);
  }

  track.appendChild(group.cloneNode(true));

  const groupWidth = group.getBoundingClientRect().width;
  gsap.set(track, { x: 0 });

  return gsap.to(track, {
    x: -groupWidth,
    duration: reducedMotion ? reducedDuration : Math.max(minDuration, groupWidth / speedDivisor),
    ease: "none",
    repeat: -1
  });
}

function scheduleResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    prepareLineReveals();
    buildFooterMarquee();
    setIntroVisible();
    ScrollTrigger.refresh();
  }, 180);
}

function getRevealLineNodes() {
  return [...document.querySelectorAll(".line-inner")];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
