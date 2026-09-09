# Auditoría del sitio actual — matecoast.com

Basada en las capturas del 08/09/2026. Ordenada por impacto sobre la venta,
no por gravedad estética.

## 1. Los titulares del hero son ilegibles

Verde olivo (#4F6B3A aprox.) sobre fotos claras y con mucha textura. "TODO LO QUE
NECESITÁS PARA CEBAR COMO CORRESPONDE" y "EL MATE ESTÁ LISTO. FALTÁS VOS." se pierden
casi por completo. El contraste está muy por debajo de 4.5:1 en gran parte del área
del texto, y encima es texto con letter-spacing amplio, que empeora la legibilidad.

Es el primer bloque de la página, o sea que es la primera impresión y no se lee.

**Fix:** ningún texto directamente sobre foto sin un fondo sólido, una capa de
oscurecimiento o un panel. En el prototipo el hero es tipográfico y no depende de la
foto para funcionar.

## 2. El 50% off permanente en todo el catálogo

Todos los productos muestran precio tachado a exactamente el doble: $19/$38, $55/$110,
$77/$110, $110/$220. Eso hace tres cosas malas al mismo tiempo:

- Nadie cree un descuento que está siempre y es siempre del 50%.
- Entrena al cliente a no comprar nunca a precio lleno.
- Choca de frente con las referencias que elegiste. AGOLDE y Acne Studios no ponen
  precios tachados: el precio lleno **es** la señal de calidad.

Además, en Australia el descuento permanente contra un precio que nunca se cobró
puede caer en publicidad engañosa bajo la Australian Consumer Law.

**Fix:** precio limpio, y el mecanismo de valor pasa a ser el **kit**. En el prototipo
el único tachado que existe es el de los kits, y es real: $69 contra $77 de comprar
las tres piezas por separado.

## 3. No hay camino para el que nunca tomó mate

Es el problema comercial más caro. Alguien en la Gold Coast que vio un mate en
Instagram necesita tres productos que tienen que funcionar juntos —mate, bombilla y
yerba— y no tiene forma de saberlo. Hoy "What is Mate?" es el cuarto ítem del menú y
no hay ningún kit.

**Fix:** kit de entrada como producto héroe, y la guía de cebado como página real
(`How to mate`), enlazada desde el hero, desde cada ficha y desde el footer.

## 4. Idioma mezclado sin criterio

El menú dice "Mates / Accesorios / Yerba / What is Mate? / ALL". Los titulares están
en español rioplatense cerrado ("dale que se enfría el agua", "¿quién ceba?"). El
footer está en inglés.

Un australiano no entiende la mitad. Un argentino sí, pero no es el que necesita que
le expliquen qué es. Estás pagando el costo de los dos idiomas sin el beneficio de
ninguno.

**Fix:** inglés como idioma base —estás en Queensland— y el español queda como
vocabulario de la cosa misma: *bombilla*, *yerba*, *cebador*, *montañita*, *mate del
zonzo*. Eso no confunde, da autoridad. Si más adelante quiere servir a la diáspora,
Wix Multilingual con `/es` es una decisión aparte, no un ruido en la misma página.

## 5. El pop-up de moneda tapa el hero al cargar

"Switch to ARS / Keep AUD" aparece sobre el contenido en el primer scroll. Una tienda
de la Gold Coast que cobra en AUD no necesita ofrecer pesos argentinos: no podés
enviar allá a un precio razonable y el cliente que ve ARS piensa que el sitio no es
local.

**Fix:** sacarlo. Una línea en el footer: "All prices in AUD, GST included".

## 6. Fotografía de producto sin sistema

En la grilla conviven recortes sobre blanco puro, una foto de ambiente sobre beige,
escalas distintas, sombras distintas y encuadres distintos. La grilla no tiene ritmo,
y ese ritmo es exactamente lo que hace que AGOLDE se vea caro.

**Fix:** una sola receta de foto para todo el catálogo. Está en `CONTENT.md`.

## 7. Dos locales físicos enterrados en el footer

Mercado en Surfers Paradise y local en Broadbeach. Para un negocio de la Gold Coast
eso es lo más valioso que tiene: prueba de que existe, retiro gratis, y tráfico de
gente que ya lo conoce del mercado.

**Fix:** en el prototipo aparecen tres veces — barra superior, fila de confianza bajo
el hero, y disponibilidad de retiro en cada ficha de producto.

## 8. Cuatro termos idénticos ocupan cuatro lugares de la grilla

Termo Green, White, Pink y Black son cuatro productos separados. Diluyen la grilla y
reparten las reseñas y el ranking de búsqueda entre cuatro fichas.

**Fix:** un producto con opción de color. Wix Stores lo hace nativo (Product Options →
Colour). En el prototipo está así.

## 9. Detalles que restan confianza

- "GST Included" repetido debajo de cada precio. Va una vez, en el footer.
- "© 2026 by ABRAM" — es la firma por defecto de la plantilla, no la marca.
- El email de contacto es una casilla de Gmail. Con dominio propio, `hola@matecoast.com`
  cuesta cero y cambia la percepción.
- El grupo de WhatsApp es un activo de comunidad real y está como un link suelto en el
  footer.
