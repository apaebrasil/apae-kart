// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { SectionHeader } from "@/components/SectionHeader";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { races, results } from "@/data/championship";
// import { Lock, Plus, Trophy, Zap, Newspaper } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// const Admin = () => {
//   const [authed, setAuthed] = useState(false);
//   const [pw, setPw] = useState("");

//   if (!authed) {
//     return (
//       <div className="min-h-dvh bg-asphalt flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center container py-20">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (pw === "admin") setAuthed(true);
//               else toast.error("Acesso negado", { description: "Senha incorreta. (Demo: 'admin')" });
//             }}
//             className="w-full max-w-md bg-tarmac border border-border p-8"
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-3 h-8 bg-primary skew-tag" />
//               <div>
//                 <div className="font-mono text-[10px] uppercase tracking-widest text-primary">// Restrito</div>
//                 <h1 className="font-display text-3xl font-bold uppercase tracking-tight flex items-center gap-2">
//                   <Lock className="size-6" /> Painel da Direção
//                 </h1>
//               </div>
//             </div>
//             <p className="text-sm text-muted-foreground mb-6">
//               Área restrita à direção de prova. Use a senha de demonstração <code className="text-volt font-mono">admin</code>.
//             </p>
//             <Label htmlFor="pw" className="font-display uppercase tracking-widest text-xs">
//               Senha
//             </Label>
//             <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-2 bg-asphalt" />
//             <Button type="submit" className="w-full mt-6 font-display uppercase tracking-widest">
//               Acessar Painel
//             </Button>
//           </form>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return <AdminDashboard onLogout={() => setAuthed(false)} />;
// };

// const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
//   const standings = calcStandings(results, drivers);
//   const [section, setSection] = useState<"overview" | "drivers" | "results" | "news">("overview");

//   return (
//     <div className="min-h-dvh bg-asphalt flex flex-col">
//       <Navbar />
//       <main className="container py-12 flex-1">
//         <div className="flex items-end justify-between mb-8">
//           <SectionHeader eyebrow="Direção de Prova" title="Painel de Administração" accent="volt" />
//           <Button variant="outline" onClick={onLogout} className="font-display uppercase tracking-widest text-xs">
//             Sair
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           <aside className="lg:col-span-3 space-y-1">
//             {[
//               { id: "overview", label: "Visão Geral", icon: Trophy },
//               { id: "drivers", label: "Cadastrar Piloto", icon: Plus },
//               { id: "results", label: "Lançar Resultados", icon: Zap },
//               { id: "news", label: "Postar Notícia", icon: Newspaper },
//             ].map((it) => {
//               const Icon = it.icon;
//               const active = section === it.id;
//               return (
//                 <button
//                   key={it.id}
//                   onClick={() => setSection(it.id as typeof section)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 font-display uppercase tracking-widest text-sm transition-colors border-l-4 ${active ? "bg-tarmac border-l-primary text-foreground" : "border-l-transparent text-muted-foreground hover:bg-tarmac hover:text-foreground"}`}
//                 >
//                   <Icon className="size-4" /> {it.label}
//                 </button>
//               );
//             })}
//           </aside>

//           <div className="lg:col-span-9 space-y-6">
//             {section === "overview" && (
//               <>
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                   <Stat label="Pilotos" value={drivers.length} accent="text-foreground" />
//                   <Stat label="Provas Realizadas" value={races.filter((r) => r.status === "completed").length} accent="text-foreground" />
//                   <Stat label="Próximas Provas" value={races.filter((r) => r.status === "upcoming").length} accent="text-volt" />
//                   <Stat label="Líder" value={standings[0]?.driver.name.split(" ")[0] ?? "—"} accent="text-primary" small />
//                 </div>
//                 <div className="bg-tarmac border border-border p-6">
//                   <h3 className="font-display text-xl uppercase tracking-tight font-bold mb-4">Top 3 Geral</h3>
//                   <div className="space-y-2">
//                     {standings.slice(0, 3).map((s, i) => (
//                       <div key={s.driver.id} className="flex items-center gap-4 p-3 bg-asphalt border border-border">
//                         <div className={`font-display text-2xl font-bold ${i === 0 ? "text-podium-gold" : i === 1 ? "text-podium-silver" : "text-podium-bronze"}`}>{i + 1}</div>
//                         <div className="flex-1 font-display uppercase tracking-tight">{s.driver.name}</div>
//                         <div className="font-display text-lg font-bold">{s.points} pts</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}

