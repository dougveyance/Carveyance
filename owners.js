/* ============================================================
   CARVEYANCE — OWNERS
   ============================================================

   The readers whose cars appear in Owner's Manual. An owner listed
   here gets a page at carveyance.com/owners/<id>/ as soon as at
   least one story in articles.js names them. Owners with no
   published story yet are simply skipped, so it's safe to add
   someone here before their story is ready.

   To publish an Owner's Manual story:
     1. Add the owner below (once — repeat owners reuse their entry).
        Add each new car to their "cars" list.
     2. In the story's entry in articles.js, add two lines:
            "owner": "tony-m",
            "ownerCar": "rx7",
     3. Run, from the top level of the repo:
            python3 events_build.py
            python3 owners_build.py
            python3 fix_links.py
            python3 seo_inject.py

   ------------------------------------------------------------
   COPY THIS TEMPLATE, paste it inside the list, fill it in:

  {
    "id": "tony-m",
    "name": "Tony M.",
    "town": "Torrance, CA",
    "instagram": "@handle",
    "bio": "One or two lines about them, in our words.",
    "photo": "/assets/owners/tony-m.jpg",
    "cars": [
      { "id": "rx7", "name": "1994 Mazda RX-7 R2", "photo": "/assets/owners/tony-m-rx7.jpg" }
    ]
  },

   ------------------------------------------------------------
   RULES:

   1. id        = lowercase letters, numbers and hyphens. Never change
                  it once the page is live: it's the page's address.
   2. name      = exactly how the owner asked to be credited on the
                  form (full name, first name and last initial, or a
                  nickname).
   3. town      = town and state only. Never a street address.
   4. instagram = "@handle", or "" if they'd rather not show it.
   5. photo     = optional ("" for none). Only photos the owner sent
                  with the rights box ticked. Put them in
                  /assets/owners/.
   6. cars      = one entry per car. Each car's "id" is short and only
                  has to be unique for that owner ("rx7", "e30").
   7. Keep the quotes and the commas exactly as shown.
   ============================================================ */

const OWNERS = [
];
