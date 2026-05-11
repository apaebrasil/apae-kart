import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { DriverCard } from "@/components/DriverCard";
import { Driver } from "@/data/championship";
import { useQuery } from "@tanstack/react-query";
import { fetchDataset } from "@/api/fetch-dataset";

export function Drivers() {
  const { data: drivers } = useQuery({
    queryKey: ["pilots"],
    queryFn: async () => fetchDataset<Driver>({ datasetId: "cadPilotosKart" }),
  });

  return (
    <div className="min-h-dvh bg-asphalt flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <SectionHeader eyebrow="Elenco 2026" title="Pilotos do Campeonato" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers?.items.map((driver, i) => (
            <DriverCard key={driver.documentid} driver={driver} position={i + 1} />
          ))}
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Bio" title="Perfis Detalhados" accent="volt" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {drivers?.items.map((driver) => (
              <article key={driver.documentid} className="flex gap-5 bg-tarmac border border-border p-5">
                <div className="size-32 shrink-0 bg-secondary border border-border overflow-hidden">
                  <img src={driver.url_foto} alt={driver.nome} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    #{String(driver.documentid).padStart(2, "0")} · {driver.status}
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">{driver.nome}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{driver.descricao}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {(["speed", "consistency", "aggression"] as const).map((k) => (
                      <div key={k} className="bg-asphalt border border-border p-2">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k.slice(0, 3).toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
