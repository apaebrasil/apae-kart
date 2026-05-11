import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RaceCountdown } from "@/components/RaceCountdown";
import { StandingsTable } from "@/components/StandingsTable";
import { DriverCard } from "@/components/DriverCard";
import { NewsCard } from "@/components/NewsCard";
import { RaceCalendar } from "@/components/RaceCalendar";
import { SectionHeader } from "@/components/SectionHeader";
// import { getNextRace, getLastCompleted } from "@/data/championship";
import { Link } from "react-router-dom";
import heroTrack from "@/assets/hero-track.jpg";
import { ArrowRight, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataset } from "@/api/fetch-dataset";
import { Driver, JSONResults, News, Race, RaceResult, Results } from "@/data/championship";

export function Index() {
  const { data: news, isLoading: isNewsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchDataset<News>({ datasetId: "cadNoticiasKart" }),
  });

  const { data: races, isLoading: isRacesLoading } = useQuery({
    queryKey: ["races"],
    queryFn: () => fetchDataset<Race>({ datasetId: "cadKartProva" }),
  });

  const { data: drivers, isLoading: isDriversLoading } = useQuery({
    queryKey: ["pilots"],
    queryFn: () => fetchDataset<Driver>({ datasetId: "cadPilotosKart" }),
  });

  const { data: results, isLoading: isResultsLoading } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const responseResults = await fetchDataset<Results>({ datasetId: "cadResultadosKart" });
      return JSON.parse(responseResults.items[0].json_resultados) as JSONResults[];
    },
  });

  console.log("results: ", results);

  if (!races || !drivers || !news || !results) {
    return null;
  }

  const getNextRace = (): Race | undefined => races.items.find((race) => race.status === "ATIVO");
  const nextRace = getNextRace();

  if (!nextRace) {
    return null;
  }

  const formtedDate = nextRace.data_prova.split("/").reverse().join("-");

  return (
    <div className="min-h-dvh bg-asphalt text-foreground flex flex-col">
      <Navbar />

      {/* Live ticker */}
      <div className="border-b border-border bg-tarmac overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap font-mono text-xs uppercase tracking-widest py-2 text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8 px-4 shrink-0">
              <span className="flex items-center gap-2">
                <span className="size-2 bg-volt animate-pulse" /> TEMPO REAL ATIVO
              </span>
              <span>
                TEMP. PISTA <span className="text-foreground">32.4°C</span>
              </span>
              <span>
                VENTO <span className="text-foreground">12 KM/H NE</span>
              </span>
              <span>
                VOLTA MAIS RÁPIDA <span className="text-volt">M. KOWALSKI 00:41.992</span>
              </span>
              <span>
                LÍDER DO CAMPEONATO <span className="text-foreground">E. VANCE</span>
              </span>
              <span>
                PRÓXIMA PROVA <span className="text-primary">{nextRace?.titulo.toUpperCase()}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[560px] border-b border-border overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={heroTrack} alt="Pista de Kart" width={1600} height={900} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/70 to-transparent" />
        </div>

        {/* 5 red lights */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden md:flex gap-3 bg-asphalt/60 backdrop-blur-md p-3 border border-border skew-tag">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="size-5 rounded-full bg-primary shadow-red animate-pulse-red skew-x-12" />
          ))}
        </div>

        <div className="container relative z-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 animate-fade-in">
            <div className="font-display text-primary font-bold uppercase tracking-widest text-base mb-3 flex items-center gap-2">
              Etapa {String(nextRace?.id).padStart(2, "0")} <span className="text-muted-foreground">//</span> {nextRace?.local_prova.toUpperCase()}
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-foreground font-bold uppercase leading-[0.9] tracking-tight skew-tag">
              <span>
                {nextRace?.titulo.split(" ").slice(0, -1).join(" ")}
                <br />
                <span className="text-primary">{nextRace?.titulo.split(" ").slice(-1).join(" ")}</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground text-base">
              Acompanhe o KART FENAPAES 2026 — classificações ao vivo, melhores voltas, calendário completo e perfis dos pilotos do paddock amador mais competitivo da temporada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/standings"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display uppercase tracking-widest text-sm font-bold px-6 py-3 hover:bg-primary/90 transition-all hover:gap-3 skew-tag"
              >
                <span>Ver Classificação</span>
                <ArrowRight style={{ transform: "skewX(12deg)" }} className="size-4" />
              </Link>
              <Link
                to="/calendar"
                className="inline-flex items-center gap-2 border border-border text-foreground font-display uppercase tracking-widest text-sm font-bold px-6 py-3 hover:border-foreground transition-colors"
              >
                Calendário Completo
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-slide-in-right">
            <div className="bg-tarmac/80 backdrop-blur-md border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">// Início da Prova</span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-volt">
                  <span className="size-2 bg-volt animate-pulse" /> SINCRONIZADO
                </span>
              </div>
              {nextRace && <RaceCountdown race={nextRace} />}
              <div className="mt-5 pt-5 border-t border-border font-mono text-xs text-muted-foreground flex justify-between">
                <span>{new Date(formtedDate).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}</span>
                <span className="text-foreground">{nextRace?.horario} BRT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom kerb */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-checker" />
      </section>

      {/* STANDINGS + LAST RACE */}
      <section className="container py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12">
          <SectionHeader
            eyebrow="Campeonato Ao Vivo"
            title="Classificação Geral"
            accent="volt"
            action={
              <Link
                to="/standings"
                className="hidden sm:inline-flex items-center gap-2 font-display uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Tabela completa <ArrowRight className="size-3" />
              </Link>
            }
          />

          <div>
            <div className="space-y-2">
              {results.slice(0, 5).map((result) => (
                <div key={result.atleta} className="flex items-center gap-4 p-4 bg-tarmac border border-border">
                  <div
                    className={`font-display text-3xl font-bold w-8 ${result.colocacao === "1" ? "text-podium-gold" : result.colocacao === "2" ? "text-podium-silver" : "text-podium-bronze"}`}
                  >
                    {result.colocacao}
                  </div>
                  {/* <div className="size-12 bg-secondary border border-border overflow-hidden shrink-0">
                  <img src={result.driver.photo} alt={result.driver.name} loading="lazy" className="w-full h-full object-cover object-top" />
                </div> */}
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg uppercase tracking-tight font-bold truncate">{result.atleta}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-foreground tabular-nums flex items-center gap-1 justify-end">
                      <Zap className="size-3 text-volt" /> {result.colocacao}
                    </div>
                    <div className="font-display text-lg font-bold text-volt">+{result.pontuacao} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DRIVERS */}
      <section className="container py-10">
        <SectionHeader
          eyebrow="No Grid"
          title="Pilotos do Campeonato"
          action={
            <Link
              to="/drivers"
              className="hidden sm:inline-flex items-center gap-2 font-display uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Todos os pilotos <ArrowRight className="size-3" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers.items.map((driver, i) => (
            <DriverCard key={driver.id} driver={driver} position={i + 1} />
          ))}
        </div>
      </section>

      {/* NEWS + CALENDAR */}
      <section className="container py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow="Notícias do Paddock" title="Últimas Notícias" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.items.slice(0, 2).map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <SectionHeader eyebrow="Calendário" title="Próximas Provas" accent="volt" />
          <RaceCalendar races={races.items} limit={3} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
