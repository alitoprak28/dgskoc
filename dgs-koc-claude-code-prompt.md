# DGS Koç — Web Sitesi Geliştirme Promptu

---

# BÖLÜM 0 — ÇALIŞMA YÖNTEMİ (ÖNCE BUNU OKU)

Bu promptun tamamını oku ve anla, ama **hepsini birden inşa etme.** Aşamalı ilerleyeceğiz.

## AŞAMA 1 — Temel (şimdi yapılacak)
1. Proje yapısını kur (Next.js App Router + TypeScript + Tailwind, statik export ayarlı)
2. Tasarım sistemini kur (renk tokenleri, tipografi, Tailwind config)
3. `/data/` klasörünü tam veri modelleri ve placeholder içerikle oluştur
4. Ortak bileşenleri yaz: `Header`, `AltNavigasyon`, `Footer`, `Buton`, `Kart`, `Bolum`
5. Logo dosyalarını `/public/` altına yerleştir ve header/footer'a bağla
6. Bileşenleri gösteren basit bir test sayfası hazırla
7. `npm run build` çalıştır, hatasız geçtiğini doğrula

**Aşama 1 bittiğinde DUR. Bana ne yaptığını özetle ve onay iste. Onay almadan Aşama 2'ye geçme.**

## AŞAMA 2 — Sayfalar (onay sonrası)
Şu sırayla: Anasayfa → Koçlarımız (liste + detay) → Bilgi & Başvuru → Başarılarımız → Hakkımızda
Her sayfa bittiğinde mobil (375px) ve masaüstü (1280px) görünümünü kontrol et.

## AŞAMA 3 — Son kontrol
- Tüm iç linkler çalışıyor mu
- Form doğru WhatsApp mesajı üretiyor mu
- `npm run build` hatasız tamamlanıyor mu
- 320px / 768px / 1280px genişliklerde bozulma var mı
- Klavye ile tüm sayfa gezilebiliyor mu

**Neden aşamalı:** Temelde bir sorun varsa 5 sayfa yerine tek aşamada düzeltmek için.

---

# BÖLÜM 1 — BU PROMPTLA BİRLİKTE YÜKLENEN DOSYALAR

## Logo dosyaları (projeye eklenecek)

| Dosya | Hedef konum | Kullanım yeri |
|---|---|---|
| `logo-yatay.png` | `/public/logo-yatay.png` | **Header/navbar.** İkon + "dgs.koc" + altında küçük "DGS'DE REHBERİN". Şeffaf arka planlı, yatay dizilim. |
| `logo-dikey.jpg` | `/public/logo-dikey.jpg` | **Footer.** Orijinal dikey logo (ikon üstte, yazı ve slogan altta). |

**Kritik:** Logo lacivert renkte. Bu yüzden **ana menü katmanının zemini BEYAZ olmalı** — lacivert zemin üzerinde logo görünmez. (Masaüstünde menünün üstünde ince bir lacivert bilgi şeridi var, ama logo o şeritte değil, beyaz katmanda duruyor. Detay: Bölüm 5.)

Header'da logo yüksekliği ~36-40px olsun (mobilde 32-36px). Genişlik otomatik.

## Tasarım referansı görselleri (mockup)

Bunlar **kod değil, görsel referans.** Renk kullanımı, boşluk oranları, kart yerleşimi, tipografi hiyerarşisi ve genel his için bunlara sadık kal. Birebir piksel kopyası gerekmiyor ama karakter korunmalı.

| Dosya | Ne gösteriyor |
|---|---|
| `mockup-1-mobil-anasayfa.png` | Mobil anasayfa: beyaz header, lacivert hero, istatistik şeridi, değer kartları, sınav bilgilendirme kutusu, etiketli alt navigasyon |
| `mockup-2-mobil-basvuru-formu.png` | Başvuru formu: alan düzeni, turuncu çerçeveli fiyat özeti kutusu, KVKK satırı, WhatsApp butonu |
| `mockup-3-mobil-koclar.png` | Koçlar listesi: mobilde 2 sütunlu kart grid'i, kart içeriği formatı |
| `mockup-4-masaustu-anasayfa.png` | **Masaüstü anasayfa (ONAYLANMIŞ TASARIM).** Üstte ince lacivert bilgi şeridi + beyaz menü (turuncu aktif sekme çizgisi), lacivert tam genişlik hero, hero'nun sağında koç önizleme kartları, hero'ya binen beyaz istatistik kartı, bölüm başlıklı kart grid'i, yatay 4 adımlı süreç |

### Mockup'lardan çıkarılacak görsel kurallar
- Kartlar yumuşak gri zeminde (`#F7F8FA`), ince kenarlıklı, 8-10px yuvarlaklık
- İkon rozetleri kare-yuvarlak (8-9px radius), lacivert zeminli; **sadece** WhatsApp/aksiyon rozeti turuncu
- Bölümler arası bol nefes alanı — sıkışık değil
- Gölge kullanımı minimum. Ayrım düz renk ve ince kenarlıkla yapılıyor, `box-shadow` yığmayla değil
- Fiyat özeti kutusu: açık turuncu zemin (`#FFF4E9`) + turuncu kenarlık, rakam turuncu ve kalın
- Hero bölümü lacivert zeminli, üzerinde beyaz başlık ve açık gri-mavi alt metin

