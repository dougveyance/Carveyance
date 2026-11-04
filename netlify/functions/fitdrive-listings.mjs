// FitDrive by Carveyance: real dealer listings for one catalog model near a ZIP code (32 models).
// The browser calls /.netlify/functions/fitdrive-listings?zip=60614&distance=50&model=corolla-h
// (or &nationwide=1 with no ZIP for cars anywhere in the country).
// This function adds the auto.dev key (from the AUTODEV_API_KEY environment variable in Netlify),
// asks auto.dev for listings, keeps only the ones that match the FitDrive model, and returns
// a short list. The key never reaches the browser. Results are cached for 12 hours per
// ZIP, distance and model, so repeat visits don't use up the monthly allowance.

const MODELS = {
  "corolla-h":   { make: "Toyota",    models: ["Corolla Hybrid"], need: /hybrid/i, first: 2020 },
  "civic":       { make: "Honda",     models: ["Civic"], avoid: /type r|hybrid/i, first: 2020 },
  "versa":       { make: "Nissan",    models: ["Versa"], first: 2020 },
  "rav4-h":      { make: "Toyota",    models: ["RAV4 Hybrid"], need: /hybrid/i, avoid: /prime|plug/i, first: 2020 },
  "crv-h":       { make: "Honda",     models: ["CR-V", "CR-V Hybrid"], need: /hybrid/i, first: 2020 },
  "cx5":         { make: "Mazda",     models: ["CX-5"], first: 2020 },
  "outback":     { make: "Subaru",    models: ["Outback"], first: 2020 },
  "sienna":      { make: "Toyota",    models: ["Sienna"], first: 2021 },
  "telluride":   { make: "Kia",       models: ["Telluride"], first: 2020 },
  "f150":        { make: "Ford",      models: ["F-150"], avoid: /lightning|electric|raptor/i, first: 2020 },
  "maverick-h":  { make: "Ford",      models: ["Maverick"], need: /hybrid/i, first: 2022 },
  "4runner":     { make: "Toyota",    models: ["4Runner"], first: 2020 },
  "tucson-phev": { make: "Hyundai",   models: ["Tucson", "Tucson Plug-In Hybrid", "Tucson Plug-in Hybrid"], need: /plug/i, first: 2022 },
  "model3":      { make: "Tesla",     models: ["Model 3"], first: 2020 },
  "ioniq5":      { make: "Hyundai",   models: ["Ioniq 5", "IONIQ 5"], avoid: /\bN\b/, first: 2022 },
  "equinox-ev":  { make: "Chevrolet", models: ["Equinox EV", "Equinox"], need: /electric|\bev\b/i, first: 2024 },
  "miata":       { make: "Mazda",     models: ["MX-5 Miata", "MX-5", "Miata"], first: 2020 },
  "bmw330i":     { make: "BMW",       models: ["3 Series", "330i"], need: /330/i, first: 2020 },
  "rx350h":      { make: "Lexus",     models: ["RX", "RX 350h"], need: /350h/i, first: 2023 },
  "lexus-es-h":  { make: "Lexus",     models: ["ES", "ES 300h"], need: /300h/i, first: 2019 },
  "bmw-x3":      { make: "BMW",       models: ["X3"], avoid: /\bx3 m\b|competition|30e|plug-in|phev/i, first: 2018 },
  "bmw-x5":      { make: "BMW",       models: ["X5"], avoid: /\bx5 m\b|competition|45e|50e|plug-in|phev/i, first: 2019 },
  "merc-c300":   { make: "Mercedes-Benz", models: ["C-Class", "C 300", "C300"], avoid: /amg|coupe|cabriolet|convertible|\bc ?43\b|\bc ?63\b|350e/i, first: 2018 },
  "merc-glc":    { make: "Mercedes-Benz", models: ["GLC", "GLC 300", "GLC-Class"], avoid: /amg|coupe|\b43\b|\b63\b|350e|plug-in|phev/i, first: 2018 },
  "merc-gle":    { make: "Mercedes-Benz", models: ["GLE", "GLE 350", "GLE-Class"], avoid: /amg|coupe|\b53\b|\b63\b|400e|450e|plug-in|phev/i, first: 2020 },
  "audi-q5":     { make: "Audi",      models: ["Q5"], avoid: /sportback|\bsq5\b|55 tfsi e|plug-in|phev/i, first: 2018 },
  "genesis-gv70":{ make: "Genesis",   models: ["GV70"], avoid: /electrified|electric/i, first: 2022 },
  "volvo-xc90":  { make: "Volvo",     models: ["XC90"], avoid: /recharge|\bt8\b|plug-in|phev/i, first: 2018 },
  "model-y":     { make: "Tesla",     models: ["Model Y"], first: 2020 },
  "porsche-macan":   { make: "Porsche", models: ["Macan"], avoid: /electric/i, first: 2018, last: 2025 },
  "porsche-cayenne": { make: "Porsche", models: ["Cayenne"], avoid: /e-hybrid|plug-in|coupe|turbo gt/i, first: 2019 },
  "porsche-911":     { make: "Porsche", models: ["911"], avoid: /gt3|gt2|turbo s|\brs\b|dakar|s\/t|sport classic/i, first: 2017 },
};

