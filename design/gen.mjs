import { writeFileSync, readFileSync } from 'node:fs';
const FONTCSS = readFileSync('fonts.css', 'utf8').trim();

/* ---------------- seeded data ---------------- */
let s = 20260827;
const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
const nrm = () => { let a = 0; for (let i = 0; i < 6; i++) a += rnd(); return (a - 3) / 0.7071; };

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const N = 36;                       // sep 2023 -> ago 2026
const start = { y: 2023, m: 8 };    // 0-indexed month = sep
const labels = [];
for (let i = 0; i < N; i++) {
  const m = (start.m + i) % 12, y = start.y + Math.floor((start.m + i) / 12);
  labels.push({ short: MESES[m], long: `${MESES[m]} ${y}`, y, m, isJan: m === 0 });
}

const assets = [
  { key:'rv',  name:'Renta variable global', short:'RV global',   w:0.40, drift:0.0092, vol:0.031, color:'#2a78d6' },
  { key:'tec', name:'Tecnología EE. UU.',    short:'Tecnología',  w:0.25, drift:0.0215, vol:0.062, color:'#eb6834' },
  { key:'bon', name:'Renta fija',            short:'Renta fija',  w:0.20, drift:0.0018, vol:0.009, color:'#1baf7a' },
  { key:'inm', name:'Inmobiliario',          short:'Inmobiliario',w:0.15, drift:0.0048, vol:0.038, color:'#eda100' },
];
const V0 = 18000, APORTE = 600;

// monthly gross returns per asset (shared market shock + idiosyncratic), then
// log-rescaled so each series lands on its target 3-year outcome
const shock = Array.from({length:N}, () => nrm());
const targets = { rv:152, tec:215, bon:106, inm:118 };
const rets = {};
for (const a of assets) {
  const beta = a.key === 'bon' ? 0.14 : a.key === 'tec' ? 1.35 : a.key === 'inm' ? 0.85 : 1.0;
  const raw = [];
  for (let i = 0; i < N; i++) {
    let r = a.vol * (beta * shock[i] * 0.62 + nrm() * 0.5);
    if (i === 6)  r -= a.vol * 2.4 * beta;   // corrección mar-2024
    if (i === 19) r -= a.vol * 3.1 * beta;   // corrección abr-2025
    if (i === 20) r -= a.vol * 1.4 * beta;
    raw.push(Math.log(1 + r));
  }
  raw[0] = 0;
  const sum = raw.reduce((t, v) => t + v, 0);
  const drift = (Math.log(targets[a.key] / 100) - sum) / (N - 1);
  rets[a.key] = raw.map((v, i) => (i === 0 ? 0 : Math.exp(v + drift) - 1));
}

// value paths with monthly contribution split at fixed weights
const val = {}, idx = {};
for (const a of assets) { val[a.key] = [V0 * a.w]; idx[a.key] = [100]; }
for (let i = 1; i < N; i++) {
  for (const a of assets) {
    const r = rets[a.key][i];
    val[a.key].push((val[a.key][i-1] + APORTE * a.w) * (1 + r));
    idx[a.key].push(idx[a.key][i-1] * (1 + r));
  }
}
const total = Array.from({length:N}, (_,i) => assets.reduce((t,a) => t + val[a.key][i], 0));
const aportado = Array.from({length:N}, (_,i) => V0 + APORTE * i);
// benchmark: 60/40 mundial
const brRaw = Array.from({length:N}, (_,i) => i === 0 ? 0 : Math.log(1 + 0.021 * shock[i] * 0.7 - (i===6?0.045:i===19?0.058:i===20?0.022:0)));
const portIdx = Array.from({length:N}, (_,i) => assets.reduce((t,a) => t + a.w * idx[a.key][i], 0));
const brDrift = (Math.log(1.40) - brRaw.reduce((t,v)=>t+v,0)) / (N - 1);
const bench = [100];
for (let i = 1; i < N; i++) bench.push(bench[i-1] * Math.exp(brRaw[i] + brDrift));
// monthly portfolio return (ex-aportación)
const mret = [0];
for (let i = 1; i < N; i++) mret.push((total[i] - total[i-1] - APORTE) / (total[i-1] + APORTE));