---

# BÖLÜM 2 — PROJE ÖZETİ

**Marka:** dgs.koc — Slogan: "DGS'de Rehberin"

DGS (Dikey Geçiş Sınavı) hazırlık sürecinde öğrencilere **birebir akademik koçluk** hizmeti sunan ekibi tanıtan, WhatsApp üzerinden başvuru toplayan tanıtım sitesi.

**Hedef kitle:** Ön lisans öğrencisi veya mezunu, DGS'ye hazırlanan, çoğunlukla mobil cihazdan siteye giren gençler.

**MUTLAK KURAL:** Bu bir **akademik koçluk** sitesidir. Psikolojik destek, terapi, psikolog, kaygı yönetimi, mizaç analizi gibi hiçbir içerik/bölüm/ifade YER ALMAYACAK. Tamamen ders programı, deneme analizi, sıralama, çalışma stratejisi odaklı.

---

# BÖLÜM 3 — TEKNİK GEREKSİNİMLER

## Stack
- **Next.js (App Router) + TypeScript + Tailwind CSS**
- Statik export edilebilir: `next.config.js` içinde `output: 'export'`
- **Backend YOK.** Form gönderimi `wa.me` deep-link ile. Sunucu tarafı işlem, veritabanı, API route yok.

## Statik export tuzakları (bunlara dikkat, ilk denemede hata verme ihtimali yüksek)

```js
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },  // statik export'ta zorunlu
  trailingSlash: true,             // statik hosting'de yol sorunlarını önler
};
```

- **Koç detay sayfaları** için `generateStaticParams()` kullan. Tüm koç slug'ları build sırasında üretilmeli.
- **`/basvuru?koc=slug` query param'ı:** `useSearchParams()` bir client component içinde olmalı VE `<Suspense>` ile sarılmalı. Aksi halde build şu hatayı verir: *"useSearchParams() should be wrapped in a suspense boundary"*. Yapı şöyle olmalı:
  ```
  app/basvuru/page.tsx        → server component, <Suspense> ile sarar
  app/basvuru/BasvuruForm.tsx → 'use client', useSearchParams burada
  ```
- Dinamik route'larda `dynamicParams = false` ayarla.

## Veri yönetimi (kritik mimari karar)
Tüm içerik `/data/*.ts` dosyalarında tutulacak. Bileşenler bu dosyalardan okuyacak, içinde sabit metin barındırmayacak.

**Sebep:** Müşteriden gerçek içerik (koç fotoğrafları, biyografiler, fiyatlar, Hakkımızda metni, öğrenci başarıları) parça parça gelecek. Veri katmanı ayrı olursa sadece bu dosyalar güncellenecek, koda dokunulmayacak.

## Diğer
- **Responsive:** Mobile-first. Breakpoint'ler: `sm:640` `md:768` `lg:1024` `xl:1280`
- **Erişilebilirlik:** Klavye gezinimi, görünür focus state (`focus-visible:ring-2`), `prefers-reduced-motion` desteği, WCAG AA kontrast
- **SEO:** Her sayfada `metadata` export'u (title, description, openGraph). Root layout'ta `lang="tr"`
- **Performans:** `next/font` ile font yükleme, gereksiz animasyon yok
- **localStorage / sessionStorage KULLANMA** — gerekmiyor

---

# BÖLÜM 4 — TASARIM SİSTEMİ

## Renk paleti

```js
// tailwind.config.ts → theme.extend.colors
{
  navy:    '#173054',  // ana renk: başlıklar, ikonlar, koyu bölüm zeminleri
  orange:  '#EE7D1E',  // VURGU — sadece CTA ve aksiyon noktalarında
  'orange-soft': '#FFF4E9',  // fiyat kutusu zemini
  'gray-bg':     '#F7F8FA',  // kart zeminleri
  'gray-border': '#EEEEEE',
  'gray-text':   '#8A8A8A',  // yardımcı metin
  'navy-soft':   '#B9C4D6',  // lacivert zemin üzerindeki alt metin
}
```

## Turuncu kullanım kuralı (KRİTİK)

Turuncu **nadiren** kullanılacak. Yalnızca şu yerlerde:
1. Birincil CTA butonları: "Hemen başvur", "WhatsApp'tan Gönder", "İletişime geç", "Hemen ara"
2. WhatsApp ile ilgili ikon rozetleri
3. Fiyat özeti kutusunun kenarlığı ve rakamı
4. Masaüstü menüsünde aktif sekmenin altındaki 3px çizgi
5. "Nasıl çalışıyoruz" bölümündeki adım numaraları (01, 02, 03, 04)

