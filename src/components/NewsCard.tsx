import { News } from "@/data/championship";

export const NewsCard = ({ url_foto, criado_em, descricao, titulo, status }: News) => {
  return (
    <article className="group bg-tarmac border border-border hover:border-foreground/40 transition-all overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={url_foto}
          alt={titulo}
          loading="lazy"
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tarmac to-transparent" />
        <div className="absolute top-3 left-3 bg-asphalt/80 backdrop-blur-sm border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
          <span className="font-extrabold text-red-600">{status}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-zinc-300 font-medium uppercase tracking-widest">
          {new Date(criado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground leading-tight">{titulo}</h3>
        <p className="text-sm text-muted-foreground flex-1">{descricao}</p>

        {/* <div className="flex items-center gap-2 text-foreground font-display uppercase tracking-widest text-xs font-semibold pt-2 border-t border-border">
          Ler mais <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div> */}
      </div>
    </article>
  );
};
