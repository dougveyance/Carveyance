/* ============================================================
   CARVEYANCE: "See it for sale" marketplace links
   Used by the homepage search, every Car Index page, Snap a Car
   and the FitDrive buyer's guides.

   These are plain links: they open each site's own search (or its
   listings page) in a new tab. No tracking, no commission.

   TWO LISTS, BY THE CAR'S AGE
   - Everyday: cars under 25 years old get the sites where most of
     them are sold (Autotrader, Cars.com, CarGurus, CarMax, eBay
     Motors), the 2 enthusiast auctions and 2 price guides.
   - Collector: cars 25 years or older, and younger cars marked
     "collector", get the auctions, classic classifieds and
     collector price guides.
   The age comes from the first model year passed in (a Car Index
   generation's start year, Snap's year, or a year typed in a
   search). With no year, the collector list is used, as before.

   When a partner program approves Carveyance, change that site's
   link here and set paid: true. A "We may earn a commission" note
   then appears automatically under the buttons.

   window.CVMarkets.html(query, make, opts) -> the grouped buttons
     opts (all optional): year     first model year, e.g. 2010
                          list     "collector" or "everyday" to override the age rule
                          model    the model as the price sites spell it, e.g. "corvette"
                          cargurus CarGurus model code, e.g. "d290" (no code, no CarGurus button)
   window.CVMarkets.list(query, opts)    -> "everyday" or "collector"
   window.CVMarkets.makeFrom(text, makes) -> finds a make in a search
   ============================================================ */
