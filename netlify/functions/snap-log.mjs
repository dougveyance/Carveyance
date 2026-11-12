// Carveyance: Snap a Car log (feeds the weekly "cars readers snapped that we haven't covered" digest).
// Kept separate from snap.mjs, so photo ID keeps working even if this one ever has a problem.
//
//   POST /.netlify/functions/snap-log   body: {"type":"seen"|"ask","make":"Saab","model":"900","gen":"classic","from":1979,"to":1993}
//        "seen" = a reader snapped (or typed) a car that has no Car Index page.
//        "ask"  = a reader tapped "Want us to write about it?" on that car.
//        Only car names and counts are stored: no photos, no names, no IP addresses.
//   GET  /.netlify/functions/snap-log?digest=1[&days=7]
//        The list for the last N days (default 7, up to 60), most requested first. Read by the weekly digest.
//
// Storage: Netlify Blobs, store "snap-log", one entry per car per day: d/<YYYY-MM-DD>/<car-slug>.
import { getStore } from "@netlify/blobs";

const THIS_YEAR = new Date().getFullYear();
const json = (status, body, headers = {}) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
});
const str = (v, max = 80) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
const slug = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
const day = (d) => d.toISOString().slice(0, 10);

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
  return false;
}

async function record(req, context) {
  if (!originAllowed(req, context)) return json(403, { ok: false, error: "forbidden_origin" });
  let b;
  try { b = await req.json(); } catch (e) { return json(400, { ok: false, error: "bad_json" }); }
  const type = b && b.type === "ask" ? "ask" : b && b.type === "seen" ? "seen" : "";
  const make = str(b && b.make, 40), model = str(b && b.model, 60);
  if (!type || !make || !model) return json(400, { ok: false, error: "bad_request" });
  let from = parseInt(b.from, 10) || 0, to = parseInt(b.to, 10) || from;
  if (!(from >= 1885 && from <= THIS_YEAR + 2)) from = 0;
  if (!(to >= 1885 && to <= THIS_YEAR + 2)) to = from;
  const gen = str(b.gen, 60);
  const key = "d/" + day(new Date()) + "/" + slug(make + " " + model);
  const store = getStore({ name: "snap-log", consistency: "strong" });
  const cur = (await store.get(key, { type: "json" })) || { make, model, gen: "", from: 0, to: 0, seen: 0, ask: 0 };
  cur[type] = (cur[type] || 0) + 1;
  if (gen) cur.gen = gen;
  if (from && (!cur.from || from < cur.from)) cur.from = from;
  if (to && to > (cur.to || 0)) cur.to = to;
  cur.last = new Date().toISOString();
  await store.setJSON(key, cur);
  return json(200, { ok: true });
}

async function digest(p) {
  const days = Math.min(60, Math.max(1, parseInt(p.get("days") || "7", 10) || 7));
  const store = getStore({ name: "snap-log", consistency: "strong" });
  const cars = {};
  for (let i = 0; i < days; i++) {
    const d = day(new Date(Date.now() - i * 86400000));
    const { blobs } = await store.list({ prefix: "d/" + d + "/" });
    for (const { key } of blobs) {
      const v = await store.get(key, { type: "json" });
      if (!v) continue;
      const id = key.split("/").pop();
      const c = cars[id] || (cars[id] = { car: v.make + " " + v.model, gen: "", years: "", seen: 0, ask: 0, last: "" });
      c.seen += v.seen || 0; c.ask += v.ask || 0;
      if (v.gen && !c.gen) c.gen = v.gen;
      if (v.from && !c.years) c.years = v.from === v.to || !v.to ? String(v.from) : v.from + "–" + v.to;
      if ((v.last || "") > c.last) c.last = v.last || "";
    }
  }
  const list = Object.values(cars).sort((a, b) => b.ask - a.ask || b.seen - a.seen || (a.last < b.last ? 1 : -1));
  return json(200, { ok: true, days, from: day(new Date(Date.now() - (days - 1) * 86400000)), to: day(new Date()), count: list.length, cars: list });
}

export default async (req, context) => {
  try {
    if (req.method === "POST") return await record(req, context);
    const p = new URL(req.url).searchParams;
    if (p.get("digest") === "1") return await digest(p);
    return json(400, { ok: false, error: "unknown_request" });
  } catch (e) {
    return json(500, { ok: false, error: "server_error" });
  }
};
