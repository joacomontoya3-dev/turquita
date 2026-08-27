import { writeFileSync } from 'node:fs';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const css = await (await fetch('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap', { headers: { 'User-Agent': UA } })).text();
// keep only the latin subset block for each weight
const blocks = css.split('@font-face').slice(1).map(b => '@font-face' + b);
const out = [];
for (const w of ['400', '500', '600']) {
  const b = blocks.filter(x => x.includes(`font-weight: ${w};`)).pop(); // last = latin
  const url = b.match(/url\((https:[^)]+\.woff2)\)/)[1];
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  const rng = b.match(/unicode-range:([^;]+);/)[1].trim();
  console.log('weight', w, (buf.length / 1024).toFixed(1) + 'KB');
  out.push(`@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:${w};font-display:block;src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');unicode-range:${rng}}`);
}
writeFileSync('fonts.css', out.join('\n'));
console.log('total css', (out.join('').length / 1024).toFixed(0) + 'KB');
