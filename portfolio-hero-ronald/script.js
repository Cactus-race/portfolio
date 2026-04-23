gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createProjectPlaceholder({
  title,
  label,
  background,
  accent,
  secondary
}) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
          <stop stop-color="${background}" />
          <stop offset="1" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1180 240) rotate(126.3) scale(520 520)">
          <stop stop-color="${accent}" stop-opacity="0.92" />
          <stop offset="1" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(360 710) rotate(46.8) scale(580 420)">
          <stop stop-color="#F3EFE8" stop-opacity="0.18" />
          <stop offset="1" stop-color="#F3EFE8" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" rx="36" fill="url(#bg)" />
      <rect x="40" y="40" width="1520" height="820" rx="28" stroke="#F3EFE8" stroke-opacity="0.12" />
      <rect x="88" y="88" width="1424" height="724" rx="28" fill="#050505" fill-opacity="0.1" stroke="#F3EFE8" stroke-opacity="0.08" />
      <circle cx="1180" cy="240" r="360" fill="url(#glowA)" />
      <ellipse cx="360" cy="710" rx="360" ry="230" fill="url(#glowB)" />
      <path d="M132 598C302 500 458 488 608 542C773 600 900 610 1125 494C1247 430 1344 388 1468 418" stroke="#F3EFE8" stroke-opacity="0.18" stroke-width="2" />
      <path d="M132 662C302 564 458 552 608 606C773 664 900 674 1125 558C1247 494 1344 452 1468 482" stroke="#F3EFE8" stroke-opacity="0.1" stroke-width="2" />
      <rect x="132" y="132" width="156" height="40" rx="20" fill="#F3EFE8" fill-opacity="0.08" />
      <text x="160" y="159" fill="#F3EFE8" fill-opacity="0.78" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="5">${label}</text>
      <text x="128" y="764" fill="#F3EFE8" fill-opacity="0.92" font-family="Arial, Helvetica, sans-serif" font-size="160" font-weight="700" letter-spacing="-8">${title}</text>
      <text x="132" y="826" fill="#F3EFE8" fill-opacity="0.54" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="6">PORTFOLIO CASE STUDY</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const heroConfig = {
  name: "ROUAID KERROUM",
  introLabel: "\u00C9TUDIANT EN DESIGN & D\u00C9VELOPPEMENT WEB",
  introText:
    "Je con\u00E7ois des identit\u00E9s et des exp\u00E9riences digitales fortes pour des marques qui veulent laisser une empreinte sensible et m\u00E9morable.",
  services: ["/WEB DESIGN (UX/UI)", "/WEB DEVELOPMENT"],
  availabilityText: "Disponible pour une collaboration",
  email: "rouaid.kerroum@gmail.com",
  navLinks: [
    { label: "Projets", href: "./projects.html" },
    { label: "A propos", href: "#", placeholder: true },
    { label: "Contact", href: "#footer-contact" }
  ],
  images: [
    {
      src: "https://images.pexels.com/photos/9486853/pexels-photo-9486853.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=900",
      alt: "Mains devant un fond rose en studio.",
      offsetX: "-13%",
      offsetY: "4%",
      angle: "-7deg",
      zIndex: 1
    },
    {
      src: "https://images.pexels.com/photos/29088054/pexels-photo-29088054.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=900",
      alt: "Portrait \u00E9ditorial sur fond rose avec boule \u00E0 facettes.",
      offsetX: "12%",
      offsetY: "-6%",
      angle: "4deg",
      zIndex: 2
    },
    {
      src: "https://images.pexels.com/photos/10132193/pexels-photo-10132193.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=900",
      alt: "Boule \u00E0 facettes rose sur fond studio minimaliste.",
      offsetX: "0%",
      offsetY: "0%",
      angle: "-2deg",
      zIndex: 3
    }
  ]
};

const aboutSectionConfig = {
  label: "A PROPOS",
  manifesto:
    "Ce portfolio est consacr\u00E9 \u00E0 la m\u00E9thode derri\u00E8re la cr\u00E9ation d\u2019exp\u00E9riences digitales qui repoussent les limites. J\u2019avance par curiosit\u00E9, it\u00E9ration et exp\u00E9rimentation pour concevoir des projets qui laissent une impression durable.",
  highlightType: "words"
};

const projectsSectionConfig = {
  label: "PROJETS",
  ctaLabel: "Voir les projets",
  ctaHref: "./projects.html",
  projects: [
    {
      id: "refonte-la-bifurk",
      title: "REFONTE LA BIFURK",
      type: "Webdesign",
      date: "2025",
      href: "./project.html?slug=refonte-la-bifurk",
      imageAlt: "Apercu du projet Refonte La Bifurk.",
      imageSrc: "./data/project-assets/webdesign/bifurk.png"
    },
    {
      id: "clip-good-brat",
      title: "CLIP GOOD BRAT",
      type: "Video",
      date: "2025",
      href: "./project.html?slug=clip-good-brat",
      imageAlt: "Apercu du projet Clip Good Brat.",
      imageSrc: "./data/project-assets/video/goodbrat.png"
    },
    {
      id: "wonders-around-the-world",
      title: "WONDERS AROUND THE WORLD",
      type: "Webdesign",
      date: "2025",
      href: "./project.html?slug=wonders-around-the-world",
      imageAlt: "Apercu du projet Wonders Around The World.",
      imageSrc: "./data/project-assets/webdesign/waw.png"
    },
    {
      id: "choco-jojo",
      title: "CHOCO JOJO",
      type: "Design graphique",
      date: "2025",
      href: "./project.html?slug=choco-jojo",
      imageAlt: "Apercu du projet Choco Jojo.",
      imageSrc: "./data/project-assets/designgraphique/chocojojo/bg.png"
    },
    {
      id: "la-grande-toile",
      title: "LA GRANDE TOILE",
      type: "Motion Design",
      date: "2025",
      href: "./project.html?slug=la-grande-toile",
      imageAlt: "Apercu du projet La Grande Toile.",
      imageSrc: "./data/project-assets/motiongraphique/lagrandetoile.png"
    },
    {
      id: "le-casse",
      title: "LE CASSE",
      type: "Motion Design",
      date: "2026",
      href: "./project.html?slug=le-casse",
      imageAlt: "Apercu du projet Le Casse.",
      imageSrc: "./data/project-assets/motiongraphique/lecasse.png"
    }
  ]
};

const footerConfig = {
  ctaLabel: "Collaborons",
  ctaHref: `mailto:${heroConfig.email}`,
  email: heroConfig.email,
  marqueeName: heroConfig.name,
  footerLinks: [
    { label: "Accueil", href: "./index.html" },
    { label: "Projets", href: "./projects.html" },
    { label: "\u00C0 propos", href: "#", placeholder: true },
    { label: "Contact", href: "#footer-contact" }
  ],
  cvLabel: "T\u00E9l\u00E9charger mon CV",
  cvHref: "./data/project-assets/cv-rk-26.pdf"
};

const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const aboutSection = document.querySelector(".about-section");
const aboutInner = document.querySelector("[data-about-inner]");
const aboutLabel = document.querySelector("[data-about-label]");
const aboutText = document.querySelector("[data-about-text]");
const projectsSection = document.querySelector("[data-projects-section]");
const projectsLabel = document.querySelector("[data-projects-label]");
const projectList = document.querySelector("[data-project-list]");
const projectMobileList = document.querySelector("[data-project-mobile-list]");
const projectMetaType = document.querySelector("[data-project-meta-type]");
const projectMetaDate = document.querySelector("[data-project-meta-date]");
const projectLinkWrap = document.querySelector("[data-project-link-wrap]");
const projectsCtaWraps = [...document.querySelectorAll("[data-projects-cta-wrap]")];
const marquee = document.querySelector("[data-marquee]");
const marqueeTrack = document.querySelector("[data-marquee-track]");
const cardStack = document.querySelector("[data-card-stack]");
const servicesContainer = document.querySelector("[data-services]");
const contactLink = document.querySelector("[data-contact]");
const desktopNav = document.querySelector("[data-nav-desktop]");
const mobileNav = document.querySelector("[data-nav-mobile]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navDrawer = document.querySelector("[data-nav-drawer]");
const siteFooter = document.querySelector(".site-footer");
const footerCta = document.querySelector("[data-footer-cta]");
const footerCtaText = document.querySelector(".site-footer__cta-text");
const footerLinks = document.querySelector("[data-footer-links]");
const footerEmail = document.querySelector("[data-footer-email]");
const footerCvWrap = document.querySelector("[data-footer-cv]");
const footerMarquee = document.querySelector("[data-footer-marquee]");
const footerMarqueeTrack = document.querySelector("[data-footer-marquee-track]");

let revealElements = [];
let lenisInstance;
let marqueeTween;
let footerMarqueeTween;
let marqueeSettleTween;
let revealTimeline;
let splitInstances = [];
let aboutTextSplit;
let resizeTimer;
let introHasPlayed = false;
let scrollArtifacts = [];
let activeProjectIndex = 0;
let activeProjectLayerIndex = 0;
let projectItemsDesktop = [];
let projectMediaLayers = [];
let projectLinkElement;
let projectMediaTimeline;

populateContent();
setupNavigation();

const fontsReady = document.fonts && document.fonts.ready
  ? document.fonts.ready
  : Promise.resolve();

fontsReady.then(() => {
  initSmoothScroll();
  prepareLineReveals();
  buildMarquees();
  playIntroSequence();
  initScrollDynamics();
  window.addEventListener("resize", scheduleResize, { passive: true });
});

function populateContent() {
  document.querySelectorAll("[data-field]").forEach((element) => {
    const fieldName = element.dataset.field;

    if (fieldName === "email") {
      element.textContent = heroConfig.email;
      return;
    }

    element.textContent = heroConfig[fieldName] || "";
  });

  aboutLabel.textContent = aboutSectionConfig.label;
  aboutText.textContent = aboutSectionConfig.manifesto;
  populateProjectsSection();
  populateFooter();

  servicesContainer.innerHTML = heroConfig.services
    .map(
      (service) =>
        `<p class="hero__service-line" data-reveal="lines">${escapeHtml(service)}</p>`
    )
    .join("");

  cardStack.innerHTML = heroConfig.images
    .map(
      (image, index) => `
        <div
          class="hero-card-slot"
          style="--offset-x:${image.offsetX}; --offset-y:${image.offsetY}; --angle:${image.angle}; --z:${image.zIndex};"
        >
          <figure class="hero-card" data-card>
            <img
              src="${image.src}"
              alt="${escapeHtml(image.alt)}"
              loading="eager"
              decoding="async"
              ${index === heroConfig.images.length - 1 ? 'fetchpriority="high"' : ""}
            />
          </figure>
        </div>
      `
    )
    .join("");

  contactLink.href = `mailto:${heroConfig.email}`;
  contactLink.setAttribute("aria-label", `Envoyer un email \u00E0 ${heroConfig.email}`);

  revealElements = [...document.querySelectorAll('[data-reveal="lines"]')];
}

function populateProjectsSection() {
  if (!projectsSection) {
    return;
  }

  projectsLabel.textContent = projectsSectionConfig.label;

  projectList.innerHTML = projectsSectionConfig.projects
    .map(
      (project, index) => `
        <article
          class="project-item ${index === 0 ? "is-active" : ""}"
          data-project-item
          data-project-index="${index}"
        >
          <p class="project-item__title" data-project-title>${escapeHtml(project.title)}</p>
        </article>
      `
    )
    .join("");

  projectMobileList.innerHTML = projectsSectionConfig.projects
    .map(
      (project) => `
        <article class="project-mobile-card">
          <figure class="project-mobile-card__media">
            <img
              src="${project.imageSrc}"
              alt="${escapeHtml(project.imageAlt)}"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <h3 class="project-mobile-card__title">${escapeHtml(project.title)}</h3>
          <div class="project-mobile-card__meta">
            <div class="project-mobile-card__meta-item">
              <span class="project-mobile-card__meta-label">Type</span>
              <span class="project-mobile-card__meta-value">${escapeHtml(project.type)}</span>
            </div>
            <div class="project-mobile-card__meta-item">
              <span class="project-mobile-card__meta-label">Date</span>
              <span class="project-mobile-card__meta-value">${escapeHtml(project.date)}</span>
            </div>
          </div>
          ${buildPillMarkup({
            label: "Voir",
            href: project.href,
            classes: "nav-pill nav-pill--light nav-pill--compact",
            dataAttributes: project.href === "#" ? "data-placeholder-link" : ""
          })}
        </article>
      `
    )
    .join("");

  projectLinkWrap.innerHTML = buildPillMarkup({
    label: "Voir",
    href: projectsSectionConfig.projects[0]?.href || "#",
    classes: "nav-pill nav-pill--light nav-pill--compact",
    dataAttributes: `data-project-link ${projectsSectionConfig.projects[0]?.href === "#" ? "data-placeholder-link" : ""}`
  });

  projectsCtaWraps.forEach((wrap) => {
    wrap.innerHTML = buildPillMarkup({
      label: projectsSectionConfig.ctaLabel,
      href: projectsSectionConfig.ctaHref,
      classes: "nav-pill nav-pill--light nav-pill--xl projects-section__cta",
      dataAttributes: 'data-projects-cta'
    });
  });

  projectItemsDesktop = gsap.utils.toArray("[data-project-item]");
  projectMediaLayers = gsap.utils.toArray("[data-project-media-layer]");
  projectLinkElement = projectLinkWrap.querySelector("[data-project-link]");

  if (!projectsSection.dataset.placeholderBound) {
    projectsSection.addEventListener("click", (event) => {
      const link = event.target.closest('[data-placeholder-link]');

      if (link) {
        event.preventDefault();
      }
    });

    projectsSection.dataset.placeholderBound = "true";
  }

  setActiveProject(0, {
    immediate: true,
    force: true
  });
}

function populateFooter() {
  if (!siteFooter) {
    return;
  }

  footerCtaText.textContent = footerConfig.ctaLabel;
  footerCta.href = footerConfig.ctaHref;
  footerCta.setAttribute(
    "aria-label",
    `Prendre contact avec Rouaid Kerroum par email`
  );

  footerLinks.innerHTML = footerConfig.footerLinks
    .map(
      (link) => `
        <a
          class="site-footer__nav-link"
          href="${link.href}"
          data-footer-link
          ${link.placeholder ? "data-placeholder-link" : ""}
          aria-label="Page ${escapeHtml(link.label)}"
        >
          ${escapeHtml(link.label)}
        </a>
      `
    )
    .join("");

  footerEmail.textContent = footerConfig.email;
  footerEmail.href = `mailto:${footerConfig.email}`;
  footerEmail.setAttribute(
    "aria-label",
    `Envoyer un email \u00E0 ${footerConfig.email}`
  );

  footerCvWrap.innerHTML = buildPillMarkup({
    label: footerConfig.cvLabel,
    href: footerConfig.cvHref,
    classes: "nav-pill nav-pill--light nav-pill--with-icon nav-pill--footer-cv",
    dataAttributes: 'data-footer-cv-button download="cv-rk-26.pdf"',
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

  if (!siteFooter.dataset.placeholderBound) {
    siteFooter.addEventListener("click", (event) => {
      const link = event.target.closest('[data-placeholder-link]');

      if (link) {
        event.preventDefault();
      }
    });

    siteFooter.dataset.placeholderBound = "true";
  }
}

function buildPillMarkup({
  label,
  href = "#",
  classes = "nav-pill",
  dataAttributes = "",
  iconMarkup = ""
}) {
  return `
    <a class="${classes}" href="${href}" ${dataAttributes}>
      <span class="nav-pill__border"></span>
      <span class="nav-pill__ripple"><span></span></span>
      <span class="nav-pill__title">
        <span data-text="${escapeHtml(label)}">${escapeHtml(label)}</span>
      </span>
      ${iconMarkup ? `<span class="nav-pill__icon" aria-hidden="true">${iconMarkup}</span>` : ""}
    </a>
  `;
}

function setupNavigation() {
  const navMarkup = heroConfig.navLinks
    .map(
      (link) => `
        <a class="nav-pill" href="${link.href}" data-nav-link ${link.placeholder ? "data-placeholder-link" : ""}>
          <span class="nav-pill__border"></span>
          <span class="nav-pill__ripple"><span></span></span>
          <span class="nav-pill__title">
            <span data-text="${escapeHtml(link.label)}">${escapeHtml(link.label)}</span>
          </span>
        </a>
      `
    )
    .join("");

  desktopNav.innerHTML = navMarkup;
  mobileNav.innerHTML = navMarkup;

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.hasAttribute("data-placeholder-link")) {
        event.preventDefault();
      }
      closeMobileNav();
    });
  });

  navToggle.addEventListener("click", () => {
    toggleMobileNav();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  const desktopMedia = window.matchMedia("(min-width: 981px)");
  const handleDesktopMedia = (event) => {
    if (event.matches) {
      closeMobileNav();
    }
  };

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", handleDesktopMedia);
  } else if (typeof desktopMedia.addListener === "function") {
    desktopMedia.addListener(handleDesktopMedia);
  }
}

