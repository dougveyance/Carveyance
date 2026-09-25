#!/usr/bin/env python3
"""
Carveyance link normalizer
--------------------------
Makes every article behave the same way:

  1. any wordmark or brand link pointing at "#" is pointed at "/" instead,
     so clicking CARVEYANCE always returns to the homepage
  2. the stray "Back to Articles" button, which only some older articles
     carry and which never worked, is removed
  3. anything else still pointing at "#" is listed at the end for review,
     not touched

Run it from the top level of the repo:

    cd ~/Documents/GitHub/Carveyance
    python3 fix_links.py

Safe to run twice: the second run finds nothing to do. It only edits links,
never your text, photos or charts.
"""
import re, os, sys, glob

BRAND_CLASSES = ("wordmark", "cv-brand", "cv-fbrand", "nav-brand", "f-wordmark",
                 "brand", "nav-wordmark", "ft-wm", "foot-brand", "f-wm")


def fix_brand_links(html):
    """<a class="...wordmark..." href="#"> -> href="/" (any attribute order)"""
    n = 0
    def swap(m):
        nonlocal n
        tag = m.group(0)
        if not any(c in tag for c in BRAND_CLASSES):
            return tag
        if not re.search(r'href\s*=\s*"#"', tag):
            return tag
        n += 1
        return re.sub(r'href\s*=\s*"#"', 'href="/"', tag)
    html = re.sub(r'<a\b[^>]*>', swap, html)
    return html, n


def drop_back_button(html):
    """remove the whole <a class="nav-back">...</a>, and an empty wrapper if that is all it held"""
    n = 0
    pat = re.compile(r'\s*<a\b[^>]*class="[^"]*nav-back[^"]*"[^>]*>.*?</a>', re.S)
    html, hits = pat.subn("", html)
    n += hits
    # tidy a wrapper left holding nothing but whitespace
    html = re.sub(r'<div class="(nav-back-wrap|backbar)"[^>]*>\s*</div>\s*', "", html)
    return html, n


def remaining_hash_links(html):
    out = []
    for m in re.finditer(r'<a\b[^>]*href\s*=\s*"#"[^>]*>(.{0,40}?)</a>', html, re.S):
        label = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(1))).strip()
        out.append(label or "(no text)")
    return out


def main():
    if not os.path.exists("articles.js"):
        sys.exit("Run this from the top level of the repo (the folder holding articles.js).")
    files = sorted(glob.glob(os.path.join("articles", "*", "index.html")))
    if not files:
        sys.exit("No article pages found under articles/.")

    brand_fixed = back_removed = touched = 0
    leftovers = {}

    for path in files:
        original = open(path, encoding="utf-8").read()
        html, b = fix_brand_links(original)
        html, k = drop_back_button(html)
        if html != original:
            open(path, "w", encoding="utf-8").write(html)
            touched += 1
        brand_fixed += b
        back_removed += k
        rest = remaining_hash_links(html)
        if rest:
            leftovers[path] = rest

    print(f"\nArticles scanned:        {len(files)}")
    print(f"Files changed:           {touched}")
    print(f"Home links repaired:     {brand_fixed}")
    print(f"Back buttons removed:    {back_removed}")

    if leftovers:
        print(f"\nStill pointing at '#', left alone for you to check:")
        for path, labels in leftovers.items():
            print(f"  {path}")
            for l in labels:
                print(f"      \u2192 {l}")
        print("\nSend that list over if you want them dealt with too.")
    else:
        print("\nNo dead links left anywhere.")

    print("\nNow run: python3 seo_inject.py   then commit and push.")


if __name__ == "__main__":
    main()
