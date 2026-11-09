// Carveyance: Snap a Car (carveyance.com/snap/).
// A reader photographs a car. This function does three jobs for that page, and keeps every key out of the browser:
//
//   POST /.netlify/functions/snap?identify=1   body: {"image":"<base64 JPEG>","type":"image/jpeg"}
//        Claude (Anthropic) looks at the photo and says what the car is. Uses ANTHROPIC_API_KEY.
//        The photo is passed straight through and never saved.
//   GET  /.netlify/functions/snap?specs=1&year=2016&make=Porsche&model=Cayenne[&trim=S E-Hybrid]
//        The spec sheet for one model year from CarsXE's Year Make Model API. Uses CARSXE_API_KEY.
//        Cached for 30 days, so the same car looked up twice only costs one CarsXE credit.
//   GET  /.netlify/functions/snap?listings=1&make=Porsche&model=Cayenne&from=2015&to=2018&zip=90026[&distance=100]
//        Real cars for sale near a ZIP code from auto.dev. Uses AUTODEV_API_KEY, the same key FitDrive uses.
//        Leave out zip and add &nationwide=1 for the whole country. Cached for 12 hours.
//
// Netlify environment variables (Site configuration > Environment variables):
//   ANTHROPIC_API_KEY  required for photo ID
//   CARSXE_API_KEY     required for the spec sheet
//   AUTODEV_API_KEY    already set for FitDrive
//   SNAP_MODEL         optional; the Claude model to use. Default: claude-opus-5-5 (the one tested on Donde's photos).
//                      claude-sonnet-5-5 and claude-haiku-5-5 are cheaper; switch only after they pass the same test.

const DEFAULT_MODEL = "claude-opus-5-5";
const MAX_IMAGE_CHARS = 5_000_000; // about 3.7 MB of JPEG. The page shrinks photos to about 0.3–0.6 MB first.
const THIS_YEAR = new Date().getFullYear();

const env = (name) => (globalThis.Netlify && Netlify.env && Netlify.env.get(name)) || process.env[name] || "";

const json = (status, body, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
});
const cached = (vary, browserSecs, cdnSecs) => ({
  "Cache-Control": "public, max-age=" + browserSecs,
  "Netlify-CDN-Cache-Control": "public, durable, max-age=" + cdnSecs + ", stale-while-revalidate=86400",
  "Netlify-Vary": "query=" + vary,
});

// ---------------------------------------------------------------- who may call the paid photo ID
// Only pages on carveyance.com (and this site's Netlify previews, and a local `netlify dev`) can spend Claude credits.
function originAllowed(req, context) {
  const origin = req.headers.get("origin") || "";
  if (!origin) return false;
  const ok = new Set(["https://carveyance.com", "https://www.carveyance.com", "http://localhost:8888"]);
  const site = context && context.site ? context.site : {};
  if (site.url) ok.add(String(site.url).replace(/\/$/, ""));
  if (ok.has(origin)) return true;
  if (site.name) {
    const n = String(site.name).toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (n && (origin === "https://" + n + ".netlify.app" || new RegExp("^https://[a-z0-9-]+--" + n + "\\.netlify\\.app$").test(origin))) return true;
  }
  const extra = env("SNAP_ORIGINS"); // optional, comma separated
  return extra.split(",").map((s) => s.trim()).filter(Boolean).includes(origin);
}

