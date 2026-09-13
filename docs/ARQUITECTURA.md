# Arquitectura de información

Independiente del diseño. Sirve para Framer, Webflow, Shopify o para pasársela a
quien diseñe. Es el **qué** y el **por qué** de cada sección; el cómo se ve es otra
discusión.

---

## Mapa del sitio

```
/                     Home
/shop                 Grilla completa
/shop/:categoria      mates · bombillas · termos · yerba · accesorios
/producto/:id         Ficha
/ritual               "What is Mate?" — cebado, etiqueta y curado
/about                Quiénes somos + dónde encontrarnos
carrito               Panel lateral, no página
```

## La navegación son tres ítems

```
Shop            → abre un panel; el click va al listado completo
What is Mate?   → la guía
About           → quiénes somos
```

Y nada más. AKILA tiene tres ítems, AGOLDE dos, Acne cuatro — todos con panel
desplegable. Exponer las seis categorías en la barra es de tienda chica y no escala:
cuando sumen productos, la barra se llena.

El panel de **Shop** tiene tres columnas:

| Columna | Contenido |
|---|---|
| Shop | Las seis categorías **con el contador de productos** al lado, más "All products" |
| New to mate | "Arma tu mate" al shop, y el link a "What is Mate?" |
| Visit | Los dos puntos físicos |

La segunda columna es la que trabaja: el que entra por el menú sin saber qué comprar se
entra por el menú sin saber qué comprar se lleva el recorrido puesto. Y los dos locales
aparecen hasta en el menú, que es el cuarto lugar.

**Comportamiento en escritorio:** el hover (o el foco con teclado) abre el panel; el click
navega al listado completo.

**El logo va centrado sobre el ancho total de la barra**, no sobre el espacio libre entre
los dos bloques. Se resuelve con una grilla de tres columnas `1fr auto 1fr`: las
laterales miden lo mismo pase lo que pase, así que el logo no se mueve cuando el carrito
pasa de vacío a `(1)`. Si en cambio dejás que los bloques midan su contenido, el logo se
corre unos píxeles cada vez que cambia un texto — y se nota.

**En celular la barra cambia de forma.** Tres columnas con el logo centrado no caben en
390 px: el nav se corta y se mete abajo del logo. Debajo de 760 px va
**"Menu" a la izquierda · logo centrado · Search y Cart a la derecha, solo los íconos**,
y el panel pasa a ser el menú completo: las seis categorías, What is Mate?, About, el
"Arma tu mate" y los dos locales. Las palabras "Search" y "Cart" se esconden visualmente
pero siguen en el HTML: con el texto puesto, el bloque derecho mide 155 px, desborda su
columna y corre el logo 28 px del centro. El hover se desactiva por `@media (hover: hover)` — en una pantalla táctil el
`mouseenter` se dispara con el toque y pelea con el link.

**Búsqueda.** Sobre 16 productos no hace falta un motor, pero sí que ordene bien: la
coincidencia en el nombre va antes que la coincidencia en la categoría, y esa antes que
la mención en las especificaciones. Sin eso, buscar "termo" devuelve primero cualquier
producto que lo nombre en las specs en vez del termo. Wix Stores trae buscador nativo; verificá que priorice el
nombre.

Seis categorías: **mates (5) · bombillas (3) · termos (1) · yerba (3) ·
yerberas y canastos (2)**. Catorce productos.

---

## Home, sección por sección

Cada una tiene un trabajo. Si una sección no hace su trabajo, se saca.

| # | Sección | Qué tiene que lograr |
|---|---|---|
| 1 | **Hero** | Que en tres segundos se entienda qué se vende y dónde estás parado. El logo en grande sobre metraje propio, una línea de bajada y dos acciones: "Arma tu mate" al shop / aprender |
| 2 | **Confianza** | Las cuatro razones para creerle a la tienda: retiro en local, mercado los domingos, Apple/Google Pay, envíos a toda Australia |
| 3 | **Reels** | Contenido vertical propio, **cada clip enlazado a un producto**. Es la sección más distintiva y la que ya tiene material filmado. En celular se desliza de costado, no en grilla: una grilla de 2 columnas de 9:16 queda despareja y esconde la mitad |
| 4 | **Más vendidos** | Ocho productos. Entrada rápida al catálogo sin pasar por la grilla |
| 5 | **Arma tu mate** | El bloque de conversión más importante. Las tres decisiones en orden —el mate, la bombilla, la yerba— cada una linkeada a su categoría y con el precio desde el que arranca. No es un producto: es el recorrido |
| 6 | **What is Mate?** | Tres pasos como anticipo de la guía completa. Es lo que convierte al curioso |
| 7 | **Comunidad** | El grupo de WhatsApp. Prueba social que la competencia no tiene |
| 8 | **Visit us** | Los dos puntos físicos, con dirección y horario. Es el resumen; la versión completa vive en `/about` |