//             {section === "drivers" && <DriverForm />}
//             {section === "results" && <ResultForm />}
//             {section === "news" && <NewsForm />}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// const Stat = ({ label, value, accent, small }: { label: string; value: string | number; accent: string; small?: boolean }) => (
//   <div className="bg-tarmac border border-border p-5">
//     <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
//     <div className={`font-display ${small ? "text-2xl" : "text-4xl"} font-bold mt-1 ${accent}`}>{value}</div>
//   </div>
// );

// const DriverForm = () => {
//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Piloto cadastrado", { description: "Card de atributos gerado automaticamente." });
//     (e.target as HTMLFormElement).reset();
//   };
//   return (
//     <form onSubmit={onSubmit} className="bg-tarmac border border-border p-6 space-y-4">
//       <h3 className="font-display text-xl uppercase tracking-tight font-bold">Novo Piloto</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Field label="Nome" id="name" />
//         <Field label="Número" id="num" type="number" />
//         <Field label="Equipe" id="team" />
//         <Field label="URL da Foto" id="photo" />
//       </div>
//       <div>
//         <Label htmlFor="bio" className="font-display uppercase tracking-widest text-xs">
//           Bio
//         </Label>
//         <Textarea id="bio" className="mt-2 bg-asphalt" rows={3} />
//       </div>
//       <Button type="submit" className="font-display uppercase tracking-widest">
//         Cadastrar Piloto
//       </Button>
//     </form>
//   );
// };

// const ResultForm = () => {
//   const upcoming = races.filter((r) => r.status === "upcoming");
//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Resultado lançado", { description: "Pontuação calculada automaticamente." });
//   };
//   return (
//     <form onSubmit={onSubmit} className="bg-tarmac border border-border p-6 space-y-4">
//       <h3 className="font-display text-xl uppercase tracking-tight font-bold">Lançar Resultado da Etapa</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label className="font-display uppercase tracking-widest text-xs">Prova</Label>
//           <Select>
//             <SelectTrigger className="mt-2 bg-asphalt">
//               <SelectValue placeholder="Selecione a prova" />
//             </SelectTrigger>
//             <SelectContent>
//               {upcoming.map((r) => (
//                 <SelectItem key={r.id} value={r.id}>
//                   R{r.round} · {r.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label className="font-display uppercase tracking-widest text-xs">Piloto</Label>
//           <Select>
//             <SelectTrigger className="mt-2 bg-asphalt">
//               <SelectValue placeholder="Selecione o piloto" />
//             </SelectTrigger>
//             <SelectContent>
//               {drivers.map((d) => (
//                 <SelectItem key={d.id} value={d.id}>
//                   #{d.number} {d.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <Field label="Posição Final" id="pos" type="number" min={1} max={20} />
//         <Field label="Melhor Volta (mm:ss.mmm)" id="bl" placeholder="00:42.318" />
//       </div>
//       <Button type="submit" className="font-display uppercase tracking-widest">
//         Lançar Resultado
//       </Button>
//     </form>
//   );
// };

// const NewsForm = () => {
//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Notícia publicada");
//   };
//   return (
//     <form onSubmit={onSubmit} className="bg-tarmac border border-border p-6 space-y-4">
//       <h3 className="font-display text-xl uppercase tracking-tight font-bold">Nova Notícia</h3>
//       <Field label="Título" id="title" />
//       <Field label="URL da Imagem" id="img" />
//       <div>
//         <Label htmlFor="content" className="font-display uppercase tracking-widest text-xs">
//           Conteúdo
//         </Label>
//         <Textarea id="content" className="mt-2 bg-asphalt" rows={6} />
//       </div>
//       <Button type="submit" className="font-display uppercase tracking-widest">
//         Publicar Notícia
//       </Button>
//     </form>
//   );
// };

// const Field = ({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
//   <div>
//     <Label htmlFor={id} className="font-display uppercase tracking-widest text-xs">
//       {label}
//     </Label>
//     <Input id={id} className="mt-2 bg-asphalt" {...props} />
//   </div>
// );

// export default Admin;