// ---------------------------------------------------------------- 1. photo ID with Claude
const SYSTEM = `You identify cars from street photos for Carveyance, an American automotive magazine. A reader saw a car, took a photo, and wants to know exactly what it is.

How to answer:
- Identify the most prominent vehicle: the largest, most central, in-focus one. Other vehicles you can identify go in "others".
- Be as specific as the evidence allows: make, model, generation, and a trim or version only when you can point to evidence for it (badges, scripts, wheels, brake caliper color, bumpers, lights, vents, exhaust tips, roof, paint colors only some versions got).
- year_start and year_end are the span of model years that look like this from the angle shown. Keep it tight when facelift details are visible and wider when they aren't. Use US model years; assume the US market unless the car is clearly a foreign-market model.
- confidence: "high" only when you are sure of make, model and generation. "medium" when one of those is uncertain. "low" when the key angle is hidden or it could be one of several models. Never present a guess as certain. Whenever confidence is not "high", fill in "alternatives" and "retake_tip".
- clues: 2 to 4 short phrases (12 words or fewer each) naming what you actually saw, such as "HYBRID badge on the front fender". Plain American English and spelling.
- listing_make and listing_model: the names US used-car sites and spec databases use (for example "BMW" / "3 Series", "Ford" / "F-250 Super Duty", "Ford" / "Mustang Mach-E", "Volvo" / "P1800").
- search_phrase: what a buyer would type into a used-car site to find this exact car, such as "Porsche Cayenne S E-Hybrid".
- If the car is likely a replica, tribute, restomod, kit car or heavily modified, say so in "note" in one sentence. Otherwise leave "note" empty.
- Never mention license plate numbers and never describe people.
- If no vehicle is visible, set found to false, use empty strings and 0 for the other fields, and use retake_tip to say what to photograph.`;

const CAR = {
  type: "object",
  properties: {
    make: { type: "string" }, model: { type: "string" },
    year_start: { type: "integer" }, year_end: { type: "integer" },
  },
  required: ["make", "model", "year_start", "year_end"],
};
const TOOL = {
  name: "report_car",
  description: "Report the identification of the main vehicle in the photo.",
  input_schema: {
    type: "object",
    properties: {
      found: { type: "boolean", description: "true when a car, truck, van or SUV is clearly visible" },
      make: { type: "string" },
      model: { type: "string" },
      variant: { type: "string", description: "Trim or version with visible evidence, such as 'S E-Hybrid', 'Mach 1' or '1800E'. Empty when unsure." },
      generation: { type: "string", description: "Generation name or code, such as '958.2', 'F30' or 'third generation (XU50)'. Empty when unknown." },
      year_start: { type: "integer" },
      year_end: { type: "integer" },
      body_style: { type: "string", description: "Such as 'SUV', 'four-door sedan', 'two-door coupe', 'crew cab pickup'" },
      confidence: { type: "string", enum: ["high", "medium", "low"] },
      clues: { type: "array", items: { type: "string" } },
      listing_make: { type: "string" },
      listing_model: { type: "string" },
      search_phrase: { type: "string" },
      alternatives: { type: "array", items: CAR, description: "Up to 2 other cars it could be, most likely first" },
      others: { type: "array", items: CAR, description: "Up to 3 other identifiable vehicles in the photo" },
      note: { type: "string" },
      retake_tip: { type: "string", description: "The one shot that would settle it, such as 'Get the front end or the tailgate badge'" },
    },
    required: ["found", "make", "model", "year_start", "year_end", "confidence", "clues", "listing_make", "listing_model", "search_phrase"],
  },
};

const str = (v, max = 120) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
const yr = (v) => { const n = parseInt(v, 10); return n >= 1885 && n <= THIS_YEAR + 2 ? n : 0; };
function cleanCar(c) {
  c = c && typeof c === "object" ? c : {};
  let a = yr(c.year_start), b = yr(c.year_end);
  if (a && !b) b = a; if (b && !a) a = b; if (a > b) [a, b] = [b, a];
  return { make: str(c.make, 40), model: str(c.model, 60), year_start: a, year_end: b };
}
function clean(r) {
  const car = cleanCar(r);
  const conf = ["high", "medium", "low"].includes(r.confidence) ? r.confidence : "low";
  const list = (v, n, f) => (Array.isArray(v) ? v : []).slice(0, n).map(f);
  return {
    found: r.found !== false && !!car.make && !!car.model,
    ...car,
    variant: str(r.variant, 60), generation: str(r.generation, 60), body_style: str(r.body_style, 40),
    confidence: conf,
    clues: list(r.clues, 4, (s) => str(s, 110)).filter(Boolean),
    listing_make: str(r.listing_make, 40) || car.make,
    listing_model: str(r.listing_model, 60) || car.model,
    search_phrase: str(r.search_phrase, 90) || [car.make, car.model].join(" "),
    alternatives: list(r.alternatives, 2, cleanCar).filter((x) => x.make && x.model),
    others: list(r.others, 3, cleanCar).filter((x) => x.make && x.model),
    note: str(r.note, 220), retake_tip: str(r.retake_tip, 160),
  };
}

