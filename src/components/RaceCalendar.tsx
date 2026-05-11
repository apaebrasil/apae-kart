import { Race } from "@/data/championship";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Props {
  limit?: number;
  races?: Race[];
}

export const RaceCalendar = ({ limit, races }: Props) => {
  const list = limit ? races?.slice(0, limit) : races;
  const nextIdx = list?.findIndex((r) => r.status === "ATIVO");

  return (
    <div className="flex flex-col gap-2">
      {list?.map((race, i) => {
        const isNext = i === nextIdx;
        const formattedDate = race.data_prova.split("/").reverse().join("-");
        return (
          <div
            key={race.documentid}
            className={`grid grid-cols-[60px_1fr_auto] gap-4 items-center p-4 bg-tarmac border transition-all ${
              isNext ? "border-primary glow-red" : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex flex-col items-center justify-center bg-asphalt border border-border py-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">
                {new Date(formattedDate).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Etapa {String(race.id).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-foreground tracking-tight truncate">{race.titulo}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {race.local_prova}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {race.horario}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(formattedDate).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
