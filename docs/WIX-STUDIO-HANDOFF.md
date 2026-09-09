# Cómo pasar esto a Wix Studio

Escrito para el plan **Core**. Nada de acá necesita código embebido salvo donde se
aclara. Esa es una decisión deliberada: todo lo que se mete como Embed HTML queda
dentro de un `<iframe>`, no lo puede editar tu amigo después, y Google no lo indexa.

---

## Orden de trabajo

No armes página por página. Armá el sistema primero y las páginas salen solas.

1. Colores del sitio
2. Fuentes
3. Temas de texto
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
| Color 1 | `#E7E9E4` | Fondo de toda la página |
| Color 2 | `#F2F3F0` | Superficie elevada (tarjetas, avisos) |
| Color 3 | `#16190F` | Tinta / texto principal |
| Color 4 | `#2E3A24` | Banda oscura y botones primarios |
| Color 5 | `#556643` | Verde de marca (el del logo) |

Y estos como colores adicionales:

| Hex | Para qué |
|---|---|
| `#DCE0D8` | Panel de foto de producto |
| `#C6CBC0` | Filetes de 1px |
| `#5A6152` | Texto secundario |
| `#B7D14A` | Acento yerba |

**La única regla importante:** `#B7D14A` es el único color saturado del sitio y
**nunca lleva texto sobre fondo claro** — no contrasta. Es para barras de progreso,
puntitos de stock, etiquetas de oferta y links dentro de la banda oscura. Si empieza
a aparecer en botones y títulos, el diseño se cae.

## 2. Fuentes

`Site Design → Fonts → Upload fonts`. El plan Core permite subir fuentes propias.

| Rol | Fuente | Dónde conseguirla |
|---|---|---|
| Display | **Archivo** (variable, ejes wdth + wght) | fonts.google.com/specimen/Archivo → descargar → subir el `.woff2` |
| Texto | **Instrument Sans** | Ya está en la lista nativa de Wix |
| Datos | **DM Mono** | fonts.google.com/specimen/DM+Mono → subir 300 y 400 |

Si Wix te rechaza el variable de Archivo, subí las estáticas en 600 y 700 y listo — el
eje de ancho es un plus, no una necesidad.

## 3. Temas de texto

`Site Design → Text themes`. Definilos una vez y usá siempre estos, nunca tamaños sueltos:

| Tema | Fuente | Tamaño | Detalle |
|---|---|---|---|
| Display | Archivo 700 | 42 → 96 px fluido | interlineado 0.92, tracking −0.035em |
| H1 | Archivo 600 | 30 → 52 px | tracking −0.02em |
| H2 | Archivo 600 | 22 → 34 px | tracking −0.02em |
| H3 | Instrument Sans 600 | 17 px | |
| Body | Instrument Sans 400 | 16 px | interlineado 1.55 |
| Small | Instrument Sans 400 | 13 px | color `#5A6152` |
| Data | DM Mono 400 | 14 px | para precios y specs |
| Label | DM Mono 400 | 11 px | MAYÚSCULAS, tracking 0.16em |

Ese último tema —el label en mono, chiquito y espaciado— es el que carga la mitad del
carácter del diseño. Está en los rótulos de categoría, en las specs, en los botones y
en la barra de anuncios.

## 4. Custom CSS

`Dev Mode → Custom CSS`. Acá va lo que Wix no te deja controlar desde el panel:

```css
:root{
  --line:#C6CBC0;
  --panel:#DCE0D8;
}
/* Nada de esquinas redondeadas ni sombras: el look es de filete, no de tarjeta */
[data-testid="container"], .product-card, button{ border-radius:2px !important; }

/* Grilla de producto: filete en vez de sombra */
.product-item{ border:0; }
.product-item img{ background:var(--panel); }

/* Números alineados en columna en precios y specs */
.price, .spec-value{ font-variant-numeric:tabular-nums; }
```

Los selectores exactos cambian según los elementos que uses, así que inspeccioná con
el navegador antes de escribirlos. La idea es la que importa: **radio 2px, cero
sombras, filetes de 1px, números tabulares.**

---

## 5. El catálogo en Wix Stores

Tres cambios de estructura antes de cargar nada:

**a) Un termo, cuatro colores.** Hoy son cuatro productos. En el dashboard:
`Products → Termo Mate Coast 1L → Product Options → Add option → Colour`, con Black,
Forest, White y Pink. Manejás stock por variante. Recuperás tres lugares de grilla y
concentrás las reseñas y el SEO en una sola ficha.

**b) Los kits son productos, no descuentos.** Creá "The Starter Kit" y "The Gold Coast
Set" como productos normales, con su propio stock. No uses un cupón: querés que
aparezcan en la grilla, que tengan foto propia y que se puedan promocionar.

**c) Info Sections consistentes.** `Products → [producto] → Additional Info`. Definí
las mismas filas para todo el catálogo y llenalas siempre: Material, Capacidad,
Requiere curado, Lavavajillas, etc. Eso es lo que alimenta la tabla de specs. Si
algunas fichas la tienen y otras no, la grilla se ve descuidada.

## 6. Qué elemento de Wix es cada cosa

| En el prototipo | En Wix Studio |
|---|---|
| Barra de anuncios | Announcement Bar nativa. El movimiento necesita un Custom Element — si complica, sacá el movimiento, es decoración |
| Header fijo | Header nativo en modo Sticky |
| Hero tipográfico | Section + Text sobre la grilla de Studio. No hay imagen, no hay nada que optimizar |
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
| Página "How to mate" | Página normal con un Video Box por paso. **No la pongas en un embed** — es tu mejor contenido para Google |
| Hero a sangre | Sección con fondo de video, o Video Box del tamaño de la sección. Loop + Mute + Play automático |
| Degradado sobre el video | Color Overlay sobre el Video Box con el degradado — **no** el slider de opacidad del video |
| Carrusel de reels | Repeater horizontal con un Video Box por celda |
| Video en la ficha | Wix Stores acepta video en la galería de medios del producto |
| Video al pasar el mouse en la grilla | **No se puede.** El Product Gallery sólo cambia a una segunda imagen. Usá un fotograma fijo ahí |

## 7. Breakpoints

Wix Studio trae tres. Agregá uno más y usá estos anchos, que son los mismos del
prototipo:

- **≥ 1280 px** — grilla de 4-5 columnas
- **≥ 1000 px** — 3-4 columnas, ficha en dos columnas
- **≥ 700 px** — 2-3 columnas, ficha en una columna
- **< 700 px** — 2 columnas de producto

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
- [ ] "How to mate" es una página indexable, no un embed
- [ ] Todas las fotos con la misma receta (ver `CONTENT.md`)
- [ ] Título y meta description propios por página, no los de la plantilla
- [ ] Probado en celular real, no sólo en el preview de Studio

---

## Nota sobre el dominio

El dominio no lo ata a Wix. Si en algún momento quiere mudarse a Shopify o a
Tiendanube, se apunta el DNS y se lleva `matecoast.com` intacto. Vale la pena que lo
sepa antes de renovar el plan: la decisión de quedarse en Wix debería ser porque le
sirve, no porque cree que no puede salir.
