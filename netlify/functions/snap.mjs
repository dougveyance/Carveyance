// Carveyance: Snap a Car (carveyance.com/snap/).
// A reader photographs a car. This function does three jobs for that page, and keeps every key out of the browser:
//
//   POST /.netlify/functions/snap?identify=1   body: {"image":"<base64 JPEG>","type":"image/jpeg"}
//        Claude (Anthropic) looks at the photo and says what the car is. Uses ANTHROPIC_API_KEY.
//        The photo is passed straight through and never saved.
//   GET  /.netlify/functions/snap?specs=1&year=2016&make=Porsche&model=Cayenne[&trim=S E-Hybrid]
//        The spec sheet for one model year from CarsXE's Year Make Model API. Uses CARSXE_API_KEY.
//        Cached for 30 days, so the same car looked up twice only costs one CarsXE credit.
//   GET  /.netlify/functions/snap?about=1&make=Saab&model=900&gen=classic&from=1979&to=1993
//        For cars without a Car Index page: a short write-up from Claude, plus the Wikipedia page
//        and its Commons photo with credit. Cached for 30 days per car.
//   GET  /.netlify/functions/snap?stats=1&make=Saab&model=9-3&year=2006&trim=Aero
//        The key numbers for that exact year and trim, from Claude. Cached for 30 days per version.
//   GET  /.netlify/functions/snap?models=1&make=Saab
//        Model names for the step-by-step picker, from NHTSA's free vehicle database. Cached for 30 days.
//   GET  /.netlify/functions/snap?listings=1&make=Porsche&model=Cayenne&from=2015&to=2018&zip=90026[&distance=100]
//        Real cars for sale near a ZIP code from auto.dev. Uses AUTODEV_API_KEY, the same key FitDrive uses.
//        Leave out zip and add &nationwide=1 for the whole country. Cached for 12 hours.
//
// Claude answers in a fixed JSON shape (structured outputs). Opus 5.5 doesn't allow forced tool calls, so none are used.
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

// The exact shape Claude must answer in (structured outputs). Every field is required, so the answer is always complete.
const CAR = {
  type: "object",
  properties: {
    make: { type: "string" }, model: { type: "string" },
    year_start: { type: "integer" }, year_end: { type: "integer" },
  },
  required: ["make", "model", "year_start", "year_end"],
  additionalProperties: false,
};
const FIELDS = {
  found: { type: "boolean", description: "true when a car, truck, van or SUV is clearly visible" },
  make: { type: "string" },
  model: { type: "string" },
  variant: { type: "string", description: "Trim or version with visible evidence, such as 'S E-Hybrid', 'Mach 1' or '1800E'. Empty when unsure." },
  generation: { type: "string", description: "Generation name or code, such as '958.2', 'F30' or 'third generation (XU50)'. Empty when unknown." },
  year_start: { type: "integer" },
  year_end: { type: "integer" },
  body_style: { type: "string", description: "Such as 'SUV', 'four-door sedan', 'two-door coupe', 'crew cab pickup'" },
  confidence: { type: "string", enum: ["high", "medium", "low"] },
  clues: { type: "array", items: { type: "string" }, description: "2 to 4 short clues" },
  listing_make: { type: "string" },
  listing_model: { type: "string" },
  search_phrase: { type: "string" },
  alternatives: { type: "array", items: CAR, description: "Up to 2 other cars it could be, most likely first. Empty when sure." },
  others: { type: "array", items: CAR, description: "Up to 3 other identifiable vehicles in the photo. Empty when none." },
  note: { type: "string", description: "Empty unless it's likely a replica, tribute, restomod, kit car or heavily modified" },
  retake_tip: { type: "string", description: "The one shot that would settle it, such as 'Get the front end or the tailgate badge'. Empty when sure." },
};
const SCHEMA = { type: "object", properties: FIELDS, required: Object.keys(FIELDS), additionalProperties: false };

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
  const content = [
    { type: "image", source: { type: "base64", media_type: type, data } },
    { type: "text", text: "What car is this?" },
  ];
  // First try: structured outputs, which guarantee the JSON shape. If the API turns that request down (400),
  // ask again for plain JSON in the reply, so a change on Anthropic's side can't take photo ID offline.
  let r = await askClaude(key, { model, max_tokens: 4000, system: SYSTEM, messages: [{ role: "user", content }],
    output_config: { format: { type: "json_schema", schema: SCHEMA } } });
  if (r.status === 400 && !r.credit) {
    const keys = Object.keys(FIELDS).join(", ");
    r = await askClaude(key, { model, max_tokens: 4000, messages: [{ role: "user", content }],
      system: SYSTEM + "\n\nReply with only one JSON object and no other text. Its keys: " + keys +
        ". alternatives and others are arrays of objects with make, model, year_start and year_end. confidence is high, medium or low." });
  }
  if (r.error) return r.error;
  const car = parseCar(r.body);
  if (!car) return json(502, { ok: false, error: "no_answer", stop: r.body && r.body.stop_reason ? String(r.body.stop_reason) : "" });
  return json(200, { ok: true, car: clean(car), model: r.body.model || model, usage: r.body.usage || null });
}

