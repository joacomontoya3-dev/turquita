#!/usr/bin/env python3
"""Genera preview/navbar.html desde los MISMOS css que usa el componente.

No duplica estilos: lee globals.css y Navbar.module.css y los inyecta. Las
clases de CSS Modules se usan acá con su nombre literal, que es válido porque
el preview no pasa por el bundler. Sirve para verificar la geometría de la
spec antes de montar el componente en Next.
"""
import io, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
tokens = (root / "app/globals.css").read_text(encoding="utf-8")
module = (root / "components/Navbar.module.css").read_text(encoding="utf-8")
logo_tsx = (root / "components/Logo.tsx").read_text(encoding="utf-8")

vb = re.search(r'viewBox="([^"]+)"', logo_tsx).group(1)
paths = "\n".join(l for l in logo_tsx.splitlines() if l.strip().startswith("<path"))

html = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Navbar — preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>
:root {{ --font-inter: "Inter"; }}
{tokens}
{module}
body {{ background: var(--color-bg); }}
.ruler {{ height: 320px; background:
  linear-gradient(to right, color-mix(in srgb, var(--color-brand) 8%, transparent) 0 1px, transparent 1px) 0 0 / 8px 100%; }}
</style></head>
<body>
<header class="header">
  <nav class="nav" aria-label="Principal">
    <div class="links">
      <a class="link" href="/collections/all">Shop</a>
      <a class="link" href="/what-is-mate">What is Mate?</a>
      <a class="link" href="/about" aria-current="page">About</a>
    </div>
    <a class="logo" href="/" aria-label="Mate Coast — inicio">
      <svg viewBox="{vb}" fill="currentColor" role="img" aria-label="Mate Coast">
{paths}
      </svg>
    </a>
    <div class="actions">
      <a class="action" href="/search"><span>Search</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" data-icon aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></a>
      <a class="action" href="/cart"><span>Cart <span class="count">(2)</span></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" data-icon aria-hidden="true" focusable="false">
          <path d="M5 8h14l-1.2 11.1A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.9L5 8Z"/>
          <path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg></a>
    </div>
  </nav>
</header>
<div class="ruler"></div>
</body></html>
"""
(root / "preview/navbar.html").write_text(html, encoding="utf-8")
print("preview/navbar.html generado desde los css reales")