function toggleMobileNav(forceState) {
  const shouldOpen = typeof forceState === "boolean"
    ? forceState
    : navToggle.getAttribute("aria-expanded") !== "true";

  navToggle.setAttribute("aria-expanded", String(shouldOpen));
  navToggle.setAttribute("aria-label", shouldOpen ? "Fermer le menu" : "Ouvrir le menu");
  navDrawer.hidden = !shouldOpen;
  document.body.classList.toggle("is-nav-open", shouldOpen);
}

function closeMobileNav() {
  toggleMobileNav(false);
}

function prepareLineReveals() {
  splitInstances.forEach((instance) => instance.revert());
  splitInstances = [];

  revealElements.forEach((element) => {
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

  if (introHasPlayed) {
    setIntroStateVisible();
    return;
  }

  gsap.set(getRevealLineNodes(), {
    yPercent: reducedMotion ? 0 : 105,
    opacity: reducedMotion ? 1 : 0
  });
}

function buildMarquees() {
  buildHeroMarquee();
  buildFooterMarquee();
}

function buildHeroMarquee() {
  marqueeTween?.kill();
  marqueeSettleTween?.kill();

  marqueeTween = buildLoopingMarquee({
    container: marquee,
    track: marqueeTrack,
    groupClass: "hero__marquee-group",
    itemClass: "hero__marquee-item",
    label: `${heroConfig.name} \u2014`,
    widthMultiplier: 2.6,
    reducedDuration: 72,
    minDuration: 20,
    speedDivisor: 108
  });
}

function buildFooterMarquee() {
  footerMarqueeTween?.kill();

  footerMarqueeTween = buildLoopingMarquee({
    container: footerMarquee,
    track: footerMarqueeTrack,
    groupClass: "site-footer__marquee-group",
    itemClass: "site-footer__marquee-item",
    label: `${footerConfig.marqueeName} \u2014`,
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

function initSmoothScroll() {
  if (reducedMotion) {
    return;
  }

  lenisInstance = new Lenis({
    lerp: 0.08,
    smoothWheel: true
  });

  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tickLenis);
  gsap.ticker.lagSmoothing(0);
}

function tickLenis(time) {
  if (lenisInstance) {
    lenisInstance.raf(time * 1000);
  }
}

function playIntroSequence() {
  revealTimeline?.kill();

  const lines = getRevealLineNodes();
  const cards = getCards();

  revealTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  if (reducedMotion) {
    setIntroStateVisible();
    introHasPlayed = true;
    return;
  }

  revealTimeline
    .fromTo(
      lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.045
      },
      0.08
    )
    .fromTo(
      cards,
      {
        y: 34,
        opacity: 0,
        scale: 0.985
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.05,
        stagger: 0.08
      },
      0.18
    );

  revealTimeline.eventCallback("onComplete", () => {
    introHasPlayed = true;
  });
}

function setIntroStateVisible() {
  gsap.set(getRevealLineNodes(), {
    yPercent: 0,
    opacity: 1
  });

  gsap.set(getCards(), {
    y: 0,
    opacity: 1,
    scale: 1
  });
}

function initScrollDynamics() {
  scrollArtifacts.forEach((artifact) => artifact.kill());
  scrollArtifacts = [];
  siteHeader.classList.remove("is-inverse");

  initHeroScrollDynamics();
  initDarkSectionHeaderTheme();
  initAboutSectionAnimations();
  initProjectsSection();
  ScrollTrigger.refresh();
}

function initDarkSectionHeaderTheme() {
  const darkSections = gsap.utils.toArray("[data-dark-section]");

  if (!darkSections.length) {
    return;
  }

  const themeTriggers = [];
  const syncHeaderTheme = () => {
    siteHeader.classList.toggle(
      "is-inverse",
      themeTriggers.some((trigger) => trigger.isActive)
    );
  };

  darkSections.forEach((section) => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top+=40",
      end: "bottom top+=40",
      onEnter: syncHeaderTheme,
      onEnterBack: syncHeaderTheme,
      onLeave: syncHeaderTheme,
      onLeaveBack: syncHeaderTheme
    });

    themeTriggers.push(trigger);
    scrollArtifacts.push(trigger);
  });

  syncHeaderTheme();
}