**El orden importa**: vender (1–5) antes de educar (6), y educar antes de pedir
pertenencia (7). Un primerizo entra por 1, duda en 2, se engancha en 3 y compra en 5.

---

## About

Es la página donde el diferencial se vuelve creíble. Dos locales físicos, gente real y
un grupo de WhatsApp es exactamente lo que un dropshipper no puede mostrar — pero solo
sirve si está escrito.

| Bloque | Qué tiene que lograr |
|---|---|
| **Apertura** | Video del puesto o del local, con una línea. La que uso: *"We stock it because we drink it."* |
| **How it started** | El origen. Quién, cuándo y por qué. Es el bloque que más pesa y el único que no puedo escribir yo |
| **De dónde viene** | Si traen de Argentina, de qué provincias, si trabajan con artesanos, cómo eligen la yerba. Esto justifica el precio |
| **Productos** | Cuatro productos, para que la página venda y no solo cuente |
| **La comunidad** | El grupo de WhatsApp |
| **Find us** | Los dos locales con dirección y horario, más el envío |

También es un activo de SEO: "mate Gold Coast", "yerba mate Broadbeach" y "donde comprar
mate en Australia" se responden desde acá, no desde una ficha de producto.

---

## Ficha de producto

En este orden:

1. Galería — **video primero**, después fotos
2. Categoría · nombre · precio (con "GST incl.")
3. Descripción corta, dos o tres líneas
4. Variantes de color, si tiene
5. Cantidad + **Añadir** + **Apple Pay / Google Pay**
6. **Disponibilidad de retiro** con la dirección — "En stock, listo en 2 horas"
7. Tabla de especificaciones, **las mismas filas en todo el catálogo**
8. Acordeones: cómo curar · envíos y retiro · devoluciones
9. Completá el set — cross-sell de otra categoría

Lo que casi nadie hace y acá conviene: **el retiro y el pago express arriba del pliegue**,
antes de las specs. Y la tabla de specs con filas idénticas en todos los productos: si
unos la tienen y otros no, la grilla se ve descuidada.

---

## Decisiones de negocio

Esto es lo que sobrevive a cualquier rediseño. No son decisiones estéticas.

**1. Sin descuento permanente.** Hoy todo el catálogo está tachado al doble. No se lo
cree nadie, entrena a no pagar precio lleno, y en Australia puede caer en publicidad
engañosa. Sin kits no hay un ahorro real que mostrar, y uno inventado es peor que
ninguno: el valor pasa a ser el consejo y el local, no el descuento.

**2. Nada de productos que la marca no tiene.** El prototipo vende exactamente lo que
vende Mate Coast. Un kit armado sería buena idea, pero es una decisión de ellos.

**3. Un termo, cuatro colores.** Hoy son cuatro productos que diluyen la grilla y
reparten reseñas y SEO. Un producto con opción de color, y las muestras visibles en la
ficha de la grilla.

**4. Camino para el primerizo.** Alguien que nunca tomó mate necesita tres productos que
funcionen juntos y no tiene cómo saberlo. El recorrido **"Arma tu mate"** —el que ya
usan— hecho explícito en el hero y en un bloque propio, y la guía como página real,
enlazada desde el hero y desde cada ficha.

**5. Los locales, arriba.** Mercado en Surfers y local en Broadbeach es lo más valioso
que tiene y hoy está enterrado en el footer. Va tres veces: barra superior, fila de
confianza, y disponibilidad de retiro en cada ficha.

**6. Inglés de base, español como vocabulario.** *Bombilla*, *yerba*, *cebador*,
*montañita*, *mate del zonzo* no se traducen: se explican una vez y se usan. Eso da
autoridad. Mezclar los dos idiomas en la misma página, como está hoy, no.

**7. Nada de pop-up de moneda.** Una tienda de la Gold Coast cobra en AUD.

---

## Contenido que ya está escrito

En `CONTENT.md`: los 16 productos con precios (marcados cuáles son reales y cuáles
propuse), descripciones, tablas de specs y los textos de las secciones principales.

En `VIDEO.md`: los seis pasos del cebado y las cinco reglas de etiqueta, redactados.
Es contenido original y listo para usar, sea cual sea la herramienta.

En `DRIVE-INVENTARIO.md`: los 78 videos y 54 fotos del Drive, con el mapeo de qué
archivo va en cada hueco.
