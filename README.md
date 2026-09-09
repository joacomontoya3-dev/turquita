# Mate Coast — rediseño

Prototipo navegable del rediseño de [matecoast.com](https://www.matecoast.com),
pensado como **especificación para reconstruirlo en Wix Studio** (plan Core), no como
sitio a desplegar.

**Ver online:** https://claude.ai/code/artifact/bdb0b5cb-0d4e-4221-b6a9-7ff7b91387a4

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `index.html` | El prototipo completo. Un solo archivo, sin build, sin dependencias. Se abre con doble clic. |
| `docs/AUDITORIA.md` | Los 9 problemas del sitio actual, ordenados por impacto sobre la venta |
| `docs/WIX-STUDIO-HANDOFF.md` | Paso a paso para reconstruirlo en Wix: tokens, fuentes, CSS, y qué elemento nativo es cada cosa |
| `docs/CONTENT.md` | Catálogo (qué es real y qué propuse), receta de fotografía, decisión de idioma, textos |

## Vistas del prototipo

Navegación por hash, así que funciona abriendo el archivo directo:

- `#/` — Home
- `#/shop` — Grilla completa, con filtros por categoría
- `#/product/starter-kit` — Ficha de producto (probá también `termo-1l`, tiene variantes de color)
- `#/ritual` — Guía de cebado y etiqueta
- `#/system` — Design system: colores, escala tipográfica y la tabla de mapeo a Wix

El carrito funciona de verdad (se guarda en `localStorage`), incluida la barra de
progreso de envío gratis.

## Sistema de diseño

- **Fondo** `#E7E9E4` · **Tinta** `#16190F` · **Marca** `#5A6E3E` · **Acento** `#B7D14A`
- **Archivo** (display) · **Instrument Sans** (texto) · **DM Mono** (datos y rótulos)
- Radio 2px, cero sombras, filetes de 1px

Todos los valores están en el bloque `:root` de `index.html` y en la vista `#/system`.

## Importante

Las ilustraciones de producto son **placeholders**: cada una marca un hueco de
fotografía. La receta de foto que las reemplaza está en `docs/CONTENT.md`.
