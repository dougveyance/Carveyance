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
    slug:      "auf-wiedersehen-928",
    title:     "Auf Wiedersehen, 928",
    subtitle:  "The Porsche 928 GTS and the long defeat of the best car Stuttgart ever built",
    category:  "Reviews",
    date:      "2026-08-14",
    readTime:  "28 min",
    blurb:     "Porsche built a car to replace the 911. The 911 declined to be replaced. Eighteen years and 61,056 cars later, the GTS walked out of Zuffenhausen as the finest grand tourer Stuttgart ever built \u2014 and almost nobody bought it.",
    image:     "/assets/images/auf-wiedersehen-928.jpg",
    featured:  false
  },

  {
    slug:      "decades-in-a-second",
    title:     "Decades in a Second",
    subtitle:  "What a car badge is actually telling you, and why you read it first",
    category:  "Car Culture",
    date:      "2026-07-28",
    readTime:  "19 min",
    blurb:     "Two centimeters of enamel can carry a war memorial, a merger, a medieval coat of arms or a gear tooth \u2014 and you decode it before you have consciously looked at the car. Eleven badges, and where they really came from.",
    image:     "/assets/images/decades-in-a-second.jpg",
    featured:  false
  },

  {
    slug:      "herringbone",
    title:     "Herringbone",
    subtitle:  "Everyone else picked an animal. Citro\u00ebn picked a gear tooth.",
    category:  "How It Works",
    date:      "2026-07-28",
    readTime:  "9 min",
    blurb:     "The double chevron is not a metaphor. It is a drawing of a real gear that Andr\u00e9 Citro\u00ebn bought the rights to in 1900 \u2014 and it explains the whole company, from the Traction Avant to the DS.",
    image:     "/assets/images/herringbone.jpg",
    vehicles:  ["Citro\u00ebn Traction Avant", "Citro\u00ebn 2CV", "Citro\u00ebn DS", "Citro\u00ebn SM"],
    featured:  false
  },

  {
    slug:      "now-boarding",
    title:     "Now Boarding",
    subtitle:  "Seven engineers, one Samsonite, and a pocket-sized engine",
    category:  "Fun Facts",
    date:      "2026-07-27",
    readTime:  "6 min",
    blurb:     "Mazda gave its engineers a blank brief and a company competition. Seven of them came back with a suitcase that drove. It is the most delightfully absurd vehicle the company ever built \u2014 and the purest expression of what Mazda actually is.",
    image:     "/assets/images/now-boarding.jpg",
    icon:      "🧳",
    vehicles:  ["Mazda Suitcase Car"],
    featured:  false
  },

  {
    slug:      "the-king-was-italian",
    title:     "The King Was Italian",
    subtitle:  "Everyone crowns the Golf GTI. They crowned the wrong car.",
    category:  "Reviews",
    date:      "2026-07-26",
    readTime:  "26 min",
    blurb:     "Lancia took a boxy 1979 family hatchback, bolted a turbo to it, drove all four wheels, and won six consecutive World Rally Championships \u2014 a record nothing has touched in thirty-four years. The Golf invented the hot hatch. The 205 perfected it. The Integrale went out and proved it.",
    image:     "/assets/images/the-king-was-italian.jpg",
    vehicles:  ["Lancia Delta Integrale", "Lancia Delta HF Integrale Evoluzione"],
    featured:  false
  },

  {
    slug:      "the-little-red-elephant",
    title:     "The Little Red Elephant",
    subtitle:  "How a club for people who had bought six Lancias became the best badge in motorsport",
    category:  "Car Culture",
    date:      "2026-07-25",
    readTime:  "13 min",
    blurb:     "AMG was two engineers in an old mill. BMW M was a corporate subsidiary. Lancia HF began as a members\u2019 club \u2014 and then the PR chief\u2019s son founded the racing team behind his own company\u2019s back. The strangest, best origin story any performance division has.",
    image:     "/assets/images/the-little-red-elephant.jpg",
    icon:      "🐘",
    vehicles:  ["Lancia Fulvia HF", "Lancia Delta HF Integrale", "Lancia Stratos HF", "Lancia Rally 037", "Lancia Ypsilon HF"],
    featured:  false
  },

  {
    slug:      "her-majesty-drives-herself",
    title:     "Her Majesty Drives Herself",
    subtitle:  "Citro\u00ebn bought Maserati, spent nine years in the dark, and built the most advanced car of its century.",
    category:  "Reviews",
    date:      "2026-07-24",
    readTime:  "22 min",
    blurb:     "Six headlamps, two turns lock to lock, and a Maserati V6 mounted behind the front axle. The SM out-braked everything on earth, won the cruelest rally on the calendar on its debut, and then died of a bumper regulation. Fifty years on it is still the most car you can buy for thirty-five grand.",
    image:     "/assets/images/her-majesty-drives-herself.jpg",
    vehicles:  ["Citro\u00ebn SM"],
    featured:  false
  },

  {
    slug:      "the-rotary-club",
    title:     "The Rotary Club",
    subtitle:  "Three rotors, two turbos, the world's first GPS touchscreen \u2014 and the worst launch timing in history.",
    category:  "Reviews",
    date:      "2026-07-23",
    readTime:  "19 min",
    blurb:     "Mazda's Eunos Cosmo was the only three-rotor road car ever built, wrapped in French elm and a color touchscreen a decade early \u2014 then launched into the exact month Japan's bubble burst. It arrived early, in a tuxedo, to a party that had already been canceled.",
    image:     "/assets/images/the-rotary-club.jpg",
    vehicles:  ["Mazda Eunos Cosmo"],
    featured:  false
  },

  {
    slug:      "first-flight",
    title:     "First Flight",
    subtitle:  "343 cars, one impossible engine, and the 84-hour race that made the world believe.",
    category:  "Reviews",
    date:      "2026-07-23",
    readTime:  "14 min",
    blurb:     "The Mazda Cosmo Sport Series I had to work \u2014 once, in public \u2014 or Mazda's whole rotary gamble was dead. It worked. Then it drove 84 hours around the N\u00fcrburgring and finished fourth, beaten only by Porsche and Lancia. The full story of the car that proved the rotary was real.",
    image:     "/assets/images/first-flight.jpg",
    vehicles:  ["Mazda Cosmo Sport Series I"],
    featured:  false
  },

  {
    slug:      "the-six-that-got-away",
    title:     "Half the Number, Twice the Car",
    subtitle:  "The grey-market 280 SL America was never sold \u2014 half the engine of the 560, and twice the car to drive.",
    category:  "Reviews",
    date:      "2026-07-23",
    readTime:  "12 min",
    blurb:     "The 560 SL was the one the dealer would sell you \u2014 5.6 liters, effortless, everywhere. The 280 SL was the one they wouldn't: a lighter, revvier, grey-market six that was, to the right kind of driver, exactly twice the car. Half the number. Twice the fun.",
    image:     "/assets/images/the-six-that-got-away.jpg",
    vehicles:  ["Mercedes-Benz 280 SL", "Mercedes-Benz 560 SL"],
    featured:  false
  },

  {
    slug:      "scale-model-warfare",
    title:     "Scale Model Warfare",
    subtitle:  "Two tiny cars, seventy years of rivalry, and the twist where the winner ends up owning the loser.",
    category:  "Fun Facts",
    date:      "2026-07-23",
    readTime:  "23 min",
    blurb:     "Matchbox built honest little models of real cars. Hot Wheels built weapons for an orange track. The full story of how the underdog ambushed the king \u2014 and how, decades later, Mattel bought Matchbox outright.",
    image:     "/assets/images/scale-model-warfare.jpg",
    icon:      "\ud83c\udfce\ufe0f",
    vehicles:  ["Matchbox", "Hot Wheels"],
    featured:  false
  },

  {
    slug:      "born-this-way",
    title:     "Born This Way",
    subtitle:  "A two-year-old, a Barbie event full of grown men, and the real science of why we fall in love with cars.",
    category:  "Opinions",
    date:      "2026-07-23",
    readTime:  "17 min",
    blurb:     "Half of us are hooked by age four. A rabbit hole into the developmental psychology of car-love \u2014 why kids sort, line up, and obsess over small machines, and why the adults they become never quite let go.",
    image:     "/assets/images/born-this-way.jpg",
    featured:  false
  },

  {
    slug:      "freightliner-optimus",
    title:     "Freightliner Optimus",
    subtitle:  "American long-nose or European cab-over? Two trucks, the same job, two radically different faces.",
    category:  "Comparisons",
    date:      "2026-07-23",
    readTime:  "26 min",
    blurb:     "The American conventional and the European cab-over do identical work and look like separate species. The reason isn't taste \u2014 it's the laws, roads, and rulebooks that shaped each one. A full anatomy of why trucks look the way they do.",
    image:     "/assets/images/freightliner-optimus.jpg",
    vehicles:  ["Kenworth W900", "DAF XF", "Freightliner Cascadia", "Volvo FH", "Scania", "MAN", "Tesla Semi"],
    featured:  false
  },

  {
    slug:      "corner-office-has-a-sliding-door",
    title:     "The Corner Office Has a Sliding Door",
    subtitle:  "The luxury van stopped apologizing. Now it wants the throne.",
    category:  "Opinions",
    date:      "2026-07-23",
    readTime:  "18 min",
    blurb:     "Lexus LM, Buick GL8, Denza D9, Zeekr 009 &mdash; the chauffeur van has quietly become the most interesting luxury vehicle on Earth, and a $37 billion market says the joke is over.",
    image:     "/assets/images/corner-office-has-a-sliding-door.jpg",
    vehicles:  ["Lexus LM", "Buick GL8", "Denza D9", "Zeekr 009", "Volvo EM90", "Mercedes-Benz VLE"],
    featured:  false
  },

  {
    slug:      "929-the-number-nobody-remembered",
    title:     "929: The Number Nobody Remembered",
    subtitle:  "The car nobody forgot. Mazda's forgotten flagship deserved better.",
    category:  "Car Culture",
    date:      "2026-07-23",
    readTime:  "16 min",
    blurb:     "Before the Millenia, before Amati folded, Mazda built a rear-drive V6 flagship to chase Lexus &mdash; the 929, a pillarless velvet hammer that almost nobody bought and almost nobody remembers.",
    image:     "/assets/images/929-the-number-nobody-remembered.jpg",
    vehicles:  ["Mazda 929"],
    featured:  false
  },

  {
    slug:      "tuxedo-and-smoking-jacket",
    title:     "The Tuxedo and the Smoking Jacket",
    subtitle:  "Two thoroughbred grand tourers. One built like a bank vault, one built like a seduction.",
    category:  "Comparisons",
    date:      "2026-07-23",
    readTime:  "27 min",
    blurb:     "The Mercedes-Benz R129 SL500 meets the 1998 Jaguar XKR. Germany's order against Britain's romance &mdash; and after six thousand words, no clean winner. There should not be one.",
    image:     "/assets/images/tuxedo-and-smoking-jacket.jpg",
    vehicles:  ["Mercedes-Benz R129 SL500", "Jaguar XKR"],
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
    vehicles:  ["Sbarro Super Twelve"],
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
    vehicles:  ["Lotus Carlton", "Jaguar XJR", "Lancia Delta Integrale"],
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
    vehicles:  ["BMW Z4 sDrive35is", "Porsche Boxster"],
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
    vehicles:  ["Volvo 240"],
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
    vehicles:  ["Dodge Viper GTS ACR", "Ford Mustang Cobra R", "Chevrolet Corvette Z06", "Mitsubishi Lancer Evolution VII"],
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
    vehicles:  ["Ford Probe GT", "Honda Prelude", "Mitsubishi Eclipse", "Volkswagen Corrado", "Mazda MX-6"],
    featured:  false
  },
  {
    slug:      "new-2025-plug-in-hybrid-suvs",
    title:     "New 2025 Plug-In Hybrid SUVs",
    subtitle:  "16 plug-in hybrids, weighed on what they actually ask of you",
    category:  "Reviews",
    date:      "2026-07-19",
    readTime:  "30 min",
    blurb:     "From the Outlander PHEV to the Wrangler 4xe — 16 plug-in hybrid SUVs measured on range, price, practicality, and whether any of them are still fun to drive.",
    image:     "/assets/images/new-2025-plug-in-hybrid-suvs.jpg",
    vehicles:  ["Mitsubishi Outlander PHEV", "Mercedes-Benz GLE Plug-In Hybrid", "Jeep Grand Cherokee 4xe", "Lexus TX 550", "Ford Escape Plug-In Hybrid", "Mazda CX-70 PHEV", "Toyota RAV4 Prime", "Volvo XC60 Recharge", "Jeep Wrangler 4xe", "Lincoln Corsair Grand Touring", "Dodge Hornet PHEV", "Porsche Cayenne E-Hybrid", "Kia Sportage PHEV", "Hyundai Tucson PHEV", "Kia Sorento Plug-in Hybrid", "Volvo XC90 Recharge"],
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
    vehicles:  ["Apollo Lunar Roving Vehicle"],
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
    vehicles:  ["Porsche 911"],
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
    vehicles:  ["BMW 507"],
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
    vehicles:  ["Audi Allroad"],
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
    vehicles:  ["Citroën", "BMW", "Subaru"],
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
    vehicles:  ["Subaru Brat"],
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
    vehicles:  ["Sbarro Monster G"],
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
    vehicles:  ["Citroën DS"],
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
    vehicles:  ["Porsche 911 SC Targa"],
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
    vehicles:  ["Rolls-Royce Corniche"],
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
    vehicles:  ["Jeep Wrangler"],
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
    vehicles:  ["Steinwinter Supercargo"],
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
    vehicles:  ["Jaguar E-Type", "Jaguar F-Type"],
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
    vehicles:  ["Mazda 121"],
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
    vehicles:  ["Lotus Evora"],
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
    vehicles:  ["Porsche 996"],
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
    vehicles:  ["Isuzu VehiCROSS"],
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
    vehicles:  ["Ferrari 365 GTC/4 (Felber Beach Car)"],
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
    vehicles:  ["Citroën DS"],
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
    vehicles:  ["Jaguar Mark II"],
    featured:  false
  },

];
