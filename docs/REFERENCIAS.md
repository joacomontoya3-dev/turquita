# Qué saqué de las referencias

Tres sitios: **AKILA** (óptica, LA), **AGOLDE** (denim, LA) y **Acne Studios**.
No son del mismo rubro que Mate Coast, pero comparten un ADN muy consistente, y eso es
lo que se puede robar. Lo que sigue es lo que apliqué y por qué.

---

## 1. El header casi no existe

Los tres: 4–5 ítems de navegación, tipografía diminuta en mayúsculas, wordmark centrado,
utilidades a la derecha. Nada más.

**Antes** tenía 8 ítems más una marquesina animada. **Ahora**: Shop · Mates · Bombillas ·
Yerba · How to mate, wordmark centrado, Search y Bag. La marquesina se fue — quedó una
sola línea estática con el envío gratis y el retiro.

Acne muestra el carrito como `00` en dos dígitos. Se lo copié, es gratis y se nota.

## 2. El logotipo se usa en grande, dos veces

Acne pone "Acne Studios" gigante y blanco sobre la foto del hero. AGOLDE hace lo mismo
con su wordmark. AKILA cierra el footer con un "AKILA® EYEWEAR" enorme.

Era lo más desaprovechado del prototipo: tu amigo tiene un logo muy bueno y yo lo estaba
usando a 15 píxeles. Ahora **MATE COAST** ocupa el centro del hero sobre el video, y
vuelve a aparecer gigante al pie de la página.

> En producción esos dos lugares llevan **el archivo real del logo en SVG**, no texto.
> Yo puse un sustituto tipográfico porque no tengo el vector.

## 3. La imagen va de borde a borde

Ni contenedor, ni gaps, ni esquinas redondeadas, ni sombras. Las grillas de AGOLDE y Acne
son mosaicos pegados separados apenas por una línea.

Ahora el carrusel de reels y la grilla de productos van a sangre, y solo el texto de
sección queda dentro del margen. Ese desfasaje entre texto contenido e imagen a sangre es
exactamente lo que hace Acne.

## 4. La etiqueta chiquita es todo el "cromo" que hay

Acne pone `DENIM`, `NEWS`, `WOMEN'S NEW ARRIVALS > SHOP` arriba a la izquierda de cada
bloque, en mayúsculas diminutas. No hay badges de colores, ni píldoras, ni cajas.

Saqué las etiquetas verdes, los badges de duración y los recuadros. Quedó: etiqueta en
mono arriba a la izquierda, y la flecha `→` como único indicador de link. **Nunca
subrayado.**

## 5. La ficha de producto en la grilla

AKILA: producto centrado sobre un tile más claro que el fondo, y debajo, centrado —
**nombre · precio · número de referencia**.

Ese número de referencia es un detalle chiquito que hace mucho: dice "esto es un catálogo
serio". Le puse uno a cada producto (`MC 2493 63 40`). Es determinístico, no cambia entre
builds. Si tu amigo ya tiene códigos de SKU reales, se reemplazan.

Ojo con un detalle que estaba al revés: **el tile del producto tiene que ser más claro
que el fondo de la página**, no más oscuro. Los tres lo hacen así.

## 6. Casi no hay color

AKILA es gris y negro. Acne es blanco y negro. Todo el color lo pone la fotografía.

Mi verde ácido estaba trabajando de más — etiquetas de oferta, badges, acentos. Ahora
queda en tres lugares y nada más: la barra de envío gratis, el punto de "in stock" y el
punto que late en el hero. Todo lo demás es la familia gris-oliva.

## 7. El bloque "Visit Us"

AKILA lista sus tres locales en columnas separadas por una línea vertical, con
"VIEW ALL STOCKISTS →" abajo.

Es literalmente lo que te propuse en la auditoría para Broadbeach y Surfers, así que lo
armé con esa estructura: local, mercado y online, en tres columnas.

## 8. Newsletter de una sola línea

AGOLDE y AKILA: un input con subrayado y una flecha. Sin caja, sin botón, sin título
grande. Así quedó.

---

## Lo que decidí NO copiar

- **El pop-up de "GET 10% OFF"** de AKILA. Tapa contenido y es justo el tipo de
  interrupción que le saqué al sitio actual (el switcher de moneda). Un descuento de
  bienvenida se puede ofrecer, pero no encima del hero.
