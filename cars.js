/* ============================================================
   CARVEYANCE — THE CAR INDEX: the list of cars
   ============================================================
   One entry per car. After editing, run:  python3 cars_build.py
   (then seo_inject.py). Keep the quotes and commas exactly as they
   are; the build tells you the line number if one goes missing.

   id         the page address: carveyance.com/cars/<id>/  (never change
              it once live, or old links break)
   name       as shown; a generation in brackets is shown in blue, e.g.
              "Mazda RX-7 (FD)"
   make       the badge, used for browsing by make
   maker      what shows after "Made by" on the page
   years      shown as written; start and end are the plain years
   specsFor   exactly which version the numbers describe
   power      hp (US horsepower). weight: kg (pounds are worked out).
   zero60     sec, kind "claimed" (maker) or "tested"; note is the short
              label under the number, e.g. "Car and Driver test"
   top        mph, kind, note.   built: count, approx (true = "about")
   src        "article:<slug>" or the full web address of the source
   predecessor / successor   name, and id if that car is in the Index
   quick      2-3 sentences under the name.  story: the paragraphs.
   articles   the Carveyance stories ABOUT this car (slugs). Other
              stories that mention it are found automatically through
              "match": the vehicle names used in articles.js.
   photo      file is the Wikimedia Commons file name; credit, license
              and licenseUrl are shown under the photo; pos moves the
              crop (e.g. "center 60%"); fit "contain" shows the whole
              photo instead of filling the frame (for small or very wide
              shots). Leave photo as null for the placeholder card.
              YOUR OWN PHOTO: save it as assets/images/cars/<id>.jpg
              (about 1200 px wide) and it is used instead. For your own
              photos leave out file; add "credit" only if you want a
              "Photo: ..." line under it.
   ============================================================ */