// NHTSA 5-Star Safety Ratings: the model names NHTSA uses for each FitDrive model, best match first.
const NHTSA = {
  "corolla-h": [/^COROLLA HYBRID$/], "civic": [/^CIVIC HATCHBACK$/, /^CIVIC$/], "versa": [/^VERSA$/, /^VERSA SEDAN$/],
  "rav4-h": [/^RAV4 HYBRID$/], "crv-h": [/^CR-V HYBRID$/, /^CR-V$/], "cx5": [/^CX-5$/], "outback": [/^OUTBACK$/],
  "sienna": [/^SIENNA HYBRID$/, /^SIENNA$/], "telluride": [/^TELLURIDE$/], "f150": [/^F-150.*SUPER ?CREW(?!.*(HEV|BEV|LIGHTNING|HYBRID))/],
  "maverick-h": [/^MAVERICK (HEV|HYBRID)$/, /^MAVERICK$/], "4runner": [/^4RUNNER$/], "tucson-phev": [/^TUCSON (PHEV|PLUG-IN HYBRID)$/],
  "model3": [/^MODEL 3/], "ioniq5": [/^IONIQ 5$/], "equinox-ev": [/^EQUINOX EV$/], "miata": [/^MX-5/],
  "bmw330i": [/^3 SERIES SEDAN$/, /^3 SERIES$/], "rx350h": [/^RX 350H$/], "lexus-es-h": [/^ES 300H$/],
  "bmw-x3": [/^X3$/], "bmw-x5": [/^X5$/], "merc-c300": [/^C-CLASS$/, /^C-CLASS SEDAN$/], "merc-glc": [/^GLC$/, /^GLC SUV$/],
  "merc-gle": [/^GLE$/, /^GLE SUV$/], "audi-q5": [/^Q5$/], "genesis-gv70": [/^GV70$/], "volvo-xc90": [/^XC90( B5| B6| T5| T6)?$/],
  "model-y": [/^MODEL Y/], "porsche-macan": [/^MACAN$/], "porsche-cayenne": [/^CAYENNE$/], "porsche-911": [/^911 CARRERA$/],
};
const NHTSA_BASE = "https://api.nhtsa.gov/SafetyRatings";
const stars = (v) => { const n = parseInt(v, 10); return n >= 1 && n <= 5 ? n : null; };
async function nhtsaJson(path) {
  const r = await fetch(NHTSA_BASE + path + (path.includes("?") ? "&" : "?") + "format=json");
  if (!r.ok) throw new Error("nhtsa " + r.status);
  const j = await r.json(); return Array.isArray(j.Results) ? j.Results : [];
}
// Crash test ratings for one model year: /.netlify/functions/fitdrive-listings?ratings=corolla-h&year=2024
async function ratings(id, year) {
  const spec = MODELS[id], pats = NHTSA[id];
  if (!spec || !pats || !/^\d{4}$/.test(year)) return json(400, { ok: false, error: "bad_request" });
  const long = { "Cache-Control": "public, max-age=86400", "Netlify-CDN-Cache-Control": "public, durable, max-age=2592000",
    "Netlify-Vary": "query=ratings|year", "Content-Type": "application/json; charset=utf-8" };
  try {
    const make = encodeURIComponent(spec.make.toLowerCase());
    const names = (await nhtsaJson(`/modelyear/${year}/make/${make}`)).map((x) => String(x.Model || ""));
    let pick = [];
    for (const re of pats) { pick = names.filter((n) => re.test(n.toUpperCase())); if (pick.length) break; }
    const variants = [];
    for (const name of pick.slice(0, 2)) {
      const ids = (await nhtsaJson(`/modelyear/${year}/make/${make}/model/${encodeURIComponent(name)}`)).slice(0, 4);
      for (const v of ids) {
        const d = (await nhtsaJson(`/VehicleId/${v.VehicleId}`))[0] || {};
        variants.push({ desc: d.VehicleDescription || v.VehicleDescription || "", overall: stars(d.OverallRating),
          front: stars(d.OverallFrontCrashRating), side: stars(d.OverallSideCrashRating), rollover: stars(d.RolloverRating),
          recalls: Number(d.RecallsCount) || 0, complaints: Number(d.ComplaintsCount) || 0, vehicleId: v.VehicleId });
      }
    }
    return new Response(JSON.stringify({ ok: true, id, year: +year, model: pick[0] || null, variants }), { status: 200, headers: long });
  } catch (e) {
    return json(502, { ok: false, error: "nhtsa_unavailable" });
  }
}

