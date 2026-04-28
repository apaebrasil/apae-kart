import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { RaceCalendar } from "@/components/RaceCalendar";

const CalendarPage = () => (
  <div className="min-h-dvh bg-asphalt flex flex-col">
    <Navbar />
    <main className="container py-12 flex-1">
      <SectionHeader eyebrow="Calendário 2026" title="Calendário de Provas" accent="volt" />
      <RaceCalendar />
    </main>
    <Footer />
  </div>
);

export default CalendarPage;
