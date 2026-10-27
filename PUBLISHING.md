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
Owner's Manual  Road Trips      Opinions        Advice & Tips
Fun Facts       Short Stories   Interviews      News
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

---

## The Events page

`carveyance.com/events/` reads one file: **`events.js`**, at the top level
next to `articles.js`. It holds two lists.

- `EVENTS` — dated shows, concours, races and auctions. Each one hides itself
  the day after its `end` date, so old events never need deleting by hand.
- `MEETS` — weekly and monthly meets (Cars & Coffee, cruise nights). These
  stay up until someone removes them.

To add one by hand, copy an existing entry in the right list and change the
values. The rules:

| Field | Rule |
|---|---|
| `start`, `end` | `YYYY-MM-DD`. One-day event: make them the same |
| `region` | Exactly one of: `LA & South Bay`, `Southern California`, `West`, `Northwest`, `Mountain`, `Texas & South`, `Midwest`, `Southeast`, `Mid-Atlantic`, `Northeast` |
| `url` | The organizer's own page, starting `https://`. Leave `""` if there isn't one |
| `via` | Only when `url` is a trusted local calendar rather than the organizer's own page, e.g. `"Frank's Cars in the Hood"`, `"LACar"` or `"SoCalCarLife"`. The button then reads "Details on …" and the event page says the organizer isn't confirmed. Use it only when the calendar shows an upcoming date. Leave it out when `url` is the organizer's own page. Sites like GetOutGarage that list unclaimed meets aren't trusted calendars: they're leads only |
| `instagram` | `@handle`, or `""` |
| `pick` | `true` puts the orange Carveyance Pick badge on it |
| `added` | `YYYY-MM-DD` the day it went on the page; drives the "Most Recently Added" sort |
| `image` | Optional, e.g. `"/assets/events/<id>.jpg"`. Only a flyer or photo the organizer sent (via the form, with the rights box ticked) or one you supplied. Leave it out and the card shows a Carveyance tile instead |
| `status` | Leave out normally. `"canceled"`, `"postponed"`, `"moved"` or `"changed"` puts a notice on the card and the event page and tells Google. `"expected"` means the organizer hasn't posted dates yet |
| `note` | One short line shown with a status, e.g. `"Rained out this Saturday"` |
| `sponsored` | `true` only when an organizer has paid for a sponsored listing. Puts a gray "Sponsored" tag on the card and the event page. Never on a Carveyance Pick |
| `lat`, `lng` | Map position of the town, added by Claude's weekly check. Leave them alone |
| `EVENTS_UPDATED` | Change this date at the top when you edit the file |

Event submissions from the form at the bottom of the page arrive in Netlify
under **Forms → event-submission**, the same place the contributor form lands.
One-line tips from the "Know one we're missing?" box (on the Events page and
every state page) arrive under **Forms → event-tip**; the `page` field says
which page it came from.
A submitted flyer comes through as a file attachment on that submission. To use
it, save it into `assets/events/` named after the entry's `id`, landscape, about
1200px wide, and set that entry's `image`.

### Event pages, the map and the home-screen app

