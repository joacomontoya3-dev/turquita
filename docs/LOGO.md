# El logotipo

## El archivo que llegó no es vectorial

El `.svg` que me pasaste **no tiene vectores adentro**. Es un PNG de **117 × 76 píxeles**
metido dentro de una envoltura SVG:

```xml
<svg viewBox="0 0 117 76">
  <image width="117" height="76" xlink:href="data:image/png;base64,iVBORw0KGgo..."/>
</svg>
```

Un SVG de verdad tiene etiquetas `<path>` con coordenadas. Éste tiene una sola etiqueta
`<image>` con una imagen incrustada. Escala exactamente igual de mal que el PNG original
— la extensión `.svg` no lo convierte en vector.

Pasa seguido: algunos exportadores "guardan como SVG" envolviendo el mapa de bits, y
Canva y varias herramientas online hacen justo esto.

### Cómo verificarlo vos mismo

Abrí el archivo con cualquier editor de texto (Bloc de notas sirve):

- Si ves `<path d="M12.4 8.1c..."` → **es vectorial**, sirve.
- Si ves `<image ... base64` → **es un mapa de bits disfrazado**, no sirve para escalar.

Con ese chequeo evitás la vuelta entera la próxima vez.

## Qué hay que conseguir

El archivo original de quien diseñó el logo: **`.ai`, `.eps`, `.pdf` vectorial o un SVG
con paths**. De cualquiera de esos sale el SVG bueno en un paso.

Si el original se perdió, la alternativa es **redibujarlo**. Se puede vectorizar el PNG
automáticamente, pero a 117 píxeles de ancho el trazado sale con los bordes irregulares
y en un logotipo se nota: las letras tienen curvas gruesas y limpias que a esa resolución
no están. Decime y lo intento, pero el original siempre va a ser mejor.

## Qué se pudo hacer igual

**El verde real de la marca es `#556643`.** Lo medí sobre los píxeles opacos del archivo
(2153 píxeles, el tono dominante y el promedio ponderado coinciden). Yo venía usando
`#5A6E3E`, estimado a ojo del thumbnail: era un poco más claro y más amarillo. Ya está
corregido en todo el sistema de diseño.

**El logo real ya está en el header** del prototipo. Ahí se dibuja a 52 × 34 px, o sea
una reducción del original — se ve nítido. Es el único lugar del diseño donde el archivo
actual alcanza.

**Las dos versiones están exportadas** en `assets/logo/`:

| Archivo | Para qué |
|---|---|
| `matecoast-olive.png` | Fondos claros. `#556643`, fondo transparente |
| `matecoast-light.png` | Hero, footer y bandas de video. `#E9EAE6`, fondo transparente |
| `matecoast-AS-RECEIVED.svg` | El archivo original, como llegó |

La versión clara la generé recoloreando píxel por píxel y respetando el canal alfa, así
que los bordes suavizados quedaron intactos. Las dos siguen siendo de 117 × 76: sirven
para el header y para el ícono del navegador, no para el hero.

## Lo que sigue faltando

El hero dibuja el logotipo a unos **200 px de alto** y el cierre del footer todavía más.
Con 76 px de alto de origen, ampliarlo casi tres veces se ve borroso — y es el primer
elemento que ve el visitante.

Esos dos lugares siguen con el sustituto tipográfico en Archivo, marcados con un
comentario `LOGO SLOT` en `src/index.template.html`. Cuando llegue el vector, es cambiar
esas dos líneas por `<img class="wordmark-img" src="...">` y listo.

## En Wix Studio

`Site → Logo` acepta SVG. Subí las dos versiones al Media Manager y usá la clara cuando
el header esté sobre una sección oscura.

Un detalle: si el SVG trae el color adentro del archivo, **no lo podés recolorear desde
el editor de Wix**. Por eso conviene tener los dos archivos exportados desde el principio.
