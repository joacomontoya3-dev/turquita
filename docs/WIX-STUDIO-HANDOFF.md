# Cómo pasar esto a Wix Studio

Escrito para el plan **Core**. Nada de acá necesita código embebido salvo donde se
aclara. Esa es una decisión deliberada: todo lo que se mete como Embed HTML queda
dentro de un `<iframe>`, no lo puede editar tu amigo después, y Google no lo indexa.

---

## Orden de trabajo

No armes página por página. Armá el sistema primero y las páginas salen solas.

1. Colores del sitio
2. Fuentes
3. Temas de texto, espaciado y el header
4. Custom CSS
5. Catálogo en Wix Stores
6. Video (ver `VIDEO.md` — es la mitad del diseño)
7. Páginas

Si hacés los pasos 1 a 4 primero, la página 7 tarda una tarde. Si empezás por la 6,
vas a estar retocando tamaños de fuente a mano para siempre.

---

## 1. Colores del sitio

`Site Design → Colours → Edit palette`. Wix te da 5 colores principales con 5
variaciones cada uno. Cargá estos en los slots principales:

| Slot | Hex | Para qué |
|---|---|---|
| Color 1 | `#FFFFFF` | Fondo de toda la página |
| Color 2 | `#F1F1F0` | Tile de producto |
| Color 3 | `#111110` | Tinta / texto principal |
| Color 4 | `#111110` | Banda oscura y botones primarios |
| Color 5 | `#546742` | Verde de marca (el del logo) |

Y estos como colores adicionales:

| Hex | Para qué |
|---|---|
| `#E3E3E1` | Filetes de 1px |
| `#6B6B68` | Texto secundario |

| `#B7D14A` | Acento yerba |

**La única regla importante:** `#B7D14A` es el único color saturado del sitio y
**nunca lleva texto sobre fondo claro** — no contrasta. Es para barras de progreso,
puntitos de stock, etiquetas de oferta y links dentro de la banda oscura. Si empieza
a aparecer en botones y títulos, el diseño se cae.

## 2. Fuentes

`Site Design → Fonts → Upload fonts`. El plan Core permite subir fuentes propias.

| Rol | Fuente | Dónde conseguirla |
|---|---|---|
| Todo el sitio | **Inter** (variable) | fonts.google.com/specimen/Inter → descargar → subir el `.woff2`. Es la única fuente del proyecto |

Si Wix te rechaza el variable, subí las estáticas en 400, 500, 600 y 700.

**Es la única fuente del sitio.** Las referencias usan una sola familia y por eso se ven
ordenadas; no agregues una segunda. En particular **nada de monoespaciada**: ninguna de
las referencias que mandaste la usa y es lo que más delataba el prototipo viejo.

## 3. Temas de texto

`Site Design → Text themes`. Definilos una vez y usá siempre estos, nunca tamaños sueltos.
Los tamaños son los del desktop de 1440; abajo de eso el prototipo los baja con `clamp()`
y en Wix alcanza con poner el valor chico en el breakpoint de mobile.

| Tema | Fuente | Tamaño / interlineado | Detalle |
|---|---|---|---|
| H1 | Inter 600 | 60 / 66 | tracking −0.02em. Mobile: 32 / 35 |
| H2 | Inter 600 | 40 / 48 | Mobile: 26 / 31 |
| H3 | Inter 600 | 28 / 36 | Mobile: 22 / 28 |
| H4 | Inter 500 | 22 / 30 | títulos de bloque y de ficha |
| Body L | Inter 400 | 18 / 28 | bajadas y párrafos de apertura |
| Body | Inter 400 | 16 / 24 | texto corrido |
| Small | Inter 400 | 14 / 20 | color `#6B6B68` |
| Nav | Inter 500 | 15 / 22 | tracking +0.3px, caja de oración (no mayúsculas) |
| Micro / Label | Inter 500 | 12 px | MAYÚSCULAS, tracking 0.08em, color `#6B6B68` |

El tema **Nav** es el que ordena la barra de arriba: 15/22 en Medium, caja de oración y
sin caja de botón. Es el mismo valor que usan AKILA y A.P.C., y es lo que hace que el
header no compita con el título de la página.

## 3b. Espaciado

Una sola escala, múltiplos de 8, cargada como espacios del sitio:

| Token | px | Para qué |
|---|---|---|
| 1 | 8 | texto ↔ ícono, ítems de una lista |
| 2 | 16 | separación interna de un bloque |
| 3 | 20 | alto del header (arriba y abajo), gap entre acciones |
| 4 | 24 | gap de grilla |
| 6 | 48 | separación entre bloques de una sección |

- **Margen de página:** 64 px en desktop, 20 px en mobile (fluido en el medio).
- **Ancho del contenedor:** 1280 px máximo.
- **Separación entre secciones:** 80 a 120 px (el prototipo usa `clamp(48px, 7vw, 96px)`).

## 3c. El header, medida por medida