console.log('total final', Math.round(total[N-1]), 'aportado', aportado[N-1]);
console.log('idx final', assets.map(a => a.short + ' ' + idx[a.key][N-1].toFixed(0)).join(' | '), '| bench', bench[N-1].toFixed(0));
console.log('mret min/max', (Math.min(...mret)*100).toFixed(1), (Math.max(...mret)*100).toFixed(1));

/* ---------------- design system ---------------- */
const T = {
  surface:'#fcfcfb', plane:'#f9f9f7',
  ink:'#0b0b0b', ink2:'#52514e', muted:'#898781',
  grid:'#e1e0d9', axis:'#c3c2b7', border:'rgba(11,11,11,0.10)',
  up:'#006300', down:'#d03b3b',
};
const FONT = `'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif`;

/* ---------------- formatting (es-ES) ---------------- */
const grp = n => String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const eur = v => (v < 0 ? '-' : '') + grp(v) + ' €';
const sEur = v => (v >= 0 ? '+' : '-') + grp(v) + ' €';
const dec1 = v => (Math.abs(v).toFixed(1)).replace('.', ',');
const pct = v => (v >= 0 ? '+' : '-') + dec1(v) + ' %';
const pct0 = v => (v >= 0 ? '+' : '-') + Math.abs(Math.round(v)) + ' %';

/* ---------------- svg helpers ---------------- */
const sx = (i, n, b) => b.x0 + (b.x1 - b.x0) * i / (n - 1);
const sy = (v, lo, hi, b) => b.y1 - (b.y1 - b.y0) * (v - lo) / (hi - lo);
const R = v => Math.round(v * 10) / 10;
const drawdown = arr => { let peak = -Infinity, worst = 0; for (const v of arr) { peak = Math.max(peak, v); worst = Math.min(worst, v / peak - 1); } return worst * 100; };
const line = (vals, lo, hi, b) =>
  vals.map((v, i) => `${i ? 'L' : 'M'}${R(sx(i, vals.length, b))},${R(sy(v, lo, hi, b))}`).join(' ');
const areaTo = (vals, base, lo, hi, b) =>
  line(vals, lo, hi, b) + `L${R(b.x1)},${R(sy(base, lo, hi, b))}L${R(b.x0)},${R(sy(base, lo, hi, b))}Z`;
const areaBetween = (a, c, lo, hi, b) =>
  line(a, lo, hi, b) + ' ' + c.map((v, i) => `L${R(sx(c.length - 1 - i, c.length, b))},${R(sy(c[c.length - 1 - i], lo, hi, b))}`).join(' ') + 'Z';

const TICKS = [0, 6, 12, 18, 24, 30, 35];
const tickLabel = i => `${labels[i].short} ${String(labels[i].y).slice(2)}`;

function gridY(vals, lo, hi, b, fmt) {
  return vals.map(v => {
    const y = R(sy(v, lo, hi, b));
    return `<line x1="${b.x0}" y1="${y}" x2="${b.x1}" y2="${y}" stroke="${T.grid}" stroke-width="1"></line>`
      + `<text x="${b.x0 - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="${T.muted}" style="font-variant-numeric: tabular-nums">${fmt(v)}</text>`;
  }).join('');
}
function gridX(b, yLab) {
  return TICKS.map(i => {
    const x = R(sx(i, N, b));
    return `<text x="${x}" y="${yLab}" text-anchor="middle" font-size="11" fill="${T.muted}">${tickLabel(i)}</text>`;
  }).join('');
}
const endDot = (x, y, color) =>
  `<circle cx="${R(x)}" cy="${R(y)}" r="5.5" fill="${T.surface}"></circle><circle cx="${R(x)}" cy="${R(y)}" r="4" fill="${color}"></circle>`;

