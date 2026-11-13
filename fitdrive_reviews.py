#!/usr/bin/env python3
"""
FitDrive owner reviews: approve new reviews and publish them.

How to use it (from the Carveyance folder in Terminal):
  1. In Netlify, open Forms, then "fitdrive-review", and download the submissions as CSV.
  2. Run:  python3 fitdrive_reviews.py ~/Downloads/<the file you downloaded>.csv
  3. For each new review, type y to publish it or n to leave it out. Type s to decide later.
  4. Commit and push. The reviews show up on FitDrive's car pages.

What gets published to fitdrive-reviews.json: the car, the rating, the answers, the name to show
(first name and last initial), the date, and whether the VIN was checked. Emails and VINs are
never written to the file.

The rule for "n": only leave a review out if it breaks the rules on the Privacy and terms page
(not a real owner, an ad, someone else's personal information, abusive, or written for pay).
Never leave one out because it's negative. The FTC treats hiding negative reviews as deceptive.
"""
import csv, hashlib, json, re, sys, urllib.request, urllib.parse
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent / "fitdrive-reviews.json"   # kept outside fitdrive/ so replacing that folder never wipes reviews


# Category ratings from the form (Poor 2, Fair 4, Good 6, Great 8, Excellent 10). All optional.
# "Holding a charge" is asked only for electric and plug-in cars, "Towing" only for models rated to tow.
CATS = [("rel", "Reliability"), ("comfort", "Comfort"), ("perf", "Performance"), ("econ", "Fuel economy"),
        ("charge", "Holding a charge"), ("tow", "Towing"), ("value", "Value for money"), ("space", "Space and practicality")]


def norm(k):
    return re.sub(r"[^a-z0-9]+", "_", (k or "").strip().lower()).strip("_")


def show_name(raw):
    parts = [p for p in re.split(r"\s+", (raw or "").strip()) if p]
    if not parts:
        return "An owner"
    first = parts[0][:20].capitalize()
    return f"{first} {parts[-1][0].upper()}." if len(parts) > 1 else first


def sid_for(row):
    base = row.get("id") or "|".join(row.get(k, "") for k in ("created_at", "email", "model", "love", "bugs", "broke"))
    return hashlib.sha1(base.encode("utf-8")).hexdigest()[:12]


def date_of(row):
    for k in ("created_at", "created", "date", "submitted_at"):
        v = row.get(k)
        if v:
            m = re.match(r"(\d{4}-\d{2}-\d{2})", v)
            if m:
                return m.group(1)
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def vin_check(vin, car, year):
    """Asks NHTSA what the VIN decodes to. Returns a short line to read before deciding."""
    vin = re.sub(r"[^A-Za-z0-9]", "", vin or "").upper()
    if len(vin) != 17:
        return False, "No full VIN given."
    try:
        url = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/" + urllib.parse.quote(vin) + "?format=json"
        with urllib.request.urlopen(url, timeout=15) as r:
            d = json.load(r)["Results"][0]
    except Exception as e:
        return False, f"Couldn't reach NHTSA to check the VIN ({e.__class__.__name__})."
    make, model, yr = d.get("Make", ""), d.get("Model", ""), d.get("ModelYear", "")
    ok = bool(make) and make.lower() in car.lower() and str(yr) == str(year)
    return ok, f"The VIN decodes to a {yr} {make.title()} {model}. {'That matches.' if ok else 'That does NOT match the review.'}"


def clean(s, n=600):
    s = re.sub(r"\s+", " ", (s or "")).strip()
    s = re.sub(r"\S+@\S+\.\S+", "[email removed]", s)                      # no emails in public text
    s = re.sub(r"(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}", "[phone removed]", s)
    return s[:n]


def ask(prompt, allowed):
    while True:
        a = input(prompt).strip().lower()[:1]
        if a in allowed:
            return a
        print("  Please type " + ", ".join(allowed) + ".")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    rows = []
    with open(sys.argv[1], newline="", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            rows.append({norm(k): (v or "").strip() for k, v in r.items()})
    pub = {"reviews": [], "decided": []}
    if OUT.exists():
        pub = json.loads(OUT.read_text())
        pub.setdefault("reviews", []); pub.setdefault("decided", [])
    done = set(pub["decided"]) | {r["sid"] for r in pub["reviews"]}
    new = [r for r in rows if sid_for(r) not in done and r.get("model")]
    print(f"{len(rows)} reviews in the file, {len(new)} new.\n")
    added = 0
    for r in new:
        sid = sid_for(r)
        try:
            rating = int(float(r.get("rating") or 0))
            rating = rating if 1 <= rating <= 10 else 0
        except ValueError:
            rating = 0
        print("=" * 64)
        print(f"{r.get('car')} ({r.get('year')}) · {'owns it' if r.get('own') != 'past' else 'sold it'} · {r.get('owned')} · {r.get('miles')} mi")
        print(f"Rating {rating}/10 · would buy again: {r.get('again')} · shown as: {show_name(r.get('name'))}")
        cats = {}
        for k, label in CATS:
            try:
                v = int(float(r.get("c_" + k) or 0))
            except ValueError:
                v = 0
            if v in (2, 4, 6, 8, 10):
                cats[k] = v
        if cats:
            print("  " + " · ".join(f"{label} {cats[k]}" for k, label in CATS if k in cats))
        for k, label in (("love", "Loves"), ("bugs", "Bugs them"), ("broke", "What broke")):
            if r.get(k):
                print(f"  {label}: {r[k]}")
        ok, line = vin_check(r.get("vin"), r.get("car", ""), r.get("year"))
        print("  " + line)
        if not rating or r.get("agree", "").lower() not in ("yes", "on", "true", "1"):
            print("  Missing a rating or the checkbox, so it's left out.")
            pub["decided"].append(sid)
            continue
        a = ask("Publish it? y = yes, n = no (rule break only), s = decide later: ", "yns")
        if a == "s":
            continue
        pub["decided"].append(sid)
        if a == "n":
            continue
        verified = ok and ask("  Show the VIN checked badge? y/n: ", "yn") == "y"
        miles = re.sub(r"\D", "", r.get("miles", ""))
        pub["reviews"].append({
            "sid": sid, "model": r["model"], "car": clean(r.get("car"), 60), "year": int(r["year"]) if r.get("year", "").isdigit() else None,
            "own": "past" if r.get("own") == "past" else "current", "owned": clean(r.get("owned"), 30),
            "miles": int(round(int(miles) / 1000.0) * 1000) if miles else None, "rating": rating, "again": r.get("again") == "yes",
            "love": clean(r.get("love")), "bugs": clean(r.get("bugs")), "broke": clean(r.get("broke")),
            "name": show_name(r.get("name")), "date": date_of(r), "verified": bool(verified), "cats": cats})
        added += 1
    pub["decided"] = sorted(set(pub["decided"]))
    pub["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(pub, indent=1, ensure_ascii=False))
    print(f"\nPublished {added} new review{'s' if added != 1 else ''}. {len(pub['reviews'])} in total.")
    print("Now commit and push. Then delete the CSV from Downloads, since it holds reviewers' emails.")


if __name__ == "__main__":
    main()
