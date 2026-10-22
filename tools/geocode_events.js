#!/usr/bin/env node
/*
  Carveyance — fill in map coordinates for events.js
  ---------------------------------------------------
  For Claude's weekly events check (Donde never needs to run this).

  Adds lat/lng to every EVENTS / MEETS entry that has a city and state but
  no coordinates yet, using an offline list of US towns (town-level
  accuracy, good enough for "near me" and the map). It edits only the
  lines that need it and leaves everything else in the file untouched.

    npm i all-the-cities          (once, in a scratch folder or the repo root)
    node tools/geocode_events.js  (from the top level of the repo)

  Towns it cannot match are listed at the end; add them to MANUAL below.
*/
const fs = require("fs");
let cities;
try { cities = require("all-the-cities"); }
catch (e) { console.error("Run `npm i all-the-cities` first."); process.exit(1); }

// places too small for the gazetteer, or named differently there
const MANUAL = {
  "Johnson Valley|CA": [34.4286, -116.6267],
  "Pebble Beach|CA": [36.5725, -121.9486],
  "Buttonwillow|CA": [35.4005, -119.4699],
  "Famoso|CA": [35.5994, -119.2257],
  "Cornell|CA": [34.1103, -118.7820],
  "Primm|NV": [35.6105, -115.3889],
  "Elkhart Lake|WI": [43.8336, -88.0176],
  "Lakeville|CT": [41.9612, -73.4404],
  "Watkins Glen|NY": [42.3806, -76.8733],
  "Speedway|IN": [39.8023, -86.2672],
  "Amelia Island|FL": [30.6280, -81.4430],
  "Alabama to Buffalo|NY": [42.8864, -78.8784],
  "Rancho Santa Fe|CA": [33.0203, -117.2028],
  "Hickory Corners|MI": [42.4372, -85.3878],
  "Warrendale|PA": [40.6531, -80.0717],
  "Waverly|PA": [41.5287, -75.7027],
  "Tomkins Cove|NY": [41.2648, -73.9815],
  "Millstone Township|NJ": [40.2143, -74.4246],
  "Sylmar|CA": [34.3078, -118.4489],
  "Eagle Rock|CA": [34.1392, -118.2128],
  "Kingwood|TX": [30.0499, -95.1847],
  "Meadowlands|PA": [40.2187, -80.2273],
  "Seal Cove|ME": [44.2934, -68.4022],
  "Malta|NY": [42.9767, -73.7935],
  "Morton|MN": [44.5513, -94.9839],
  "Piffard|NY": [42.7809, -77.8547],
  "Arena|WI": [43.1636, -89.9076],
  "Glacier View|AK": [61.8017, -147.6844]
};
const ALIAS = { "new york": "new york city", "nyc": "new york city", "saint": "st", "mount": "mt", "fort": "ft" };

function norm(s) {
  s = String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  s = s.replace(/\(.*?\)/g, " ").replace(/\b(township|twp|village|city of)\b/g, " ");
  s = s.replace(/\bsaint\b/g, "st").replace(/\bst\.\s*/g, "st ").replace(/\bmount\b/g, "mt").replace(/\bmt\.\s*/g, "mt ")
       .replace(/\bfort\b/g, "ft").replace(/\bft\.\s*/g, "ft ");
  s = s.replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  return ALIAS[s] || s;
}

// index: "name|ST" -> most populous match
const idx = new Map();
for (const c of cities) {
  if (c.country !== "US") continue;
  for (const nm of [c.name, c.altName].filter(Boolean)) {
    const k = norm(nm) + "|" + c.adminCode;
    const prev = idx.get(k);
    if (!prev || c.population > prev.population) idx.set(k, c);
  }
}

function lookup(city, state) {
  const m = MANUAL[city + "|" + state];
  if (m) return m;
  let k = norm(city) + "|" + state;
  let hit = idx.get(k);
  if (!hit && /^(east|west|north|south) /.test(norm(city))) hit = idx.get(norm(city).replace(/^(east|west|north|south) /, "") + "|" + state);
  if (!hit && norm(city).endsWith(" beach") === false) hit = idx.get(norm(city) + " city|" + state);
  return hit ? [hit.loc.coordinates[1], hit.loc.coordinates[0]] : null;
}

const path = process.argv[2] || "events.js";
const lines = fs.readFileSync(path, "utf8").split("\n");
let added = 0, missing = [];
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];
  if (!/^\s*\{id:"/.test(L) || /\blat:/.test(L)) continue;
  const city = (L.match(/\bcity:"((?:[^"\\]|\\.)*)"/) || [])[1];
  const state = (L.match(/\bstate:"([A-Z]{2})"/) || [])[1];
  if (!city || !state) { missing.push((L.match(/\bid:"([^"]+)"/) || [])[1] + " (no city)"); continue; }
  const ll = lookup(JSON.parse('"' + city + '"'), state);
  if (!ll) { missing.push(city + ", " + state); continue; }
  lines[i] = L.replace(/(\bregion:"[^"]*")/, `$1, lat:${ll[0].toFixed(4)}, lng:${ll[1].toFixed(4)}`);
  added++;
}
fs.writeFileSync(path, lines.join("\n"));
console.log(`coordinates added: ${added}`);
if (missing.length) console.log("not matched (add to MANUAL):\n  " + [...new Set(missing)].join("\n  "));
