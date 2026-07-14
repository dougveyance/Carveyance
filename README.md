# Carveyance

The independent automotive publication — *for the love of the drive.*
Los Angeles, CA · [carveyance.com](https://carveyance.com)

This is the source for the Carveyance website. It's a hand-authored **static
site** (plain HTML/CSS/JS — no build step), deployed on **Netlify** with
automatic deploys from this GitHub repo.

---

## Repo structure

```
carveyance/
├── index.html          The homepage
├── 404.html            Custom "wrong turn" page
├── netlify.toml        Netlify config (headers, publish dir)
├── .gitignore
├── articles/           One folder per article (see articles/README.md)
│   └── README.md
└── assets/
    └── images/         Shared images (og image, logo, etc.)
```

## How deploys work

1. You make a change (edit a file, or add an article folder).
2. You **commit** and **push** to GitHub.
3. Netlify sees the push and **redeploys carveyance.com automatically** —
   usually live within a minute.

No more drag-and-drop. Push = publish.

## Adding an article

See [`articles/README.md`](articles/README.md). Short version: drop the
article's `index.html` into `articles/<slug>/`, link to it from the homepage,
commit, push.

## Contact forms

The homepage has two forms, both handled by **Netlify Forms** (no backend):

| Form on the page            | Netlify form name  |
|-----------------------------|--------------------|
| "Submit Your Story" (modal) | `story-submission` |
| Inline contributor form     | `story-pitch`      |

Submissions show up in **Netlify → your site → Forms**. Turn on email
notifications there (Forms → Settings & usage → Form notifications) so pitches
land in your inbox.

## Local preview

It's just static files — open `index.html` in a browser to preview. (Note: the
form success message is optimistic locally; real submissions only record once
the site is live on Netlify.)