Es la pieza más fácil de arruinar en Wix porque el editor te tienta a poner tres cajas
sueltas. Armalo como **una sola grilla de tres columnas** (`1fr auto 1fr`):

| Qué | Valor |
|---|---|
| Alto | 20 px arriba + 20 px abajo sobre el contenido |
| Columnas | izquierda `1fr`, logo `auto`, derecha `1fr` |
| Links | Shop · What is Mate? · About, gap 40 px |
| Caja del link | padding 8 px arriba/abajo, 0 a los costados (el link mide lo que mide su texto) |
| Logo | 42 px de alto, ilustrado a dos líneas, verde `#546742` |
| Bloque derecho | Search y Cart, gap 20 px entre ellos |
| Texto + ícono | gap 8 px, en línea |
| Íconos | 20 × 20, trazo 1.5, la misma familia los dos |
| Fondo | blanco al 82 % con `backdrop-filter: blur(16px)`, filete de 1px abajo |

**Lo que hace que se vea bien:** el logo está centrado sobre el ancho **total** de la
barra, no sobre el espacio que sobra entre los dos bloques. Por eso las columnas
laterales son `1fr` y no `auto`. Si lo centrás sobre el hueco, el logo se corre cada vez
que cambia el texto de la derecha (por ejemplo cuando el carrito pasa de vacío a `(1)`).

Abajo de 760 px: hamburguesa a la izquierda, logo al centro, **solo los íconos** a la
derecha. Las palabras "Search" y "Cart" no entran en 390 px sin correr el logo del
centro; se esconden visualmente pero siguen en el HTML para los lectores de pantalla.

## 3d. El hero, medida por medida

Desktop (1440). Alto 700–800 px, video a `object-fit: cover`, clip activado.

| Qué | Valor |
|---|---|
| Alto | 763 px a 1440 (`clamp(520px, 53vw, 768px)`) |
| Scrim | Rectángulo a sangre, degradado lineal de arriba abajo: 0 % transparente → 50 % negro 18 % → 100 % negro 66 % |
| Bloque de texto | Abajo a la izquierda, alineado al margen del nav, centrado en el tercio inferior |
| H1 | 60 / 66, Bold, blanco 100 %, `max-width` 620 px para que rompa en tres líneas |
| Subtítulo | 17 / 25, blanco 78 %; "¿QUIÉN CEBA?" en Semibold blanco 100 % |
| Gap H1 → subtítulo | 16 px |
| Gap subtítulo → botones | 30 px |
| Gap entre botones | 16 px |
| Botones | Pastilla, padding 30 / 15. Primario: relleno blanco, texto verde `#546742`. Secundario: filete blanco 1 px, fondo transparente |

**El scrim no es decoración.** Va a sangre y de arriba hacia abajo justamente para
que el texto se lea sin importar qué fotograma del video esté pasando. Si se hace
con el slider de opacidad del Video Box en vez de con un rectángulo con degradado
encima, se oscurece el clip entero y se pierde el metraje.

**Los dos botones son el mismo componente.** Mismo padding, misma altura, misma
tipografía; sólo cambia la variante de color. En Wix: hacé uno, duplicalo y cambiale
el fill — no los armes por separado o van a divergir en el primer retoque.

> **Ojo con el radio.** El resto del sitio es radio 0 (ver §4). El hero pide
> pastilla. Hoy conviven, y hay que resolverlo: o los botones son pastilla en todo
> el sitio, o el hero va cuadrado. Mezclado no.

## 4. Custom CSS

`Dev Mode → Custom CSS`. Acá va lo que Wix no te deja controlar desde el panel:

```css
:root{
  --ground:#FFFFFF; --tile:#F1F1F0; --band:#111110;
  --ink:#111110; --ink-2:#6B6B68; --line:#E3E3E1;
  --olive:#546742;
}
/* Cero esquinas redondeadas y cero sombras: el look es de filete, no de tarjeta */
[data-testid="container"], .product-card, button, img{ border-radius:0 !important; box-shadow:none !important; }

/* Grilla de producto: filete en vez de sombra */
.product-item{ border:0; }
.product-item img{ background:var(--tile); }

/* Números alineados en columna en precios y specs */
.price, .spec-value{ font-variant-numeric:tabular-nums; }

/* Header: el logo centrado sobre el ancho total, no sobre el hueco */
header .header-grid{ display:grid; grid-template-columns:1fr auto 1fr; align-items:center; }
```

Los selectores exactos cambian según los elementos que uses, así que inspeccioná con
el navegador antes de escribirlos. La idea es la que importa: **radio 0, cero sombras,
filetes de 1px, números tabulares, logo centrado por grilla.**

---

## 5. El catálogo en Wix Stores

Tres cambios de estructura antes de cargar nada:

**a) Un termo, cuatro colores.** Hoy son cuatro productos. En el dashboard:
`Products → Termo Mate Coast 1L → Product Options → Add option → Colour`, con Black,
Forest, White y Pink. Manejás stock por variante. Recuperás tres lugares de grilla y
concentrás las reseñas y el SEO en una sola ficha.

