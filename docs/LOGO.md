# El logotipo

**Resuelto con el archivo oficial.**

## Qué hay en `assets/logo/`

| Archivo | Cuándo usarlo |
|---|---|
| `matecoast.svg` | **El de la web.** Hereda el color por CSS. Es el que usa el prototipo |
| `matecoast-olive.svg` | Verde fijo `#546742`, para fondos claros. Para subir a Wix |
| `matecoast-light.svg` | Claro fijo `#F5F5F4`, para el hero, el footer y las bandas de video |

Los tres salen del archivo oficial de marca, con el fondo quitado y el `viewBox` recortado
al dibujo.

## El camino hasta acá (tres archivos)

**1. Un PNG de 117 × 76 px dentro de una envoltura SVG.** Una sola etiqueta `<image>` con
la imagen incrustada en base64, cero paths. Escalaba igual de mal que el PNG.

> **Cómo distinguirlos:** abrí el `.svg` con un editor de texto. Si dice `<path d="M..."`
> es vectorial. Si dice `<image ... base64`, es un mapa de bits disfrazado. Pasa seguido:
> Canva y varios exportadores online "guardan como SVG" envolviendo el bitmap.

**2. Un vector trazado a mano.** 16 paths, curvas temblorosas, peso de trazo irregular y
el lockup más abierto (proporción 1.539). Servía, y con eso estuvo el prototipo un rato.

**3. El archivo oficial.** 9 paths, exportado de Illustrator, en cuatro tratamientos de
color sobre un lienzo de 1080 × 1440. Curvas limpias, peso uniforme, y el lockup más
ajustado: "COAST" se mete mejor abajo de "MATE". Proporción **1.168**.

Los cuatro archivos que vinieron son el **mismo dibujo** en distintos colores, no
distintas versiones del lockup:

| Archivo | Tratamiento |
|---|---|
| `-01` | Blanco sobre blanco — la versión calada, para fondos oscuros |
| `-02` | Negro |
| `-03` | Verde `#546742` — **de acá salió el color oficial** |
| `-04` | Gris |

**No hay versión horizontal.** Eso importa: el cierre de footer a todo el ancho, estilo
AKILA, sigue sin poder hacerse — un lockup de dos líneas a 1400 px de ancho mediría
1200 px de alto. Si alguna vez piden una versión de una línea, eso se desbloquea.

## El verde

**`#546742`**, tomado del archivo oficial. Antes usaba `#556643`, medido decodificando el
PNG chico: la diferencia es de una unidad por canal, imperceptible, pero el oficial manda.

Si el manual de marca trae otro valor, cambialo en el bloque `:root` de
`src/index.template.html` y en Site Colours de Wix: todo lo verde sale de esa variable.

## Qué le hice al archivo

**Quité el fondo.** Los cuatro traen un `<rect>` blanco de 1080 × 1440 que tapaba todo.

**Recorté el `viewBox`.** El dibujo real ocupa 814 × 697 dentro de ese lienzo, con mucho
aire alrededor. Sin recortar, el logo se dibujaba chico y descentrado en su caja. Medí el
bounding box con `getBBox()` en el navegador, no a ojo.

**Unifiqué el color a `currentColor`.** Un solo archivo sirve para fondo claro y oscuro, y
además se puede recolorear desde el editor de Wix — un SVG con el color embebido no.

## Dónde aparece

| Posición | Tamaño |
|---|---|
| Header | 35 × 30 px |
| Hero, sobre el video | hasta 350 × 300 px |
| Cierre del footer | hasta 400 × 343 px |

El `build.py` lee el `viewBox` y la proporción del propio `matecoast.svg` y los inyecta en
las dos páginas. Si mañana llega otra versión del logo, se reemplaza ese archivo, se corre
`python3 build.py` y los tamaños se recalculan solos — no hay proporciones escritas a mano
en el CSS.

## En Wix Studio

`Site → Logo` acepta SVG. Subí `matecoast-olive.svg` y `matecoast-light.svg` al Media
Manager, y usá el claro cuando el header esté sobre una sección oscura. Si preferís
controlar el color desde el editor, subí `matecoast.svg`, que no lleva color adentro.