const json = (status, body, cache) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    ...(cache ? {
      "Cache-Control": "public, max-age=600",
      "Netlify-CDN-Cache-Control": "public, durable, max-age=43200, stale-while-revalidate=86400",
      "Netlify-Vary": "query=zip|distance|model|photos|nationwide",
    } : { "Cache-Control": "no-store" }),
  },
});

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

function pick(item, year) {
  const v = item.vehicle || {}, r = item.retailListing || {};
  const miles = num(r.miles ?? r.mileage ?? item.miles ?? item.mileage);
  const y = num(v.year);
  const used = r.used != null ? (r.used === true || r.used === "true") : !((miles ?? 0) < 300 && (y ?? 0) >= year - 1);
  const h = item.history && typeof item.history === "object" ? item.history : null;
  const dealer = typeof r.dealer === "string" ? r.dealer : (r.dealer && (r.dealer.name || r.dealer.dealerName)) || "";
  return {
    vin: item.vin || v.vin || "", year: y, make: v.make || "", model: v.model || "", trim: v.trim || "",
    drivetrain: v.drivetrain || "", fuel: v.fuel || "", engine: v.engine || "", series: v.series || "", color: v.exteriorColor || "",
    price: num(r.price) || 0, miles: miles ?? 0, used, cpo: r.cpo === true || r.cpo === "true",
    dealer, city: r.city || "", state: r.state || "", zip: r.zip || "",
    vdp: r.vdp || r.vdpUrl || "", photo: r.primaryImage || "", photoCount: num(r.photoCount) || 0,
    carfax: r.carfaxUrl || "", createdAt: item.createdAt || null,
    loc: Array.isArray(item.location) && item.location.length === 2 && num(item.location[0]) != null && num(item.location[1]) != null
      ? [num(item.location[1]), num(item.location[0])] : null,
    history: h ? { accidents: h.accidents === true, accidentCount: num(h.accidentCount), ownerCount: num(h.ownerCount),
      oneOwner: h.oneOwner === true, usage: h.usageType || "" } : null,
  };
}

