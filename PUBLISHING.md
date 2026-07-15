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
