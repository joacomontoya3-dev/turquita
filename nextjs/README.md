# Navbar — Next.js + Shopify headless

Implementación de la spec del navbar, con los tokens del sitio como base
reutilizable para el resto de las secciones.

> **Esto no es el prototipo.** El prototipo de Mate Coast es `index.html`, generado
> desde `src/index.template.html`, y ya tiene esta misma nav aplicada — mismos tokens,
> mismas medidas. Esta carpeta queda como referencia por si algún día el sitio se porta
> a Next + Shopify en vez de Wix. Si tocás medidas, tocá las dos.

## Archivos

```
app/globals.css          Tokens: tipografía, spacing, color, navbar. Fuente de verdad
app/layout.tsx           Carga Inter con next/font y monta el Navbar
components/Navbar.tsx    El componente
components/Navbar.module.css
components/Logo.tsx      Lockup oficial en 2 líneas, color por currentColor
components/icons.tsx     Search y Cart, misma grilla y mismo trazo
lib/tokens.ts            Espejo en TS, para cuando un valor hace falta en JS
preview/navbar.html      Banco de pruebas estático
preview/build-preview.py Lo genera desde los css reales
```

Copiá `app/`, `components/` y `lib/` a tu proyecto Next (App Router). El import
`@/components/...` asume el alias por defecto de `create-next-app`.

## Verificación de la spec

Medido en el navegador a 1440px sobre `preview/navbar.html`:

| Requisito | Medido |
|---|---|
| Contenedor centrado, max 1200–1280 | 1280px |
| Padding 64 lateral / 20 vertical | `20px 64px` |
| **Logo centrado respecto al ancho total** | Δ **0.00px** con bloques de 257 y 179px |
| Altura del logo 40–44 | 42px |
| Gap entre links 36–40 | 40px |
| Gap entre acciones 16–20 | 20px |
| Gap texto ↔ ícono 6–8 | 8px |
| Links Inter Medium 15/22, ls 0.2–0.4 | 15px/22px, 500, 0.3px |
| Padding del link 0 horizontal / 8 vertical | `8px 0px` |
| Ícono 18–20, trazo 1.5 | 20×20, 1.5px |

### El punto que se rompe solo si no se cuida

Los bloques izquierdo (257px) y derecho (179px) miden distinto. Con
`display:flex; justify-content:space-between` el logo queda centrado **en el
espacio libre**, que está corrido ~39px del centro real.

La solución es `grid-template-columns: 1fr auto 1fr`: los dos tracks laterales
son iguales por definición, así que la columna del medio cae en el centro del
contenedor sin importar qué contengan los costados. Sin posicionamiento
absoluto y sin superposiciones.

Si algún día el bloque izquierdo crece más que su track, el centro se corre. El
seguro es `justify-self: start` / `end` en los costados más `min-width: 0`, que
ya están puestos.

## Shopify headless

**El contador del carrito.** El componente recibe `itemCount`. Con
`@shopify/hydrogen-react`:

```tsx
"use client";
import { useCart } from "@shopify/hydrogen-react";
import Navbar from "@/components/Navbar";

export function SiteHeader() {
  const { totalQuantity } = useCart();
  return <Navbar itemCount={totalQuantity ?? 0} />;
}
```

Si usás la Storefront API directo, el número sale de `cart.totalQuantity`.
Mantené el header como Client Component solo si el carrito es reactivo; si no,
dejalo en Server Component y pasá el count por props.

**Los links.** `Shop` apunta a `/collections/all`. Las seis categorías
(mates, bombillas, termos, yerba, yerberas y canastos, kits) son collections de
Shopify: el handle de cada una es la ruta.

**Search y Cart.** Por defecto son links a `/search` y `/cart`. Si preferís
panel y carrito lateral, pasá `onSearchClick` y `onCartClick` y el componente
renderiza `<button>` en vez de `<Link>` — el marcado cambia, el estilo no.

**La ruta activa.** Pasá `currentPath={usePathname()}` para que el ítem actual
lleve `aria-current="page"` y el subrayado.

## Notas

**Desktop únicamente**, como pide la spec. No hay breakpoints. Cuando toque
resolver mobile, el punto a atacar es que tres columnas con logo centrado no
entran abajo de ~760px: ahí la barra pasa a menú / logo / acciones.

**Inter**: la spec la fija y así está implementada. El prototipo estático del
repo usa Archivo, así que las dos piezas no van a coincidir tipográficamente —
es esperado, no un bug.

**El grosor de trazo de los íconos** sale de `--nav-icon-stroke` vía
`svg[data-icon]` en globals.css. No se puede pasar `var()` al atributo
`strokeWidth` en React: se escribe como atributo SVG y ahí `var()` no es válido.

**Para regenerar el preview** después de tocar los css:

```bash
python3 preview/build-preview.py
```