/* ---------------- shared chrome ---------------- */
const helmet = `<helmet>
  <style>
    ${FONTCSS}
    body { margin: 0; background: ${T.plane}; font-family: ${FONT}; color: ${T.ink}; -webkit-font-smoothing: antialiased; }
    a { color: #2a78d6; text-decoration: none; }
    a:hover { color: #1c5cab; }
    .card { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 4px; padding: 30px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px; }
    .eyebrow { font-size: 10.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: ${T.muted}; margin: 0 0 7px; }
    .h1 { font-size: 21px; font-weight: 600; letter-spacing: -0.012em; margin: 0; text-wrap: pretty; }
    .sub { font-size: 12.5px; color: ${T.ink2}; margin: 6px 0 0; max-width: 62ch; text-wrap: pretty; }
    .kpis { display: flex; gap: 40px; align-items: flex-end; }
    .kpi-l { font-size: 11px; color: ${T.muted}; margin: 0 0 5px; }
    .kpi-v { font-size: 27px; font-weight: 600; letter-spacing: -0.02em; margin: 0; line-height: 1; }
    .kpi-s { font-size: 12px; color: ${T.ink2}; margin: 6px 0 0; }
    .legend { display: flex; gap: 22px; align-items: center; flex-wrap: wrap; }
    .lg { display: flex; gap: 8px; align-items: center; font-size: 12px; color: ${T.ink2}; }
    .key { width: 14px; height: 2px; border-radius: 1px; flex: none; }
    .foot { font-size: 11.5px; color: ${T.muted}; margin: 0; text-wrap: pretty; }
    .rule { height: 1px; background: ${T.border}; }
    .num { font-variant-numeric: tabular-nums; }
  </style>
</helmet>`;

const head = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>`;
const tail = w => `</x-dc>
<script data-dc-script data-props='{"$preview":{"width":880,"height":710}}'>
class Component extends DCLogic {}
</script>
</body>
</html>
`;
const header = (eyebrow, h1, sub) =>
  `<div><p class="eyebrow">${eyebrow}</p><h1 class="h1">${h1}</h1><p class="sub">${sub}</p></div>`;
const legend = items => `<div class="legend">` + items.map(it =>
  `<div class="lg"><span class="key" style="background: ${it.c}${it.block ? '; width: 14px; height: 10px; border-radius: 2px' : ''}"></span><span>${it.t}</span></div>`).join('') + `</div>`;

/* ============ OPCIÓN A — vista agregada ============ */
{
  const b = { x0: 54, x1: 700, y0: 14, y1: 296 };
  const lo = 15000, hi = 57000;
  const fin = total[N-1], apo = aportado[N-1], gan = fin - apo;
  const k = 26; // punto del crosshair
  const kx = sx(k, N, b), kyT = sy(total[k], lo, hi, b);
  const tipW = 168, tipH = 88, tipX = kx - tipW - 16, tipY = 26;

  const svg = `<svg viewBox="0 0 784 336" width="784" height="336" role="img" aria-label="Valor de la cartera frente al capital aportado, de septiembre de 2023 a agosto de 2026">
  ${gridY([20000,30000,40000,50000], lo, hi, b, v => grp(v))}
  <line x1="${b.x0}" y1="${b.y1}" x2="${b.x1}" y2="${b.y1}" stroke="${T.axis}" stroke-width="1"></line>
  <path d="${areaBetween(total, aportado, lo, hi, b)}" fill="#2a78d6" fill-opacity="0.10"></path>
  <path d="${line(aportado, lo, hi, b)}" fill="none" stroke="${T.muted}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
  <path d="${line(total, lo, hi, b)}" fill="none" stroke="#2a78d6" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
  <line x1="${R(kx)}" y1="${b.y0}" x2="${R(kx)}" y2="${b.y1}" stroke="${T.axis}" stroke-width="1"></line>
  ${endDot(kx, sy(aportado[k], lo, hi, b), T.muted)}
  ${endDot(kx, kyT, '#2a78d6')}
  ${endDot(b.x1, sy(aportado[N-1], lo, hi, b), T.muted)}
  ${endDot(b.x1, sy(total[N-1], lo, hi, b), '#2a78d6')}
  <text x="${b.x1 + 12}" y="${R(sy(total[N-1], lo, hi, b)) + 4}" font-size="12" font-weight="600" fill="${T.ink}" class="num">${eur(fin)}</text>
  <text x="${b.x1 + 12}" y="${R(sy(aportado[N-1], lo, hi, b)) + 4}" font-size="12" font-weight="500" fill="${T.ink2}" class="num">${eur(apo)}</text>
  ${gridX(b, 322)}
  <g>
    <rect x="${R(tipX)}" y="${tipY}" width="${tipW}" height="${tipH}" rx="4" fill="${T.surface}" stroke="${T.border}"></rect>
    <text x="${R(tipX) + 14}" y="${tipY + 21}" font-size="11" fill="${T.muted}">${labels[k].long}</text>
    <text x="${R(tipX) + 14}" y="${tipY + 42}" font-size="12" fill="${T.ink2}">Valor</text>
    <text x="${R(tipX) + tipW - 14}" y="${tipY + 42}" text-anchor="end" font-size="12" font-weight="600" fill="${T.ink}" class="num">${eur(total[k])}</text>
    <text x="${R(tipX) + 14}" y="${tipY + 61}" font-size="12" fill="${T.ink2}">Aportado</text>
    <text x="${R(tipX) + tipW - 14}" y="${tipY + 61}" text-anchor="end" font-size="12" fill="${T.ink2}" class="num">${eur(aportado[k])}</text>
    <text x="${R(tipX) + 14}" y="${tipY + 80}" font-size="12" fill="${T.ink2}">Plusvalía</text>
    <text x="${R(tipX) + tipW - 14}" y="${tipY + 80}" text-anchor="end" font-size="12" font-weight="600" fill="${T.up}" class="num">${sEur(total[k] - aportado[k])}</text>
  </g>
