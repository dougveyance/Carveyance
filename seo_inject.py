#!/usr/bin/env python3
"""
Carveyance SEO injector
-----------------------
Adds canonical, Open Graph, Twitter and Article structured data to every
article page, using the data already in articles.js. Also rebuilds
sitemap.xml so it lists every article.

Run it from the top level of the repo:

    cd ~/Documents/GitHub/Carveyance
    python3 seo_inject.py

It only touches the <head> of each article page. It never edits your text,
your photos or your charts. Running it twice is safe: it replaces its own
block rather than adding a second one. It prints a summary at the end.
"""
import re, os, sys, json, datetime, html

SITE = "https://carveyance.com"
PUBLISHER = "Carveyance"
START, END = "<!-- carveyance-seo -->", "<!-- /carveyance-seo -->"

CATS = ["how-it-works", "reviews", "comparisons", "car-culture", "road-trips",
        "opinions", "advice-tips", "fun-facts", "short-stories", "interviews", "news"]


def read_articles(path="articles.js"):
    src = open(path, encoding="utf-8").read()
    body = src[src.find("const ARTICLES"):]
    body = re.sub(r"/\*.*?\*/", "", body, flags=re.S)          # drop the template comment
    out = []
    for m in re.finditer(r"\{(.*?)\n  \}", body, re.S):
        blk = m.group(1)
        def g(key):
            hit = re.search(r'"?%s"?\s*:\s*"([^"]*)"' % key, blk)
            return hit.group(1) if hit else ""
        if g("slug"):
            out.append({k: g(k) for k in
                        ("slug", "title", "seoTitle", "subtitle", "category", "date", "readTime", "blurb", "image")})
    return out


def byline_of(page_html):
    """pull the pen name out of the byline line, if the page has one"""
    m = re.search(r"By ([A-Z][A-Za-z\.\-']+(?: [A-Z][A-Za-z\.\-']+)+)\s*(?:·|&middot;|\|)", page_html)
    return m.group(1) if m else PUBLISHER


def esc(s):
    return html.escape(s or "", quote=True)


def seo_block(a, author):
    """seoTitle, when present in articles.js, is what Google shows"""
    url = f"{SITE}/articles/{a['slug']}/"
    img = SITE + a["image"] if a["image"].startswith("/") else a["image"]
    desc = a["blurb"] or a["subtitle"]
    ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": a["title"][:110],
        "description": desc,
        "image": [img],
        "datePublished": a["date"],
        "dateModified": a["date"],
        "author": {"@type": "Person", "name": author},
        "publisher": {"@type": "Organization", "name": PUBLISHER,
                      "url": SITE + "/"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "articleSection": a["category"],
        "isAccessibleForFree": True,
    }
    shown = a.get("seoTitle") or a["title"]
    return f"""{START}
<link rel="canonical" href="{url}">
<meta name="description" content="{esc(desc)}">
<meta name="author" content="{esc(author)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="{PUBLISHER}">
<meta property="og:title" content="{esc(shown)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{img}">
<meta property="og:url" content="{url}">
<meta property="article:published_time" content="{a['date']}">
<meta property="article:section" content="{esc(a['category'])}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(shown)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{img}">
<script type="application/ld+json">
{json.dumps(ld, indent=2, ensure_ascii=False)}
</script>
{END}"""


def set_title(page_html, shown):
    """replace the <title> element so search results show the searchable version"""
    return re.sub(r"<title>.*?</title>", "<title>" + html.escape(shown) + "</title>", page_html, count=1, flags=re.S)


def inject(page_html, block):
    """replace an existing block, else insert just before </head>"""
    if START in page_html:
        return re.sub(re.escape(START) + r".*?" + re.escape(END), block, page_html, flags=re.S)
    # strip a plain description tag so we don't end up with two
    page_html = re.sub(r'\n?\s*<meta name="description"[^>]*>', "", page_html, count=1)
    return page_html.replace("</head>", block + "\n</head>", 1)


def write_sitemap(arts):
    today = datetime.date.today().isoformat()
    rows = [(f"{SITE}/", today, "daily", "1.0"),
            (f"{SITE}/articles/", today, "daily", "0.9"),
            (f"{SITE}/about/", today, "monthly", "0.5")]
    rows += [(f"{SITE}/categories/{c}/", today, "weekly", "0.7") for c in CATS]
    rows += [(f"{SITE}/articles/{a['slug']}/", a["date"], "monthly", "0.8") for a in arts]
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, mod, freq, pri in rows:
        xml.append("  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>"
                   "\n    <changefreq>%s</changefreq>\n    <priority>%s</priority>\n  </url>"
                   % (loc, mod, freq, pri))
    xml.append("</urlset>")
    open("sitemap.xml", "w", encoding="utf-8").write("\n".join(xml))
    return len(rows)


def main():
    if not os.path.exists("articles.js"):
        sys.exit("Run this from the top level of the repo (the folder holding articles.js).")
    arts = read_articles()
    done = missing = 0
    for a in arts:
        path = os.path.join("articles", a["slug"], "index.html")
        if not os.path.exists(path):
            print("  no page for", a["slug"]); missing += 1; continue
        page = open(path, encoding="utf-8").read()
        new = inject(page, seo_block(a, byline_of(page)))
        new = set_title(new, a.get("seoTitle") or a["title"])
        if new != page:
            open(path, "w", encoding="utf-8").write(new)
        done += 1
    n = write_sitemap(arts)
    print(f"\nArticles tagged: {done}")
    if missing:
        print(f"Entries with no page on disk: {missing}")
    print(f"sitemap.xml rebuilt with {n} URLs")
    print("\nNow commit and push, then resubmit the sitemap in Google Search Console.")


if __name__ == "__main__":
    main()
