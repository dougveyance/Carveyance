#!/usr/bin/env python3
"""Carveyance: add the "Add to Home Screen" tags to every page.

Run from the repo root:   python3 pwa_inject.py
Preview without writing:   python3 pwa_inject.py --check

It puts a small <!-- carveyance-pwa --> block in each page's <head>: the app manifest, the
home screen icon, the theme color and the line that registers /sw.js. It's safe to run again:
it replaces its own block instead of adding a second one. FitDrive (fitdrive/) is skipped because
it has its own. Run it after seo_inject.py, and again whenever new pages are added.
"""
import os, re, sys

BLOCK = """<!-- carveyance-pwa -->
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#182F41">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Carveyance">
<script>if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").catch(function(){});});}</script>
<!-- /carveyance-pwa -->"""
SKIP_DIRS = {".git", "fitdrive", "node_modules", "_wordmark_backup", "netlify"}
OLD = re.compile(r"<!-- carveyance-pwa -->.*?<!-- /carveyance-pwa -->", re.S)
HEAD = re.compile(r"<head[^>]*>", re.I)

def main():
    check = "--check" in sys.argv
    added = updated = same = nohead = 0
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith(".html"):
                continue
            path = os.path.join(root, name)
            with open(path, encoding="utf-8") as f:
                html = f.read()
            if OLD.search(html):
                new = OLD.sub(lambda m: BLOCK, html, count=1)
                if new == html:
                    same += 1
                    continue
                updated += 1
            else:
                m = HEAD.search(html)
                if not m:
                    nohead += 1
                    print("  no <head>, skipped:", path)
                    continue
                new = html[:m.end()] + "\n" + BLOCK + html[m.end():]
                added += 1
            if not check:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new)
    verb = "would add" if check else "added"
    print(f"{verb} {added}, updated {updated}, already current {same}, skipped {nohead} without <head>")

if __name__ == "__main__":
    main()
