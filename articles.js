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
   2. category = must be spelled EXACTLY as one of these:
                 "How It Works"   "Reviews"        "Comparisons"
                 "Car Culture"    "Road Trips"     "Opinions"
                 "Advice & Tips"  "Fun Facts"      "Short Stories"
                 "Interviews"     "News"
   3. date     = YYYY-MM-DD  (controls the order — newest first)
   4. featured = true puts it in the big homepage slot. Only ONE.
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

  {
    slug:      "front-rear-or-all-four",
    title:     "Front, Rear, or All Four?",
    subtitle:  "A field guide to FWD, RWD, and AWD",
    category:  "How It Works",
    date:      "2026-06-26",
    readTime:  "26 min",
    blurb:     "Three ways to move a car, told through a Citroën, a BMW, and a Subaru — three ways to feel alive, and not one of them is the \"right\" answer.",
    image:     "/assets/images/front-rear-or-all-four.jpg",
    featured:  false
  },

  {
    slug:      "the-long-road-home",
    title:     "The Long Road Home",
    subtitle:  "Importing your dream car, start to finish",
    category:  "How It Works",
    date:      "2026-06-23",
    readTime:  "20 min",
    blurb:     "A field guide to legally bringing a foreign vehicle into the United States — and why the cars you grew up wanting are finally within reach.",
    image:     "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80",
    featured:  false
  },

  {
    slug:      "cars-are-safer-now",
    title:     "Cars Are Safer Now, But Is Driving?",
    subtitle:  "Cars have never been safer. Driving is another question entirely",
    category:  "Opinions",
    date:      "2026-06-20",
    readTime:  "22 min",
    blurb:     "Airbags, crumple zones, lane assist, ten airbags and a computer watching the lines. The machines have never been better at keeping you alive. So why does the road feel worse?",
    image:     "/assets/images/cars-are-safer-now.jpg",
    featured:  false
  },

  {
    slug:      "girls-know-best",
    title:     "Girls Know Best",
    subtitle:  "How Subaru changed what a car company could stand for",
    category:  "Opinions",
    date:      "2026-06-17",
    readTime:  "11 min",
    blurb:     "A Tamiya Subaru Brat at the bottom of a Manila swimming pool, a tennis legend, and the marketing decision that made a car company stand for something. Leave your ego and grab a Subaru.",
    image:     "/assets/images/girls-know-best.jpg",
    featured:  false
  },

  {
    slug:      "frankenstein-monster-g",
    title:     "Frankenstein's Awesome Monster",
    subtitle:  "The Sbarro Monster G",
    category:  "Fun Facts",
    date:      "2026-06-13",
    readTime:  "10 min",
    blurb:     "A 28-year-old German with 150 acres. A Swiss mad genius with no rules. Boeing 727 landing gear from a crashed plane. A Mercedes V8 with nothing to prove. Either engineering brilliance or complete insanity. Possibly both.",
    image:     "/assets/images/frankenstein-monster-g.jpg",
    featured:  false
  },

  {
    slug:      "goddess-of-serenity",
    title:     "The Goddess of Serenity",
    subtitle:  "A love letter to the Citroën DS",
    category:  "Reviews",
    date:      "2026-06-10",
    readTime:  "16 min",
    blurb:     "She arrived looking as though she had fallen from the sky, floated over France's worst roads, outran an assassination, and was later voted the most beautiful car ever made.",
    image:     "/assets/images/goddess-of-serenity.jpg",
    featured:  false
  },

  {
    slug:      "ghost-in-ice-green",
    title:     "The Ghost in Ice Green",
    subtitle:  "1979 Porsche 911 SC Targa — European road impressions",
    category:  "Reviews",
    date:      "2026-06-06",
    readTime:  "14 min",
    blurb:     "There are cars that perform. And there are cars that talk back. European-spec, factory sports suspension, air-cooled — a conversation with the 930/03 flat-six, from the driver's seat.",
    image:     "/assets/images/ghost-in-ice-green.jpg",
    featured:  false
  },

  {
    slug:      "grey-poupon",
    title:     "Grey Poupon",
    subtitle:  "On the Rolls-Royce Corniche Convertible — and the art of knowing what you want",
    category:  "Opinions",
    date:      "2026-06-03",
    readTime:  "21 min",
    blurb:     "Twenty-four years, one vision, and roughly 5,160 cars. What owning the Corniche says about you — and why that still matters.",
    image:     "/assets/images/grey-poupon.jpg",
    featured:  false
  },

  {
    slug:      "less-is-more",
    title:     "Less Is, More.",
    subtitle:  "The case for small, simple, forgotten",
    category:  "Opinions",
    date:      "2026-05-30",
    readTime:  "19 min",
    blurb:     "On Wranglers, forgotten Japanese runabouts, and why the best things leave you something to do. The Betty Crocker effect, and a generation choosing less.",
    image:     "/assets/images/less-is-more.jpg",
    featured:  false
  },

  {
    slug:      "best-vehicle-ever-designed",
    title:     "The Best Vehicle Ever Designed",
    subtitle:  "No, really. It's the van",
    category:  "Opinions",
    date:      "2026-05-27",
    readTime:  "23 min",
    blurb:     "Nobody would describe it as beautiful. It is the invisible backbone of everything — from Woodstock to the A-Team to a pandemic that made the world want freedom on four wheels.",
    image:     "/assets/images/best-vehicle-ever-designed.jpg",
    featured:  false
  },

];