async function identify(req, context) {
  if (req.method !== "POST") return json(405, { ok: false, error: "post_only" });
  if (!originAllowed(req, context)) return json(403, { ok: false, error: "forbidden_origin" });
  const key = env("ANTHROPIC_API_KEY");
  if (!key) return json(500, { ok: false, error: "missing_key", hint: "Add ANTHROPIC_API_KEY in Netlify, then redeploy." });

  let input;
  try { input = await req.json(); } catch (e) { return json(400, { ok: false, error: "bad_json" }); }
  const data = String((input && input.image) || "").replace(/^data:[^,]*,/, "");
  const type = String((input && input.type) || "image/jpeg").toLowerCase();
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(type)) return json(400, { ok: false, error: "bad_type" });
  if (!data || data.length > MAX_IMAGE_CHARS || !/^[A-Za-z0-9+/=]+$/.test(data.slice(0, 4096))) return json(400, { ok: false, error: "bad_image" });

  const model = env("SNAP_MODEL") || DEFAULT_MODEL;
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        system: SYSTEM,
        tools: [TOOL],
        tool_choice: { type: "tool", name: "report_car" },
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: type, data } },
          { type: "text", text: "What car is this?" },
        ] }],
      }),
    });
  } catch (e) {
    return json(502, { ok: false, error: "upstream_unreachable" });
  }
  if (res.status === 401 || res.status === 403) return json(502, { ok: false, error: "key_rejected" });
  if (res.status === 429) return json(429, { ok: false, error: "rate_limited" });
  if (res.status === 529 || res.status === 503) return json(503, { ok: false, error: "busy" });
  let body;
  try { body = await res.json(); } catch (e) { return json(502, { ok: false, error: "upstream_bad_json" }); }
  if (!res.ok) {
    const msg = body && body.error && body.error.message ? String(body.error.message) : "";
    if (/credit balance|billing|spend limit|usage limit/i.test(msg)) return json(402, { ok: false, error: "out_of_credit" });
    return json(502, { ok: false, error: "upstream_error", status: res.status, detail: msg.slice(0, 200) });
  }
  const block = (Array.isArray(body.content) ? body.content : []).find((b) => b && b.type === "tool_use" && b.name === "report_car");
  if (!block || !block.input) return json(502, { ok: false, error: "no_answer" });
  return json(200, { ok: true, car: clean(block.input), model: body.model || model, usage: body.usage || null });
}

// ---------------------------------------------------------------- 2. spec sheet from CarsXE
// CarsXE groups features by category. Walk whatever shape comes back and keep every {name, value} pair.
const WRAPPERS = new Set(["standard", "features", "items", "values", "list", "data", "specs", "specifications"]);
function flatten(node, out, cat) {
  if (!node || out.length >= 400) return;
  if (Array.isArray(node)) { for (const x of node) flatten(x, out, cat); return; }
  if (typeof node !== "object") return;
  const name = typeof node.name === "string" ? node.name : "";
  if (name && "value" in node) {
    const v = node.value;
    if ((typeof v === "string" || typeof v === "number") && String(v).trim() !== "") out.push({ cat, name: str(name, 90), value: str(v, 140) });
    else if (v === null || v === true) out.push({ cat, name: str(name, 90), value: "Yes" }); // a feature the car has, with nothing to measure
    return;
  }
  const here = name || (typeof node.category === "string" ? node.category : "");
  for (const [k, v] of Object.entries(node)) {
    if (!v || typeof v !== "object") continue;
    const keyCat = /^\d+$/.test(k) || WRAPPERS.has(k.toLowerCase()) ? "" : k;
    flatten(v, out, str(here || keyCat || cat, 60));
  }
}

