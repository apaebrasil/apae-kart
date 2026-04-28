import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { DriverCard } from "@/components/DriverCard";
import { drivers } from "@/data/championship";

const Drivers = () => (
  <div className="min-h-dvh bg-asphalt flex flex-col">
    <Navbar />
    <main className="container py-12 flex-1">
      <SectionHeader eyebrow="Elenco 2026" title="Pilotos do Campeonato" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {drivers.map((d, i) => (
          <DriverCard key={d.id} driver={d} position={i + 1} />
        ))}
      </div>

      <div className="mt-16">
        <SectionHeader eyebrow="Bio" title="Perfis Detalhados" accent="volt" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {drivers.map((d) => (
            <article key={d.id} className="flex gap-5 bg-tarmac border border-border p-5">
              <div className="size-32 shrink-0 bg-secondary border border-border overflow-hidden">
                <img src={d.photo} alt={d.name} loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">#{String(d.number).padStart(2, "0")} · {d.team}</div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">{d.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{d.bio}</p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {(["speed", "consistency", "aggression"] as const).map((k) => (
                    <div key={k} className="bg-asphalt border border-border p-2">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k.slice(0, 3).toUpperCase()}</div>
                      <div className="font-display text-xl font-bold text-volt">{d.attributes[k]}</div>
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

export default Drivers;