</svg>`;

  const body = `<div style="padding: 18px; height: 100%; box-sizing: border-box">
  <div class="card">
    ${header('Opción A · Vista agregada', 'Valor de la cartera frente al capital aportado',
      'Una sola línea de valor, con el dinero que has ido metiendo como línea de referencia. El área entre ambas es la plusvalía: separa lo que ha crecido el mercado de lo que has ahorrado.')}
    <div class="kpis">
      <div><p class="kpi-l">Valor actual</p><p class="kpi-v num">${eur(fin)}</p></div>
      <div><p class="kpi-l">Capital aportado</p><p class="kpi-v num" style="color: ${T.ink2}">${eur(apo)}</p></div>
      <div><p class="kpi-l">Plusvalía acumulada</p><p class="kpi-v num" style="color: ${T.up}">${sEur(gan)}</p><p class="kpi-s">${pct(gan / apo * 100)} sobre lo aportado</p></div>
    </div>
    <div style="flex-grow: 1">${svg}</div>
    <div class="rule"></div>
    ${legend([{ c: '#2a78d6', t: 'Valor de la cartera' }, { c: T.muted, t: 'Capital aportado' }, { c: 'rgba(42,120,214,0.28)', t: 'Plusvalía (área)', block: true }])}
  </div>
</div>`;
  writeFileSync('Main.dc.html', head + helmet + body + tail());
}

/* ============ OPCIÓN B — comparativa indexada ============ */
{
  const b = { x0: 54, x1: 664, y0: 14, y1: 296 };
  const all = [...assets.map(a => idx[a.key]), bench].flat();
  const lo = Math.floor(Math.min(...all) / 20) * 20, hi = Math.ceil(Math.max(...all) / 20) * 20;
  const ticks = []; for (let v = lo; v <= hi; v += 40) ticks.push(v);
  const series = [...assets.map(a => ({ name: a.short, c: a.color, d: idx[a.key] })),
                  { name: 'Índice 60/40', c: T.muted, d: bench, ref: true }]
                 .sort((p, q) => q.d[N-1] - p.d[N-1]);

  const svg = `<svg viewBox="0 0 784 336" width="784" height="336" role="img" aria-label="Rentabilidad de cada activo con base 100 en septiembre de 2023">
  ${gridY(ticks.filter(v => v !== 100), lo, hi, b, v => v)}
  <line x1="${b.x0}" y1="${R(sy(100, lo, hi, b))}" x2="${b.x1}" y2="${R(sy(100, lo, hi, b))}" stroke="${T.axis}" stroke-width="1"></line>
  <text x="${b.x0 - 10}" y="${R(sy(100, lo, hi, b)) + 4}" text-anchor="end" font-size="11" font-weight="600" fill="${T.ink2}" class="num">100</text>
  <line x1="${b.x0}" y1="${b.y1}" x2="${b.x1}" y2="${b.y1}" stroke="${T.axis}" stroke-width="1"></line>
  ${series.map(s2 => `<path d="${line(s2.d, lo, hi, b)}" fill="none" stroke="${s2.c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${s2.ref ? ' stroke-opacity="0.85"' : ''}></path>`).join('\n  ')}
  ${series.map(s2 => endDot(b.x1, sy(s2.d[N-1], lo, hi, b), s2.c)).join('\n  ')}
  ${series.map(s2 => {
      const y = R(sy(s2.d[N-1], lo, hi, b)) + 4;
      return `<text x="${b.x1 + 12}" y="${y}" font-size="11.5" font-weight="${s2.ref ? 400 : 500}" fill="${s2.ref ? T.muted : T.ink2}">${s2.name}</text>`
        + `<text x="${b.x1 + 118}" y="${y}" text-anchor="end" font-size="11.5" font-weight="600" fill="${s2.ref ? T.muted : T.ink}" class="num">${Math.round(s2.d[N-1])}</text>`;
    }).join('\n  ')}
  ${gridX(b, 322)}
