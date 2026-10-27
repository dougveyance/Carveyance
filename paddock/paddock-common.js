/* ============================================================
   CARVEYANCE — THE PADDOCK: shared code
   Used by /paddock/ and every /paddock/<id>/ page.
   - CVP: small helpers (colors, distance, escaping)
   - CVPaddockClick(id, kind): counts a tap on a listing's website,
     Instagram, phone or directions, so Carveyance can tell a business
     how many people it sent them. One count per phone per listing per
     kind per day; nothing about the visitor is stored except a random
     id kept on their own phone. Needs /assets/js/cv-garage-config.js
     loaded first, and tools/garage/lot_and_paddock.sql run once.
   ============================================================ */
(function () {
  "use strict";
  var COLORS = {
    "Car Clubs": "#2E6E96", "Museums & Collections": "#6B5BA8", "Racetracks & Driving Schools": "#141820",
    "Detailing & Paint Protection": "#2B8A8A", "Performance & Tuning": "#C8462C", "Restoration & Fabrication": "#8A5A2B",
    "Tires & Wheels": "#4A4F57", "Specialty Dealers": "#2F7D5B", "Parts & Supplies": "#B7792A"
  };
  var STATES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
  var P = (window.CVP = {});
  P.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  P.color = function (cat) { return COLORS[cat] || "#2E6E96"; };
  P.where = function (x) {
    if (x.city) return x.city + (x.state ? ", " + x.state : "");
    if (x.region === "Southern California") return "Southern California";
    return STATES[x.state] || x.state || "";
  };
  P.miles = function (a, b, c, d) {
    var R = 3958.8, r = Math.PI / 180, dl = (c - a) * r, dn = (d - b) * r;
    var h = Math.sin(dl / 2) * Math.sin(dl / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dn / 2) * Math.sin(dn / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  };

  function device() {
    try {
      var id = JSON.parse(localStorage.getItem("cv-device") || "null");
      if (!id) {
        id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
              var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
            });
        localStorage.setItem("cv-device", JSON.stringify(id));
      }
      return id;
    } catch (e) { return null; }
  }
  window.CVPaddockClick = function (id, kind) {
    var cfg = window.CV_GARAGE || {};
    if (!cfg.supabaseUrl || !cfg.supabaseKey || !window.fetch) return;
    var dev = device(); if (!dev) return;
    try {
      fetch(String(cfg.supabaseUrl).replace(/\/$/, "") + "/rest/v1/rpc/record_paddock_click", {
        method: "POST", keepalive: true,
        headers: { "apikey": cfg.supabaseKey, "Content-Type": "application/json" },
        body: JSON.stringify({ p_listing: String(id).slice(0, 80), p_kind: String(kind || "site").slice(0, 10), p_device: dev })
      }).catch(function () {});
    } catch (e) {}
  };
})();
