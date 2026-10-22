/* Carveyance Events — shared helpers for /events/ and every /events/<id>/ page.
   Next-date math for recurring meets, Add to calendar (.ics + Google),
   saved favorites (this browser only), distance, and the install prompt. */
(function (w) {
  var M3 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var WDF = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var BYDAY = ["SU","MO","TU","WE","TH","FR","SA"];
  var SITE = "https://carveyance.com";

  function d(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var n0 = new Date(), today = new Date(n0.getFullYear(), n0.getMonth(), n0.getDate());
  function addDays(x, n) { var y = new Date(x); y.setDate(y.getDate() + n); return y; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(x) { return x.getFullYear() + pad(x.getMonth() + 1) + pad(x.getDate()); }

  // nth weekday of a month (n = 1..4, or -1 for the last)
  function nthWeekday(y, m, wd, n) {
    if (n > 0) { var f = new Date(y, m, 1), day = 1 + ((wd - f.getDay() + 7) % 7) + (n - 1) * 7, x = new Date(y, m, day); return x.getMonth() === m ? x : null; }
    var l = new Date(y, m + 1, 0); return new Date(y, m, l.getDate() - ((l.getDay() - wd + 7) % 7));
  }
  // what the schedule text means: {wd, kind:'weekly'|'monthly', ords:[1,3]|[-1], season:[startMonth,endMonth]|null}
  // or null (irregular: "Every other Sunday", "About 4 Saturdays a year", ...)
  var MF = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function season(s) {
    var re = new RegExp("(" + MF.join("|") + ")\\s*(?:–|—|-|through|to)\\s*(" + MF.join("|") + ")", "i"), m = s.match(re);
    if (!m) return null;
    var a = MF.map(function (x) { return x.toLowerCase(); });
    return [a.indexOf(m[1].toLowerCase()), a.indexOf(m[2].toLowerCase())];
  }
  function inSeason(x, se) {
    if (!se) return true; var mo = x.getMonth();
    return se[0] <= se[1] ? (mo >= se[0] && mo <= se[1]) : (mo >= se[0] || mo <= se[1]);
  }
  function rule(m) {
    var s = String(m.schedule || ""), wd = -1;
    for (var i = 0; i < 7; i++) { if (s.indexOf(WDF[i]) > -1) { wd = i; break; } }
    if (wd < 0) return null;
    var se = season(s);
    if (!se && /summer|spring|fall|autumn|winter|season|select|some /i.test(s)) return null;   // vague season: show the text, guess no dates
    if (new RegExp("^Every " + WDF[wd] + "\\b").test(s)) return { wd: wd, kind: "weekly", season: se };
    if (!/of the month/i.test(s)) return null;
    var map = { "1st": 1, "2nd": 2, "3rd": 3, "4th": 4, "last": -1 };
    var ords = (s.match(/1st|2nd|3rd|4th|Last/gi) || []).map(function (o) { return map[o.toLowerCase()]; });
    return ords.length ? { wd: wd, kind: "monthly", ords: ords, season: se } : null;
  }
  function nextOccur(m, from) {
    var r = rule(m), base = from || today; if (!r) return null;
    if (r.kind === "weekly") {
      var x = addDays(base, (r.wd - base.getDay() + 7) % 7);
      for (var w = 0; w < 54; w++) { if (inSeason(x, r.season)) return x; x = addDays(x, 7); }
      return null;
    }
    for (var k = 0; k < 14; k++) {
      var b = new Date(base.getFullYear(), base.getMonth() + k, 1), c = [];
      if (!inSeason(b, r.season)) continue;
      r.ords.forEach(function (o) { var x = nthWeekday(b.getFullYear(), b.getMonth(), r.wd, o); if (x && x >= base) c.push(x); });
      if (c.length) { c.sort(function (a, b2) { return a - b2; }); return c[0]; }
    }
    return null;
  }
  function rrule(m) {
    var r = rule(m); if (!r) return "";
    var bm = "";
    if (r.season) { var l = [], i = r.season[0]; for (var g = 0; g < 12; g++) { l.push(i + 1); if (i === r.season[1]) break; i = (i + 1) % 12; } bm = ";BYMONTH=" + l.join(","); }
    if (r.kind === "weekly") return "RRULE:FREQ=WEEKLY;BYDAY=" + BYDAY[r.wd] + bm;
    return "RRULE:FREQ=MONTHLY;BYDAY=" + r.ords.map(function (o) { return o + BYDAY[r.wd]; }).join(",") + bm;
  }

  // "7am–10am", "7:30am–10am", "6–9pm", "9am–12pm (gates 7:30am)" -> {sh,sm,eh,em}; null if no time
  function parseTimes(t) {
    t = String(t || "").toLowerCase();
    var re = /(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?\s*[–—-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)/, m = t.match(re);
    function h24(h, ap) { h = +h; ap = (ap || "").charAt(0); if (ap === "p" && h < 12) h += 12; if (ap === "a" && h === 12) h = 0; return h; }
    if (m) {
      var ap2 = m[6], ap1 = m[3] || ap2;
      var sh = h24(m[1], ap1), eh = h24(m[4], ap2);
      if (!m[3] && sh > eh) sh = h24(m[1], ap2 === "pm" || ap2 === "p.m." ? "am" : "pm");
      return { sh: sh, sm: +(m[2] || 0), eh: eh, em: +(m[5] || 0) };
    }
    var one = t.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)/);
    if (one) { var h = h24(one[1], one[3]); return { sh: h, sm: +(one[2] || 0), eh: Math.min(h + 2, 23), em: +(one[2] || 0) }; }
    return null;
  }
  function stamp(x, h, mi) { return ymd(x) + "T" + pad(h) + pad(mi) + "00"; }

  // calendar span for an entry: {allDay, start, end, rrule}
  function calSpan(x, kind) {
    var tm = parseTimes(x.time), first, last, rr = "";
    if (kind === "meet") { first = nextOccur(x); if (!first) return null; last = first; rr = rrule(x); }
    else { first = d(x.start); last = d(x.end || x.start); if (first < today) first = today; }
    if (tm && first.getTime() === last.getTime()) {
      var endDay = tm.eh < tm.sh ? addDays(first, 1) : first;
      return { allDay: false, start: stamp(first, tm.sh, tm.sm), end: stamp(endDay, tm.eh, tm.em), rrule: rr };
    }
    return { allDay: true, start: ymd(first), end: ymd(addDays(last, 1)), rrule: rr };
  }
  function pageUrl(x) { return SITE + "/events/" + x.id + "/"; }
  function where(x) { return [x.venue, x.address, [x.city, x.state].filter(Boolean).join(", ")].filter(Boolean).join(", "); }
  function icsEsc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function fold(line) { var out = [], s = line; while (s.length > 74) { out.push(s.slice(0, 74)); s = " " + s.slice(74); } out.push(s); return out.join("\r\n"); }

  function ics(x, kind) {
    var c = calSpan(x, kind); if (!c) return "";
    var now = new Date(), dtstamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + "T" + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + "00Z";
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Carveyance//Events//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:" + x.id + "@carveyance.com", "DTSTAMP:" + dtstamp,
      c.allDay ? "DTSTART;VALUE=DATE:" + c.start : "DTSTART:" + c.start,
      c.allDay ? "DTEND;VALUE=DATE:" + c.end : "DTEND:" + c.end];
    if (c.rrule) L.push(c.rrule);
    L.push("SUMMARY:" + icsEsc(x.name), "LOCATION:" + icsEsc(where(x)),
      "DESCRIPTION:" + icsEsc((x.blurb ? x.blurb + "\n\n" : "") + "Check the organizer's page before you go: " + (x.url || pageUrl(x)) + "\nOn Carveyance: " + pageUrl(x)),
      "URL:" + pageUrl(x), "END:VEVENT", "END:VCALENDAR");
    return L.map(fold).join("\r\n") + "\r\n";
  }
  function google(x, kind) {
    var c = calSpan(x, kind); if (!c) return "";
    var q = "action=TEMPLATE&text=" + encodeURIComponent(x.name) + "&dates=" + c.start + "/" + c.end +
      "&location=" + encodeURIComponent(where(x)) +
      "&details=" + encodeURIComponent((x.blurb ? x.blurb + "\n\n" : "") + "Check before you go: " + (x.url || pageUrl(x)) + "\nOn Carveyance: " + pageUrl(x));
    if (c.rrule) q += "&recur=" + encodeURIComponent(c.rrule);
    return "https://calendar.google.com/calendar/render?" + q;
  }
  function downloadIcs(x, kind) {
    var body = ics(x, kind); if (!body) return;
    var blob = new Blob([body], { type: "text/calendar;charset=utf-8" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = x.id + ".ics"; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  // saved favorites: this browser only
  var KEY = "cv-events-saved";
  function savedList() { try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  var saved = {
    all: savedList,
    has: function (id) { return savedList().indexOf(id) > -1; },
    toggle: function (id) {
      var l = savedList(), i = l.indexOf(id);
      if (i > -1) l.splice(i, 1); else l.push(id);
      try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {}
      return i === -1;
    }
  };

  function miles(a, b, c, e) {
    var R = 3958.8, r = Math.PI / 180, dl = (c - a) * r, dn = (e - b) * r;
    var h = Math.sin(dl / 2) * Math.sin(dl / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dn / 2) * Math.sin(dn / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  // installable: register the service worker and wire an Install button if the page has one
  function installSetup(btn) {
    if ("serviceWorker" in navigator) { try { navigator.serviceWorker.register("/events/sw.js", { scope: "/events/" }); } catch (e) {} }
    if (!btn) return;
    var standalone = (w.matchMedia && w.matchMedia("(display-mode: standalone)").matches) || w.navigator.standalone;
    if (standalone) return;
    var deferred = null, ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    w.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; btn.hidden = false; });
    if (ios) btn.hidden = false;
    btn.addEventListener("click", function () {
      if (deferred) { deferred.prompt(); deferred.userChoice.then(function () { deferred = null; btn.hidden = true; }); return; }
      var tip = document.getElementById("install-tip"); if (tip) tip.hidden = !tip.hidden;
    });
  }

  // phones and tablets: load the site's Menu button (the top-bar links hide on narrow screens)
  (function () {
    if (typeof document === "undefined" || w.__cvMenu || document.querySelector('script[src="/assets/js/cv-menu.js"]')) return;
    var sc = document.createElement("script"); sc.src = "/assets/js/cv-menu.js"; sc.defer = true;
    (document.head || document.documentElement).appendChild(sc);
  })();

  w.CVE = { d: d, today: today, addDays: addDays, M3: M3, WD: WD, WDF: WDF, nextOccur: nextOccur, rule: rule,
    parseTimes: parseTimes, ics: ics, google: google, downloadIcs: downloadIcs, saved: saved, miles: miles,
    pageUrl: pageUrl, installSetup: installSetup };
})(window);
