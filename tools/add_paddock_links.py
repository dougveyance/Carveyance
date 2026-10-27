#!/usr/bin/env python3
"""
Carveyance — add The Paddock to the top menu
--------------------------------------------
Adds a "The Paddock" link right after "Events" in the top menu of every
page that has one (the home page, All Stories, the category pages, About,
Advertise, Subscribe and so on). On phones and tablets the Menu button
copies the same links, so it shows there too.

Run it once from the top level of the repo:

    cd ~/GitHub/Carveyance
    python3 tools/add_paddock_links.py

Safe to run twice: pages that already have the link are skipped. It skips
the pages the build scripts make (events, paddock), which already carry it.
It only touches the menu line; never your text, photos or charts.
"""
import glob, os, re, sys

if not os.path.exists("articles.js"):
    sys.exit("Run this from the top level of the repo (the folder holding articles.js).")

LINK = '<a href="/paddock/">The Paddock</a>'
pat = re.compile(r'(<div class="nav-center">.*?<a href="/events/"[^>]*>Events</a>)', re.S)
changed = skipped = 0
for p in glob.glob("**/*.html", recursive=True):
    if p.startswith(("events" + os.sep, "paddock" + os.sep, "node_modules")):
        continue
    s = open(p, encoding="utf-8").read()
    if 'href="/paddock/"' in s.split("</nav>")[0] if "</nav>" in s else True:
        skipped += 1; continue
    m = pat.search(s)
    if not m:
        continue
    indent = re.search(r'\n([ \t]*)<a href="/events/"', m.group(1))
    sep = "\n" + (indent.group(1) if indent else "    ")
    s = s[:m.end()] + sep + LINK + s[m.end():]
    open(p, "w", encoding="utf-8").write(s)
    changed += 1
print(f"Added The Paddock to the menu on {changed} pages ({skipped} already had it or have no menu).")
