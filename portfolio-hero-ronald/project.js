gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageConfig = {
  email: "rouaid.kerroum@gmail.com",
  relatedLabel: "RELATED WORK",
  relatedTitle: "Travaux de la meme categorie",
  navLinks: [
    { label: "Accueil", href: "./index.html" },
    { label: "Projets", href: "./projects.html", current: true },
    { label: "A propos", href: "#", placeholder: true },
    { label: "Contact", href: "#footer-contact" }
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
  currentProject: null
};

const metaDescription = document.querySelector('meta[name="description"]');
const projectShell = document.querySelector("[data-project-shell]");
const projectError = document.querySelector("[data-project-error]");
const projectBack = document.querySelector("[data-project-back]");
const projectTitle = document.querySelector("[data-project-title]");
const projectMeta = document.querySelector("[data-project-meta]");
const projectTools = document.querySelector("[data-project-tools]");
const projectSummary = document.querySelector("[data-project-summary]");
const projectMediaRail = document.querySelector("[data-project-media-rail]");
const projectRelated = document.querySelector("[data-project-related]");
const relatedLabel = document.querySelector("[data-related-label]");
const relatedTitle = document.querySelector("[data-related-title]");
const relatedGrid = document.querySelector("[data-related-grid]");
const errorPanel = document.querySelector("[data-error-panel]");
const projectHeader = document.querySelector(".project-header");
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

let lenisInstance;
let splitInstances = [];
let footerMarqueeTween;
let resizeTimer;
let introTimeline;
let introPlayed = false;
let scrollArtifacts = [];

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
  initScrollDynamics();
  ScrollTrigger.refresh();
  window.addEventListener("resize", scheduleResize, { passive: true });
})();

