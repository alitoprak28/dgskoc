import Link from "next/link";
import { cn } from "@/lib/utils";

type Gorunum = "birincil" | "ikincil" | "koyu-ikincil";

const gorunumler: Record<Gorunum, string> = {
  // Birincil: turuncu CTA
  birincil:
    "bg-orange text-white hover:brightness-95 focus-visible:ring-orange transition-[filter] duration-150",
  // Ikincil: acik zemin uzerinde lacivert cerceve
  ikincil:
    "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy transition-colors duration-150",
  // Koyu-ikincil: lacivert zemin uzerinde beyaz cerceve (hero)
  "koyu-ikincil":
    "border-[1.5px] border-white/45 text-white hover:bg-white hover:text-navy focus-visible:ring-white transition-colors duration-150",
};

const temel =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

type OrtakProps = {
  gorunum?: Gorunum;
  className?: string;
  children: React.ReactNode;
};

type ButonProps = OrtakProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Buton({ gorunum = "birincil", className, children, ...rest }: ButonProps) {
  return (
    <button className={cn(temel, gorunumler[gorunum], className)} {...rest}>
      {children}
    </button>
  );
}

type ButonLinkProps = OrtakProps & {
  href: string;
  hedefYeniSekme?: boolean;
  "aria-label"?: string;
};

export function ButonLink({
  gorunum = "birincil",
  className,
  children,
  href,
  hedefYeniSekme,
  ...rest
}: ButonLinkProps) {
  const disBaglanti = href.startsWith("http") || href.startsWith("tel:");
  const sinif = cn(temel, gorunumler[gorunum], className);

  if (disBaglanti) {
    return (
      <a
        href={href}
        className={sinif}
        {...(hedefYeniSekme ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sinif} {...rest}>
      {children}
    </Link>
  );
}
