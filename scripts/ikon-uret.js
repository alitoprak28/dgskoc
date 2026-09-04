// Favicon (app/icon.png, app/apple-icon.png) ve paylasim gorselini (app/opengraph-image.png)
// kok dizindeki logo dosyalarindan uretir. Bagimliliksiz: png-oku.js + zlib.
const fs = require('fs'), zlib = require('zlib'), path = require('path');
const { decode } = require(path.join(__dirname, 'png-oku.js'));

const NAVY = [23, 48, 84];
const TURUNCU = [238, 125, 30];

function tuvalOlustur(w, h, zemin) {
  const p = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    p[i * 4] = zemin[0]; p[i * 4 + 1] = zemin[1]; p[i * 4 + 2] = zemin[2];
    p[i * 4 + 3] = zemin[3] === undefined ? 255 : zemin[3];
  }
  return { w, h, px: p };
}

// Kaynaktan bir bolgeyi hedef kutuya bilinear olceklendirerek yerlestirir.
// beyazaCevir: opak piksellerin rengini beyaza cevirir (koyu zemin uzerinde kullanmak icin)
function yerlestir(hedef, kaynak, kutu, hx, hy, hw, hh, beyazaCevir) {
  const oku = (x, y) => {
    if (x < 0 || y < 0 || x >= kaynak.w || y >= kaynak.h) return [0, 0, 0, 0];
    const o = y * kaynak.stride + x * 4;
    return [kaynak.px[o], kaynak.px[o + 1], kaynak.px[o + 2], kaynak.px[o + 3]];
  };
  const kw = kutu.x1 - kutu.x0 + 1, kh = kutu.y1 - kutu.y0 + 1;

  for (let y = 0; y < hh; y++) {
    for (let x = 0; x < hw; x++) {
      const sx = (x + 0.5) * (kw / hw) - 0.5, sy = (y + 0.5) * (kh / hh) - 0.5;
      const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0;
      let r = 0, g = 0, b = 0, a = 0;
      for (const [dx, dy, w] of [
        [0, 0, (1 - fx) * (1 - fy)], [1, 0, fx * (1 - fy)],
        [0, 1, (1 - fx) * fy], [1, 1, fx * fy],
      ]) {
        const [pr, pg, pb, pa] = oku(kutu.x0 + x0 + dx, kutu.y0 + y0 + dy);
        const k = pa / 255;
        r += pr * k * w; g += pg * k * w; b += pb * k * w; a += pa * w;
      }
      const alfa = Math.round(a);
      if (alfa <= 0) continue;
      const k = alfa / 255;
      let renk = beyazaCevir ? [255, 255, 255] : [Math.round(r / k), Math.round(g / k), Math.round(b / k)];
      const hedefX = hx + x, hedefY = hy + y;
      if (hedefX < 0 || hedefY < 0 || hedefX >= hedef.w || hedefY >= hedef.h) continue;
      const o = (hedefY * hedef.w + hedefX) * 4;
      // alfa karisimi: ust katman zemin uzerine
      for (let c = 0; c < 3; c++) hedef.px[o + c] = Math.round(renk[c] * k + hedef.px[o + c] * (1 - k));
      hedef.px[o + 3] = Math.max(hedef.px[o + 3], alfa);
    }
  }
}

function pngYaz(tuval, yol) {
  function crc32(buf) {
    let t = crc32.t;
    if (!t) { t = crc32.t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } }
    let crc = 0xffffffff;
    for (const b of buf) crc = t[(crc ^ b) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }
  const parca = (tip, veri) => {
    const u = Buffer.alloc(4); u.writeUInt32BE(veri.length);
    const g = Buffer.concat([Buffer.from(tip, 'ascii'), veri]);
    const k = Buffer.alloc(4); k.writeUInt32BE(crc32(g));
    return Buffer.concat([u, g, k]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(tuval.w, 0); ihdr.writeUInt32BE(tuval.h, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const ham = Buffer.alloc(tuval.h * (tuval.w * 4 + 1));
  for (let y = 0; y < tuval.h; y++) {
    ham[y * (tuval.w * 4 + 1)] = 0;
    tuval.px.copy(ham, y * (tuval.w * 4 + 1) + 1, y * tuval.w * 4, (y + 1) * tuval.w * 4);
  }
  fs.writeFileSync(yol, Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    parca('IHDR', ihdr), parca('IDAT', zlib.deflateSync(ham, { level: 9 })), parca('IEND', Buffer.alloc(0)),
  ]));
  console.log(`${yol} — ${tuval.w}x${tuval.h}`);
}

const logo = decode('logo-yatay.png');
const IKON = { x0: 0, x1: 246, y0: 1, y1: 169 };   // kep ikonu
const TAM = { x0: 0, x1: 674, y0: 0, y1: 169 };    // ikon + yazi

// 1) Favicon: lacivert zemin, beyaz kep — hem acik hem koyu sekme cubugunda okunur
for (const [boyut, dosya] of [[512, 'app/icon.png'], [180, 'app/apple-icon.png']]) {
  const t = tuvalOlustur(boyut, boyut, NAVY);
  const g = Math.round(boyut * 0.68), y = Math.round(g * (IKON.y1 - IKON.y0 + 1) / (IKON.x1 - IKON.x0 + 1));
  yerlestir(t, logo, IKON, Math.round((boyut - g) / 2), Math.round((boyut - y) / 2), g, y, true);
  pngYaz(t, dosya);
}

// 2) Paylasim gorseli: 1200x630 lacivert, ortada beyaz logo, altta turuncu serit
const og = tuvalOlustur(1200, 630, NAVY);
const lg = 700, ly = Math.round(lg * (TAM.y1 - TAM.y0 + 1) / (TAM.x1 - TAM.x0 + 1));
yerlestir(og, logo, TAM, Math.round((1200 - lg) / 2), Math.round((630 - ly) / 2) - 10, lg, ly, true);
for (let y = 630 - 8; y < 630; y++) for (let x = 0; x < 1200; x++) {
  const o = (y * 1200 + x) * 4;
  og.px[o] = TURUNCU[0]; og.px[o + 1] = TURUNCU[1]; og.px[o + 2] = TURUNCU[2]; og.px[o + 3] = 255;
}
pngYaz(og, 'app/opengraph-image.png');