</svg>`;

  const best = series[0], worst = series[series.length - 1];
  const body = `<div style="padding: 18px; height: 100%; box-sizing: border-box">
  <div class="card">
    ${header('Opción B · Comparativa relativa', 'Cada activo indexado a base 100 en el primer mes',
      'Todo arranca en 100, así que las líneas comparan rentabilidad y no tamaño de posición. Un mismo eje para todo: sin segundo eje y sin que la posición más grande tape a las demás.')}
    <div class="kpis">
      <div><p class="kpi-l">Mejor activo</p><p class="kpi-v num" style="font-size: 22px">${best.name}</p><p class="kpi-s" style="color: ${T.up}">${pct0(best.d[N-1] - 100)} en 3 años</p></div>
      <div><p class="kpi-l">Peor activo</p><p class="kpi-v num" style="font-size: 22px">${worst.name}</p><p class="kpi-s">${pct0(worst.d[N-1] - 100)} en 3 años</p></div>
      <div><p class="kpi-l">Cartera vs. índice</p><p class="kpi-v num" style="font-size: 22px; color: ${T.up}">${(portIdx[N-1] - bench[N-1] >= 0 ? '+' : '-') + Math.abs(Math.round(portIdx[N-1] - bench[N-1]))} pts</p><p class="kpi-s">sobre el índice, en base 100</p></div>
    </div>
    <div style="flex-grow: 1">${svg}</div>
    <div class="rule"></div>
    ${legend([...assets.map(a => ({ c: a.color, t: a.short })), { c: T.muted, t: 'Índice 60/40 (referencia)' }])}
  </div>
