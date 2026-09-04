import { cn } from "@/lib/utils";

const GIRDI =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

const kenarlik = (hatali: boolean) => (hatali ? "border-red-600" : "border-gray-border");

function Hata({ id, mesaj }: { id: string; mesaj?: string }) {
  if (!mesaj) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-600">
      {mesaj}
    </p>
  );
}

type OrtakProps = { ad: string; etiket: string; hata?: string };

type MetinProps = OrtakProps & {
  deger: string;
  degisti: (deger: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id" | "name">;

export function MetinAlani({ ad, etiket, hata, deger, degisti, ...rest }: MetinProps) {
  const hataId = `${ad}-hata`;
  return (
    <div>
      <label htmlFor={ad} className="block text-sm text-navy">
        {etiket}
      </label>
      <input
        id={ad}
        name={ad}
        value={deger}
        onChange={(olay) => degisti(olay.target.value)}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata ? hataId : undefined}
        className={cn(GIRDI, kenarlik(Boolean(hata)), "mt-1.5")}
        {...rest}
      />
      <Hata id={hataId} mesaj={hata} />
    </div>
  );
}

type SecimProps = OrtakProps & {
  deger: string;
  degisti: (deger: string) => void;
  yerTutucu: string;
  secenekler: { deger: string; etiket: string }[];
};

export function SecimAlani({
  ad,
  etiket,
  hata,
  deger,
  degisti,
  yerTutucu,
  secenekler,
}: SecimProps) {
  const hataId = `${ad}-hata`;
  return (
    <div>
      <label htmlFor={ad} className="block text-sm text-navy">
        {etiket}
      </label>
      <select
        id={ad}
        name={ad}
        value={deger}
        onChange={(olay) => degisti(olay.target.value)}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata ? hataId : undefined}
        className={cn(GIRDI, kenarlik(Boolean(hata)), "mt-1.5")}
      >
        <option value="">{yerTutucu}</option>
        {secenekler.map((secenek) => (
          <option key={secenek.deger} value={secenek.deger}>
            {secenek.etiket}
          </option>
        ))}
      </select>
      <Hata id={hataId} mesaj={hata} />
    </div>
  );
}

type RadyoProps = OrtakProps & {
  deger: string;
  degisti: (deger: string) => void;
  secenekler: string[];
};

export function RadyoGrubu({ ad, etiket, hata, deger, degisti, secenekler }: RadyoProps) {
  const hataId = `${ad}-hata`;
  return (
    <fieldset
      id={ad}
      aria-describedby={hata ? hataId : undefined}
      aria-invalid={hata ? true : undefined}
    >
      <legend className="text-sm text-navy">{etiket}</legend>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {secenekler.map((secenek) => (
          <label key={secenek} className="flex items-center gap-2 text-sm text-navy">
            <input
              type="radio"
              name={ad}
              value={secenek}
              checked={deger === secenek}
              onChange={() => degisti(secenek)}
              className="h-4 w-4 accent-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            />
            {secenek}
          </label>
        ))}
      </div>
      <Hata id={hataId} mesaj={hata} />
    </fieldset>
  );
}
