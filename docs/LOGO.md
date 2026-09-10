# El logotipo

**Resuelto.** El vector llegó y ya está en las tres posiciones del diseño.

## Qué llegó

`image-1788997883858 copia.svg` — un SVG real exportado de Adobe Illustrator 30.8.1:
16 paths, cero imágenes incrustadas, 4,7 KB. Escala infinito.

(El primer archivo que probamos era un PNG de 117 × 76 px dentro de una envoltura SVG.
El chequeo para distinguirlos: abrilo con un editor de texto — si dice `<path d="M..."`
es vectorial, si dice `<image ... base64` es un mapa de bits disfrazado.)

## Qué le hice

**Unifiqué los nueve verdes.** El original traía nueve tonos casi idénticos repartidos
entre los paths: `#526340`, `#526642`, `#536643`, `#546542`, `#546543`, `#556543`,
`#556643`, `#566643` y `#566744`. Son indistinguibles a ojo — típico de un logo
dibujado a mano y luego vectorizado.

**Los pasé a `currentColor`.** Esto es lo importante: el archivo ya no lleva el color
adentro, lo hereda de CSS. Eso resuelve de una el problema que te había advertido —
un SVG con el color embebido no se puede recolorear desde el editor de Wix. Ahora un
solo archivo sirve para fondo claro y para fondo oscuro.

**El verde medido coincide.** Yo había estimado `#556643` decodificando el PNG chico.
Ese valor está literalmente entre los fills del vector. La paleta del sistema de diseño
estaba bien.

## Los archivos

En `assets/logo/`:

| Archivo | Cuándo usarlo |
|---|---|
| `matecoast.svg` | **El de la web.** Hereda el color por CSS. Es el que usa el prototipo |
| `matecoast-olive.svg` | Verde fijo `#556643`, para fondos claros. Para Wix y para uso general |
| `matecoast-light.svg` | Claro fijo `#E9EAE6`, para el hero, el footer y las bandas de video |

## Dónde aparece en el diseño

| Posición | Tamaño | Color |
|---|---|---|
| Header | 46 × 30 px | Verde de marca |
| Hero, sobre el video | hasta 440 × 286 px | Claro |
| Cierre del footer | hasta 520 × 338 px | Claro |

El lockup es de dos líneas, así que su proporción es 117:76 — bastante alto. Por eso
en el hero y el footer no ocupa todo el ancho como el de AKILA o AGOLDE, que son de una
sola línea: a ancho completo quedaría desmesurado de alto. A 42 % y 44 % del viewport
manda igual sin comerse la página.

En el prototipo se inyecta como un `<symbol>` una sola vez y las tres posiciones lo
referencian con `<use>`. El `build.py` lo toma de `matecoast.svg` en cada build, así
que si el logo cambia, se reemplaza ese archivo y se corre `python3 build.py`.

## En Wix Studio

`Site → Logo` acepta SVG. Subí `matecoast-olive.svg` y `matecoast-light.svg` al Media
Manager y usá el claro cuando el header esté sobre una sección oscura.

Si algún día querés controlar el color desde el editor en vez de tener dos archivos,
subí `matecoast.svg` — al no llevar color adentro, hereda el que le pongas.
