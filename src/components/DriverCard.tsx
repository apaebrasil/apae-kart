import type { Driver } from "@/data/championship";

const teamAccent: Record<Driver["teamColor"], { border: string; text: string; shadow: string }> = {
  red: { border: "hover:border-primary", text: "text-primary", shadow: "hover:shadow-red" },
  volt: { border: "hover:border-volt", text: "text-volt", shadow: "hover:shadow-volt" },
  blue: { border: "hover:border-sky-500", text: "text-sky-400", shadow: "hover:shadow-[0_0_24px_hsl(210_100%_50%/0.4)]" },
  white: { border: "hover:border-foreground", text: "text-foreground", shadow: "hover:shadow-card" },
};

interface Props {
  driver: Driver;
  position?: number;
}

export const DriverCard = ({ driver, position }: Props) => {
  const accent = teamAccent[driver.teamColor];

  return (
    <article
      className={`group relative h-[380px] bg-tarmac border border-border overflow-hidden cursor-pointer transition-all duration-500 ${accent.border} ${accent.shadow}`}
    >
      {/* Background photo */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src={driver.photo}
          alt={driver.name}
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
        className={`absolute top-2 right-3 font-display text-[120px] leading-none font-bold text-foreground/5 group-hover:${accent.text.replace("text-", "text-")}/20 transition-colors duration-500 select-none skew-tag`}
        aria-hidden
      >
        <span>{String(driver.number).padStart(2, "0")}</span>
      </div>

      {/* Position badge */}
      {position !== undefined && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-volt text-asphalt font-display font-bold text-xs px-2 py-1 uppercase tracking-widest">
            P{String(position).padStart(2, "0")}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
          <span className={`inline-block w-2 h-2 ${driver.teamColor === "red" ? "bg-primary" : driver.teamColor === "volt" ? "bg-volt" : "bg-foreground"}`} />
          {driver.team}
        </div>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground skew-tag">
          <span>{driver.name}</span>
        </h3>

        {/* Hover-revealed attributes (FIFA-style) */}
        <div className="mt-3 grid grid-cols-3 gap-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500 overflow-hidden">
          <Stat label="SPD" value={driver.attributes.speed} accent={accent.text} />
          <Stat label="CON" value={driver.attributes.consistency} accent={accent.text} />
          <Stat label="AGR" value={driver.attributes.aggression} accent={accent.text} />
        </div>
      </div>

      {/* Bottom kerb */}
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