function populateStaticContent() {
  const navMarkup = pageConfig.navLinks
    .map((link) => buildNavPillMarkup(link))
    .join("");

  desktopNav.innerHTML = navMarkup;
  mobileNav.innerHTML = navMarkup;

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

  relatedLabel.textContent = pageConfig.relatedLabel;
  relatedTitle.textContent = pageConfig.relatedTitle;
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
  newTab = false,
  download = ""
}) {
  return `
    <a
      class="${classes}"
      href="${href}"
      data-nav-link
      ${placeholder ? "data-placeholder-link" : ""}
      ${newTab ? 'target="_blank" rel="noreferrer"' : ""}
      ${download ? `download="${download}"` : ""}
    >
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
}

function closeMobileNav() {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Ouvrir le menu");
  navDrawer.hidden = true;
  document.body.classList.remove("is-nav-open");
}

async function loadProjects() {
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
    populateProjectPage();
  } catch (error) {
    showErrorState(
      "Impossible de charger le projet. Ouvre cette page via Live Server ou un serveur local."
    );
  }
}

function populateProjectPage() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = state.projects.find((item) => item.slug === slug);

  if (!project) {
    showErrorState();
    return;
  }

  state.currentProject = project;

  document.title = `${project.title} | Rouaid Kerroum`;

  if (metaDescription) {
    metaDescription.content = `${project.title} - ${project.description}`;
  }

  projectBack.href = "./projects.html";
  projectTitle.textContent = project.title;
  projectMeta.textContent = `${project.categoryLabel} / ${project.date}`;
  projectSummary.textContent = project.description;
  projectTools.innerHTML = renderChipList(project.tools);
  renderMediaRail(project);
  renderRelatedProjects(project);

  projectShell.hidden = false;
  projectError.hidden = true;
}

function renderChipList(items) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  return items
    .map(
      (item) =>
        `<span class="project-sidebar__chip">${escapeHtml(item)}</span>`
    )
    .join("");
}

function renderMediaRail(project) {
  const media = Array.isArray(project.media) ? project.media : [];

  if (!media.length) {
    projectMediaRail.innerHTML = `
      <div class="project-media-empty" data-media-reveal>
        <span class="project-media-empty__eyebrow">Apercus a venir</span>
        <h2 class="project-media-empty__title">Le layout reste solide meme sans media.</h2>
        <p class="project-media-empty__copy">
          Ce projet est volontairement plus pauvre en assets pour verifier que la fiche garde une
          presence premium avec seulement le contenu editorial, les metadonnees et la mise en page.
        </p>
      </div>
    `;
    return;
  }

  const blocks = [];

  for (let index = 0; index < media.length; index += 1) {
    const item = media[index];

    if (item.layout === "portrait") {
      const portraits = [item];

      while (
        portraits.length < 2 &&
        media[index + 1] &&
        media[index + 1].layout === "portrait"
      ) {
        portraits.push(media[index + 1]);
        index += 1;
      }

      if (portraits.length === 2) {
        blocks.push(renderPortraitPair(portraits));
      } else {
        blocks.push(renderMediaBlock(portraits[0]));
      }

      continue;
    }

    blocks.push(renderMediaBlock(item));
  }

  projectMediaRail.innerHTML = blocks.join("");
}

function renderPortraitPair(items) {
  return `
    <div class="project-media-pair" data-media-reveal>
      ${items.map((item) => renderMediaCard(item)).join("")}
    </div>
  `;
}

function renderMediaBlock(item) {
  return `
    <article class="project-media-block" data-media-reveal>
      ${renderMediaCard(item)}
    </article>
  `;
}

function renderMediaCard(item) {
  let ratioName = "landscape";

  if (item.ratio === "9:16") {
    ratioName = "portrait";
  } else if (item.ratio === "1:1") {
    ratioName = "square";
  }

  const frameClass = `project-media-frame project-media-frame--${ratioName}`;

  return `
    <div class="project-media-card">
      <div class="${frameClass}">
        ${renderMediaContent(item)}
      </div>
      ${item.caption ? `<p class="project-media-block__caption">${escapeHtml(item.caption)}</p>` : ""}
    </div>
  `;
}

function renderMediaContent(item) {
  if (item.type === "video") {
    if (item.provider === "youtube") {
      const embedUrl = toYouTubeEmbedUrl(item.src);

      if (!embedUrl) {
        return "";
      }

      return `
        <iframe
          src="${embedUrl}"
          title="Video du projet"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      `;
    }

    return `
      <video
        controls
        playsinline
        muted
        loop
        preload="metadata"
        ${item.poster ? `poster="${item.poster}"` : ""}
      >
        <source src="${item.src}" />
      </video>
    `;
  }

  return `
    <img
      src="${item.src}"
      alt="${escapeHtml(item.alt || "Media du projet")}"
      loading="lazy"
      decoding="async"
    />
  `;
}

function renderRelatedProjects(project) {
  const currentCategories = getProjectCategories(project);
  const relatedProjects = state.projects
    .map((item, index) => ({
      item,
      index,
      categories: getProjectCategories(item)
    }))
    .filter(
      ({ item, categories }) =>
        item.slug !== project.slug &&
        countSharedCategories(categories, currentCategories) > 0
    )
    .sort((entryA, entryB) => {
      const primaryCategory = project.category;
      const entryASharesPrimary = entryA.categories.includes(primaryCategory) ? 1 : 0;
      const entryBSharesPrimary = entryB.categories.includes(primaryCategory) ? 1 : 0;

      if (entryBSharesPrimary !== entryASharesPrimary) {
        return entryBSharesPrimary - entryASharesPrimary;
      }

      const entryASharedCount = countSharedCategories(entryA.categories, currentCategories);
      const entryBSharedCount = countSharedCategories(entryB.categories, currentCategories);

      if (entryBSharedCount !== entryASharedCount) {
        return entryBSharedCount - entryASharedCount;
      }

      return entryA.index - entryB.index;
    })
    .map(({ item }) => item)
    .slice(0, 4);

  if (!relatedProjects.length) {
    projectRelated.hidden = true;
    relatedGrid.innerHTML = "";
    return;
  }

  relatedGrid.innerHTML = relatedProjects
    .map((item) => {
      const preview = getProjectPreview(item);
      const ratioClass = preview.ratio === "1:1"
        ? "is-square"
        : preview.ratio === "9:16"
          ? "is-portrait"
          : "is-landscape";

      return `
        <a class="project-related-card" href="${item.href}" data-related-card>
          <figure class="project-related-card__media ${ratioClass}">
            <img
              src="${preview.src}"
              alt="${escapeHtml(preview.alt)}"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="project-related-card__body">
            <p class="project-related-card__meta">${escapeHtml(item.categoryLabel)} / ${escapeHtml(item.date)}</p>
            <h3 class="project-related-card__title">${escapeHtml(item.title)}</h3>
            <p class="project-related-card__copy">${escapeHtml(item.excerpt || item.description)}</p>
          </div>
        </a>
      `;
    })
    .join("");

  projectRelated.hidden = false;
}

function getProjectPreview(project) {
  const media = Array.isArray(project.media) ? project.media : [];
  const imageMedia = media.find((item) => item.type === "image" && item.src);

  if (imageMedia) {
    return {
      src: imageMedia.src,
      alt: imageMedia.alt || `Apercu du projet ${project.title}`,
      ratio: imageMedia.ratio || "16:9"
    };
  }

  return {
    src: project.thumbnail,
    alt: `Apercu du projet ${project.title}`,
    ratio: "16:9"
  };
}

function getProjectCategories(project) {
  if (Array.isArray(project.categories) && project.categories.length) {
    return project.categories;
  }

  return project.category ? [project.category] : [];
}

function countSharedCategories(categoriesA, categoriesB) {
  const categoriesBSet = new Set(categoriesB);
  const uniqueCategoriesA = [...new Set(categoriesA)];

  return uniqueCategoriesA.filter((category) => categoriesBSet.has(category)).length;
}

function showErrorState(message) {
  projectShell.hidden = true;
  projectRelated.hidden = true;
  projectError.hidden = false;

  if (message) {
    const copy = projectError.querySelector(".project-error__copy");

    if (copy) {
      copy.textContent = message;
    }
  }
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
  const sidebarDetails = gsap.utils.toArray("[data-project-meta-reveal]");
  const mediaBlocks = gsap.utils.toArray("[data-media-reveal]");

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

  if (lines.length) {
    introTimeline.fromTo(
      lines,
      {
        yPercent: 105,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.045
      },
      0.05
    );
  }

  if (sidebarDetails.length) {
    introTimeline.fromTo(
      sidebarDetails,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.05
      },
      0.18
    );
  }

  if (mediaBlocks.length) {
    introTimeline.fromTo(
      mediaBlocks.slice(0, 3),
      {
        y: 36,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08
      },
      0.22
    );
  } else if (!projectShell.hidden) {
    introTimeline.fromTo(
      projectMediaRail,
      {
        y: 24,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      0.2
    );
  }

  if (projectError.hidden === false && errorPanel) {
    introTimeline.fromTo(
      errorPanel,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      0.08
    );
  }

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
      ...gsap.utils.toArray("[data-project-meta-reveal]"),
      ...gsap.utils.toArray("[data-media-reveal]"),
      ...gsap.utils.toArray("[data-related-card]"),
      ...gsap.utils.toArray("[data-error-panel]")
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

function initScrollDynamics() {
  scrollArtifacts.forEach((artifact) => artifact.kill());
  scrollArtifacts = [];
  projectHeader.classList.remove("is-inverse");

  initMediaReveals();
  initFooterThemeTrigger();
}

function initMediaReveals() {
  if (reducedMotion) {
    return;
  }

  gsap.utils.toArray("[data-media-reveal], [data-related-card]").forEach((item) => {
    if (item.getBoundingClientRect().top <= window.innerHeight * 0.88) {
      gsap.set(item, {
        y: 0,
        opacity: 1
      });
      return;
    }

    const tween = gsap.fromTo(
      item,
      {
        y: 48,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        immediateRender: false,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true
        }
      }
    );

    scrollArtifacts.push(tween);
  });
}

function initFooterThemeTrigger() {
  const trigger = ScrollTrigger.create({
    trigger: siteFooter,
    start: "top top+=60",
    end: "bottom top+=60",
    onEnter: () => projectHeader.classList.add("is-inverse"),
    onEnterBack: () => projectHeader.classList.add("is-inverse"),
    onLeave: () => projectHeader.classList.remove("is-inverse"),
    onLeaveBack: () => projectHeader.classList.remove("is-inverse")
  });

  scrollArtifacts.push(trigger);
}

function scheduleResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    prepareLineReveals();
    buildFooterMarquee();
    setIntroVisible();
    initScrollDynamics();
    ScrollTrigger.refresh();
  }, 180);
}

function getRevealLineNodes() {
  return [...document.querySelectorAll(".line-inner")];
}

function toYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`
        : "";
    }

    if (parsed.pathname.startsWith("/shorts/")) {
      const videoId = parsed.pathname.split("/")[2];
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`
        : "";
    }

    if (parsed.pathname.startsWith("/embed/")) {
      const videoId = parsed.pathname.split("/")[2];
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`
        : "";
    }

    const videoId = parsed.searchParams.get("v");
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`
      : "";
  } catch (error) {
    return "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
