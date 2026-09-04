import { Ikon, type IkonAdi } from "@/components/Ikon";
import { cn } from "@/lib/utils";

type IkonRozetProps = {
  ad: IkonAdi;
  /** Turuncu rozet yalnizca WhatsApp / aksiyon noktalarinda kullanilir */
  vurgulu?: boolean;
  className?: string;
};

export function IkonRozet({ ad, vurgulu = false, className }: IkonRozetProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-[9px] text-white",
        vurgulu ? "bg-orange" : "bg-navy",
        className
      )}
    >
      <Ikon ad={ad} />
    </span>
  );
}
