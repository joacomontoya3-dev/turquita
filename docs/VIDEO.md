# Video: qué filmar y cómo montarlo en Wix

El video propio es el activo diferencial de la marca. Este documento es el brief de
producción y las reglas técnicas para que no rompa el sitio.

> El material real está relevado en `DRIVE-INVENTARIO.md`: 78 videos y 54 fotos, con
> el mapeo de qué archivo va en cada hueco de este documento.

Los clips que trae el prototipo son **placeholders generados**: sirven para ver el
ritmo y la legibilidad, nada más. Cada uno tiene su brief encima — el botón
**"Shot notes"** del header los muestra y los oculta. Con las notas apagadas ves el
sitio como lo va a ver un cliente.

---

## 1. La regla que no se negocia

**Ningún texto va directo sobre el video.** Siempre hay una capa de degradado entre
medio: transparente arriba, `rgba(10,12,7,.92)` abajo, y el texto siempre en la parte
oscura.

Ese es exactamente el error del sitio actual — verde olivo sobre metraje brillante — y
es la primera impresión que tiene el visitante. En Wix Studio esto es un **Color
Overlay sobre el Video Box con ese degradado**, no el slider de opacidad del video (el
slider lava el video entero y sigue sin garantizar contraste).

Si el titular tiene que subir en el cuadro, sube el degradado con él.

---

## 2. Los cinco tipos de plano

| Slot | Relación | Duración | Export |
|---|---|---|---|
| Hero | 16:9 (el navegador recorta) | 6–8 s, loop sin corte | MP4 H.264, 1920×1080, ≤ 4 MB |
| Vertical de comunidad | 9:16 | 4–6 s | MP4 H.264, 1080×1920, ≤ 1.5 MB c/u |
| Ficha de producto | 4:5 | 3–4 s | MP4 H.264, 1080×1350, ≤ 1 MB c/u |
| Paso de la guía | 16:10 | 5–8 s, una acción por clip | MP4 H.264, 1600×1000, ≤ 2 MB |
| Banda ancha | 16:9 | 8–10 s | MP4 H.264, 1920×1080, ≤ 4 MB |

**Sacá la pista de audio de todo lo que arranca solo.** No la silencies: eliminala.
Baja el peso y es lo que permite que iOS lo reproduzca en automático. El sonido queda
sólo para los clips que el visitante toca.

---

## 3. Lista de tomas

### Prioridad 1 — sin esto no se lanza

1. **Hero — la ronda en la arena.** Golden hour, manos pasándose el mate, sin cortes.
   Que se vea gente real, no producto. 6–8 s.
2. **El pour.** El termo sirviendo el chorro fino en el hueco, de perfil, a contraluz,
   con el vapor visible. Es la mejor toma que va a tener el sitio: sirve para el hero,
   para el paso 05 de la guía y para la ficha del termo.
3. **Los seis pasos del cebado.** Una acción por clip, sin cortes internos:
   llenar dos tercios · tapar-sacudir-inclinar · mojar el lado bajo · entrar la
   bombilla · servir a 70–80 °C · tomar y devolver.
4. **El local de Broadbeach** desde afuera, persiana levantada, alguien entrando.
5. **El puesto del mercado** un domingo, con gente alrededor.

### Prioridad 2 — los verticales de comunidad

Verticales, tono de celular, de la vida real. No producidos. Van abajo, con el
bloque del grupo de WhatsApp, y **no llevan a un producto**: el criterio para
elegirlos es que se vea gente, no una pieza.

- Domingo en el mercado, cámara en mano, gente hablando
- Una ronda en la arena, el mate pasando de mano en mano
- Conversaciones que se estiran, con el mate en cuadro pero sin ser el tema
- El termo esperando al costado de la cancha mientras se juega
- La vuelta completa: todos toman, nadie se saltea

**Esto probablemente ya está filmado.** Antes de salir a grabar, mirá
`vertical-_1` a `_7` (SEMANA 5), `VER1/2/4/5/6/8` (SEMANA 6), `conversaciones`
1–4 (SEMANA 3), `Market.mp4` y `SEC GAMES` (fix). Son ~24 verticales terminados
y sólo hacen falta cinco. Ver `DRIVE-INVENTARIO.md`.

### Prioridad 3 — un clip por producto

3–4 s, todos con **el mismo montaje**: misma luz, mismo fondo, mismo tamaño relativo.
Ahí está la diferencia entre una grilla que se ve cara y una que se ve improvisada.

- Mates de calabaza: giro sobre plato, luz rasante sobre la costura
- Bombillas: las manos la desarman en dos piezas
- Termo: el pour
- Yerba: el kilo cayendo dentro del mate
- Canasto: se carga, se levanta y sale de cuadro hacia la playa
- Mate de acero: se cae a la arena y no le pasa nada — probá la promesa

---

## 4. Montaje en Wix Studio

**Video Box** es el elemento. Para un hero, poné el Video Box de fondo de sección con
Loop + Mute + Play automático.

**Verticales de comunidad:** un Repeater en layout horizontal con un Video Box por celda. Si
los clips ya están en Instagram, el elemento **Instagram Feed** te ahorra el trabajo —
pero pesa más y depende de una cuenta externa, así que para los verticales fijos de la home
conviene subirlos.

**Producto:** Wix Stores acepta video en la galería de medios del producto. Subilo como
segundo item, después de la foto principal.

**Una limitación honesta:** el Product Gallery **no reproduce video al pasar el mouse**
en la grilla — sólo cambia a una segunda *imagen*. En la grilla usá un fotograma fijo
como segunda imagen, y dejá el video para la ficha. Es lo único de este diseño que Wix
no hace nativo.

**La guía "How to mate" tiene que ser una página normal**, con los Video Box adentro.
Nunca un embed: es el mejor contenido que vas a tener para Google y un `<iframe>` no se
indexa.

---

## 5. Rendimiento

Un sitio con mucho video en Wix se pone lento rápido. Cuatro reglas:

1. **Un solo clip en automático arriba del pliegue.** El hero y nada más.
2. Todo lo demás con **carga diferida** (Wix lo hace solo si el Video Box está abajo
   del pliegue — no lo fuerces a precargar).
3. **Respetá los pesos de la tabla.** Un hero de 12 MB deja el sitio en 8 segundos de
   carga en 4G y Google lo penaliza.
4. **Poster frame en todos.** Es el primer fotograma que se ve mientras carga, y es lo
   que ven los que tienen "reducir movimiento" activado en el sistema.

Medí con PageSpeed Insights antes y después de subir el video. Si el LCP pasa de
2,5 segundos, el hero pesa demasiado.

---

## 6. Accesibilidad

- Todo clip decorativo va con `aria-hidden` y sin controles: no aporta nada a un lector
  de pantalla y sólo agrega ruido.
- Los clips de la guía **necesitan subtítulos** — se ven mucho en silencio, y sin
  audio el paso no se entiende. Wix permite subir un archivo de subtítulos por video.
- Con "reducir movimiento" activado en el sistema operativo, los videos quedan pausados
  en el poster. En el prototipo esto ya funciona; en Wix se resuelve con una línea en
  el panel de Custom CSS.
