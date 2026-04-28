import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tag: string;
}

export const NewsCard = ({ title, excerpt, image, date, tag }: Props) => {
  return (
    <article className="group bg-tarmac border border-border hover:border-foreground/40 transition-all overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tarmac to-transparent" />
        <div className="absolute top-3 left-3 bg-asphalt/80 backdrop-blur-sm border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          {tag}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          {new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground flex-1">{excerpt}</p>
        <div className="flex items-center gap-2 text-foreground font-display uppercase tracking-widest text-xs font-semibold pt-2 border-t border-border">
          Ler mais <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};
