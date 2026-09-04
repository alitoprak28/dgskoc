import { cn } from "@/lib/utils";

export type IkonAdi =
  | "anasayfa"
  | "hakkimizda"
  | "koclar"
  | "basarilar"
  | "basvuru"
  | "telefon"
  | "hedef"
  | "grafik"
  | "whatsapp"
  | "kullanici"
  | "ok";

// Cizgi ikon seti. Renk currentColor'dan gelir.
const yollar: Record<IkonAdi, React.ReactNode> = {
  anasayfa: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  hakkimizda: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.6v.6" />
    </>
  ),
  koclar: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
    </>
  ),
  basarilar: <path d="m12 3.5 2.7 5.5 6 .9-4.35 4.25 1.03 6-5.38-2.83L6.62 20.15l1.03-6L3.3 9.9l6-.9z" />,
  basvuru: (
    <>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
      <path d="M14 3v4h4" />
    </>
  ),
  telefon: (
    <path d="M5 4h3.5l1.6 4-2.1 1.5a12 12 0 0 0 5.5 5.5l1.5-2.1 4 1.6V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
  ),
  hedef: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  grafik: <path d="M4 15.5 9 10l3.5 3.5L20 6" />,
  whatsapp: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4v4h-4" />
    </>
  ),
  kullanici: (
    <>
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5 20c0-3.4 3.1-5.4 7-5.4s7 2 7 5.4" />
    </>
  ),
  ok: <path d="M5 12h13M13 6l6 6-6 6" />,
};

type IkonProps = {
  ad: IkonAdi;
  className?: string;
  cizgiKalinligi?: number;
};

export function Ikon({ ad, className, cizgiKalinligi = 1.8 }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={cizgiKalinligi}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {yollar[ad]}
    </svg>
  );
}