async function askClaude(key, payload) {
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return { error: json(502, { ok: false, error: "upstream_unreachable" }) };
  }
  let body = null;
  try { body = await res.json(); } catch (e) { /* handled below */ }
  const msg = body && body.error && body.error.message ? String(body.error.message) : "";
  if (res.ok && body) return { status: 200, body };
  if (/credit balance|billing|spend limit|usage limit/i.test(msg)) return { status: res.status, credit: true, error: json(402, { ok: false, error: "out_of_credit" }) };
  if (res.status === 401 || res.status === 403) return { status: res.status, error: json(502, { ok: false, error: "key_rejected" }) };
  if (res.status === 429) return { status: 429, error: json(429, { ok: false, error: "rate_limited" }) };
  if (res.status === 529 || res.status === 503) return { status: res.status, error: json(503, { ok: false, error: "busy" }) };
  return { status: res.status, error: json(502, { ok: false, error: "upstream_error", status: res.status, detail: msg.slice(0, 200) }) };
}

// The answer is the JSON in the reply's text block (not always the first block).
function parseCar(body) {
  const blocks = body && Array.isArray(body.content) ? body.content : [];
  for (const b of blocks) {
    if (!b || b.type !== "text" || typeof b.text !== "string") continue;
    const t = b.text.trim(), i = t.indexOf("{"), j = t.lastIndexOf("}");
    if (i < 0 || j <= i) continue;
    try { const o = JSON.parse(t.slice(i, j + 1)); if (o && typeof o === "object") return o; } catch (e) { /* try the next block */ }
  }
  return null;
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

// ---------------------------------------------------------------- 4. "About the car", for cars without a Car Index page
//   GET /.netlify/functions/snap?about=1&make=Saab&model=900&gen=classic&from=1979&to=1993
//   A short write-up from Claude, plus the car's Wikipedia page and its lead photo from Wikimedia Commons with the
//   photographer and license. Cached for 30 days, so each car is written up once and later readers get the same copy.
//   The numbers come separately from ?stats=1 (section 5), because they depend on the exact year and trim.
const ABOUT_SYSTEM = `You write short notes about cars for Carveyance, an American enthusiast car magazine. A reader just photographed a car the magazine hasn't written about yet, and wants to know what it is.

paragraphs: 1 or 2 short paragraphs, 80 to 150 words in all. Say what the car is and where it sat in its maker's lineup, what it's known for, and one memorable, true detail. Plain, confident and warm, written for enthusiasts. American English spelling, numbers as numerals, speeds in mph. No politics, no first person, no hype words, no lists. Don't mention Carveyance, Wikipedia or AI. If you know little about the car, write 1 short paragraph and keep to what you're sure of.

wikipedia_title: the exact title of the English Wikipedia article that best covers this model or generation, such as "Saab 900" or "Mercedes-Benz R107 and C107". Empty if unsure.`;
const ABOUT_FIELDS = {
  paragraphs: { type: "array", items: { type: "string" } },
  wikipedia_title: { type: "string" },
};
const ABOUT_SCHEMA = { type: "object", properties: ABOUT_FIELDS, required: Object.keys(ABOUT_FIELDS), additionalProperties: false };
const WIKI_HEADERS = { "User-Agent": "CarveyanceSnap/1.0 (https://carveyance.com/snap/)", "Api-User-Agent": "CarveyanceSnap/1.0 (https://carveyance.com/snap/)" };
const plain = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

async function wikiJson(url) {
  try { const r = await fetch(url, { headers: WIKI_HEADERS }); return r.ok ? await r.json() : null; } catch (e) { return null; }
}
async function wikiPage(title, make) {
  if (!title) return null;
  const j = await wikiJson("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_")) + "?redirect=true");
  if (!j || j.type !== "standard") return null;
  // It has to be about this make, or it isn't the right page.
  const firstWord = plain(make).split(/[^a-z0-9]+/)[0];
  if (firstWord && !plain([j.title, j.description, j.extract].join(" ")).includes(firstWord)) return null;
  return j;
}
async function findWiki(make, model, title) {
  let page = await wikiPage(title, make);
  if (!page) {
    const s = await wikiJson("https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=3&srsearch=" + encodeURIComponent(make + " " + model + " car"));
    const hits = s && s.query && Array.isArray(s.query.search) ? s.query.search : [];
    for (const h of hits) { page = await wikiPage(h.title, make); if (page) break; }
  }
  if (!page) return null;
  const out = { title: page.title, url: (page.content_urls && page.content_urls.desktop && page.content_urls.desktop.page) || "https://en.wikipedia.org/wiki/" + encodeURIComponent(page.title.replace(/ /g, "_")) };
  // The photo: the article's own lead image, at a width Wikimedia already makes (960 px), and only when it's a free file
  // on Wikimedia Commons (not the non-free images some articles carry). Credited with the photographer and license.
  const isCommons = (u) => /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\//.test(String(u || ""));
  const pi = await wikiJson("https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1" +
    "&prop=pageimages&piprop=thumbnail%7Cname%7Coriginal&pithumbsize=960&pilicense=free&titles=" + encodeURIComponent(page.title));
  const pg = pi && pi.query && Array.isArray(pi.query.pages) && pi.query.pages[0] ? pi.query.pages[0] : {};
  let file = pg.pageimage ? String(pg.pageimage) : "";
  let thumb = pg.thumbnail && isCommons(pg.thumbnail.source) ? String(pg.thumbnail.source) : "";
  const webImage = (u) => /\.(jpe?g|png|gif|webp)$/i.test(String(u || "")); // browsers can't show .tif, .pdf and the like
  let full = pg.original && isCommons(pg.original.source) && webImage(pg.original.source) ? String(pg.original.source) : "";
  if (!thumb && !full) {
    // Fall back to the image in the article summary, full size.
    const orig = page.originalimage && page.originalimage.source ? String(page.originalimage.source) : "";
    const m = orig.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/);
    if (m && webImage(orig)) { full = orig; try { file = decodeURIComponent(m[1]); } catch (e) { file = m[1]; } }
  }
  if ((thumb || full) && file && !/\.svg$/i.test(file)) {
    out.image = thumb || full;
    if (full && full !== out.image) out.original = full; // the page tries this one if the smaller copy won't load
    const name = file.replace(/ /g, "_");
    out.filePage = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(name);
    const info = await wikiJson("https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles=" + encodeURIComponent("File:" + name));
    const pages = info && info.query && info.query.pages ? Object.values(info.query.pages) : [];
    const meta = pages[0] && pages[0].imageinfo && pages[0].imageinfo[0] ? pages[0].imageinfo[0].extmetadata || {} : {};
    const val = (k) => meta[k] && meta[k].value ? String(meta[k].value).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim() : "";
    out.credit = val("Artist").slice(0, 80);
    out.license = val("LicenseShortName").slice(0, 40);
    out.licenseUrl = /^https?:\/\//.test(val("LicenseUrl")) ? val("LicenseUrl") : "";
  }
  return out;
}

