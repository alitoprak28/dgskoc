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
  | "seviye"
  | "oynat"
  | "kronometre"
  | "takvim"
  | "grup"
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
  seviye: <path d="M5 20v-5M10 20V11M15 20V7M20 20V3" />,
  grup: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15.5 5.8a3 3 0 0 1 0 5.6M17.5 14.3c2 .6 3 2.3 3 4.7" />
    </>
  ),
  takvim: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17M8 14h3" />
    </>
  ),
  kronometre: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.6 2M9.5 3h5M12 3v2.5" />
    </>
  ),
  oynat: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10 9.2 4.8 2.8-4.8 2.8z" />
    </>
  ),
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
