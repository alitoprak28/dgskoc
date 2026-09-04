# scripts

`logo-yatay-uret.js` — header'daki yatay logoyu kok dizindeki orijinal `logo-yatay.png`
dosyasindan uretir. Orijinal dosyada slogan bandi ("DGS'DE REHBERİN") wordmark'a gore cok
kucuk kaldigi icin (108px'e karsi 18px) header boyutunda okunmuyordu. Ayrica yazi blogu
ikona gore yukarida duruyordu. Betik slogani buyutur, wordmark merkezine hizalar ve yazi
blogunu ikona gore asagi kaydirip dikey dengeyi yeniden kurar.

Kullanim (public/logo-yatay.png su an bu ayarlarla uretildi):

    node scripts/logo-yatay-uret.js 1.85 22 6 public/logo-yatay.png

Argumanlar sirayla:

| # | Arguman | Anlami |
|---|---|---|
| 1 | slogan carpani | slogan bandinin buyutme orani (1.85 = wordmark genisligine yakin) |
| 2 | kaydirma | yazi blogunun ikona gore asagi inme miktari (px) |
| 3 | ara | wordmark ile slogan arasindaki bosluk (px) |
| 4 | cikti | yazilacak dosya yolu |

Tuval yuksekligi icerige gore hesaplanir; `Header.tsx` icindeki `width`/`height`
degerleri betigin yazdirdigi tuval olcusuyle ayni olmali. `png-oku.js` bagimliliksiz
PNG cozucudur.
