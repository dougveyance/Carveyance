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
    image:     "/assets/images/your-article-folder-name.jpg",
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
   5. image    = put the card image in /assets/images/ and point to it.
   6. Keep the commas and quotes exactly as shown.
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
    image:     "/assets/images/boosted.jpg",
    featured:  true
  },

  {
    slug:      "moon-buggy",
    title:     "$38 Million and One Horsepower",
    subtitle:  "The Apollo Lunar Roving Vehicle",
    category:  "Fun Facts",
    date:      "2026-07-11",
    readTime:  "30 min",
    blurb:     "The most expensive car ever built made roughly one horsepower, wore tyres woven from piano wire, was designed by a penniless refugee, folded into a spaceship, and is still parked exactly where we left it.",
    image:     "/assets/images/moon-buggy.jpg",
    featured:  false
  },

  {
    slug:      "blame-it-on-the-rain",
    title:     "Blame It on the Rain",
    subtitle:  "The human history of the windshield wiper",
    category:  "Fun Facts",
    date:      "2026-07-09",
    readTime:  "18 min",
    blurb:     "A lip-synced megahit, a forgotten patent, a one-eyed professor, and a hundred years of the most underrated safety device on your car. Surprisingly dramatic — and deeply unjust.",
    image:     "/assets/images/blame-it-on-the-rain.jpg",
    featured:  false
  },

  {
    slug:      "the-borrowed-crown",
    title:     "The Borrowed Crown",
    subtitle:  "Monte Carlo, 1978 — a true story",
    category:  "Car Culture",
    date:      "2026-07-07",
    readTime:  "15 min",
    blurb:     "How a rented Porsche 911, a two-week budget, and a cigarette company's spare change humiliated the entire factory establishment at the 1978 Monte Carlo Rally.",
    image:     "/assets/images/the-borrowed-crown.jpg",
    featured:  false
  },

  {
    slug:      "bmw-507",
    title:     "The Beautiful Mistake",
    subtitle:  "The car that almost broke BMW",
    category:  "Reviews",
    date:      "2026-07-03",
    readTime:  "16 min",
    blurb:     "It was built to save BMW. Instead it nearly sank the company that made it — and quietly became the most romantic car Munich has ever built.",
    image:     "/assets/images/bmw-507.jpg",
    featured:  false
  },

  {
    slug:      "black-swan-allroad",
    title:     "Black Swan",
    subtitle:  "The car no one saw coming — and no one ever truly forgot",
    category:  "Reviews",
    date:      "2026-06-30",
    readTime:  "11 min",
    blurb:     "Audi built a lifted, air-sprung, twin-turbo wagon that refused to pick a lane. It was too clever for its own good — and the ones that survived became a cult.",
    image:     "/assets/images/black-swan-allroad.jpg",
    featured:  false
  },

];