// The handful of numbers worth showing first. Names differ between data sources, so each one is a pattern.
const KEY_SPECS = [
  ["Engine", /^(engine( type| description)?|engine)$/i],
  ["Displacement", /displacement/i],
  ["Horsepower", /(net )?horsepower|^hp\b|power output/i],
  ["Torque", /torque/i],
  ["Transmission", /^transmission|transmission( type)?$/i],
  ["Drivetrain", /drivetrain|drive type|driven wheels/i],
  ["City MPG", /city.*(mpg|economy)|fuel economy.*city|epa.*city/i],
  ["Highway MPG", /(hwy|highway).*(mpg|economy)|fuel economy.*(hwy|highway)|epa.*(hwy|highway)/i],
  ["Range", /(electric|ev|epa).*range|^range\b/i],
  ["Curb weight", /curb weight/i],
  ["Length", /^length|length, overall/i],
  ["Wheelbase", /wheelbase/i],
  ["Fuel tank", /fuel tank|fuel capacity/i],
];
function keySpecs(items) {
  const out = [];
  for (const [label, re] of KEY_SPECS) {
    const hit = items.find((x) => re.test(x.name) && x.value !== "Yes");
    if (hit) out.push({ label, value: hit.value, from: hit.name });
  }
  return out;
}
const money = (v) => { const n = Number(String(v == null ? "" : v).replace(/[^0-9.]/g, "")); return n > 1000 ? Math.round(n) : null; };

async function specs(p) {
  const year = parseInt(p.get("year") || "", 10), make = str(p.get("make"), 40), model = str(p.get("model"), 60), trim = str(p.get("trim"), 80);
  if (!(year >= 1900 && year <= THIS_YEAR + 1) || !make || !model) return json(400, { ok: false, error: "bad_request" });
  const key = env("CARSXE_API_KEY");
  if (!key) return json(500, { ok: false, error: "missing_key", hint: "Add CARSXE_API_KEY in Netlify, then redeploy." });
  const q = new URLSearchParams({ key, year: String(year), make, model, allTrimOptions: "1" });
  if (trim) q.set("trim", trim);
  let res;
  try { res = await fetch("https://api.carsxe.com/v1/ymm?" + q.toString()); }
  catch (e) { return json(502, { ok: false, error: "upstream_unreachable" }); }
  const longCache = cached("specs|year|make|model|trim", 3600, 2592000);
  if (res.status === 404) return json(200, { ok: true, found: false, year, make, model }, longCache);
  if (res.status === 401) return json(502, { ok: false, error: "key_rejected" });
  if (res.status === 429) return json(429, { ok: false, error: "quota" });
  let body;
  try { body = await res.json(); } catch (e) { return json(502, { ok: false, error: "upstream_bad_json" }); }
  if (!res.ok || !body || body.success === false || !body.bestMatch) {
    if (res.ok || res.status === 400) return json(200, { ok: true, found: false, year, make, model }, longCache);
    return json(502, { ok: false, error: "upstream_error", status: res.status });
  }
  const b = body.bestMatch;
  // Fuzzy matching can wander to a different make; that's a miss, not a spec sheet.
  const bare = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (b.make && bare(b.make) !== bare(make) && !bare(b.make).includes(bare(make)) && !bare(make).includes(bare(b.make))) {
    return json(200, { ok: true, found: false, year, make, model }, longCache);
  }
  const items = [];
  flatten(b.features || {}, items, "");
  const colors = (b.color && Array.isArray(b.color.exterior) ? b.color.exterior : []).slice(0, 24)
    .map((c) => ({ name: str(c && c.name, 60), rgb: str(c && c.rgb, 20) })).filter((c) => c.name);
  const trims = (Array.isArray(body.trimOptions) ? body.trimOptions : []).slice(0, 60)
    .map((t) => ({ id: str(t && t.trim_id, 80), name: str(t && t.name, 140) })).filter((t) => t.name);
  const out = {
    ok: true, found: true, year: parseInt(b.year, 10) || year, make: str(b.make, 40) || make, model: str(b.model, 60) || model,
    name: str(b.name, 160), trimId: str(b.trim_id, 80), exact: body.match_exact === true,
    msrp: money(b.base_msrp), seats: parseInt(b.total_seating, 10) || null,
    key: keySpecs(items), all: items.slice(0, 250), colors, trims,
  };
  if (p.get("debug") === "1") out.raw = body;
  return json(200, out, longCache);
}