function initHeroScrollDynamics() {
  if (!reducedMotion) {
    gsap.utils.toArray(".hero-card-slot").forEach((slot, index) => {
      const slotTween = gsap.to(slot, {
        yPercent: -2 - index * 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      scrollArtifacts.push(slotTween);
    });

    getCards().forEach((card, index) => {
      const image = card.querySelector("img");
      const imageTween = gsap.to(image, {
        yPercent: -2 - index,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      scrollArtifacts.push(imageTween);
    });
  }

  const marqueeTrigger = ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom top",
    onUpdate(self) {
      if (reducedMotion || !marqueeTween) {
        return;
      }

      const nextScale = gsap.utils.clamp(
        1,
        1.28,
        1 + Math.abs(self.getVelocity()) / 8000
      );

      gsap.to(marqueeTween, {
        timeScale: nextScale,
        duration: 0.18,
        overwrite: true
      });

      marqueeSettleTween?.kill();
      marqueeSettleTween = gsap.to(marqueeTween, {
        timeScale: 1,
        duration: 0.85,
        delay: 0.12,
        ease: "power2.out",
        overwrite: true
      });
    }
  });

  scrollArtifacts.push(marqueeTrigger);
}

function initAboutSectionAnimations() {
  aboutTextSplit?.revert();
  aboutTextSplit = null;

  if (!aboutSection) {
    return;
  }

  if (reducedMotion) {
    return;
  }

  const introTween = gsap.fromTo(
    aboutInner,
    {
      opacity: 0.2,
      y: 60
    },
    {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 85%",
        end: "top 35%",
        scrub: true
      }
    }
  );
  scrollArtifacts.push(introTween);

  aboutTextSplit = new SplitType(aboutText, {
    types: [aboutSectionConfig.highlightType]
  });

  const targets = aboutTextSplit[aboutSectionConfig.highlightType];

  const scrubTween = gsap.from(targets, {
    opacity: 0.18,
    color: "#6a655f",
    stagger: 0.7,
    ease: "none",
    scrollTrigger: {
      trigger: aboutText,
      start: "top 72%",
      end: "bottom 36%",
      scrub: true
    }
  });

  scrollArtifacts.push(scrubTween);
}

function initProjectsSection() {
  if (!projectsSection) {
    return;
  }

  setActiveProject(activeProjectIndex, {
    immediate: true,
    force: true
  });

  if (window.innerWidth <= 1080) {
    return;
  }

  const syncActiveProjectFromScroll = () => {
    const focusLine = window.innerHeight * 0.56;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    projectItemsDesktop.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - focusLine);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveProject(closestIndex);
  };

  const trigger = ScrollTrigger.create({
    trigger: projectsSection,
    start: "top bottom",
    end: "bottom top",
    onEnter: syncActiveProjectFromScroll,
    onEnterBack: syncActiveProjectFromScroll,
    onUpdate: syncActiveProjectFromScroll,
    onRefresh: syncActiveProjectFromScroll
  });

  scrollArtifacts.push(trigger);
  syncActiveProjectFromScroll();
}

