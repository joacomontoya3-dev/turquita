#!/usr/bin/env python3
"""Inline the placeholder clips into a single self-contained index.html.

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

for name, path in (("__LOGO_OLIVE__", "assets/logo/matecoast-olive.png"),
                   ("__LOGO_LIGHT__", "assets/logo/matecoast-light.png")):
    blob = (root / path).read_bytes()
    out = out.replace(name, "data:image/png;base64," + base64.b64encode(blob).decode())
(root / "index.html").write_text(out, encoding="utf-8")

total = sum(v.stat().st_size for v in vids)
print("clips inlined: %s" % ", ".join(sorted(clips)))
print("video %.2f MB -> index.html %.2f MB" % (total/1e6, len(out.encode())/1e6))