Turuncuyu **kullanma:** başlıklarda, gövde metninde, dekoratif amaçla, gradient olarak, hover efektlerinde, bölüm zeminlerinde.

## Tipografi
- Tek sans-serif aile. **Inter** öneriliyor (Türkçe karakter desteği tam). `next/font/google` ile yükle.
- Ağırlıklar: 400 (gövde), 600 (alt başlık), 700 (başlık)
- Tip ölçeği: `text-xs 12px` / `text-sm 14px` / `text-base 16px` / `text-lg 18px` / `text-xl 20px` / `text-2xl 24px` / `text-3xl 30px`
- Gövde metni satır uzunluğu max 70-75 karakter (`max-w-prose` veya `max-w-2xl`)
- Satır yüksekliği: başlıklar `leading-tight`, gövde `leading-relaxed`

### Kaçınılacak tipografik alışkanlıklar
- ALL-CAPS etiket/eyebrow'lar başlıkların üstünde
- Başlıkta tek kelimeyi farklı renge boyama
- Gereksiz "01 / 02 / 03" numaralandırma — **sadece** gerçekten sıralı içerikte kullan. Bu projede tek uygun yer: "Nasıl çalışıyoruz" bölümü (orada numaralar turuncu ve onaylanmış tasarımın parçası)
- Buton metnine "→" ekleme
- Meta bilgileri "A · B · C" şeklinde orta noktayla birleştirme

## Boşluk sistemi
- Bölüm dikey padding: mobil `py-10`, masaüstü `py-16`
- Sayfa yatay padding: mobil `px-4`, masaüstü `px-8` (max genişlik `max-w-6xl mx-auto`)
- Kart iç padding: mobil `p-4`, masaüstü `p-5`
- Kart yuvarlaklığı: `rounded-xl` (12px) — tüm kartlarda tutarlı
- Buton yuvarlaklığı: `rounded-lg` (8px)

## Bileşen stilleri

**Birincil buton (turuncu):**
```
bg-orange text-white font-semibold rounded-lg px-6 py-3
hover:brightness-95 focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2
transition-[filter] duration-150
```

**İkincil buton (outline):**
```
border-[1.5px] border-navy text-navy font-semibold rounded-lg px-6 py-3
hover:bg-navy hover:text-white transition-colors duration-150
```

**Kart:**
```
bg-gray-bg border border-gray-border rounded-xl p-4
```

**Motion kuralı:** Sayfa yüklenirken fade-and-slide-up gibi otomatik animasyonlar **ekleme**. Sadece kullanıcı eylemine cevap veren geçişler olsun (hover, modal açılışı, accordion). Hepsi `prefers-reduced-motion` ile devre dışı bırakılabilir olmalı.

---

# BÖLÜM 5 — NAVİGASYON

## Mobil (< 768px) — özel istek, dikkatli uygula

### Üst header
- Sade: sadece **logo** (sol) + **telefon numarası / "Ara" linki** (sağ)
- Zemin beyaz, altında `border-b border-gray-border`
- `sticky top-0 z-40` — kaydırınca üstte kalır
- **Hamburger menü YOK.** Bu bilinçli bir karar.

### Alt sabit navigasyon çubuğu
- `fixed bottom-0 left-0 right-0 z-50`, beyaz zemin, `border-t border-gray-border`
- **5 öğe.** Her öğe = ikon (19-20px) + altında etiket metni (8.5-9px)
- Aktif sayfa: lacivert + `font-bold`. Diğerleri: `text-gray-text`
- Etiketler: `Anasayfa` / `Hakkımızda` / `Koçlar` / `Başarılar` / `Başvuru`

**Etiket metinleri ZORUNLU.** Sadece ikon yeterli değil — kullanıcı ikondan ne olduğunu anlayamayabilir.

### Alt çubuk teknik detayları (atlanması sık görülen hatalar)
- Alt çubuk `fixed` olduğu için sayfa içeriğinin sonunu kapatır → her sayfanın ana içeriğine `pb-24 md:pb-0` ekle
- iOS'ta alt çentik/home bar alanı için:
  ```css
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
  ```
- Aktif sayfa tespiti için `usePathname()` kullan (client component olmalı)
- Dokunma hedefi minimum 44x44px olsun

## Masaüstü (≥ 768px)

Masaüstü header **iki katmanlı** olacak:

### Üst şerit (ince bilgi bandı)
- Zemin: lacivert (`bg-navy`), yükseklik ~30px, `py-[7px] px-8`
- Sol: slogan metni **"DGS'de Rehberin"** (`text-navy-soft`, 11.5px)
- Sağ: telefon ikonu + numara (beyaz, 11.5px)
- Bu şerit header'a ağırlık kazandırır ve alttaki lacivert hero ile görsel bağ kurar

