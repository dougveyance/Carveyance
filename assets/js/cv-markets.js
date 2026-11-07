/* ============================================================
   CARVEYANCE: "See it for sale" marketplace links
   Used by the homepage search and every Car Index page.

   These are plain links: they open each site's own search (or its
   listings page) in a new tab. No tracking, no commission.

   When a partner program approves Carveyance, change that site's
   link here and set paid: true. A "We may earn a commission" note
   then appears automatically under the buttons.

   window.CVMarkets.html(query, make)  -> the grouped buttons
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

  function html(q, make) {
    q = String(q || "").trim();
    var paid = false;
    var out = GROUPS.map(function (g) {
      return '<div class="mkg"><h4>' + esc(g.title) + '</h4><div class="grid">' + g.items.map(function (m) {
        if (m.paid) paid = true;
        var label = m.how(q, make);
        return '<a href="' + esc(m.u(q, make)) + '" target="_blank" rel="noopener' + (m.paid ? " sponsored" : " nofollow") +
          '" title="' + esc(label) + '" aria-label="' + esc(label) + ' (opens in a new tab)">' + esc(m.n) + "<span>" + esc(m.k) + "</span></a>";
      }).join("") + "</div></div>";
    }).join("");
    var note = "Each button opens that site in a new tab: a search for &ldquo;" + esc(q) + "&rdquo; where the site allows it, " +
      (make ? "its " + esc(make) + " listings, " : "") + "or its main listings page. " +
      (paid ? "We may earn a commission from some of these links." : "Carveyance doesn't sell cars or earn anything from these links.");
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

  window.CVMarkets = { html: html, makeFrom: makeFrom, groups: GROUPS, slug: slug };
})();