**b) Nada de kits inventados.** El catálogo son las cinco categorías reales: mates,
bombillas, termos, yerba, yerberas y canastos. El recorrido para el primerizo no es un
producto: es el bloque **"Arma tu mate"**, tres links a categoría con el precio mínimo
de cada una. En Wix se arma con un container y tres links comunes — no toca Stores.

Si más adelante deciden vender un kit de verdad, ahí sí va como producto normal con su
propio stock, nunca como cupón: querés que aparezca en la grilla y que se pueda
promocionar.

**c) Info Sections consistentes.** `Products → [producto] → Additional Info`. Definí
las mismas filas para todo el catálogo y llenalas siempre: Material, Capacidad,
Requiere curado, Lavavajillas, etc. Eso es lo que alimenta la tabla de specs. Si
algunas fichas la tienen y otras no, la grilla se ve descuidada.

## 6. Qué elemento de Wix es cada cosa

| En el prototipo | En Wix Studio |
|---|---|
| Barra de anuncios | Announcement Bar nativa. El movimiento necesita un Custom Element — si complica, sacá el movimiento, es decoración |
| Header fijo | Header nativo en modo Sticky. Armá el contenido como una grilla `1fr auto 1fr` (ver §3c) |
| Hero de video a sangre | Section con Video Box a pantalla completa, Loop + Mute + Play automático, y el texto encima con el degradado |
| Fila de confianza | Repeater de 4 celdas, o 4 containers en grid |
| Riel de categorías | Repeater horizontal o Slideshow, atado a las categorías de Stores |
| Grilla de productos | Product Gallery de Wix Stores. Activá "Show second image on hover" |
| Chips de filtro | Product Filter de Wix Stores, restilado. No lo armes a mano |
| Muestras de color en la ficha | Product Options → Colour |
| Apple Pay / Google Pay | `Settings → Accept Payments → Express checkout`. Aparecen solos en ficha y carrito |
| "In stock — Broadbeach" | `Settings → Shipping & Fulfilment → Pickup`, más el campo de inventario |
| Carrito lateral + barra de envío gratis | Side Cart nativo. La barra es el ajuste "Free shipping goal" |
| Tabla de specs | Product Info Sections |
| Acordeones | Accordion de Wix Studio |
| Página "What is Mate?" | Página normal con un Video Box por paso. **No la pongas en un embed** — es tu mejor contenido para Google |
| Hero a sangre | Sección con fondo de video, o Video Box del tamaño de la sección. Loop + Mute + Play automático |
| Degradado sobre el video | Color Overlay sobre el Video Box con el degradado — **no** el slider de opacidad del video |
| Verticales de comunidad | Repeater horizontal con un Video Box por celda. No son links a producto |
| Video en la ficha | Wix Stores acepta video en la galería de medios del producto |
| Video al pasar el mouse en la grilla | **No se puede.** El Product Gallery sólo cambia a una segunda imagen. Usá un fotograma fijo ahí |

## 7. Breakpoints

Wix Studio trae tres. Agregá uno más y usá estos anchos, que son los mismos del
prototipo:

- **≥ 1280 px** — grilla de 4-5 columnas, margen de página 64 px
- **≥ 1000 px** — 3-4 columnas, ficha en dos columnas
- **≥ 760 px** — 2-3 columnas, ficha en una columna. **Este es el corte del header**: arriba se ven los links, abajo la hamburguesa
- **< 760 px** — 2 columnas de producto, margen de página 20 px

Dos columnas en celular, no una. El scroll infinito de una sola columna hace que la
gente vea seis productos y se vaya.

## 8. Lo que hay que verificar antes de publicar

- [ ] Ningún texto sobre foto o video sin el degradado
- [ ] Todos los clips en automático sin pista de audio (eliminada, no silenciada)
- [ ] Un solo clip en automático arriba del pliegue
- [ ] Poster frame cargado en cada video
- [ ] LCP por debajo de 2,5 s en PageSpeed Insights
- [ ] Los precios tachados sólo en los kits, y con el ahorro real
- [ ] El pop-up de moneda, afuera
- [ ] Un solo termo con opción de color
- [ ] Express checkout activo y visible en la ficha
- [ ] Pickup configurado con la dirección de Broadbeach
- [ ] "What is Mate?" es una página indexable, no un embed
- [ ] Todas las fotos con la misma receta (ver `CONTENT.md`)
- [ ] Título y meta description propios por página, no los de la plantilla
- [ ] Probado en celular real, no sólo en el preview de Studio
- [ ] El logo queda centrado sobre el ancho total del header con el carrito vacío **y** con productos adentro

---

## Nota sobre el dominio

El dominio no lo ata a Wix. Si en algún momento quiere mudarse a Shopify o a
Tiendanube, se apunta el DNS y se lleva `matecoast.com` intacto. Vale la pena que lo
sepa antes de renovar el plan: la decisión de quedarse en Wix debería ser porque le
sirve, no porque cree que no puede salir.