### Ana menü (beyaz katman)
- Zemin: beyaz, `py-[18px] px-8`
- Sol: logo (`logo-yatay.png`)
- Orta: sayfa linkleri (`text-[#5A6B85]`, 13px, aralarında `gap-[26px]`)
- **Aktif sayfa:** lacivert + `font-bold`, altında **turuncu** 3px çizgi (`absolute bottom-[-19px] h-[3px] bg-orange rounded-full`)
- Sağ: turuncu "Hemen ara" butonu

Alt navigasyon çubuğu masaüstünde gizlenir: `md:hidden`. Masaüstünde alt padding'e gerek yok.

---

# BÖLÜM 6 — VERİ MODELLERİ

## `/data/site.ts`
```ts
export const site = {
  ad: "DGS Koç",
  slogan: "DGS'de Rehberin",
  telefon: "0531 834 42 10",
  telefonWa: "905318344210",        // wa.me için, başında 90, boşluksuz
  email: "",                         // şu an yok
  sosyal: {
    instagram: "",
    youtube: "",
  },
  istatistikler: {
    ogrenciSayisi: "450+",          // PLACEHOLDER — müşteriden gelecek
    kocSayisi: "20+",               // PLACEHOLDER
    deneyimYili: "4",               // PLACEHOLDER
  },
  sinavTarihi: null as string | null, // null → bilgilendirme kutusu, dolu → geri sayım
  oneCikanHikaye: {
    ad: "Zeynep Arslan",
    ozet: "PLACEHOLDER — öne çıkan başarı hikayesi metni buraya gelecek.",
    sonuc: "Boğaziçi Üniversitesi — İşletme",
  },
};
```

## `/data/koclar.ts`
```ts
export type Koc = {
  slug: string;
  ad: string;
  puanTuru: "Sayısal" | "Sözel" | "Eşit Ağırlık";
  puanTuruKisa: "SAY" | "SÖZ" | "EA";
  derece: number;
  universite: string;
  alan: string;
  foto: string;              // /public/koclar/... veya placeholder
  biyografi: string;         // PLACEHOLDER — müşteriden gelecek
  uzmanlik?: string[];
  aylikUcret: number;        // TL. KOÇTAN KOÇA FARKLI
};

export const koclar: Koc[] = [ /* 5-6 gerçekçi placeholder kayıt */ ];
```

**Kart başlık formatı:** `${ad} (${puanTuruKisa} ${derece}.)` → örn. "Büşra Savur (EA 2158.)"

## `/data/basarilar.ts`
```ts
export type Basari = {
  ad: string;
  foto: string;
  universite: string;
  bolum: string;
  puanTuruKisa: string;
  derece: number;
};
```

## `/data/yorumlar.ts`
```ts
export type Yorum = {
  ad: string;
  foto: string;
  universite: string;
  bolum?: string;
  metin: string;
};
```

## `/data/hakkimizda.ts`
```ts
export const hakkimizda = {
  hikaye: `DGS Koç, [X yıl] önce basit bir gözlemle başladı: DGS'ye hazırlanan öğrenciler çoğu zaman doğru kaynaklara sahipti ama kimse onlara *nasıl* çalışmaları gerektiğini, süreci nasıl yönetmeleri gerektiğini göstermiyordu. Biz de bu boşluğu doldurmak için yola çıktık.

Bugün [X yıldır] bu işi yapıyoruz. Bu süre boyunca [X] öğrenciyle çalıştık, onların hedeflerine giden yolda yanlarında olduk.`,
  nedenBiz: [
    "PLACEHOLDER — farklılaşma noktası 1",
    "PLACEHOLDER — farklılaşma noktası 2",
    "PLACEHOLDER — farklılaşma noktası 3",
  ],
  metod: `PLACEHOLDER — çalışma metodu açıklaması`,
};
```

**Tüm placeholder metinler açıkça `PLACEHOLDER` veya `[X]` işaretli olsun** ki sonradan hangilerinin değişeceği net görünsün.

---

# BÖLÜM 7 — SAYFALAR

## 7.1 — Anasayfa (`/`)

Bölümler, bu sırayla:

### 1. Header (sticky)

### 2. Hero

**Zemin: lacivert (`bg-navy`) — tam genişlik.** Bu onaylanmış karardır, beyaz hero denendi ve reddedildi (marka rengi zayıflıyor, mobil ile tutarsız oluyor).

**Sol sütun (1.15fr):**
- Başlık (beyaz, ~33px, `font-extrabold`, `leading-[1.22]`, `tracking-tight`): **"DGS'de doğru stratejiyle hedefine ulaş"** — iki satıra bölünmüş halde
- Alt başlık (`text-navy-soft`, 14.5px): "Kişiselleştirilmiş çalışma programı, düzenli deneme analizi ve bire bir takiple sınav sürecinde yanındayız."
- İki buton yan yana:
  - **"Hemen başvur"** (turuncu) → `/basvuru`
  - **"Koçlarımızı incele"** (şeffaf zemin, `border-white/45`, beyaz metin) → `/koclarimiz`

