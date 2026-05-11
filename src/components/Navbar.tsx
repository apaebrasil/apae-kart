import { NavLink, Link } from "react-router-dom";
import { Flag } from "lucide-react";

const links = [
  { to: "/", label: "Ao Vivo" },
  { to: "/standings", label: "Classificação" },
  { to: "/drivers", label: "Pilotos" },
  { to: "/calendar", label: "Calendário" },
  { to: "/news", label: "Notícias" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-asphalt/90 backdrop-blur-md">
      <nav className="container flex items-center justify-between py-3 gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-3 h-8 bg-primary skew-tag" aria-hidden />
          <span className="font-display font-bold text-2xl tracking-widest uppercase text-foreground">KART FENAPAES</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 font-display uppercase tracking-widest text-sm font-semibold">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `px-4 py-2 transition-colors relative ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 font-display uppercase tracking-widest text-xs text-foreground">
          <span className="size-2 rounded-full bg-volt shadow-volt animate-pulse" />
          <Flag className="size-3 text-volt" />
          Tempo Real
        </div>
      </nav>
    </header>
  );
};
