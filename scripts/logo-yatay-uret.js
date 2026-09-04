// Yatay logoyu yeniden kurgular: slogan bandini buyutur, dikey hizalamayi yeniden dengeler.
const fs = require('fs'), zlib = require('zlib'), path = require('path');
const { decode } = require(path.join(__dirname, 'png-oku.js'));

const ORAN = Number(process.argv[2] || 1.85);    // slogan buyutme carpani
const KAYDIR = Number(process.argv[3] || 0);     // yazi blogunu ikona gore asagi kaydirma
const ARA = Number(process.argv[4] || 8);        // wordmark ile slogan arasi bosluk
const CIKTI = process.argv[5];

const im = decode('logo-yatay.png');
const { w, h, stride, px } = im;
const bpp = 4;

const KUTU = {
  ikon:     { x0: 0,   x1: 246, y0: 0,   y1: 169 },
  wordmark: { x0: 271, x1: 673, y0: 16,  y1: 123 },
  slogan:   { x0: 369, x1: 574, y0: 129, y1: 152 },
};

const oku = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return [0, 0, 0, 0];
  const o = y * stride + x * bpp;
  return [px[o], px[o + 1], px[o + 2], px[o + 3]];
};

const sw0 = KUTU.slogan.x1 - KUTU.slogan.x0 + 1;
const sh0 = KUTU.slogan.y1 - KUTU.slogan.y0 + 1;
const WM_H = KUTU.wordmark.y1 - KUTU.wordmark.y0 + 1;
const IKON_H = KUTU.ikon.y1 - KUTU.ikon.y0 + 1;
const PAY = 4; // tuval kenar boslugu

// Yazi blogu = wordmark + ara + buyutulmus slogan. Blok, ikona gore KAYDIR kadar asagi iner;
// tasma olursa tuval buyur ve ikon yeni yukseklikte ortalanir.
const blokH = WM_H + ARA + Math.round(sh0 * ORAN);
const icerikH = Math.max(IKON_H, KAYDIR + blokH);
const CW = 675;
const CH = icerikH + 2 * PAY;
const IKON_Y = PAY + Math.round((icerikH - IKON_H) / 2);
const WM_Y_ON = PAY + KAYDIR + Math.round((icerikH - KAYDIR - blokH) / 2);
const tuval = Buffer.alloc(CW * CH * 4, 0);
const yaz = (x, y, r, g, b, a) => {
  if (x < 0 || y < 0 || x >= CW || y >= CH || a === 0) return;
  const o = (y * CW + x) * 4;
  tuval[o] = r; tuval[o + 1] = g; tuval[o + 2] = b; tuval[o + 3] = a;
};

// 1) Ikon oldugu gibi
for (let y = KUTU.ikon.y0; y <= KUTU.ikon.y1; y++)
  for (let x = KUTU.ikon.x0; x <= KUTU.ikon.x1; x++) {
    const [r, g, b, a] = oku(x, y);
    yaz(x, IKON_Y + (y - KUTU.ikon.y0), r, g, b, a);
  }

// 2) Wordmark: slogana yer acmak icin 8px yukari
const WM_Y = WM_Y_ON;
for (let y = KUTU.wordmark.y0; y <= KUTU.wordmark.y1; y++)
  for (let x = KUTU.wordmark.x0; x <= KUTU.wordmark.x1; x++) {
    const [r, g, b, a] = oku(x, y);
    yaz(x, WM_Y + (y - KUTU.wordmark.y0), r, g, b, a);
  }

// 3) Slogan: premultiply edilmis bilinear ile buyutulur, wordmark merkezine hizalanir
const sw = sw0, sh = sh0;
const yw = Math.round(sw * ORAN), yh = Math.round(sh * ORAN);
const merkez = (KUTU.wordmark.x0 + KUTU.wordmark.x1) / 2;
const SL_X = Math.round(merkez - yw / 2);
const SL_Y = WM_Y + WM_H + ARA;

for (let y = 0; y < yh; y++)
  for (let x = 0; x < yw; x++) {
    const kx = (x + 0.5) * (sw / yw) - 0.5, ky = (y + 0.5) * (sh / yh) - 0.5;
    const x0 = Math.floor(kx), y0 = Math.floor(ky);
    const fx = kx - x0, fy = ky - y0;
    let r = 0, g = 0, b = 0, a = 0;
    for (const [dx, dy, agirlik] of [
      [0, 0, (1 - fx) * (1 - fy)], [1, 0, fx * (1 - fy)],
      [0, 1, (1 - fx) * fy],       [1, 1, fx * fy],
    ]) {
      const [pr, pg, pb, pa] = oku(KUTU.slogan.x0 + x0 + dx, KUTU.slogan.y0 + y0 + dy);
      const p = pa / 255;
      r += pr * p * agirlik; g += pg * p * agirlik; b += pb * p * agirlik; a += pa * agirlik;
    }
    const alfa = Math.round(a);
    if (alfa <= 0) continue;
    const p = alfa / 255;
    yaz(SL_X + x, SL_Y + y, Math.round(r / p), Math.round(g / p), Math.round(b / p), alfa);
  }

// PNG kodlama
function crc32(buf) {
  let c, tablo = crc32.t;
  if (!tablo) {
    tablo = crc32.t = [];
    for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; tablo[n] = c >>> 0; }
  }
  let crc = 0xffffffff;
  for (const bayt of buf) crc = tablo[(crc ^ bayt) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function parca(tip, veri) {
  const uzunluk = Buffer.alloc(4); uzunluk.writeUInt32BE(veri.length);
  const govde = Buffer.concat([Buffer.from(tip, 'ascii'), veri]);
  const kontrol = Buffer.alloc(4); kontrol.writeUInt32BE(crc32(govde));
  return Buffer.concat([uzunluk, govde, kontrol]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(CW, 0); ihdr.writeUInt32BE(CH, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const ham = Buffer.alloc(CH * (CW * 4 + 1));
for (let y = 0; y < CH; y++) {
  ham[y * (CW * 4 + 1)] = 0;
  tuval.copy(ham, y * (CW * 4 + 1) + 1, y * CW * 4, (y + 1) * CW * 4);
}
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  parca('IHDR', ihdr),
  parca('IDAT', zlib.deflateSync(ham, { level: 9 })),
  parca('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(CIKTI, png);
console.log(`${CIKTI}: tuval ${CW}x${CH} | ikon y=${IKON_Y}..${IKON_Y + IKON_H - 1} | wordmark y=${WM_Y}..${WM_Y + WM_H - 1} | slogan y=${SL_Y}..${SL_Y + yh - 1} (x${ORAN}, kaydir=${KAYDIR}, ara=${ARA})`);