async function about(req, p) {
  // Other websites can't spend your Claude credit through this (browsers mark their requests "cross-site").
  if (req.headers.get("sec-fetch-site") === "cross-site") return json(403, { ok: false, error: "forbidden_origin" });
  const make = str(p.get("make"), 40), model = str(p.get("model"), 60), gen = str(p.get("gen"), 60);
  let from = parseInt(p.get("from") || "", 10) || 0, to = parseInt(p.get("to") || "", 10) || from;
  if (!make || !model) return json(400, { ok: false, error: "bad_request" });
  const key = env("ANTHROPIC_API_KEY");
  if (!key) return json(500, { ok: false, error: "missing_key" });
  const which = [make, model, gen ? "(" + gen + ")" : "", from ? (to && to !== from ? from + "–" + to : String(from)) : ""].filter(Boolean).join(" ");
  const model_ = env("SNAP_MODEL") || DEFAULT_MODEL;
  const messages = [{ role: "user", content: "Write the note for this car: " + which }];
  let r = await askClaude(key, { model: model_, max_tokens: 2000, system: ABOUT_SYSTEM, messages,
    output_config: { format: { type: "json_schema", schema: ABOUT_SCHEMA } } });
  if (r.status === 400 && !r.credit) {
    r = await askClaude(key, { model: model_, max_tokens: 2000, messages,
      system: ABOUT_SYSTEM + "\n\nReply with only one JSON object and no other text. Its keys: " + Object.keys(ABOUT_FIELDS).join(", ") + "." });
  }
  const raw = r.error ? null : parseCar(r.body);
  const info = raw ? {
    paragraphs: (Array.isArray(raw.paragraphs) ? raw.paragraphs : []).slice(0, 2).map((x) => String(x || "").trim().slice(0, 900)).filter(Boolean),
  } : null;
  const wiki = await findWiki(make, model, raw ? str(raw.wikipedia_title, 120) : "");
  if (!info && !wiki) return r.error || json(502, { ok: false, error: "no_answer" });
  // A half answer (Claude busy, or no Wikipedia page) is only kept for a day, so it fills in properly later.
  const full = !!(info && info.paragraphs.length && wiki);
  return json(200, { ok: true, make, model, about: info, wiki },
    cached("about|make|model|gen|from|to", 3600, full ? 2592000 : 86400));
}

