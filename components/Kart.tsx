import Link from "next/link";
import { cn } from "@/lib/utils";

type KartProps = {
  className?: string;
  children: React.ReactNode;
  /** Dolu ise kartin tamami tiklanabilir olur */
  href?: string;
};

export function Kart({ className, children, href }: KartProps) {
  const sinif = cn("rounded-xl border border-gray-border bg-gray-bg p-4 md:p-5", className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          sinif,
          "block transition-colors duration-150 hover:border-navy/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        )}
      >
        {children}
      </Link>
    );
  }

  return <div className={sinif}>{children}</div>;
}
