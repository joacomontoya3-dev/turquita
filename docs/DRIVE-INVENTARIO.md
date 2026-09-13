# Inventario del Drive de contenido

Carpeta: `Mate Coast` (propietario: miguelruizft@gmail.com)
Relevado el 10/09/2026 vía la API de Drive.

**78 videos (~12 GB) y 54 fotos**, en siete carpetas, sin índice. Este documento es
el índice.

> **No pude descargar el material.** El proxy de red de mi sesión bloquea
> `drive.google.com` (403 por política de la organización) y la herramienta de Drive
> devuelve los archivos en base64 dentro de la respuesta, lo que para un MP4 de 45 MB
> es inviable. Puedo leer toda la metadata, no el contenido. Al final está qué mandarme
> para meter el metraje real en el prototipo.

---

## Qué hay, por carpeta

| Carpeta | Videos | Peso | Contenido |
|---|---|---|---|
| **SEMANA 1** | 7 | 622 MB | `cineamtic 1.2 version corregido`, `Sequence 04`, `SHORT 1/2/3/5/6` |
| **SEMANA 2** | 11 | 1,53 GB | 3 cinematics (`V1`, `V1 Corregido`, `V3`) + 8 verticales `vertical semana 2.x` |
| **SEMANA 3** | 5 | 2,69 GB | `conversaciones` 1–4 (¡una de 1,1 GB!) + `CINEMATIC S3` |
| **SEMANA 4** | 3 | 866 MB | `VIDEO FUTBOL QUICK_3`, `verical`, `Sequence 14` |
| **SEMANA 5** | 9 | 964 MB | `horizontal log` + `vertical-_1` a `_7` + `vertical-` |
| **SEMANA 6** | 9 | 1,27 GB | `VER1/2/4/5/6/8`, `vertical osmo` ×2, `HORIZONTAL-` |
| **fix** | 27 | 3,27 GB | Mezcla: `Market`, `CINEMATIC MARKET`, `SEC GAMES`, `reel4`, `Reel 3`, `REEL-_*`, `REEL11.MOV`, `NUEVA REC` + copias de otras semanas |
| **VIDEO CARRUSEL** (dentro de `fix`) | 7 | 837 MB | `VID CARRUSEL 1,2,3,5,6,7,8` — los siete pesan casi igual (~119 MB), o sea son la misma pieza en variantes |

### Fotos — 54 en total

| Carpeta | Cantidad | Notas |
|---|---|---|
| `SEMANA 1 / FINALES FOTOGRAFIA` | 21 | `DSC01070`–`DSC01186` (4–20 MB, parecen los originales) + 10 `PLANO/PLANOS` livianos (80 KB–1,2 MB, parecen contactos o recortes) |
| `SEMANA 5 / FOTO` | 14 | `DSC05414`–`DSC05479` |
| `SEMANA 6 / FOTO` | 19 | `DSC06582`–`DSC07429` |

**Esto cambia una cosa de la auditoría.** Yo había escrito una lista de tomas de
fotografía asumiendo que había que producirla desde cero. Existen 54 fotos que no pude
ver. **Antes de reshootear nada, revisá esas tres carpetas contra la receta de foto de
`CONTENT.md`**: puede que la mitad del catálogo ya esté cubierta. Lo que hay que
verificar es si respetan una sola receta (misma luz, mismo fondo, mismo tamaño relativo)
— que es exactamente el problema de la grilla actual.

---

## Duplicados: ~1,2 GB repetidos

La carpeta `fix` repite archivos de otras semanas. Los comparé por peso exacto en bytes:

| Archivo | Está en | Bytes |
|---|---|---|
| `cinematic semana 2 V3 -.mp4` | `fix` y `SEMANA 2` | 133.050.483 |
| `vertical semana 2.4-.mp4` | `fix` y `SEMANA 2` | 72.948.524 |
| `vertical semana 2.5_1.mp4` | `fix` y `SEMANA 2` | 72.686.544 |
| `vertical semana 2.6-.mp4` | `fix` y `SEMANA 2` | 47.062.729 |
| `vertical semana 2.8-.mp4` | `fix` y `SEMANA 2` | 125.988.355 |
| `VER4.mp4` | `fix` y `SEMANA 6` | 157.643.360 |
| `VER5.mp4` | `fix` y `SEMANA 6` | 74.748.413 |
| `VER6.mp4` | `fix` y `SEMANA 6` | 46.316.132 |
| `VER8.mp4` | `fix` y `SEMANA 6` | 45.969.308 |
| `vertical osmo 2-.mp4` | `fix` y `SEMANA 6` | 111.896.622 |