// ---------------------------------------------------------------- 5. the numbers for one exact version
//   GET /.netlify/functions/snap?stats=1&make=Saab&model=9-3&year=2006&trim=Aero
//   Engine, power, torque, 0-60, top speed, weight, drive wheels, transmission, EPA mpg, number made, body, country,
//   for that year and trim (an Aero and a Linear get their own numbers). A number Claude doesn't know comes back 0
//   and the page shows a dash. Cached for 30 days per version.
const STATS_SYSTEM = `You give the key specifications of one exact car for Carveyance, an American enthusiast car magazine.

Describe exactly the version asked for: that model year and that trim. A higher-output trim has its own power, 0-60 and top speed; never reuse another trim's figures. If no trim is given, use the most common US version for that year and name it in specs_for. If no year is given, use the most common US version of that generation.

Use the maker's published figures for engine, power, torque, transmission, drive wheels, curb weight and top speed, and a maker claim or a well-known road test for 0-60 mph. When you know a figure for the same engine and transmission in that body, use it. Use 0 (or an empty string) only when you really don't know a figure; don't invent one.
number_made: only a known published production total for this model or generation; never estimate it. Set number_made_approx to true when the published figure is itself approximate.
mpg_city, mpg_highway, mpg_combined: the EPA estimates as listed on fueleconomy.gov for that version (whole numbers). 0 for cars not sold in the US, cars from before EPA ratings, and electric cars.
power_hp is US (SAE net) horsepower. torque_lbft is pound-feet. weight_kg is curb weight in kilograms. top_speed_mph as published (governed speed if the car is limited).
engine: such as "2.8-liter turbocharged V6".
transmission: first the transmission these figures are for, then in parentheses any other transmission offered on this version, such as "6-speed manual (5-speed automatic optional)". Just "6-speed manual" if there was only one.
drive: first "Front-wheel drive", "Rear-wheel drive", "All-wheel drive" or "Four-wheel drive" for these figures, then in parentheses any other drive offered on this version, such as "Front-wheel drive (all-wheel drive optional)".
If the trim name says which transmission or drive (such as 6M, 6A, CVT, AWD, 4WD, quattro, xDrive, xi, 4MATIC, 4x4), the figures are for that one. Otherwise use the most common US combination. Every figure (0-60, top speed, weight, mpg) must be for the transmission and drive named first.
specs_for: the exact version the numbers describe, including its transmission and, when there was a choice, its drive, such as "2006 Saab 9-3 Aero sedan, 6-speed manual, US market" or "2018 Honda CR-V EX, CVT, all-wheel drive, US market".
American English spelling.`;
const STATS_FIELDS = {
  specs_for: { type: "string" },
  engine: { type: "string" },
  power_hp: { type: "integer" },
  torque_lbft: { type: "integer" },
  zero_to_60: { type: "number" },
  top_speed_mph: { type: "integer" },
  weight_kg: { type: "integer" },
  drive: { type: "string" },
  transmission: { type: "string" },
  mpg_city: { type: "integer" },
  mpg_highway: { type: "integer" },
  mpg_combined: { type: "integer" },
  number_made: { type: "integer" },
  number_made_approx: { type: "boolean" },
  body: { type: "string" },
  country: { type: "string", description: "Where the maker is based" },
};
const STATS_SCHEMA = { type: "object", properties: STATS_FIELDS, required: Object.keys(STATS_FIELDS), additionalProperties: false };