**Sağ sütun (0.85fr) — koç önizleme kartları:**
- `koclar` dizisinden ilk **3 koç**, dikey istiflenmiş mini kartlar halinde
- Kart stili: `bg-white/[.07] border border-white/[.14] rounded-xl p-[11px_13px]`
- Her kartta: 40x40 avatar kutusu (`bg-white/[.14] rounded-[10px]`) + isim (beyaz, kalın) + üniversite · bölüm (`text-[#8EA0BC]`, 11px)
- Kartların altında: **"ve X koç daha"** metni (`text-navy-soft`, 11.5px, ortalanmış) — X sayısı `koclar.length - 3` ile hesaplanır

**Mobilde:** Tek sütun, ortalanmış, koç kartları gösterilmez (sadece başlık + alt başlık + tek CTA).

### 3. Güven şeridi

**Hero'nun üstüne binen beyaz kart** — bu düzen sayfaya derinlik katıyor, düz şerit yerine tercih edildi.

- Kapsayıcı: `px-8 -mt-[26px] relative`
- Kart: `bg-white border border-gray-border rounded-2xl grid grid-cols-3 py-5 shadow-[0_4px_18px_rgba(23,48,84,.06)]`
- Her sütun ortalanmış, aralarında ince dikey ayraç (`border-r border-[#f0f0f0]`, sonuncuda yok)
- Rakam: 27px, lacivert, `font-extrabold`. Etiket: 11.5px, `text-gray-text`
- Etiketler: "öğrenciyle çalıştık" / "dereceli koç" / "yıllık deneyim"

**Mobilde:** Negatif margin olmadan normal akışta, 3 sütun yan yana.

### 4. Değer kartları (3'lü grid)

Bölüm başlığı: **"Sana ne sunuyoruz"** (20px, lacivert, `font-extrabold`)

| Başlık | Açıklama | Rozet rengi |
|---|---|---|
| Kişisel program | Seviyene ve hedefine uygun, sana özel hazırlanmış haftalık çalışma planı | lacivert |
| Deneme analizi | Düzenli deneme takibiyle nerede olduğunu ve nereye gitmen gerektiğini netleştir | lacivert |
| Hızlı başvuru | Formu doldur, saniyeler içinde WhatsApp'tan bize ulaş | **turuncu** |

Mobilde tek sütun (yatay kart: rozet solda, metin sağda), masaüstünde 3 sütun (dikey kart).

### 5. Nasıl çalışıyoruz

Bölüm başlığı: **"Nasıl çalışıyoruz"**

4 adımlı **sıralı** akış — burada numaralandırma uygun ve anlamlı.

**Masaüstü düzeni (4 sütun yan yana):** Her adımın üstünde 2px lacivert çizgi (`border-t-2 border-navy pt-3`), altında turuncu numara (`01`, `02`... 11px, `font-bold`), sonra kalın lacivert başlık, sonra gri açıklama.

**Mobilde:** Dikey liste halinde.

1. **Ön görüşme** — Hedeflerini ve mevcut durumunu birlikte netleştiriyoruz
2. **Program** — Sana özel haftalık çalışma planı hazırlanıyor
3. **Takip** — Haftalık raporlama ve düzenli iletişimle süreç takip ediliyor
4. **Deneme analizi** — Gelişimin düzenli olarak ölçülüp plan güncelleniyor

### 6. Koçlarımız önizleme
`koclar` dizisinden ilk 4-6 kayıt, kart formatında + "Tümünü Gör" linki → `/koclarimiz`

### 7. Öğrenci yorumları önizleme
`yorumlar` dizisinden 2-3 kayıt, kısa kart formatında

### 8. Öne çıkan başarı hikayesi
`site.oneCikanHikaye`'den tek, büyük, vurgulu blok. Lacivert zeminli olabilir — sayfada ikinci koyu bölüm olarak ritim yaratır.

### 9. Sınav bilgilendirme alanı

**Geri sayım sayacı DEĞİL.** `site.sinavTarihi === null` olduğu için şu içerik gösterilecek:

> **2027-DGS tarihi açıklandığında burada olacak**
> ÖSYM tarafından 2027-DGS sınav tarihi henüz açıklanmadı. Duyurulur duyurulmaz bu alanı güncelleyeceğiz.

Küçük bir "Yakında" rozeti eklenebilir.

**Bileşeni ileriye dönük kur:** `sinavTarihi` dolu bir tarih olursa otomatik olarak gerçek geri sayım sayacına dönüşsün (gün/saat/dakika/saniye). Bu mantığı şimdiden yaz ama şu an `null` olduğu için bilgilendirme metni görünsün.

### 10. Kapanış CTA şeridi
Başlık: "Hedefine giden yolda yalnız yürüme" + turuncu WhatsApp butonu

### 11. Footer
`logo-dikey.jpg`, telefon, WhatsApp linki, sosyal medya, sayfa linkleri

---

## 7.2 — Hakkımızda (`/hakkimizda`)