Y dos casos que confunden más:

- **`CINEMATIC MARKET.mp4`** (en `fix`) y **`CINEMATIC S3.mp4`** (en `SEMANA 3`) pesan
  exactamente lo mismo: 293.842.637 bytes. **Es el mismo archivo con dos nombres.**
- **`REEL-_2.mp4`** y **`REEL-_3.mp4`**, los dos dentro de `fix`, pesan idéntico:
  82.003.549 bytes.

No es urgente, pero cuando haya que elegir qué subir a la web conviene saber que `fix`
no es material nuevo: es una carpeta de trabajo con copias.

---

## Mapeo al diseño

Qué archivo va en cada hueco del prototipo. Es una propuesta por nombre y formato — no
pude ver el contenido, así que confirmalo mirando.

| Hueco | Candidatos | Por qué |
|---|---|---|
| **Hero** (16:9, 6–8 s) | `CINEMATIC MARKET` / `CINEMATIC S3`, `cinematic semana 2 V1-`, `horizontal log-` | Es el plano que sostiene el logotipo encima. Necesita centro despejado y movimiento lento |
| **Banda "Arma tu mate"** (16:9, 8–10 s) | `cinematic semana 2 largo`, `Sequence 14`, `HORIZONTAL-` | Va detrás del bloque "Arma tu mate" |
| **Banda de curado** (16:9) | `cineamtic 1.2 version corregido`, `Sequence 04` | Cierra la guía |
| **Carrusel de reels** (9:16, ×5) | `vertical-_1` a `_7` (SEMANA 5) y `VER1/2/4/5/6/8` (SEMANA 6) | Ya son verticales y ya están terminados. Es lo más listo para usar de todo el Drive |
| **Reel "domingo en el mercado"** | `Market.mp4` | Por nombre, es exactamente esa toma |
| **Reel de comunidad** | `conversaciones` 1–4, `SEC GAMES`, `VIDEO FUTBOL QUICK_3` | Gente real. Perfecto para el bloque del grupo de WhatsApp |
| **Fichas de producto** (4:5, 3–4 s) | `VID CARRUSEL 1–8` | Por el nombre y por pesar todos casi igual, son la serie de producto |

**Lo más importante de esta tabla:** los verticales de SEMANA 5 y 6 son el material más
aprovechable que tienen. Ya están en 9:16, ya están editados, y el carrusel de reels es
la sección más distintiva del diseño. Ahí no hay que filmar nada nuevo.

---

## Nada de esto se sube tal cual

Los archivos van de 45 MB a **1,1 GB**. Para web el tope es **4 MB** el hero y
**1,5 MB** cada reel (ver `VIDEO.md`). Estamos hablando de reducir entre 30 y 250 veces.

Por cada pieza que vaya al sitio:

1. **Recortar** a la duración del hueco: 6–8 s el hero, 4–6 s un reel. No subir la pieza
   completa y dejar que loopee.
2. **Eliminar la pista de audio** — no silenciarla, borrarla. Baja el peso y es lo que
   permite el autoplay en iOS.
3. **Exportar H.264** al tamaño de la tabla de `VIDEO.md`, no a la resolución del master.
4. **Buscar un corte que cierre en loop**: que el último fotograma se parezca al primero,
   o el salto se nota en cada vuelta.

Un hero de 12 MB deja el sitio en ocho segundos de carga en 4G y Google lo penaliza.

---

## Para meter el metraje real en el prototipo

Necesito los clips **ya recortados y comprimidos**, en un `.zip` adjuntado acá —
esa vía funciona, es como llegaron el logo y las capturas.

Con esto alcanza:

- **1 hero** — 16:9, 6–8 s, ≤ 4 MB
- **5 reels** — 9:16, 4–6 s, ≤ 1,5 MB cada uno
- **2 bandas** — 16:9, 8–10 s, ≤ 4 MB cada una

Total bajo 20 MB. Los reemplazo por los placeholders generados y el prototipo pasa a
correr con el material real de la marca.

Si preferís no recortar nada, mandame los archivos completos más chicos que tengas
(`REEL11.MOV` son 9 MB, `SHORT 2` son 36 MB) y los recorto yo.
