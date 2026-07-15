/* ============================================================
   CARVEYANCE — SITE ENGINE
   Reads articles.js and fills in the homepage + category pages.
   You should never need to edit this file.
   ============================================================ */

/* ------------------------------------------------------------
   HERO ROTATION — controls the big story at the top of the page.

     "daily"    the hero + side stack rotate automatically every
                day, cycling through everything you've published.
                Fresh homepage every morning. (recommended)
     "random"   changes on every single page load.
     "newest"   always your most recent article.
     "featured" pinned to whichever article has featured: true

   Change the word below and push. That's the whole control.
   ------------------------------------------------------------ */
const HERO_MODE = "daily";

const CATEGORIES = [
  "How It Works", "Reviews", "Comparisons", "Car Culture", "Road Trips",
  "Opinions", "Advice & Tips", "Fun Facts", "Short Stories",
  "Interviews", "News"
];

const COMING_SOON = ["Interviews", "News", "Podcast", "Videos"];

/* "How It Works" -> "how-it-works" ; "Advice & Tips" -> "advice-tips" */
function slugify(s) {
  return s.toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fmtDate(iso) {
  const d = new Date(iso + "T12:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* newest first */
function allArticles() {
  const list = (typeof ARTICLES !== "undefined" && Array.isArray(ARTICLES)) ? ARTICLES.slice() : [];
  return list
    .filter(a => a && a.slug && a.title && a.category)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function byCategory(cat) {
  return allArticles().filter(a => a.category === cat);
}

function url(a) { return "/articles/" + a.slug + "/"; }

/* ---------- card builders ---------- */

function cardHTML(a) {
  return `
  <a class="card" href="${url(a)}">
    <div class="card-img"><img src="${esc(a.image)}" alt="" loading="lazy"></div>
    <div class="card-cat">${esc(a.category)}</div>
    <h3 class="card-hed">${esc(a.title)}</h3>
    <p class="card-dek">${esc(a.blurb)}</p>
    <div class="card-meta">${fmtDate(a.date)} <span class="dot">●</span> ${esc(a.readTime || "")}</div>
  </a>`;
}

function bigStoryHTML(a, badge) {
  return `
  <div class="bs-img"><a href="${url(a)}"><img src="${esc(a.image)}" alt="" loading="lazy"></a></div>
  <div>
    ${badge ? `<span class="hiw-badge">★ Flagship</span>` : ``}
    <div class="bs-label"><span class="card-cat">${esc(a.category)}</span></div>
    <h2 class="bs-hed"><a href="${url(a)}" style="color:inherit;text-decoration:none">${esc(a.title)}${a.subtitle ? ` — <em>${esc(a.subtitle)}</em>` : ``}</a></h2>
    <p class="bs-dek">${esc(a.blurb)}</p>
    <a href="${url(a)}" class="rmore">Read Story</a>
  </div>`;
}

/* ---------- hero rotation ---------- */

/* Same hero all day, a new one tomorrow. Deterministic, so every
   visitor sees the same homepage on the same day. */
function dayIndex() {
  return Math.floor(Date.now() / 86400000);
}

function heroOrder(arts) {
  const n = arts.length;
  if (!n) return [];
  let offset = 0;
  if (HERO_MODE === "daily")       offset = dayIndex() % n;
  else if (HERO_MODE === "random") offset = Math.floor(Math.random() * n);
  else if (HERO_MODE === "featured") {
    const i = arts.findIndex(a => a.featured);
    offset = i >= 0 ? i : 0;
  } else offset = 0; /* "newest" */
  /* rotate the list so the chosen article is first, others follow in order */
  return arts.slice(offset).concat(arts.slice(0, offset));
}

/* ---------- homepage ---------- */

function initHome() {
  const arts = allArticles();
  if (!arts.length) return;

  /* HERO — chosen by HERO_MODE above */
  const rotated = heroOrder(arts);
  const feat = rotated[0];
  const heroMain = document.querySelector(".hero-main");
  if (heroMain && feat) {
    heroMain.innerHTML = `
      <img src="${esc(feat.image)}" alt="">
      <div class="hero-main-body">
        <div class="cat-pill">Featured · ${esc(feat.category)}</div>
        <h1 class="hero-hed">${esc(feat.title)}${feat.subtitle ? `<br><em>${esc(feat.subtitle)}</em>` : ``}</h1>
        <p class="hero-dek">${esc(feat.blurb)}</p>
        <div class="hero-byline">${fmtDate(feat.date)} &nbsp;·&nbsp; <b>${esc(feat.readTime || "")} read</b></div>
      </div>`;
    heroMain.style.cursor = "pointer";
    heroMain.onclick = () => location.href = url(feat);
  }

  /* HERO SIDE STACK — next three */
  const stack = document.querySelector(".hero-stack");
  if (stack) {
    const rest = rotated.slice(1, 4);
    if (rest.length) {
      stack.innerHTML = rest.map(a => `
        <a class="hcard" href="${url(a)}">
          <img src="${esc(a.image)}" alt="">
          <div class="hcard-body">
            <div class="hcard-cat">${esc(a.category)}</div>
            <h2 class="hcard-hed">${esc(a.title)}</h2>
          </div>
        </a>`).join("");
    } else {
      stack.style.display = "none";
    }
  }

  /* TICKER — every headline, doubled so the scroll loops seamlessly */
  const track = document.querySelector(".tick-track");
  if (track) {
    const spans = arts.map(a => `<span><a href="${url(a)}" style="color:inherit;text-decoration:none">${esc(a.title)}</a></span>`).join("");
    track.innerHTML = spans + spans;
  }

  /* LATEST STORIES — newest six */
  const latest = document.getElementById("latest-grid");
  if (latest) latest.innerHTML = arts.slice(0, 12).map(cardHTML).join("");

  /* HOW IT WORKS band */
  const hiw = byCategory("How It Works");
  const hiwBig = document.getElementById("hiw-big");
  const hiwGrid = document.getElementById("hiw-grid");
  const hiwSec = document.getElementById("sec-hiw");
  if (!hiw.length) {
    if (hiwSec) hiwSec.style.display = "none";
  } else {
    if (hiwBig) hiwBig.innerHTML = bigStoryHTML(hiw[0], true);
    if (hiwGrid) hiwGrid.innerHTML = hiw.slice(1, 7).map(cardHTML).join("");
  }

  /* CATEGORY COUNTS in the mosaic */
  document.querySelectorAll("[data-cat-count]").forEach(el => {
    const cat = el.getAttribute("data-cat-count");
    if (COMING_SOON.includes(cat)) return;
    const n = byCategory(cat).length;
    el.textContent = n === 0 ? "Coming Soon" : (n === 1 ? "1 story" : n + " stories");
  });
}

/* ---------- category pages ---------- */

function initCategory() {
  const root = document.getElementById("cat-root");
  if (!root) return;
  const cat = root.getAttribute("data-category");
  const arts = byCategory(cat);
  const grid = document.getElementById("cat-grid");
  const count = document.getElementById("cat-count");

  if (count) count.textContent = arts.length === 0 ? "No stories yet" :
    (arts.length === 1 ? "1 story" : arts.length + " stories");

  if (!grid) return;
  if (!arts.length) {
    grid.innerHTML = `
      <div class="cat-empty">
        <div class="cat-empty-icon">✎</div>
        <h3>Nothing here yet</h3>
        <p>This section is just getting started. Check back soon — or pitch us something.</p>
        <a href="/#submit" class="rmore">Submit a Story</a>
      </div>`;
    grid.style.gridTemplateColumns = "1fr";
  } else {
    grid.innerHTML = arts.map(cardHTML).join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try { initHome(); } catch (e) { console.error("Home render:", e); }
  try { initCategory(); } catch (e) { console.error("Category render:", e); }
});
