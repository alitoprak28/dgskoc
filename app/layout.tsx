import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AltNavigasyon } from "@/components/AltNavigasyon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { YapisalVeri } from "@/components/YapisalVeri";
import { site } from "@/data/site";
import { kurumVerisi, siteVerisi } from "@/lib/yapisalVeri";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext: Turkce karakterler
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  // Paylasim linklerinin mutlak adres uretmesi icin (data/site.ts -> alanAdi)
  metadataBase: new URL(site.alanAdi),
  title: {
    default: `${site.ad} — ${site.slogan}`,
    template: `%s | ${site.ad}`,
  },
  description:
    "DGS'ye hazırlanan öğrencilere kişiselleştirilmiş çalışma programı, deneme analizi ve bire bir takiple akademik koçluk.",
  openGraph: {
    title: `${site.ad} — ${site.slogan}`,
    description:
      "DGS'ye hazırlanan öğrencilere kişiselleştirilmiş çalışma programı, deneme analizi ve bire bir takiple akademik koçluk.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      {/* pb-24: mobilde sabit alt navigasyonun sayfa sonunu kapatmamasi icin */}
      <body className="font-sans pb-24 md:pb-0">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          İçeriğe geç
        </a>
        <YapisalVeri veri={kurumVerisi()} />
        <YapisalVeri veri={siteVerisi()} />
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <AltNavigasyon />
      </body>
    </html>
  );
}
