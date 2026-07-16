#!/usr/bin/env python3
"""
CARVEYANCE — WORDMARK REPAIR
============================================================================
Fixes the wordmark across every article in your repo, and any you add later.

WHAT IT FIXES

  1. THE FONT.  Your wordmark CSS says:
         font-family:'Bebas Neue', Impact, 'Arial Narrow', sans-serif
     If an article doesn't LOAD Bebas Neue, the browser silently uses
     Impact instead — a completely different face. That's why CARVEYANCE
     looks different from article to article.

     Bebas Neue is also an ALL-CAPS typeface. That's why the markup says
     "Car"+"veyance" but renders "CARVEYANCE". When it falls back to
     Impact — which is not caps-only — you get lowercase "Carveyance"
     in the wrong font. One cause, two symptoms.

     Fix: add Bebas Neue to the article's Google Fonts request.

  2. THE SECOND WORDMARK.  Some articles carry TWO brand marks: the site
     chrome nav (Car|veyance, #4E8DB5 — correct) and the article's own
     topbar (Carv|eyance, a different blue — wrong split, wrong colour).

     Fix: make the topbar mark match canonical.

CANONICAL (taken from your own index.html, not invented):
     markup  :  Car<span>veyance</span>
     font    :  'Bebas Neue'
     CAR     :  #ffffff
     VEYANCE :  #4E8DB5

HOW TO RUN
     Open Terminal. Then:

         cd ~/Documents/GitHub/Carveyance
         python3 fix_wordmark.py

     That's a DRY RUN. It changes nothing — it just prints what it would
     do to each article. Read it. If it looks right:

         python3 fix_wordmark.py --apply

     That backs up every file it touches to  _wordmark_backup/  first.
     To undo everything:

         python3 fix_wordmark.py --restore

Safe to run twice. Files already correct are skipped.
============================================================================
"""
import re, sys, os, shutil
from pathlib import Path

# Canonical wordmark — copied from .nav-brand in your own index.html.
CANON_BLUE   = '#4E8DB5'
CANON_WHITE  = '#ffffff'
CANON_FONT   = "'Bebas Neue',sans-serif"
CANON_SIZE   = '26px'
CANON_TRACK  = '.08em'
BACKUP      = Path('_wordmark_backup')

GREEN, RED, YEL, DIM, OFF = '\033[92m', '\033[91m', '\033[93m', '\033[2m', '\033[0m'


def find_articles(root: Path):
    d = root / 'articles'
    if not d.is_dir():
        sys.exit(f"{RED}Can't find an 'articles' folder here.{OFF}\n"
                 f"Run this from inside your Carveyance repo:\n"
                 f"    cd ~/Documents/GitHub/Carveyance\n"
                 f"    python3 fix_wordmark.py")
    return sorted(p for p in d.glob('*/index.html') if p.is_file())


# ---------------------------------------------------------------- fix 1
def fix_font(html: str):
    """Ensure Bebas Neue is actually requested. Returns (html, note|None)."""
    if not re.search(r"Bebas\s+Neue", html):
        return html, None                      # nothing references it; leave alone

    link = re.search(r'href="(https://fonts\.googleapis\.com/css2\?[^"]+)"', html)
    if not link:
        # no webfont request at all — add one in <head>
        tag = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
               '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
               '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" '
               'rel="stylesheet">\n')
        if '</head>' not in html:
            return html, 'NO <head> — skipped'
        return html.replace('</head>', tag + '</head>', 1), 'added a Google Fonts request'

    url = link.group(1)
    if 'family=Bebas+Neue' in url:
        return html, None                      # already loaded
    new = url.replace('css2?', 'css2?family=Bebas+Neue&', 1)
    return html.replace(url, new, 1), 'added Bebas Neue to the font request'


# ---------------------------------------------------------------- fix 2
# The wordmark is written differently in every article: different element
# (<a>/<div>/<span>), different split (CARV|EYANCE, Carv|eyance, CAR|VEYANCE),
# different inner span class (.b/.s/.e). So match STRUCTURE, not one pattern:
# any element with class="wordmark" holding text + a nested span + text.
WORD = re.compile(
    r'(<(?P<tag>a|div|span|h1|p)[^>]*class="[^"]*\bwordmark\b[^"]*"[^>]*>)'
    r'\s*(?P<pre>[A-Za-z]*)\s*'
    r'(?P<open><span[^>]*>)\s*(?P<post>[A-Za-z]*)\s*(?P<close></span>)',
    re.I)


def fix_split(html: str):
    notes = []
    def sub(m):
        whole = (m.group('pre') + m.group('post')).upper()
        if whole != 'CARVEYANCE':
            return m.group(0)                       # not the wordmark; leave it
        if m.group('pre') == 'CAR' and m.group('post') == 'VEYANCE':
            return m.group(0)                       # already canonical
        notes.append(f"{m.group('pre')}|{m.group('post')} -> CAR|VEYANCE")
        return m.group(1) + 'CAR' + m.group('open') + 'VEYANCE' + m.group('close')
    html = WORD.sub(sub, html)
    return html, notes


