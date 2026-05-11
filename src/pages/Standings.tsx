import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { StandingsTable } from "@/components/StandingsTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataset } from "@/api/fetch-dataset";
import { JSONResults, Results } from "@/data/championship";
import { Zap } from "lucide-react";

export function Standings() {
  // const completed = races.filter((r) => r.status === "completed");
  const [tab, setTab] = useState<"general" | string>("general");

  const { data: results, isLoading: isResultsLoading } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const responseResults = await fetchDataset<Results>({ datasetId: "cadResultadosKart" });
      return JSON.parse(responseResults.items[0].json_resultados) as JSONResults[];
    },
  });

  return (
    <div className="min-h-dvh bg-asphalt flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <SectionHeader eyebrow="Campeonato Ao Vivo" title="Classificação" accent="volt" />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-2">
          <button
            onClick={() => setTab("general")}
            className={`px-4 py-2 font-display uppercase tracking-widest text-sm font-semibold transition-colors ${tab === "general" ? "text-foreground border-b-2 border-primary -mb-[10px]" : "text-muted-foreground hover:text-foreground"}`}
          >
            Geral
          </button>
          {/* {completed.map((r) => (
            <button
              key={r.id}
              onClick={() => setTab(r.id)}
              className={`px-4 py-2 font-display uppercase tracking-widest text-sm font-semibold transition-colors ${tab === r.id ? "text-foreground border-b-2 border-primary -mb-[10px]" : "text-muted-foreground hover:text-foreground"}`}
            >
              R{String(r.round).padStart(2, "0")} · {r.name}
            </button>
          ))} */}
        </div>

        {tab === "general" ? (
          <StandingsTable list={results} />
        ) : (
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-[40px_1fr_120px_80px] px-4 py-2 text-muted-foreground font-display uppercase tracking-widest text-xs gap-2">
              <div>Pos</div>
              <div>Piloto</div>
              <div className="text-right">Melhor Volta</div>
              <div className="text-right">Pts</div>
            </div>
            {results?.map((result, index) => (
              <div key={index} className="grid grid-cols-[40px_1fr_120px_80px] items-center px-4 py-3 bg-tarmac border-l-4 border-l-primary gap-2">
                <div
                  className={`font-display text-xl font-bold ${Number(result.colocacao) === 1 ? "text-podium-gold" : Number(result.colocacao) === 2 ? "text-podium-silver" : Number(result.colocacao) === 3 ? "text-podium-bronze" : "text-foreground"}`}
                >
                  {result.colocacao}
                </div>
                <div className="flex items-center gap-3">
                  {/* <div className="size-9 bg-secondary border border-border overflow-hidden">
                    <img src={result.driver.photo} alt="" className="w-full h-full object-cover object-top" />
                  </div> */}
                  <div>
                    <div className="font-display uppercase tracking-tight font-semibold">{result.atleta}</div>
                  </div>
                </div>
                <div className="font-mono text-sm text-foreground text-right tabular-nums flex items-center justify-end gap-1">
                  <Zap className="size-3 text-volt" />
                  {result.tempo}
                </div>
                <div className="font-display text-xl font-bold text-foreground text-right">{result.pontuacao}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
