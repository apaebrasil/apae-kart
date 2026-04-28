export const Footer = () => (
  <footer className="border-t border-border bg-asphalt mt-20">
    <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="w-3 h-8 bg-primary skew-tag" />
        <div>
          <div className="font-display font-bold text-xl uppercase tracking-widest text-foreground">
            Mais<span className="text-primary">Kart</span>Fan
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Campeonato Amador de Kart // Temporada 2026
          </div>
        </div>
      </div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        © 2026 Mais Kart Fan · Feito para o paddock
      </div>
    </div>
    <div className="h-2 bg-checker opacity-50" />
  </footer>
);
