# El logotipo

El logo aparece en tres lugares del diseño, y en dos de ellos es el elemento más grande
de la pantalla:

| Dónde | Tamaño aproximado | Qué necesita |
|---|---|---|
| Header | 14 px de alto | Cualquier formato sirve |
| Hero, sobre el video | ~200 px de alto en desktop | Vector o PNG grande |
| Cierre del footer | hasta ~210 px de alto | Vector o PNG grande |

En el prototipo esos tres lugares están rellenados con **texto en Archivo**, que no es el
logo — es un sustituto para que se vea la composición. Los tres tienen un comentario
`LOGO SLOT` en `src/index.template.html` que marca exactamente dónde va el archivo real.

## Qué pedirle a quien lo diseñó

En orden de preferencia:

1. **SVG.** Es lo ideal: escala infinito, pesa nada, y Wix lo acepta para el logo del
   sitio. Si el logo se hizo en Illustrator, es `Archivo → Exportar → SVG`.
2. **PDF o AI**, y de ahí sale el SVG.
3. **PNG con fondo transparente, mínimo 2000 px de ancho.** Alcanza para todos los
   tamaños del diseño, aunque pesa más que el SVG.

Lo que **no** alcanza es el PNG chico que circula hoy (~120 px de ancho). A 200 px de
alto en el hero se ve pixelado, y ese es el primer elemento que ve el visitante.

## Dos versiones, no una

Hacen falta dos archivos:

- **Verde** `#5A6E3E` (o el valor exacto del manual, si aparece) — para fondos claros.
- **Blanco o crema** `#E9EAE6` — para el hero, el footer y cualquier banda de video.

Un solo archivo verde no sirve para el hero: sobre el video oscuro casi no se lee.

## En Wix Studio

`Site → Logo` acepta SVG. Subí las dos versiones al Media Manager y usá la clara en el
header cuando esté sobre una sección oscura.

Ojo con un detalle de Wix: si subís un SVG con el color embebido en el archivo, no lo
podés recolorear desde el editor. Por eso conviene tener los dos archivos exportados
desde el principio en vez de intentar cambiarle el color después.

## El verde

Del PNG saqué aproximadamente `#5A6E3E` y ese es el valor que usa todo el sistema de
diseño. **Si el manual de marca tiene el valor oficial, ese manda** — cambialo en el
bloque `:root` de `src/index.template.html` y en `Site Colours` de Wix, y el resto del
sitio se acomoda solo, porque todo lo verde sale de esa variable.