function setActiveProject(index, options = {}) {
  const {
    immediate = false,
    force = false
  } = options;
  const project = projectsSectionConfig.projects[index];

  if (!project) {
    return;
  }

  updateProjectActiveState(index);
  updateProjectMeta(project);

  if (!projectMediaLayers.length) {
    activeProjectIndex = index;
    return;
  }

  if (index === activeProjectIndex && !force) {
    return;
  }

  if (immediate || reducedMotion) {
    projectMediaTimeline?.kill();
    projectMediaTimeline = null;

    projectMediaLayers.forEach((layer, layerIndex) => {
      const image = layer.querySelector("img");
      image.src = project.imageSrc;
      image.alt = project.imageAlt;
      layer.classList.toggle("is-active", layerIndex === 0);
      gsap.set(layer, {
        opacity: layerIndex === 0 ? 1 : 0,
        scale: layerIndex === 0 ? 1 : 1.02
      });
    });

    activeProjectLayerIndex = 0;
    activeProjectIndex = index;
    return;
  }

  const currentLayer = projectMediaLayers[activeProjectLayerIndex];
  const nextLayerIndex = activeProjectLayerIndex === 0 ? 1 : 0;
  const nextLayer = projectMediaLayers[nextLayerIndex];
  const nextImage = nextLayer.querySelector("img");

  projectMediaTimeline?.kill();
  currentLayer.classList.add("is-active");
  nextLayer.classList.remove("is-active");

  nextImage.src = project.imageSrc;
  nextImage.alt = project.imageAlt;
  nextLayer.classList.add("is-active");

  gsap.killTweensOf([currentLayer, nextLayer]);
  gsap.set(nextLayer, {
    opacity: 0,
    scale: 1.035
  });

  projectMediaTimeline = gsap.timeline({
    defaults: {
      overwrite: true
    },
    onComplete: () => {
      currentLayer.classList.remove("is-active");
      gsap.set(currentLayer, {
        opacity: 0,
        scale: 1.02
      });
      projectMediaTimeline = null;
    }
  })
    .to(
      currentLayer,
      {
        opacity: 0,
        scale: 0.985,
        duration: 0.38,
        ease: "power2.out"
      },
      0
    )
    .to(
      nextLayer,
      {
        opacity: 1,
        scale: 1,
        duration: 0.54,
        ease: "power2.out"
      },
      0
    );

  activeProjectLayerIndex = nextLayerIndex;
  activeProjectIndex = index;
}

function updateProjectActiveState(index) {
  projectItemsDesktop.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === index);
  });
}

function updateProjectMeta(project) {
  projectMetaType.textContent = project.type;
  projectMetaDate.textContent = project.date;

  if (!projectLinkElement) {
    return;
  }

  projectLinkElement.href = project.href;
  projectLinkElement.toggleAttribute("data-placeholder-link", project.href === "#");
  projectLinkElement.setAttribute(
    "aria-label",
    `Voir le projet ${project.title}`
  );
}

function scheduleResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    prepareLineReveals();
    buildMarquees();

    if (introHasPlayed) {
      setIntroStateVisible();
    } else {
      playIntroSequence();
    }

    initScrollDynamics();
  }, 180);
}

function getRevealLineNodes() {
  return revealElements.flatMap((element) => [
    ...element.querySelectorAll(".line-inner")
  ]);
}

function getCards() {
  return gsap.utils.toArray("[data-card]");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
