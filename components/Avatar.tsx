import Image from "next/image";
import { Ikon } from "@/components/Ikon";
import { cn } from "@/lib/utils";

type AvatarProps = {
  foto: string;
  ad: string;
  className?: string;
  /** Yer tutucu ikon boyutu */
  ikonClassName?: string;
};

/** Fotograf gelmediyse (foto: "") yer tutucu kullanici ikonu gosterilir */
export function Avatar({ foto, ad, className, ikonClassName }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl bg-[#ECEEF2]",
        className
      )}
    >
      {foto ? (
        <Image src={foto} alt={ad} fill sizes="240px" className="object-cover" />
      ) : (
        <Ikon ad="kullanici" className={cn("h-8 w-8 text-[#B4BAC5]", ikonClassName)} />
      )}
    </div>
  );
}