async function stats(req, p) {
  if (req.headers.get("sec-fetch-site") === "cross-site") return json(403, { ok: false, error: "forbidden_origin" });
  const make = str(p.get("make"), 40), model = str(p.get("model"), 60), trim = str(p.get("trim"), 100), gen = str(p.get("gen"), 60);
  const year = parseInt(p.get("year") || "", 10) || 0;
  if (!make || !model || (year && !(year >= 1885 && year <= THIS_YEAR + 1))) return json(400, { ok: false, error: "bad_request" });
  const key = env("ANTHROPIC_API_KEY");
  if (!key) return json(500, { ok: false, error: "missing_key" });
  const which = [year || "", make, model, trim ? "trim: " + trim : "", !year && gen ? "(" + gen + ")" : ""].filter(Boolean).join(" ");
  const model_ = env("SNAP_MODEL") || DEFAULT_MODEL;
  const messages = [{ role: "user", content: "Specifications for: " + which }];
  let r = await askClaude(key, { model: model_, max_tokens: 2000, system: STATS_SYSTEM, messages,
    output_config: { format: { type: "json_schema", schema: STATS_SCHEMA } } });
  if (r.status === 400 && !r.credit) {
    r = await askClaude(key, { model: model_, max_tokens: 2000, messages,
      system: STATS_SYSTEM + "\n\nReply with only one JSON object and no other text. Its keys: " + Object.keys(STATS_FIELDS).join(", ") + "." });
  }
  if (r.error) return r.error;
  const raw = parseCar(r.body);
  if (!raw) return json(502, { ok: false, error: "no_answer" });
  const num = (v, max) => { const n = Number(v); return Number.isFinite(n) && n > 0 && n < max ? n : 0; };
  const out = {
    specs_for: str(raw.specs_for, 140), engine: str(raw.engine, 80), drive: str(raw.drive, 80), transmission: str(raw.transmission, 90),
    body: str(raw.body, 50), country: str(raw.country, 40),
    power_hp: Math.round(num(raw.power_hp, 2500)), torque_lbft: Math.round(num(raw.torque_lbft, 3000)),
    zero_to_60: Math.round(num(raw.zero_to_60, 40) * 10) / 10, top_speed_mph: Math.round(num(raw.top_speed_mph, 320)),
    weight_kg: Math.round(num(raw.weight_kg, 12000)),
    mpg_city: Math.round(num(raw.mpg_city, 200)), mpg_highway: Math.round(num(raw.mpg_highway, 200)), mpg_combined: Math.round(num(raw.mpg_combined, 200)),
    number_made: Math.round(num(raw.number_made, 100000000)), number_made_approx: raw.number_made_approx === true,
  };
  return json(200, { ok: true, make, model, year, trim, stats: out }, cached("stats|make|model|year|trim|gen", 3600, 2592000));
}

// ---------------------------------------------------------------- 6. model list for the step-by-step picker
//   GET /.netlify/functions/snap?models=1&make=Saab
//   Every model name the US government's vehicle database (NHTSA vPIC, free, no key) has for that make.
//   Cached for 30 days. Older and foreign-only models may be missing; the page then lets the reader type the model.
async function models(p) {
  const make = str(p.get("make"), 40);
  if (!make || !/^[\p{L}0-9 .&'\-]+$/u.test(make)) return json(400, { ok: false, error: "bad_request" });
  let list = [];
  try {
    const plainMake = make.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // "Citroën" -> "Citroen", as NHTSA spells it
    const r = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/" + encodeURIComponent(plainMake) + "?format=json");
    if (r.ok) {
      const j = await r.json();
      const seen = {};
      for (const x of Array.isArray(j.Results) ? j.Results : []) {
        const n = str(x && x.Model_Name, 60);
        if (n && !seen[n.toLowerCase()]) { seen[n.toLowerCase()] = 1; list.push(n); }
      }
    }
  } catch (e) { /* the page falls back to typing */ }
  list.sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));
  return json(200, { ok: true, make, models: list.slice(0, 400) }, cached("models|make", 86400, list.length ? 2592000 : 3600));
}

export default async (req, context) => {
  const p = new URL(req.url).searchParams;
  try {
    if (p.get("identify") === "1") return await identify(req, context);
    if (p.get("specs") === "1") return await specs(p);
    if (p.get("listings") === "1") return await listings(p);
    if (p.get("about") === "1") return await about(req, p);
    if (p.get("stats") === "1") return await stats(req, p);
    if (p.get("models") === "1") return await models(p);
  } catch (e) {
    return json(500, { ok: false, error: "server_error" });
  }
  return json(400, { ok: false, error: "unknown_request" });
};
