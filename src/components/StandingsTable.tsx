import { calcStandings, drivers, results } from "@/data/championship";
import { Trophy, Zap } from "lucide-react";

interface Props {
  limit?: number;
  compact?: boolean;
}

const teamBar: Record<string, string> = {
  red: "bg-primary",
  volt: "bg-volt",
  blue: "bg-sky-500",
  white: "bg-foreground",
};

export const StandingsTable = ({ limit, compact = false }: Props) => {
  const standings = calcStandings(results, drivers);
  const list = limit ? standings.slice(0, limit) : standings;
  const leader = standings[0]?.points ?? 0;

  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <div className={`grid ${compact ? "grid-cols-[40px_1fr_60px]" : "grid-cols-[40px_1fr_70px_70px_70px_70px]"} px-4 py-2 text-muted-foreground font-display uppercase tracking-widest text-xs gap-2`}>
        <div>Pos</div>
        <div>Piloto / Equipe</div>
        {!compact && <div className="text-right">Vit</div>}
        {!compact && <div className="text-right">Pod</div>}
        {!compact && <div className="text-right">FL</div>}
        <div className="text-right">Pts</div>
      </div>

      {list.map((s, idx) => {
        const gap = leader - s.points;
        const pos = idx + 1;
        return (
          <div
            key={s.driver.id}
            className={`grid ${compact ? "grid-cols-[40px_1fr_60px]" : "grid-cols-[40px_1fr_70px_70px_70px_70px]"} items-center px-4 py-3 bg-tarmac border-l-4 group hover:bg-secondary transition-colors gap-2 animate-fade-in`}
            style={{
              borderLeftColor: pos === 1 ? "hsl(var(--volt))" : `hsl(var(--${s.driver.teamColor === "red" ? "kerb-red" : s.driver.teamColor === "volt" ? "volt" : "border"}))`,
              animationDelay: `${idx * 60}ms`,
            }}
          >
            <div className={`font-display text-xl font-bold ${pos === 1 ? "text-volt" : pos <= 3 ? "text-foreground" : "text-muted-foreground"}`}>
              {pos}
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-9 bg-secondary shrink-0 overflow-hidden border border-border">
                <img src={s.driver.photo} alt={s.driver.name} loading="lazy" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-foreground font-semibold uppercase tracking-wide truncate text-sm">
                  {s.driver.name}
                </span>
                <span className="text-xs text-muted-foreground truncate flex items-center gap-2">
                  <span className={`inline-block w-1.5 h-1.5 ${teamBar[s.driver.teamColor]}`} />
                  {s.driver.team}
                </span>
              </div>
            </div>
            {!compact && (
              <div className="font-mono text-sm text-foreground text-right tabular-nums flex items-center justify-end gap-1">
                {s.wins > 0 && <Trophy className="size-3 text-podium-gold" />}
                {s.wins}
              </div>
            )}
            {!compact && <div className="font-mono text-sm text-muted-foreground text-right tabular-nums">{s.podiums}</div>}
            {!compact && (
              <div className="font-mono text-sm text-volt text-right tabular-nums flex items-center justify-end gap-1">
                {s.fastestLaps > 0 && <Zap className="size-3" />}
                {s.fastestLaps}
              </div>
            )}
            <div className="text-right">
              <div className="font-display text-xl font-bold tabular-nums text-foreground">{s.points}</div>
              {gap > 0 && <div className="font-mono text-[10px] text-primary">-{gap}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