1. **Kuruluş hikayesi / misyon** — `hakkimizda.hikaye`
2. **Neden DGS Koç** — `hakkimizda.nedenBiz` listesi
3. **Çalışma metodumuz** — `hakkimizda.metod`
4. **Rakamlarla DGS Koç** — `site.istatistikler` (anasayfayla aynı veri, tutarlı olmalı)

**Ton:** Kısa ve samimi bir açılış, ardından kurumsal güven veren somut rakamlar. Abartılı pazarlama dili yok.

**Not:** Gerçek içerik henüz gelmedi, placeholder ile kur.

---

## 7.3 — Koçlarımız (`/koclarimiz`)

### Liste sayfası
- Üst açıklama: "Alanında dereceye girmiş, süreci bizzat yaşamış mentörlerden oluşan ekibimiz"
- Responsive grid: **mobilde 2 sütun**, `sm` 3 sütun, `lg` 4 sütun
- **Her kartta:** fotoğraf, `Ad (PUANTÜRÜ Derece.)`, üniversite, alan
  - Örnek: **Büşra Savur (EA 2158.)** / Yeditepe Üniversitesi / İşletme
- Kart tamamı tıklanabilir → `/koclarimiz/[slug]`

**Kartta FİYAT GÖSTERİLMEYECEK.**
**Filtre/sekme YOK** — tüm koçlar tek listede.

### Koç detay sayfası (`/koclarimiz/[slug]`)
- Büyük fotoğraf
- İsim + puan türü + derece
- Üniversite, alan/bölüm
- **Biyografi** (uzun metin, `whitespace-pre-line` ile paragraf desteği)
- Uzmanlık notları (varsa, liste halinde)
- **Aylık ücret** — net rakam, Türkçe formatta (örn. `3.000₺`)
- CTA: **"Bu koçla çalışmak istiyorum"** (turuncu) → `/basvuru?koc=${slug}`

`generateStaticParams()` ile tüm slug'lar build'de üretilsin. `notFound()` ile geçersiz slug yönetilsin.

---

## 7.4 — Bilgi & Başvuru (`/basvuru`)

### Yapı
1. Kısa süreç özeti — "Nasıl başlarız?" (2-3 adımlı mini akış: Formu doldur → Sana ulaşalım → Ön görüşmede tanışalım)
2. Başvuru formu

### Form alanları (sırayla)

