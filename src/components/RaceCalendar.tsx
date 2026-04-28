import { races } from "@/data/championship";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

const statusBadge: Record<string, { label: string; cls: string }> = {
  completed: { label: "Realizada", cls: "bg-secondary text-muted-foreground" },
  upcoming: { label: "Próxima", cls: "bg-primary text-primary-foreground" },
  live: { label: "Ao Vivo", cls: "bg-volt text-asphalt animate-pulse" },
};

interface Props {
  limit?: number;
}

export const RaceCalendar = ({ limit }: Props) => {
  const list = limit ? races.slice(0, limit) : races;
  const nextIdx = list.findIndex((r) => r.status === "upcoming");

  return (
    <div className="flex flex-col gap-2">
      {list.map((r, i) => {
        const isNext = i === nextIdx;
        return (
          <div
            key={r.id}
            className={`grid grid-cols-[60px_1fr_auto] gap-4 items-center p-4 bg-tarmac border transition-all ${
              isNext ? "border-primary glow-red" : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex flex-col items-center justify-center bg-asphalt border border-border py-2">
              <div className="font-mono text-[10px] text-muted-foreground uppercase">
                {new Date(r.date).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
              </div>
              <div className="font-display text-2xl font-bold text-foreground tabular-nums leading-none">
                {new Date(r.date).getDate().toString().padStart(2, "0")}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Etapa {String(r.round).padStart(2, "0")}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 ${statusBadge[r.status].cls}`}>
                  {statusBadge[r.status].label}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-foreground tracking-tight truncate">
                {r.name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><MapPin className="size-3" />{r.location}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" />{r.time}</span>
                <span className="flex items-center gap-1"><Calendar className="size-3" />{new Date(r.date).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>

            {r.mapsQuery && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 font-display uppercase text-xs tracking-widest text-foreground hover:text-primary transition-colors px-3 py-2 border border-border hover:border-primary"
              >
                Mapa <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};