Every listing also has its own page, `carveyance.com/events/<id>/`, which is
what Google shows for "car show near me" searches. They are built from
events.js by a script, so after ANY change to events.js run, from the repo root:

    python3 events_build.py     (rebuilds events/<id>/ pages, removes ended ones)
    python3 owners_build.py     (rebuilds the Owner's Manual owner pages)
    python3 fix_links.py
    python3 seo_inject.py       (adds the event and owner pages to sitemap.xml)

Everything inside the `events/` folder is either built by that script or part
of the Events app (index.html, events-common.js, sw.js, manifest.webmanifest,
icon-maskable-512.png). When a zip from Claude includes the whole `events`
folder, it is safe to replace the folder whole. That is NOT true of the
`articles` folder: never replace `articles` whole, only the files inside it.

`tools/geocode_events.js` is for Claude's weekly check; you never need to run it.

### State pages

The same script builds a page for every state that has listings, at
`carveyance.com/events/<state>/` (`/events/california/`, `/events/new-york/`),
plus `/events/los-angeles/` for everything in the LA & South Bay region. They
list what's coming up and the regular meets by town, and they're what Google
shows for searches like "car shows in Texas". You never edit them: they're
rebuilt every time `events_build.py` runs, and a state's page disappears by
itself if it has no listings left. The "Car events by state" links on the
Events page are refreshed at the same time, between the `state-links` markers
in `events/index.html` (leave those two marker lines alone).

### Grid, Map and Calendar

The Events page has 3 views. Calendar shows one month at a time, with each
listing colored by its type (the same colors as the type tags on the cards)
and a key above it. A day with more than 3 listings shows "+N more"; clicking
a day lists everything on it. All the filters apply except "When", since the
calendar has its own dates. Nothing to maintain: it reads events.js like the
rest of the page.

### The "near you" link

`carveyance.com/near` opens the Events page set to "This weekend" and "Nearest
to me". The reader's phone or browser asks once to share their location, then
shows what's on within 50 miles (they can widen it). Use it in the newsletter
and on social for anyone outside LA. It's set in `_redirects`.

The map uses OpenStreetMap's free tiles, which are fine at this site's
traffic. If the Events page ever gets heavy use, switch the one tile line in
events/index.html to a paid tile service.

The weekly events check from Claude sends a replacement `events.js` and a
fresh `events` folder with drop instructions; drop them in and push.

### The Menu button on phones and tablets

On screens narrower than about 1,240px the section links in the top bar are
hidden. `assets/js/cv-menu.js` adds a Menu button there that opens the same
links in a panel (and, on the home page, Write for Us). It copies whatever is
in the page's top-bar links, so adding a section to the nav needs no change to
the script. Any new page that has the full top bar needs this one line just
before `</body>`:

    <script src="/assets/js/cv-menu.js" defer></script>

The Events pages load it automatically through `events/events-common.js`.

---

## The Paddock (the directory)

`carveyance.com/paddock/` is the guide to car clubs, museums, tracks and
driving schools, shops and specialty dealers. It reads one file, **`paddock.js`**,
at the top level next to `events.js`: one line per listing.

| Field | Rule |
|---|---|
| `id` | Lowercase-hyphen name plus town, e.g. `eurocode-tuning-torrance`. Never change it once it's live: it's the page address |
| `category` | Exactly one of the names in `PADDOCK_CATEGORIES` at the top of the file |
| `region` | Same 10 regions as the Events page |
| `url`, `instagram` | The business's own website and `@handle`. At least one |
| `address`, `phone` | Only if the business posts them itself |
| `tags` | Up to 4 short specialties, e.g. `"Porsche"`, `"PPF"` |
| `blurb` | 1–2 sentences in our own words on why a car person would go |
| `featured` | `true` only when a business pays to be Featured: sorts first, orange "Featured" tag, a "Paid listing" note |
| `sponsored` | `true` for any other paid placement: gray "Sponsored" tag. Its links are marked as sponsored for Google |
| `affiliate` | `true` when `url` is an affiliate link: the page shows the commission note |
| `lat`, `lng`, `added` | Filled in by Claude |

After any change to paddock.js, from the top level of the repo run:

    python3 paddock_build.py    (rebuilds paddock/<id>/ pages and the category pages)
    python3 seo_inject.py       (adds them to sitemap.xml)

Everything in `paddock/` except `index.html` and `paddock-common.js` is built
by that script, so a zip from Claude with the whole `paddock` folder is safe to
drop in whole. Submissions from the "Get listed" form arrive in Netlify under
**Forms → paddock-submission**; a claim from a listing's page carries its
`listing_id`.

**Clicks for advertisers.** Every tap on a listing's Website, Instagram, phone
or Directions is counted once per phone per day. The totals for the last 30
days are on your Garage admin page, under The Paddock. Use them when you talk
to a business about being Featured.

## The Lot (cars for sale)

`carveyance.com/lot/` lists cars for sale from their owners. It is built on
the sticker car pages (Carveyance Garage below), so only a car with a claimed
sticker can be listed.

- **Owners** switch on "List this car for sale" in their editor at
  `carveyance.com/garage/`, add a price (or leave it blank for "Make an
  offer") and notes, and mark it sold when it sells.
- **You approve each listing** on the Garage admin page before it shows on The
  Lot or the car page. Listing again after taking it down needs approval again.
- **Buyers** tap "Message the owner" on the car page. The message is stored
  privately; the owner reads it in their editor and replies by email. The
  owner's email and phone are never shown. Limits: 2 messages per phone per
  car per day, 6 per phone per day. You can hide spam from the admin page.
- Carveyance never handles money between buyer and seller.
- **Not built yet:** an email to the owner when a message arrives (for now the
  editor shows an unread count), and buying through Carveyance with escrow.

The database part is `tools/garage/lot_and_paddock.sql`, run once in the
Supabase SQL Editor after `schema.sql`.

## Owner's Manual (readers' cars)

`carveyance.com/categories/owners-manual/` (short link: `carveyance.com/owners-manual`)
is the section for readers' cars. Readers fill in the "Tell us about your car"
form on that page; submissions arrive in Netlify under **Forms → owners-manual**,
with a link to the owner's photos (a shared album or an Instagram post). The
form deliberately takes no photo uploads: Netlify caps form attachments, and on
the free plan going over that cap can pause the whole site.

It works like a journal for each reader's car: the first story, then each
road trip or adventure after it. The form asks what the story is about, how
the owner wants to be credited, and whether they've sent one before.

Nothing is published automatically. When you pick one, send Claude the
submission. Claude writes it up as a normal article with
`category: "Owner's Manual"`, quoting the owner by name, and it goes through the
usual article steps above. Ask the owner for the full-size photos first. Only
use photos the owner ticked the rights box for.

### Owner pages

Every featured owner gets a page at `carveyance.com/owners/<id>/` with their
garage (each car they've written about) and their journal (all their stories,
grouped by car, newest first). `carveyance.com/owners/` lists all of them, the
Owner's Manual page shows a row of owners, and each story gets an "About the
owner" box at the foot linking back to their page.

- The owners themselves are listed in **`owners.js`** (top level, next to
  `articles.js`): id, how they're credited, town, Instagram, a line about
  them, an optional photo, and their cars. The instructions are at the top of
  that file. Add an owner once; a repeat owner reuses the same entry.
- A story is theirs when its entry in `articles.js` has
  `"owner": "<id>"` and `"ownerCar": "<car id>"`.
- Then run `python3 owners_build.py` (it's in the list of scripts above). It
  builds the owner pages and the boxes, and removes an owner's page if they
  have no stories left. Never edit those pages by hand.
- An owner's story can sit in another section, say Road Trips, and it will
  still show in Owner's Manual and on their page.

### Owner's Manual and Road Trips

Owner's Manual is readers' own stories about their own cars, road trips
included. Road Trips is the guide: where to go, where to stop, what to see,
where to eat, and the roads less traveled. When a reader's story turns up a
great road, it can become a Road Trips piece with credit to them (the form
asks "Found a road worth the drive?").

## Advertise & Partner

`carveyance.com/advertise/` has no prices on it. Inquiries arrive in Netlify
under **Forms → partner-inquiry**. The page promises that anything paid for is
labeled Sponsored, that sponsors don't buy reviews, Picks or story changes, and
that a sponsored event listing is never a Carveyance Pick. Keep to that.

---

## Carveyance Garage (car stickers)

Each Carveyance sticker has its own number and QR code. Scanning it opens
`carveyance.com/c/<number>`:

- **A new sticker** shows "This car's page is coming soon" plus a box for the
  owner to claim it with the claim code from the card it came on.
- **A claimed sticker** shows the car's page: photos, specs, the build, where
  it's been, and a "Collect this card" button.
- **Owners** edit their page at `carveyance.com/garage/`.
- **Visitors' collected cards** are saved on their phone, at `carveyance.com/cards/`.
- **You** moderate at `carveyance.com/garage/admin/`.

Stamps and rewards aren't built yet, on purpose: they come after the trial runs.

The pages keep their data in Supabase, a hosted database with logins and photo
storage. The files:

| File | What it is |
|---|---|
| `c/index.html` | The car page every sticker opens |
| `cards/index.html` | My cards |
| `garage/index.html` | The owner's editor (sign in, claim, edit) |
| `garage/admin/index.html` | Your admin page |
| `assets/js/cv-garage.js`, `assets/css/garage.css` | Shared code and styles for those pages |
| `assets/js/cv-garage-config.js` | The 2 connection settings you fill in once |
| `assets/js/vendor/supabase-js-2.117.2.js` | The database library, kept on our own site |
| `tools/garage/schema.sql` | The database setup, pasted into Supabase once |
| `tools/make_stickers.py` | Makes sticker numbers and claim codes for the printer |
| `_redirects` | The line `/c/* /c/index.html 200` sends every sticker number to the car page |

### One-time setup (about 20 minutes)

1. **Create the project.** Sign up free at supabase.com, then click New project.
   Name it `carveyance`, pick a West US region, and save the database password
   somewhere safe (you won't need it day to day).
2. **Set up the database.** Open SQL Editor, start a new query, paste in all of
   `tools/garage/schema.sql` and click Run. "Success. No rows returned" means it
   worked. It's safe to run again later.
3. **Let owners sign up on the spot.** Go to Authentication → Sign In / Providers
   → Email. Leave Email on and turn **off** "Confirm email". Supabase's built-in
   email only sends about 4 emails an hour, so if every new account needed a
   confirmation email, owners couldn't sign up at a meet. With it off, they make
   an account with an email and password and claim their sticker right away.
   "Forgot password" emails still work.
4. **Tell it where the site is.** Go to Authentication → URL Configuration. Set
   Site URL to `https://carveyance.com` and add `https://carveyance.com/garage/**`
   under Redirect URLs.
5. **Connect the site.** Go to Settings → API (newer dashboards call it API Keys).
   Copy the Project URL and the **anon public** key (newer projects call it the
   publishable key; it starts `sb_publishable_`). Paste both into
   `assets/js/cv-garage-config.js`, then commit and push. **Never** paste the
   `service_role` or secret key anywhere in the site.
6. **Make your own account.** Go to `carveyance.com/garage/` and create an
   account with your email.
7. **Make yourself an admin.** In the SQL Editor, run this with your email:

       insert into admins (user_id) select id from auth.users where email = 'you@example.com';

   `carveyance.com/garage/admin/` now opens for you.
8. **Test with a practice sticker.** From the repo folder in Terminal:

       python3 tools/make_stickers.py --start 9999 --count 1 --batch test

   - Paste `sticker_batches/test/load.sql` into the SQL Editor and Run.
   - Open `carveyance.com/c/9999` and claim it with the code in
     `sticker_batches/test/printer.csv`.
   - Fill in a car, then collect its card from another phone.
   - To remove the test afterward, run this in the SQL Editor:

         delete from cars where sticker_number = 9999; delete from stickers where number = 9999;

### Making stickers for the printer

    python3 tools/make_stickers.py --start 1 --count 50 --batch trial-1

This writes 2 files into `sticker_batches/trial-1/`:

- **`printer.csv` goes to the printer.** The `qr_url` column is what each QR code
  must open. The `claim_code` column goes on the matching backing card. Keep this
  file private: anyone with a code can claim that sticker.
- **`load.sql` gets pasted into the SQL Editor and Run.** It loads the stickers
  with only a scrambled copy of each code. If any of the numbers already exist,
  it stops without loading anything.

`sticker_batches/` is ignored by Git, so GitHub Desktop never shows it and the
codes never reach the live site. Start each new batch where the last one ended.

### During the trial

- **Owners:** scan the sticker, create an account, enter the claim code, fill in
  the car. Photos are shrunk on the phone before they upload. After 10 wrong
  codes a sticker locks; unlock it from the admin page once you know who has it.
- **Your admin page:**
  - Read and clear reports.
  - Hide a page.
  - Mark a car's specs as checked by Carveyance.
  - Link a car to its owner's page by the owner's id from `owners.js`. Their
    Owner's Manual stories then show on the car page as its journal.
  - Add "Seen by Carveyance" to a car's events.
- **The numbers:**
  - Page visits count once per phone per day. The owner's own visits don't count.
  - Cards collected count once per phone per car.
  - Owners see their own numbers privately in their editor.

### Good to know

- **The free Supabase plan pauses a project after 7 days without visitors.**
  While it's paused, sticker pages say "We couldn't load this car." Restore it
  from the Supabase dashboard. Move to the Pro plan ($25/month) before a real
  launch.
- **Collected cards live in the visitor's browser**, so clearing it removes them.
- **Car pages are built in the browser.** A link to one pasted into a text or
  Instagram shows a general Carveyance preview, not the car.
- **Not built yet:**
  - stamps and rewards
  - organizer check-in (the "Checked in" label is ready but nothing sets it yet)
  - factory specs filled in automatically
  - a page for readers to request a sticker
