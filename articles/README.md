# Articles

Each article is its own **self-contained HTML file** (base64-embedded images,
Google Fonts as the only external dependency) — exactly what the Carveyance
pipeline already produces.

## How to add an article

Give each story a folder named after its URL slug, with the file named
`index.html` inside it:

```
articles/
  boosted/
    index.html          →  carveyance.com/articles/boosted/
  goddess-of-serenity/
    index.html          →  carveyance.com/articles/goddess-of-serenity/
```

Using a folder + `index.html` gives you clean URLs with no `.html` on the end.

### Slug rules
- all lowercase
- words separated by hyphens
- no spaces, no punctuation, no accents
  (e.g. "The Goddess of Serenity" → `goddess-of-serenity`)

## Linking to an article from the homepage
In `index.html`, point the card/link at the folder:

```html
<a href="/articles/boosted/">Read Story</a>
```

That's it — commit, push, and Netlify publishes it automatically.
