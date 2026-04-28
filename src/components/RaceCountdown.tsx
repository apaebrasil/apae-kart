import { useEffect, useState } from "react";
import type { Race } from "@/data/championship";

const calc = (target: Date) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hrs, mins, secs };
};

interface Props {
  race: Race;
}

export const RaceCountdown = ({ race }: Props) => {
  const [target] = useState(() => new Date(`${race.date}T${race.time}:00`));
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    const id = window.setInterval(() => setT(calc(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { v: t.days, l: "Dias" },
    { v: t.hrs, l: "Hrs" },
    { v: t.mins, l: "Min" },
    { v: t.secs, l: "Seg" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 font-display">
      {cells.map((c, i) => (
        <div
          key={c.l}
          className={`flex flex-col items-center bg-tarmac/80 backdrop-blur-md border border-border px-3 sm:px-4 py-2 sm:py-3 min-w-[64px] sm:min-w-[88px] ${i === cells.length - 1 ? "border-primary/60" : ""}`}
        >
          <span className={`text-3xl sm:text-5xl font-bold tabular-nums ${i === cells.length - 1 ? "text-primary" : "text-foreground"}`}>
            {String(c.v).padStart(2, "0")}
          </span>
          <span className={`text-[10px] uppercase tracking-widest mt-1 ${i === cells.length - 1 ? "text-primary/70" : "text-muted-foreground"}`}>
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
};
