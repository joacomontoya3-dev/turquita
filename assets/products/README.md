# Fotos de producto recortadas

Acá van los mates (y todo lo demás) en PNG con fondo transparente. Es lo que
usa el carrusel de la home: la pieza flota sobre el degradado, sin caja ni
recuadro.

## El nombre del archivo es el id del producto

```
assets/products/mate-san-juan.png
assets/products/termo-1l.png
assets/products/bombilla-alpaca.png
```

Los ids están en `src/index.template.html`, en el array `P` (`{id:'mate-san-juan', …}`).
Si el nombre no coincide con un id, el archivo se ignora en silencio.

Después de agregar archivos:

```
python3 build.py
```

Los que todavía no estén siguen mostrando la ilustración vectorial, así que
podés ir cargándolos de a uno sin que el prototipo quede con huecos.

## Cómo exportarlas

- **PNG-24 con canal alfa** (o WebP con alfa, también sirve). Nada de fondo
  blanco ni de JPG: el recorte es el punto.
- **Mismo lienzo para todos**, cuadrado, 1200 × 1200 px. Esto es lo que más
  importa y es lo más fácil de arruinar.
- **La escala real, no "que llene el cuadro".** Si exportás cada producto
  ocupando todo su lienzo, la bombilla de 18 cm va a verse del mismo tamaño
  que el termo de un litro y el carrusel pierde toda la verosimilitud. Elegí
  la pieza más grande del catálogo (el termo), hacé que llene cómodamente su
  lienzo, y escalá el resto **contra esa referencia**. Un mate ocupa como la
  mitad; una bombilla, una franja finita y alta.
- **Centrado** en el lienzo, con aire a los cuatro lados.
- **Sin sombra propia.** La sombra la pone el CSS (`drop-shadow`), y se calcula
  sobre el recorte. Si la traés quemada en el PNG, se duplica.
- Recorte prolijo en los bordes finos — la bombilla y la bombilla de pico son
  las que más sufren un recorte automático. Vale repasarlas a mano.

## La luz

El degradado del tile tiene el foco de luz arriba al centro. Si las fotos
vienen iluminadas desde arriba, encajan solas. Si vienen con luz lateral dura,
se nota que están pegadas.

Lo ideal: fondo plano, luz difusa desde arriba y un poco de frente, la misma
receta para todo el catálogo. Está desarrollado en `docs/CONTENT.md`.

## El color del tile

Cada producto cae en un degradado según su categoría (`TINT_BY_CAT` en el
template). Si querés forzar uno distinto para un producto, agregale
`tint:'sea'` a su entrada en `P`. Los disponibles: `sand`, `olive`, `sea`,
`clay`, `stone`, `deep`.
