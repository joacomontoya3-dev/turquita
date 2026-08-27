# Rendimiento de inversiones — canvas de diseño

Cuatro maneras de organizar un gráfico de líneas del rendimiento de una cartera
a lo largo del tiempo. Las cuatro comparten datos y sistema visual; lo que cambia
es cómo se estructuran los datos.

| Artboard | Opción | Organización |
|---|---|---|
| `Main.dc.html`    | A · Vista agregada     | Valor total frente a capital aportado; el área entre ambas líneas es la plusvalía |
| `OpcionB.dc.html` | B · Comparativa        | Cada activo indexado a base 100, más un índice de referencia |
| `OpcionC.dc.html` | C · Vista desglosada   | Múltiplos pequeños: un panel por activo, escala vertical común |
| `OpcionD.dc.html` | D · Dos medidas        | Valor acumulado y variación mensual en paneles apilados sobre un eje de tiempo |

## Regenerar

Los `.dc.html` son **generados**: edita `gen.mjs`, no los artboards.

```sh
node fonts.mjs   # solo si hace falta rebajar/actualizar la fuente incrustada
node gen.mjs     # reescribe los cuatro .dc.html
```

Después vuelve a sembrar el canvas con el helper de la skill `design`
(`seed-canvas.mjs --template payload.template.html`), pasando los cuatro
artboards y `canvas.json`, y republica `rendimiento-inversiones.html`.

## Notas

- **Los datos son sintéticos.** `gen.mjs` genera 36 meses (sep 2023 → ago 2026)
  con ruido determinista y reescala los log-retornos para que cada activo aterrice
  en un resultado objetivo, de modo que las cuatro opciones sean comparables.
- **La fuente va incrustada** como `@font-face` con data URI (`fonts.css`, subconjunto
  latino de IBM Plex Sans). Un `<link>` a Google Fonts bloquea el render del artboard
  y además no se incrusta en las exportaciones a PNG/PDF.
- La paleta de series sale de la skill `dataviz` y está validada para daltonismo;
  el aviso de contraste bajo (amarillo y verde) queda cubierto porque toda serie
  lleva etiqueta visible.