const CARS = [
  {
    "id": "lotus-evora-gt",
    "name": "Lotus Evora GT",
    "aka": [],
    "make": "Lotus",
    "maker": "Lotus",
    "country": "United Kingdom",
    "years": "2020–2021",
    "start": 2020,
    "end": 2021,
    "body": "2+2 coupe",
    "engine": "3.5-liter supercharged V6",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual (6-speed automatic optional)",
    "specsFor": "2020 Lotus Evora GT, US market, 6-speed manual (Car and Driver test car)",
    "power": {
      "hp": 416,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "weight": {
      "kg": 1412,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "zero60": {
      "sec": 4.0,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "top": {
      "mph": 188,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:simplify-then-add-soul"
    },
    "built": null,
    "predecessor": {
      "name": "Lotus Evora 400",
      "id": "lotus-evora"
    },
    "successor": {
      "name": "Lotus Emira",
      "id": null
    },
    "quick": "The Evora's North American farewell: a supercharged, mid-engined 2+2 with 416 hp, a clutch pedal and hydraulic steering, sold for just 2 model years before the Emira took over. It tied a Porsche 911 GT3 to 60 mph in testing, but its real case rests on how it feels on a good road.",
    "story": [
      "By 2020 the Evora had spent more than a decade being refined, and the GT was the version Lotus sent to America to close out its run. The core recipe never wavered: a bonded-aluminum tub, a 3.5-liter Toyota V6 mounted behind the seats and fed by a supercharger, and a steering rack that kept hydraulic assistance long after rivals had switched to electric. Car and Driver weighed a test car fitted with lightweight options at 1,412 kg (3,112 lb) and timed it to 60 mph in 4.0 seconds, matching a 996 GT3 built 16 years earlier.",
      "The stopwatch undersells it. What sticks with drivers is the running dialogue between the wheel, the front tires and the road, plus a chassis that settles into mild understeer mid-corner and rotates a little on exit once the tires are warm. Add air conditioning, a usable cabin and a ride that never batters its occupants, and it becomes a sports car that asks for effort without demanding suffering. It was also a goodbye. The Emira that followed is more polished, but the GT remains one of the last modern cars built around a manual gearbox and genuine steering feel."
    ],
    "articles": [
      "ill-take-supercars-for-100ish"
    ],
    "photo": {
      "file": "2021 Lotus Evora GT British Racing Green Metallic front three quarter.jpg",
      "credit": "Trans-nyan",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Lotus Evora GT"
    ]
  },
  {
    "id": "porsche-911-gt3-996",
    "name": "Porsche 911 GT3 (996)",
    "aka": [],
    "make": "Porsche",
    "maker": "Porsche",
    "country": "Germany",
    "years": "1999–2005",
    "start": 1999,
    "end": 2005,
    "body": "Two-door coupe",
    "engine": "3.6-liter flat-6",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "2004 Porsche 911 GT3 (996.2), US market (Car and Driver test)",
    "power": {
      "hp": 380,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "weight": {
      "kg": 1460,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "zero60": {
      "sec": 4.0,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "top": {
      "mph": 190,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.auto123.com/en/news/porscher-announces-new-911-gt3/20299/"
    },
    "built": null,
    "predecessor": {
      "name": "Porsche 911 Carrera RS (993)",
      "id": null
    },
    "successor": {
      "name": "Porsche 911 GT3 (997)",
      "id": null
    },
    "quick": "The first GT3 Porsche sold in America and the blueprint for every GT3 since: a naturally aspirated flat-6 that revs to 8,200 rpm, a 6-speed manual and an engine hung out behind the rear axle. More than 20 years later, it still runs with sports cars a generation younger.",
    "story": [
      "Porsche built the original 996 GT3 in 1999 for Europe only, a lighter, sharper 911 for drivers who cared more about the racing department than the options list. America had to wait for the revised 996.2 version of 2004, with 380 hp from a naturally aspirated 3.6-liter flat-6 and a redline of 8,200 rpm. There was no automatic, no all-wheel drive and no turbocharger to soften the edges. Car and Driver weighed one at 1,460 kg (3,219 lb), ran it to 60 mph in 4.0 seconds and covered the quarter-mile in 12.3 seconds.",
      "Its personality comes from where the engine lives. With that mass slung behind the rear wheels, the GT3 wants a patient entry to every corner and a gentle right foot on the way out, and it rewards drivers who take the time to understand why. That learning curve is the point. Familiar roads get better as the inputs get cleaner, and the engine makes a persuasive case for staying in each gear far longer than necessary. Later GT3s grew faster, wider and much more complicated, but this one set the terms, and it remains the reference point for the breed."
    ],
    "articles": [
      "ill-take-supercars-for-100ish"
    ],
    "photo": {
      "file": "2004 Porsche 911 GT3, front left, 08-29-2026.jpg",
      "credit": "MercurySable99",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "audi-r8-v8",
    "name": "Audi R8 V8 (first generation)",
    "aka": [
      "Audi R8 4.2 FSI quattro"
    ],
    "make": "Audi",
    "maker": "Audi",
    "country": "Germany",
    "years": "2007–2015",
    "start": 2007,
    "end": 2015,
    "body": "Two-door coupe",
    "engine": "4.2-liter V8",
    "drive": "All-wheel drive",
    "gearbox": "6-speed manual with open metal gate (R tronic automated manual optional)",
    "specsFor": "2008 Audi R8 4.2 FSI quattro, 6-speed gated manual, US market (Road & Track test)",
    "power": {
      "hp": 420,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "weight": {
      "kg": 1624,
      "note": "",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "zero60": {
      "sec": 4.0,
      "kind": "tested",
      "note": "Road & Track test",
      "src": "article:ill-take-supercars-for-100ish"
    },
    "top": {
      "mph": 187,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://australiancar.reviews/_pdfs/Audi_R8Coupe_2007_Specifications_200704.pdf"
    },
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Audi R8 (second generation)",
      "id": null
    },
    "quick": "Audi's first mid-engined supercar and the last production sports car sold with a true open-gated manual. A 420-hp V8 behind the seats, quattro all-wheel drive and a polished metal shift gate turned even a short errand into a small ceremony.",
    "story": [
      "When the R8 arrived in 2007, it rewrote what people believed Audi could build. The body was low and wide, the 4.2-liter V8 sat in the middle of the car, and power went to all 4 wheels. The manual version carried an exposed metal gate, so every shift clicked through a slot in the manner of classic Italian exotics. Road & Track timed one to 60 mph in 4.0 seconds and praised how easy it was to live with, despite a test weight of 1,624 kg (3,580 lb).",
      "That blend of pace and good manners is the R8's real gift. The clutch is light, the shift is easy, and the car is as content in city traffic as it is on an empty back road, with room for a passenger who never signed up for a race car. History has handed it a second role. When the second-generation R8 arrived in 2015, the gated manual stayed behind, and no production sports car has offered a mechanical one since. Ferrari's recent gated revival links its lever to a dual-clutch transmission by wire; the Audi's lever is physically tied to the gearbox."
    ],
    "articles": [
      "ill-take-supercars-for-100ish"
    ],
    "photo": {
      "file": "Audi R8 Audi le mans.jpg",
      "credit": "Calreyn88",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "lotus-evora",
    "name": "Lotus Evora",
    "aka": [],
    "make": "Lotus",
    "maker": "Lotus",
    "country": "United Kingdom",
    "years": "2009–2021",
    "start": 2009,
    "end": 2021,
    "body": "2+2 coupe",
    "engine": "3.5-liter V6 (naturally aspirated; supercharged from the Evora S)",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual (IPS automatic optional later)",
    "specsFor": "2009 Lotus Evora, naturally aspirated, 6-speed manual",
    "power": {
      "hp": 276,
      "note": "276 bhp",
      "src": "article:simplify-then-add-soul"
    },
    "weight": {
      "kg": 1350,
      "note": "",
      "src": "article:simplify-then-add-soul"
    },
    "zero60": {
      "sec": 4.9,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:simplify-then-add-soul"
    },
    "top": {
      "mph": 162,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:simplify-then-add-soul"
    },
    "built": {
      "count": 6117,
      "approx": false,
      "note": "all Evora variants, 2009-2021",
      "src": "article:simplify-then-add-soul"
    },
    "predecessor": null,
    "successor": {
      "name": "Lotus Emira",
      "id": null
    },
    "quick": "Lotus's bid to build a grown-up car that still felt like a Lotus: a mid-engined 2+2 grand tourer with room for luggage, real comfort and a Toyota V6, built at Hethel from 2009 to 2021. It survived its maker's near-collapse, improved almost every year, and earned a reputation for some of the finest steering and ride quality of its era.",
    "story": [
      "Lotus had always excelled at leaving things out, so a refined, practical 2+2 was an awkward assignment. Project Eagle went from clean sheet to show stand in about 27 months and kept the company's essentials intact: a bonded-aluminum tub, double wishbones at every corner and hydraulic power steering at a time when the industry was abandoning it. The engine came from Toyota, a 3.5-liter V6 better known for moving Camrys, which Lotus retuned thoroughly. The original naturally aspirated car made 276 hp and weighed about 1,350 kg (2,976 lb).",
      "When Lotus nearly collapsed around it after its lavish expansion plans of 2010 fell apart, the Evora carried the brand through while being sharpened: a supercharged S, the 400 that reopened the American market, the lighter Sport 410, the brutal GT430 and finally the US-market GT. Only 6,117 were built, and buyers mostly walked past it toward Porsche showrooms. Those who drove one came away talking about steering that seems to transmit the texture of every surface, a ride that smothers bad pavement and a chassis that signals its limits well before reaching them. The Emira that replaced it is more polished. Plenty of enthusiasts still prefer the Evora."
    ],
    "articles": [
      "simplify-then-add-soul"
    ],
    "photo": {
      "file": "2011 Lotus Evora 4 V6 3.5 Front.jpg",
      "credit": "Vauxford",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Lotus Evora"
    ]
  },
  {
    "id": "lotus-esprit-sport-300",
    "name": "Lotus Esprit Sport 300",
    "aka": [
      "Esprit 300 Sport",
      "Esprit S300"
    ],
    "make": "Lotus",
    "maker": "Lotus",
    "country": "United Kingdom",
    "years": "1992–1995",
    "start": 1992,
    "end": 1995,
    "body": "Two-door coupe",
    "engine": "2.2-liter turbocharged inline-4",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1993 Lotus Esprit Sport 300, UK market (Autocar road test, August 1993)",
    "power": {
      "hp": 302,
      "note": "302 bhp at 6,400 rpm",
      "src": "article:the-shape-children-draw"
    },
    "weight": {
      "kg": 1243,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "zero60": {
      "sec": 4.7,
      "kind": "tested",
      "note": "Autocar test",
      "src": "article:the-shape-children-draw"
    },
    "top": {
      "mph": 161,
      "kind": "tested",
      "note": "Autocar test",
      "src": "article:the-shape-children-draw"
    },
    "built": {
      "count": 64,
      "approx": true,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "predecessor": {
      "name": "Lotus Esprit X180R",
      "id": null
    },
    "successor": {
      "name": "Lotus Esprit Sport 350",
      "id": null
    },
    "quick": "A road-registered descendant of Lotus's American race cars, with 302 hp from a turbocharged 2.2-liter 4-cylinder, bolted-on arches over a wider rear track and huge 315-section rear tires. Only about 64 were built, and it is the late Esprit collectors want most.",
    "story": [
      "The Sport 300 was born on American racetracks. Lotus's X180R Esprits won races in SCCA World Challenge and IMSA's supercar series, and this car carried that hardware onto the road: a stiffened chassis, a rear track widened by 50 mm with arches to cover it, AP Racing brakes, staggered 16- and 17-inch wheels and a limited-slip differential the cheaper S4S never received. Thinner composite panels and a stripped cabin cut the weight to 1,243 kg (2,738 lb), and a hybrid turbocharger pulled 302 hp from just 2.2 liters, a remarkable output per liter for 1993.",
      "It is not an easy car. Boost arrives in earnest only near 5,000 rpm, so the wrong gear leaves it sluggish and the right one makes it ferocious; Autocar's in-gear times swung from lazy to Viper-quick purely on the driver's choice of ratio. The shift is heavy, the visibility poor and the cabin bare. But the steering, still cited decades later as one of the finest power-assisted systems ever fitted to a road car, and a nose that bites the instant the wheel moves explain why this is the Esprit enthusiasts dream about. Surprisingly, it rides well, too."
    ],
    "articles": [
      "the-shape-children-draw"
    ],
    "photo": {
      "file": "1993 Lotus Esprit 2.2 Sport 300.jpg",
      "credit": "Kieran White",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Lotus Esprit Sport 300"
    ]
  },
  {
    "id": "lotus-esprit-s4s",
    "name": "Lotus Esprit S4S",
    "aka": [],
    "make": "Lotus",
    "maker": "Lotus",
    "country": "United Kingdom",
    "years": "1994–1997",
    "start": 1994,
    "end": 1997,
    "body": "Two-door coupe",
    "engine": "2.2-liter turbocharged inline-4",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1995 Lotus Esprit S4S, UK market (Motor Sport road test)",
    "power": {
      "hp": 300,
      "note": "300 bhp at 7,000 rpm",
      "src": "article:the-shape-children-draw"
    },
    "weight": {
      "kg": 1460,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "zero60": {
      "sec": 4.6,
      "kind": "tested",
      "note": "Motor test",
      "src": "article:the-shape-children-draw"
    },
    "top": {
      "mph": 168,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-shape-children-draw"
    },
    "built": {
      "count": 367,
      "approx": false,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "predecessor": {
      "name": "Lotus Esprit S4",
      "id": null
    },
    "successor": {
      "name": "Lotus Esprit V8",
      "id": "lotus-esprit-v8"
    },
    "quick": "The Sport 300's engine and bodywork over the regular S4's suspension and cabin, for considerably less money. It was heavier and lacked the limited-slip differential, yet its broader torque made it quicker to 60 mph in period magazine tests and far easier to live with on real roads.",
    "story": [
      "Launched in late 1994, the S4S was Lotus reading the market well. It took the turbocharged 2.2-liter 4-cylinder from the Sport 300, wrapped it in the same wide-arched body, then added the softer suspension, leather and walnut of the standard S4. On paper it should have been the lesser car: 1,460 kg (3,219 lb), or 217 kg (478 lb) more than the Sport 300, with 2 fewer horsepower and no limited-slip differential. Yet its 290 lb-ft peaked at 3,600 rpm, 800 rpm lower, and Motor Sport recorded 0-60 mph in 4.6 seconds.",
      "That flexible engine and compliant chassis make it the Esprit best suited to everyday roads. It was not flawless: the cabin is loud, the pedals awkwardly offset, the Renault-derived gearbox slow and imprecise, and testers disagreed sharply about the brakes. In the wet, though, it found traction that seemed impossible for a mid-engined car with this much power, and when it finally slid, it could be caught. Motor Sport's tester, fully expecting ridicule, rated it the most well-rounded British sports car then on sale. With 367 built against roughly 64 Sport 300s, it is also the one an enthusiast might actually find."
    ],
    "articles": [
      "the-shape-children-draw"
    ],
    "photo": {
      "file": "Lotus Esprit S4S (M75 TVU) - 25 April 2026.jpg",
      "credit": "Aethonatic",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Lotus Esprit S4S"
    ]
  },
  {
    "id": "lotus-esprit-v8",
    "name": "Lotus Esprit V8",
    "aka": [],
    "make": "Lotus",
    "maker": "Lotus",
    "country": "United Kingdom",
    "years": "1996–2004",
    "start": 1996,
    "end": 2004,
    "body": "Two-door coupe",
    "engine": "3.5-liter twin-turbo V8",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1997 Lotus Esprit V8, US market (Car and Driver test, November 1997)",
    "power": {
      "hp": 350,
      "note": "350 bhp at 6,500 rpm",
      "src": "article:the-shape-children-draw"
    },
    "weight": {
      "kg": 1391,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "zero60": {
      "sec": 4.1,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-shape-children-draw"
    },
    "top": {
      "mph": 175,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-shape-children-draw"
    },
    "built": {
      "count": 1237,
      "approx": false,
      "note": "",
      "src": "article:the-shape-children-draw"
    },
    "predecessor": {
      "name": "Lotus Esprit S4S",
      "id": "lotus-esprit-s4s"
    },
    "successor": null,
    "quick": "After 16 years of waiting, the Esprit finally got the engine its chassis had been designed around: Lotus's own 3.5-liter twin-turbo V8. The fastest Esprit of all, it out-accelerated far pricier Porsches and Ferraris and carried the name to the end of production in 2004.",
    "story": [
      "Lotus had prepared the Esprit's chassis for a V8 as early as 1980, but the money never came. In late 1993 a small team at Hethel was handed 27 months to design an engine from scratch, and in 1996 the Type 918 appeared: all-aluminum, flat-plane crank, 3.5 liters and 2 water-cooled turbochargers. In the Esprit it made 350 hp. Car and Driver recorded 0-60 mph in 4.1 seconds, its 175-mph top speed was independently verified, and those numbers shamed much costlier exotics.",
      "The character changed with the pace. The V8 is the grand tourer of the late Esprits, delivering a long surge of torque beyond 4,000 rpm that makes passing effortless, inside the best-finished Esprit cabin yet. The flaws were real. The Renault-derived 5-speed gearbox carried over from the 4-cylinder cars became the weak link, the extra mass made the chassis work harder through quick transitions, and the low-slung turbo plumbing can corrode badly. Lotus's own engine documents rated the Type 918 far higher in other tunes, so the road car always seemed to be holding something back. Over 8 years, 1,237 V8 Esprits left Hethel."
    ],
    "articles": [
      "the-shape-children-draw"
    ],
    "photo": {
      "file": "1999 Lotus Esprit V8 type 918.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Lotus Esprit V8"
    ]
  },
  {
    "id": "lotus-carlton",
    "name": "Lotus Carlton",
    "aka": [
      "Lotus Omega"
    ],
    "make": "Vauxhall",
    "maker": "Vauxhall and Opel, engineered and built by Lotus",
    "country": "United Kingdom",
    "years": "1990–1992",
    "start": 1990,
    "end": 1992,
    "body": "Four-door sedan",
    "engine": "3.6-liter twin-turbo inline-6",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "1990-1992 Lotus Carlton / Lotus Omega (one specification for both badges)",
    "power": {
      "hp": 377,
      "note": "377 bhp (382 PS) at 5,200 rpm",
      "src": "article:the-fastest-argument-in-the-room"
    },
    "weight": {
      "kg": 1655,
      "note": "",
      "src": "article:the-fastest-argument-in-the-room"
    },
    "zero60": {
      "sec": 5.1,
      "kind": "tested",
      "note": "Autocar test",
      "src": "article:the-fastest-argument-in-the-room"
    },
    "top": {
      "mph": 176,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-fastest-argument-in-the-room"
    },
    "built": {
      "count": 950,
      "approx": false,
      "note": "",
      "src": "article:the-fastest-argument-in-the-room"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A Vauxhall family sedan rebuilt by Lotus with a 377-hp twin-turbo straight-6 and a Corvette ZR-1 gearbox, claimed to reach 176 mph. It set off a national uproar in Britain, was faster than any police car in the country, and ended at 950 cars when a recession emptied the order book.",
    "story": [
      "In 1990 there was no less likely supercar than a Vauxhall Carlton. Lotus took the executive sedan, enlarged its straight-6 to 3.6 liters and added 2 Garrett turbochargers, a 6-speed manual from the Corvette ZR-1, an Australian limited-slip differential, big AP brakes, fiberglass arch extensions and a rear wing. The result weighed about 1,655 kg (3,650 lb), reached 60 mph in 5.1 seconds and, Vauxhall said, 176 mph. Police chiefs, safety campaigners, a national newspaper and 2 Members of Parliament condemned it, and ram-raiders chose one because nothing in a police fleet could keep up.",
      "The people who actually drove it told a quieter story. The engine was muted, the clutch brutally heavy and the gearshift slow, and the car produced its enormous speed with so little fuss that period testers found it oddly unexciting. Its brakes were judged the best yet fitted to a road car, it covered 20,000 miles in a long-term test without a fault, and its trunk still swallowed a family's luggage. Time has been kind. Beside modern, software-filtered cars, its unhurried manner now reads as a virtue. Only 950 were built, 320 Carltons and 630 Opel Omegas, every one painted Imperial Green."
    ],
    "articles": [
      "the-fastest-argument-in-the-room",
      "ghost-run"
    ],
    "photo": {
      "file": "1993 Vauxhall Lotus Carlton (31750565976).jpg",
      "credit": "Kieran White from Manchester, England",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Lotus Carlton",
      "Opel Lotus Omega",
      "Vauxhall Lotus Carlton"
    ]
  },
  {
    "id": "mazda-rx-7-fd",
    "name": "Mazda RX-7 (FD)",
    "aka": [
      "Efini RX-7"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "1991–2002",
    "start": 1991,
    "end": 2002,
    "body": "Two-door coupe",
    "engine": "1.3-liter sequential twin-turbo two-rotor rotary (13B-REW)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual (4-speed automatic optional)",
    "specsFor": "1993 Mazda RX-7, US market (base car and R1 share the 255 hp drivetrain)",
    "power": {
      "hp": 255,
      "note": "US-market rating",
      "src": "article:the-one-on-the-wall"
    },
    "weight": {
      "kg": 1265,
      "note": "",
      "src": "article:the-one-on-the-wall"
    },
    "zero60": {
      "sec": 5.2,
      "kind": "tested",
      "note": "Motor Trend test",
      "src": "https://twinturbo.net/nissan/300zx/FAQ/stats/mtapr92.html"
    },
    "top": null,
    "built": {
      "count": 68589,
      "approx": false,
      "note": "all markets, 1991-2002",
      "src": "article:the-one-on-the-wall"
    },
    "predecessor": {
      "name": "Mazda RX-7 (FC)",
      "id": "mazda-rx-7-fc"
    },
    "successor": {
      "name": "Mazda RX-8",
      "id": null
    },
    "quick": "Mazda's third RX-7 traded comfort for focus: a twin-turbo rotary, a body stripped of every spare kilogram, and a shape that still looks freshly drawn more than 30 years on. It is the purest expression of Mazda's horse-and-rider ideal, and the one hero of Japan's 1990s sports-car boom that never seems to age.",
    "story": [
      "The FD began when Mazda asked its engineers to work out what a sports car owes its driver, and the answer turned out to be less. The tiny 13B-REW was tucked low and aft of the front wheels, which let the designers drop the hood and pull the mass inside the wheelbase, and anything that could be lightened was, from the aluminum hood to the suspension arms. The result was a 1,265 kg (2,789 lb) coupe with 255 hp in US trim and a pair of sequential turbos, the second arriving around 4,500 rpm like a door kicked open.",
      "Its shape, sketched in Mazda's California studio and refined in Hiroshima, is why most people know it, yet the drive is why owners keep them. Brakes, steering and shifter flow together, and smooth hands are rewarded with a rare sense of wearing the car. It was never easy company: the cabin is snug, the rotary is thirsty, and the plumbing under the hood punishes neglect. Exchange rates and a cooling economy cut its American career short, which only makes the survivors more precious. The RX-8 came next, but nothing truly replaced it."
    ],
    "articles": [
      "the-one-on-the-wall"
    ],
    "photo": {
      "file": "1994 Mazda RX-7 R2 in Vintage Red, front left (Lime Rock).jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Mazda RX-7 FD"
    ]
  },
  {
    "id": "mazda-rx-7-fc",
    "name": "Mazda RX-7 (FC)",
    "aka": [
      "Mazda Savanna RX-7"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "1985–1992",
    "start": 1985,
    "end": 1992,
    "body": "Two-door coupe (convertible also offered)",
    "engine": "1.3-liter turbocharged two-rotor rotary (13B-T); naturally aspirated 13B in base cars",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual (4-speed automatic optional)",
    "specsFor": "1989 Mazda Savanna RX-7 GT-X (S5 Turbo), Japanese market",
    "power": {
      "hp": 202,
      "note": "",
      "src": "article:the-middle-child"
    },
    "weight": {
      "kg": 1250,
      "note": "",
      "src": "article:the-middle-child"
    },
    "zero60": {
      "sec": 6.5,
      "kind": "estimated",
      "note": "Estimate",
      "src": "article:the-middle-child"
    },
    "top": null,
    "built": {
      "count": 272027,
      "approx": false,
      "note": "all FC RX-7s, coupe and convertible, 1985-1992",
      "src": "https://en.wikipedia.org/wiki/Mazda_RX-7"
    },
    "predecessor": {
      "name": "Mazda RX-7 (first generation, SA/FB)",
      "id": null
    },
    "successor": {
      "name": "Mazda RX-7 (FD)",
      "id": "mazda-rx-7-fd"
    },
    "quick": "The second RX-7 grew up: independent rear suspension, a turbocharged 13B, and a silhouette that critics never stopped comparing to a Porsche. Beneath it sits one of the cleverest passive chassis of the 1980s and a rotary that loves to rev, which makes it the RX-7 that rewards a patient, attentive driver and the most affordable way into the family today.",
    "story": [
      "Mazda built the FC after asking American buyers what they wanted, and the answer was a more civilized sports car. So the live axle went, and in its place came an independent rear end with a clever floating hub that steers the rear wheels a fraction with no sensors at all, slightly out for eagerness in gentle bends and slightly in for stability as cornering loads climb. The turbocharged 13B made it properly quick, especially after the 1989 update lifted output to 205 PS (202 hp) in Japan and gave the car its round taillights.",
      "Its reputation has always suffered from the company it keeps. The first RX-7 won the races, the FD became the pin-up, and the resemblance to the Porsche 944 earned the FC a copycat label it never deserved. Drive one and the smooth, rising howl, the light nose and the sweet gearshift tell a different story. It became a hero of mountain roads and drift days, starred in Initial D, and its Japan-only Anfini editions previewed the lighter, sharper FD. Look after it and it delights; skimp on care and the engine will ask for a rebuild."
    ],
    "articles": [
      "the-middle-child"
    ],
    "photo": {
      "file": "1989 Mazda RX-7 GTU in Noble White, front right.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Mazda Savanna RX-7"
    ]
  },
  {
    "id": "mazda-eunos-cosmo",
    "name": "Eunos Cosmo",
    "aka": [
      "Mazda Eunos Cosmo",
      "Mazda Cosmo (JC)"
    ],
    "make": "Mazda",
    "maker": "Mazda, sold under its Eunos badge",
    "country": "Japan",
    "years": "1990–1995",
    "start": 1990,
    "end": 1995,
    "body": "Two-door 2+2 coupe",
    "engine": "2.0-liter sequential twin-turbo three-rotor rotary (20B-REW); 1.3-liter twin-rotor 13B also offered",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed automatic",
    "specsFor": "1990 Eunos Cosmo 20B (three-rotor), Japanese market",
    "power": {
      "hp": 276,
      "note": "",
      "src": "article:the-rotary-club"
    },
    "weight": {
      "kg": 1610,
      "note": "",
      "src": "article:the-rotary-club"
    },
    "zero60": {
      "sec": 6.5,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-rotary-club"
    },
    "top": {
      "mph": 158,
      "kind": "estimated",
      "note": "Estimate",
      "src": "article:the-rotary-club"
    },
    "built": {
      "count": 8875,
      "approx": false,
      "note": "",
      "src": "article:the-rotary-club"
    },
    "predecessor": {
      "name": "Mazda Cosmo (third generation, HB)",
      "id": null
    },
    "successor": null,
    "quick": "The only production car ever powered by a three-rotor rotary, wrapped in a long, quiet luxury coupe with a color GPS touchscreen years ahead of its time. Built for Japan's boom years and launched just as the boom ended, it remains Mazda's most extravagant road car.",
    "story": [
      "The Eunos Cosmo was Mazda's bid to stand beside Jaguar and Mercedes-Benz, and it went about it in a thoroughly Mazda way. Under a long, unadorned hood sat either a twin-rotor 13B or the 20B, 3 rotors fed by sequential turbochargers and rated on paper at 280 PS (276 hp), a ceiling set by a Japanese industry agreement rather than by the engine. Inside, the top Type-E carried a color touchscreen running GPS navigation, audio, phone and climate from a single display, a pairing no production car had offered before.",
      "On the road it is a grand tourer, not a sports car. The second turbo joins in with a smooth swell rather than a jolt, the cabin stays hushed, and the long body prefers fast sweepers to tight switchbacks, where its size and its 4-speed automatic, the only gearbox offered, get in the way. Mazda sold it only in Japan, and the bubble that paid for it burst almost as soon as it arrived: 4,325 were built in 1990, just 331 in 1995. It lost money and won admirers, and the 20B never powered another road car."
    ],
    "articles": [
      "the-rotary-club"
    ],
    "photo": {
      "file": "1991 Mazda Eunos Cosmo Supercarfest23.jpg",
      "credit": "MrWalkr",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Eunos Cosmo",
      "Mazda Eunos Cosmo"
    ]
  },
  {
    "id": "mazda-cosmo-sport",
    "name": "Mazda Cosmo Sport (Series I)",
    "aka": [
      "Mazda 110S",
      "Mazda Cosmo Sport 110S"
    ],
    "make": "Mazda",
    "maker": "Mazda (then Toyo Kogyo)",
    "country": "Japan",
    "years": "1967–1968",
    "start": 1967,
    "end": 1968,
    "body": "Two-seat coupe",
    "engine": "982 cc twin-rotor rotary (0810)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed manual",
    "specsFor": "1967 Mazda Cosmo Sport Series I (L10A), Japanese market",
    "power": {
      "hp": 108,
      "note": "110 PS @ 7,000 rpm",
      "src": "article:first-flight"
    },
    "weight": {
      "kg": 940,
      "note": "",
      "src": "article:first-flight"
    },
    "zero60": null,
    "top": {
      "mph": 115,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.mazda.com/en/about/history/greatcar/cosmo-sport/"
    },
    "built": {
      "count": 343,
      "approx": false,
      "note": "",
      "src": "article:first-flight"
    },
    "predecessor": null,
    "successor": {
      "name": "Mazda Cosmo Sport Series II (L10B)",
      "id": null
    },
    "quick": "Mazda's first rotary car and the world's first production car with a twin-rotor engine, built by hand in a run of just 343. Light, fast-revving and unlike anything else from Japan in 1967, it proved the Wankel could be made to last.",
    "story": [
      "The Cosmo Sport existed to settle an argument. Mazda licensed the Wankel engine in 1961, then spent 6 years with a team of 47 engineers under Kenichi Yamamoto fighting the chatter marks that scarred rotor housings, until new apex seals finally beat them. The car built around the result looked ready for orbit, low and long with a tiny glasshouse, and its 982 cc twin-rotor made 110 PS (108 hp) while spinning eagerly toward 9,000 rpm. At about 940 kg (2,075 lb), it felt light and alert in a way few Japanese cars of the day could match.",
      "Mazda never meant the Series I to sell in volume. It built about 30 a month, studied how owners used them, and fed the lessons into a longer, stronger Series II just over a year after launch. The short wheelbase and unassisted brakes ask for respect at speed, but on a winding road the smooth, wailing engine and light nose make it a delight. In 1968 a pair of Cosmos ran an 84-hour race at the Nürburgring, and one finished fourth overall. Every RX-7, the RX-8 and the Le Mans-winning 787B descend from these 343 cars."
    ],
    "articles": [
      "first-flight"
    ],
    "photo": {
      "file": "Mazda Cosmo Sport (L10A) front.jpg",
      "credit": "Tokumeigakarinoaoshima",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Mazda Cosmo Sport Series I"
    ]
  },
  {
    "id": "mazda-suitcase-car",
    "name": "Mazda Suitcase Car",
    "aka": [],
    "make": "Mazda",
    "maker": "Mazda (built by its engineers for the in-house Fantasyard contest)",
    "country": "Japan",
    "years": "1991",
    "start": 1991,
    "end": 1991,
    "body": "Folding three-wheeled scooter packed in a hard-shell suitcase",
    "engine": "34 cc two-stroke single-cylinder",
    "drive": "",
    "gearbox": "",
    "specsFor": "1991 Mazda Suitcase Car, Fantasyard prototype (Mazda spec sheet)",
    "power": {
      "hp": 1.7,
      "note": "",
      "src": "article:now-boarding"
    },
    "weight": {
      "kg": 32,
      "note": "",
      "src": "article:now-boarding"
    },
    "zero60": null,
    "top": {
      "mph": 22,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:now-boarding"
    },
    "built": {
      "count": 3,
      "approx": false,
      "note": "",
      "src": "article:now-boarding"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A real, rideable three-wheeler that folds into a hard-shell suitcase, built by a handful of Mazda engineers for an in-house ideas contest in 1991. Too heavy for the overhead bin and far too much fun to care, it is the most lighthearted thing Mazda has ever made.",
    "story": [
      "In 1991, riding high on the Miata and a Le Mans win, Mazda invited its staff to dream up new forms of mobility in a company competition called Fantasyard. A team of 7 engineers from the manual-transmission department answered with a motorized suitcase. They found an oversized Samsonite hard case, loaded it with the bones of a small 3-wheeled motorbike, and arranged things so the front wheel, rear wheels and seat could be deployed in under a minute. A 34 cc two-stroke made 1.7 hp, good for about 22 mph.",
      "As luggage it made no sense. At 32 kg (70 lb) it belonged in the hold, and no security line would wave through a tank of gasoline. That was never the point. The contraption became a media darling, earning extra copies for Europe and the United States, and at a 1991 exhibition it reportedly drew bigger crowds than the Le Mans-winning 787B beside it. The original was later wrecked and the European car has vanished, leaving the US example as the lone survivor of the most cheerful idea Mazda ever let its engineers build."
    ],
    "articles": [
      "now-boarding"
    ],
    "photo": {
      "pos": "center 40%"
    },
    "match": [
      "Mazda Suitcase Car"
    ]
  },
  {
    "id": "mazda-121-canvas-top",
    "name": "Mazda 121 Canvas Top",
    "aka": [
      "Mazda 121 Fun Top",
      "Ford Festiva Canvas Top (Japan)"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "1987–1991",
    "start": 1987,
    "end": 1991,
    "body": "Three-door hatchback with full-length sliding canvas roof",
    "engine": "1.3-liter inline-4 (B3), carbureted",
    "drive": "Front-wheel drive",
    "gearbox": "5-speed manual (automatic available)",
    "specsFor": "Mazda 121 Canvas Top (DA), 1.3, export market (Europe, Australia, Hong Kong)",
    "power": {
      "hp": 67,
      "note": "@ 5,500 rpm",
      "src": "article:open-air-mazda-121"
    },
    "weight": {
      "kg": 775,
      "note": "",
      "src": "article:open-air-mazda-121"
    },
    "zero60": {
      "sec": 11.6,
      "kind": "claimed",
      "note": "Maker's claim, 0-62 mph",
      "src": "article:open-air-mazda-121"
    },
    "top": {
      "mph": 99,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:open-air-mazda-121"
    },
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Mazda 121 (DB) / Autozam Revue",
      "id": null
    },
    "quick": "A modest Mazda subcompact with a party trick: a fabric roof that slides back over almost the entire cabin. Light, cheap and roomy for its size, it handed the open sky to people shopping for an economy car.",
    "story": [
      "The 121 Canvas Top took an ordinary 3-door hatchback and swapped most of its roof for a reinforced fabric panel running on rails. Because the pillars and roof rails stayed put, the body kept its stiffness, the hatch kept working and the rear seats kept their room, yet one pull on the canvas turned the cabin into something close to a convertible. Mazda kept going: the rear bench slid and reclined, so the 190-liter cargo bay could stretch to 420 liters, all in a car about 3.48 m long that weighed only 775 kg (1,708 lb).",
      "With 67 hp from a 1.3-liter four it was never quick, but its lightness made it lively, and the 5-speed manual let it make the most of every horse. The real reward came on a warm day with the roof back, when low speeds felt like an occasion rather than a compromise. Owners in Europe, Australia and Hong Kong grew fiercely attached, and the simple drivetrain has a name for going the distance; the canvas is what needs watching, since old roofs stretch, crack and leak. The 4-door 121 that followed kept a canvas top but lost much of the original's cheer."
    ],
    "articles": [
      "open-air-mazda-121"
    ],
    "photo": {
      "pos": "center 62%"
    },
    "match": []
  },
  {
    "id": "mazda-929",
    "name": "Mazda 929 (HD)",
    "aka": [
      "Mazda Sentia",
      "Efini MS-9",
      "Mazda 929 Serenia (Canada)"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "1992–1995",
    "start": 1992,
    "end": 1995,
    "body": "Four-door pillarless hardtop sedan",
    "engine": "3.0-liter DOHC 24-valve V6 (JE)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed automatic",
    "specsFor": "1993 Mazda 929, US market",
    "power": {
      "hp": 195,
      "note": "",
      "src": "article:929-the-number-nobody-remembered"
    },
    "weight": {
      "kg": 1630,
      "note": "",
      "src": "https://edmunds.com/mazda/929/1992/features-specs"
    },
    "zero60": {
      "sec": 8.5,
      "kind": "estimated",
      "note": "Estimate",
      "src": "article:929-the-number-nobody-remembered"
    },
    "top": {
      "mph": 130,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:929-the-number-nobody-remembered"
    },
    "built": null,
    "predecessor": {
      "name": "Mazda 929 (HC)",
      "id": null
    },
    "successor": {
      "name": "Mazda Millenia",
      "id": null
    },
    "quick": "Mazda's rear-drive flagship of the early 1990s: a pillarless V6 hardtop sedan with multi-link suspension at every corner, a solar-powered ventilation sunroof and, in Japan and Hong Kong, four-wheel steering. Engineered to rival Lexus but sold from ordinary Mazda showrooms, it slipped from memory almost as soon as it left.",
    "story": [
      "The 929 was meant to anchor Amati, the luxury brand Mazda planned to launch against Lexus and Infiniti, and its engineering shows that ambition. The 3.0-liter V6 sits behind the front axle for near-even weight distribution, every corner rides on multi-link suspension, and the frameless windows of the pillarless 4-door body give it a clean, unbroken profile. Options ran to a sunroof whose solar cells powered fans to cool the parked cabin, and cars for Japan and Hong Kong could steer their rear wheels, against the fronts at low speed and with them on the highway.",
      "Its 195 hp V6 favored a broad, easy spread of torque over a high-rpm peak, and the car's best trait was a calm, quiet composure over long distances. The American version was tuned softer and went without traction control. When Japan's economy faltered, Amati was canceled before it opened, and the 929 was left sharing showrooms with 626s, offering none of the pampering Lexus buyers had come to expect. Sales faded, and in 1995 the front-drive Millenia took its place. Owners who kept theirs report remarkable durability, and still get asked what it is."
    ],
    "articles": [
      "929-the-number-nobody-remembered"
    ],
    "photo": {
      "file": "Mazda 929.JPG",
      "credit": "IFCAR",
      "license": "Public domain",
      "licenseUrl": "",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "mazda5",
    "name": "Mazda5",
    "aka": [
      "Mazda Premacy",
      "Nissan Lafesta Highway Star"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "2006–2015",
    "start": 2006,
    "end": 2015,
    "body": "Compact 6-seat minivan with 2 sliding doors",
    "engine": "2.5-liter DOHC inline-4 (MZR)",
    "drive": "Front-wheel drive",
    "gearbox": "6-speed manual or 5-speed automatic",
    "specsFor": "2012 Mazda5 Sport, six-speed manual, US market",
    "power": {
      "hp": 157,
      "note": "@ 6,000 rpm",
      "src": "article:sliding-doors"
    },
    "weight": {
      "kg": 1570,
      "note": "",
      "src": "article:sliding-doors"
    },
    "zero60": {
      "sec": 8.3,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:sliding-doors"
    },
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Mazda5 (first generation)",
      "id": null
    },
    "successor": null,
    "quick": "A compact minivan with 6 seats, 2 sliding doors, a Mazda3-based chassis and, for a few years in America, a manual gearbox. Too small and too sensible for its moment, it now looks like the clever, cheap adventure wagon buyers spent the next decade wishing for.",
    "story": [
      "The Mazda5 squeezed 3 rows and 6 seats into a body about 180 inches long, roughly the size the very first American minivans had been before the breed ballooned. Its seats ran 2+2+2, so nobody rode in a cramped middle spot, and the doors on both sides slid back to open wide in parking spaces where a hinged door would scrape the neighbor. Underneath lay Mazda3 hardware, multilink rear suspension included, so it turned in like a tall hatchback, and Car and Driver hustled a 2012 6-speed manual to 60 mph in 8.3 seconds.",
      "Power was the weak spot. Its 157 hp works hard in a 1,570 kg (3,457 lb) van with 6 people aboard, and highway passing takes planning. Timing was the bigger problem: it reached American showrooms just as buyers fell for crossovers, Mazda barely advertised it, and the CX-5 soon outsold it in the same dealerships. Mazda dropped it in the US after 2015, while the Premacy lived on in Japan, where it had also been offered with four-wheel drive and even a hydrogen-burning rotary. Used ones now cost little, which makes them superb small campers and family haulers."
    ],
    "articles": [
      "sliding-doors"
    ],
    "photo": {
      "file": "2009 Mazda5, front right, 07-25-2026.jpg",
      "credit": "2001FordRangerXLT",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": "",
      "caption": "Shown: a 2009 first-generation Mazda5"
    },
    "match": [
      "Mazda Premacy",
      "Mazda5"
    ]
  },
  {
    "id": "mazda-protege5",
    "name": "Mazda Protegé5",
    "aka": [
      "Mazda Familia S-Wagon"
    ],
    "make": "Mazda",
    "maker": "Mazda",
    "country": "Japan",
    "years": "2002–2003",
    "start": 2002,
    "end": 2003,
    "body": "Five-door sport wagon",
    "engine": "2.0-liter DOHC 16-valve inline-4 (FS)",
    "drive": "Front-wheel drive",
    "gearbox": "5-speed manual (4-speed automatic optional)",
    "specsFor": "2002 Mazda Protegé5, five-speed manual, US market (Car and Driver test car)",
    "power": {
      "hp": 130,
      "note": "@ 6,000 rpm",
      "src": "article:the-happy-medium"
    },
    "weight": {
      "kg": 1275,
      "note": "",
      "src": "article:the-happy-medium"
    },
    "zero60": {
      "sec": 9.5,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-happy-medium"
    },
    "top": {
      "mph": 118,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-happy-medium"
    },
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Mazda3 five-door",
      "id": null
    },
    "quick": "The 5-door wagon version of Mazda's early-2000s Protegé, with quick hydraulic steering, a crisp chassis and a shape that still looks right. Modest 130 hp aside, it was the car magazine editors wanted for themselves, and it remains a bargain-priced lesson in how much feel a small car can deliver.",
    "story": [
      "Oddly for a wagon, the Protegé5 measures nearly 5 inches less than its sedan sibling, because Mazda trimmed the rear overhang instead of stretching it, and that cropped tail under a long roof gives it the stance of something pricier. The 2.0-liter four is the least of it: it grumbles low in the rev range, fades up top and does its best work in a narrow middle band. Everything else sparkles. A thin steering rim, light hydraulic assist and a stiff shell let the front tires speak clearly, the brakes are strong, and the tail will tuck in gently when asked.",
      "Testers loved it and hedged their advice. In a 6-car Edmunds comparison in 2003 it tied for second behind the Toyota Matrix, yet its editors chose it, by a wide margin, as the one they would buy with their own money. It sits between the Protegé MP3 and the turbocharged Mazdaspeed Protegé in the family, the only hatchback of the trio, and it pointed the way to the Mazda3 and the Mazda5. Rust, rear sway-bar mounts and tired ignition parts are the usual worries, yet a rust-free example remains a joy on a twisting road."
    ],
    "articles": [
      "the-happy-medium",
      "cheapest-car-in-the-fight"
    ],
    "photo": {
      "file": "2003 Mazda Protegé5 in Midnight Blue Mica, front left, 07-06-2026.jpg",
      "credit": "Cutlass",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Mazda Protegé5",
      "Mazda Protégé5"
    ]
  },
  {
    "id": "mazda-protege-mp3",
    "name": "Mazda Protegé MP3",
    "aka": [],
    "make": "Mazda",
    "maker": "Mazda North American Operations, with Racing Beat",
    "country": "Japan",
    "years": "2001",
    "start": 2001,
    "end": 2001,
    "body": "Four-door sedan",
    "engine": "2.0-liter DOHC inline-4 (FS)",
    "drive": "Front-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "2001 Mazda Protegé MP3, US market",
    "power": {
      "hp": 140,
      "note": "10 hp up on the standard 2.0",
      "src": "article:cheapest-car-in-the-fight"
    },
    "weight": {
      "kg": 1235,
      "note": "",
      "src": "article:cheapest-car-in-the-fight"
    },
    "zero60": {
      "sec": 8.2,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:cheapest-car-in-the-fight"
    },
    "top": null,
    "built": {
      "count": 1500,
      "approx": false,
      "note": "",
      "src": "article:the-happy-medium"
    },
    "predecessor": null,
    "successor": {
      "name": "Mazdaspeed Protegé",
      "id": "mazdaspeed-protege"
    },
    "quick": "A 2001 limited-edition Protegé sedan with Racing Beat suspension, 17-inch wheels and the first MP3-playing stereo ever installed at a factory, built in a run of just 1,500. Slow in a straight line and brilliant in the bends, it earned a place in a Road & Track handling test beside a Ferrari 360 Modena.",
    "story": [
      "Through the 1990s the Protegé handled far better than anyone noticed, because Mazda never gave it a hot version to wave around. The MP3 fixed that in 2001. Racing Beat firmed up the springs and anti-roll bars and added a stainless exhaust, blue Tokico struts went in, Racing Hart made exclusive 17-inch wheels, and a Kenwood stereo that read MP3 files from a home-burned CD gave the car its name. A small bump to 140 hp left it no faster than its rivals in a straight line, and Car and Driver needed 8.2 seconds to reach 60 mph.",
      "In the bends it was another car. It pulled 0.85 g on the skidpad, and in a Road & Track shootout of affordable performance cars every rival beat it to 60 mph, yet it was quickest through the slalom and around Buttonwillow. The same magazine voted it into a best-handling test alongside a Porsche 911 Turbo, a Corvette Z06 and a Ferrari 360 Modena. Only 1,500 were built, most of them in Laser Blue, and the turbocharged Mazdaspeed Protegé followed in 2003."
    ],
    "articles": [
      "cheapest-car-in-the-fight"
    ],
    "photo": {
      "file": "Mazda Protege MP3 (4738701236).jpg",
      "credit": "Michael Gil from Calgary, AB, Canada",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Mazda MP3",
      "Mazda Protégé MP3"
    ]
  },
  {
    "id": "mazdaspeed-protege",
    "name": "Mazdaspeed Protegé",
    "aka": [],
    "make": "Mazda",
    "maker": "Mazda (Mazdaspeed), with Callaway and Racing Beat",
    "country": "Japan",
    "years": "2003",
    "start": 2003,
    "end": 2003,
    "body": "Four-door sedan",
    "engine": "2.0-liter turbocharged inline-4 (FS, Garrett T25)",
    "drive": "Front-wheel drive, limited-slip differential",
    "gearbox": "5-speed manual",
    "specsFor": "2003 Mazdaspeed Protegé, US market",
    "power": {
      "hp": 170,
      "note": "",
      "src": "article:cheapest-car-in-the-fight"
    },
    "weight": {
      "kg": 1290,
      "note": "",
      "src": "https://www.auto123.com/en/news/2003-mazdaspeed-protege-preview/43324/?page=4"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 4500,
      "approx": true,
      "note": "",
      "src": "article:the-happy-medium"
    },
    "predecessor": {
      "name": "Mazda Protegé MP3",
      "id": "mazda-protege-mp3"
    },
    "successor": {
      "name": "Mazdaspeed3",
      "id": null
    },
    "quick": "The turbocharged finale of the Protegé line: 170 hp from a Garrett turbo developed with Callaway, a limited-slip differential, bigger brakes and Racing Beat suspension. It answered everyone who said the MP3 needed more power, and it remains one of the rarest Mazda compacts of its era.",
    "story": [
      "Mazda's American arm developed the Mazdaspeed Protegé to give its sharp-handling sedan the engine it had always lacked. With Callaway's help, a Garrett T25 turbocharger and an intercooler took the 2.0-liter four to 170 hp and 160 lb-ft, and the rest of the car was toughened to match: a Tochigi Fuji limited-slip differential, thicker driveshafts, a heavy-duty clutch, firmer Racing Beat suspension and larger brakes. The cabin gained Sparco pedals for heel-and-toe work, a Nardi wheel and a short-throw 5-speed, and the first cars came in Black Mica or a loud Spicy Orange.",
      "It was clearly quicker than the MP3, putting its power down instead of spinning an inside wheel, and it carried real speed out of autocross corners. Road & Track spotted a trade, though: the new steering rack and the limited-slip diff fed more into the wheel and dulled a little of the MP3's precision. Roughly 4,500 were built across the original 2003 run and a mid-year update with new colors. Clean, unmodified examples are now scarce and rising in value, and many Protegé5 owners borrow its hardware."
    ],
    "articles": [
      "cheapest-car-in-the-fight"
    ],
    "photo": {
      "file": "'03 Mazdaspeed Protegé Sedan (Les chauds vendredis '10).jpg",
      "credit": "Bull-Doser",
      "license": "Public domain",
      "licenseUrl": "",
      "pos": ""
    },
    "match": [
      "Mazda MazdaSpeed Protégé",
      "Mazdaspeed Protegé"
    ]
  },
  {
    "id": "mitsubishi-3000gt",
    "name": "Mitsubishi 3000GT",
    "aka": [
      "Mitsubishi GTO"
    ],
    "make": "Mitsubishi",
    "maker": "Mitsubishi Motors",
    "country": "Japan",
    "years": "1991–2000",
    "start": 1991,
    "end": 2000,
    "body": "2+2 hatchback coupe (retractable-hardtop Spyder, 1995-1996 model years)",
    "engine": "3.0-liter twin-turbo V6",
    "drive": "All-wheel drive (VR-4)",
    "gearbox": "6-speed manual",
    "specsFor": "1995 Mitsubishi 3000GT VR-4 coupe, US market (performance from Motor Trend's May 1997 comparison test)",
    "power": {
      "hp": 320,
      "note": "",
      "src": "article:the-overachiever"
    },
    "weight": {
      "kg": 1695,
      "note": "",
      "src": "article:the-overachiever"
    },
    "zero60": {
      "sec": 4.8,
      "kind": "tested",
      "note": "Motor Trend test",
      "src": "article:the-overachiever"
    },
    "top": {
      "mph": 155.7,
      "kind": "tested",
      "note": "Motor Trend test",
      "src": "article:the-overachiever"
    },
    "built": {
      "count": 86151,
      "approx": false,
      "note": "Built for the US and Canada",
      "src": "article:the-overachiever"
    },
    "predecessor": {
      "name": "Mitsubishi Starion",
      "id": null
    },
    "successor": null,
    "quick": "Mitsubishi's early-1990s technology flagship, a twin-turbo grand tourer that arrived with all-wheel drive, four-wheel steering, moving aerodynamics and a switchable exhaust when no rival offered even half that list. Heavy, complicated and ferocious off the line, it was the Japanese GT that tried to do everything at once, and for a few years it even folded its own hard roof into the trunk.",
    "story": [
      "Every great Japanese sports car of its era chose a specialty: lightness, balance, a mid-mounted engine. The 3000GT refused to choose. Under its long, low body lived a 3.0-liter V6 with a turbocharger for each bank, rear-biased all-wheel drive, rear wheels that steered up to 1.5 degrees at speed, and a front air dam and rear wing that moved on their own above 50 mph. Floor it and there is no wheelspin and no tail to catch, just a crouch, a turbo whistle and a horizon arriving early. Ask it to dart through a slalom, though, and all 1,695 kg (3,737 lb) make themselves known.",
      "That mass defines it. It was built to devour interstates rather than dissect hairpins, and does so magnificently. Its Dodge Stealth twin wore a Chrysler-drawn face, and the 1995 Spyder became the first car sold in America since Ford's 1950s Skyliner with a solid roof that stowed itself at the press of a switch. As a strong yen and the SUV boom squeezed the class, Mitsubishi peeled away gadgets to hold the price, yet the 3000GT outlasted the Supra, RX-7 and 300ZX in American showrooms. The shape has only improved with age. Values have barely noticed."
    ],
    "articles": [
      "the-overachiever"
    ],
    "photo": {
      "file": "Mitsubishi 3000GT front.jpg",
      "credit": "Rutger van der Maar",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Mitsubishi 3000GT",
      "Mitsubishi 3000GT Spyder",
      "Mitsubishi 3000GT VR-4",
      "Mitsubishi GTO"
    ]
  },
  {
    "id": "dodge-stealth",
    "name": "Dodge Stealth",
    "aka": [],
    "make": "Dodge",
    "maker": "Dodge (Chrysler), built by Mitsubishi in Nagoya",
    "country": "Japan",
    "years": "1991–1996",
    "start": 1991,
    "end": 1996,
    "body": "2+2 hatchback coupe",
    "engine": "3.0-liter twin-turbo V6 (R/T Turbo)",
    "drive": "All-wheel drive (R/T Turbo)",
    "gearbox": "5-speed manual (6-speed from 1994)",
    "specsFor": "1991 Dodge Stealth R/T Turbo, US market",
    "power": {
      "hp": 300,
      "note": "",
      "src": "article:the-overachiever"
    },
    "weight": null,
    "zero60": null,
    "top": null,
    "built": {
      "count": 65303,
      "approx": false,
      "note": "Built for the US and Canada",
      "src": "article:the-overachiever"
    },
    "predecessor": null,
    "successor": null,
    "quick": "Chrysler's take on the Mitsubishi 3000GT, built on the same Nagoya line with the same drivetrains but its own nose, pillars and spoiler. In R/T Turbo form it carried the full twin-turbo, all-wheel-drive, four-wheel-steering package, and it is remembered as the car dropped as the 1991 Indianapolis 500 pace car after objections to a Japanese-built car leading the race.",
    "story": [
      "The Stealth was what happened when Chrysler and Mitsubishi shared a single, very ambitious car. Mitsubishi supplied the chassis, the 3.0-liter V6 and, in the top R/T Turbo, the twin turbochargers, all-wheel drive and four-wheel steering. Chrysler drew its own face with a cross-hair grille and fixed headlamps, reshaped the pillars and quarter windows, added a crescent-shaped spoiler and left the Mitsubishi's moving aerodynamics out entirely. The result looked like an American muscle coupe that had spent a semester abroad, and Car and Driver, flinging an R/T Turbo around Chrysler's own track, found it leaping between bends with startling force.",
      "Its brush with fame came in 1991. A Stealth was lined up to pace the Indianapolis 500 until the United Auto Workers objected to a Japanese-built car leading the field, and a Viper prototype took the job; Dodge sold pace-car replica Stealths anyway. The Stealth ran 6 model years and 65,303 cars for the US and Canada before bowing out after 1996, 3 seasons ahead of its Mitsubishi twin. Today it is the sibling fewer people recognize, carrying the same remarkable hardware underneath."
    ],
    "articles": [
      "the-overachiever"
    ],
    "photo": {
      "file": "Dodge Stealth Z11A RT Bright Blue Metallic 01.jpg",
      "credit": "Ethan Llamas",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Dodge Stealth"
    ]
  },
  {
    "id": "subaru-svx",
    "name": "Subaru SVX",
    "aka": [
      "Subaru Alcyone SVX"
    ],
    "make": "Subaru",
    "maker": "Subaru (Fuji Heavy Industries), styled by Giugiaro's Ital Design",
    "country": "Japan",
    "years": "1991–1997",
    "start": 1991,
    "end": 1997,
    "body": "2+2 coupe",
    "engine": "3.3-liter flat-6",
    "drive": "All-wheel drive",
    "gearbox": "4-speed automatic",
    "specsFor": "1992 Subaru SVX, US market (Car and Driver road test, September 1991)",
    "power": {
      "hp": 230,
      "note": "at 5,400 rpm",
      "src": "article:the-brightest-star"
    },
    "weight": {
      "kg": 1639,
      "note": "",
      "src": "article:the-brightest-star"
    },
    "zero60": {
      "sec": 7.6,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-brightest-star"
    },
    "top": {
      "mph": 144,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:the-brightest-star"
    },
    "built": {
      "count": 24379,
      "approx": false,
      "note": "",
      "src": "article:the-brightest-star"
    },
    "predecessor": {
      "name": "Subaru XT",
      "id": null
    },
    "successor": null,
    "quick": "Subaru's Giugiaro-styled luxury coupe, a slippery all-wheel-drive grand tourer with a 230 hp flat-6 and glass that curves up into the roof. Superbly built and lovely on a long trip, it was undone by an automatic-only gearbox, split side windows and a price far above anything Subaru had sold before.",
    "story": [
      "The SVX was conceived in Japan's bubble years and born into the hangover. Ital Design drew a long, smooth wedge with a 0.29 drag coefficient and a glass canopy flowing from the doors into the roof, and Subaru put it into production almost exactly as the 1989 show car looked. Underneath sat a new 3.3-liter flat-6 and standard all-wheel drive, plus thoughtful little touches such as wipers that sped up with the car. The famous windows were the compromise: the curved panes could not drop into such shallow doors, so only an inset section rolls down, leaving a permanent ledge of glass and rubber across the opening.",
      "On the road it is a 1,639 kg (3,614 lb) long-distance express, hushed at 80 mph, unbothered by weather and far happier cruising than attacking. The 4-speed automatic, the only gearbox offered, dulled its pace, and it was priced alongside quicker, more prestigious coupes. Subaru hoped to sell 10,000 a year in America and managed 14,257 in total. Yet an SVX won the 1991 Alcan Winter Rally, a regularity event that rewards steady, precise pace over hundreds of frozen miles, and it still turns heads at any gathering."
    ],
    "articles": [
      "the-brightest-star"
    ],
    "photo": {
      "file": "Subaru Alcyone in Black Mica, front right.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": "",
      "caption": "Shown: the Japanese-market Alcyone SVX"
    },
    "match": [
      "Subaru Alcyone SVX",
      "Subaru SVX"
    ]
  },
  {
    "id": "ford-probe-gt",
    "name": "Ford Probe GT (second generation)",
    "aka": [],
    "make": "Ford",
    "maker": "Ford, engineered with Mazda and built at Flat Rock, Michigan",
    "country": "United States",
    "years": "1993–1997",
    "start": 1993,
    "end": 1997,
    "body": "2+2 hatchback coupe",
    "engine": "2.5-liter V6",
    "drive": "Front-wheel drive",
    "gearbox": "5-speed manual (4-speed automatic optional)",
    "specsFor": "1994 Ford Probe GT, US market (0-60 from Car and Driver's test of a mechanically identical 1993 GT)",
    "power": {
      "hp": 164,
      "note": "at 5,600 rpm (Mazda KL-DE V6)",
      "src": "article:a-golden-relic"
    },
    "weight": {
      "kg": 1315,
      "note": "",
      "src": "article:a-golden-relic"
    },
    "zero60": {
      "sec": 7.5,
      "kind": "claimed",
      "note": "Ford brochure",
      "src": "article:a-golden-relic"
    },
    "top": null,
    "built": {
      "count": 310446,
      "approx": false,
      "note": "",
      "src": "https://en.wikipedia.org/wiki/Ford_Probe"
    },
    "predecessor": {
      "name": "Ford Probe (first generation)",
      "id": null
    },
    "successor": {
      "name": "Mercury Cougar (1999)",
      "id": null
    },
    "quick": "A Ford-styled, Mazda-engineered front-drive coupe with a 2.5-liter V6 and a chassis good enough to beat the Prelude, Eclipse, Corrado and its own Mazda MX-6 cousin in a 1993 Car and Driver comparison. Born from a plan to replace the Mustang, it became a quiet cult favorite for drivers who prize balance over brute force.",
    "story": [
      "The Probe began as Ford's idea for a modern, front-drive Mustang, until Mustang loyalists made their feelings known and the pony car kept driving its rear wheels. The coupe carried on under a name borrowed from a series of Ford aerodynamic concepts, built beside the Mazda MX-6 and 626 at Flat Rock, Michigan. The second generation, launched for 1993, swapped the first car's sharp edges for smooth, sculpted curves and hidden door handles, and the GT carried Mazda's eager 2.5-liter, 24-valve V6 with 164 hp.",
      "What made it special was the way it drove. With independent suspension at every corner, 16-inch wheels and steering that talked back, it turned in cleanly and stayed composed at a pace that rewarded a skilled driver without scaring anyone else. At roughly 1,315 kg (2,900 lb) it never needed huge power to be fun, though a little more would have been welcome. The name invited snickers, the cheaper Escort GT crowded it from below, Mazda hardware kept costs high and the SUV boom drained the coupe market. Production ended in 1997, and the people who owned one still miss it."
    ],
    "articles": [
      "a-golden-relic"
    ],
    "photo": {
      "file": "1993 Ford Probe GT in Black, Front Right, 05-21-2023.jpg",
      "credit": "Elise240SX",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "lexus-is-f",
    "name": "Lexus IS F",
    "aka": [],
    "make": "Lexus",
    "maker": "Lexus (Toyota)",
    "country": "Japan",
    "years": "2008–2014",
    "start": 2008,
    "end": 2014,
    "body": "Four-door sedan",
    "engine": "5.0-liter V8",
    "drive": "Rear-wheel drive",
    "gearbox": "8-speed automatic",
    "specsFor": "2008 Lexus IS F, US market (performance from Motor Trend's 2008 first test)",
    "power": {
      "hp": 416,
      "note": "",
      "src": "article:last-place-every-time"
    },
    "weight": {
      "kg": 1715,
      "note": "",
      "src": "article:last-place-every-time"
    },
    "zero60": {
      "sec": 4.3,
      "kind": "tested",
      "note": "Motor Trend test",
      "src": "article:last-place-every-time"
    },
    "top": {
      "mph": 170,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:last-place-every-time"
    },
    "built": {
      "count": 11000,
      "approx": true,
      "note": "",
      "src": "article:last-place-every-time"
    },
    "predecessor": null,
    "successor": {
      "name": "Lexus IS 500 F Sport Performance",
      "id": null
    },
    "quick": "Lexus's first F car, a compact sedan with a Yamaha-headed 5.0-liter V8, an 8-speed automatic and Brembo brakes, aimed squarely at the M3, C63 AMG and RS4. It never won a comparison test, but time has been kinder to it than to its rivals, because it is the one that can be kept for years without dreading the repair bill.",
    "story": [
      "For nearly 20 years Lexus built cars that never startled anyone, which was precisely the point. Then a small skunkworks team led by engineer Yukihiko Yaguchi, working at Fuji Speedway, squeezed a 416 hp naturally aspirated V8 into the IS and took it to Detroit in January 2007. The 2UR-GSE wears Yamaha-designed heads, revs to 6,800 rpm and carries a scavenge pump to keep its oil supply steady through long, hard corners, while the 8-speed automatic fires off upshifts in 0.1 second and blips its own downshifts. From the curb it looks like an ordinary IS that has been lifting weights.",
      "Magazines kept lining it up against the BMW M3, Mercedes C63 AMG and Audi RS4, and it never finished first; the Germans were sharper at the limit and quicker off the line. Yet it matched the M3 for grip, made far more torque, used less fuel and carried a longer warranty, and later updates brought a Torsen limited-slip differential and retuned suspension. About 11,000 were built before production ended in 2014. As its rivals have aged into expensive projects, the IS F has become the sensible way to own something wild."
    ],
    "articles": [
      "last-place-every-time"
    ],
    "photo": {
      "file": "Lexus IS F USE20 Obsidian - front.jpg",
      "credit": "Ethan Llamas",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Lexus IS F"
    ]
  },
  {
    "id": "infiniti-fx45",
    "name": "Infiniti FX45",
    "aka": [],
    "make": "Infiniti",
    "maker": "Infiniti (Nissan)",
    "country": "Japan",
    "years": "2003–2008",
    "start": 2003,
    "end": 2008,
    "body": "Five-door crossover SUV",
    "engine": "4.5-liter V8",
    "drive": "All-wheel drive (rear-biased)",
    "gearbox": "5-speed automatic",
    "specsFor": "2003 Infiniti FX45, US market (Car and Driver instrumented test)",
    "power": {
      "hp": 315,
      "note": "",
      "src": "article:ahead-of-the-applause"
    },
    "weight": {
      "kg": 1950,
      "note": "",
      "src": "article:ahead-of-the-applause"
    },
    "zero60": {
      "sec": 6.3,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:ahead-of-the-applause"
    },
    "top": null,
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Infiniti FX50",
      "id": null
    },
    "quick": "Infiniti's FX45 put a 315 hp V8 and sports-car proportions on a rear-drive-based crossover, years before coupe-roofed performance SUVs became a category. Quick, sharp-handling and startling to look at, it was also stiff-riding, thirsty and hard to see out of, and its cheaper V6 sibling won most of its buyers.",
    "story": [
      "In a parking lot full of upright boxes, the FX looked ready to pounce. Nissan's designers grafted the hefty lower body of an SUV to the low roof and raked glass of a sports GT, then filled the arches with 20-inch wheels when a BMW X5 rode on 17s. Underneath sat the rear-drive FM platform shared with the 350Z and G35, and the FX45 added the Q45 flagship's 4.5-liter V8, rear-biased all-wheel drive and a 54:46 weight split. Car and Driver timed it at 6.3 seconds to 60 mph, quicker than the X5 4.6is and the ML55 AMG, and recorded 0.87 g of grip from a 1,950 kg (4,299 lb) crossover.",
      "On a road that twists and dips it stays improbably flat, though the heavy steering says little and a jumpy throttle makes traffic a chore. The low-profile tires pound over broken pavement, the rear window is a mail slot and the fuel bills never stop. The cheaper, softer FX35, a full second slower, became the one people bought. The FX45 gave way to the stronger FX50 in 2008, and nearly every coupe-roofed performance crossover since has followed the trail it blazed."
    ],
    "articles": [
      "ahead-of-the-applause"
    ],
    "photo": {
      "file": "Infiniti FX45 (48981085643).jpg",
      "credit": "crash71100",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Infiniti FX45"
    ]
  },
  {
    "id": "isuzu-vehicross",
    "name": "Isuzu VehiCROSS",
    "aka": [],
    "make": "Isuzu",
    "maker": "Isuzu",
    "country": "Japan",
    "years": "1997–2001",
    "start": 1997,
    "end": 2001,
    "body": "Two-door SUV",
    "engine": "3.5-liter V6",
    "drive": "Four-wheel drive (BorgWarner Torque on Demand, with low range)",
    "gearbox": "4-speed automatic",
    "specsFor": "1999-2001 Isuzu VehiCROSS, US market",
    "power": {
      "hp": 215,
      "note": "3.5-liter 6VE1 V6",
      "src": "article:vehicross"
    },
    "weight": {
      "kg": 1780,
      "note": "",
      "src": "article:vehicross"
    },
    "zero60": {
      "sec": 8.2,
      "kind": null,
      "note": "",
      "src": "article:vehicross"
    },
    "top": null,
    "built": {
      "count": 5958,
      "approx": false,
      "note": "",
      "src": "article:vehicross"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A concept car that Isuzu actually built, the VehiCROSS wrapped a short Trooper chassis in a wild, cladding-armored body and added off-road-motorcycle dampers and a computer-controlled four-wheel-drive system. Only 5,958 were made, and its shape still seems to belong to some later decade.",
    "story": [
      "Isuzu showed the VehiCROSS at the 1993 Tokyo show and then, remarkably, built it almost unchanged, using inexpensive ceramic stamping dies and a raid on its own parts bin: the short-wheelbase Trooper's chassis, the Rodeo's dashboard. Ceramic dies wear out quickly, so scarcity was built in from the start. What emerged was a short, tall, armored-looking 2-door with a titanium-finish grille, a matte black hood panel and a spare wheel hidden inside the tailgate, sold in Japan from 1997 and in America from 1999 with a 215 hp 3.5-liter V6.",
      "Underneath, it meant business. BorgWarner's Torque on Demand system shuffled power between the axles on its own, a proper low range waited for the rough stuff, and its monotube dampers with external reservoirs came straight from off-road motorcycle racing. The ride is firm, the rear window nearly useless and the fuel economy poor, but a VehiCROSS took class stage wins on the 1998 Dakar, and Four Wheeler rated it best for trail and highway performance in its 2000 comparison. American buyers wanted bigger, more familiar trucks, and production stopped in 2001. Those who own one now tend to keep it for good."
    ],
    "articles": [
      "vehicross"
    ],
    "photo": {
      "file": "1999 Isuzu VehiCROSS Ironman Edition in Victory White, front right, 08-17-2026.jpg",
      "credit": "Cutlass",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Isuzu VehiCROSS"
    ]
  },
  {
    "id": "mitsubishi-pajero",
    "name": "Mitsubishi Pajero (second generation)",
    "aka": [
      "Mitsubishi Montero",
      "Mitsubishi Shogun"
    ],
    "make": "Mitsubishi",
    "maker": "Mitsubishi Motors",
    "country": "Japan",
    "years": "1991–1999",
    "start": 1991,
    "end": 1999,
    "body": "3- and 5-door SUV",
    "engine": "3.0-liter V6",
    "drive": "Super Select four-wheel drive (2H, full-time 4H, locked high and low range)",
    "gearbox": "5-speed manual or 4-speed automatic",
    "specsFor": "1992 Mitsubishi Montero SR, US market (Car and Driver 1992 comparison test)",
    "power": {
      "hp": 151,
      "note": "",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "weight": {
      "kg": 1995,
      "note": "",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "zero60": {
      "sec": 12.2,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Mitsubishi Pajero (first generation)",
      "id": null
    },
    "successor": {
      "name": "Mitsubishi Pajero (third generation)",
      "id": null
    },
    "quick": "The second-generation Pajero, sold as the Montero in America and the Shogun in Britain, turned Mitsubishi's Dakar-winning 4x4 into a global icon, with clever Super Select four-wheel drive and a dashboard pod reading pitch, roll, altitude and heading. Square, tough and built to cross deserts, it is one of the defining off-roaders of the 1990s.",
    "story": [
      "Mitsubishi built the Pajero's reputation in public, winning its class on its Dakar debut in 1983 and eventually taking 12 outright victories. The second generation, launched in 1991, carried that pedigree into a wider, roomier family 4x4 in short- and long-wheelbase forms, with a separate frame, torsion-bar front suspension and a coil-sprung live rear axle. Its party piece was Super Select: a single lever offering rear drive, full-time four-wheel drive that is happy on dry pavement, and locked high and low ranges, with 2H-to-4H shifts allowed at up to 62 mph. Up on the dash, 3 gauges reported tilt, altitude and heading.",
      "On pavement it is tall and slow; Car and Driver's 1992 Montero SR weighed 1,995 kg (4,399 lb), made 151 hp and needed 12.2 seconds to reach 60 mph. Off pavement the story flips. The low range is short, the view out superb, and the side-hinged rear door with its built-in tool kit makes loading on a slope easy. It became a fixture at Japanese ski resorts, spawned the wild Pajero Evolution, and handed the name to successors that ran until 2021."
    ],
    "articles": [
      "three-dials-and-a-swing-gate"
    ],
    "photo": {
      "file": "1991 Mitsubishi Pajero 2.5TD Wagon LWB, front right (Bridgehampton).jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Mitsubishi Montero",
      "Mitsubishi Shogun"
    ]
  },
  {
    "id": "isuzu-trooper",
    "name": "Isuzu Trooper (second generation)",
    "aka": [
      "Isuzu Bighorn",
      "Acura SLX",
      "Honda Horizon",
      "Opel Monterey",
      "Vauxhall Monterey",
      "Holden Jackaroo",
      "Holden Monterey",
      "Chevrolet Trooper"
    ],
    "make": "Isuzu",
    "maker": "Isuzu",
    "country": "Japan",
    "years": "1991–2002",
    "start": 1991,
    "end": 2002,
    "body": "3- and 5-door SUV",
    "engine": "3.2-liter V6 (DOHC)",
    "drive": "Part-time four-wheel drive with low range (Torque On Demand from 1998)",
    "gearbox": "5-speed manual or 4-speed automatic",
    "specsFor": "1992 Isuzu Trooper LS, US market (Car and Driver 1992 comparison test)",
    "power": {
      "hp": 190,
      "note": "",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "weight": {
      "kg": 1940,
      "note": "",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "zero60": {
      "sec": 10.5,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:three-dials-and-a-swing-gate"
    },
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Isuzu Trooper (first generation)",
      "id": null
    },
    "successor": {
      "name": "Isuzu Axiom and Isuzu Ascender (US market)",
      "id": null
    },
    "quick": "Isuzu's second-generation Trooper was a tall, square, body-on-frame 4x4 that beat the Jeep Grand Cherokee and Ford Explorer to win Car and Driver's 1992 sport-utility comparison. Vast inside, stiff and tough, it was respected enough to be rebadged by Honda, Acura, Opel, Vauxhall, Holden and others, yet it never escaped its plain looks or a disputed 1996 Consumer Reports safety rating.",
    "story": [
      "The Trooper was older than the Pajero, 4Runner and Pathfinder, and by its 1992 redesign it had grown into something remarkably complete. A separate ladder frame carried double-wishbone torsion-bar front suspension and a coil-sprung live rear axle on multiple links, a big step up in ride over the old leaf springs. The 3.2-liter V6 made up to 190 hp, later 215 from a 3.5, and from 1998 BorgWarner's Torque On Demand fed the front axle automatically whenever the rear wheels slipped. Behind a 2-piece side-hinged rear door waited 117.8 cubic feet of cargo space.",
      "Car and Driver judged its structure so stiff that everything else worked better, and on the road it steered and gripped more convincingly than its height suggested. The magazine's 1992 Trooper LS, at 1,940 kg (4,280 lb), still beat a Montero to 60 mph by nearly 2 seconds. What it lacked was a legend: no desert wins, no heritage, just plain looks. When Consumer Reports rated it Not Acceptable in 1996 after its avoidance-maneuver test, a long legal fight followed and American sales never recovered. The Trooper left the US after 2002, and owners still run them past 300,000 miles."
    ],
    "articles": [
      "three-dials-and-a-swing-gate"
    ],
    "photo": {
      "file": "1998 Isuzu Trooper DT LWB 3.0 Front.jpg",
      "credit": "Vauxford",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Acura SLX",
      "Holden Jackaroo",
      "Isuzu Bighorn",
      "Opel Monterey"
    ]
  },
  {
    "id": "subaru-brat",
    "name": "Subaru BRAT",
    "aka": [
      "Subaru Brumby",
      "Subaru Shifter",
      "Subaru 284",
      "Subaru MV"
    ],
    "make": "Subaru",
    "maker": "Subaru (Fuji Heavy Industries)",
    "country": "Japan",
    "years": "1978–1994",
    "start": 1978,
    "end": 1994,
    "body": "Two-door coupe utility (small pickup)",
    "engine": "1.8-liter flat-4",
    "drive": "Selectable four-wheel drive",
    "gearbox": "4-speed manual or 3-speed automatic",
    "specsFor": "1981-1987 Subaru BRAT, 1.8-liter EA-81, North American market",
    "power": {
      "hp": 73,
      "note": "",
      "src": "https://hagerty.com/media/?p=76947"
    },
    "weight": {
      "kg": 1000,
      "note": "",
      "src": "https://hagerty.com/media/?p=76947"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 100000,
      "approx": true,
      "note": "North American sales",
      "src": "https://hagerty.com/media/?p=76947"
    },
    "predecessor": null,
    "successor": {
      "name": "Subaru Baja (spiritual successor)",
      "id": null
    },
    "quick": "Subaru's BRAT was a small, car-based four-wheel-drive pickup with a flat-4, a cheeky acronym and, in North America, 2 rear-facing seats bolted into its bed. Cheap, tough and endlessly likable, it became a cult classic and the spiritual ancestor of the Baja.",
    "story": [
      "Built on the Leone wagon's underpinnings, the BRAT, short for Bi-drive Recreational All-terrain Transporter, reached America in 1978 as a light, simple pickup with selectable four-wheel drive and a boxer engine of 1.6 liters, later 1.8. Its most famous feature was a matter of paperwork. Imported light trucks faced a 25 percent tariff, so Subaru carpeted the bed and welded in 2 rear-facing plastic jump seats, and the BRAT entered as a passenger car instead. Riders sat backward in the open air, which was every bit as much fun as it sounds.",
      "With 73 hp in later form and roughly 1,000 kg (2,200 lb) to carry, it was never quick, but it went almost anywhere and refused to quit, which won it a loyal following and at least one famous owner: Ronald Reagan kept a 1978 BRAT at his Santa Barbara ranch for years. Tamiya even turned it into a radio-control kit. The jump seats disappeared after 1985, North American sales ended in 1987, and production for other markets carried on until 1994. Values are climbing now, and a clean one draws a crowd wherever it parks."
    ],
    "articles": [
      "girls-know-best"
    ],
    "photo": {
      "file": "Subaru Brat - 41322809685.jpg",
      "credit": "Jacob Frey 4A",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Subaru Brat"
    ]
  },
  {
    "id": "bmw-135is",
    "name": "BMW 135is",
    "aka": [],
    "make": "BMW",
    "maker": "BMW",
    "country": "Germany",
    "years": "2012–2013",
    "start": 2012,
    "end": 2013,
    "body": "Two-door coupe and convertible",
    "engine": "3.0-liter single twin-scroll turbo inline-6 (N55)",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual or 7-speed dual-clutch",
    "specsFor": "2013 BMW 135is coupe, US market",
    "power": {
      "hp": 320,
      "note": "at 5,800 rpm",
      "src": "article:seventy-dollars-apart"
    },
    "weight": {
      "kg": 1530,
      "note": "",
      "src": "article:seventy-dollars-apart"
    },
    "zero60": {
      "sec": 4.9,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.autoblog.com/2013/05/28/2013-bmw-135is-coupe-review/"
    },
    "top": {
      "mph": 150,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:seventy-dollars-apart"
    },
    "built": {
      "count": 816,
      "approx": true,
      "note": "",
      "src": "article:seventy-dollars-apart"
    },
    "predecessor": {
      "name": "BMW 1 Series M Coupe",
      "id": "bmw-1m-coupe"
    },
    "successor": {
      "name": "BMW M235i",
      "id": null
    },
    "quick": "The final and fiercest regular E82 coupe, a one-model-year send-off with 320 hp, a factory performance exhaust and hydraulic steering. Almost nobody bought one new, which is exactly what makes it worth hunting for now.",
    "story": [
      "BMW built the 135is as a farewell rather than a manifesto. It took the straight-six 1 Series coupe, retuned the N55, made the free-breathing BMW Performance exhaust and the M Sport kit standard, and sold the result for a single model year before the whole E82 line was retired. On a winding road it is a joy: short wheelbase, rear drive, real weight and feedback in the hydraulic rack, and an exhaust that pops and crackles every time the throttle closes. On a circuit it is less heroic. With an open differential and run-flat tires, the front end surrenders long before the engine runs out of enthusiasm.",
      "Its real enemy was the showroom. It cost almost exactly what a brand-new 335i sedan did, and that car had more room, more doors and more badge, so only about 800 found buyers in North America. It also lived in the shadow of the 1 Series M Coupe, which shares its chassis and proportions but adds a genuine limited-slip differential. The M car became a blue-chip collectible. The 135is became the overlooked side door into the same small, loud, steering-first idea."
    ],
    "articles": [
      "seventy-dollars-apart"
    ],
    "photo": {
      "file": "2013 BMW 135is.jpg",
      "credit": "DestinationFearFan",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "BMW 135is"
    ]
  },
  {
    "id": "bmw-1m-coupe",
    "name": "BMW 1 Series M Coupe",
    "aka": [
      "BMW 1M",
      "BMW 1M Coupe"
    ],
    "make": "BMW",
    "maker": "BMW M",
    "country": "Germany",
    "years": "2011–2012",
    "start": 2011,
    "end": 2012,
    "body": "Two-door coupe",
    "engine": "3.0-liter twin-turbo inline-6 (N54)",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "2011 BMW 1 Series M Coupe, US market",
    "power": {
      "hp": 335,
      "note": "at 5,900 rpm",
      "src": "article:homage-by-accident"
    },
    "weight": {
      "kg": 1495,
      "note": "",
      "src": "article:homage-by-accident"
    },
    "zero60": {
      "sec": 4.7,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:homage-by-accident"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "https://www.bmwblog.com/2010/12/10/world-premiere-bmw-1-series-m-coupe"
    },
    "built": {
      "count": 6309,
      "approx": false,
      "note": "worldwide, against an original plan for 2,700",
      "src": "article:homage-by-accident"
    },
    "predecessor": null,
    "successor": {
      "name": "BMW M2 (F87)",
      "id": null
    },
    "quick": "BMW M built it largely from parts already on the shelf, putting the M3's suspension, brakes and locking differential under a short 1 Series coupe with a twin-turbo six and a manual gearbox. It sold more than twice what BMW planned and became a collectible almost the day it landed.",
    "story": [
      "The 1M is what a small team with a thin budget can do with the right leftovers. The chassis was the E82 coupe, rear-drive only because BMW had stubbornly refused to follow its rivals to front-wheel drive. The engine was the N54 twin-turbo six from the 135i, not an M-built unit at all. From the V8 M3 came aluminum suspension, big brakes, a quicker steering rack and a mechanical limited-slip differential able to lock completely, all tucked under flared arches over a track 55 mm wider than the donor car. A 6-speed manual was the only gearbox offered.",
      "Off boost it is calm, almost lazy. Catch the turbos mid-corner, though, and the short wheelbase lets the tail swing wide with real appetite. BMW sold it as heir to the original M3, and fans read it as an apology for the heavier V8 car, even though the 2 shared showrooms for 18 months. Whatever the motive, buyers got it immediately: BMW planned 2,700 and built 6,309. The M2 that followed beat it on every stopwatch, but the 1M had already proved the formula."
    ],
    "articles": [
      "homage-by-accident"
    ],
    "photo": {
      "file": "BMW 1 Series M Coupe (front quarter).jpg",
      "credit": "Overlaet",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "BMW 1 Series M Coupe"
    ]
  },
  {
    "id": "bmw-z3-m-coupe",
    "name": "BMW Z3 M Coupe",
    "aka": [
      "BMW M Coupe",
      "Clown Shoe"
    ],
    "make": "BMW",
    "maker": "BMW M",
    "country": "Germany",
    "years": "1998–2002",
    "start": 1998,
    "end": 2002,
    "body": "Two-door, two-seat hatchback coupe",
    "engine": "3.2-liter inline-6 (S50, S52 or S54 depending on year and market)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "2002 BMW Z3 M Coupe with the S54 engine, US market, Car and Driver test",
    "power": {
      "hp": 315,
      "note": "at 7,400 rpm, US-market S54",
      "src": "article:when-the-engineers-won"
    },
    "weight": {
      "kg": 1415,
      "note": "",
      "src": "article:when-the-engineers-won"
    },
    "zero60": {
      "sec": 4.8,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:when-the-engineers-won"
    },
    "top": {
      "mph": 162,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:when-the-engineers-won"
    },
    "built": {
      "count": 6291,
      "approx": false,
      "note": "",
      "src": "article:when-the-engineers-won"
    },
    "predecessor": null,
    "successor": {
      "name": "BMW Z4 M Coupe",
      "id": "bmw-z4-m-coupe"
    },
    "quick": "A Z3 roadster given a fixed roof, a glass hatchback tail and an M3 engine, it looked so strange that critics called it the Clown Shoe. Beneath the joke was a body far stiffer than the roadster's and one of the most vivid small cars BMW has ever made.",
    "story": [
      "The M Coupe was an engineers' project that got past the accountants on one condition: it had to be cheap to build. So the doors, the cabin and nearly everything ahead of the windshield came straight from the Z3, while the money went into a roof and bracing that made the body roughly 2.6 times as stiff in torsion as the open car. Behind the seats sat a long glass hatch over a surprisingly deep cargo bay. The 5-speed gearbox was simply what the budget allowed, and the long nose and stubby tail came out looking like nothing else on the road.",
      "Drive one and the laughter stops. The steering chatters with information, the straight-six grows louder and more urgent past 5,000 rpm, and the short wheelbase and old semi-trailing-arm rear axle mean a sudden lift mid-corner can bring the tail around in a hurry. It rewards a deft driver and punishes a lazy one. Only 6,291 were built, and the final S54 cars, with 315 hp in US trim, are the ones collectors chase. The Z4 M Coupe that replaced it was faster and calmer, yet never inspired quite the same devotion."
    ],
    "articles": [
      "when-the-engineers-won"
    ],
    "photo": {
      "file": "BMW Z3 M Coupe Estoril Blue.jpg",
      "credit": "Dennis Elzinga",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "BMW Z3 M Coupe"
    ]
  },
  {
    "id": "bmw-z4-m-coupe",
    "name": "BMW Z4 M Coupe",
    "aka": [
      "BMW M Coupe (E86)"
    ],
    "make": "BMW",
    "maker": "BMW M",
    "country": "Germany",
    "years": "2006–2008",
    "start": 2006,
    "end": 2008,
    "body": "Two-door, two-seat fastback coupe",
    "engine": "3.2-liter inline-6 (S54)",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "2007 BMW Z4 M Coupe, US market, Car and Driver test",
    "power": {
      "hp": 330,
      "note": "",
      "src": "article:when-the-engineers-won"
    },
    "weight": {
      "kg": 1500,
      "note": "",
      "src": "article:when-the-engineers-won"
    },
    "zero60": {
      "sec": 4.8,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:when-the-engineers-won"
    },
    "top": {
      "mph": 160,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:when-the-engineers-won"
    },
    "built": {
      "count": 4581,
      "approx": false,
      "note": "worldwide",
      "src": "article:when-the-engineers-won"
    },
    "predecessor": {
      "name": "BMW Z3 M Coupe",
      "id": "bmw-z3-m-coupe"
    },
    "successor": null,
    "quick": "The second, more serious attempt at a small M coupe, with a fastback roof, the 330-hp S54 straight-six, a 6-speed manual and hydraulic steering. It is quicker, stiffer and more composed than the Z3 version, and rarer too.",
    "story": [
      "Where the Z3 M Coupe was a happy accident, the Z4 version arrived looking like it meant every crease. Its roof runs into a fastback tail that finally makes sense of the long hood, giving it a tauter, more resolved profile than the Z4 roadster it shares a nose with. Underneath sat the high-revving S54 from the E46 M3, now with a sixth gear, a multi-link rear axle, a variable locking differential and brakes drawn from the most focused E46 M3s. Crucially, it kept hydraulic power steering while ordinary Z4s switched to electric.",
      "On a fast road it feels like one solid object, settling early into a corner and refusing to be knocked off line where the older car would squirm. It is not gentle company: the ride is firm, the clutch heavy, the cabin dark and the view backward poor. Car and Driver found it exactly as quick to 60 mph as a Porsche Cayman S, though the Porsche won on polish. BMW built only 4,581 in 3 years, and a GT3 racing version later won 11 of 16 VLN races at the Nürburgring, proof the shape was more than handsome."
    ],
    "articles": [
      "when-the-engineers-won"
    ],
    "photo": {
      "file": "2007 BMW Z4 M Coupé in Monaco Blue Metallic, front left.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "BMW Z4 M Coupe"
    ]
  },
  {
    "id": "bmw-z4-sdrive35is",
    "name": "BMW Z4 sDrive35is",
    "aka": [
      "BMW Z4 35is"
    ],
    "make": "BMW",
    "maker": "BMW",
    "country": "Germany",
    "years": "2010–2016",
    "start": 2010,
    "end": 2016,
    "body": "Two-seat roadster with retractable hardtop",
    "engine": "3.0-liter twin-turbo inline-6 (N54)",
    "drive": "Rear-wheel drive",
    "gearbox": "7-speed dual-clutch",
    "specsFor": "2011 BMW Z4 sDrive35is (E89), US market",
    "power": {
      "hp": 335,
      "note": "at 5,900 rpm",
      "src": "article:zenith-bmw-z4-35is"
    },
    "weight": {
      "kg": 1515,
      "note": "",
      "src": "article:zenith-bmw-z4-35is"
    },
    "zero60": {
      "sec": 4.5,
      "kind": "",
      "note": "From our story",
      "src": "article:zenith-bmw-z4-35is"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "https://www.bmwblog.com/?p=25542"
    },
    "built": null,
    "predecessor": {
      "name": "BMW Z4 M Roadster (E85)",
      "id": null
    },
    "successor": {
      "name": "BMW Z4 M40i (G29)",
      "id": null
    },
    "quick": "The most powerful E89 Z4, pairing a 335-hp twin-turbo six with a 7-speed dual-clutch gearbox, adaptive suspension and a folding metal roof. It was tuned for scenic detours rather than lap records, and it has aged into one of the most quietly appealing BMW roadsters.",
    "story": [
      "The sDrive35is never tried to beat the Porsche Boxster at its own game. BMW took the N54 twin-turbo six, added an overboost function that lifts torque to 369 lb-ft for a few seconds at full throttle, fitted a 7-speed dual-clutch transmission and firmer adaptive dampers, and pointed the result at the open road. The power arrives smoothly and keeps arriving, the exhaust hardens into a rasp near the redline, and the gearbox cracks off downshifts with an encouraging bark.",
      "With the retractable hardtop raised it is a snug, refined grand tourer; with it folded away, an ordinary coast road becomes an occasion. That double life is the point, and also why a press corps busy timing laps mostly preferred the Boxster. The long hood and clean shoulder line tie it to a roadster tradition BMW traces through the 507 back to the 315/1 of 1934. Values fell hard after new, which leaves it among the better buys for anyone who would rather cover ground beautifully than chase a stopwatch."
    ],
    "articles": [
      "zenith-bmw-z4-35is"
    ],
    "photo": {
      "file": "BMW Z4 sDrive35is.JPG",
      "credit": "Wajira Somaratne",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "BMW Z4 sDrive35is"
    ]
  },
  {
    "id": "bmw-507",
    "name": "BMW 507",
    "aka": [],
    "make": "BMW",
    "maker": "BMW",
    "country": "Germany",
    "years": "1956–1959",
    "start": 1956,
    "end": 1959,
    "body": "Two-seat roadster (optional hardtop)",
    "engine": "3.2-liter aluminum OHV V8 (3,168 cc)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed manual (ZF)",
    "specsFor": "BMW 507, period specification",
    "power": {
      "hp": 150,
      "note": "about 150 hp at 5,000 rpm",
      "src": "article:bmw-507"
    },
    "weight": {
      "kg": 1330,
      "note": "",
      "src": "article:bmw-507"
    },
    "zero60": {
      "sec": 11,
      "kind": "tested",
      "note": "Road test",
      "src": "article:bmw-507"
    },
    "top": {
      "mph": 124,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:bmw-507"
    },
    "built": {
      "count": 252,
      "approx": false,
      "note": "",
      "src": "article:bmw-507"
    },
    "predecessor": null,
    "successor": {
      "name": "BMW Z8 (spiritual successor)",
      "id": null
    },
    "quick": "BMW's 1950s V8 roadster for wealthy Americans, drawn by Albrecht von Goertz and shaped by hand in aluminum. It cost far more to build than anyone planned and helped push BMW toward collapse, yet it became the most romantic car Munich has ever made.",
    "story": [
      "The 507 began as Max Hoffman's idea. The New York importer was convinced Americans would buy thousands of a glamorous German roadster priced below the Mercedes-Benz 300SL, and a BMW still struggling after the war agreed to build it. Goertz, an industrial designer who had never drawn an entire car, gave it a long, calm hood, slim kidneys and soft haunches that look as right today as they did in 1955. Under the hand-formed aluminum body sat a light-alloy 3.2-liter V8 and a 4-speed gearbox on a shortened sedan chassis.",
      "It was never a sprinter. Period tests put 60 mph about 11 seconds away, and it behaved more like an elegant touring car than a racer, picking up speed with a warm V8 voice. The trouble was cost. Hand-beaten panels meant no 2 cars were quite identical, the price climbed toward 300SL territory, and only 252 were built before production stopped in 1959. Elvis Presley drove one, John Surtees kept his for life, and the 507 now ranks among the most coveted BMWs ever built, a sales disaster that matured into a legend."
    ],
    "articles": [
      "bmw-507"
    ],
    "photo": {
      "file": "BMW 507 Classic-Gala 2022 1X7A0187.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "BMW 507"
    ]
  },
  {
    "id": "bmw-i8",
    "name": "BMW i8",
    "aka": [
      "BMW i8 Roadster"
    ],
    "make": "BMW",
    "maker": "BMW i",
    "country": "Germany",
    "years": "2014–2020",
    "start": 2014,
    "end": 2020,
    "body": "Two-door 2+2 coupe and two-seat roadster",
    "engine": "1.5-liter turbo 3-cylinder plus front electric motor (plug-in hybrid)",
    "drive": "All-wheel drive (engine drives the rear, motor drives the front)",
    "gearbox": "6-speed automatic (engine), 2-speed (electric motor)",
    "specsFor": "2019-2020 BMW i8 Roadster, US market",
    "power": {
      "hp": 369,
      "note": "combined system output",
      "src": "article:three-cylinders-no-apologies"
    },
    "weight": {
      "kg": 1590,
      "note": "",
      "src": "article:three-cylinders-no-apologies"
    },
    "zero60": {
      "sec": 4.4,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:three-cylinders-no-apologies"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:three-cylinders-no-apologies"
    },
    "built": {
      "count": 20465,
      "approx": false,
      "note": "16,581 coupes and 3,884 Roadsters",
      "src": "article:three-cylinders-no-apologies"
    },
    "predecessor": null,
    "successor": null,
    "quick": "BMW's plug-in hybrid sports car, a carbon-fiber passenger cell with a 1.5-liter three-cylinder behind the seats and an electric motor up front, wrapped in a body that still looks like a concept. It was never as quick as its shape promised, but nobody has made the same argument as convincingly since.",
    "story": [
      "The i8 was BMW wagering that the sports car would survive by getting cleverer rather than louder. Its passenger cell is carbon-fiber reinforced plastic, bolted to an aluminum module holding the battery and 2 separate drivetrains: a turbocharged three-cylinder turning the rear wheels through a 6-speed automatic, and an electric motor driving the front wheels. Every dramatic detail has a job. The flying buttresses channel air, the upward-swinging doors clear a tall, wide sill, and the low stance comes from a battery laid in the floor.",
      "Critics judged it as a supercar and marked it down. A 0-60 mph time of about 4.4 seconds is quick, but the shape suggested far more, the engine note was partly played through the speakers, and the electric range of later cars was only about 18 miles. Treat it as a city car and the verdict flips: silent arrivals, 369 hp on demand and a cabin that has dated gracefully. BMW built 20,465 between 2014 and 2020, only 3,884 of them Roadsters, and no rival has attempted a serious sequel."
    ],
    "articles": [
      "three-cylinders-no-apologies",
      "dying-star"
    ],
    "photo": {
      "file": "BMW i8 Roadster, GIMS 2018, Le Grand-Saconnex (1X7A1877).jpg",
      "credit": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "BMW i8",
      "BMW i8 Roadster"
    ]
  },
  {
    "id": "porsche-911-996",
    "name": "Porsche 911 (996)",
    "aka": [
      "Porsche 996"
    ],
    "make": "Porsche",
    "maker": "Porsche",
    "country": "Germany",
    "years": "1997–2005",
    "start": 1997,
    "end": 2005,
    "body": "Two-door 2+2 coupe, cabriolet and Targa",
    "engine": "3.4-liter water-cooled flat-6 (M96); 3.6-liter from 2002",
    "drive": "Rear-wheel drive (all-wheel drive on Carrera 4)",
    "gearbox": "6-speed manual or 5-speed Tiptronic automatic",
    "specsFor": "1998-2001 Porsche 911 Carrera (996.1) coupe, 3.4-liter, manual",
    "power": {
      "hp": 296,
      "note": "300 PS",
      "src": "article:the-unsung-hero-996"
    },
    "weight": {
      "kg": 1320,
      "note": "",
      "src": "https://www.evo.co.uk/porsche/911/6186/porsche-911-carrera-996-review-history-and-specs"
    },
    "zero60": {
      "sec": 5.2,
      "kind": "claimed",
      "note": "Maker's claim, 0-62 mph",
      "src": "https://www.evo.co.uk/porsche/911/6186/porsche-911-carrera-996-review-history-and-specs"
    },
    "top": {
      "mph": 174,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.evo.co.uk/porsche/911/6186/porsche-911-carrera-996-review-history-and-specs"
    },
    "built": {
      "count": 175262,
      "approx": false,
      "note": "all 996 variants, 1997-2005",
      "src": "article:the-unsung-hero-996"
    },
    "predecessor": {
      "name": "Porsche 911 (993)",
      "id": null
    },
    "successor": {
      "name": "Porsche 911 (997)",
      "id": null
    },
    "quick": "The first water-cooled 911, and for years the one purists loved to mock for its Boxster parts and teardrop headlights. It was also the car that rebuilt the 911 for the modern era and set the template every later generation has followed.",
    "story": [
      "Porsche did not give up air cooling on a whim. By the early 1990s the company was fighting for its independence, and the old engine could no longer meet emissions and power targets, so the 996 was engineered from scratch alongside the Boxster, sharing its front structure, much of its cabin and its headlamps to split the cost. It was longer, roomier, safer and far stiffer than the 993, yet around 50 kg (110 lb) lighter, and its new 3.4-liter flat-six made 300 PS, as much as the old 911 Turbo 3.3.",
      "Purists hated the look and the shared parts, and the Carrera's M96 engine picked up a lasting reputation for intermediate-shaft bearing failures. Behind the wheel, though, it is plainly a 911: hydraulic steering rich in detail, a rear-mounted six that helps the car rotate and then hook up, and far more forgiveness at the limit than any earlier generation. It also gave birth to the first GT3 and a Mezger-engined Turbo. Porsche built 175,262 of them, and time is slowly turning the least loved modern 911 into a respected one."
    ],
    "articles": [
      "the-unsung-hero-996"
    ],
    "photo": {
      "file": "Porsche GH-99603 911 Carrera (23052111445).jpg",
      "credit": "先従隗始",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Porsche 996"
    ]
  },
  {
    "id": "porsche-911-sc",
    "name": "Porsche 911 SC",
    "aka": [],
    "make": "Porsche",
    "maker": "Porsche",
    "country": "Germany",
    "years": "1978–1983",
    "start": 1978,
    "end": 1983,
    "body": "Two-door 2+2 coupe, Targa and (1983) cabriolet",
    "engine": "3.0-liter air-cooled flat-6 (930/03 in European 1978-79 cars)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual (915)",
    "specsFor": "1979 Porsche 911 SC Targa, European specification (930/03 engine)",
    "power": {
      "hp": 178,
      "note": "",
      "src": "article:ghost-in-ice-green"
    },
    "weight": {
      "kg": 1210,
      "note": "",
      "src": "article:ghost-in-ice-green"
    },
    "zero60": {
      "sec": 6.3,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:ghost-in-ice-green"
    },
    "top": {
      "mph": 141,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:ghost-in-ice-green"
    },
    "built": null,
    "predecessor": {
      "name": "Porsche 911 Carrera 3.0",
      "id": null
    },
    "successor": {
      "name": "Porsche 911 Carrera 3.2",
      "id": null
    },
    "quick": "The 3.0-liter air-cooled 911 that carried Porsche through years when its own leadership expected the line to end. Light, unassisted and honest, it is the classic 911 that still asks to be driven rather than displayed, and a rented, privately entered 3.0-liter 911 won the 1978 Monte Carlo Rally.",
    "story": [
      "The SC replaced both the 2.7-liter 911 and the Carrera 3.0 with one simplified, durable 3.0-liter flat-six, at a moment when Porsche's management saw the 911 as yesterday's car. In European form it made 180 PS without the catalytic converters and power losses that dulled American models, and a European Targa weighs only about 1,210 kg (2,670 lb). There is no power steering and no ABS, nothing between driver and road but a slim wheel, a long-throw 915 gearbox and a lot of honest feedback.",
      "It clatters awake, pulls cleanly from low revs and turns hard and vocal toward 5,500 rpm, while the unassisted steering reports every change in grip. Keep the throttle steady through a bend and the weight over the rear wheels works in the driver's favor; lift suddenly and the car makes clear where the engine lives. Its toughness was proved in January 1978, when Jean-Pierre Nicolas took a rented, Group 4 3.0-liter 911 through the snow to win the Monte Carlo Rally. Long ignored, the SC is now prized as the air-cooled 911 that can actually be used."
    ],
    "articles": [
      "ghost-in-ice-green",
      "the-borrowed-crown"
    ],
    "photo": {
      "file": "1982 Porsche 911 SC Targa in Weinrot Metallic, Front Right, 05-27-2023.jpg",
      "credit": "Elise240SX",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "porsche-968-club-sport",
    "name": "Porsche 968 Club Sport",
    "aka": [
      "Porsche 968 CS"
    ],
    "make": "Porsche",
    "maker": "Porsche",
    "country": "Germany",
    "years": "1993–1995",
    "start": 1993,
    "end": 1995,
    "body": "Two-door, two-seat coupe",
    "engine": "3.0-liter inline-4, 16 valves, VarioCam",
    "drive": "Rear-wheel drive (front engine, rear transaxle)",
    "gearbox": "6-speed manual",
    "specsFor": "1993 Porsche 968 Club Sport, European market",
    "power": {
      "hp": 236,
      "note": "240 PS at 6,200 rpm",
      "src": "article:spite-is-the-wrong-word"
    },
    "weight": {
      "kg": 1320,
      "note": "",
      "src": "article:spite-is-the-wrong-word"
    },
    "zero60": {
      "sec": 6.1,
      "kind": "claimed",
      "note": "Maker's claim, 0-62 mph",
      "src": "article:spite-is-the-wrong-word"
    },
    "top": {
      "mph": 158,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:spite-is-the-wrong-word"
    },
    "built": {
      "count": 1538,
      "approx": true,
      "note": "",
      "src": "article:spite-is-the-wrong-word"
    },
    "predecessor": {
      "name": "Porsche 944 S2",
      "id": null
    },
    "successor": {
      "name": "Porsche Boxster (986)",
      "id": null
    },
    "quick": "A lighter, lowered, stripped-out 968 for drivers who wanted the drive and nothing else, with a 3.0-liter four, a rear transaxle and near-perfect balance. Walter Röhrl is widely quoted calling it the best-handling Porsche he ever drove, and not one was sold new in America.",
    "story": [
      "By the early 1990s the 968 was being written off as a facelifted 944 with a bigger price, even though it was more than 80 percent new and carried the largest four-cylinder engine in any production car. Porsche answered with the Club Sport for 1993. The rear seats, power windows and mirrors, most of the sound deadening and the airbag wheel all went; fixed-back Recaro buckets, 17-inch Cup wheels and a 20 mm lower ride height arrived. Weight dropped to 1,320 kg (2,910 lb), and Porsche quietly understated the performance to avoid paying for fresh type approval.",
      "Its speed lives in the chassis rather than the engine. With the engine up front and the gearbox at the back, the mass sits almost exactly midway, the steering builds weight progressively, and the car commits to a line early and stays faithful to it. Britain's Performance Car named it Performance Car of the Year for 1993. Production counts are disputed, from about 1,400 to just over 1,900, and none were sold new in the US. When it ended in 1995, the front-engined, four-cylinder Porsche ended with it."
    ],
    "articles": [
      "spite-is-the-wrong-word"
    ],
    "photo": {
      "file": "1993 Porsche 968 CS in Speedgelb, front right.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Porsche 968 Club Sport"
    ]
  },
  {
    "id": "porsche-928-gts",
    "name": "Porsche 928 GTS",
    "aka": [],
    "make": "Porsche",
    "maker": "Porsche",
    "country": "Germany",
    "years": "1992–1995",
    "start": 1992,
    "end": 1995,
    "body": "Two-door 2+2 hatchback coupe",
    "engine": "5.4-liter V8, 32 valves (5,397 cc)",
    "drive": "Rear-wheel drive (front engine, rear transaxle)",
    "gearbox": "5-speed manual or 4-speed automatic",
    "specsFor": "1995 Porsche 928 GTS, US market (0-60 from Car and Driver's 1992 test of an automatic)",
    "power": {
      "hp": 345,
      "note": "at 5,700 rpm (350 PS)",
      "src": "article:auf-wiedersehen-928"
    },
    "weight": {
      "kg": 1620,
      "note": "",
      "src": "https://newsroom.porsche.com/dam/jcr:ce5ce2fc-3956-4161-a335-9620b7f52f73/Datenblatt%20Porsche%20928%20GTS_%231168.pdf"
    },
    "zero60": {
      "sec": 5.3,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:auf-wiedersehen-928"
    },
    "top": {
      "mph": 171,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:auf-wiedersehen-928"
    },
    "built": {
      "count": 2831,
      "approx": false,
      "note": "worldwide; some sources say 2,904; 406 sold in the US",
      "src": "article:auf-wiedersehen-928"
    },
    "predecessor": {
      "name": "Porsche 928 S4 and 928 GT",
      "id": null
    },
    "successor": null,
    "quick": "The last and finest version of the front-engined V8 Porsche that was meant to replace the 911, with 345 hp, a wider rear track and 911 Turbo front brakes. Porsche could barely sell it, yet it ranks among the great long-distance coupes ever built.",
    "story": [
      "The 928 began as Porsche's clean-sheet plan to succeed the 911: an aluminum V8 up front, a transaxle at the rear for near-even weight distribution, a Weissach rear axle that steers the outside rear wheel slightly inward when the driver lifts, and a smooth, wingless body that won the 1978 European Car of the Year title. Buyers kept choosing 911s anyway, and a new chief executive decided the old car would live. The 928 was left to be refined year after year, and the GTS of 1992 to 1995 was the final answer.",
      "Its 5.4-liter V8 makes 345 hp and 369 lb-ft, and it piles on speed without fuss, the engine barely working at a fast highway cruise. Car and Driver timed an automatic at 5.3 seconds to 60 mph and chose it over BMW's 850i. Under the big glass hatch there is room for proper luggage, and 2 small rear seats complete a car made for crossing states rather than lapping circuits. Only 2,831 were built, 406 of them for the US, and manual cars are now serious collectibles. No later Porsche has carried the name."
    ],
    "articles": [
      "auf-wiedersehen-928"
    ],
    "photo": {
      "file": "Porsche 928 GTS 1X7A6513.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Porsche 928 GTS"
    ]
  },
  {
    "id": "jaguar-mark-2",
    "name": "Jaguar Mark 2",
    "aka": [
      "Jaguar Mk II",
      "Jaguar Mk2"
    ],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "1959–1967",
    "start": 1959,
    "end": 1967,
    "body": "Four-door sedan",
    "engine": "3.8-liter twin-cam inline-6 (2.4 and 3.4 liters also offered)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed manual with optional overdrive, or automatic",
    "specsFor": "Jaguar Mark 2 3.8, 1959-1967",
    "power": {
      "hp": 220,
      "note": "220 bhp gross, Jaguar's claim",
      "src": "article:jaguar-mk2"
    },
    "weight": {
      "kg": 1525,
      "note": "",
      "src": "https://jec.org.uk/?p=8189"
    },
    "zero60": null,
    "top": {
      "mph": 125,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:jaguar-mk2"
    },
    "built": {
      "count": 83701,
      "approx": false,
      "note": "",
      "src": "article:jaguar-mk2"
    },
    "predecessor": {
      "name": "Jaguar Mark 1 (2.4 and 3.4)",
      "id": null
    },
    "successor": {
      "name": "Jaguar 240 and 340",
      "id": null
    },
    "quick": "Jaguar's compact 1959 sedan put a Le Mans-bred twin-cam straight-6 behind a walnut dashboard and proved that a 4-door could keep pace with sports cars. The 3.8 could reach 125 mph, and executives, racing drivers, police forces and, awkwardly, the people the police were chasing all wanted one.",
    "story": [
      "On paper the Mark 2 was a respectable family sedan: slim chrome window frames, leather chairs and enough burl walnut to panel a study. Underneath sat the XK straight-6 that had already won at Le Mans, disc brakes at all 4 wheels when most rivals still relied on drums and, in the 3.8, 220 hp with 240 lb-ft of torque. Nobody had blended manners and muscle quite like that before, and buyers noticed, taking 83,701 of them in 8 years. Racers strung together 20 consecutive wins in the British Saloon Car Championship, police forces put the car on traffic patrol, and Britain's robbers wanted one for exactly the same reasons.",
      "By modern standards it is a handful. Without power assistance the steering is heavy at parking speeds, the early Moss gearbox demands patience, and the live rear axle lets the tail wander when the road gets wet and bumpy. That is part of the appeal. A Mark 2 rewards smooth hands and punishes clumsy ones, and in doing so it wrote the brief that every fast executive sedan since, the BMW M5 included, has followed."
    ],
    "articles": [
      "jaguar-mk2"
    ],
    "photo": {
      "file": "Jaguar Mark 2 3.8 Litre, front view.jpg",
      "credit": "Cjp24",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Jaguar Mark II"
    ]
  },
  {
    "id": "jaguar-e-type",
    "name": "Jaguar E-Type",
    "aka": [
      "Jaguar XK-E",
      "Jaguar XKE"
    ],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "1961–1974",
    "start": 1961,
    "end": 1974,
    "body": "Two-door roadster and coupe (later a 2+2 coupe)",
    "engine": "3.8-liter twin-cam inline-6 (later 4.2-liter inline-6 and 5.3-liter V12)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed manual (automatic offered on some later cars)",
    "specsFor": "Jaguar E-Type Series 1 3.8, 1961 launch specification",
    "power": {
      "hp": 265,
      "note": "265 bhp gross, Jaguar's figure",
      "src": "https://media.jlr.com/corporate/news/2011/01/jaguar-celebrates-50-years-iconic-e-type"
    },
    "weight": null,
    "zero60": {
      "sec": 7.1,
      "kind": "tested",
      "note": "Motor test",
      "src": "https://en.wikipedia.org/wiki/Jaguar_E-Type"
    },
    "top": {
      "mph": 150,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:nine-lives"
    },
    "built": {
      "count": 70000,
      "approx": true,
      "note": "",
      "src": "https://media.jlr.com/corporate/news/2011/01/jaguar-celebrates-50-years-iconic-e-type"
    },
    "predecessor": {
      "name": "Jaguar XK150",
      "id": null
    },
    "successor": {
      "name": "Jaguar XJ-S",
      "id": null
    },
    "quick": "The sports car that stopped the 1961 Geneva show, shaped by an aerodynamicist and quoted at 150 mph for a fraction of a Ferrari's price. It brought race-proven engineering to the showroom and is still, for many people, the most beautiful car ever built.",
    "story": [
      "Malcolm Sayer came to Jaguar from the aircraft industry, and he drew the E-Type's body to an engineer's brief, with low drag as the goal: a long, tapering hood, a cabin pushed far back, surfaces that let the air slip past. It was unveiled in March 1961 with a 3.8-liter twin-cam straight-6 rated at 265 hp, a monocoque center section derived from the Le Mans-winning D-Type, independent rear suspension and disc brakes all around. Jaguar brought a single demonstrator to Geneva, and so many people wanted a ride that test driver Norman Dewis was sent to fetch another, driving it through the night across Europe.",
      "What made it matter was the price. Exotic speed had been the preserve of the very rich, and the E-Type put something close to it within reach of buyers who worked for a living. The legend was never perfectly tidy, since few production cars matched the 150 mph the press cars managed, but nobody much minded. Over 3 series it gained a 4.2-liter engine, a 2+2 body and finally a V12, and more than 70,000 were built before production ended in 1974. Every Jaguar sports car since has been measured against it."
    ],
    "articles": [
      "nine-lives"
    ],
    "photo": {
      "file": "Jaguar E-Type Flat Floor Roadster 850049 1961.jpg",
      "credit": "Calreyn88",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Jaguar E-Type"
    ]
  },
  {
    "id": "jaguar-f-type",
    "name": "Jaguar F-Type",
    "aka": [],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "2013–2024",
    "start": 2013,
    "end": 2024,
    "body": "Two-door convertible and coupe",
    "engine": "5.0-liter supercharged V8 (supercharged V6 and turbo 4-cylinder versions also offered)",
    "drive": "Rear-wheel drive (all-wheel drive on some later versions)",
    "gearbox": "8-speed automatic (6-speed manual on some V6 cars)",
    "specsFor": "2013 Jaguar F-Type V8 S convertible, launch specification",
    "power": {
      "hp": 488,
      "note": "",
      "src": "https://www.carmagazine.co.uk/car-reviews/jaguar/jaguar-f-type-v8-s-2013-review/"
    },
    "weight": {
      "kg": 1665,
      "note": "",
      "src": "https://www.carmagazine.co.uk/car-reviews/jaguar/jaguar-f-type-v8-s-2013-review/"
    },
    "zero60": {
      "sec": 4.2,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.carmagazine.co.uk/car-reviews/jaguar/jaguar-f-type-v8-s-2013-review/"
    },
    "top": {
      "mph": 186,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "https://www.carmagazine.co.uk/car-reviews/jaguar/jaguar-f-type-v8-s-2013-review/"
    },
    "built": {
      "count": 87731,
      "approx": false,
      "note": "all versions, coupe and convertible, 2013-2024",
      "src": "https://newsroomcms.jaguarlandrover.com/news/2024/06/jaguar-marks-sports-car-anniversary-final-f-type"
    },
    "predecessor": {
      "name": "Jaguar XK (X150)",
      "id": null
    },
    "successor": null,
    "quick": "A compact 2-seat Jaguar sports car launched in 2013, with a crackling supercharged V8 at the top of the range. Designed under Ian Callum to stand on its own rather than imitate the E-Type, it ended production in 2024 as the last gasoline sports car Jaguar would build.",
    "story": [
      "The F-Type arrived in 2013 as a convertible, with a coupe close behind, and its designers were firm that it would not be a nostalgia act. There are no E-Type quotations in the bodywork. Instead it has broad hips over the rear wheels, slim lights and a crouched, coiled stance that owes more to the angular XJ-S than to anything round. The V8 S launch car paired a 5.0-liter supercharged V8 with an 8-speed automatic, 488 hp and a claimed 4.2 seconds to 60 mph, and its exhaust crackled and banged on the overrun with a theatrical enthusiasm that became the car's calling card.",
      "Supercharged V6 versions sat below the V8 from the start, and over the years came all-wheel drive, a 4-cylinder model and the ferocious SVR. It was rarely the lightest or most precise car in its class. It was usually the one people turned to watch. When the last car was built in 2024, after 87,731 in all, Jaguar's gasoline sports cars, a line running back through the E-Type to the XK120, came to an end with it."
    ],
    "articles": [
      "nine-lives"
    ],
    "photo": {
      "file": "2020 Jaguar F-Type coupe.jpg",
      "credit": "Hugh Llewelyn",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Jaguar F-Type"
    ]
  },
  {
    "id": "jaguar-xjr-x308",
    "name": "Jaguar XJR (X308)",
    "aka": [],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "1997–2003",
    "start": 1997,
    "end": 2003,
    "body": "Four-door sedan",
    "engine": "4.0-liter supercharged V8",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed automatic (Mercedes-Benz W5A580)",
    "specsFor": "2000 Jaguar XJR (X308), US market, as tested by Car and Driver, March 2000",
    "power": {
      "hp": 370,
      "note": "at 6,150 rpm",
      "src": "article:mud-on-the-collar"
    },
    "weight": {
      "kg": 1848,
      "note": "",
      "src": "article:mud-on-the-collar"
    },
    "zero60": {
      "sec": 5.3,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:mud-on-the-collar"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:mud-on-the-collar"
    },
    "built": {
      "count": 15703,
      "approx": false,
      "note": "15,203 standard XJRs plus 500 XJR 100 limited editions",
      "src": "article:mud-on-the-collar"
    },
    "predecessor": {
      "name": "Jaguar XJR (X300)",
      "id": null
    },
    "successor": {
      "name": "Jaguar XJR (X350)",
      "id": "jaguar-xjr-x350"
    },
    "quick": "Jaguar's supercharged V8 sports sedan of the late 1990s, with 370 hp, a 155 mph limiter and a cabin full of walnut and Connolly leather. Car and Driver timed it at 5.3 seconds to 60 mph, quicker than the Mercedes E55 AMG it was tested against.",
    "story": [
      "The X308 XJR gives very little away: a body-colored grille with a mesh insert, slightly larger tailpipes and a badge on the trunk lid. Underneath, the 4.0-liter AJ-V8 is fed by an Eaton supercharger and makes 370 hp and 387 lb-ft, sent through a Mercedes-Benz 5-speed automatic. The R in the name came from Jaguar's XJR sports-prototype racers, which won Le Mans in 1988 and 1990, and the sedan did its best to deserve it. At a damp Castle Combe handling test in December 1997, it reportedly finished 9th of 20 performance cars, ahead of a Porsche Boxster and a Lotus Elise.",
      "It has flaws, and they are honest ones. Pushed hard, the body pitches and rolls, the car needs more road to stop than its German rivals, the rear seat is tight, and early engines have known weaknesses in their timing-chain tensioners and Nikasil-lined cylinders. Car and Driver ranked it 3rd of 3 against the BMW M5 and the E55 in 2000, yet it was the cheapest of the trio and beat the Mercedes to 60 mph. It asks only that the driver be smooth, and the supercharger's whine is the reward."
    ],
    "articles": [
      "mud-on-the-collar",
      "ghost-run"
    ],
    "photo": {
      "file": "Jaguar XJR X308 Racing Green Metallic.jpg",
      "credit": "Ethan Llamas",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "jaguar-xjr-x350",
    "name": "Jaguar XJR (X350)",
    "aka": [],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "2003–2009",
    "start": 2003,
    "end": 2009,
    "body": "Four-door sedan",
    "engine": "4.2-liter supercharged V8",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed automatic (ZF 6HP26)",
    "specsFor": "2004 Jaguar XJR (X350), US market",
    "power": {
      "hp": 390,
      "note": "SAE; 400 PS (395 hp) in Europe",
      "src": "article:mud-on-the-collar"
    },
    "weight": {
      "kg": 1791,
      "note": "",
      "src": "article:mud-on-the-collar"
    },
    "zero60": {
      "sec": 4.8,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:mud-on-the-collar"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:mud-on-the-collar"
    },
    "built": null,
    "predecessor": {
      "name": "Jaguar XJR (X308)",
      "id": "jaguar-xjr-x308"
    },
    "successor": {
      "name": "Jaguar XJ (X351)",
      "id": null
    },
    "quick": "The X350 XJR looked like a gentle update of the car it replaced, but under the familiar shape sat an all-aluminum body, a 390-hp supercharged V8 and adaptive air suspension. Bigger than the old XJR yet lighter, it is one of the great sleepers of the 2000s.",
    "story": [
      "Jaguar's 2003 XJ was a radical car in a conservative suit. Its monocoque was aluminum throughout, bonded and riveted using methods borrowed from aerospace, and the shell was about 40 percent lighter and 50 percent stiffer than the steel one before it. The XJR added a supercharged 4.2-liter V8 with 390 hp, a 6-speed ZF automatic and air springs at every corner. It was longer, taller and roomier than the X308 and still weighed less, at 1,791 kg (3,948 lb). Car and Driver timed one at 4.8 seconds to 60 mph, then drove it 40,000 miles and found it slightly quicker at the end.",
      "Hardly anyone noticed. The styling stayed close to tradition, partly because Ford, which owned Jaguar, feared upsetting loyal buyers, and the 2007 facelift with its fake fender vents won few converts. The result is a car that conceals its ability almost completely. It rides with remarkable calm, steers like something smaller and asks only for a healthy air suspension in return. For a driver who wants pace without announcement, few sedans of its era do the job better."
    ],
    "articles": [
      "mud-on-the-collar"
    ],
    "photo": {
      "file": "2004 Jaguar XJR V8 S C Auto (53586867472).jpg",
      "credit": "Kieran White from Manchester, England",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "jaguar-xkr-x100",
    "name": "Jaguar XKR (X100)",
    "aka": [],
    "make": "Jaguar",
    "maker": "Jaguar",
    "country": "United Kingdom",
    "years": "1998–2006",
    "start": 1998,
    "end": 2006,
    "body": "Two-door 2+2 coupe and convertible",
    "engine": "4.0-liter supercharged V8 (4.2 liters from 2003)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed automatic (6-speed from 2003)",
    "specsFor": "1998-2002 Jaguar XKR coupe, 4.0-liter",
    "power": {
      "hp": 370,
      "note": "370 bhp, Jaguar's launch figure",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "weight": {
      "kg": 1640,
      "note": "",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "zero60": {
      "sec": 5.2,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "built": null,
    "predecessor": {
      "name": "Jaguar XJ-S",
      "id": null
    },
    "successor": {
      "name": "Jaguar XKR (X150)",
      "id": null
    },
    "quick": "The supercharged version of Jaguar's XK8, launched in 1998 with a 370-hp blown V8 under a shape that openly courted the E-Type. It is a grand tourer with real speed and real charm, and one of the best-looking cars of the 1990s.",
    "story": [
      "When the XK8 replaced the XJ-S in 1996, Geoff Lawson's design team looked straight back to the E-Type: a long hood, an oval grille, soft haunches, a low roof. In 1998 the XKR added an Eaton supercharger to the 4.0-liter AJ-V8, lifting output to 370 hp and 387 lb-ft, with a wire-mesh grille and hood louvers as the only giveaways. Car and Driver timed a coupe at 5.2 seconds to 60 mph, the top speed was limited to 155 mph, and adaptive damping came as standard.",
      "On the road it is quick in a fluid, unhurried way, the blower delivering its shove from low revs with a faint whine and the chassis tuned for suppleness rather than bite. The cabin is all burl walnut and leather, the rear seats are best used for coats, and the driver sits higher than the low roofline suggests. Age has added known weak spots, chiefly timing-chain tensioners, Nikasil bores on the earliest engines, and rust in the steel body and subframe mounts. Beside a Mercedes SL500 it is the less rational choice. For plenty of buyers, that is exactly why they want one."
    ],
    "articles": [
      "tuxedo-and-smoking-jacket"
    ],
    "photo": {
      "file": "2002 Jaguar XKR Coupe (8113541450).jpg",
      "credit": "free photos & art",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "mercedes-benz-sl500-r129",
    "name": "Mercedes-Benz SL500 (R129)",
    "aka": [
      "Mercedes-Benz 500 SL"
    ],
    "make": "Mercedes-Benz",
    "maker": "Mercedes-Benz",
    "country": "Germany",
    "years": "1989–2001",
    "start": 1989,
    "end": 2001,
    "body": "Two-seat roadster with removable hardtop",
    "engine": "5.0-liter quad-cam V8 (M119; M113 V8 in the final years)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed automatic (4-speed on early cars)",
    "specsFor": "1996-1998 Mercedes-Benz SL500 (R129) with the M119 V8",
    "power": {
      "hp": 315,
      "note": "",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "weight": {
      "kg": 1890,
      "note": "",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "zero60": {
      "sec": 6.3,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:tuxedo-and-smoking-jacket"
    },
    "built": null,
    "predecessor": {
      "name": "Mercedes-Benz 500 SL / 560 SL (R107)",
      "id": null
    },
    "successor": {
      "name": "Mercedes-Benz SL500 (R230)",
      "id": null
    },
    "quick": "Mercedes-Benz's 1989 SL turned a luxury roadster into an engineering showcase, with a pop-up roll bar, seat-mounted belts, a power top and, in the SL500, a quad-cam 5.0-liter V8. Heavy, quiet and almost impossible to ruffle at speed, it has aged into one of the most admired open cars of its decade.",
    "story": [
      "The R129 replaced the long-running R107 in 1989, and it arrived as a showcase of what Mercedes-Benz could do when it treated safety as seriously as speed. A roll bar hid behind the seats and sprang up in a fraction of a second if sensors detected a rollover, the belts were built into the seat frames, and the soft top stowed itself on hydraulics. The 500 SL, later renamed SL500, used a 5.0-liter V8 of about 315 hp, good for roughly 6.3 seconds to 60 mph and a limited 155 mph. In 1991 Princess Diana swapped a Jaguar for a red one, and the outcry in Britain sent it back to Germany within a year.",
      "At about 1,890 kg (4,165 lb), it never pretends to be nimble. The recirculating-ball steering filters more than it tells, and on a tight, wet lane the car feels large. Give it an open highway, though, and it settles into a calm that few open cars of any era can match. Age brings costs, chiefly crumbling wiring insulation on mid-1990s cars and leaking top hydraulics. For years it was simply too common to feel special. Clean examples are now being bought as classics."
    ],
    "articles": [
      "tuxedo-and-smoking-jacket"
    ],
    "photo": {
      "file": "Mercedes-Benz R129 500 SL 1X7A0335.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Mercedes-Benz 500 SL"
    ]
  },
  {
    "id": "mercedes-benz-280-sl-r107",
    "name": "Mercedes-Benz 280 SL (R107)",
    "aka": [],
    "make": "Mercedes-Benz",
    "maker": "Mercedes-Benz",
    "country": "Germany",
    "years": "1974–1985",
    "start": 1974,
    "end": 1985,
    "body": "Two-seat roadster with removable hardtop",
    "engine": "2.8-liter twin-cam inline-6 (M110)",
    "drive": "Rear-wheel drive",
    "gearbox": "4- or 5-speed manual, or 4-speed automatic",
    "specsFor": "Mercedes-Benz 280 SL (R107), European market, 185 PS version",
    "power": {
      "hp": 182,
      "note": "",
      "src": "https://mb107.com/models/280sl.htm"
    },
    "weight": {
      "kg": 1500,
      "note": "",
      "src": "https://mb107.com/models/280sl.htm"
    },
    "zero60": null,
    "top": {
      "mph": 127,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://mb107.com/models/280sl.htm"
    },
    "built": {
      "count": 25436,
      "approx": false,
      "note": "mb107.com's comparison table rounds this to 25,500",
      "src": "https://mb107.com/models/280sl.htm"
    },
    "predecessor": {
      "name": "Mercedes-Benz 280 SL (W113 'Pagoda')",
      "id": null
    },
    "successor": {
      "name": "Mercedes-Benz 300 SL (R107)",
      "id": null
    },
    "quick": "The 6-cylinder European version of Mercedes-Benz's long-lived R107 roadster, never sold new in America. Free of federal bumpers and lighter on its feet than the big V8 SLs, it trades straight-line shove for a sweeter, more alert drive.",
    "story": [
      "The R107 SL ran from 1971 to 1989 without a fundamental redesign, and American buyers only ever saw its V8 versions, ending with the 227-hp 560 SL, which by then wore heavy federal bumpers and sealed-beam headlights. Europe had another choice. The 280 SL, built from 1974 to 1985, used the M110 twin-cam 2.8-liter straight-6, rated at a little over 180 hp, in a body with slim bumpers and glass headlamps that sat much closer to the original design. Americans who wanted one had to bring it in through the gray market.",
      "It is not the faster car. In a drag race the 560 SL wins easily, and it is the better long-distance cruiser. But the 280 carries less weight and none of the regulatory hardware, and on a winding road the difference is plain: the nose turns in keenly, and the engine sounds happiest near the top of its rev range rather than at the bottom. It remains every inch an SL, solid and formal and built to last, only livelier. Among R107 devotees it is often named the most engaging of the lot."
    ],
    "articles": [
      "the-six-that-got-away"
    ],
    "photo": {
      "file": "Mercedes-Benz 280 SL (R 107) P6280184.jpg",
      "credit": "Ermell",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "rolls-royce-corniche",
    "name": "Rolls-Royce Corniche Convertible",
    "aka": [
      "Bentley Corniche"
    ],
    "make": "Rolls-Royce",
    "maker": "Rolls-Royce, coachwork by Mulliner Park Ward",
    "country": "United Kingdom",
    "years": "1971–1995",
    "start": 1971,
    "end": 1995,
    "body": "Two-door convertible (a fixed-head coupe was also built until 1981)",
    "engine": "6.75-liter V8",
    "drive": "Rear-wheel drive",
    "gearbox": "3-speed automatic (GM Turbo-Hydramatic)",
    "specsFor": "Rolls-Royce Corniche Convertible, Series I (1971-1987)",
    "power": {
      "hp": 218,
      "note": "",
      "src": "article:grey-poupon"
    },
    "weight": {
      "kg": 2250,
      "note": "",
      "src": "https://www.presstopic.bmwgroup.com/en/bmw-classic-blog/buyme/text/THE-SKYS-THE-LIMIT-THE-ROLLS-ROYCE-CORNICHE-13005.html"
    },
    "zero60": null,
    "top": {
      "mph": 120,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:grey-poupon"
    },
    "built": {
      "count": 5160,
      "approx": true,
      "note": "",
      "src": "article:grey-poupon"
    },
    "predecessor": {
      "name": "Rolls-Royce Silver Shadow Drophead Coupe (Mulliner Park Ward)",
      "id": null
    },
    "successor": {
      "name": "Rolls-Royce Corniche (2000-2002)",
      "id": null
    },
    "quick": "The Mulliner Park Ward convertible that carried Rolls-Royce's idea of effortless luxury from 1971 to 1995. Built by hand over about 4 months, powered by a 6.75-liter V8 whose output the factory never published, it remains the definitive roof-down Rolls.",
    "story": [
      "The Corniche grew out of the Silver Shadow, the first Rolls-Royce with a monocoque body, by way of the 2-door coupe and drophead that Mulliner Park Ward built from the late 1960s. In March 1971 the coupe and convertible gained a deeper radiator, about 10 percent more power, extra wood inside and a name taken from the cliff roads above Monaco. Each car took around 4 months to build, 2 weeks of it on the top alone. Asked about power, the factory would only say it was adequate, and the car never hurried: about 120 mph and a self-leveling ride that made bad pavement irrelevant.",
      "It was launched in a crisis. Rolls-Royce went bankrupt in 1971 over the cost of its RB211 jet engine, and the car business was split off and floated on its own in 1973, yet the standard of the cars did not slip. Over 2 decades the Corniche gained rack-and-pinion steering, fuel injection, ABS and airbags, and after the coupe was dropped in 1981 the convertible carried the name alone. About 5,160 convertibles were built. Its one visible flaw is the folded top, heaped behind the rear seats. Owners tend to forgive it within seconds."
    ],
    "articles": [
      "grey-poupon"
    ],
    "photo": {
      "file": "Rolls-Royce Corniche Petersen Automotive Museum.jpg",
      "credit": "TaurusEmerald",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "mercedes-amg-gt",
    "name": "Mercedes-AMG GT (first generation)",
    "aka": [],
    "make": "Mercedes-Benz",
    "maker": "Mercedes-AMG",
    "country": "Germany",
    "years": "2014–2022",
    "start": 2014,
    "end": 2022,
    "body": "Two-seat coupe and roadster",
    "engine": "4.0-liter twin-turbo V8 (M178)",
    "drive": "Rear-wheel drive",
    "gearbox": "7-speed dual-clutch automatic (rear-mounted transaxle)",
    "specsFor": "2016 Mercedes-AMG GT S coupe, US market",
    "power": {
      "hp": 503,
      "note": "",
      "src": "article:the-other-german"
    },
    "weight": {
      "kg": 1675,
      "note": "",
      "src": "https://media.mbusa.com/releases/release-69c088345c4b4e7a879add0ca9b8cbd8-my2016-mercedes-amg-gt-gt-s-quick-reference-guide"
    },
    "zero60": {
      "sec": 3.7,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://media.mbusa.com/releases/release-69c088345c4b4e7a879add0ca9b8cbd8-my2016-mercedes-amg-gt-gt-s-quick-reference-guide"
    },
    "top": {
      "mph": 193,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.motorsportmagazine.com/archive/article/january-2015/66/mercedes-amg-gt-s/"
    },
    "built": null,
    "predecessor": {
      "name": "Mercedes-Benz SLS AMG",
      "id": null
    },
    "successor": {
      "name": "Mercedes-AMG GT (second generation, C192)",
      "id": null
    },
    "quick": "Mercedes-AMG's first-generation sports car, a front-mid-engined, rear-drive 2-seater with an endless hood and a hand-built twin-turbo V8. Launched in 2014 to take on the Porsche 911, it is the AMG GT in its most single-minded form: 2 seats, a V8 and nothing driving the front wheels.",
    "story": [
      "For decades the fast 2-door Mercedes had been built for touring more than for lap times, and even the gull-winged SLS that preceded this car never seriously threatened Porsche. The GT was aimed squarely at the 911. The proportions are extreme, with a hood that seems to run for miles and the driver sitting almost over the rear axle. The 4.0-liter twin-turbo V8 is assembled by hand and mounted behind the front axle, while the 7-speed dual-clutch gearbox sits at the back as a transaxle. In GT S form it made 503 hp and, by Mercedes' reckoning, reached 60 mph in 3.7 seconds.",
      "Over 8 years the range stretched from the 456-hp GT to the 730-hp Black Series, but every version kept the same engine and the same silhouette, as a coupe and, from 2017, a roadster. The GT and GT S are the ones to live with: loud, quick, and civil enough for a commute. Ownership is not cheap, and fewer specialists know them than know a 911. The second-generation car of 2024 grew larger, added rear seats and moved most versions to all-wheel drive, which leaves the original as a more focused chapter of its own."
    ],
    "articles": [
      "the-other-german"
    ],
    "photo": {
      "file": "Blue Mercedes-AMG GT S (C190) front.JPG",
      "credit": "Tokumeigakarinoaoshima",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "tvr-griffith",
    "name": "TVR Griffith",
    "aka": [],
    "make": "TVR",
    "maker": "TVR",
    "country": "United Kingdom",
    "years": "1991–2002",
    "start": 1991,
    "end": 2002,
    "body": "Two-seat roadster with removable targa panel",
    "engine": "5.0-liter V8, Rover-based (4.0 and 4.3 liters on earlier cars)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "TVR Griffith 500, 1993-2002, TVR heritage figures",
    "power": {
      "hp": 340,
      "note": "",
      "src": "article:the-long-way-for-crackers"
    },
    "weight": {
      "kg": 1060,
      "note": "",
      "src": "article:the-long-way-for-crackers"
    },
    "zero60": {
      "sec": 4.1,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-long-way-for-crackers"
    },
    "top": {
      "mph": 169,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-long-way-for-crackers"
    },
    "built": {
      "count": 2600,
      "approx": true,
      "note": "all versions, 1991-2002, by TVR's count",
      "src": "article:the-long-way-for-crackers"
    },
    "predecessor": null,
    "successor": {
      "name": "TVR Tamora",
      "id": null
    },
    "quick": "A small fiberglass British roadster with a big Rover-based V8 and no driver aids at all, the Griffith remade TVR's reputation in the 1990s. Roughly the length of a Mazda MX-5, the 500 version offered a claimed 340 hp and asked for a careful right foot in return.",
    "story": [
      "Peter Wheeler, a chemical engineer who bought TVR in 1981, wanted the Griffith to prove that his small Blackpool company could build something beautiful, and the car shown at the 1990 British Motor Show did exactly that. Its smooth body has no door handles, no creases and headlights tucked under clear covers, a face that emerged when an engineer cut the front off a foam model. Beneath it is a tubular steel chassis from TVR's Tuscan race car and an aluminum V8 that began life as a Buick, enlarged to 5.0 liters in the Griffith 500 for a claimed 340 hp and 4.1 seconds to 60 mph.",
      "There is no ABS, no traction control and no stability system, so every reaction comes straight from the driver's inputs, unfiltered and uncaught. Turn-in is eager to the point of nervousness, lifting off mid-corner unsettles the rear, and wet roads call for respect. The cabin is low and snug, fitted with bespoke aluminum switches and TVR's own dials. About 2,600 were built by 2002, and their success set up the TVR boom that followed. None was ever sold new in America, so each one there arrived as a private import."
    ],
    "articles": [
      "the-long-way-for-crackers"
    ],
    "photo": {
      "file": "W1400-TVR Griffith500 V8-5L-340hp 1995 82306.JPG",
      "credit": "Llann Wé²",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "TVR Griffith"
    ]
  },
  {
    "id": "chevrolet-corvette-grand-sport",
    "name": "Chevrolet Corvette Grand Sport",
    "aka": [],
    "make": "Chevrolet",
    "maker": "Chevrolet",
    "country": "United States",
    "years": "2027–present",
    "start": 2027,
    "end": null,
    "body": "Two-door coupe",
    "engine": "6.7-liter naturally aspirated V8 (mid-mounted)",
    "drive": "Rear-wheel drive",
    "gearbox": "8-speed dual-clutch",
    "specsFor": "2027 Corvette Grand Sport coupe, rear-wheel drive; weight and 0-60 from Edmunds' Z52 Sport Performance test car on Pilot Sport 4S tires",
    "power": {
      "hp": 535,
      "note": "Factory rating",
      "src": "article:daily-double"
    },
    "weight": {
      "kg": 1714,
      "note": "",
      "src": "article:daily-double"
    },
    "zero60": {
      "sec": 3.3,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:daily-double"
    },
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Chevrolet Corvette Grand Sport (C7)",
      "id": null
    },
    "successor": null,
    "quick": "Chevrolet brings back its most storied badge on the mid-engine Corvette, pairing a naturally aspirated 6.7-liter V8 and 535 hp with the wide-body look. It is built for the driver who wants one car for back roads, long weekends and the occasional track day, and it makes a strong case that anything more would be excess.",
    "story": [
      "Behind the seats of this thoroughly modern car sits a deliberately old-school heart: a 6.7-liter V8 with no turbochargers and no hybrid help, making 535 hp and 520 lb-ft and sending it all to the rear wheels through an 8-speed dual-clutch gearbox. This is the rear-drive Grand Sport, without the electric front axle of the Grand Sport X, and wearing Z52 track hardware and semi-slick tires it has reached 60 mph in 2.7 seconds in Car and Driver's hands. On ordinary road rubber it is still savagely quick.",
      "The early reviews split in a revealing way. Some testers praised how completely it involves the driver and how calmly its adaptive dampers deal with bumps, while Edmunds found it barely quicker than the cheaper Stingray and wished the steering said more. That tension is the whole debate. What the Grand Sport really sells is the wider body, the bigger tires and a sense of occasion every time the V8 fires, all in a car that tipped Edmunds' scales at 1,714 kg (3,778 lb). For most drivers, most of the time, it leaves very little to wish for."
    ],
    "articles": [
      "daily-double"
    ],
    "photo": {
      "file": "Chevrolet Corvette Grand Sport Coupé (C8, 2026) (55208173086).jpg",
      "credit": "Charles from Port Chester, New York",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": [
      "Chevrolet Corvette Grand Sport"
    ]
  },
  {
    "id": "mclaren-12c",
    "name": "McLaren 12C",
    "aka": [
      "McLaren MP4-12C"
    ],
    "make": "McLaren",
    "maker": "McLaren Automotive",
    "country": "United Kingdom",
    "years": "2011–2014",
    "start": 2011,
    "end": 2014,
    "body": "Two-door coupe",
    "engine": "3.8-liter twin-turbo V8 (mid-mounted)",
    "drive": "Rear-wheel drive",
    "gearbox": "7-speed dual-clutch",
    "specsFor": "McLaren 12C coupe in 616-hp (625 PS) form: 2013 and 2014 model years, or an earlier car with the factory upgrade",
    "power": {
      "hp": 616,
      "note": "",
      "src": "article:daily-double"
    },
    "weight": {
      "kg": 1434,
      "note": "",
      "src": "article:daily-double"
    },
    "zero60": {
      "sec": 3.0,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:daily-double"
    },
    "top": {
      "mph": 207,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.topgear.com/car-news/supercar/mclaren-mp4-12c-gets-more-power"
    },
    "built": {
      "count": 3400,
      "approx": true,
      "note": "",
      "src": "https://en.wikipedia.org/wiki/McLaren_12C"
    },
    "predecessor": null,
    "successor": {
      "name": "McLaren 650S",
      "id": null
    },
    "quick": "McLaren's opening move as a modern road-car maker wrapped a twin-turbo V8 around a carbon-fiber tub and gave it a ride that shamed luxury sedans. Clever rather than theatrical, it has aged into one of the most capable exotics money can buy secondhand.",
    "story": [
      "The 12C was engineered from the inside out. At its core sits a carbon-fiber passenger cell, behind it a 3.8-liter twin-turbo V8 driving the rear wheels through a 7-speed dual-clutch gearbox, and beneath it a suspension that skips conventional anti-roll bars altogether, using hydraulically linked dampers to keep the body flat in corners and supple over broken pavement. Testers were amazed that something this fast could ride so gently over broken highway seams. For 2013 McLaren raised output to 616 hp (625 PS) and gave the upgrade free to earlier owners, so the paperwork tells you more than the registration year.",
      "Its critics said all that polish left too little drama, and they had a point: this is a car that makes outrageous speed feel orderly. That composure is exactly why it has aged so gracefully. The doors still swing up and out to an audience, the cabin still feels purpose-built, and depreciation has pulled its price down to the neighborhood of a new Corvette. It gave way to the 650S in 2014, but the original remains the clearest statement of what McLaren set out to build."
    ],
    "articles": [
      "daily-double"
    ],
    "photo": {
      "file": "2011 McLaren MP4-12C 3.8 Front.jpg",
      "credit": "Vauxford",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "McLaren 12C",
      "McLaren MP4-12C"
    ]
  },
  {
    "id": "dodge-viper-gts-acr",
    "name": "Dodge Viper GTS ACR",
    "aka": [],
    "make": "Dodge",
    "maker": "Dodge",
    "country": "United States",
    "years": "1999–2002",
    "start": 1999,
    "end": 2002,
    "body": "Two-door coupe",
    "engine": "8.0-liter V10",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "Second-generation Viper GTS with the American Club Racer (ACR) package, as set up for the article's 2002 comparison",
    "power": {
      "hp": 460,
      "note": "",
      "src": "article:all-for-one"
    },
    "weight": {
      "kg": 1540,
      "note": "",
      "src": "article:all-for-one"
    },
    "zero60": {
      "sec": 4.0,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "https://motorweek.org/road_tests/2000_dodge_viper_acrprogram_1925/"
    },
    "top": null,
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Dodge Viper SRT10 ACR",
      "id": null
    },
    "quick": "The American Club Racer package took Dodge's 8.0-liter V10 coupe and gave it race-car springs, forged wheels, 5-point harnesses and a little extra power. It is the Viper at its most uncompromising: savage out of corners, demanding under braking and entirely uninterested in making friends.",
    "story": [
      "A second-generation Viper GTS was never a gentle thing, and the ACR package made sure nobody mistook it for one. Dodge added freer-breathing intake filtration, monotube dampers, springs borrowed from the GTS-R racer at more than twice the standard rates, 18-inch forged BBS wheels that trimmed unsprung weight and a set of 5-point harnesses. The result made 460 hp and 500 lb-ft from its 8.0-liter V10, carried roughly 1,540 kg (3,400 lb), and drove its huge rear tires with a ferocity few road cars of the day could approach.",
      "Driving one quickly is an exercise in commitment. The long hood hides the car's extremities, the brakes want total conviction, and the V10's torque arrives in a great rolling surge that rewards precision and punishes hesitation, although a surprisingly progressive throttle helps. Lined up against a Corvette Z06 and a Mustang Cobra R, it is the one with the most raw speed and the slimmest margin for error. That is the ACR's appeal in a sentence: it never meets the driver halfway, and the drivers who love it would not want it to."
    ],
    "articles": [
      "all-for-one"
    ],
    "photo": {
      "file": "Dodge Viper GTS ACR (2000) (53799898010).jpg",
      "credit": "Charles from Port Chester, New York",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "pos": ""
    },
    "match": [
      "Dodge Viper GTS ACR"
    ]
  },
  {
    "id": "ford-svt-mustang-cobra-r",
    "name": "Ford SVT Mustang Cobra R (2000)",
    "aka": [],
    "make": "Ford",
    "maker": "Ford Special Vehicle Team (SVT)",
    "country": "United States",
    "years": "2000",
    "start": 2000,
    "end": 2000,
    "body": "Two-door coupe",
    "engine": "5.4-liter DOHC V8",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "2000 Ford SVT Mustang Cobra R, US market",
    "power": {
      "hp": 385,
      "note": "",
      "src": "article:all-for-one"
    },
    "weight": {
      "kg": 1630,
      "note": "",
      "src": "article:all-for-one"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 300,
      "approx": false,
      "note": "",
      "src": "article:all-for-one"
    },
    "predecessor": {
      "name": "Ford SVT Mustang Cobra R (1995)",
      "id": null
    },
    "successor": null,
    "quick": "Ford's Special Vehicle Team built just 300 of these stripped, winged, side-piped Mustangs around a hand-assembled 5.4-liter DOHC V8. Loud, heavy and proudly unsubtle, it is a homologation special that would always rather shout than whisper.",
    "story": [
      "The 2000 Cobra R is a Mustang with everything nonessential thrown out and everything aggressive bolted on. There is no radio, no air conditioning and no back seat. Instead there is a towering rear wing, a chin splitter, side-exit exhausts that flood the cabin with noise, big Brembo front brakes and a 5.4-liter DOHC V8 strengthened with tougher connecting rods, larger valves and a racing oil pan. Ford rated it at 385 hp and 385 lb-ft, figures plenty of owners suspected were on the modest side, and sent the lot through a 6-speed manual.",
      "On a road course it shows a split personality. Under braking it is stable and honest, and in slow, tight corners it lets a driver lean on it without fear of a nasty surprise. In fast sweepers the 1,630 kg (3,590 lb) on an aging platform makes itself felt, the steering feels slow and heavily assisted, and the independent rear can hop when the power lands. None of that dims the attraction. Only 300 were built, and each one is proof that Ford's engineers badly wanted to go racing, flaws and all."
    ],
    "articles": [
      "all-for-one"
    ],
    "photo": {
      "file": "2000 Ford Mustang SVT Cobra R in Performance Red, Front Left (Hilton Beach 2023).jpg",
      "credit": "Elise240SX",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "chevrolet-corvette-z06-c5",
    "name": "Chevrolet Corvette Z06 (C5)",
    "aka": [],
    "make": "Chevrolet",
    "maker": "Chevrolet",
    "country": "United States",
    "years": "2001–2004",
    "start": 2001,
    "end": 2004,
    "body": "Two-door fixed-roof coupe",
    "engine": "5.7-liter V8 (LS6)",
    "drive": "Rear-wheel drive",
    "gearbox": "6-speed manual",
    "specsFor": "2002 Chevrolet Corvette Z06, 405-hp LS6",
    "power": {
      "hp": 405,
      "note": "Up from 385 hp in 2001",
      "src": "article:all-for-one"
    },
    "weight": {
      "kg": 1415,
      "note": "",
      "src": "article:all-for-one"
    },
    "zero60": {
      "sec": 4.2,
      "kind": "tested",
      "note": "MotorWeek test",
      "src": "https://motorweek.org/road_tests/2002_chevrolet_corvette_z06_program_2115/"
    },
    "top": null,
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Chevrolet Corvette Z06 (C6)",
      "id": null
    },
    "quick": "The C5 Z06 was the lightest, sharpest Corvette of its generation, and for 2002 its LS6 V8 climbed to 405 hp. Balanced, talkative and easy to drive at the limit, it showed that a Corvette could win with finesse rather than brute force.",
    "story": [
      "For 2002 Chevrolet sent the Z06's LS6 back to the engineers and got 20 more horsepower in return, for 405 hp and 400 lb-ft from 5.7 liters. A more aggressive camshaft did half the work, helped by hollow-stem valves, a smoother intake tract and the removal of 2 small catalytic converters that were no longer needed. The chassis was sharpened in step, with a thicker front anti-roll bar, retuned rear dampers and lighter wheels that brought the car down to 1,415 kg (3,118 lb).",
      "What makes the Z06 special is how little it demands of the person behind the wheel. With the transmission mounted at the rear axle, its weight is spread evenly, so it turns in eagerly, stays settled when trail-braked deep into a corner and reports clearly through the steering. Switch the electronics off and the tail grows lively, a fair price for all that agility. The seats are flat and the fuel-saving first-to-fourth skip-shift is a nuisance, yet as a car to drive to work all week and take to a track on the weekend, it set the template every later Z06 has followed."
    ],
    "articles": [
      "all-for-one"
    ],
    "photo": {
      "file": "2003 Chevrolet Corvette Z06, front left, 09-09-2023.jpg",
      "credit": "MercurySable99",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "mitsubishi-lancer-evolution-vii",
    "name": "Mitsubishi Lancer Evolution VII",
    "aka": [],
    "make": "Mitsubishi",
    "maker": "Mitsubishi Motors",
    "country": "Japan",
    "years": "2001–2003",
    "start": 2001,
    "end": 2003,
    "body": "Four-door sedan",
    "engine": "2.0-liter turbocharged inline-4",
    "drive": "All-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "Lancer Evolution VII GSR, Japanese market",
    "power": {
      "hp": 276,
      "note": "",
      "src": "article:all-for-one"
    },
    "weight": {
      "kg": 1475,
      "note": "",
      "src": "article:all-for-one"
    },
    "zero60": null,
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Mitsubishi Lancer Evolution VI",
      "id": null
    },
    "successor": {
      "name": "Mitsubishi Lancer Evolution VIII",
      "id": null
    },
    "quick": "The Evolution VII packed a 2.0-liter turbocharged 4-cylinder and a fiercely clever all-wheel-drive system into a plain-looking Lancer sedan and went hunting for sports cars. Its new Active Center Differential made it one of the most effective point-to-point machines of its day, though in 2002 Americans could only read about it.",
    "story": [
      "On paper the Evo VII looked outgunned by the big-engined sports cars of its era: a 2.0-liter turbocharged 4-cylinder rated at 280 PS (276 hp), 5 manual gears and a body shared with humble family Lancers. On the road the paper lost. The VII introduced an Active Center Differential to work alongside the Active Yaw Control rear differential, which shuffles torque between the rear wheels mid-corner, and together they let the car find traction on wet, broken or twisting surfaces where rear-drive rivals were busy spinning their tires.",
      "It drives with a patient, rally-bred logic. Turn in and the nose may push a fraction wide; wait, feed in throttle and the electronics haul it around from behind, firing it out of the corner harder than its power figure suggests. Braking is stable and drama-free, and it repeats the same tidy performance lap after lap. For American enthusiasts it was a legend known mostly from magazine pages, sold in Japan but absent from US showrooms. The Evolution VIII crossed the Pacific for 2003 and made the reputation official."
    ],
    "articles": [
      "all-for-one"
    ],
    "photo": {
      "file": "2002 Mitsubishi Lancer Evolution VII in Palmer Red, Front Left, 07-25-2023.jpg",
      "credit": "Elise240SX",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Mitsubishi Lancer Evolution VII"
    ]
  },
  {
    "id": "chevrolet-corvair",
    "name": "Chevrolet Corvair",
    "aka": [],
    "make": "Chevrolet",
    "maker": "Chevrolet",
    "country": "United States",
    "years": "1960–1969",
    "start": 1960,
    "end": 1969,
    "body": "Two-door hardtop coupe (also sedan, convertible, wagon, van and pickup)",
    "engine": "2.7-liter air-cooled flat-6 (rear-mounted)",
    "drive": "Rear-wheel drive",
    "gearbox": "4-speed manual",
    "specsFor": "1965-69 Corvair Monza coupe, 110-hp engine, 4-speed manual (the article's recommended version)",
    "power": {
      "hp": 110,
      "note": "",
      "src": "article:it-died-so-you-could-live"
    },
    "weight": {
      "kg": 1090,
      "note": "",
      "src": "article:it-died-so-you-could-live"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 1659022,
      "approx": false,
      "note": "",
      "src": "article:it-died-so-you-could-live"
    },
    "predecessor": null,
    "successor": null,
    "quick": "Chevrolet's air-cooled, rear-engined compact was the most radical mass-market American car of its decade. It accidentally opened the market the Mustang would conquer, then became the centerpiece of the fight that brought federal safety standards.",
    "story": [
      "Nothing about the Corvair behaves the way an American car of 1960 was supposed to. The flat-6 lives in the tail and is cooled by air, the trunk is up front, the floor is flat, and the unassisted steering is light enough to work with fingertips because so little weight sits over the front wheels. Ed Cole's team gave it independent suspension at every corner and even disguised the program inside Chevrolet as a Holden project to keep it alive. Then buyers ignored the economy pitch and bought 109,945 sporty Monza coupes in 1961 alone, a lesson Ford took straight to the Mustang.",
      "The early swing-axle cars could snap into oversteer if tire pressures were wrong, and a front anti-roll bar cut before production did not help. Chevrolet kept improving it, and the 1965 redesign brought a fully independent rear and one of the cleanest shapes General Motors ever produced. By then Ralph Nader had opened his book with it, GM had been caught having him trailed, and federal safety standards arrived in the aftermath. Investigators later judged the early car no worse than its peers. The Corvair died in 1969 regardless."
    ],
    "articles": [
      "it-died-so-you-could-live"
    ],
    "photo": {
      "file": "Chevrolet Corvair, Blenheim Classics Auto Show, Blenheim, Ontario, 2025-06-21 01.jpg",
      "credit": "Crisco 1492",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Chevrolet Corvair"
    ]
  },
  {
    "id": "cadillac-cts-v",
    "name": "Cadillac CTS-V (third generation)",
    "aka": [],
    "make": "Cadillac",
    "maker": "Cadillac",
    "country": "United States",
    "years": "2016–2019",
    "start": 2016,
    "end": 2019,
    "body": "Four-door sedan",
    "engine": "6.2-liter supercharged V8 (LT4)",
    "drive": "Rear-wheel drive",
    "gearbox": "8-speed automatic",
    "specsFor": "2016 Cadillac CTS-V, Car and Driver instrumented test (July 2015)",
    "power": {
      "hp": 640,
      "note": "At 6,400 rpm",
      "src": "article:what-is-thy-bidding"
    },
    "weight": {
      "kg": 1873,
      "note": "",
      "src": "article:what-is-thy-bidding"
    },
    "zero60": {
      "sec": 3.6,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:what-is-thy-bidding"
    },
    "top": {
      "mph": 200,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:what-is-thy-bidding"
    },
    "built": null,
    "predecessor": {
      "name": "Cadillac CTS-V (second generation)",
      "id": null
    },
    "successor": {
      "name": "Cadillac CT5-V Blackwing",
      "id": null
    },
    "quick": "Cadillac gave its mid-size sedan the Corvette Z06's supercharged V8 at 640 hp and took the fight to BMW and Mercedes on their own ground. Lighter than its German rivals and fast enough on a racetrack to embarrass 2-seat sports cars, it remains the most menacing sedan Cadillac has built.",
    "story": [
      "The third-generation CTS-V took the supercharged 6.2-liter LT4 straight from the Corvette Z06, internals and all, and was allowed 640 hp to the Corvette's 650 for reasons that owed more to the corporate pecking order than to engineering. With huge brakes lifted from the Camaro Z/28 and a chassis that hides its bulk remarkably well, it reached 60 mph in 3.6 seconds in Car and Driver's test and lapped Virginia International Raceway quicker than a Dodge Viper SRT10 once had. At 1,873 kg (4,129 lb), it even undercut the weight of its German rivals.",
      "Off the line it loses to all-wheel-drive rivals, because 2 rear tires can only do so much with 630 lb-ft. Once the road bends, the balance tips its way. It feels big and broad-shouldered at a cruise yet changes direction with real agility, the steering asks for genuine effort, and the whole car carries an edge of threat the polished Germans never quite manage. It followed a 400-hp first generation and a 556-hp second, then handed over to the CT5-V Blackwing, a better car that looks far less dangerous."
    ],
    "articles": [
      "what-is-thy-bidding"
    ],
    "photo": {
      "file": "2019 Cadillac CTS-V Base, front left.jpg",
      "credit": "HJUdall",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "pontiac-solstice",
    "name": "Pontiac Solstice",
    "aka": [],
    "make": "Pontiac",
    "maker": "Pontiac",
    "country": "United States",
    "years": "2005–2009",
    "start": 2005,
    "end": 2009,
    "body": "Two-door roadster (targa coupe from 2009)",
    "engine": "2.0-liter turbocharged inline-4 (LNF)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "2007 Pontiac Solstice GXP roadster, 5-speed manual",
    "power": {
      "hp": 260,
      "note": "",
      "src": "article:last-light"
    },
    "weight": {
      "kg": 1350,
      "note": "",
      "src": "article:last-light"
    },
    "zero60": {
      "sec": 5.8,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:last-light"
    },
    "top": null,
    "built": {
      "count": 65724,
      "approx": false,
      "note": "All Solstices, including 1,266 coupes",
      "src": "article:last-light"
    },
    "predecessor": {
      "name": "Pontiac Fiero",
      "id": null
    },
    "successor": null,
    "quick": "Pontiac's 2-seat roadster brought concept-car looks to the showroom at an everyday price, and in turbocharged GXP form it was genuinely quick. It arrived as the brand was fading, outsold the Miata in America in 2006 and became one of Pontiac's last great cars.",
    "story": [
      "The Solstice began as Bob Lutz's first request after joining GM: a sketch by a young Franz von Holzhausen, rushed into a running show car for the 2002 Detroit auto show and put into production in Delaware in 2005 with remarkably little lost along the way. Underneath is GM's own steel Kappa platform, front-engined and rear-drive, not the Lotus Elise lineage that rumor still hands it. The base 2.4-liter engine is merely adequate. The GXP's turbocharged, direct-injected 2.0-liter, with 260 hp and all 260 lb-ft on tap from 2,500 rpm, transforms it.",
      "From the driver's seat it feels low, wide and snug, with high sills, a short, positive shifter and front fenders swelling up on either side of a long hood. The stiff structure lets the suspension do its work, and when grip runs out the car lets go gently from the rear. The flaws are real: the folded top eats nearly all the trunk, and stowing it means climbing out. Yet at 1,350 kg (2,976 lb) in GXP form it hauls less weight per horsepower than a Miata of its day, and it still turns heads at every light."
    ],
    "articles": [
      "last-light"
    ],
    "photo": {
      "file": "2007 Pontiac Solstice GXP, front left, 08-27-2023.jpg",
      "credit": "MercurySable99",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Pontiac Solstice"
    ]
  },
  {
    "id": "saturn-sky",
    "name": "Saturn Sky",
    "aka": [
      "Opel GT",
      "Daewoo G2X"
    ],
    "make": "Saturn",
    "maker": "Saturn",
    "country": "United States",
    "years": "2006–2009",
    "start": 2006,
    "end": 2009,
    "body": "Two-door roadster",
    "engine": "2.0-liter turbocharged inline-4 (LNF)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "2007 Saturn Sky Red Line, 5-speed manual",
    "power": {
      "hp": 260,
      "note": "Base 2.4-liter cars made 177 hp",
      "src": "article:last-light"
    },
    "weight": {
      "kg": 1395,
      "note": "",
      "src": "https://en.wikipedia.org/wiki/Saturn_Sky"
    },
    "zero60": {
      "sec": 6.1,
      "kind": "tested",
      "note": "MotorWeek test",
      "src": "article:last-light"
    },
    "top": null,
    "built": {
      "count": 34415,
      "approx": false,
      "note": "",
      "src": "article:last-light"
    },
    "predecessor": null,
    "successor": null,
    "quick": "The Saturn Sky was the Solstice's better-dressed twin, sharing its chassis and engines but wearing a sharper, British-drawn face. In turbocharged Red Line form it was a fast, handsome roadster and one of the last cars Saturn ever sold.",
    "story": [
      "Mechanically the Sky is a Pontiac Solstice: the same Kappa platform, the same 2,416 mm (95.1 in) wheelbase and the same Wilmington, Delaware, assembly line. Its look came from elsewhere. The styling grew out of the Vauxhall VX Lightning, a 2003 concept drawn in England to mark Vauxhall's 100th anniversary, which gave the Sky crisper lines, projector headlights and canted side vents. Saturn also tuned it a shade softer, with more insulation and a quieter exhaust, and fitted base cars with equipment the stripped-out Solstice charged extra for.",
      "The Red Line brought the 260-hp turbocharged 2.0-liter and turned a pretty cruiser into a properly rapid one, with a broad swell of midrange torque and a chassis that stays composed when pushed. Europe received essentially the same car as the Opel GT, built in Delaware and sold only with left-hand drive, while Korea took a handful as the Daewoo G2X. Saturn itself did not outlive 2009, and only 34,415 Skys were built, which makes a good Red Line one of the more stylish bargains among modern roadsters."
    ],
    "articles": [
      "last-light"
    ],
    "photo": {
      "file": "2008 Saturn Sky Redline in Bluestone, front left.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Daewoo G2X",
      "Opel GT",
      "Saturn Sky"
    ]
  },
  {
    "id": "dodge-durango",
    "name": "Dodge Durango (third generation)",
    "aka": [],
    "make": "Dodge",
    "maker": "Dodge",
    "country": "United States",
    "years": "2011–present",
    "start": 2011,
    "end": null,
    "body": "4-door, 3-row SUV",
    "engine": "6.2-liter supercharged V8 (Hellcat)",
    "drive": "All-wheel drive",
    "gearbox": "8-speed automatic",
    "specsFor": "2021 Dodge Durango SRT Hellcat",
    "power": {
      "hp": 710,
      "note": "",
      "src": "article:the-three-row-hot-rod"
    },
    "weight": {
      "kg": 2510,
      "note": "",
      "src": "https://autos.yahoo.com/tested-2021-dodge-durango-srt-050100909.html"
    },
    "zero60": {
      "sec": 3.5,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-three-row-hot-rod"
    },
    "top": {
      "mph": 180,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://www.media.stellantisnorthamerica.com/newsrelease.do?id=22297"
    },
    "built": null,
    "predecessor": {
      "name": "Dodge Durango (second generation)",
      "id": null
    },
    "successor": null,
    "quick": "Dodge's 3-row SUV moved onto Grand Cherokee-based unibody bones for 2011 and then simply refused to go away, piling on ever-bigger V8s up to a 710-hp supercharged Hellcat. More than 15 years on, it is selling better than ever and carrying most of the Dodge brand on its back.",
    "story": [
      "The third-generation Durango dropped the truck frame of its predecessors and borrowed much of its underbody from the Jeep Grand Cherokee, keeping rear-drive proportions, V8 power and serious towing while finally gaining a civilized ride and a cabin worth sitting in. Then Dodge kept turning the dial. An 8-speed automatic arrived in 2014, the SRT with its 6.4-liter HEMI in 2018, and in 2021 the supercharged 6.2-liter Hellcat, with 710 hp, a claimed 0-60 mph time of about 3.5 seconds and the same 3,946 kg (8,700 lb) tow rating.",
      "Its age has turned into an advantage. Rivals have downsized to turbo sixes, fours and hybrids, leaving the Durango almost alone as an attainable V8 family hauler, and it still offers 4 engines running from sensible V6 to gloriously unhinged. It keeps proper buttons, it drinks heavily, and owners adore it anyway. In 2025, its best year since 2005, it accounted for roughly 80 percent of everything Dodge sold in America. A successor is planned, and it inherits a very hard act to follow."
    ],
    "articles": [
      "the-three-row-hot-rod"
    ],
    "photo": {
      "file": "Dodge Durango SRT Hellcat MYLE Festival 2025 DSC 9644.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": []
  },
  {
    "id": "citroen-ds",
    "name": "Citroën DS",
    "aka": [
      "DS 19",
      "DS 21",
      "DS 23"
    ],
    "make": "Citroën",
    "maker": "Citroën",
    "country": "France",
    "years": "1955–1975",
    "start": 1955,
    "end": 1975,
    "body": "Four-door sedan (also wagon and Chapron-built convertible)",
    "engine": "1.9-liter inline-4",
    "drive": "Front-wheel drive",
    "gearbox": "4-speed hydraulic semi-automatic, no clutch pedal",
    "specsFor": "1955 Citroën DS 19 sedan, French market",
    "power": {
      "hp": 74,
      "note": "",
      "src": "https://www.adac.de/rund-ums-fahrzeug/autokatalog/marken-modelle/citroen/ds/1generation/350645/"
    },
    "weight": {
      "kg": 1170,
      "note": "",
      "src": "https://www.adac.de/rund-ums-fahrzeug/autokatalog/marken-modelle/citroen/ds/1generation/350645/"
    },
    "zero60": {
      "sec": 23.2,
      "kind": "tested",
      "note": "Motor test",
      "src": "https://www.motorsportmagazine.com/archive/article/april-1958/35/4000-mile-test-of-the-citroen-ds19/"
    },
    "top": {
      "mph": 87,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://citroenet.org.uk/passenger-cars/michelin/ds/06.html"
    },
    "built": {
      "count": 1455746,
      "approx": false,
      "note": "",
      "src": "article:goddess-of-serenity"
    },
    "predecessor": {
      "name": "Citroën Traction Avant",
      "id": "citroen-traction-avant"
    },
    "successor": {
      "name": "Citroën CX",
      "id": null
    },
    "quick": "A sedan that looked as if it had arrived from the future and rode as if the road had been paved in silk, floating on pressurized oil and nitrogen instead of steel springs. Paris took 80,000 orders in 10 days, production ran for 20 years, and in 1962 the car carried a French president out of an ambush on ruined tires.",
    "story": [
      "The DS is what happens when a car company lets an aircraft engineer and a sculptor finish their thoughts. Flaminio Bertoni gave it a smooth, tapering body with skirted rear wheels, and André Lefèbvre's team filled it with ideas the industry would spend decades copying: self-leveling hydropneumatic suspension, inboard front disc brakes, power steering, a clutchless hydraulic gearshift and, from 1967, swiveling headlights that followed the steering. Start it and the body rises off its haunches before it moves. Then it glides, treating cobbles and potholes as rumors.",
      "Its weak point was under the hood. France taxed engines by size, so the most advanced sedan in the world made do with a 1.9-liter 4-cylinder descended from a prewar design, and the 6-cylinder engine it deserved never got funded. It hardly mattered. The DS family won the Monte Carlo Rally, came through an ambush of more than 140 rounds at Petit-Clamart with Charles de Gaulle aboard, and in Henri Chapron's hand-built convertible form became one of the loveliest shapes ever to wear a license plate. Citroën built 1,455,746 in all, and the oldest still look ahead of their time."
    ],
    "articles": [
      "goddess-of-serenity",
      "ds-assassination",
      "herringbone"
    ],
    "photo": {
      "file": "Citroen DS Classic-Days 2022 IMG 7189.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Citroën DS"
    ]
  },
  {
    "id": "citroen-sm",
    "name": "Citroën SM",
    "aka": [],
    "make": "Citroën",
    "maker": "Citroën, with a Maserati V6",
    "country": "France",
    "years": "1970–1975",
    "start": 1970,
    "end": 1975,
    "body": "Two-door fastback coupe",
    "engine": "2.7-liter quad-cam Maserati V6",
    "drive": "Front-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1970 Citroën SM 2.7, carbureted, 5-speed manual, European market",
    "power": {
      "hp": 168,
      "note": "170 PS DIN (125 kW)",
      "src": "article:her-majesty-drives-herself"
    },
    "weight": {
      "kg": 1450,
      "note": "",
      "src": "article:her-majesty-drives-herself"
    },
    "zero60": {
      "sec": 8.5,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:her-majesty-drives-herself"
    },
    "top": {
      "mph": 137,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:her-majesty-drives-herself"
    },
    "built": {
      "count": 12920,
      "approx": false,
      "note": "All variants, 1970-1975; 12,924 is also seen",
      "src": "article:her-majesty-drives-herself"
    },
    "predecessor": null,
    "successor": null,
    "quick": "Citroën bought Maserati to get an engine, then built the most technically daring grand tourer of the 1970s around it. Speed-sensitive steering, self-leveling suspension and headlights that turned into corners put it decades ahead, while complexity, a bankrupt parent and an American bumper rule cut it short at 12,920 cars.",
    "story": [
      "The SM is the DS reimagined as a grand tourer with a Maserati heart. Its 2.7-liter V6, sized to dodge a punishing French tax band, sits behind the front axle and drives the front wheels; the fully powered steering needs only 2 turns from lock to lock and recenters itself; the suspension lifts the body to its working height a few seconds after startup. Robert Opron's shape tapers toward the tail, and European cars carry 6 lamps behind a shared glass cover. It is not quick away from a light. Across a continent, few cars of its day came close.",
      "That talent for distance drew a glamorous clientele, from heads of state to the composers behind the Star Wars and James Bond scores, and a near-standard SM won the brutal 1971 Rallye du Maroc at its first attempt. The same ambition undid it. Owners needed a hydraulics expert and a Maserati expert, often in countries that had neither; Citroën went bankrupt in 1974; and American bumper rules had no answer for a car whose ride height moved. Peugeot ended it in 1975, but its steering, transaxle and engine lived on elsewhere."
    ],
    "articles": [
      "her-majesty-drives-herself",
      "herringbone"
    ],
    "photo": {
      "file": "2013-05-04 (9591b) Citroën SM, Bj. 1973.JPG",
      "credit": "Lothar Spurzem",
      "license": "CC BY-SA 2.0 de",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en",
      "pos": ""
    },
    "match": [
      "Citroën SM"
    ]
  },
  {
    "id": "citroen-traction-avant",
    "name": "Citroën Traction Avant",
    "aka": [
      "7CV",
      "11CV",
      "15-Six",
      "Light Fifteen",
      "Big Fifteen",
      "Big Six"
    ],
    "make": "Citroën",
    "maker": "Citroën",
    "country": "France",
    "years": "1934–1957",
    "start": 1934,
    "end": 1957,
    "body": "Four-door sedan (also coupe, convertible, long-wheelbase Familiale and Commerciale hatchback)",
    "engine": "1.9-liter inline-4",
    "drive": "Front-wheel drive",
    "gearbox": "3-speed manual, lever through the dashboard",
    "specsFor": "1951 Citroën Light Fifteen (Slough-built 11 Légère), UK market",
    "power": {
      "hp": 56,
      "note": "",
      "src": "https://gracesguide.co.uk/Citroen_Cars:_Light_Fifteen"
    },
    "weight": {
      "kg": 1065,
      "note": "",
      "src": "https://gracesguide.co.uk/Citroen_Cars:_Light_Fifteen"
    },
    "zero60": {
      "sec": 29.7,
      "kind": "tested",
      "note": "Motor test",
      "src": "article:queen-of-the-road"
    },
    "top": {
      "mph": 72.6,
      "kind": "tested",
      "note": "Motor test",
      "src": "article:queen-of-the-road"
    },
    "built": {
      "count": 759111,
      "approx": false,
      "note": "",
      "src": "article:queen-of-the-road"
    },
    "predecessor": {
      "name": "Citroën Rosalie",
      "id": null
    },
    "successor": {
      "name": "Citroën DS (ID 19)",
      "id": "citroen-ds"
    },
    "quick": "In 1934 Citroën combined front-wheel drive, a welded unitary body, independent front suspension and hydraulic brakes in a single mass-produced car, and the shape of the modern family sedan was set. The gamble bankrupted the company and its founder, yet the car ran for 23 years and 759,111 examples.",
    "story": [
      "The Traction Avant sits low because there is no chassis underneath to perch on. Engineer André Lefèbvre carried aircraft thinking into a family car, Flaminio Bertoni modeled the body in clay, and the result needed no running boards, offered a flat floor for 6 adults and cornered like nothing else in the showroom. The gear lever sprouts from the dashboard, the steering is heavy when parking and faithful everywhere else, and the ride already has the soft, patient gait that would define Citroën for the next 50 years.",
      "It was also a disaster of timing. André Citroën rebuilt his entire Paris factory to make it, went bankrupt 8 months after launch and died in July 1935, before the car had proved itself. The car outlived him by decades. It carried soldiers, occupiers, Resistance fighters and a notorious postwar gang that took its name, and its aluminum transaxle casing ended up in the Cooper Formula One cars that won the 1959 and 1960 world titles. Its final trick was a hydropneumatic rear axle on the 1954 15-Six, a rehearsal for the DS."
    ],
    "articles": [
      "queen-of-the-road",
      "herringbone"
    ],
    "photo": {
      "file": "Citroen Traction Avant Classic-Gala 2021 1X7A0158.jpg",
      "credit": "Alexander Migl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Citroën Traction Avant"
    ]
  },
  {
    "id": "citroen-2cv",
    "name": "Citroën 2CV",
    "aka": [
      "2CV6"
    ],
    "make": "Citroën",
    "maker": "Citroën",
    "country": "France",
    "years": "1949–1990",
    "start": 1949,
    "end": 1990,
    "body": "Four-door sedan with roll-back canvas roof (also van)",
    "engine": "375 cc air-cooled flat-twin",
    "drive": "Front-wheel drive",
    "gearbox": "4-speed manual",
    "specsFor": "1949 Citroën 2CV (original Type A)",
    "power": {
      "hp": 9,
      "note": "375 cc flat-twin",
      "src": "article:the-2cv-again"
    },
    "weight": {
      "kg": 495,
      "note": "",
      "src": "article:the-2cv-again"
    },
    "zero60": null,
    "top": {
      "mph": 40,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-2cv-again"
    },
    "built": {
      "count": 5100000,
      "approx": true,
      "note": "About 5.1 million cars and vans, 1949-1990",
      "src": "article:the-2cv-again"
    },
    "predecessor": null,
    "successor": null,
    "quick": "Postwar France needed a car for people who had never owned one, and Citroën answered with the simplest machine it could build: a tiny air-cooled twin, a canvas roof and suspension with seemingly endless travel. It stayed in production for 41 years and about 5.1 million cars and vans.",
    "story": [
      "The 2CV proves a car can be adored for doing very little. The original made 9 hp from a 375 cc flat-twin, weighed about 495 kg (1,091 lb) and topped out at 40 mph, and none of that was the point. Its soft, long-travel suspension let it lean hard through bends without losing its footing and float across rutted farm tracks, the roof rolled back for tall loads, the seats lifted out, and the engine asked for little beyond fuel and the occasional glance. Flaminio Bertoni, who also shaped the Traction Avant and the DS, gave it a face nobody could dislike.",
      "Over 41 years it became far more than transport: the car of farmers, students, artists and anyone who found pretension tiresome, proof that austerity could have a sense of humor. Later 2CV6 models stretched to 602 cc, 29 hp and a giddy 71 mph without changing the character at all. Production ended in 1990. In 2026 Citroën revealed an electric 2CV concept, shorter than the original and built around the same lightness and cheap-to-own simplicity, with a European-built production version promised by 2028."
    ],
    "articles": [
      "the-2cv-again",
      "queen-of-the-road",
      "herringbone"
    ],
    "photo": {
      "file": "2025-05-01 Muensingen Citroen 2CV6 front-side.jpg",
      "credit": "Wikisympathisant",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Citroën 2CV"
    ]
  },
  {
    "id": "lancia-delta-hf-integrale",
    "name": "Lancia Delta HF Integrale",
    "aka": [
      "Delta Integrale",
      "Delta HF Integrale Evoluzione"
    ],
    "make": "Lancia",
    "maker": "Lancia",
    "country": "Italy",
    "years": "1987–1994",
    "start": 1987,
    "end": 1994,
    "body": "Five-door hatchback",
    "engine": "2.0-liter turbocharged inline-4",
    "drive": "Permanent all-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1993 Lancia Delta HF Integrale Evoluzione II",
    "power": {
      "hp": 215,
      "note": "",
      "src": "article:the-king-was-italian"
    },
    "weight": {
      "kg": 1340,
      "note": "",
      "src": "article:the-king-was-italian"
    },
    "zero60": {
      "sec": 5.7,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-king-was-italian"
    },
    "top": {
      "mph": 137,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-king-was-italian"
    },
    "built": {
      "count": 44296,
      "approx": false,
      "note": "",
      "src": "article:the-king-was-italian"
    },
    "predecessor": {
      "name": "Lancia Delta HF 4WD",
      "id": null
    },
    "successor": null,
    "quick": "A sensible 1979 family hatchback that the rulebook turned into the most successful rally car ever built, with 6 consecutive World Rally Championship manufacturers' titles from 1987 to 1992. The road cars, with blistered arches, turbocharged 2.0-liter fours and permanent all-wheel drive, exist because the race team needed the parts homologated.",
    "story": [
      "Beneath the flared arches sits a Giorgetto Giugiaro 5-door that won European Car of the Year in 1980 and was mostly bought by ordinary families. When Group B was banned at the end of 1986, Lancia already had a compact, turbocharged, all-wheel-drive Delta on sale, and Group A's demand for 5,000 road cars did the rest. Every new version, from the 8-valve to the Evoluzione II, was the rally team asking for wider tracks, bigger brakes and more cooling, and the showroom car swelling to match.",
      "The surprise is how civilized it feels. The upright glass gives superb visibility, the Recaro seats hold on like a handshake that never lets go, and the ride is firm rather than punishing. Below 2,500 rpm the engine is ordinary; above it the boost arrives in a rush, and a 47:53 front-to-rear torque split lets the rear axle help drive the car out of corners. There is no computer in the driveline, only gears, a viscous coupling and a Torsen rear, so it rewards anyone who slows early and squeezes the power on. Lancia built 44,296, and modern rules will never allow another."
    ],
    "articles": [
      "the-king-was-italian",
      "ghost-run"
    ],
    "photo": {
      "file": "1992 Lancia Delta Integrale Evoluzione in Black Mica, front right.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Lancia Delta HF Integrale",
      "Lancia Delta Integrale"
    ]
  },
  {
    "id": "volkswagen-golf-gti-mk1",
    "name": "Volkswagen Golf GTI (Mk1)",
    "aka": [
      "Rabbit GTI"
    ],
    "make": "Volkswagen",
    "maker": "Volkswagen",
    "country": "Germany",
    "years": "1976–1983",
    "start": 1976,
    "end": 1983,
    "body": "Three-door hatchback",
    "engine": "1.6-liter fuel-injected inline-4",
    "drive": "Front-wheel drive",
    "gearbox": "4-speed manual (5-speed from 1977)",
    "specsFor": "1976 Volkswagen Golf GTI 1.6, European market",
    "power": {
      "hp": 108,
      "note": "110 PS at 6,100 rpm",
      "src": "article:the-one-and-only"
    },
    "weight": {
      "kg": 840,
      "note": "",
      "src": "article:the-one-and-only"
    },
    "zero60": {
      "sec": 9.0,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-one-and-only"
    },
    "top": {
      "mph": 113,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:the-one-and-only"
    },
    "built": {
      "count": 461690,
      "approx": false,
      "note": "All Mk1 GTIs, 1976-1983; Volkswagen had authorized 5,000",
      "src": "article:the-one-and-only"
    },
    "predecessor": null,
    "successor": {
      "name": "Volkswagen Golf GTI (Mk2)",
      "id": null
    },
    "quick": "The car that made the fast family hatchback a category of its own, plotted as an unofficial side project by a handful of Volkswagen staff. With 108 hp and only about 840 kg (1,850 lb) to carry, it could embarrass costlier sports cars and still handle the weekly shopping, and a planned run of 5,000 grew to 461,690.",
    "story": [
      "The first GTI was never supposed to matter. A small group of Volkswagen engineers and marketers worked on a sporty Golf without official approval, rejected a stiff, roaring prototype as too crude, and settled on a car that was fast without being tiring to own. The board signed off 5,000 units to recover the costs. What arrived in 1976 was a 1.6-liter fuel-injected 4-cylinder with 108 hp, a red stripe around the grille, black arch extensions, plaid seats and a golf-ball shift knob, a uniform that every GTI since has worn in some form.",
      "On the road the Mk1 is all nerve endings. The unassisted steering reports every ripple, the car changes direction almost before the thought is complete, and lifting off the throttle mid-corner swings the tail around in a way that taught a generation how to drive a front-driver. It is not fast by any modern yardstick, topping out at 113 mph with brakes that wilt on a track. It never needed to be. It was the template, and nearly every hot hatch built since has been a reply to it."
    ],
    "articles": [
      "the-one-and-only"
    ],
    "photo": {
      "file": "1979 Volkswagen Golf GTi 1.6 Front.jpg",
      "credit": "Vauxford",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Volkswagen Golf GTI Mk1"
    ]
  },
  {
    "id": "volkswagen-golf-gti-mk5",
    "name": "Volkswagen Golf GTI (Mk5)",
    "aka": [
      "Volkswagen GTI"
    ],
    "make": "Volkswagen",
    "maker": "Volkswagen",
    "country": "Germany",
    "years": "2004–2009",
    "start": 2004,
    "end": 2009,
    "body": "3- or 5-door hatchback",
    "engine": "2.0-liter turbocharged direct-injection inline-4",
    "drive": "Front-wheel drive",
    "gearbox": "6-speed manual or 6-speed DSG dual-clutch",
    "specsFor": "2005 Volkswagen Golf GTI (Mk5) 2.0 TFSI, 6-speed manual, European market",
    "power": {
      "hp": 197,
      "note": "200 PS (147 kW)",
      "src": "article:the-one-and-only"
    },
    "weight": {
      "kg": 1335,
      "note": "",
      "src": "article:the-one-and-only"
    },
    "zero60": {
      "sec": 7.2,
      "kind": "claimed",
      "note": "Maker's claim, 0-62 mph",
      "src": "article:the-one-and-only"
    },
    "top": {
      "mph": 146,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "https://volkswagen-newsroom.com/en/golf-5-gti-20042008-19511"
    },
    "built": {
      "count": 181000,
      "approx": true,
      "note": "",
      "src": "https://volkswagen-newsroom.com/en/golf-5-gti-20042008-19511"
    },
    "predecessor": {
      "name": "Volkswagen Golf GTI (Mk4)",
      "id": null
    },
    "successor": {
      "name": "Volkswagen Golf GTI (Mk6)",
      "id": null
    },
    "quick": "The GTI that won back the badge's good name after 2 forgettable generations. A turbocharged, direct-injected 2.0-liter 4-cylinder and, for the first time, a fully independent multi-link rear suspension made it comfortable, composed and properly quick again.",
    "story": [
      "By the early 2000s the GTI name had been fixed to heavier, softer Golfs that no longer deserved it, and the Mk5 was Volkswagen setting the record straight. Its turbocharged 2.0-liter made 197 hp, with full torque on tap from 1,800 rpm, so it felt effortless in traffic and eager on a back road, and tuners quickly found how much more it would give. The plaid seats and golf-ball knob returned, and a honeycomb grille carried the red stripe straight across the nose.",
      "The change that mattered most was out of sight. A multi-link rear axle replaced the old torsion beam, giving the GTI a level of body control and rear-end calm it had never had, and every generation since has built on it. It is still front-wheel drive with no limited-slip differential, so a clumsy exit from a tight bend will spin the inside front tire. Driven with a little finesse, it feels thoroughly modern in a way no earlier GTI does, which is why it remains one of the smartest ways into the badge."
    ],
    "articles": [
      "the-one-and-only"
    ],
    "photo": {
      "file": "2005 Volkswagen Golf GTi 2.0 Front.jpg",
      "credit": "Vauxford",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Volkswagen Golf GTI Mk5"
    ]
  },
  {
    "id": "volvo-240",
    "name": "Volvo 240",
    "aka": [
      "Volvo 242",
      "Volvo 244",
      "Volvo 245"
    ],
    "make": "Volvo",
    "maker": "Volvo",
    "country": "Sweden",
    "years": "1974–1993",
    "start": 1974,
    "end": 1993,
    "body": "Two-door sedan, four-door sedan and five-door wagon",
    "engine": "2.3-liter inline-4 (B230F)",
    "drive": "Rear-wheel drive",
    "gearbox": "Manual with overdrive, or automatic, by year and market",
    "specsFor": "1993 Volvo 240, US market, 2.3-liter B230F, automatic",
    "power": {
      "hp": 114,
      "note": "at 5,400 rpm",
      "src": "https://www.kbb.com/volvo/240/1993/specs"
    },
    "weight": {
      "kg": 1325,
      "note": "",
      "src": "https://www.kbb.com/volvo/240/1993/specs"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 2685171,
      "approx": false,
      "note": "",
      "src": "https://www.volvocars.com/intl/media/press-releases/FF2203283E0A1726/"
    },
    "predecessor": {
      "name": "Volvo 140 series",
      "id": null
    },
    "successor": {
      "name": "Volvo 940",
      "id": null
    },
    "quick": "Sweden's rolling brick: a boxy, rear-wheel-drive sedan and wagon built for nearly 20 years and close to 2.7 million units. Slow, square and stubbornly durable, it became the default car for families, students and anyone who put safety ahead of style.",
    "story": [
      "The 240 is the car people picture when they say Volvos used to be built like tanks. Launched in 1974, it wore big impact bumpers and a long nose designed to crumple, wrapped its passengers in a cabin built around survival, and kept that shape until 1993 because nobody could find a good reason to change it. Later cars ran a 2.3-liter 4-cylinder of about 114 hp, enough to keep up and never enough to impress, and the wagon swallowed furniture, dogs and dormitory moves without a word of complaint.",
      "Its great weakness is one of its simplest parts. Like most cars of its era, the 240 sends power through an open rear differential, which always splits torque equally between the rear wheels. On wet grass that means a tire spinning in mud caps the torque its twin on firm ground can receive, and the car sits there with the engine howling. Winter tires, not clever hardware, were always the real cure. Owners forgive it, because almost everything else on a 240 simply keeps working, decade after decade."
    ],
    "articles": [
      "one-wheel-drive"
    ],
    "photo": {
      "file": "Volvo 244 1982.jpg",
      "credit": "Bene Riobó",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Volvo 240"
    ]
  },
  {
    "id": "audi-allroad",
    "name": "Audi allroad quattro (C5)",
    "aka": [
      "Audi A6 allroad quattro"
    ],
    "make": "Audi",
    "maker": "Audi",
    "country": "Germany",
    "years": "1999–2005",
    "start": 1999,
    "end": 2005,
    "body": "Five-door wagon",
    "engine": "2.7-liter twin-turbo V6",
    "drive": "Permanent all-wheel drive (quattro)",
    "gearbox": "6-speed manual or 5-speed Tiptronic automatic",
    "specsFor": "2002 Audi allroad quattro 2.7T, US market",
    "power": {
      "hp": 250,
      "note": "",
      "src": "article:black-swan-allroad"
    },
    "weight": {
      "kg": 1890,
      "note": "",
      "src": "https://www.kbb.com/audi/allroad/2001/specs/"
    },
    "zero60": {
      "sec": 6.8,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:black-swan-allroad"
    },
    "top": {
      "mph": 145,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:black-swan-allroad"
    },
    "built": null,
    "predecessor": null,
    "successor": {
      "name": "Audi A6 allroad quattro (C6)",
      "id": null
    },
    "quick": "An A6 Avant wagon given air suspension, protective cladding and a twin-turbo V6, then asked to go wherever an SUV could. It raised itself from 5.6 to 8.2 inches of ground clearance, shrugged off snow and gravel, and earned an equally lasting reputation for leaking air springs and punishing repair bills.",
    "story": [
      "Audi built the allroad on a simple premise: a family should not have to choose between a fast luxury wagon and something that can reach the trailhead. So it took the A6 Avant, gave it a 4-position air suspension that could crouch for the highway and rise for a rutted track, wrapped the lower body in tough cladding and kept quattro all-wheel drive underneath. The 2.7-liter twin-turbo V6, shared with the S4, delivered 250 hp and 258 lb-ft in a broad, unhurried surge, and the cabin was as calm and well finished as any Audi of its day.",
      "The cleverness came with an invoice. Leaking air springs left cars slumped on their bump stops overnight, the turbo V6 consumed oil and demanded timing belts on schedule, and values collapsed as second owners discovered what upkeep really cost. Many were converted to steel springs or simply run into the ground. The survivors, usually cars with a single devoted owner and a thick folder of receipts, now attract a loyal following that sees the allroad for what it was: a crossover before the word caught on, built with far more ambition than most that followed."
    ],
    "articles": [
      "black-swan-allroad"
    ],
    "photo": {
      "file": "Audi allroad quattro I 20090321 front.jpg",
      "credit": "M 93",
      "license": "Public domain",
      "licenseUrl": "",
      "pos": ""
    },
    "match": [
      "Audi Allroad"
    ]
  },
  {
    "id": "polestar-1",
    "name": "Polestar 1",
    "aka": [],
    "make": "Polestar",
    "maker": "Polestar",
    "country": "Sweden",
    "years": "2019–2021",
    "start": 2019,
    "end": 2021,
    "body": "Two-door four-seat coupe",
    "engine": "2.0-liter supercharged and turbocharged inline-4, plus 2 electric rear motors (plug-in hybrid)",
    "drive": "All-wheel drive (engine drives the front wheels, electric motors the rear)",
    "gearbox": "8-speed automatic (front axle)",
    "specsFor": "2020 Polestar 1, US market",
    "power": {
      "hp": 619,
      "note": "combined system output",
      "src": "article:dying-star"
    },
    "weight": {
      "kg": 2345,
      "note": "",
      "src": "article:dying-star"
    },
    "zero60": {
      "sec": 3.7,
      "kind": "tested",
      "note": "Car and Driver test",
      "src": "article:dying-star"
    },
    "top": {
      "mph": 155,
      "kind": "claimed",
      "note": "Maker's claim, limited",
      "src": "article:dying-star"
    },
    "built": {
      "count": 1500,
      "approx": false,
      "note": "",
      "src": "article:dying-star"
    },
    "predecessor": null,
    "successor": null,
    "quick": "Polestar's first car and still its most extraordinary: a carbon-bodied 2+2 coupe pairing a supercharged and turbocharged 4-cylinder with 2 electric rear motors for 619 hp and 52 miles of electric range. Only 1,500 were built, and the high-performance plug-in formula it bet on in 2019 has since spread from BMW to Ferrari.",
    "story": [
      "The Polestar 1 began as the Volvo Concept Coupe of 2013 and reached production almost untouched: long hood, short deck, wide stance and a single crisp line running from the door handle to the tail. Every outer panel is carbon fiber, yet it still weighs 2,345 kg (5,170 lb), because it carries a 2.0-liter 4-cylinder for the front wheels, a large battery through its middle and a pair of electric motors for the rear, each with its own gearset for genuine torque vectoring. On battery alone it is rear-wheel drive. With the battery empty it becomes front-wheel drive.",
      "Driven as intended, it is a remarkable all-rounder: about 52 silent miles for daily errands, then all 619 hp for the open road, with Car and Driver timing 0 to 60 mph in 3.7 seconds. The flaws are honest ones. The engine sounds coarse, the cabin borrows heavily from Volvo, the rear seats suit only small children and the trunk is tiny. But hand-adjusted Öhlins dampers, Akebono brakes and a design that has not aged a day make it the rarest and most quietly ambitious grand tourer of its moment."
    ],
    "articles": [
      "dying-star"
    ],
    "photo": {
      "file": "2021 Polestar 1 in Magnesium, front left.jpg",
      "credit": "Mr.choppers",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "pos": ""
    },
    "match": [
      "Polestar 1"
    ]
  },
  {
    "id": "ford-everest",
    "name": "Ford Everest",
    "aka": [],
    "make": "Ford",
    "maker": "Ford",
    "country": "Australia",
    "years": "2022–present",
    "start": 2022,
    "end": null,
    "body": "Five-door, seven-seat body-on-frame SUV",
    "engine": "3.0-liter turbodiesel V6",
    "drive": "Full-time four-wheel drive with automatic 4A mode, lockable high and low range",
    "gearbox": "10-speed automatic",
    "specsFor": "Ford Everest Tremor 3.0 V6 turbodiesel, Australian and South African market",
    "power": {
      "hp": 247,
      "note": "",
      "src": "article:the-ford-america-will-not-sell-you"
    },
    "weight": {
      "kg": 2550,
      "note": "",
      "src": "article:the-ford-america-will-not-sell-you"
    },
    "zero60": null,
    "top": null,
    "built": null,
    "predecessor": {
      "name": "Ford Everest (second generation, 2015-2022)",
      "id": null
    },
    "successor": null,
    "quick": "A 7-seat, body-on-frame family SUV built on Ranger underpinnings, with coil springs, a rear locking differential and a 3,500 kg (7,716 lb) towing rating. It is a best seller in Australia and Southeast Asia, a Wheels Car of the Year winner, and has never been sold in the United States.",
    "story": [
      "The Everest is a mid-size pickup that traded its bed for a 3-row wagon body, and it fixes the part that usually spoils that recipe: the rear leaf springs give way to coils on a live axle located by a Watt's link. The coils let it cover long highway miles with the calm of a big touring wagon instead of the jiggle of a work truck. The best versions pair a 3.0-liter turbodiesel V6, making 247 hp and 443 lb-ft, with a 10-speed automatic and a transfer case that can shuffle torque automatically on a slick road or lock both axles together for mud and low-range crawling.",
      "Developed in Australia and built in Thailand, the current generation arrived in 2022 and quickly became the benchmark of its class, with the only V6 among 4-cylinder rivals and underbody protection, a rear locker and recovery hooks on every version. It is not flawless: the interior is beginning to date, and Toyota still owns the reputation for running forever. In the United States, where Ford sells the Bronco and Explorer instead, it is known mostly from photographs and the odd test vehicle spotted around Detroit."
    ],
    "articles": [
      "the-ford-america-will-not-sell-you",
      "the-segment-america-never-got"
    ],
    "photo": {
      "file": "2022 Ford Everest 2.0 Bi-Turbo Titanium+ 4x4 in Arctic White, front right.jpg",
      "credit": "Ethan Llamas",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Ford Everest"
    ]
  },
  {
    "id": "lamborghini-diablo-sv",
    "name": "Lamborghini Diablo SV",
    "aka": [],
    "make": "Lamborghini",
    "maker": "Lamborghini",
    "country": "Italy",
    "years": "1995–2000",
    "start": 1995,
    "end": 2000,
    "body": "Two-door coupe with scissor doors",
    "engine": "5.7-liter V12",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual with dog-leg first",
    "specsFor": "1996 Lamborghini Diablo SV, factory figures",
    "power": {
      "hp": 503,
      "note": "",
      "src": "article:it-was-always-trying-to-kill-you"
    },
    "weight": {
      "kg": 1576,
      "note": "",
      "src": "article:it-was-always-trying-to-kill-you"
    },
    "zero60": {
      "sec": 3.7,
      "kind": "tested",
      "note": "Motor Trend test",
      "src": "article:it-was-always-trying-to-kill-you"
    },
    "top": {
      "mph": 204,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:it-was-always-trying-to-kill-you"
    },
    "built": {
      "count": 346,
      "approx": true,
      "note": "",
      "src": "article:it-was-always-trying-to-kill-you"
    },
    "predecessor": {
      "name": "Lamborghini Countach",
      "id": null
    },
    "successor": {
      "name": "Lamborghini Murciélago",
      "id": null
    },
    "quick": "The driver's Diablo: Lamborghini removed the all-wheel-drive hardware, turned up the V12 and sold it as the cheapest Diablo on the price list. Rear-wheel drive, 335-section rear tires and no traction control or, on earlier cars, ABS made it a car that demanded respect and rewarded drivers who brought it.",
    "story": [
      "The SV arrived at Geneva in 1995 with extra brake ducts in the nose, an adjustable rear wing, its name painted along the flanks in enormous script and a clear message about who it was for. Lamborghini pulled the Diablo VT's viscous coupling, front driveshafts and electronically adjustable dampers, raised the 5.7-liter V12 to 510 metric hp and charged less for it than for any other Diablo. It was no lighter than the standard car, at 1,576 kg (3,474 lb) dry, and it did not need to be.",
      "Inside, it is loud at idle, heavy in the clutch and nearly blind to the rear, and the dog-leg gearbox demands deliberate hands. Yet the power steering is sharp, the ride surprisingly supple, and Motor Trend's figures put 60 mph 3.6 to 3.8 seconds away. Short gearing traded top speed for acceleration, and period testers warned that braking hard in a bend could bring the tail around. Built in Lamborghini's leanest years, it is the last SV to send its power to the rear wheels alone, and for many the most rewarding Diablo of all."
    ],
    "articles": [
      "it-was-always-trying-to-kill-you"
    ],
    "photo": {
      "file": "1998 Lamborghini Diablo SV Yellow Supercarfest.jpg",
      "credit": "MrWalkr",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Lamborghini Diablo SV"
    ]
  },
  {
    "id": "sbarro-super-twelve",
    "name": "Sbarro Super Twelve",
    "aka": [],
    "make": "Sbarro",
    "maker": "Sbarro (Atelier de Construction Automobile), Grandson",
    "country": "Switzerland",
    "years": "1982",
    "start": 1982,
    "end": 1982,
    "body": "Two-seat mid-engined hatchback",
    "engine": "Twin Kawasaki Z1300 inline-6s, 2,572 cc combined (12 cylinders)",
    "drive": "Rear-wheel drive, 1 engine per rear wheel, no differential",
    "gearbox": "2 5-speed motorcycle gearboxes, 1 lever",
    "specsFor": "1982 Sbarro Super Twelve, the one-off shown at Geneva in March 1982",
    "power": {
      "hp": 240,
      "note": "",
      "src": "article:twelve-angry-cylinders"
    },
    "weight": {
      "kg": 800,
      "note": "",
      "src": "article:twelve-angry-cylinders"
    },
    "zero60": {
      "sec": 5.0,
      "kind": "claimed",
      "note": "Maker's claim, 0-62 mph",
      "src": "article:twelve-angry-cylinders"
    },
    "top": {
      "mph": 125,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:twelve-angry-cylinders"
    },
    "built": {
      "count": 1,
      "approx": false,
      "note": "one-off",
      "src": "article:twelve-angry-cylinders"
    },
    "predecessor": null,
    "successor": {
      "name": "Sbarro Super Eight",
      "id": "sbarro-super-eight"
    },
    "quick": "A Mini-sized Swiss hatchback with 2 Kawasaki motorcycle sixes behind the seats, each one turning its own rear wheel through its own gearbox, and no differential to referee. It reached 62 mph in 5.0 seconds in 1982 and was, by its creator's own admission, a brute to tame. Only one was built.",
    "story": [
      "Franco Sbarro looked at the great automotive fantasies of the early 1980s, the 12-cylinder exotic and the hot hatch, and decided they belonged in the same body. His answer was a fiberglass shell about 3.1 meters long on a tube frame, with a pair of 1,286 cc inline-sixes from the Kawasaki Z1300 mounted crosswise behind the cabin and tied to each other by nothing sterner than V-belts. One lever worked both 5-speed gearboxes. The left engine pushed the left wheel, the right engine pushed the right, and inside there were 2 of every gauge except the speedometer.",
      "On paper it was a triumph: 240 hp in a car of 800 kg (1,764 lb), a better power-to-weight ratio than a Countach, and a sprint to 62 mph that left a Ferrari 308 GTB behind. On the road it was another animal. The torque came late and thin, the gearing ran dry near 125 mph, and any mismatch between the 2 halves turned into a sudden urge to change direction. Sbarro himself conceded it was hard to tame. His backer, Bernd Grohe, paid for a calmer Ferrari-engined sequel, the Super Eight, which makes the Twelve the wild first draft."
    ],
    "articles": [
      "twelve-angry-cylinders"
    ],
    "photo": {
      "fit": "contain"
    },
    "match": [
      "Sbarro Super Twelve"
    ]
  },
  {
    "id": "sbarro-super-eight",
    "name": "Sbarro Super Eight",
    "aka": [],
    "make": "Sbarro",
    "maker": "Sbarro (Atelier de Construction Automobile), Grandson",
    "country": "Switzerland",
    "years": "1984",
    "start": 1984,
    "end": 1984,
    "body": "Two-seat mid-engined hatchback",
    "engine": "Ferrari F106 2,927 cc V8, 32 valves, Bosch injection (from the 308 GTB Quattrovalvole)",
    "drive": "Rear-wheel drive, mid-engined",
    "gearbox": "Ferrari 5-speed manual transaxle, dogleg gate",
    "specsFor": "1984 Sbarro Super Eight, the one-off shown at Geneva in March 1984",
    "power": {
      "hp": 240,
      "note": "Ferrari's rating, engine untouched",
      "src": "article:twelve-angry-cylinders"
    },
    "weight": {
      "kg": 800,
      "note": "",
      "src": "article:twelve-angry-cylinders"
    },
    "zero60": null,
    "top": null,
    "built": {
      "count": 1,
      "approx": false,
      "note": "one-off",
      "src": "article:twelve-angry-cylinders"
    },
    "predecessor": {
      "name": "Sbarro Super Twelve",
      "id": "sbarro-super-twelve"
    },
    "successor": null,
    "quick": "Franco Sbarro's fix for the Super Twelve: the Super Twelve's look, wrapped this time around a shortened Ferrari 308 GTB with its 32-valve V8, gearbox, suspension and brakes left exactly as Ferrari built them. It had the same 240 hp and the same 800 kg as the twin-Kawasaki car, but 1 engine and 1 differential, which made it a car you could actually drive. Only one was built.",
    "story": [
      "The Super Twelve proved that 240 hp in a 3-meter hatchback was the easy part; getting it to the road was not. So for Geneva in March 1984, with Bernd Grohe paying, Franco Sbarro started from a whole Ferrari 308 GTB. He shortened the frame and kept the rest: the double wishbones, coil-overs and anti-roll bars at both ends, the ventilated discs, the transverse 2,927 cc V8 with 4 valves per cylinder and Bosch injection, and the 5-speed dogleg transaxle. Over it went a new fiberglass body in the Twelve's language, with the louvered nose panel, the chin spoiler and the slatted flanks, plus staggered gold-centered BBS wheels and, because the parts bin was handy, taillights from an Opel Ascona.",
      "On paper almost nothing changed: the same 240 hp, the same 800 kg (1,764 lb) and only 14 lb-ft more torque. On the road everything did, because 1 engine feeding 1 differential behaves the same way every time. It was built to be used, with power windows and a Clarion cassette stereo, and its owners have covered something like 19,000 to 20,000 miles in it. Nobody ever published performance figures. It went from Grohe to the Sbarro Museum and on through private owners and dealers, and its Dutch registration identifies it by its Ferrari engine number rather than a chassis number of its own."
    ],
    "articles": [
      "twelve-angry-cylinders"
    ],
    "photo": {
      "pos": "center bottom"
    },
    "match": []
  },
  {
    "id": "sbarro-windhound",
    "name": "Sbarro Windhound",
    "aka": [],
    "make": "Sbarro",
    "maker": "Sbarro (Atelier de Construction Automobile), Grandson",
    "country": "Switzerland",
    "years": "From 1978",
    "start": 1978,
    "end": null,
    "body": "Three-door and five-door luxury off-road wagon",
    "engine": "Buyer's choice of Mercedes, BMW, Jeep or Fiat engines (brochure car: 2.8-liter Mercedes inline-6)",
    "drive": "Part-time four-wheel drive",
    "gearbox": "4- or 5-speed manual, or automatic",
    "specsFor": "Sbarro Windhound brochure car (Mercedes 280 GE-based, 2.8-liter inline-6); weight and top speed are the range figures for the whole run",
    "power": {
      "hp": 156,
      "note": "",
      "src": "article:release-the-hounds"
    },
    "weight": {
      "kg": 1850,
      "note": "",
      "src": "article:release-the-hounds"
    },
    "zero60": null,
    "top": {
      "mph": 112,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:release-the-hounds"
    },
    "built": {
      "count": 14,
      "approx": false,
      "note": "",
      "src": "article:release-the-hounds"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A hand-built Swiss luxury off-roader from 1978, with leather, burl wood and hydraulic ride height long before the luxury SUV became an industry staple. Each of the 14 built was specified to order, right down to the chassis and the engine. One ran the Paris-Dakar and came home wearing its exhaust over the roof.",
    "story": [
      "In 1978 the four-wheel-drive world offered farm-grade workhorses and not much else, and Franco Sbarro wanted something that could climb a mountain and still feel like a private library inside. So he built it: a tall, square-shouldered wagon with heated, electrically adjusted Recaros, real wood across the dash, air conditioning and, according to the period brochure, a laser disc player. Hydraulic jacks lifted the body from 25 cm to 42 cm (9.8 to 16.5 inches) of ground clearance on command. The bits nobody noticed were borrowed: a Fiat 131 windshield, a Volkswagen Passat grille, Opel taillights.",
      "There was no standard Windhound, because there was no standard anything. Buyers chose 3 doors or 5, manual or automatic, and an engine from Mercedes, BMW, Jeep or Fiat, while the chassis beneath could be Mercedes G, Jeep Cherokee Chief or Range Rover. The first one, built for a customer in Neuchâtel, was later entered in the 1980 Paris-Dakar and rolled its way out of the rally 3,500 km (about 2,175 miles) in. Sbarro bought the wreck back, rebuilt it and sent the exhaust and air intake up over the roof. A stretched cousin, the Windhawk, went falcon hunting for a king."
    ],
    "articles": [
      "release-the-hounds"
    ],
    "photo": {
      "pos": "center 72%"
    },
    "match": [
      "Sbarro Windhound"
    ]
  },
  {
    "id": "sbarro-monster-g",
    "name": "Sbarro Monster G",
    "aka": [],
    "make": "Sbarro",
    "maker": "Sbarro (Atelier de Construction Automobile), Grandson",
    "country": "Switzerland",
    "years": "1987",
    "start": 1987,
    "end": 1987,
    "body": "Doorless, roofless off-roader",
    "engine": "6.9-liter Mercedes-Benz V8",
    "drive": "Four-wheel drive",
    "gearbox": "",
    "specsFor": "1987 Sbarro Monster G, the one-off built for Thomas Gehrig",
    "power": {
      "hp": 350,
      "note": "",
      "src": "article:frankenstein-monster-g"
    },
    "weight": null,
    "zero60": null,
    "top": {
      "mph": 130,
      "kind": "claimed",
      "note": "Maker's claim",
      "src": "article:frankenstein-monster-g"
    },
    "built": {
      "count": 1,
      "approx": false,
      "note": "'Modèle unique' per the Calvet archive",
      "src": "https://sbarro.phcalvet.fr/voitures/Monster/monsterG.html"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A doorless Swiss off-roader 2.3 meters (7.5 feet) tall, built in 1987 on Range Rover underpinnings, rolling on wheels salvaged from a crashed Boeing 727 and pushed along by a 350-hp Mercedes V8. 8 exhaust pipes poke up through the hood, and a folding mini-bike rides in the back for when the fuel runs out. It is Franco Sbarro at his most gleefully excessive.",
    "story": [
      "The request sounded almost reasonable: a young German client, Thomas Gehrig, wanted something to explore his family's 150-acre property in. Franco Sbarro heard that and went shopping for aircraft parts. The wheels came off the landing gear of a Boeing 727 that had crashed at Geneva airport, each weighing 200 kg (441 lb) until Goodyear helped slim them down and developed tires to suit. The chassis was a heavily reworked Range Rover, the body was Kevlar rather than the polyester Sbarro usually worked in, and the engine was a big Mercedes V8 rated at 350 hp, good for a claimed 130 mph.",
      "Everything about it is a cartoon made solid. There are no doors and no roof, 8 exhausts sprout through the hood, Recaro racing seats sit inside a roll cage, and the cargo bay carries a generator and a folding mini-motorcycle, a sensible precaution in a machine this thirsty. What it never did was reach the man who ordered it. The final bill outran Gehrig's means, and the Monster G was sold to a collector in Japan along with 4 other Sbarros before later going on display in Europe. It remains a single, unrepeatable joke told at full volume."
    ],
    "articles": [
      "frankenstein-monster-g"
    ],
    "photo": {
      "pos": "center 55%"
    },
    "match": [
      "Sbarro Monster G"
    ]
  },
  {
    "id": "felber-ferrari-beach-car",
    "name": "Felber Ferrari 365 GTC/4 Beach Car",
    "aka": [
      "Ferrari 365 GTC/4 Beach Car",
      "Beach Ferrari",
      "Croisette"
    ],
    "make": "Ferrari",
    "maker": "Ferrari, rebodied by Michelotti for Willy Felber",
    "country": "Italy",
    "years": "1976",
    "start": 1976,
    "end": 1976,
    "body": "Two-seat doorless, roofless beach car",
    "engine": "4.4-liter quad-cam V12 (Ferrari F101)",
    "drive": "Rear-wheel drive",
    "gearbox": "5-speed manual",
    "specsFor": "1976 Felber Beach Car, chassis 16017, on its 1972 European-spec 365 GTC/4 drivetrain",
    "power": {
      "hp": 340,
      "note": "",
      "src": "article:topless-beach"
    },
    "weight": null,
    "zero60": null,
    "top": null,
    "built": {
      "count": 1,
      "approx": false,
      "note": "one-off, chassis 16017",
      "src": "article:topless-beach"
    },
    "predecessor": null,
    "successor": null,
    "quick": "A Ferrari 365 GTC/4 with its roof and doors cut away, rebodied by Giovanni Michelotti in 1976 for Swiss importer Willy Felber as a seaside toy for the Emir of Qatar. The Emir canceled, nobody else bit, and the one-off spent years being repainted, rebodied and passed around. Underneath it is still a 340-hp V12 grand tourer, just with nothing between the driver and the sky.",
    "story": [
      "The beach car was an Italian summer habit: take a small Fiat, strip off everything that keeps the weather out, and drive it to the harbor in August. Willy Felber, the Swiss Ferrari and Rolls-Royce importer with a weakness for spectacle, wondered what would happen if the donor wore a prancing horse. In early 1976 he gave Michelotti chassis 16017, a 1972 365 GTC/4 that had lived quietly with a Lausanne surgeon, and 3 months later it returned with no doors and no roof. The body sides drop away in one deep curve where the doors should be, the pop-up headlights are pure GTC/4, and a badge reading BEACH CAR settles any lingering doubt.",
      "Then the Emir canceled. Shown in bronze at Geneva in 1976, it found no buyer, was rebodied as a brown shooting brake for 1977, failed again, and was put back the way it was. A buyer finally came along in 1978, and Swiss road papers took until 1989. None of that shows from the driver's seat. The 4.4-liter V12, a softer wet-sump relative of the Daytona's engine, is smooth and patient, and the open cabin stays calm at 60 mph. Faster Ferraris existed. Few were sunnier."
    ],
    "articles": [
      "topless-beach"
    ],
    "photo": {
      "file": "1976 Ferrari 365 GTC-4 Beach Car by Michelotti.jpg",
      "credit": "Calreyn88",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "pos": ""
    },
    "match": [
      "Ferrari 365 GTC/4 (Felber Beach Car)"
    ]
  }
];
