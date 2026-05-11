import { Race } from "@/data/championship";
import { useEffect, useState } from "react";

const calculateCountdown = (targetDate: Date) => {
  const timeDiff = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(timeDiff / 86400000);
  const hours = Math.floor((timeDiff % 86400000) / 3600000);
  const minutes = Math.floor((timeDiff % 3600000) / 60000);
  const seconds = Math.floor((timeDiff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

// "04/06/2026" → "2026-06-04"
const parseRaceDate = (date: string, time: string): Date => {
  const formattedDate = date.split("/").reverse().join("-");
  return new Date(`${formattedDate}T${time}:00`);
};

export const RaceCountdown = ({ race }: { race: Race }) => {
  const [targetDate] = useState(() => parseRaceDate(race.data_prova, race.horario));
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate));

  useEffect(() => {
    const intervalId = window.setInterval(() => setCountdown(calculateCountdown(targetDate)), 1000);
    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const countdownCells = [
    { value: countdown.days, label: "Dias" },
    { value: countdown.hours, label: "Hrs" },
    { value: countdown.minutes, label: "Min" },
    { value: countdown.seconds, label: "Seg" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 font-display">
      {countdownCells.map((cell, index) => (
        <div
          key={cell.label}
          className={`flex flex-col items-center bg-tarmac/80 backdrop-blur-md border border-border px-3 sm:px-4 py-2 sm:py-3 min-w-[64px] sm:min-w-[88px] ${
            index === countdownCells.length - 1 ? "border-primary/60" : ""
          }`}
        >
          <span className={`text-3xl sm:text-5xl font-bold tabular-nums ${index === countdownCells.length - 1 ? "text-primary" : "text-foreground"}`}>
            {String(cell.value).padStart(2, "0")}
          </span>
          <span className={`text-[10px] uppercase tracking-widest mt-1 ${index === countdownCells.length - 1 ? "text-primary/70" : "text-muted-foreground"}`}>{cell.label}</span>
        </div>
      ))}
    </div>
  );
};
