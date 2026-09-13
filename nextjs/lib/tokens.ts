/**
 * Espejo en TypeScript de los tokens de app/globals.css.
 *
 * Los estilos se escriben con las custom properties CSS. Este archivo es para
 * cuando un valor hace falta en JS — cálculos de layout, animaciones, props de
 * una librería de charts. Si cambia uno, cambian los dos.
 */

export const type = {
  h1:      { size: 60, line: 66 },
  h2:      { size: 40, line: 48 },
  h3:      { size: 28, line: 36 },
  h4:      { size: 22, line: 30 },
  bodyLg:  { size: 18, line: 28 },
  body:    { size: 16, line: 24 },
  small:   { size: 14, line: 20 },
  nav:     { size: 15, line: 22 },
  button:  { size: 15, line: null },
} as const;

export const weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Escala base del sitio. */
export const space = {
  1: 8,
  2: 16,
  3: 20,
  4: 24,
  6: 48,
} as const;

export const layout = {
  pageMargin: 64,
  sectionGap: 96,      // rango de la spec: 80–120
  containerMax: 1280,  // rango de la spec: 1200–1280
  frameRef: 1440,      // ancho de referencia del diseño
} as const;

export const nav = {
  paddingY: space[3],
  paddingX: layout.pageMargin,
  gapLinks: 40,        // rango de la spec: 36–40
  gapActions: space[3],
  gapIcon: space[1],
  linkPaddingY: space[1],
  iconSize: 20,        // rango de la spec: 18–20
  iconStroke: 1.5,
  logoHeight: 42,      // rango de la spec: 40–44
  letterSpacing: 0.3,  // rango de la spec: 0.2–0.4
} as const;

export const color = {
  bg: "#ffffff",
  surface: "#f1f1f0",
  ink: "#111110",
  inkMuted: "#6b6b68",
  line: "#e3e3e1",
  brand: "#546742",
} as const;
