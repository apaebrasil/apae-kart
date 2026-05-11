import { JSONResults } from "@/data/championship";

interface Props {
  limit?: number;
  compact?: boolean;
  list: JSONResults[] | undefined;
}

export const StandingsTable = ({ limit, compact = false, list }: Props) => {
  const gridCols = compact ? "grid-cols-[40px_1fr_60px]" : "grid-cols-[40px_1fr_90px_90px]";

  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <div className={`grid ${gridCols} px-4 py-2 text-muted-foreground font-display uppercase tracking-widest text-xs gap-2`}>
        <div>Pos</div>
        <div>Piloto / Equipe</div>
        {!compact && <div className="text-right">Tempo</div>}
        <div className="text-right">Pts</div>
      </div>

      {list?.map((driver, index) => (
        <div key={index} className={`grid ${gridCols} items-center px-4 py-3 bg-tarmac border-l-4 border-volt group hover:bg-secondary transition-colors gap-2 animate-fade-in`}>
          {/* Position */}
          <div className={`font-display text-xl font-bold ${driver.colocacao === "1" ? "text-volt" : driver.colocacao <= "3" ? "text-foreground" : "text-muted-foreground"}`}>
            {driver.colocacao}
          </div>

          {/* Driver name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="text-foreground font-semibold uppercase tracking-wide truncate text-sm">{driver.atleta}</span>
            </div>
          </div>

          {/* Tempo — hidden on compact */}
          {!compact && <div className="text-right font-display text-base font-bold tabular-nums text-muted-foreground">{driver.tempo}</div>}

          {/* Points */}
          <div className="text-right font-display text-xl font-bold tabular-nums text-foreground">{driver.pontuacao}</div>
        </div>
      ))}
    </div>
  );
};
