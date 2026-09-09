# Mate Coast — rediseño

Prototipo navegable del rediseño de [matecoast.com](https://www.matecoast.com),
pensado como **especificación para reconstruirlo en Wix Studio** (plan Core), no como
sitio a desplegar.

**Ver online:** https://claude.ai/code/artifact/bdb0b5cb-0d4e-4221-b6a9-7ff7b91387a4

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `index.html` | El prototipo completo, autocontenido (clips incluidos). Se abre con doble clic. **Generado — no lo edites a mano.** |
| `src/index.template.html` | La fuente real. Acá se edita. |
| `assets/video/*.webm` | Clips de placeholder |
| `build.py` | Mete los clips dentro de `index.html`. Corrélo después de tocar el template o los videos. |
| `docs/REFERENCIAS.md` | Qué tomé de AKILA, AGOLDE y Acne Studios, y qué decidí no copiar |
| `docs/AUDITORIA.md` | Los 9 problemas del sitio actual, ordenados por impacto sobre la venta |
| `docs/VIDEO.md` | Lista de tomas, especificaciones de export y cómo montar video en Wix |
| `docs/WIX-STUDIO-HANDOFF.md` | Paso a paso para reconstruirlo en Wix: tokens, fuentes, CSS, y qué elemento nativo es cada cosa |
| `docs/CONTENT.md` | Catálogo (qué es real y qué propuse), receta de fotografía, decisión de idioma, textos |

```
python3 build.py
```

## Vistas del prototipo

Navegación por hash, así que funciona abriendo el archivo directo:

- `#/` — Home
- `#/shop` — Grilla completa, con filtros por categoría
- `#/product/starter-kit` — Ficha de producto (probá también `termo-1l`, tiene variantes de color)
- `#/ritual` — Guía de cebado y etiqueta
- `#/system` — Design system: colores, el scrim, especificación de video, tipografía y la tabla de mapeo a Wix

El carrito funciona de verdad (se guarda en `localStorage`), incluida la barra de
progreso de envío gratis.

## Sistema de diseño

- **Fondo** `#E7E9E4` · **Tinta** `#16190F` · **Marca** `#5A6E3E` · **Acento** `#B7D14A`
- **Archivo** (display) · **Instrument Sans** (texto) · **DM Mono** (datos y rótulos)
- Radio 2px, cero sombras, filetes de 1px

Todos los valores están en el bloque `:root` de `index.html` y en la vista `#/system`.

## El video

El diseño está construido alrededor del video propio, que es el activo diferencial de
la marca: hero a sangre, carrusel de reels verticales, un clip por paso de la guía de
cebado, y video en la ficha de producto.

Los clips que trae son **placeholders generados** — sirven para ver el ritmo y la
legibilidad, no son metraje. Cada uno lleva encima su brief de producción; el botón
**"Shot notes"** del header los muestra y los oculta. Con las notas apagadas ves el
sitio como lo va a ver un cliente.

La lista de tomas y las especificaciones de export están en `docs/VIDEO.md`.

## Importante

Las ilustraciones de producto son **placeholders**: cada una marca un hueco de
fotografía. La receta de foto está en `docs/CONTENT.md`.