</div>`;
  writeFileSync('OpcionB.dc.html', head + helmet + body + tail());
}

/* ============ OPCIÓN C — múltiplos pequeños ============ */
{
  const cum = {}; for (const a of assets) cum[a.key] = idx[a.key].map(v => v - 100);
  const allc = Object.values(cum).flat();
  const lo = Math.floor(Math.min(...allc) / 20) * 20, hi = Math.ceil(Math.max(...allc) / 20) * 20;
  const gl = []; for (let v = lo; v <= hi; v += 40) if (v !== 0) gl.push(v);
  const mb = { x0: 40, x1: 352, y0: 10, y1: 122 };
  const order = [...assets].sort((p, q) => cum[q.key][N-1] - cum[p.key][N-1]);

  const mini = (a, i) => {
    const d = cum[a.key], fin = d[N-1];
    const dd = drawdown(idx[a.key]);
    return `<div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px">
        <div style="display: flex; gap: 8px; align-items: center; min-width: 0">
          <span class="key" style="background: ${a.color}"></span>
          <span style="font-size: 13px; font-weight: 600; color: ${T.ink}">${a.name}</span>
        </div>
        <span style="font-size: 19px; font-weight: 600; letter-spacing: -0.015em; color: ${fin >= 0 ? T.up : T.down}" class="num">${pct0(fin)}</span>
      </div>
      <svg viewBox="0 0 384 146" width="384" height="146" role="img" aria-label="Rentabilidad acumulada de ${a.name}: ${pct0(fin)} en tres años">
        ${gl.map(v => `<line x1="${mb.x0}" y1="${R(sy(v, lo, hi, mb))}" x2="${mb.x1}" y2="${R(sy(v, lo, hi, mb))}" stroke="${T.grid}" stroke-width="1"></line><text x="${mb.x0 - 8}" y="${R(sy(v, lo, hi, mb)) + 4}" text-anchor="end" font-size="10" fill="${T.muted}" class="num">${v > 0 ? '+' : ''}${v}</text>`).join('')}
        <line x1="${mb.x0}" y1="${R(sy(0, lo, hi, mb))}" x2="${mb.x1}" y2="${R(sy(0, lo, hi, mb))}" stroke="${T.axis}" stroke-width="1"></line>
        <text x="${mb.x0 - 8}" y="${R(sy(0, lo, hi, mb)) + 4}" text-anchor="end" font-size="10" font-weight="600" fill="${T.ink2}" class="num">0</text>
        <path d="${areaTo(d, 0, lo, hi, mb)}" fill="${a.color}" fill-opacity="0.10"></path>
        <path d="${line(d, lo, hi, mb)}" fill="none" stroke="${a.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
        ${endDot(mb.x1, sy(fin, lo, hi, mb), a.color)}
        ${[0, 12, 24, 35].map(t => `<text x="${R(sx(t, N, mb))}" y="142" text-anchor="middle" font-size="10" fill="${T.muted}">${tickLabel(t)}</text>`).join('')}
      </svg>
      <p class="foot" style="margin: 0">Caída máxima ${pct0(dd)} · peso inicial ${Math.round(a.w * 100)} %</p>
    </div>`;
  };

  const body = `<div style="padding: 18px; height: 100%; box-sizing: border-box">
  <div class="card">
    ${header('Opción C · Vista desglosada', 'Un gráfico por activo, todos a la misma escala',
      'En vez de amontonar cuatro líneas en un plano, cada activo tiene el suyo, ordenados de mejor a peor. La escala vertical es común a los cuatro, así que las pendientes siguen siendo comparables de un vistazo.')}
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px 32px; flex-grow: 1">
      ${order.map(mini).join('\n      ')}
    </div>
    <div class="rule"></div>
    <p class="foot">Rentabilidad acumulada desde ${labels[0].long}, sin contar aportaciones posteriores. Escala compartida de ${lo} % a +${hi} %.</p>
  </div>
</div>`;
  writeFileSync('OpcionC.dc.html', head + helmet + body + tail());
}

/* ============ OPCIÓN D — paneles apilados ============ */
{
  const tb = { x0: 54, x1: 700, y0: 12, y1: 178 };
  const rb = { x0: 54, x1: 700, y0: 10, y1: 126 };
  const lo = 15000, hi = 57000;
  const rp = mret.map(v => v * 100);
  const rlo = Math.floor(Math.min(...rp) / 5) * 5, rhi = Math.ceil(Math.max(...rp) / 5) * 5;
  const z = R(sy(0, rlo, rhi, rb));
  const pos = rp.filter(v => v > 0).length, neg = rp.filter(v => v < 0).length;
  const bestI = rp.indexOf(Math.max(...rp)), worstI = rp.indexOf(Math.min(...rp));

  const top = `<svg viewBox="0 0 784 206" width="784" height="206" role="img" aria-label="Valor de la cartera mes a mes">
  ${gridY([20000, 35000, 50000], lo, hi, tb, v => grp(v))}
  <line x1="${tb.x0}" y1="${tb.y1}" x2="${tb.x1}" y2="${tb.y1}" stroke="${T.axis}" stroke-width="1"></line>
  <path d="${areaTo(total, lo, lo, hi, tb)}" fill="#2a78d6" fill-opacity="0.10"></path>
  <path d="${line(total, lo, hi, tb)}" fill="none" stroke="#2a78d6" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
  ${endDot(tb.x1, sy(total[N-1], lo, hi, tb), '#2a78d6')}
  <text x="${tb.x1 + 12}" y="${R(sy(total[N-1], lo, hi, tb)) + 4}" font-size="12" font-weight="600" fill="${T.ink}" class="num">${eur(total[N-1])}</text>
