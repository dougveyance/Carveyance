/* ============================================================
   CARVEYANCE GARAGE: shared code for /c/, /cards/ and /garage/
   ============================================================
   Needs, loaded before it:
     /assets/js/vendor/supabase-js-2.117.2.js   (the database library)
     /assets/js/cv-garage-config.js             (the connection settings)
   Everything lives under window.CVG.
   ============================================================ */
(function () {
  "use strict";
  var G = (window.CVG = {});
  var cfg = window.CV_GARAGE || {};

  G.configured = !!(cfg.supabaseUrl && cfg.supabaseKey && window.supabase && window.supabase.createClient);
  G.db = G.configured
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;

  // Columns anyone may read (owner_id is deliberately left out).
  G.PUBLIC_COLS = "id,sticker_number,owner_name,town,instagram,year,make,model,nickname,story," +
    "specs,build,photos,card_color,owner_hidden,hidden,specs_checked,owner_slug,updated_at";
  G.OWNER_COLS = G.PUBLIC_COLS + ",owner_id";
  G.COLORS = ["#9E2B25", "#1F3F73", "#2F5D3A", "#4A4F57", "#7A5A1E", "#5B3C6E"];
  G.MAX_PHOTOS = 12;

  /* ---------- small helpers ---------- */
  G.pad = function (n) { return String(n).padStart(4, "0"); };
  G.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  G.photoUrl = function (path) {
    return String(cfg.supabaseUrl || "").replace(/\/$/, "") + "/storage/v1/object/public/car-photos/" +
      String(path).split("/").map(encodeURIComponent).join("/");
  };
  G.carName = function (c) {
    return [c.year, c.make, c.model].filter(Boolean).join(" ") || "Car No. " + G.pad(c.sticker_number || 0);
  };
  G.initials = function (name) {
    var p = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!p.length) return "?";
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase().replace(/[^A-Z0-9]/g, "") || "?";
  };
  G.color = function (c) { return /^#[0-9a-f]{6}$/i.test(c || "") ? c : G.COLORS[0]; };
  G.instaHandle = function (h) { return String(h || "").trim().replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, ""); };

  /* Browser storage can be blocked (private windows, some previews). */
  G.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };
  G.deviceId = function () {
    var id = G.store.get("cv-device", null);
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
          });
      G.store.set("cv-device", id);
    }
    return id;
  };

  /* Collected cards live on this phone. */
  G.cards = {
    all: function () { var a = G.store.get("cv-cards", []); return Array.isArray(a) ? a : []; },
    has: function (n) { return G.cards.all().some(function (c) { return c.sticker_number === n; }); },
    add: function (snap) {
      var a = G.cards.all().filter(function (c) { return c.sticker_number !== snap.sticker_number; });
      a.unshift(snap); return G.store.set("cv-cards", a);
    },
    remove: function (n) {
      G.store.set("cv-cards", G.cards.all().filter(function (c) { return c.sticker_number !== n; }));
    }
  };

  /* ---------- dates ---------- */
  G.today = function () {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  G.fmtDate = function (iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    return m ? MONTHS[+m[2] - 1] + " " + (+m[3]) + ", " + m[1] : "";
  };

  /* ---------- loading other scripts (events.js, articles.js) ---------- */
  var loaded = {};
  G.loadScript = function (src) {
    if (!loaded[src]) {
      loaded[src] = new Promise(function (res) {
        var s = document.createElement("script");
        s.src = src; s.onload = function () { res(true); }; s.onerror = function () { res(false); };
        document.head.appendChild(s);
      });
    }
    return loaded[src];
  };

  /* ---------- the Carveyance events calendar ---------- */
  function evList() { try { return typeof EVENTS !== "undefined" ? EVENTS : []; } catch (e) { return []; } }
  function meetList() { try { return typeof MEETS !== "undefined" ? MEETS : []; } catch (e) { return []; } }
  function town(x) { return [x.city, x.state].filter(Boolean).join(", "); }
  G.findListing = function (id) {
    if (!id) return null;
    return evList().find(function (e) { return e.id === id; }) || meetList().find(function (m) { return m.id === id; }) || null;
  };
  // What's on today: dated events running today + meets that happen on today's weekday.
  G.todays = function () {
    var t = G.today();
    var wd = new Date().toLocaleDateString("en-US", { weekday: "long" });
    var out = [];
    evList().forEach(function (e) {
      if (e.start <= t && t <= e.end && e.status !== "canceled" && e.status !== "postponed")
        out.push({ id: e.id, name: e.name, town: town(e), region: e.region || "" });
    });
    meetList().forEach(function (m) {
      if (m.day === wd) out.push({ id: m.id, name: m.name, town: town(m), region: m.region || "" });
    });
    return out;
  };
  // Anything a car could already have been to: every regular meet, plus dated events that have started.
  G.pastPicks = function () {
    var t = G.today(), out = [];
    meetList().forEach(function (m) { out.push({ id: m.id, name: m.name, town: town(m) }); });
    evList().forEach(function (e) { if (e.start <= t) out.push({ id: e.id, name: e.name, town: town(e) }); });
    out.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return out;
  };

  /* ---------- the collector card ---------- */
  G.facts = function (car, events) {
    var f = (car.specs || []).filter(function (s) { return s && s.label && s.value; }).slice(0, 3)
      .map(function (s) { return { label: s.label, value: s.value }; });
    f.push({ label: "Events", value: String(events || 0) });
    return f;
  };
  G.cardHTML = function (car, o) {
    o = o || {};
    var size = o.size || "full";
    var cover = (car.photos || [])[0];
    var tag = o.href ? "a" : "div";
    var who = [car.owner_name, car.town].filter(Boolean).join(" · ");
    return "<" + tag + ' class="cv-card' + (size === "full" ? "" : " " + size) + '" style="background:' + G.color(car.card_color) + '"' +
      (o.href ? ' href="' + G.esc(o.href) + '"' : "") + (o.label ? ' aria-label="' + G.esc(o.label) + '"' : "") + ">" +
      '<div class="in">' +
        '<div class="top"><div class="wm">CAR<span>VEYANCE</span></div><div class="no">No. ' + G.pad(car.sticker_number) + "</div></div>" +
        '<div class="pic">' + (cover ? '<img src="' + G.esc(G.photoUrl(cover)) + '" alt="" loading="lazy">' : "") + "</div>" +
        '<div class="nm">' + G.esc(G.carName(car)) + "</div>" +
        (car.nickname ? '<div class="nick">“' + G.esc(car.nickname) + "”</div>" : "") +
        (who ? '<div class="ow">' + G.esc(who) + "</div>" : "") +
        '<div class="facts">' + G.facts(car, o.events).map(function (f) {
          return '<div><div class="fl">' + G.esc(f.label) + '</div><div class="fv">' + G.esc(f.value) + "</div></div>";
        }).join("") + "</div>" +
        '<div class="ft">' + G.esc(o.footer || "Living card") + "</div>" +
      "</div></" + tag + ">";
  };

  /* ---------- sheets and toasts ---------- */
  G.sheet = function (html, label) {
    var last = document.activeElement;
    var bg = document.createElement("div");
    bg.className = "sheet-bg";
    bg.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" aria-label="' + G.esc(label || "Dialog") + '">' +
      '<button type="button" class="close" aria-label="Close">×</button>' + html + "</div>";
    document.body.appendChild(bg);
    function onKey(e) { if (e.key === "Escape") close(); }
    function close() {
      bg.remove(); document.removeEventListener("keydown", onKey);
      if (last && last.focus) last.focus();
    }
    bg.addEventListener("click", function (e) { if (e.target === bg) close(); });
    bg.querySelector(".close").addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    var first = bg.querySelector("select, input, textarea, .sheet button:not(.close)");
    (first || bg.querySelector(".close")).focus();
    return { el: bg.querySelector(".sheet"), close: close };
  };
  G.toast = function (msg) {
    var t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  };

  G.notReadyHTML = function () {
    return '<div class="g-state"><div class="kicker">Carveyance Garage</div><h1>Getting ready</h1>' +
      "<p>Car pages open here soon. Check back after the next meet.</p></div>";
  };

  /* ---------- sign in / create account ---------- */
  G.authForm = function (box, onDone, opts) {
    opts = opts || {};
    var mode = opts.mode || "new";
    box.innerHTML =
      '<div class="tabs" role="tablist">' +
        '<button type="button" role="tab" data-m="new">Create account</button>' +
        '<button type="button" role="tab" data-m="in">Sign in</button>' +
      "</div>" +
      '<form novalidate>' +
        '<div class="field"><label for="au-email">Email</label><input id="au-email" type="email" autocomplete="email" required></div>' +
        '<div class="field"><label for="au-pass">Password</label><input id="au-pass" type="password" minlength="8" required>' +
          '<span class="hint" data-hint>At least 8 characters.</span></div>' +
        '<button class="btn" type="submit" style="width:100%"></button>' +
      "</form>" +
      '<p style="margin-top:12px"><button type="button" class="linkbtn" data-forgot>Forgot your password?</button></p>' +
      '<div class="msg" role="alert" hidden></div>';
    var form = box.querySelector("form"), msg = box.querySelector(".msg");
    var email = box.querySelector("#au-email"), pass = box.querySelector("#au-pass");
    function say(text, kind) { msg.hidden = !text; msg.className = "msg " + (kind || "err"); msg.textContent = text || ""; }
    function setMode(m) {
      mode = m;
      box.querySelectorAll("[role=tab]").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.m === m)); });
      form.querySelector("button[type=submit]").textContent = m === "new" ? "Create account" : "Sign in";
      pass.autocomplete = m === "new" ? "new-password" : "current-password";
      box.querySelector("[data-hint]").hidden = m !== "new";
      say("");
    }
    box.querySelectorAll("[role=tab]").forEach(function (b) { b.addEventListener("click", function () { setMode(b.dataset.m); }); });
    setMode(mode);
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var em = email.value.trim(), pw = pass.value;
      if (!/^\S+@\S+\.\S+$/.test(em)) return say("Enter your email address.");
      if (pw.length < 8) return say("Your password needs at least 8 characters.");
      var btn = form.querySelector("button[type=submit]"); btn.disabled = true;
      try {
        if (mode === "new") {
          var r = await G.db.auth.signUp({ email: em, password: pw, options: { emailRedirectTo: location.href } });
          if (r.error) {
            if (/registered|exists/i.test(r.error.message)) { setMode("in"); say("You already have an account. Sign in instead.", "info"); }
            else say(r.error.message);
          } else if (r.data && r.data.session) { onDone(r.data.session); }
          else say("Check your email for a link to confirm your account, then come back to this page.", "info");
        } else {
          var s = await G.db.auth.signInWithPassword({ email: em, password: pw });
          if (s.error) say(/invalid/i.test(s.error.message) ? "That email and password don't match." : s.error.message);
          else onDone(s.data.session);
        }
      } catch (err) { say("Something went wrong. Check your connection and try again."); }
      btn.disabled = false;
    });
    box.querySelector("[data-forgot]").addEventListener("click", async function () {
      var em = email.value.trim();
      if (!/^\S+@\S+\.\S+$/.test(em)) { email.focus(); return say("Type your email above first, then tap “Forgot your password?” again.", "info"); }
      var r = await G.db.auth.resetPasswordForEmail(em, { redirectTo: location.origin + "/garage/" });
      say(r.error ? r.error.message : "Check your email for a link to set a new password.", r.error ? "err" : "info");
    });
  };

  /* ---------- photos: shrink before upload ---------- */
  G.resizeImage = function (file, max) {
    max = max || 1600;
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        var w = Math.round(img.naturalWidth * s), h = Math.round(img.naturalHeight * s);
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? res(b) : rej(new Error("resize")); }, "image/jpeg", 0.85);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("That file isn't a photo we can read.")); };
      img.src = url;
    });
  };

  /* ---------- the card as an Instagram image (1080 × 1350) ---------- */
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function fit(ctx, text, maxW, weight, size, family, min) {
    var s = size;
    do { ctx.font = weight + " " + s + "px " + family; s -= 2; } while (ctx.measureText(text).width > maxW && s > (min || 20));
    if (ctx.measureText(text).width > maxW) {
      while (text.length > 1 && ctx.measureText(text + "…").width > maxW) text = text.slice(0, -1);
      text += "…";
    }
    return text;
  }
  function loadImg(src) {
    return new Promise(function (res) {
      var i = new Image(); i.crossOrigin = "anonymous";
      i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src;
    });
  }
  G.drawShareCard = async function (car, events) {
    var fonts = ['600 54px "Fraunces"', 'italic 36px "Newsreader"', '600 30px "Barlow Semi Condensed"', '44px "Bebas Neue"'];
    try { await Promise.all(fonts.map(function (f) { return document.fonts.load(f); })); } catch (e) {}
    var cover = (car.photos || [])[0];
    var photo = cover ? await loadImg(G.photoUrl(cover)) : null;
    var c = document.createElement("canvas"); c.width = 1080; c.height = 1350;
    var x = c.getContext("2d");
    var X = 160, Y = 70, W = 760, H = 1064;
    x.fillStyle = "#f0f3f7"; x.fillRect(0, 0, 1080, 1350);
    x.fillStyle = G.color(car.card_color); rr(x, X, Y, W, H, 36); x.fill();
    x.fillStyle = "#141820"; rr(x, X + 22, Y + 22, W - 44, H - 44, 20); x.fill();
    var L = X + 56, R = X + W - 56, IW = R - L;
    x.textBaseline = "alphabetic";
    x.font = '44px "Bebas Neue", Impact, sans-serif'; x.fillStyle = "#ffffff"; x.fillText("CAR", L, Y + 96);
    var cw = x.measureText("CAR").width; x.fillStyle = "#4E8DB5"; x.fillText("VEYANCE", L + cw, Y + 96);
    x.font = '600 30px "Barlow Semi Condensed", sans-serif'; x.fillStyle = "#d0dae4"; x.textAlign = "right";
    x.fillText("No. " + G.pad(car.sticker_number), R, Y + 94); x.textAlign = "left";
    var PY = Y + 124, PH = 430;
    x.save(); rr(x, L, PY, IW, PH, 12); x.clip();
    if (photo) {
      var s = Math.max(IW / photo.width, PH / photo.height), sw = IW / s, sh = PH / s;
      x.drawImage(photo, (photo.width - sw) / 2, (photo.height - sh) / 2, sw, sh, L, PY, IW, PH);
    } else {
      x.fillStyle = "#26303b"; x.fillRect(L, PY, IW, PH);
      x.font = '72px "Bebas Neue", Impact, sans-serif'; x.textAlign = "center"; x.fillStyle = "#3d4a59";
      x.fillText("CARVEYANCE", L + IW / 2, PY + PH / 2 + 24); x.textAlign = "left";
    }
    x.restore();
    x.fillStyle = "#ffffff";
    var nm = fit(x, G.carName(car), IW, "600", 54, '"Fraunces", Georgia, serif', 34);
    x.fillText(nm, L, Y + 630);
    var ty = Y + 630;
    if (car.nickname) {
      x.fillStyle = "#d0dae4";
      x.fillText(fit(x, "“" + car.nickname + "”", IW, "italic", 36, '"Newsreader", Georgia, serif', 26), L, ty + 48); ty += 48;
    }
    var who = [car.owner_name, car.town].filter(Boolean).join(" · ");
    if (who) { x.fillStyle = "#b8c2cd"; x.fillText(fit(x, who, IW, "500", 28, '"Barlow Semi Condensed", sans-serif', 22), L, ty + 42); }
    var DY = Y + 772;
    x.strokeStyle = "#3a4553"; x.lineWidth = 2; x.beginPath(); x.moveTo(L, DY); x.lineTo(R, DY); x.stroke();
    G.facts(car, events).forEach(function (f, i) {
      var fx = L + (i % 2) * (IW / 2 + 8), fy = DY + 48 + Math.floor(i / 2) * 96;
      x.fillStyle = "#b8c2cd"; x.fillText(fit(x, f.label.toUpperCase(), IW / 2 - 24, "600", 22, '"Barlow Semi Condensed", sans-serif', 18), fx, fy);
      x.fillStyle = "#ffffff"; x.fillText(fit(x, f.value, IW / 2 - 24, "600", 34, '"Barlow Semi Condensed", sans-serif', 24), fx, fy + 40);
    });
    x.fillStyle = "#b8c2cd"; x.font = '600 22px "Barlow Semi Condensed", sans-serif';
    x.fillText("LIVING CARD · CARVEYANCE.COM/C/" + G.pad(car.sticker_number), L, Y + H - 52);
    x.textAlign = "center"; x.fillStyle = "#141820";
    x.font = '600 40px "Fraunces", Georgia, serif'; x.fillText("Scan the sticker for the full story", 540, Y + H + 88);
    x.fillStyle = "#2E6E96"; x.font = '600 32px "Barlow Semi Condensed", sans-serif';
    x.fillText("carveyance.com/c/" + G.pad(car.sticker_number), 540, Y + H + 140);
    return await new Promise(function (res) { c.toBlob(res, "image/png"); });
  };
  G.shareCard = async function (car, events) {
    var blob = await G.drawShareCard(car, events);
    if (!blob) throw new Error("card");
    var name = "carveyance-" + G.pad(car.sticker_number) + ".png";
    var file = new File([blob], name, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: G.carName(car) }); return "shared"; }
      catch (e) { if (e && e.name === "AbortError") return "canceled"; }
    }
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    return "downloaded";
  };
})();
