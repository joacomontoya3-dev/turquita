#!/usr/bin/env python3
"""Inline the clips and the logo vector into a self-contained index.html.

The template in src/ stays readable — no base64 in version-controlled source.
Run after changing src/index.template.html or assets/video/*.webm:

    python3 build.py
"""
import base64, json, pathlib, sys

root = pathlib.Path(__file__).parent
tpl  = (root / "src/index.template.html").read_text(encoding="utf-8")
vids = sorted((root / "assets/video").glob("*.webm"))
if not vids:
    sys.exit("no clips found in assets/video/")

clips = {
    v.stem: "data:video/webm;base64," + base64.b64encode(v.read_bytes()).decode()
    for v in vids
}
token = "/*__CLIPS__*/ {}"
if token not in tpl:
    sys.exit("template is missing the %s token" % token)

out = tpl.replace(token, json.dumps(clips))

logo = (root / "assets/logo/matecoast.svg").read_text(encoding="utf-8")
inner = logo[logo.index(">", logo.index("<svg")) + 1 : logo.rindex("</svg>")].strip()
if "__LOGO_PATHS__" not in out:
    sys.exit("template is missing the __LOGO_PATHS__ token")
out = out.replace("__LOGO_PATHS__", inner)

(root / "index.html").write_text(out, encoding="utf-8")

# the motion study shares the same clips and logo
motion = (root / "src/motion.template.html").read_text(encoding="utf-8")
motion = motion.replace(token, json.dumps(clips)).replace("__LOGO_PATHS__", inner)
(root / "motion.html").write_text(motion, encoding="utf-8")

total = sum(v.stat().st_size for v in vids)
print("clips inlined: %s" % ", ".join(sorted(clips)))
print("video %.2f MB -> index.html %.2f MB, motion.html %.2f MB"
      % (total/1e6, len(out.encode())/1e6, len(motion.encode())/1e6))
