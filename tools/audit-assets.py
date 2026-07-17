#!/usr/bin/env python3
"""Asset integrity audit: verify every image/video path referenced in code and
the manifest actually exists in the repo. Run from repo root: python3 tools/audit-assets.py"""
import re, sys, json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
missing, checked = [], set()

def check(path_str, source):
    p = path_str.strip()
    if not p or p.startswith(("http", "data:")):
        return
    p = p.lstrip("./")
    if p in checked:
        return
    checked.add(p)
    if not (ROOT / p).exists():
        missing.append(f"{source}: {p}")

# 1. Scan JS/HTML/CSS for asset references
pattern = re.compile(r"""["'(](\.?/?(?:images|icons)/[^"')\s]+)["')]""")
for f in list(ROOT.glob("js/**/*.js")) + [ROOT / "index.html"] + list(ROOT.glob("css/*.css")):
    text = f.read_text(encoding="utf-8")
    for m in pattern.finditer(text):
        check(m.group(1), f.name)

# 2. Manifest icons
manifest = json.loads((ROOT / "manifest.webmanifest").read_text())
for icon in manifest.get("icons", []):
    check(icon["src"], "manifest")
for sc in manifest.get("shortcuts", []):
    for icon in sc.get("icons", []):
        check(icon["src"], "manifest.shortcut")

# 3. SW precache list
sw = (ROOT / "sw.js").read_text()
for m in re.finditer(r'"(\./[^"]+)"', sw):
    check(m.group(1), "sw.js")

print(f"Checked {len(checked)} referenced assets.")
if missing:
    print("MISSING:")
    print("\n".join("  " + m for m in missing))
    sys.exit(1)
print("All referenced assets exist. ✔")
