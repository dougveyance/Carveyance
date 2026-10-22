/* ============================================================
   CARVEYANCE — MENU BUTTON FOR PHONES AND TABLETS
   On narrow screens the section links in the top bar are hidden.
   This adds a "Menu" button that opens the same links in a panel.
   It copies whatever links are in the page's .nav-center, so it
   never needs editing when a section is added to the nav.
   ============================================================ */
(function () {
  if (window.__cvMenu) return;
  window.__cvMenu = true;

  function init() {
    var nav = document.querySelector("nav");
    var center = nav && nav.querySelector(".nav-center");
    if (!center || nav.querySelector(".cv-menu-btn")) return;

    var css = document.createElement("style");
    css.textContent =
      ".cv-menu-btn{display:none;align-items:center;justify-content:center;gap:8px;height:36px;min-width:40px;padding:0 12px;" +
      "margin-left:auto;margin-right:10px;border:1px solid rgba(255,255,255,.3);border-radius:4px;background:transparent;color:#fff;" +
      "font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;flex-shrink:0}" +
      ".cv-menu-btn:hover,.cv-menu-btn[aria-expanded=true]{border-color:#fff;background:rgba(255,255,255,.08)}" +
      ".cv-menu-btn svg{display:block}" +
      "nav .nav-center a{white-space:nowrap}nav.cv-collapsed .nav-center{display:none!important}" +
      ".cv-menu-panel{position:fixed;left:0;right:0;top:var(--cv-nav-h,64px);z-index:1000;background:#141820;border-top:1px solid rgba(255,255,255,.08);" +
      "box-shadow:0 18px 40px rgba(0,0,0,.35);max-height:calc(100vh - var(--cv-nav-h,64px));overflow-y:auto;padding:8px 0 16px}" +
      ".cv-menu-panel[hidden]{display:none!important}" +
      ".cv-menu-panel a{display:block;padding:14px 24px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;letter-spacing:.04em;" +
      "color:rgba(255,255,255,.82);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.06)}" +
      ".cv-menu-panel a:hover,.cv-menu-panel a:focus{color:#fff;background:rgba(78,141,181,.15)}" +
      ".cv-menu-panel a.on{color:#fff;font-weight:700;box-shadow:inset 3px 0 0 #e05c2a}" +
      ".cv-menu-panel a.cv-menu-cta{margin:14px 24px 0;border:0;border-radius:4px;background:#e05c2a;color:#fff;text-align:center;font-weight:600}" +
      "@media(max-width:520px){.cv-menu-btn .cv-menu-word{display:none}.cv-menu-btn{padding:0 9px;margin-right:8px}" +
      "nav .nav-right .nav-pill{display:none}}";
    document.head.appendChild(css);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cv-menu-btn";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "cv-menu-panel");
    btn.setAttribute("aria-label", "Open the site menu");
    btn.innerHTML = '<svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" stroke-width="1.8"/></svg><span class="cv-menu-word">Menu</span>';

    var panel = document.createElement("div");
    panel.id = "cv-menu-panel";
    panel.className = "cv-menu-panel";
    panel.hidden = true;
    var links = center.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var a = document.createElement("a");
      a.href = links[i].getAttribute("href");
      a.textContent = links[i].textContent.trim();
      if (links[i].classList.contains("on")) { a.className = "on"; a.setAttribute("aria-current", "page"); }
      panel.appendChild(a);
    }

    // the home page's "Write for Us" pill is hidden on phones to make room, so offer it in the panel
    var pill = nav.querySelector(".nav-right .nav-pill");
    if (pill) {
      var cta = document.createElement("a");
      cta.href = pill.getAttribute("href");
      cta.className = "cv-menu-cta";
      cta.textContent = pill.textContent.replace(/^[^A-Za-z]+/, "").trim();
      panel.appendChild(cta);
    }

    // sit just before the right-hand block (search / Write for Us / Submit an Event)
    var right = center.nextElementSibling;
    nav.insertBefore(btn, right || null);
    document.body.appendChild(panel);

    function setOpen(open) {
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close the site menu" : "Open the site menu");
    }
    // the section links need their full width; when the window is too narrow for them, use the Menu button instead
    function fits() {
      nav.classList.remove("cv-collapsed");
      var cc = window.getComputedStyle(center);
      if (cc.display === "none") return false;
      var ns = window.getComputedStyle(nav);
      var avail = nav.clientWidth - parseFloat(ns.paddingLeft) - parseFloat(ns.paddingRight);
      var links = center.querySelectorAll("a"), gap = parseFloat(cc.columnGap) || 0, need = 0, i;
      for (i = 0; i < links.length; i++) need += links[i].getBoundingClientRect().width;
      need += gap * Math.max(0, links.length - 1) + (parseFloat(cc.marginLeft) || 0) + (parseFloat(cc.marginRight) || 0);
      for (i = 0; i < nav.children.length; i++) {
        var el = nav.children[i];
        if (el === center || el === btn || window.getComputedStyle(el).display === "none") continue;
        need += el.getBoundingClientRect().width;
      }
      return need + 32 <= avail;
    }
    function sync() {
      var narrow = !fits();
      if (narrow) nav.classList.add("cv-collapsed");
      btn.style.display = narrow ? "inline-flex" : "none";
      document.documentElement.style.setProperty("--cv-nav-h", Math.round(nav.getBoundingClientRect().bottom) + "px");
      if (!narrow) setOpen(false);
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); sync(); setOpen(panel.hidden); });
    panel.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    document.addEventListener("click", function (e) { if (!panel.hidden && !panel.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setOpen(false); btn.focus(); } });
    window.addEventListener("resize", sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
    window.addEventListener("scroll", function () { if (!panel.hidden) sync(); }, { passive: true });
    sync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
