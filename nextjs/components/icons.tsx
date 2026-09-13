/**
 * Íconos del navbar.
 *
 * Los dos están dibujados sobre la misma grilla de 24 y comparten el mismo
 * grosor de trazo, para que no se note que son piezas distintas. Geometría
 * estilo Lucide: si más adelante sumás `lucide-react`, importá `Search` y
 * `ShoppingBag` y borrá este archivo — la métrica coincide.
 *
 * El grosor sale del token `--nav-icon-stroke` vía `svg[data-icon]` en
 * globals.css. No se puede pasar `var()` en el atributo `strokeWidth`: React
 * lo escribe como atributo SVG y ahí `var()` no es válido.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "data-icon": true,
  "aria-hidden": true,
  focusable: false,
};

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 8h14l-1.2 11.1A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.9L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}