</svg>`;

  const bot = `<svg viewBox="0 0 784 172" width="784" height="172" role="img" aria-label="Variación mensual de la cartera en porcentaje">
  <defs>
    <clipPath id="dUp"><rect x="${rb.x0}" y="${rb.y0 - 2}" width="${rb.x1 - rb.x0}" height="${R(z - rb.y0 + 2)}"></rect></clipPath>
    <clipPath id="dDn"><rect x="${rb.x0}" y="${z}" width="${rb.x1 - rb.x0}" height="${R(rb.y1 - z + 2)}"></rect></clipPath>
  </defs>
  ${gridY([rlo, rhi], rlo, rhi, rb, v => (v > 0 ? '+' : '') + v + ' %')}
  <path d="${areaTo(rp, 0, rlo, rhi, rb)}" fill="#2a78d6" fill-opacity="0.14" clip-path="url(#dUp)"></path>
  <path d="${areaTo(rp, 0, rlo, rhi, rb)}" fill="#d03b3b" fill-opacity="0.14" clip-path="url(#dDn)"></path>
  <line x1="${rb.x0}" y1="${z}" x2="${rb.x1}" y2="${z}" stroke="${T.axis}" stroke-width="1"></line>
  <text x="${rb.x0 - 10}" y="${z + 4}" text-anchor="end" font-size="11" font-weight="600" fill="${T.ink2}" class="num">0 %</text>
  <path d="${line(rp, rlo, rhi, rb)}" fill="none" stroke="${T.ink2}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
  ${endDot(sx(worstI, N, rb), sy(rp[worstI], rlo, rhi, rb), T.down)}
  <text x="${R(sx(worstI, N, rb))}" y="${R(sy(rp[worstI], rlo, rhi, rb)) + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="${T.down}" class="num">${pct(rp[worstI])}</text>
  ${endDot(sx(bestI, N, rb), sy(rp[bestI], rlo, rhi, rb), T.up)}
  <text x="${R(sx(bestI, N, rb))}" y="${R(sy(rp[bestI], rlo, rhi, rb)) - 12}" text-anchor="middle" font-size="11" font-weight="600" fill="${T.up}" class="num">${pct(rp[bestI])}</text>
  ${gridX(rb, 152)}
</svg>`;

  const body = `<div style="padding: 18px; height: 100%; box-sizing: border-box">
  <div class="card">
    ${header('Opción D · Dos medidas, un eje de tiempo', 'Valor acumulado arriba, variación mes a mes abajo',
      'Dos magnitudes que no comparten escala se separan en dos paneles alineados sobre el mismo eje de tiempo —nunca en dos ejes verticales—. Arriba, adónde has llegado; abajo, lo movido que fue el viaje.')}
    <div class="kpis">
      <div><p class="kpi-l">Mejor mes</p><p class="kpi-v num" style="color: ${T.up}">${pct(rp[bestI])}</p><p class="kpi-s">${labels[bestI].long}</p></div>
      <div><p class="kpi-l">Peor mes</p><p class="kpi-v num" style="color: ${T.down}">${pct(rp[worstI])}</p><p class="kpi-s">${labels[worstI].long}</p></div>
      <div><p class="kpi-l">Meses en positivo</p><p class="kpi-v num">${pos} <span style="font-size: 15px; font-weight: 400; color: ${T.muted}">/ ${pos + neg}</span></p><p class="kpi-s">${Math.round(pos / (pos + neg) * 100)} % de los meses</p></div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1">
      <p class="kpi-l" style="margin: 0">Valor de la cartera</p>
      ${top}
      <p class="kpi-l" style="margin: 6px 0 0">Variación mensual</p>
      ${bot}
    </div>
  </div>
