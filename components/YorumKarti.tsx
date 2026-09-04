import { Avatar } from "@/components/Avatar";
import { Kart } from "@/components/Kart";
import type { Yorum } from "@/data/yorumlar";

export function YorumKarti({ yorum }: { yorum: Yorum }) {
  return (
    <Kart className="flex h-full flex-col bg-white">
      <p className="flex-1 text-sm leading-relaxed text-navy">{yorum.metin}</p>
      <div className="mt-4 flex items-center gap-3 border-t border-gray-border pt-3">
        <Avatar foto={yorum.foto} ad={yorum.ad} className="h-10 w-10 rounded-full" ikonClassName="h-5 w-5" />
        <div>
          <p className="text-sm font-semibold text-navy">{yorum.ad}</p>
          <p className="text-xs text-gray-text">
            {yorum.bolum ? `${yorum.universite}, ${yorum.bolum}` : yorum.universite}
          </p>
        </div>
      </div>
    </Kart>
  );
}
