import type { Driver } from "@/data/championship";

interface Props {
  driver: Driver;
  position?: number;
}

export const DriverCard = ({ driver, position }: Props) => {
  return (
    <article className={`group relative h-[380px] bg-tarmac border border-border overflow-hidden cursor-pointer transition-all duration-500`}>
      {/* Background photo */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src={driver.url_foto}
          alt={driver.nome}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover object-top mix-blend-luminosity opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:mix-blend-normal transition-all duration-700 ease-out"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-transparent group-hover:via-asphalt/30 transition-all duration-500" />

      {/* Big driver number watermark */}
      <div
        className={`absolute top-2 right-3 font-display text-[150px] leading-none font-bold text-foreground/5 group-hover:text-foreground/20 transition-colors duration-500 select-none skew-tag`}
        aria-hidden
      >
        <span>{String(driver.documentid).padStart(2, "0")}</span>
      </div>

      {/* Position badge */}
      {position !== undefined && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-volt text-asphalt font-display font-bold text-xs px-2 py-1 uppercase tracking-widest">P{String(position).padStart(2, "0")}</div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
          <span className={`inline-block w-2 h-2`} />
          {driver.status}
        </div>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground skew-tag">
          <span>{driver.nome}</span>
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-checker opacity-30" />
    </article>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: number; accent: string }) => (
  <div className="bg-asphalt/60 border border-border p-2 backdrop-blur-sm">
    <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`font-display text-xl font-bold tabular-nums ${accent}`}>{value}</div>
  </div>
);
