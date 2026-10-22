# How to publish an article

Three steps. Five minutes. No code.

---

## Step 1 — Drop the article in

Put the article's HTML file in its own folder inside `articles/`, named
`index.html`.

```
articles/
  boosted/
    index.html        ->  carveyance.com/articles/boosted/
```

The folder name is the **slug**: all lowercase, hyphens instead of spaces,
no punctuation. "The Goddess of Serenity" → `goddess-of-serenity`

## Step 2 — Add one entry to `articles.js`

Open **`articles.js`** (it's in the main Carveyance folder). Copy this
block, paste it at the **top** of the list, and fill it in:

```js
  {
    slug:      "goddess-of-serenity",
    title:     "The Goddess of Serenity",
    subtitle:  "Citroën built a car that refused to touch the road",
    category:  "Fun Facts",
    date:      "2026-07-20",
    readTime:  "9 min",
    blurb:     "One or two sentences. This is what shows on the card.",
    image:     "https://images.unsplash.com/photo-xxxx?w=900&q=80",
    featured:  false
  },
```

That's the whole job. From this one entry the site automatically puts the
article on the homepage, in the scrolling ticker, in **Latest Stories**, and
on its **category page**. You never edit the homepage.

### The only rules

| Field | Rule |
|---|---|
| `slug` | Must match the folder name in `articles/` exactly |
| `category` | Must be spelled exactly as one of the categories below |
| `date` | `YYYY-MM-DD`. This controls the order — newest first |
| `featured` | `true` = the big homepage hero. Only **one** article at a time |
| everything else | Keep the quotes and the commas as shown |

**Valid categories** (spelling must match exactly):

```
How It Works    Reviews         Comparisons     Car Culture
Road Trips      Opinions        Advice & Tips   Fun Facts
Short Stories   Interviews      News
```

## Step 3 — Push it live

1. Open **GitHub Desktop**. It shows what changed.
2. Type a summary, e.g. `Add Goddess of Serenity`.
3. Click **Commit to main**.
4. Click **Push origin**.

Netlify redeploys carveyance.com automatically. Live in about a minute.

---

## Before you push: preview it

Double-click `index.html` in your Carveyance folder to open it in a browser.

**Note:** article links and category pages won't work in this local preview
(they need a real server) — but you'll see whether your card, headline, and
image look right. Everything works properly once it's live.

---

## Common mistakes

| Symptom | Cause |
|---|---|
| Article doesn't appear anywhere | `category` is misspelled — check the list above |
| Card appears, but clicking 404s | `slug` doesn't match the folder name in `articles/` |
| Homepage looks broken/empty | A missing comma or quote in `articles.js` |
| Two heroes / wrong hero | More than one article has `featured: true` |

If the homepage ever goes blank after an edit, it's almost always a typo in
`articles.js`. Undo your entry, push, and it comes right back.

---

## Adding a brand-new category

Categories live in two places: the list at the top of
`assets/js/carveyance.js`, and a folder in `categories/`. Ask Claude to add
one — it's a two-minute job and not worth doing by hand.

---

## The Events page

`carveyance.com/events/` reads one file: **`events.js`**, at the top level
next to `articles.js`. It holds two lists.

- `EVENTS` — dated shows, concours, races and auctions. Each one hides itself
  the day after its `end` date, so old events never need deleting by hand.
- `MEETS` — weekly and monthly meets (Cars & Coffee, cruise nights). These
  stay up until someone removes them.

To add one by hand, copy an existing entry in the right list and change the
values. The rules:

| Field | Rule |
|---|---|
| `start`, `end` | `YYYY-MM-DD`. One-day event: make them the same |
| `region` | Exactly one of: `LA & South Bay`, `Southern California`, `West`, `Northwest`, `Mountain`, `Texas & South`, `Midwest`, `Southeast`, `Mid-Atlantic`, `Northeast` |
| `url` | The organizer's own page, starting `https://`. Leave `""` if there isn't one |
| `instagram` | `@handle`, or `""` |
| `pick` | `true` puts the orange Carveyance Pick badge on it |
| `added` | `YYYY-MM-DD` the day it went on the page; drives the "Most Recently Added" sort |
| `image` | Optional, e.g. `"/assets/events/<id>.jpg"`. Only a flyer or photo the organizer sent (via the form, with the rights box ticked) or one you supplied. Leave it out and the card shows a Carveyance tile instead |
| `status` | Leave out normally. `"canceled"`, `"postponed"`, `"moved"` or `"changed"` puts a notice on the card and the event page and tells Google. `"expected"` means the organizer hasn't posted dates yet |
| `note` | One short line shown with a status, e.g. `"Rained out this Saturday"` |
| `lat`, `lng` | Map position of the town, added by Claude's weekly check. Leave them alone |
| `EVENTS_UPDATED` | Change this date at the top when you edit the file |

Event submissions from the form at the bottom of the page arrive in Netlify
under **Forms → event-submission**, the same place the contributor form lands.
A submitted flyer comes through as a file attachment on that submission. To use
it, save it into `assets/events/` named after the entry's `id`, landscape, about
1200px wide, and set that entry's `image`.

### Event pages, the map and the home-screen app

Every listing also has its own page, `carveyance.com/events/<id>/`, which is
what Google shows for "car show near me" searches. They are built from
events.js by a script, so after ANY change to events.js run, from the repo root:

    python3 events_build.py     (rebuilds events/<id>/ pages, removes ended ones)
    python3 fix_links.py
    python3 seo_inject.py       (adds the event pages to sitemap.xml)

Everything inside the `events/` folder is either built by that script or part
of the Events app (index.html, events-common.js, sw.js, manifest.webmanifest,
icon-maskable-512.png). When a zip from Claude includes the whole `events`
folder, it is safe to replace the folder whole. That is NOT true of the
`articles` folder: never replace `articles` whole, only the files inside it.

`tools/geocode_events.js` is for Claude's weekly check; you never need to run it.

The map uses OpenStreetMap's free tiles, which are fine at this site's
traffic. If the Events page ever gets heavy use, switch the one tile line in
events/index.html to a paid tile service.

The weekly events check from Claude sends a replacement `events.js` and a
fresh `events` folder with drop instructions; drop them in and push.

### The Menu button on phones and tablets

On screens narrower than about 1,240px the section links in the top bar are
hidden. `assets/js/cv-menu.js` adds a Menu button there that opens the same
links in a panel (and, on the home page, Write for Us). It copies whatever is
in the page's top-bar links, so adding a section to the nav needs no change to
the script. Any new page that has the full top bar needs this one line just
before `</body>`:

    <script src="/assets/js/cv-menu.js" defer></script>

The Events pages load it automatically through `events/events-common.js`.