(function () {
  "use strict";

  function enc(s) { return encodeURIComponent(s); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // "Citroën" -> "citroen", "Mercedes-Benz" -> "mercedes-benz", "Rolls-Royce" -> "rolls-royce"
  function slug(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  /* Each link: n = name, k = what it is, u(q, make) = where it goes.
     how(q, make) says what the button opens, shown on hover and read aloud. */
  var SEARCH = function (q) { return "Search " + this.n + " for " + q; };
  var BROWSE = function () { return "Open " + this.n; };
  var BYMAKE = function (q, m) { return m ? "All " + m + " on " + this.n : "Open " + this.n; };

  /* The collector list: classics, and younger cars marked "collector". */
  var GROUPS = [
    { title: "Auctions", items: [
      { n: "Bring a Trailer", k: "Online auctions", how: SEARCH,
        u: function (q) { return "https://bringatrailer.com/search/?s=" + enc(q).replace(/%20/g, "+"); } },
      { n: "Cars & Bids", k: "Modern enthusiast", how: SEARCH,
        u: function (q) { return "https://carsandbids.com/search?q=" + enc(q); } },
      { n: "PCARMARKET", k: "Porsche and more", how: SEARCH,
        u: function (q) { return "https://www.pcarmarket.com/search/?q=" + enc(q); } },
      { n: "Hagerty Marketplace", k: "Auctions + classifieds", how: BROWSE,
        u: function () { return "https://www.hagerty.com/marketplace"; } },
      { n: "AutoHunter", k: "Online auctions", how: BROWSE,
        u: function () { return "https://www.autohunter.com/"; } },
      { n: "Mecum", k: "Live auctions", how: BROWSE,
        u: function () { return "https://www.mecum.com/"; } },
      { n: "Barrett-Jackson", k: "Live auctions", how: BROWSE,
        u: function () { return "https://www.barrett-jackson.com/"; } }
    ] },
    { title: "Classifieds and dealers", items: [
      { n: "Autotrader", k: "Dealers + private", how: SEARCH,
        u: function (q) { return "https://www.autotrader.com/cars-for-sale/all-cars?keywordPhrases=" + enc(q); } },
      { n: "Cars.com", k: "Dealers", how: SEARCH,
        u: function (q) { return "https://www.cars.com/shopping/results/?keyword=" + enc(q) + "&stock_type=all&maximum_distance=all"; } },
      { n: "Hemmings", k: "Classics", how: SEARCH,
        u: function (q) { return "https://www.hemmings.com/classifieds/cars-for-sale?q=" + enc(q); } },
      { n: "ClassicCars.com", k: "Classics", how: BYMAKE,
        u: function (q, m) { return m ? "https://classiccars.com/listings/find/all-years/" + slug(m) : "https://classiccars.com/listings"; } },
      { n: "eBay Motors", k: "Everything", how: SEARCH,
        u: function (q) { return "https://www.ebay.com/sch/6001/i.html?_nkw=" + enc(q); } },
      { n: "Marshall Goldman", k: "Exotic dealer", how: BROWSE,
        u: function () { return "https://www.marshallgoldman.com/inventory/"; } }
    ] },
    { title: "Prices and past sales", items: [
      { n: "CLASSIC.COM", k: "Market values", how: BYMAKE,
        u: function (q, m) { return m ? "https://www.classic.com/m/" + slug(m) + "/" : "https://www.classic.com/"; } },
      { n: "Hagerty Valuation", k: "Price guide", how: BYMAKE,
        u: function (q, m) { return m ? "https://www.hagerty.com/valuation-tools/" + slug(m) : "https://www.hagerty.com/valuation-tools"; } },
      { n: "Hammer Price", k: "Auction results app", how: BROWSE,
        u: function () { return "https://hammerpricelive.com/"; } }
    ] }
  ];

  /* ---------- the everyday list ---------- */
  var AGE = 25; // years: at this age a car moves to the collector list

  // "Toyota 4Runner" with make "Toyota" -> "4runner"; "2022 Toyota 4Runner" -> "4runner"
  function modelSlug(q, make, opts) {
    if (opts.model) return slug(opts.model);
    var t = String(q || "").replace(/\(.*?\)/g, " ").replace(/\b(19|20)\d{2}\b/g, " ").replace(/\s+/g, " ").trim();
    if (make && t.toLowerCase().indexOf(String(make).toLowerCase() + " ") === 0) t = t.slice(String(make).length + 1);
    else if (make) return "";
    return slug(t);
  }
  function everyday(q, make, opts) {
    var mk = slug(make), md = modelSlug(q, make, opts);
    var label = String(q || "").replace(/\b(19|20)\d{2}\b/g, " ").replace(/\s+/g, " ").trim() || q;
    var PAGE = function () { return (mk && md ? "Open the " + label + " on " : mk ? "Open " + make + " on " : "Open ") + this.n; };
    var shop = [
      { n: "Autotrader", k: "Dealers + private", how: SEARCH,
        u: function (q) { return "https://www.autotrader.com/cars-for-sale/all-cars?keywordPhrases=" + enc(q); } },
      { n: "Cars.com", k: "Dealers", how: SEARCH,
        u: function (q) { return "https://www.cars.com/shopping/results/?keyword=" + enc(q) + "&stock_type=all&maximum_distance=all"; } }
    ];
    if (opts.cargurus && /^d\d+$/.test(opts.cargurus)) shop.push(
      { n: "CarGurus", k: "Deal ratings", how: function () { return "All " + label + " listings on " + this.n; },
        u: function () { return "https://www.cargurus.com/Cars/l-Used-" + enc(label.replace(/\s+/g, "-")) + "-" + opts.cargurus; } });
    shop.push(
      { n: "CarMax", k: "No-haggle", how: PAGE,
        u: function () { return "https://www.carmax.com/cars" + (mk ? "/" + mk + (md ? "/" + md : "") : ""); } },
      { n: "eBay Motors", k: "Everything", how: SEARCH,
        u: function (q) { return "https://www.ebay.com/sch/6001/i.html?_nkw=" + enc(q); } });
    var bid = [GROUPS[0].items[0], GROUPS[0].items[1]];
    if (/^porsche$/i.test(make || "")) bid.push(GROUPS[0].items[2]); // PCARMARKET
    var price = [
      { n: "Kelley Blue Book", k: "Price guide", how: PAGE,
        u: function () { return "https://www.kbb.com/" + (mk ? mk + "/" + (md ? md + "/" : "") : ""); } },
      { n: "Edmunds", k: "Price guide", how: PAGE,
        u: function () { return "https://www.edmunds.com/" + (mk ? mk + "/" + (md ? md + "/" : "") : ""); } }
    ];
    return [
      { title: "Dealers and private sellers", items: shop },
      { title: "Enthusiast auctions", items: bid },
      { title: "Check the price", items: price }
    ];
  }

  function opt(o) { return typeof o === "number" ? { year: o } : (o || {}); }
  // Which list a car gets: "everyday" (under 25 years old) or "collector".
  function list(q, o) {
    o = opt(o);
    if (o.list === "collector" || o.list === "everyday") return o.list;
    var now = new Date().getFullYear(), y = parseInt(o.year, 10);
    if (!(y > 1880 && y <= now + 2)) { var m = String(q || "").match(/\b(19\d{2}|20\d{2})\b/); y = m ? +m[1] : 0; }
    if (!(y > 1880 && y <= now + 2)) return "collector";
    return now - y >= AGE ? "collector" : "everyday";
  }

  function html(q, make, o) {
    q = String(q || "").trim(); o = opt(o);
    var kind = list(q, o), groups = kind === "everyday" ? everyday(q, make, o) : GROUPS;
    var paid = false;
    var out = groups.map(function (g) {
      return '<div class="mkg"><h4>' + esc(g.title) + '</h4><div class="grid">' + g.items.map(function (m) {
        if (m.paid) paid = true;
        var label = m.how(q, make);
        return '<a href="' + esc(m.u(q, make)) + '" target="_blank" rel="noopener' + (m.paid ? " sponsored" : " nofollow") +
          '" title="' + esc(label) + '" aria-label="' + esc(label) + ' (opens in a new tab)">' + esc(m.n) + "<span>" + esc(m.k) + "</span></a>";
      }).join("") + "</div></div>";
    }).join("");
    var note = kind === "everyday"
      ? "Each button opens that site in a new tab, on a search for &ldquo;" + esc(q) + "&rdquo; or its page for this model. "
      : "Each button opens that site in a new tab: a search for &ldquo;" + esc(q) + "&rdquo; where the site allows it, " +
        (make ? "its " + esc(make) + " listings, " : "") + "or its main listings page. ";
    note += paid ? "We may earn a commission from some of these links." : "Carveyance doesn't sell cars or earn anything from these links.";
    return out + '<p class="mknote">' + note + "</p>";
  }

  // Finds a make named in a search ("rx-7 mazda" -> "Mazda"), from a list of makes.
  function makeFrom(text, makes) {
    var t = " " + String(text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9-]+/g, " ") + " ";
    var hit = "";
    (makes || []).forEach(function (m) {
      var s = String(m).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      if (t.indexOf(" " + s + " ") >= 0 && s.length > hit.length) hit = m;
    });
    return hit;
  }

  window.CVMarkets = { html: html, list: list, makeFrom: makeFrom, groups: GROUPS, slug: slug };
})();
