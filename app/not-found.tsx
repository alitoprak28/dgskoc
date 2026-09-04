import { Bolum } from "@/components/Bolum";
import { ButonLink } from "@/components/Buton";
import { bulunamadi } from "@/data/icerik";

export default function Bulunamadi() {
  return (
    <Bolum className="py-16 md:py-24">
      <p className="text-sm font-semibold text-gray-text">{bulunamadi.kod}</p>
      <h1 className="mt-2 max-w-xl text-2xl font-extrabold leading-tight text-navy md:text-3xl">
        {bulunamadi.baslik}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-text">{bulunamadi.aciklama}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <ButonLink href="/">{bulunamadi.anasayfa}</ButonLink>
        <ButonLink href="/koclarimiz" gorunum="ikincil">
          {bulunamadi.koclar}
        </ButonLink>
      </div>
    </Bolum>
  );
}
