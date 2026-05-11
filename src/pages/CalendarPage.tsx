import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { RaceCalendar } from "@/components/RaceCalendar";
import { useQuery } from "@tanstack/react-query";
import { fetchDataset } from "@/api/fetch-dataset";
import { Race } from "@/data/championship";

export function CalendarPage() {
  const { data: calendarData } = useQuery({
    queryKey: ["calendar"],
    queryFn: async () => fetchDataset<Race>({ datasetId: "cadKartProva" }),
  });

  return (
    <div className="min-h-dvh bg-asphalt flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <SectionHeader eyebrow="Calendário 2026" title="Calendário de Provas" accent="volt" />
        <RaceCalendar races={calendarData?.items || []} />
      </main>
      <Footer />
    </div>
  );
}