| # | Alan | Tip | Zorunlu |
|---|---|---|---|
| 1 | Adınız Soyadınız | text | ✓ |
| 2 | İletişim Numaranız | tel | ✓ |
| 3 | Daha Önce Koçluk Aldınız mı? | radio: Evet / Hayır | ✓ |
| 4 | Bulunduğunuz Durum | select: Ön Lisans 1. Sınıf / Ön Lisans Son Sınıf / Mezun | ✓ |
| 5 | Hedefiniz Hangi Bölüm? | text | ✓ |
| 6 | Hedef Sıralamanız Nedir? | text | ✓ |
| 7 | Şuanki Ortalama Netiniz Nedir? | text | ✓ |
| 8 | Hangi Alanda Hazırlanacaksınız? | radio: Sayısal / Sözel / Eşit Ağırlık | ✓ |
| 9 | Koçlarımızdan Kiminle Çalışmak İstersiniz? | select (koclar'dan dinamik) | ✓ |
| 10 | Kaç Ay Çalışmak İstiyorsunuz? | number, min 1 | ✓ |
| 11 | **Fiyat özeti kutusu** | (otomatik) | — |
| 12 | KVKK onayı | checkbox | ✓ |
| 13 | "WhatsApp'tan Gönder" | buton | — |

Koç select'i formatı: `Büşra Savur — EA 2158.`

### Fiyat hesaplama (KRİTİK — dikkatli oku)

- Her koçun kendi `aylikUcret` değeri var. **Koçtan koça FARKLI.**
- Hesaplama yöntemi **tüm koçlar için AYNI**: `aylikUcret × aySayisi`
- **İndirim / kademeli fiyat / paket tablosu YOK.** Uzun süre alımında birim fiyat değişmez.
- Koç **ve** ay sayısı seçilince fiyat özeti kutusu belirir. İkisinden biri boşsa kutu görünmez.

**Kutu içeriği (formül GÖSTERME):**
```
Seçilen: Büşra Savur
3 Aylık Paket: 9.000₺
```

❌ Şunu YAPMA: `3 Ay × 3.000₺ = 9.000₺`

**Fiyat formatı:** Türkçe binlik ayracı (nokta) + `₺`. `new Intl.NumberFormat('tr-TR').format(tutar)` kullan.

**Kutu stili:** `bg-orange-soft border border-orange rounded-lg p-3`, rakam `text-orange font-bold`

### KVKK onayı

Checkbox yanındaki metin **kısa** olacak:
```
☐ KVKK metnini okudum, onaylıyorum.
```

"KVKK metnini" tıklanabilir → **modal** açılır. **Ayrı bir KVKK sayfası oluşturma.**

Modal içeriği (placeholder):
> Bu formu göndererek, paylaştığınız kişisel verilerin DGS Koç tarafından başvuru sürecinizin değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla 6698 sayılı KVKK kapsamında işlenmesine onay vermiş olursunuz.

Modal erişilebilir olmalı: ESC ile kapanır, açıkken focus içeride kalır (focus trap), kapanınca focus tetikleyen linke döner, `role="dialog"` + `aria-modal="true"`.

### Form doğrulama davranışı

- Doğrulama **"Gönder"e basıldığında** çalışsın — her tuş vuruşunda değil (yazarken hata göstermek rahatsız edici)
- Bir alan hatalıysa: kenarlık kırmızıya döner, altında kısa mesaj çıkar
- **Hata mesajları özür dilemesin, ne yapılacağını söylesin:**
  - "Adınızı ve soyadınızı yazın."
  - "Telefon numaranızı yazın."
  - "Geçerli bir telefon numarası yazın." (format hatalıysa)
  - "Bir seçenek işaretleyin."
  - "Bir koç seçin."
  - "Kaç ay çalışmak istediğinizi yazın."
  - "Devam etmek için KVKK metnini onaylayın."
- Gönder'e basınca **ilk hatalı alana kaydır** (`scrollIntoView({behavior:'smooth', block:'center'})`) ve odaklan
- `aria-invalid` ve `aria-describedby` ile hata mesajlarını alana bağla
- Telefon alanı: `inputMode="tel"`, sadece rakam/boşluk/parantez kabul et
- Ay sayısı: `inputMode="numeric"`, `min={1}`, sıfır ve negatif kabul etme

### WhatsApp gönderim mekanizması

Doğrulama geçtikten sonra tüm alanları okunabilir bir mesaja çevir ve `wa.me` linkini aç.

```ts
const mesaj = `Yeni DGS Koç Başvurusu

Ad Soyad: ${ad}
Telefon: ${telefon}
Daha önce koçluk: ${koclukAldiMi}
Durum: ${durum}
Hedef bölüm: ${hedefBolum}
Hedef sıralama: ${hedefSiralama}
Ortalama net: ${net}
Alan: ${alan}
Seçilen koç: ${kocAdi}
Süre: ${aySayisi} ay
Toplam: ${formatliTutar}`;

const url = `https://wa.me/${site.telefonWa}?text=${encodeURIComponent(mesaj)}`;
window.open(url, '_blank');
```

- Telefon numarası **sadece** `site.telefonWa`'dan okunsun, koda gömülmesin
- URL query param'ından gelen koç (`?koc=slug`) formda **otomatik seçili** gelmeli

### Bu sayfada OLMAYACAKLAR
- Konum / harita
- Doğrudan iletişim bilgisi bloğu (telefon/e-posta listesi) — kullanıcı WhatsApp'a yönlendiğinde numarayı zaten görecek

---

## 7.5 — Başarılarımız (`/basarilarimiz`)

1. **Genel istatistik şeridi** — `site.istatistikler` (anasayfayla tutarlı)
2. **Öğrenci başarı kartları** — `basarilar` dizisinden
   - Her kartta: fotoğraf, isim, üniversite + bölüm, puan türü + derece
3. **Öğrenci yorumları** — `yorumlar` dizisinden
   - Her kartta: yorum metni, fotoğraf, isim, üniversite/bölüm

**Yıl filtresi YOK**, hepsi tek listede.

---

# BÖLÜM 8 — KRİTİK YASAKLAR

Bunların hepsi bilinçli karar. Varsayılan olarak eklemeye meyilli olabileceğin ama **KESİNLİKLE istenmeyen** şeyler:

| # | YAPMA |
|---|---|
| 1 | ❌ Psikolog / psikolojik destek / terapi / kaygı yönetimi içeriği ekleme |
| 2 | ❌ **SSS bölümü ekleme** — hiçbir sayfada olmayacak |
| 3 | ❌ Yüzen / sticky WhatsApp butonu ekleme |
| 4 | ❌ **Geri sayım sayacı gösterme** — sınav tarihi açıklanmadı, bilgilendirme kutusu koy |
| 5 | ❌ **Mobilde hamburger menü ekleme** — alt navigasyon çubuğu kullanılacak |
| 6 | ❌ Alt navigasyonda etiket metinlerini atlama — ikon tek başına yetmez |
| 7 | ❌ Koç kartlarında fiyat gösterme — sadece detay sayfasında |
| 8 | ❌ Koç filtresi / sekmesi / arama kutusu ekleme — tek liste |
| 9 | ❌ Süreye göre kademeli fiyat tablosu (1/3/6/12 ay paketleri) kurma |
| 10 | ❌ Uzun süre alımında indirim uygulama |
| 11 | ❌ Fiyat hesaplama **formülünü** kullanıcıya gösterme — sadece sonucu göster |
| 12 | ❌ Lacivert header yapma — logo lacivert, header beyaz olmalı (üst ince şerit lacivert, ana menü beyaz) |
| 13 | ❌ **Hero'yu beyaz yapma** — lacivert olacak. Beyaz denendi ve reddedildi |
| 14 | ❌ Hero'nun sağına boş görsel placeholder koyma — orada koç önizleme kartları olacak |
| 15 | ❌ Turuncuyu CTA dışında kullanma (istisna: aktif menü sekmesi altı çizgisi ve adım numaraları) |
| 16 | ❌ Ayrı KVKK aydınlatma sayfası oluşturma — kısa cümle + modal yeterli |
| 17 | ❌ localStorage / sessionStorage kullanma |
| 18 | ❌ Sayfa yüklenirken otomatik fade/slide animasyonları ekleme |
| 19 | ❌ Backend, API route, veritabanı, form gönderim servisi kurma |
| 20 | ❌ Metinleri bileşenlerin içine gömme — hepsi `/data/` dosyalarında olmalı |

---

# BÖLÜM 9 — KALİTE ÖLÇÜTLERİ

Teslim öncesi şunları doğrula:

**Build & teknik**
- [ ] `npm run build` hatasız tamamlanıyor
- [ ] `out/` klasörü üretiliyor, statik dosyalar hazır
- [ ] Konsolda hata/uyarı yok
- [ ] TypeScript hatası yok

**Responsive**
- [ ] 320px'de yatay kaydırma yok, hiçbir öğe taşmıyor
- [ ] 375px (mobil) düzgün
- [ ] 768px (tablet) geçişi sorunsuz
- [ ] 1280px (masaüstü) düzgün
- [ ] Alt navigasyon içeriğin sonunu kapatmıyor
- [ ] Alt navigasyon masaüstünde gizli

**İşlevsellik**
- [ ] Tüm iç linkler doğru sayfaya gidiyor
- [ ] Alt navigasyonda aktif sayfa doğru vurgulanıyor
- [ ] Koç kartına tıklayınca doğru detay sayfası açılıyor
- [ ] `/basvuru?koc=slug` ile gelince o koç seçili geliyor
- [ ] Fiyat özeti doğru hesaplıyor ve Türkçe formatta gösteriyor
- [ ] Form doğrulaması çalışıyor, hata mesajları doğru
- [ ] WhatsApp linki doğru mesajla açılıyor
- [ ] KVKK modalı açılıp kapanıyor, ESC çalışıyor

**Erişilebilirlik**
- [ ] Klavye ile tüm sayfa gezilebiliyor
- [ ] Focus göstergeleri görünür
- [ ] Görsellerde `alt` metinleri var
- [ ] Form alanlarında `label` bağlantıları doğru
- [ ] Kontrast oranları yeterli

**İçerik**
- [ ] Hiçbir yerde psikolog/psikolojik destek geçmiyor
- [ ] Hiçbir sayfada SSS yok
- [ ] Tüm placeholder içerikler `/data/` altında ve açıkça işaretli
- [ ] Metin ve buton etiketleri sayfalar arası tutarlı

---

# BÖLÜM 10 — KOD KALİTESİ

- Bileşen ve değişken isimleri **Türkçe** ve tutarlı (`AltNavigasyon`, `KocKarti`, `FiyatOzeti`, `BasvuruFormu`)
- Her bileşen tek iş yapsın, 150 satırı geçmesin
- Tekrar eden yapıları bileşene çıkar (kart, buton, bölüm başlığı)
- `'use client'` sadece gerçekten gerekli yerlerde (form, alt navigasyon, modal, geri sayım)
- Tailwind sınıflarında çakışma yaratma — `cn()`/`clsx` yardımcısı kullan
- Yorum satırlarını Türkçe yaz, sadece açıklama gereken yerlerde

---

# BÖLÜM 11 — GELECEK GÜNCELLEMELER (bilgi amaçlı)

Müşteriden şu içerikler henüz gelmedi, sonradan `/data/` dosyaları üzerinden eklenecek. Kodu buna hazır kur:

| İçerik | Nereye gelecek |
|---|---|
| Hakkımızda gerçek metni (yıl, hikaye, farklılaşma noktaları) | `/data/hakkimizda.ts` |
| Gerçek istatistik rakamları | `/data/site.ts → istatistikler` |
| Koç fotoğrafları, biyografileri, gerçek aylık ücretleri | `/data/koclar.ts` + `/public/koclar/` |
| Öğrenci başarıları ve yorumları (fotoğraflı) | `/data/basarilar.ts`, `/data/yorumlar.ts` |
| 2027-DGS sınav tarihi (açıklanınca) | `/data/site.ts → sinavTarihi` |
| Başvuru formunda müşterinin isteyeceği düzenlemeler | `BasvuruForm.tsx` |
| Sosyal medya linkleri | `/data/site.ts → sosyal` |

Bu yüzden veri katmanı ayrımı kritik — içerik güncellemeleri bileşenlere dokunmadan yapılabilmeli.

---

**Şimdi Aşama 1'e başla. Bittiğinde dur ve onay iste.**
