#!/usr/bin/env python3
"""
Carveyance sticker batch maker
------------------------------
Makes the numbers and claim codes for a new run of car stickers.

    python3 tools/make_stickers.py --start 1 --count 50 --batch trial-1

It writes two files into  sticker_batches/<batch>/ :

  printer.csv   for the printer: one row per sticker with its number,
                the web address its QR code must open, and the claim
                code for its backing card. KEEP THIS PRIVATE: anyone
                with a claim code can claim that sticker.
  load.sql      paste into Supabase > SQL Editor and Run. It loads the
                stickers with only a scrambled (hashed) copy of each
                claim code, so the real codes never sit in the database.

sticker_batches/ is in .gitignore, so GitHub Desktop never offers to
commit these files and they never reach the live site. Don't move them
anywhere inside the repo that isn't ignored.

If a number already exists in the database, load.sql stops with an
error and loads nothing, so a batch can never overwrite stickers that
are already printed. Use a --start past your last batch.
"""
import argparse, csv, hashlib, os, secrets, sys

# No 0/O, 1/I/L: easy to read off a card and type on a phone.
ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"
SITE = "https://carveyance.com"


def new_code():
    raw = "".join(secrets.choice(ALPHABET) for _ in range(8))
    return raw[:4] + "-" + raw[4:]


def claim_hash(number, code):
    """Must match claim_sticker() in tools/garage/schema.sql."""
    normalized = "".join(ch for ch in code.upper() if ch.isalnum())
    return hashlib.sha256(f"{number}:{normalized}".encode("utf-8")).hexdigest()


def label(number):
    return f"{number:04d}"


def main():
    ap = argparse.ArgumentParser(description="Make a batch of Carveyance sticker codes.")
    ap.add_argument("--start", type=int, required=True, help="first sticker number, e.g. 1")
    ap.add_argument("--count", type=int, required=True, help="how many stickers, e.g. 50")
    ap.add_argument("--batch", required=True, help="a short name for this run, e.g. trial-1")
    ap.add_argument("--out", default="sticker_batches", help="folder for the output (default sticker_batches)")
    a = ap.parse_args()

    if not os.path.exists("articles.js"):
        sys.exit("Run this from the top level of the repo (the folder holding articles.js).")
    if a.start < 1 or a.count < 1 or a.start + a.count - 1 > 99999:
        sys.exit("Numbers must run from 1 to 99999.")
    if not all(ch.isalnum() or ch in "-_" for ch in a.batch):
        sys.exit("Use only letters, numbers, - and _ in the batch name.")

    folder = os.path.join(a.out, a.batch)
    if os.path.exists(folder):
        sys.exit(f"{folder} already exists. Pick a new batch name so nothing gets overwritten.")
    os.makedirs(folder)

    rows = []
    for n in range(a.start, a.start + a.count):
        code = new_code()
        rows.append((n, code, claim_hash(n, code)))

    with open(os.path.join(folder, "printer.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["number", "label", "qr_url", "claim_code"])
        for n, code, _ in rows:
            w.writerow([label(n), f"No. {label(n)}", f"{SITE}/c/{label(n)}", code])

    with open(os.path.join(folder, "load.sql"), "w", encoding="utf-8") as f:
        f.write(f"-- Carveyance stickers {label(a.start)} to {label(a.start + a.count - 1)}"
                f" (batch {a.batch}). Paste into Supabase > SQL Editor and Run.\n")
        f.write("-- Stops with an error, loading nothing, if any of these numbers already exist.\n")
        f.write("insert into public.stickers (number, claim_hash, batch) values\n")
        f.write(",\n".join(f"  ({n}, '{h}', '{a.batch}')" for n, _, h in rows))
        f.write(";\n")

    print(f"Made {a.count} stickers, {label(a.start)} to {label(a.start + a.count - 1)}.")
    print(f"  {folder}/printer.csv  -> send to the printer (keep private)")
    print(f"  {folder}/load.sql     -> paste into Supabase > SQL Editor and Run")
    print("Next batch should start at", a.start + a.count)


if __name__ == "__main__":
    main()