// Photo gallery for one car: /.netlify/functions/fitdrive-listings?photos=VIN
async function photos(vin, key) {
  if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) return json(400, { ok: false, error: "bad_vin" });
  let res;
  try {
    res = await fetch("https://api.auto.dev/photos/" + encodeURIComponent(vin.toUpperCase()), {
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    });
  } catch (e) {
    return json(502, { ok: false, error: "upstream_unreachable" });
  }
  if (res.status === 404) return json(200, { ok: true, vin, photos: [] }, true);
  if (res.status === 429) return json(429, { ok: false, error: "rate_limited" });
  if (!res.ok) return json(502, { ok: false, error: "upstream_error", status: res.status });
  let body;
  try { body = await res.json(); } catch (e) { return json(502, { ok: false, error: "upstream_bad_json" }); }
  const list = body && body.data && Array.isArray(body.data.retail) ? body.data.retail : [];
  return json(200, { ok: true, vin, photos: list.filter((u) => typeof u === "string" && /^https:\/\//.test(u)).slice(0, 40) }, true);
}

export default async (req) => {
  const url = new URL(req.url);
  const ratingId = url.searchParams.get("ratings");
  if (ratingId) return ratings(ratingId, url.searchParams.get("year") || "");
  const photoVin = url.searchParams.get("photos");
  if (photoVin) {
    const k = (globalThis.Netlify && Netlify.env && Netlify.env.get("AUTODEV_API_KEY")) || process.env.AUTODEV_API_KEY;
    if (!k) return json(500, { ok: false, error: "missing_key" });
    return photos(photoVin, k);
  }
  const zip = url.searchParams.get("zip") || "";
  const model = url.searchParams.get("model") || "";
  const distance = Math.min(200, Math.max(10, parseInt(url.searchParams.get("distance") || "50", 10) || 50));
  const debug = url.searchParams.get("debug") === "1";
  const nationwide = url.searchParams.get("nationwide") === "1";
  if (!nationwide && !/^\d{5}$/.test(zip)) return json(400, { ok: false, error: "bad_zip" });
  const spec = MODELS[model];
  if (!spec) return json(400, { ok: false, error: "unknown_model" });

  const key = (globalThis.Netlify && Netlify.env && Netlify.env.get("AUTODEV_API_KEY")) || process.env.AUTODEV_API_KEY;
  if (!key) return json(500, { ok: false, error: "missing_key", hint: "Add AUTODEV_API_KEY in Netlify, then redeploy." });

  const year = new Date().getFullYear();
  // Results per search: 20 on auto.dev's free plan. After upgrading, set AUTODEV_LIMIT in Netlify (Growth allows 100).
  const limitEnv = (globalThis.Netlify && Netlify.env && Netlify.env.get("AUTODEV_LIMIT")) || process.env.AUTODEV_LIMIT;
  const limit = Math.min(500, Math.max(1, parseInt(limitEnv || "20", 10) || 20));
  // Nationwide: no ZIP, the last 8 model years, cheapest first, so shipping a car in can be worth it.
  const q = [
    "vehicle.make=" + encodeURIComponent(spec.make),
    "vehicle.model=" + spec.models.map(encodeURIComponent).join(","),
    "vehicle.year=" + Math.max(spec.first, year - (nationwide ? 8 : 13)) + "-" + Math.min(spec.last || 9999, year + 1),
    "retailListing.price=1-100000",
    ...(nationwide ? ["sort=price.asc"] : ["zip=" + zip, "distance=" + distance]),
    "limit=" + limit,
  ].join("&");

  let res;
  try {
    res = await fetch("https://api.auto.dev/listings?" + q, {
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    });
  } catch (e) {
    return json(502, { ok: false, error: "upstream_unreachable" });
  }
  if (res.status === 429) return json(429, { ok: false, error: "rate_limited" });
  if (res.status === 401 || res.status === 403) return json(502, { ok: false, error: "key_rejected_or_quota", status: res.status });
  if (!res.ok) return json(502, { ok: false, error: "upstream_error", status: res.status });

  let body;
  try { body = await res.json(); } catch (e) { return json(502, { ok: false, error: "upstream_bad_json" }); }
  const rows = Array.isArray(body.data) ? body.data : [];
  const listings = rows.map((it) => pick(it, year)).filter((x) => {
    if (!x.vin || !x.price) return false;
    const text = [x.model, x.trim, x.fuel, x.engine, x.series].join(" ");
    if (spec.need && !spec.need.test(text)) return false;
    if (spec.avoid && spec.avoid.test(text)) return false;
    return true;
  });

  const out = { ok: true, model, zip: nationwide ? null : zip, distance: nationwide ? null : distance, nationwide, count: listings.length, listings };
  if (debug) { out.raw = rows.slice(0, 2); out.query = q; }
  return json(200, out, !debug);
};
