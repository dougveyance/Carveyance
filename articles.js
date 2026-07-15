/* ============================================================
   CARVEYANCE — MASTER ARTICLE LIST
   ============================================================

   This is the ONLY file you edit when you publish an article.

   Add a new block at the TOP of the list below, and the article
   automatically appears on the homepage, in the ticker, in
   "Latest Stories", and on its category page. Nothing else to do.

   ------------------------------------------------------------
   COPY THIS TEMPLATE, paste it at the top of the list, fill it in:

  {
    slug:      "your-article-folder-name",
    title:     "Your Headline",
    subtitle:  "The italic line under the headline",
    category:  "How It Works",
    date:      "2026-07-14",
    readTime:  "8 min",
    blurb:     "One or two sentences that appear on the card.",
    image:     "https://images.unsplash.com/photo-xxxxx?w=900&q=80",
    featured:  false
  },

   ------------------------------------------------------------
   RULES (keep these and nothing breaks):

   1. slug     = the exact folder name inside /articles/
                 e.g. "boosted"  ->  /articles/boosted/
   2. category = must be spelled EXACTLY as one of these:
                 "How It Works"   "Reviews"        "Comparisons"
                 "Car Culture"    "Road Trips"     "Opinions"
                 "Advice & Tips"  "Fun Facts"      "Short Stories"
                 "Interviews"     "News"
   3. date     = YYYY-MM-DD  (this controls the order — newest first)
   4. featured = true puts it in the big homepage slot.
                 Only ONE article should be true at a time.
   5. Keep the commas and quotes exactly as shown.
   ============================================================ */

const ARTICLES = [

  {
    slug:      "boosted",
    title:     "Boosted",
    subtitle:  "How turbochargers and superchargers learned to bend the atmosphere",
    category:  "How It Works",
    date:      "2026-07-14",
    readTime:  "38 min",
    blurb:     "Every piston engine ever built shares one silent partner and one quiet tyrant — the atmosphere. This is the story of the machines that refuse to accept the air at the pressure nature supplied.",
    image:     "https://images.unsplash.com/photo-1518987048-93e29699e79a?w=900&q=80",
    featured:  true
  },

];
