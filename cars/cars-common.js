/* ============================================================
   CARVEYANCE — THE CAR INDEX: shared page code
   ============================================================
   Loaded by /cars/ and by every car page, after:
     /assets/js/vendor/supabase-js-2.117.2.js   (database library)
     /assets/js/cv-garage-config.js             (connection settings)
     /assets/js/cv-garage.js                    (accounts, sign-in form)
   The scores live in the same Supabase project as the Garage, set up
   by tools/garage/car_index.sql. Until that file has been run, the
   pages still work: they just say ratings open soon.
   Everything lives under window.CVI.
   ============================================================ */
(function () {
  "use strict";
  var I = (window.CVI = {});
  var G = window.CVG || {};
  var db = G.db || null;

  /* ---------- small helpers ---------- */
  I.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var esc = I.esc;
  I.WHEEL = '<svg class="wheel" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="9.3" fill="none" stroke="currentColor" stroke-width="2.6"/>' +
    '<circle cx="12" cy="12" r="2.7" fill="currentColor"/>' +
    '<path d="M3.6 10.6h6M14.4 10.6h6M12 14.8v6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
  I.WORDS = ["", "Never again", "Not for me", "Rough", "Meh", "Fair", "Good", "Very good", "Great", "Brilliant", "Poster on the wall"];
  I.PROVISIONAL = 5;   // fewer ratings than this and the score is marked provisional
  I.num = function (n) { return Number(n).toLocaleString("en-US"); };
  I.one = function (x) { return (Math.round(Number(x) * 10) / 10).toFixed(1); };
  I.store = G.store || {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function toast(m) { if (G.toast) G.toast(m); }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch (e) { return ""; }
  }
  /* Rank cars fairly when some have 1 vote and others 200:
     pull a small sample toward the middle until it has earned it. */
  I.weighted = function (n, avg) { var m = I.PROVISIONAL, c = 6.5; return n ? (n / (n + m)) * avg + (m / (n + m)) * c : 0; };

  /* ---------- every car's score, for the index ---------- */
  I.loadScores = function () {
    if (!db) return Promise.resolve(null);
    return db.rpc("index_scores").then(function (r) {
      if (r.error) return null;
      var out = {};
      (r.data || []).forEach(function (x) { out[x.car_id] = { n: Number(x.n), avg: Number(x.avg) }; });
      return out;
    }, function () { return null; });
  };

  /* ============================================================
     THE INDEX PAGE
     ============================================================ */
  I.indexPage = function () {
    var CARS = typeof CARS_INDEX !== "undefined" ? CARS_INDEX : [];
    var today = I.todayISO();
    CARS.forEach(function (c) { c._latest = I.newestOut(c, today); c._n = 0; c._avg = 0; });
    var PAGE = 24;
    var params = new URLSearchParams(location.search);
    var st = { q: params.get("q") || "", make: params.get("make") || "", sort: params.get("sort") || "", limit: PAGE };
    var scores = null;
    var el = function (id) { return document.getElementById(id); };
    var stat = el("static"); if (stat) stat.hidden = true;

    var makes = {};
    CARS.forEach(function (c) { makes[c.make] = (makes[c.make] || 0) + 1; });
    var makeList = Object.keys(makes).sort(function (a, b) { return a.localeCompare(b); });
    var ms = el("make");
    makeList.forEach(function (m) { var o = document.createElement("option"); o.value = m; o.textContent = m + " (" + makes[m] + ")"; ms.appendChild(o); });
    ms.value = st.make;
    el("q").value = st.q;
    el("st-cars").textContent = CARS.length;
    el("st-makes").textContent = makeList.length;

    function hay(c) {
      return [c.name, (c.aka || []).join(" "), c.make, c.maker, c.years, c.body, c.engine, c.country].join(" ").toLowerCase();
    }
    function filtered(ignoreMake) {
      var words = st.q.toLowerCase().split(/\s+/).filter(Boolean);
      return CARS.filter(function (c) {
        if (!ignoreMake && st.make && c.make !== st.make) return false;
        if (words.length) { var h = hay(c); for (var i = 0; i < words.length; i++) if (h.indexOf(words[i]) < 0) return false; }
        return true;
      });
    }
    function sortKey() {
      if (st.sort) return st.sort;
      var any = CARS.some(function (c) { return c._n >= I.PROVISIONAL; });
      return any ? "top" : "stories";
    }
    function sorted(list) {
      var s = sortKey();
      return list.slice().sort(function (a, b) {
        if (s === "top") return (I.weighted(b._n, b._avg) - I.weighted(a._n, a._avg)) || b._n - a._n || a.name.localeCompare(b.name);
        if (s === "most") return b._n - a._n || a.name.localeCompare(b.name);
        if (s === "stories") return b._latest.localeCompare(a._latest) || a.name.localeCompare(b.name);
        if (s === "old") return (a.start || 9999) - (b.start || 9999) || a.name.localeCompare(b.name);
        if (s === "new") return (b.start || 0) - (a.start || 0) || a.name.localeCompare(b.name);
        return (a.make + a.name).localeCompare(b.make + b.name);
      });
    }
    function renderMakes() {
      var base = filtered(true), box = el("makes");
      var count = {}; base.forEach(function (c) { count[c.make] = (count[c.make] || 0) + 1; });
      var h = '<button type="button" class="chip' + (st.make ? "" : " on") + '" data-make="">All <span>' + base.length + "</span></button>";
      makeList.forEach(function (m) {
        if (!count[m]) return;
        h += '<button type="button" class="chip' + (st.make === m ? " on" : "") + '" data-make="' + esc(m) + '">' + esc(m) + " <span>" + count[m] + "</span></button>";
      });
      box.innerHTML = h;
    }
    function badge(c) {
      if (!scores) return "";
      if (!c._n) return '<span class="cbadge new">Rate it</span>';
      return '<span class="cbadge" title="' + c._n + (c._n === 1 ? " rating" : " ratings") + '">' + I.WHEEL + I.one(c._avg) +
        (c._n < I.PROVISIONAL ? " <small>NEW</small>" : "") + "</span>";
    }
    function card(c) {
      var st = c.photo ? (c.photo.pos ? "object-position:" + c.photo.pos + ";" : "") +
        (c.photo.fit === "contain" ? "object-fit:contain;" : "") : "";
      var img = c.photo && c.photo.card
        ? '<img src="' + esc(c.photo.card) + '" alt="' + esc(c.name) + '" loading="lazy"' +
          (st ? ' style="' + esc(st) + '"' : "") + ' onerror="this.style.visibility=\'hidden\'">'
        : '<span class="ph">' + esc(c.name) + "</span>";
      var n = (c.articles || []).length;
      return '<a class="card" href="/cars/' + esc(c.id) + '/">' +
        '<div class="cimg">' + img + badge(c) + "</div>" +
        '<div class="cbody"><div class="cmeta">' + esc(c.make) + " &middot; " + esc(c.years || "") + "</div>" +
        '<div class="cname">' + esc(c.name) + "</div>" +
        '<div class="cquick">' + esc(c.quick || "") + "</div>" +
        '<div class="cfoot"><span>' + (scores ? (c._n ? "<b>" + I.num(c._n) + "</b> " + (c._n === 1 ? "rating" : "ratings") : "Be the first to rate") : esc(c.body || "")) + "</span>" +
        "<span><b>" + n + "</b> " + (n === 1 ? "story" : "stories") + "</span></div></div></a>";
    }
    function render() {
      renderMakes();
      var list = sorted(filtered(false));
      el("count").innerHTML = "<b>" + list.length + "</b> " + (list.length === 1 ? "car" : "cars") + (st.make ? " from " + esc(st.make) : "") +
        (st.q || st.make ? ' <button type="button" class="clear" id="clear">Clear</button>' : "");
      el("sort").value = sortKey();
      var g = el("grid");
      g.innerHTML = list.length ? list.slice(0, st.limit).map(card).join("")
        : '<div class="empty">Nothing in the Index matches that yet. Try a make, a model or a decade.</div>';
      el("more").hidden = list.length <= st.limit;
      var u = new URLSearchParams();
      if (st.q) u.set("q", st.q); if (st.make) u.set("make", st.make); if (st.sort) u.set("sort", st.sort);
      var qs = u.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
    }
    var t = null;
    el("q").addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { st.q = el("q").value.trim(); st.limit = PAGE; render(); }, 120); });
    ms.addEventListener("change", function () { st.make = ms.value; st.limit = PAGE; render(); });
    el("sort").addEventListener("change", function () { st.sort = el("sort").value; render(); });
    el("makes").addEventListener("click", function (e) {
      var b = e.target.closest("[data-make]"); if (!b) return;
      st.make = b.getAttribute("data-make"); ms.value = st.make; st.limit = PAGE; render();
    });
    el("more").addEventListener("click", function () { st.limit += PAGE; render(); });
    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "clear") { st.q = ""; st.make = ""; el("q").value = ""; ms.value = ""; st.limit = PAGE; render(); }
    });
    render();
    I.loadScores().then(function (s) {
      if (!s) return;
      scores = s;
      var total = 0;
      CARS.forEach(function (c) { var x = s[c.id]; if (x) { c._n = x.n; c._avg = x.avg; total += x.n; } });
      el("st-votes").textContent = I.num(total);
      el("st-votes-wrap").hidden = false;
      render();
    });
  };

  /* ============================================================
     A CAR PAGE
     ============================================================ */
  /* ============================================================
     COMPARE: up to 3 cars side by side (/cars/compare/?ids=a,b,c)
     ============================================================ */
  I.comparePage = function () {
    var ALL = (typeof CARS_INDEX !== "undefined" ? CARS_INDEX : []);
    var by = {}; ALL.forEach(function (c) { by[c.id] = c; });
    var MAX = 3, scores = null;
    var $ = function (id) { return document.getElementById(id); };
    var ids = [];
    try { ids = (new URLSearchParams(location.search).get("ids") || "").split(",").filter(function (x) { return by[x]; }); } catch (e) {}
    ids = ids.filter(function (x, i) { return ids.indexOf(x) === i; }).slice(0, MAX);

    function save() {
      try { history.replaceState(null, "", location.pathname + (ids.length ? "?ids=" + ids.join(",") : "")); } catch (e) {}
    }
    function lb(kg) { return Math.round(kg * 2.20462); }
    function ptw(c) { return c.hp && c.kg ? Math.round(c.hp / c.kg * 1000) : null; }   // hp per metric ton
    function base(n) { return String(n).replace(/\s*\([^)]*\)\s*$/, ""); }
    function gen(n) { var m = String(n).match(/\(([^)]+)\)\s*$/); return m ? m[1] : ""; }

    // each row: label, value(c) for display, number(c) for "best", which way is better, small line under it
    var ROWS = [
      { k: "score", l: "Community score", v: function (c) {
          var x = scores && scores[c.id];
          if (!scores) return null;
          return x && x.n ? I.WHEEL + "<b>" + I.one(x.avg) + "</b> / 10" : '<span class="dim">Not rated yet</span>'; },
        n: function (c) { var x = scores && scores[c.id]; return x && x.n ? x.avg : null; }, better: "high",
        s: function (c) { var x = scores && scores[c.id]; return x && x.n ? I.num(x.n) + (x.n === 1 ? " rating" : " ratings") : ""; } },
      { k: "hp", l: "Power", v: function (c) { return c.hp ? "<b>" + I.num(Math.round(c.hp)) + "</b> hp" : null; }, n: function (c) { return c.hp; }, better: "high" },
      { k: "kg", l: "Weight", v: function (c) { return c.kg ? "<b>" + I.num(Math.round(c.kg)) + "</b> kg" : null; }, n: function (c) { return c.kg; }, better: "low",
        s: function (c) { return c.kg ? I.num(lb(c.kg)) + " lb" + (c.kgNote ? " · " + c.kgNote : "") : ""; } },
      { k: "ptw", l: "Power to weight", v: function (c) { var x = ptw(c); return x ? "<b>" + I.num(x) + "</b> hp per ton" : null; }, n: ptw, better: "high" },
      { k: "z60", l: "0&ndash;60 mph", v: function (c) { return c.z60 ? "<b>" + Number(c.z60.sec).toFixed(1) + "</b> sec" : null; },
        n: function (c) { return c.z60 ? c.z60.sec : null; }, better: "low",
        s: function (c) { return c.z60 ? (c.z60.note || (c.z60.kind === "claimed" ? "Maker's claim" : "Road test")) : ""; } },
      { k: "top", l: "Top speed", v: function (c) { return c.top ? "<b>" + I.num(Math.round(c.top.mph)) + "</b> mph" : null; },
        n: function (c) { return c.top ? c.top.mph : null; }, better: "high",
        s: function (c) { return c.top ? (c.top.note || (c.top.kind === "claimed" ? "Maker's claim" : "Tested")) : ""; } },
      { k: "built", l: "Built", v: function (c) { return c.built ? "<b>" + (c.built.approx ? "about " : "") + I.num(c.built.count) + "</b>" : null; },
        s: function (c) { return c.built ? (c.built.note || "") : ""; } },
      { k: "years", l: "Years", v: function (c) { return c.years ? esc(c.years) : null; } },
      { k: "country", l: "Built in", v: function (c) { return c.country ? esc(c.country) : null; } },
      { k: "body", l: "Body", v: function (c) { return c.body ? esc(c.body) : null; } },
      { k: "engine", l: "Engine", v: function (c) { return c.engine ? esc(c.engine) : null; } },
      { k: "drive", l: "Drive", v: function (c) { return c.drive ? esc(c.drive) : null; } },
      { k: "gearbox", l: "Gearbox", v: function (c) { return c.gearbox ? esc(c.gearbox) : null; } }
    ];

    function head(c) {
      var st = c.photo ? (c.photo.pos ? "object-position:" + c.photo.pos + ";" : "") + (c.photo.fit === "contain" ? "object-fit:contain;" : "") : "";
      var img = c.photo && c.photo.card
        ? '<img src="' + esc(c.photo.card) + '" alt="" loading="lazy"' + (st ? ' style="' + esc(st) + '"' : "") + ' onerror="this.style.visibility=\'hidden\'">'
        : '<span class="ph">' + esc(c.name) + "</span>";
      var g = gen(c.name);
      return '<div class="cmp-car"><a class="cmp-ph" href="/cars/' + esc(c.id) + '/" tabindex="-1" aria-hidden="true">' + img + "</a>" +
        '<div class="cmp-mk">' + esc(c.make) + " &middot; " + esc(c.years || "") + "</div>" +
        '<a class="cmp-nm" href="/cars/' + esc(c.id) + '/">' + esc(base(c.name)) + (g ? " <em>" + esc(g) + "</em>" : "") + "</a>" +
        '<button type="button" class="cmp-x" data-rm="' + esc(c.id) + '" aria-label="Remove ' + esc(c.name) + '">Remove</button></div>';
    }

    function render() {
      var cars = ids.map(function (x) { return by[x]; });
      var box = $("cmp");
      document.title = (cars.length > 1 ? cars.map(function (c) { return c.name; }).join(" vs ") + " — " : "") + "Compare Cars Side by Side — The Car Index";
      if (!cars.length) {
        box.innerHTML = '<div class="cmp-empty"><h2 class="h2">Pick 2 or 3 cars</h2><p>Search for a car above, or start with one of these families from the Index.</p>' + starters() + "</div>";
      } else {
        var n = cars.length;
        var h = '<div class="cmp-tbl" style="--n:' + n + '">';
        h += '<div class="cmp-row cmp-top"><div class="cmp-l"></div>' + cars.map(head).join("") + "</div>";
        ROWS.forEach(function (r) {
          var vals = cars.map(function (c) { return r.v(c); });
          if (vals.every(function (v) { return v == null; })) return;
          var best = null;
          if (r.n && n > 1) {
            var nums = cars.map(function (c) { var x = r.n(c); return x == null ? null : Number(x); });
            var have = nums.filter(function (x) { return x != null; });
            if (have.length > 1) {
              var b = r.better === "low" ? Math.min.apply(null, have) : Math.max.apply(null, have);
              if (have.filter(function (x) { return x === b; }).length < have.length) best = b;
              r._nums = nums;
            }
          }
          h += '<div class="cmp-row' + (r.k === "engine" || r.k === "gearbox" || r.k === "body" || r.k === "drive" || r.k === "country" || r.k === "years" ? " txt" : "") + '"><div class="cmp-l">' + r.l + "</div>" +
            cars.map(function (c, i) {
              var v = vals[i], isBest = best != null && r._nums && r._nums[i] === best;
              var sub = r.s ? r.s(c) : "";
              return '<div class="cmp-v' + (isBest ? " best" : "") + '">' + (v == null ? '<span class="dim">&mdash;</span>' : v) +
                (isBest ? '<span class="tag">' + ({ score: "Top rated", hp: "Most power", kg: "Lightest", ptw: "Best ratio", z60: "Quickest", top: "Fastest" }[r.k] || "Best") + "</span>" : "") +
                (sub ? "<small>" + esc(sub) + "</small>" : "") + "</div>";
            }).join("") + "</div>";
        });
        h += "</div>";
        box.innerHTML = h;
      }
      // the whole line each chosen car belongs to, oldest first, minus the ones already shown
      var fam = [];
      cars.forEach(function (c) {
        var line = [c.id], x = c;
        while (x.prev && x.prev.id && by[x.prev.id] && line.indexOf(x.prev.id) < 0) { x = by[x.prev.id]; line.unshift(x.id); }
        x = c;
        while (x.next && x.next.id && by[x.next.id] && line.indexOf(x.next.id) < 0) { x = by[x.next.id]; line.push(x.id); }
        (c.alongside || []).forEach(function (a) { if (a.id && by[a.id] && line.indexOf(a.id) < 0) line.push(a.id); });
        line.forEach(function (i) { if (ids.indexOf(i) < 0 && fam.indexOf(i) < 0) fam.push(i); });
      });
      $("cmp-fam").innerHTML = (fam.length && ids.length < MAX)
        ? '<span class="cmp-fl">In the family:</span>' + fam.map(function (x) { return '<button type="button" class="cmp-chip" data-add="' + esc(x) + '">+ ' + esc(by[x].name) + "</button>"; }).join("")
        : "";
      $("cmp-q").disabled = ids.length >= MAX;
      $("cmp-q").placeholder = ids.length >= MAX ? "Remove a car to add another" : "Search the Index…";
      $("cmp-note").innerHTML = cars.length
        ? "Figures are the ones on each car's page, for the version named there. Power to weight is horsepower per metric ton (1,000 kg). Maker's claims and road tests are marked under each 0&ndash;60 time, so read close calls with that in mind."
        : "";
      save();
    }

    // families in the Index, for the empty page
    function starters() {
      var seen = {}, out = [];
      ALL.forEach(function (c) {
        if (seen[c.id] || !(c.next && c.next.id && by[c.next.id])) return;
        if (c.prev && c.prev.id && by[c.prev.id]) return;   // start at the oldest car with a page
        var line = [c.id], x = c;
        while (x.next && x.next.id && by[x.next.id] && line.indexOf(x.next.id) < 0 && line.length < MAX) { x = by[x.next.id]; line.push(x.id); }
        line.forEach(function (i) { seen[i] = 1; });
        out.push(line);
      });
      ALL.forEach(function (c) {
        (c.alongside || []).forEach(function (a) {
          if (a.id && by[a.id] && !out.some(function (l) { return l.indexOf(c.id) >= 0 && l.indexOf(a.id) >= 0; })) out.push([c.id, a.id]);
        });
      });
      return '<div class="cmp-starts">' + out.map(function (line) {
        return '<a href="?ids=' + line.join(",") + '">' + line.map(function (i) { return esc(by[i].name); }).join(" <span>vs</span> ") + "</a>";
      }).join("") + "</div>";
    }

    function add(id) { if (by[id] && ids.indexOf(id) < 0 && ids.length < MAX) { ids.push(id); render(); } }
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rm],[data-add]");
      if (b) { if (b.dataset.rm) ids = ids.filter(function (x) { return x !== b.dataset.rm; }); else add(b.dataset.add); render(); return; }
      var a = e.target.closest(".cmp-starts a");
      if (a) { e.preventDefault(); ids = a.getAttribute("href").replace("?ids=", "").split(",").filter(function (x) { return by[x]; }); render(); window.scrollTo(0, 0); }
      if (!e.target.closest(".cmp-field")) $("cmp-sug").hidden = true;
    });

    // search to add a car
    var q = $("cmp-q"), sug = $("cmp-sug");
    function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
    function suggest() {
      var w = norm(q.value).split(" ").filter(Boolean);
      if (!w.length) { sug.hidden = true; q.setAttribute("aria-expanded", "false"); return; }
      var hits = ALL.filter(function (c) {
        if (ids.indexOf(c.id) >= 0) return false;
        var hay = norm([c.name, c.make, (c.aka || []).join(" "), c.years, c.body, c.engine].join(" "));
        return w.every(function (x) { return hay.indexOf(x) >= 0; });
      }).slice(0, 8);
      sug.innerHTML = hits.length ? hits.map(function (c) {
        return '<button type="button" role="option" data-add="' + esc(c.id) + '">' + esc(c.name) + "<small>" + esc(c.years || "") + "</small></button>";
      }).join("") : '<div class="none">No car in the Index matches that yet.</div>';
      sug.hidden = false; q.setAttribute("aria-expanded", "true");
    }
    q.addEventListener("input", suggest);
    q.addEventListener("focus", suggest);
    q.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); var f = sug.querySelector("[data-add]"); if (f) { add(f.dataset.add); q.value = ""; sug.hidden = true; } }
      if (e.key === "ArrowDown") { var g = sug.querySelector("button"); if (g) { e.preventDefault(); g.focus(); } }
      if (e.key === "Escape") sug.hidden = true;
    });
    sug.addEventListener("click", function () { q.value = ""; sug.hidden = true; });
    sug.addEventListener("keydown", function (e) {
      var items = [].slice.call(sug.querySelectorAll("button")), i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); if (i <= 0) q.focus(); else items[i - 1].focus(); }
      if (e.key === "Escape") { sug.hidden = true; q.focus(); }
    });

    render();
    I.loadScores().then(function (s) { if (s) { scores = s; render(); } });
  };

  /* ---------- "Find one for sale": plain links to the marketplaces ----------
     Built here so all the car pages get it without a rebuild. The links
     themselves live in /assets/js/cv-markets.js, shared with the homepage. */
  I.forSale = function () {
    if (document.getElementById("for-sale")) return;
    var h1 = document.querySelector(".htitle");
    var after = document.getElementById("verdict");
    if (!h1 || !after || !after.parentNode) return;
    // The page title shows the generation in <em> ("Mazda RX-7 <em>FD</em>"): search without it, show it in the heading.
    var gen = h1.querySelector("em"), bare = h1.cloneNode(true);
    [].forEach.call(bare.querySelectorAll("em"), function (e) { e.remove(); });
    var q = bare.textContent.replace(/\s+/g, " ").trim(), name = q + (gen ? " (" + gen.textContent.trim() + ")" : "");
    var mk = document.querySelector('.crumb a[href^="/cars/?make="]');
    var make = mk ? mk.textContent.trim() : "";
    var sec = document.createElement("section");
    sec.className = "forsale"; sec.id = "for-sale"; sec.setAttribute("aria-labelledby", "fs-title");
    sec.innerHTML = '<div class="wrap"><div class="kick">Find one for sale</div>' +
      '<h2 class="h2" id="fs-title">' + I.esc(name) + ' for sale</h2>' +
      '<p class="fs-sub">Where to look right now, from auctions to dealers, and what they have sold for.</p>' +
      '<div class="mkts" id="fs-links"></div></div>';
    function fill() {
      if (!window.CVMarkets) { sec.remove(); return; }
      sec.querySelector("#fs-links").innerHTML = window.CVMarkets.html(q, make);
      after.parentNode.insertBefore(sec, after.nextSibling);
      var mp = document.querySelector(".hinfo .maker");
      if (mp && !mp.querySelector('a[href="#for-sale"]')) mp.insertAdjacentHTML("beforeend", ' &middot; <a href="#for-sale">Find one for sale</a>');
    }
    if (window.CVMarkets) { fill(); return; }
    var sc = document.createElement("script");
    sc.src = "/assets/js/cv-markets.js";
    sc.onload = fill;
    document.head.appendChild(sc);
  };

  /* A story scheduled for a later date stays off the car pages until that day,
     the same rule as the rest of the site. */
  I.todayISO = function () {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  };
  /* For "newest stories" order: the date of the car's newest story that's already out, with its
     own stories ranked ahead of stories about the rest of its family. Compare as plain text. */
  I.newestOut = function (c, today) {
    var pick = function (l) { for (var i = 0; i < (l || []).length; i++) if (l[i] <= today) return l[i]; return ""; };
    return pick(c.ownDates) + "|" + pick(c.dates);
  };
  I.hideScheduled = function () {
    var today = I.todayISO();
    [].forEach.call(document.querySelectorAll(".from [data-date]"), function (el) {
      if (el.getAttribute("data-date") > today) el.hidden = true;
    });
    var also = document.querySelector(".from .also");
    if (also && !also.querySelector("a:not([hidden])")) also.hidden = true;
    var sec = document.querySelector("section.from");
    if (sec && !sec.querySelector(".acard:not([hidden])")) sec.hidden = true;
  };

  I.carPage = function (carId) {
    I.hideScheduled();
    I.forSale();
    var hs = document.getElementById("hscore");
    var vsum = document.getElementById("vsum");
    var vbox = document.getElementById("vbox");
    var rbox = document.getElementById("reviews");
    var session = null, data = null, pick = 0, busy = false;
    if (/[?&]thanks=1/.test(location.search)) {
      var fx = document.getElementById("fix");
      if (fx) fx.innerHTML = "<h3>Thank you</h3><p>We've got your note and we'll check it against the sources. If you left an email, we'll let you know what we find.</p>";
    }

    function heroScore() {
      if (!data) return;
      var n = data.n || 0;
      var big = hs.querySelector(".big"), meta = hs.querySelector(".meta");
      if (!n) {
        big.innerHTML = I.WHEEL + "&mdash;";
        meta.innerHTML = "<b>Community score</b>Not rated yet. Be the first.";
        return;
      }
      big.innerHTML = I.WHEEL + I.one(data.avg) + "<small>/10</small>";
      meta.innerHTML = "<b>Community score</b>" + I.num(n) + (n === 1 ? " rating" : " ratings") +
        (n < I.PROVISIONAL ? '<br><span class="prov" title="Fewer than ' + I.PROVISIONAL + ' ratings so far">Provisional</span>' : "");
    }

    function summary() {
      var n = data.n || 0, dist = data.dist || [];
      var max = Math.max.apply(null, dist.concat([1]));
      var h = '<div class="vsum"><b>' + (n ? I.one(data.avg) : "&mdash;") + '</b><span>' +
        (n ? "out of 10 from " + I.num(n) + (n === 1 ? " rating" : " ratings") : "No ratings yet") + "</span></div>";
      h += '<div class="dist" role="img" aria-label="How the ratings spread from 1 to 10">';
      for (var s = 10; s >= 1; s--) {
        var c = dist[s - 1] || 0;
        h += '<div class="drow"><span class="n">' + s + '</span><span class="t"><span class="f" style="width:' + (c ? Math.max(3, Math.round((c / max) * 100)) : 0) + '%"></span></span>' +
          '<span class="c">' + (n ? Math.round((c / n) * 100) + "%" : "") + "</span></div>";
      }
      vsum.innerHTML = h + "</div>";
    }

    function pickerHTML() {
      var h = '<div class="picker" role="radiogroup" aria-label="Your score, 1 to 10 steering wheels">';
      for (var i = 1; i <= 10; i++) h += '<button type="button" role="radio" aria-checked="false" aria-label="' + i + " out of 10: " + I.WORDS[i] + '" data-s="' + i + '">' + I.WHEEL + "</button>";
      return h + '</div><div class="plabel" aria-live="polite"></div>';
    }
    function paint(upTo, sel) {
      vbox.querySelectorAll(".picker button").forEach(function (b) {
        var s = +b.dataset.s;
        b.classList.toggle("lit", s <= upTo);
        b.classList.toggle("sel", s === sel);
        b.setAttribute("aria-checked", String(s === sel));
      });
      var lab = vbox.querySelector(".plabel"), show = upTo || sel;
      lab.innerHTML = show ? "<b>" + show + "/10</b>" + esc(I.WORDS[show]) : "Pick a score from 1 to 10.";
    }

    function form() {
      var mine = data && data.mine;
      if (mine && !pick) pick = mine.score;
      var name = (mine && mine.name) || I.store.get("cvi-name", "");
      vbox.innerHTML =
        "<h3>" + (mine ? "Your verdict" : "What's your verdict?") + "</h3>" +
        '<p class="sub">' + (mine ? "You can change your score or your words any time." :
          "One score out of 10 steering wheels. Weigh it however you like: the drive, the looks, the sound, the memories.") + "</p>" +
        pickerHTML() +
        '<div class="field"><label for="vr-text">Say why (optional)</label><textarea id="vr-text" maxlength="1200" placeholder="What makes it, or what spoils it?"></textarea>' +
          '<span class="hint"><span id="vr-left">1,200</span> characters left. Reviews are shown with the name below.</span></div>' +
        '<div class="field"><label for="vr-name">Name to show (optional)</label><input id="vr-name" maxlength="40" autocomplete="nickname" placeholder="A Carveyance reader"></div>' +
        '<button type="button" class="btn hot" id="vr-save" style="width:100%">' + (mine ? "Update my rating" : "Save my rating") + "</button>" +
        '<div class="msg" role="alert" hidden></div>' +
        '<p class="who" id="vr-who"></p>';
      var ta = vbox.querySelector("#vr-text"), nm = vbox.querySelector("#vr-name");
      ta.value = (mine && mine.review) || "";
      nm.value = name;
      function left() { vbox.querySelector("#vr-left").textContent = I.num(1200 - ta.value.length); }
      ta.addEventListener("input", left); left();
      var pk = vbox.querySelector(".picker");
      pk.addEventListener("mouseover", function (e) { var b = e.target.closest("button"); if (b) paint(+b.dataset.s, pick); });
      pk.addEventListener("mouseleave", function () { paint(pick, pick); });
      pk.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; pick = +b.dataset.s; paint(pick, pick); });
      pk.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault(); pick = Math.min(10, Math.max(1, (pick || 0) + (e.key === "ArrowRight" ? 1 : -1))); paint(pick, pick);
        pk.querySelector('[data-s="' + pick + '"]').focus();
      });
      paint(pick, pick);
      vbox.querySelector("#vr-save").addEventListener("click", save);
      who();
    }
    function say(text, kind) { var m = vbox.querySelector(".msg"); if (!m) return; m.hidden = !text; m.className = "msg " + (kind || "err"); m.textContent = text || ""; }

    function who() {
      var w = vbox.querySelector("#vr-who"); if (!w) return;
      if (!session) { w.innerHTML = "You'll be asked to sign in or create a free account. It's the same account as the Carveyance Garage. Your email is never shown."; return; }
      var em = (session.user && session.user.email) || "your account";
      w.innerHTML = "Signed in as " + esc(em) + ' &middot; <button type="button" class="linkbtn" id="vr-out">Sign out</button>' +
        (data && data.mine ? ' &middot; <button type="button" class="linkbtn" id="vr-del">Remove my rating</button>' : "");
      var o = w.querySelector("#vr-out");
      if (o) o.addEventListener("click", function () { db.auth.signOut().then(function () { session = null; pick = 0; load(); }); });
      var d = w.querySelector("#vr-del");
      if (d) d.addEventListener("click", function () {
        if (!confirm("Remove your rating and review for this car?")) return;
        db.rpc("unrate_car", { p_car: carId }).then(function () { pick = 0; toast("Your rating was removed."); load(); });
      });
    }

    function signIn(then) {
      var sh = G.sheet('<h2>Sign in to rate</h2><p class="lead">One free account covers the Car Index and the Carveyance Garage. ' +
        "Your email stays private: only the name you choose is shown.</p><div id=\"auth-box\"></div>", "Sign in to rate");
      G.authForm(sh.el.querySelector("#auth-box"), function (s) { session = s; sh.close(); then(); }, { mode: "new" });
    }

    function save() {
      if (busy) return;
      if (!pick) { say("Pick a score first: tap a steering wheel."); return; }
      if (!session) { signIn(save); return; }
      var text = vbox.querySelector("#vr-text").value, name = vbox.querySelector("#vr-name").value.trim();
      I.store.set("cvi-name", name);
      busy = true; vbox.querySelector("#vr-save").disabled = true; say("");
      db.rpc("rate_car", { p_car: carId, p_score: pick, p_review: text, p_name: name }).then(function (r) {
        busy = false;
        var res = r.data || {};
        if (r.error || !res.ok) {
          vbox.querySelector("#vr-save").disabled = false;
          var e = (res && res.error) || "";
          if (e === "signed_out") { session = null; signIn(save); return; }
          say(e === "slow_down" ? "That's a lot of ratings in one hour. Take a breather and try again shortly." : "That didn't save. Check your connection and try again.");
          return;
        }
        toast("Saved. Thanks for rating.");
        load();
      }, function () { busy = false; vbox.querySelector("#vr-save").disabled = false; say("That didn't save. Check your connection and try again."); });
    }

    function reviews() {
      var list = data.reviews || [];
      var wrap = document.getElementById("reviews-wrap"); if (wrap) wrap.hidden = false;
      if (!list.length) {
        rbox.innerHTML = '<p class="closed">No written reviews yet. A score is all it takes, but a few words are always welcome.</p>';
        return;
      }
      rbox.innerHTML = '<div class="rlist">' + list.map(function (r) {
        return '<article class="rv"><div class="top"><span class="sc">' + I.WHEEL + r.score + "/10</span>" +
          '<span class="nm">' + esc(r.name || "A Carveyance reader") + '</span><span class="dt">' + esc(fmtDate(r.at)) + "</span></div>" +
          "<p>" + esc(r.review) + '</p><button type="button" class="rep" data-id="' + r.id + '">Report</button></article>';
      }).join("") + "</div>";
    }
    rbox.addEventListener("click", function (e) {
      var b = e.target.closest(".rep"); if (!b) return;
      var reasons = ["Spam or advertising", "Abusive or hateful", "Not about this car", "Something else"];
      var sh = G.sheet("<h2>Report this review</h2><p class=\"lead\">Carveyance reads every report. What's wrong with it?</p>" +
        reasons.map(function (x) { return '<p style="margin:8px 0"><button type="button" class="btn line" style="width:100%" data-r="' + esc(x) + '">' + esc(x) + "</button></p>"; }).join(""),
        "Report this review");
      sh.el.addEventListener("click", function (ev) {
        var rb = ev.target.closest("[data-r]"); if (!rb) return;
        db.rpc("report_review", { p_rating: +b.dataset.id, p_reason: rb.dataset.r }).then(function () { sh.close(); toast("Thanks. We'll take a look."); });
      });
    });

    function closed(text) {
      hs.querySelector(".big").innerHTML = I.WHEEL + "&mdash;";
      hs.querySelector(".meta").innerHTML = "<b>Community score</b>Ratings open soon";
      vsum.innerHTML = '<p class="closed">' + text + "</p>";
      vbox.innerHTML = "<h3>What's your verdict?</h3><p class=\"sub\">Scores from 1 to 10 steering wheels open here very soon.</p>";
      rbox.innerHTML = "";
    }

    function load() {
      return db.rpc("index_car", { p_car: carId }).then(function (r) {
        if (r.error) { closed("The community score for this car opens very soon."); return; }
        data = r.data || {};
        heroScore(); summary(); form(); reviews();
      }, function () { closed("The community score couldn't load. Check your connection and refresh."); });
    }

    if (!db) { closed("The community score for this car opens very soon."); return; }
    db.auth.getSession().then(function (r) { session = (r.data && r.data.session) || null; load(); }, function () { load(); });
    db.auth.onAuthStateChange(function (ev, s) {
      var had = !!session; session = s || null;
      if (had !== !!session && data) load();
    });
  };
})();
