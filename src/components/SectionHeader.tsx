import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  accent?: "red" | "volt";
  action?: ReactNode;
}

export const SectionHeader = ({ eyebrow, title, accent = "red", action }: Props) => {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        {eyebrow && <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${accent === "red" ? "text-primary" : "text-volt"}`}>{eyebrow}</div>}
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground flex items-center gap-3">
          <span className={`w-2 h-7 skew-tag ${accent === "red" ? "bg-primary" : "bg-volt"}`} aria-hidden />
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
};