def fix_colour(html: str):
    """Force the wordmark blue to canonical, without touching other CSS."""
    if '.wordmark' not in html and '.cv-brand' not in html:
        return html, None
    marker = '/* canonical wordmark — Carveyance house style */'
    if marker in html:
        return html, None
    sel  = '.wordmark,.cv-brand,.cv-fbrand,.nav-brand,.f-wordmark'
    seln = '.wordmark>span,.cv-brand>span,.cv-fbrand>span,.nav-brand>span,.f-wordmark>span'
    rule = (f'\n{marker}\n'
            f'{sel}{{'
            f'font-family:{CANON_FONT} !important;'
            f'font-size:{CANON_SIZE} !important;'
            f'font-weight:400 !important;'          # Bebas has one weight; stops faux-bold
            f'letter-spacing:{CANON_TRACK} !important;'
            f'line-height:1 !important;'
            f'color:{CANON_WHITE} !important}}\n'
            f'{seln}{{color:{CANON_BLUE} !important}}\n')
    i = html.rfind('</style>')
    if i == -1:
        return html, 'no </style> — skipped colour'
    return (html[:i] + rule + html[i:],
            f'pinned to Bebas Neue / {CANON_SIZE} / {CANON_TRACK} / {CANON_WHITE}+{CANON_BLUE}')


# ---------------------------------------------------------------- report
def audit(html: str):
    """What's wrong with this file, before we touch it."""
    bad = []
    if re.search(r'Bebas\s+Neue', html):
        link = re.search(r'https://fonts\.googleapis\.com/css2\?[^"]+', html)
        if not link or 'family=Bebas+Neue' not in link.group(0):
            bad.append('Bebas Neue NOT loaded -> renders in Impact')
    for m in WORD.finditer(html):
        if (m.group('pre') + m.group('post')).upper() != 'CARVEYANCE':
            continue
        if m.group('pre').upper() != 'CAR':
            bad.append(f"splits at {m.group('pre')}|{m.group('post')} — should break after CAR")
        elif m.group('pre') != 'CAR':
            bad.append(f"reads {m.group('pre')}|{m.group('post')} — normalising case")
    # only the VEYANCE half should be blue; the CAR half being #fff is correct
    for m in re.finditer(r'\.wordmark\s+\.\w+\s*\{[^}]*color:\s*(#[0-9a-fA-F]{3,6})', html):
        if m.group(1).lower() != CANON_BLUE.lower():
            bad.append(f'VEYANCE is {m.group(1)}, not {CANON_BLUE}')
    for m in re.finditer(r'\.(?:wordmark|cv-brand)\s*\{([^}]*)\}', html):
        body = m.group(1)
        sz = re.search(r'font-size:\s*([^;}]+)', body)
        tr = re.search(r'letter-spacing:\s*([^;}]+)', body)
        if sz and sz.group(1).strip() != CANON_SIZE:
            bad.append(f'size {sz.group(1).strip()}, homepage is {CANON_SIZE}')
        if tr and tr.group(1).strip() != CANON_TRACK:
            bad.append(f'tracking {tr.group(1).strip()}, homepage is {CANON_TRACK}')
    blues = set(re.findall(r'--sky\s*:\s*(#[0-9a-fA-F]{3,6})', html))
    off = {b for b in blues if b.lower() != CANON_BLUE.lower()}
    if off:
        bad.append(f'off-brand blue {", ".join(sorted(off))}')
    return bad


def main():
    apply   = '--apply' in sys.argv
    restore = '--restore' in sys.argv
    root    = Path.cwd()

    if restore:
        if not BACKUP.is_dir():
            sys.exit(f'{RED}No backup folder found.{OFF}')
        n = 0
        for src in BACKUP.rglob('index.html'):
            dst = root / src.relative_to(BACKUP)
            shutil.copy2(src, dst); n += 1
        print(f'{GREEN}Restored {n} files from {BACKUP}/{OFF}')
        return

    files = find_articles(root)
    print(f'\n{"CARVEYANCE — WORDMARK REPAIR":^74}')
    print('=' * 74)
    print(f'{"DRY RUN — nothing will be changed" if not apply else "APPLYING CHANGES":^74}')
    print('=' * 74)
    print(f'Found {len(files)} articles\n')

    touched = clean = 0
    for f in files:
        slug = f.parent.name
        html = f.read_text(encoding='utf-8')
        problems = audit(html)

        new = html
        notes = []
        new, n1 = fix_font(new)
        if n1: notes.append(n1)
        new, n2 = fix_split(new)
        notes += n2
        new, n3 = fix_colour(new)
        if n3: notes.append(n3)

        if new == html:
            clean += 1
            print(f'  {DIM}{slug:38s} already correct{OFF}')
            continue

        touched += 1
        print(f'  {YEL}{slug:38s}{OFF}')
        for p in problems:
            print(f'    {RED}found{OFF}  {p}')
        for nt in notes:
            print(f'    {GREEN}fix{OFF}    {nt}')

        if apply:
            b = BACKUP / f.relative_to(root)
            b.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, b)
            f.write_text(new, encoding='utf-8')

    print('\n' + '=' * 74)
    print(f'  {touched} to fix, {clean} already correct')
    if apply:
        print(f'  {GREEN}Written. Backups in {BACKUP}/{OFF}')
        print(f'  Undo with:  python3 fix_wordmark.py --restore')
        print(f'\n  Next: open a few articles in a browser, then commit and push.')
    else:
        print(f'  {YEL}Nothing changed — this was a dry run.{OFF}')
        print(f'  If the above looks right:  python3 fix_wordmark.py --apply')
    print('=' * 74 + '\n')


if __name__ == '__main__':
    main()
