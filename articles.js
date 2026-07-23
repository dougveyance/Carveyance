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
    icon:      "🚗",     <- OPTIONAL. only used by the Fun Facts
                              band on the homepage. any emoji.
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

/* ------------------------------------------------------------
   MOST READ  —  the sidebar ranking on the homepage.

   You have no analytics yet, so leave this EMPTY and the section
   fills itself with your longest reads automatically.

   When you do have numbers (Netlify Analytics, Plausible, GA),
   just paste your top slugs in, newest data wins:

       const MOST_READ = ["boosted", "moon-buggy", "vehicross"];

   Up to 5 are shown. Any slug that doesn't exist is ignored.
   ------------------------------------------------------------ */
const MOST_READ = [];

const ARTICLES = [

  {
    slug:      "tuxedo-and-smoking-jacket",
    title:     "The Tuxedo and the Smoking Jacket",
    subtitle:  "Two thoroughbred grand tourers. One built like a bank vault, one built like a seduction.",
    category:  "Comparisons",
    date:      "2026-07-23",
    readTime:  "27 min",
    blurb:     "The Mercedes-Benz R129 SL500 meets the 1998 Jaguar XKR. Germany's order against Britain's romance &mdash; and after six thousand words, no clean winner. There should not be one.",
    image:     "/assets/images/tuxedo-and-smoking-jacket.jpg",
    featured:  false
  },

  {
    slug:      "twelve-angry-cylinders",
    title:     "Twelve Angry Cylinders",
    subtitle:  "Two Kawasaki motorcycle engines. Two gearboxes. One gear lever. No differential.",
    category:  "Reviews",
    date:      "2026-07-23",
    readTime:  "24 min",
    blurb:     "Franco Sbarro's Super Twelve is the most gloriously ridiculous hot hatch ever built &mdash; the size of a Mini, with twelve cylinders and nothing at all connecting the left half of the car to the right.",
    image:     "/assets/images/twelve-angry-cylinders.jpg",
    featured:  false
  },


  {
    slug:      "ghost-run",
    title:     "Ghost Run",
    subtitle:  "An original screenplay — a Lotus Carlton, two Jaguar XJRs, and a Lancia Integrale at dawn",
    category:  "Short Stories",
    date:      "2026-07-23",
    readTime:  "30 min",
    blurb:     "Lyon, pre-dawn. A man who did four years he didn't earn, the partner who put him there, and six hundred metres of tunnel. In the style of Frankenheimer's Ronin.",
    image:     "/assets/images/ghost-run.jpg",
    featured:  false
  },


  {
    slug:      "zenith-bmw-z4-35is",
    title:     "Zenith",
    subtitle:  "On the BMW Z4 sDrive35is — and the art of the roadster the world drove past",
    category:  "Reviews",
    date:      "2026-07-23",
    readTime:  "21 min",
    blurb:     "335 horsepower, a folding hard top and one magnificent excuse to take the long way round. The Boxster won the comparison tests. Time is not convinced.",
    image:     "/assets/images/zenith-bmw-z4-35is.jpg",
    featured:  false
  },


  {
    slug:      "one-wheel-drive",
    title:     "One-Wheel Drive",
    subtitle:  "The differential solves cornering, then strands you in two inches of mud",
    category:  "How It Works",
    date:      "2026-07-23",
    readTime:  "19 min",
    blurb:     "My Volvo 240 got stuck on a wet lawn with one wheel spinning and the other doing nothing. My Cousin Vinny explains why — and a century of engineering has been trying to fix it ever since.",
    image:     "/assets/images/one-wheel-drive.jpg",
    featured:  false
  },
  {
    slug:      "tall-short-high-low",
    title:     "Tall, Short, High, Low",
    subtitle:  "One gear has four names, and half of them sound like opposites",
    category:  "How It Works",
    date:      "2026-07-23",
    readTime:  "16 min",
    blurb:     "A 4.10 is called low. A 2.73 is called high. The confusion isn't your fault, the fix is one sentence — and it explains exactly why your 35s made the truck feel gutless.",
    image:     "/assets/images/tall-short-high-low.jpg",
    featured:  false
  },
  {
    slug:      "white-lines",
    title:     "The Lines That Taught the World How to Drive",
    subtitle:  "How a stripe of paint became a language every driver reads without being taught",
    category:  "How It Works",
    date:      "2026-07-23",
    readTime:  "17 min",
    blurb:     "Four inches wide, costs almost nothing, and you've stopped seeing it. A watchmaker's problem, a doctor run off the road, a Yorkshireman who got the idea from a cat — and why heavy rain switches it all off.",
    image:     "/assets/images/white-lines.jpg",
    featured:  false
  },


  {
    slug:      "all-for-one",
    title:     "All for One",
    subtitle:  "Three American blades take Laguna Seca — and a fourth waits across the water",
    category:  "Comparisons",
    date:      "2026-07-23",
    readTime:  "18 min",
    blurb:     "The Dodge Viper GTS ACR, the Ford SVT Mustang Cobra R and Chevrolet's freshly sharpened 405-hp Corvette Z06 go at it on Laguna Seca. Then the gate opens for a Lancer Evo VII.",
    image:     "/assets/images/all-for-one.jpg",
    featured:  false
  },
  {
    slug:      "the-meter-the-app-and-the-machine",
    title:     "The Meter, the App & the Machine",
    subtitle:  "How the taxi lost the curb, and whether Waymo is quietly doing it again",
    category:  "Car Culture",
    date:      "2026-07-22",
    readTime:  "18 min",
    blurb:     "Fifteen years and three disruptions: the medallion collapse, the pivot into food delivery, and the strange finding that robotaxis are growing rideshare rather than killing it.",
    image:     "/assets/images/the-meter-the-app-and-the-machine.jpg",
    featured:  false
  },
  {
    slug:      "the-cost-of-being-interesting",
    title:     "The Cost of Being Interesting",
    subtitle:  "Why Detroit can't turn desire into reputation",
    category:  "Opinions",
    date:      "2026-07-21",
    readTime:  "16 min",
    blurb:     "Buick builds the most dependable mass-market cars in America and nobody believes it. The problem was never the engineering — identity and reputation are built by opposite methods.",
    image:     "/assets/images/the-cost-of-being-interesting.jpg",
    featured:  false
  },
  {
    slug:      "a-golden-relic",
    title:     "A Golden Relic",
    subtitle:  "Ford's Mazda-bred underdog beat its whole class, then got buried by its own name",
    category:  "Opinions",
    date:      "2026-07-20",
    readTime:  "10 min",
    blurb:     "The 1994 Probe GT beat the Prelude, the Eclipse, the Corrado and the MX-6 in a Car and Driver comparison. Then Ford killed it. My first car, and my first article.",
    image:     "/assets/images/a-golden-relic.jpg",
    featured:  false
  },
  {
    slug:      "new-2025-plug-in-hybrid-suvs",
    title:     "New 2025 Plug-In Hybrid SUVs",
    subtitle:  "Nine plug-in hybrids, weighed on what they actually ask of you",
    category:  "Reviews",
    date:      "2026-07-19",
    readTime:  "30 min",
    blurb:     "From the Outlander PHEV to the Wrangler 4xe — nine plug-in hybrid SUVs measured on range, price, practicality, and whether any of them are still fun to drive.",
    image:     "/assets/images/new-2025-plug-in-hybrid-suvs.jpg",
    featured:  false
  },


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
    icon:      "🌙",
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
    icon:      "🌧️",
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
    icon:      "⚡",
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

  {
    slug:      "low-and-behold",
    icon:      "🚛",
    title:     "Low and Behold",
    subtitle:  "The Steinwinter Supercargo \u2014 the lowest truck ever built",
    category:  "Fun Facts",
    date:      "2026-05-23",
    readTime:  "15 min",
    blurb:     "It slid clean under its own trailer, dazzled the world in 1983, secretly starred in your favorite absurd 80s TV show, and then vanished off the face of the earth. Killed by a single paragraph.",
    image:     "/assets/images/low-and-behold.jpg",
    featured:  false
  },

  {
    slug:      "nine-lives",
    title:     "Nine Lives",
    subtitle:  "The Jaguar bloodline, from the E-Type to the F-Type",
    category:  "Opinions",
    date:      "2026-05-20",
    readTime:  "19 min",
    blurb:     "For three he plays, for three he strays, for three he stays. One bloodline across nine lives \u2014 and at its heart, the modern classic that refuses to fade.",
    image:     "/assets/images/nine-lives.jpg",
    featured:  false
  },

  {
    slug:      "open-air-mazda-121",
    title:     "Open Air, No Apologies",
    subtitle:  "The 1990 Mazda 121 Canvas Top",
    category:  "Reviews",
    date:      "2026-05-16",
    readTime:  "15 min",
    blurb:     "Hiroshima asked a beautiful question: what if the roof simply rolled back? The most joyful car nobody expected \u2014 and the bubble-era optimism that made it possible.",
    image:     "/assets/images/open-air-mazda-121.jpg",
    featured:  false
  },

  {
    slug:      "red-means-stop",
    icon:      "🚦",
    title:     "Red Means Stop, Green Means Go!",
    subtitle:  "The accidental invention that saved millions",
    category:  "Fun Facts",
    date:      "2026-05-13",
    readTime:  "15 min",
    blurb:     "How humanity's love of a good drink accidentally invented the traffic light \u2014 and quietly saved millions of lives in the century that followed.",
    image:     "/assets/images/red-means-stop.jpg",
    featured:  false
  },

  {
    slug:      "simplify-then-add-soul",
    title:     "Simplify, Then Add Soul",
    subtitle:  "The full story of the Lotus Evora",
    category:  "Reviews",
    date:      "2026-05-09",
    readTime:  "21 min",
    blurb:     "The underdog's underrated masterpiece \u2014 the car that survived its maker's near-death, and quite possibly the last truly analog Lotus GT.",
    image:     "/assets/images/simplify-then-add-soul.jpg",
    featured:  false
  },

  {
    slug:      "the-unsung-hero-996",
    title:     "The Unsung Hero",
    subtitle:  "The Porsche 996 \u2014 the 911 that saved Porsche and got hated for it",
    category:  "Reviews",
    date:      "2026-05-06",
    readTime:  "55 min",
    blurb:     "Weissach, 1993: an impossible assignment. Save the company, keep the 911, and accept that everyone will resent you for it. The definitive account of the most unfairly maligned 911 ever built.",
    image:     "/assets/images/the-unsung-hero-996.jpg",
    featured:  false
  },

  {
    slug:      "vehicross",
    title:     "The VehiCROSS",
    subtitle:  "Isuzu's lost legend",
    category:  "Car Culture",
    date:      "2026-05-02",
    readTime:  "21 min",
    blurb:     "Twelve sensors before anyone else had one. Motorcycle suspension on a street truck. A concept car that refused to stay a concept \u2014 and a designer who was right about ten years too early.",
    image:     "/assets/images/vehicross.jpg",
    featured:  false
  },

  {
    slug:      "topless-beach",
    title:     "Topless Beach",
    subtitle:  "The Felber Ferrari Beach Car",
    category:  "Fun Facts",
    icon:      "\u2600\ufe0f",
    date:      "2026-04-28",
    readTime:  "16 min",
    blurb:     "One V12, no roof, no doors, and not a single regret \u2014 the maddest, coolest, most gloriously unnecessary Ferrari ever built. And at long last, a home in the Swiss countryside.",
    image:     "/assets/images/topless-beach.jpg",
    featured:  false
  },

  {
    slug:      "ds-assassination",
    title:     "The Car That Refused to Die",
    subtitle:  "Petit-Clamart, 1962 \u2014 how a comfortable ride saved a president",
    category:  "Fun Facts",
    icon:      "\U0001f3af",
    date:      "2026-04-24",
    readTime:  "14 min",
    blurb:     "On an August night outside Paris: fourteen gunmen, more than 140 bullets, two tires shot out at speed \u2014 and one extraordinary automobile that hauled Charles de Gaulle out alive.",
    image:     "/assets/images/ds-assassination.jpg",
    featured:  false
  },

  {
    slug:      "jaguar-mk2",
    title:     "The Gentleman Villain",
    subtitle:  "How the Jaguar Mark II became Britain's most beautiful getaway car",
    category:  "Reviews",
    date:      "2026-04-20",
    readTime:  "18 min",
    blurb:     "Grace. Space. Pace. And something in the pocket. The bank robbers wanted one. So did the police \u2014 because nothing else on British roads could catch it.",
    image:     "/assets/images/jaguar-mk2.jpg",
    featured:  false
  },

];