- **El fondo blanco puro.** Los tres tiran a gris neutro o blanco. Yo mantengo el
  gris-verde `#E9EAE6`, que sale del verde del logo. Un neutro elegido, no heredado.
- **Su tipografía.** Acne usa una grotesca geométrica propia; AGOLDE una condensada.
  Archivo + DM Mono siguen siendo la elección correcta acá, porque el mono le da a las
  specs (ml, gramos, °C) un carácter de ficha técnica que ninguna de las tres necesita
  y que a un negocio de mate le sirve mucho.
- **Prescindir del video.** Estas tres son sitios de fotografía. Mate Coast tiene video
  propio, que es su ventaja — así que la estructura sigue siendo la de video, con el
  lenguaje visual de estas referencias encima.


---

# Segunda tanda: A.P.C., a.v. vattev, BAPE, Slam Jam, Vita Travels

A diferencia de la primera, esta tanda **no es coherente entre sí**. A.P.C. y
a.v. vattev viven en el mismo mundo que AKILA/AGOLDE/Acne. BAPE es streetwear con
títulos centrados. Slam Jam tiene una barra lateral fija y paneles en caja. Y Vita
Travels es azul oscuro con grilla bento y botones tipo píldora — el opuesto exacto de
todo lo demás.

Cinco de las seis referencias apuntan al mismo lugar, así que la dirección se mantiene.
De las otras tomé lo que suma sin contradecir.

## Lo que apliqué

**Muestras de color debajo del producto (BAPE).** El termo tiene cuatro colores; ahora
se ven como cuatro puntitos en la ficha de la grilla. Es la mejor forma de mostrar que
un producto tiene variantes sin ocupar cuatro lugares — y refuerza la decisión de
unificar los cuatro termos en uno solo. En Wix salen solos de las Product Options.

**Contador de productos por categoría (Slam Jam).** `Mates (5)`, `Bombillas (3)`. Slam
Jam lo lleva al extremo con `( 441 Products )` en cada tile. Ayuda a decidir dónde
entrar, y no cuesta nada: Wix ya sabe cuántos productos tiene cada categoría.

## Lo que no apliqué, y por qué

**La barra de newsletter fija abajo (a.v. vattev).** Tapa contenido en celular. Es la
misma familia de interrupción que el pop-up de moneda que le sacamos al sitio actual.

**La barra lateral fija de Slam Jam.** Funciona con un catálogo de miles de productos y
decenas de marcas. Con 16 productos deja la mitad de la pantalla ocupada por un menú
casi vacío.

**El "Final Sale - Up to 70% Off" de Slam Jam.** Es exactamente el mecanismo que sacamos
en la auditoría. Que una marca grande lo haga no lo hace correcto para una tienda que
recién construye su posicionamiento.

**Los números de estadística de Vita Travels** ("100+ países", "1472+ retiros"). Se
pueden hacer — "2 locales · desde 2019 · envíos a toda Australia" — pero necesito datos
reales de tu amigo. Si me los pasás, lo armo.

## Vita Travels: descartado

Vita Travels es otra cosa: fondo azul muy oscuro, grilla bento, esquinas redondeadas,
botones píldora, tipografía muy grande y gruesa. Es un lenguaje moderno y funciona muy
bien para lo que es — pero es **incompatible** con las otras cinco referencias, y
adoptarlo no era un ajuste sino rehacer el diseño.

**Decisión: se descarta.** Mate Coast se queda en el mundo minimal-editorial de AKILA,
AGOLDE, Acne, A.P.C. y a.v. vattev. Si en algún momento quieren ver la versión oscura,
es una pasada nueva y completa, no un retoque.

El bloque de estadísticas grandes también queda afuera **hasta tener números reales**.
Inventar "3.000+ mates entregados" es peor que no ponerlo: si un cliente lo nota, se
lleva puesta la confianza de todo el resto de la página. Cuando tu amigo pase los datos
—año de fundación real, gente en el grupo de WhatsApp, pedidos— se arma en diez minutos.
El número del grupo de WhatsApp es el más valioso de los tres: prueba comunidad, no
volumen, y es lo que esta marca tiene y la competencia no.
