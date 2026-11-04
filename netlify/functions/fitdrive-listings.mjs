// FitDrive by Carveyance: real dealer listings for one catalog model near a ZIP code.
// The browser calls /.netlify/functions/fitdrive-listings?zip=60614&distance=50&model=corolla-h
// This function adds the auto.dev key (from the AUTODEV_API_KEY environment variable in Netlify),
// asks auto.dev for listings, keeps only the ones that match the FitDrive model, and returns
// a short list. The key never reaches the browser. Results are cached for 12 hours per
// ZIP, distance and model, so repeat visits don't use up the monthly allowance.

const MODELS = {
  "corolla-h":   { make: "Toyota",    models: ["Corolla", "Corolla Hybrid"], need: /hybrid/i, first: 2020 },
  "civic":       { make: "Honda",     models: ["Civic"], avoid: /type r|hybrid/i, first: 2020 },
  "versa":       { make: "Nissan",    models: ["Versa"], first: 2020 },
  "rav4-h":      { make: "Toyota",    models: ["RAV4", "RAV4 Hybrid"], need: /hybrid/i, avoid: /prime|plug/i, first: 2020 },
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
};

const json = (status, body, cache) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    ...(cache ? {
      "Cache-Control": "public, max-age=600",
      "Netlify-CDN-Cache-Control": "public, durable, max-age=43200, stale-while-revalidate=86400",
      "Netlify-Vary": "query=zip|distance|model",
    } : { "Cache-Control": "no-store" }),
  },
});

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

function pick(item, year) {
  const v = item.vehicle || {}, r = item.retailListing || {};
  const miles = num(r.miles ?? r.mileage ?? item.miles ?? item.mileage);
  const y = num(v.year);
  const used = r.used != null ? (r.used === true || r.used === "true") : !((miles ?? 0) < 300 && (y ?? 0) >= year - 1);
  const dealer = typeof r.dealer === "string" ? r.dealer : (r.dealer && (r.dealer.name || r.dealer.dealerName)) || "";
  return {
    vin: item.vin || v.vin || "", year: y, make: v.make || "", model: v.model || "", trim: v.trim || "",
    drivetrain: v.drivetrain || "", fuel: v.fuel || "", engine: v.engine || "",
    price: num(r.price) || 0, miles: miles ?? 0, used, cpo: r.cpo === true || r.cpo === "true",
    dealer, city: r.city || "", state: r.state || "", zip: r.zip || "",
    vdp: r.vdp || r.vdpUrl || "", photo: r.primaryImage || "", photoCount: num(r.photoCount) || 0,
    carfax: r.carfaxUrl || "", createdAt: item.createdAt || null,
  };
}

export default async (req) => {
  const url = new URL(req.url);
  const zip = url.searchParams.get("zip") || "";
  const model = url.searchParams.get("model") || "";
  const distance = Math.min(200, Math.max(10, parseInt(url.searchParams.get("distance") || "50", 10) || 50));
  const debug = url.searchParams.get("debug") === "1";
  if (!/^\d{5}$/.test(zip)) return json(400, { ok: false, error: "bad_zip" });
  const spec = MODELS[model];
  if (!spec) return json(400, { ok: false, error: "unknown_model" });

  const key = (globalThis.Netlify && Netlify.env && Netlify.env.get("AUTODEV_API_KEY")) || process.env.AUTODEV_API_KEY;
  if (!key) return json(500, { ok: false, error: "missing_key", hint: "Add AUTODEV_API_KEY in Netlify, then redeploy." });

  const year = new Date().getFullYear();
  const q = [
    "vehicle.make=" + encodeURIComponent(spec.make),
    "vehicle.model=" + spec.models.map(encodeURIComponent).join(","),
    "vehicle.year=" + Math.max(spec.first, year - 13) + "-" + (year + 1),
    "retailListing.price=1-80000",
    "zip=" + zip,
    "distance=" + distance,
    "limit=20",
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
    const text = [x.model, x.trim, x.fuel, x.engine].join(" ");
    if (spec.need && !spec.need.test(text)) return false;
    if (spec.avoid && spec.avoid.test(text)) return false;
    return true;
  });

  const out = { ok: true, model, zip, distance, count: listings.length, listings };
  if (debug) { out.raw = rows.slice(0, 2); out.query = q; }
  return json(200, out, !debug);
};