// ---------------------------------------------------------------- 3. cars for sale from auto.dev
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };
function row(item) {
  const v = item.vehicle || {}, r = item.retailListing || {};
  const dealer = typeof r.dealer === "string" ? r.dealer : (r.dealer && (r.dealer.name || r.dealer.dealerName)) || "";
  return {
    year: num(v.year), make: v.make || "", model: v.model || "", trim: v.trim || "",
    price: num(r.price) || 0, miles: num(r.miles ?? r.mileage ?? item.miles) ?? null,
    dealer, city: r.city || "", state: r.state || "",
    url: r.vdp || r.vdpUrl || "", photo: r.primaryImage || "", color: v.exteriorColor || "",
  };
}
async function listings(p) {
  const make = str(p.get("make"), 40), model = str(p.get("model"), 60);
  let from = parseInt(p.get("from") || "", 10), to = parseInt(p.get("to") || "", 10);
  const zip = p.get("zip") || "", nationwide = p.get("nationwide") === "1";
  const distance = Math.min(500, Math.max(10, parseInt(p.get("distance") || "100", 10) || 100));
  if (!make || !model || !(from >= 1900) || !(to >= from)) return json(400, { ok: false, error: "bad_request" });
  if (!nationwide && !/^\d{5}$/.test(zip)) return json(400, { ok: false, error: "bad_zip" });
  to = Math.min(to, THIS_YEAR + 1);
  const key = env("AUTODEV_API_KEY");
  if (!key) return json(500, { ok: false, error: "missing_key" });
  const limit = Math.min(100, Math.max(1, parseInt(env("AUTODEV_LIMIT") || "20", 10) || 20));
  const q = [
    "vehicle.make=" + encodeURIComponent(make),
    "vehicle.model=" + encodeURIComponent(model),
    "vehicle.year=" + from + "-" + to,
    "retailListing.price=1-5000000",
    ...(nationwide ? ["sort=price.asc"] : ["zip=" + zip, "distance=" + distance]),
    "limit=" + limit,
  ].join("&");
  let res;
  try { res = await fetch("https://api.auto.dev/listings?" + q, { headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" } }); }
  catch (e) { return json(502, { ok: false, error: "upstream_unreachable" }); }
  if (res.status === 429) return json(429, { ok: false, error: "rate_limited" });
  if (res.status === 401 || res.status === 403) return json(502, { ok: false, error: "key_rejected_or_quota" });
  if (!res.ok) return json(502, { ok: false, error: "upstream_error", status: res.status });
  let body;
  try { body = await res.json(); } catch (e) { return json(502, { ok: false, error: "upstream_bad_json" }); }
  const rows = (Array.isArray(body.data) ? body.data : []).map(row)
    .filter((x) => x.price > 0 && /^https:\/\//.test(x.url) && (!x.photo || /^https:\/\//.test(x.photo)));
  return json(200, { ok: true, make, model, from, to, zip: nationwide ? null : zip, distance: nationwide ? null : distance, count: rows.length, listings: rows.slice(0, 12) },
    cached("listings|make|model|from|to|zip|distance|nationwide", 600, 43200));
}

export default async (req, context) => {
  const p = new URL(req.url).searchParams;
  try {
    if (p.get("identify") === "1") return await identify(req, context);
    if (p.get("specs") === "1") return await specs(p);
    if (p.get("listings") === "1") return await listings(p);
  } catch (e) {
    return json(500, { ok: false, error: "server_error" });
  }
  return json(400, { ok: false, error: "unknown_request" });
};