</div>`;
  writeFileSync('OpcionD.dc.html', head + helmet + body + tail());
}

/* ============ export SVG de la Opción B (para Figma) ============ */
{
  const b = { x0: 54, x1: 664, y0: 14, y1: 296 };
  const all = [...assets.map(a => idx[a.key]), bench].flat();
  const lo = Math.floor(Math.min(...all) / 20) * 20, hi = Math.ceil(Math.max(...all) / 20) * 20;
  const ticks = []; for (let v = lo; v <= hi; v += 40) ticks.push(v);
  const series = [...assets.map(a => ({ name: a.short, c: a.color, d: idx[a.key] })),
                  { name: 'Índice 60/40', c: T.muted, d: bench, ref: true }]
                 .sort((p, q) => q.d[N-1] - p.d[N-1]);
  const best = series[0], worst = series[series.length - 1];
  const gap = portIdx[N-1] - bench[N-1];

  const txt = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''} font-size="${o.size || 12}"`
    + ` font-weight="${o.weight || 400}" fill="${o.fill || T.ink}"`
    + `${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

  const plot = `<g transform="translate(48, 252)">
    ${gridY(ticks.filter(v => v !== 100), lo, hi, b, v => v)}
    <line x1="${b.x0}" y1="${R(sy(100, lo, hi, b))}" x2="${b.x1}" y2="${R(sy(100, lo, hi, b))}" stroke="${T.axis}" stroke-width="1"></line>
    <text x="${b.x0 - 10}" y="${R(sy(100, lo, hi, b)) + 4}" text-anchor="end" font-size="11" font-weight="600" fill="${T.ink2}">100</text>
    <line x1="${b.x0}" y1="${b.y1}" x2="${b.x1}" y2="${b.y1}" stroke="${T.axis}" stroke-width="1"></line>
    ${series.map(s2 => `<path d="${line(s2.d, lo, hi, b)}" fill="none" stroke="${s2.c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${s2.ref ? ' stroke-opacity="0.85"' : ''}></path>`).join('\n    ')}
    ${series.map(s2 => endDot(b.x1, sy(s2.d[N-1], lo, hi, b), s2.c)).join('\n    ')}
    ${series.map(s2 => {
        const y = R(sy(s2.d[N-1], lo, hi, b)) + 4;
        return txt(b.x1 + 12, y, s2.name, { size: 11.5, weight: s2.ref ? 400 : 500, fill: s2.ref ? T.muted : T.ink2 })
          + txt(b.x1 + 118, y, Math.round(s2.d[N-1]), { size: 11.5, weight: 600, anchor: 'end', fill: s2.ref ? T.muted : T.ink });
      }).join('\n    ')}
    ${gridX(b, 322)}
  </g>`;

  const kpi = (x, label, value, sub, o = {}) =>
    txt(x, 182, label, { size: 11, fill: T.muted })
    + txt(x, 210, value, { size: 22, weight: 600, fill: o.vFill || T.ink })
    + txt(x, 230, sub, { size: 12, fill: o.sFill || T.ink2 });

  const legendItems = [...assets.map(a => ({ c: a.color, t: a.short })), { c: T.muted, t: 'Índice 60/40 (referencia)' }];
  let lx = 48;
  const legendSvg = legendItems.map(it => {
    const g = `<rect x="${lx}" y="637" width="14" height="2" rx="1" fill="${it.c}"></rect>`
      + txt(lx + 22, 642, it.t, { size: 12, fill: T.ink2 });
    lx += 22 + it.t.length * 6.4 + 22;
    return g;
  }).join('\n  ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="710" viewBox="0 0 880 710" font-family="IBM Plex Sans, Segoe UI, sans-serif">
  <rect width="880" height="710" fill="${T.plane}"></rect>
  <rect x="18" y="18" width="844" height="674" rx="4" fill="${T.surface}" stroke="${T.border}"></rect>
  ${txt(48, 60, 'OPCIÓN B · COMPARATIVA RELATIVA', { size: 10.5, weight: 600, fill: T.muted, ls: 0.95 })}
  ${txt(48, 88, 'Cada activo indexado a base 100 en el primer mes', { size: 21, weight: 600 })}
  ${txt(48, 112, 'Todo arranca en 100, así que las líneas comparan rentabilidad y no tamaño de', { size: 12.5, fill: T.ink2 })}
  ${txt(48, 129, 'posición. Un mismo eje para todo: sin segundo eje y sin que la posición más grande', { size: 12.5, fill: T.ink2 })}
  ${txt(48, 146, 'tape a las demás.', { size: 12.5, fill: T.ink2 })}
  ${kpi(48,  'Mejor activo', best.name, `${pct0(best.d[N-1] - 100)} en 3 años`, { sFill: T.up })}
  ${kpi(200, 'Peor activo', worst.name, `${pct0(worst.d[N-1] - 100)} en 3 años`)}
  ${kpi(340, 'Cartera vs. índice', `${gap >= 0 ? '+' : '-'}${Math.abs(Math.round(gap))} pts`, 'sobre el índice, en base 100', { vFill: T.up })}
  ${plot}
  <line x1="48" y1="616" x2="832" y2="616" stroke="${T.border}"></line>
  ${legendSvg}
</svg>
`;
  writeFileSync('opcion-b.svg', svg);
}
