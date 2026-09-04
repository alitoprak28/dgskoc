import { cn } from "@/lib/utils";

type Zemin = "beyaz" | "gri" | "lacivert";

const zeminler: Record<Zemin, string> = {
  beyaz: "bg-white",
  gri: "bg-gray-bg",
  lacivert: "bg-navy text-white",
};

type BolumProps = {
  zemin?: Zemin;
  className?: string;
  icClassName?: string;
  /** Dikey bosluk gerekmeyen ozel bolumlerde kapatilir */
  boslukYok?: boolean;
  id?: string;
  children: React.ReactNode;
};

/** Sayfa bolumu: tam genislik zemin + ortalanmis icerik kapsayicisi */
export function Bolum({
  zemin = "beyaz",
  className,
  icClassName,
  boslukYok = false,
  id,
  children,
}: BolumProps) {
  return (
    <section id={id} className={cn(zeminler[zemin], !boslukYok && "py-10 md:py-16", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", icClassName)}>{children}</div>
    </section>
  );
}

type BolumBasligiProps = {
  baslik: string;
  /** Sayfanin ana basligi h1, bolum basliklari h2 */
  seviye?: 1 | 2;
  aciklama?: string;
  /** Koyu zeminde renkleri cevirir */
  koyuZemin?: boolean;
  className?: string;
  /** Basligin sagindaki baglanti alani (orn. "Tümünü gör") */
  yan?: React.ReactNode;
};

export function BolumBasligi({
  baslik,
  seviye = 2,
  aciklama,
  koyuZemin = false,
  className,
  yan,
}: BolumBasligiProps) {
  const Baslik = seviye === 1 ? "h1" : "h2";

  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4 md:mb-8", className)}>
      <div>
        <Baslik
          className={cn(
            "text-xl font-extrabold leading-tight md:text-2xl",
            koyuZemin ? "text-white" : "text-navy"
          )}
        >
          {baslik}
        </Baslik>
        {aciklama ? (
          <p
            className={cn(
              "mt-2 max-w-2xl text-sm leading-relaxed",
              koyuZemin ? "text-navy-soft" : "text-gray-text"
            )}
          >
            {aciklama}
          </p>
        ) : null}
      </div>
      {yan ? <div className="shrink-0">{yan}</div> : null}
    </div>
  );
}
