import driver1 from "@/assets/driver-1.jpg";
import driver2 from "@/assets/driver-2.jpg";
import driver3 from "@/assets/driver-3.jpg";
import driver4 from "@/assets/driver-4.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";

export type Driver = {
  id: string;
  number: number;
  name: string;
  team: string;
  teamColor: "red" | "volt" | "blue" | "white";
  photo: string;
  bio: string;
  attributes: { speed: number; consistency: number; aggression: number };
};

export type Race = {
  id: string;
  round: number;
  name: string;
  location: string;
  date: string; // ISO
  time: string;
  status: "completed" | "upcoming" | "live";
  mapsQuery?: string;
};

export type RaceResult = {
  raceId: string;
  driverId: string;
  position: number;
  bestLap: string; // mm:ss.mmm
  points: number;
};

// FIA-style points for top 10
export const POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
export const FASTEST_LAP_BONUS = 1;

export const calcPoints = (position: number, hasFastestLap = false): number => {
  const base = position >= 1 && position <= 10 ? POINTS_TABLE[position - 1] : 0;
  return base + (hasFastestLap ? FASTEST_LAP_BONUS : 0);
};

export const drivers: Driver[] = [
  {
    id: "d1",
    number: 7,
    name: "Elias Vance",
    team: "Scuderia Veloce",
    teamColor: "red",
    photo: driver1,
    bio: "Líder do campeonato. Conhecido pela frieza nas curvas de alta velocidade.",
    attributes: { speed: 92, consistency: 88, aggression: 81 },
  },
  {
    id: "d2",
    number: 14,
    name: "Mira Kowalski",
    team: "Volt Dynamics",
    teamColor: "volt",
    photo: driver2,
    bio: "Especialista em chuva. Recordista de melhor volta em 4 das últimas 6 etapas.",
    attributes: { speed: 89, consistency: 91, aggression: 76 },
  },
  {
    id: "d3",
    number: 22,
    name: "Marcus Thorne",
    team: "Gridline Racing",
    teamColor: "white",
    photo: driver3,
    bio: "Estreante revelação. Largadas explosivas e ultrapassagens audaciosas.",
    attributes: { speed: 86, consistency: 74, aggression: 95 },
  },
  {
    id: "d4",
    number: 88,
    name: "Hans Reinhardt",
    team: "Apex Yellow",
    teamColor: "volt",
    photo: driver4,
    bio: "Veterano três vezes campeão. Mentor da nova geração do paddock.",
    attributes: { speed: 84, consistency: 96, aggression: 72 },
  },
];

export const races: Race[] = [
  { id: "r1", round: 1, name: "Abertura Interlagos", location: "Interlagos, SP", date: "2026-02-14", time: "14:00", status: "completed", mapsQuery: "Autódromo de Interlagos" },
  { id: "r2", round: 2, name: "GP Granja Viana", location: "Granja Viana, SP", date: "2026-03-07", time: "15:30", status: "completed", mapsQuery: "Kartódromo Granja Viana" },
  { id: "r3", round: 3, name: "Etapa Aldeia", location: "Aldeia da Serra, SP", date: "2026-03-28", time: "13:00", status: "completed", mapsQuery: "Kartódromo Aldeia da Serra" },
  { id: "r4", round: 4, name: "GP Suzuka Amador", location: "San-Marino, SP", date: "2026-05-09", time: "14:00", status: "upcoming", mapsQuery: "Kartódromo San Marino Paulínia" },
  { id: "r5", round: 5, name: "Etapa Speedland", location: "Speedland, SP", date: "2026-06-06", time: "16:00", status: "upcoming", mapsQuery: "Speedland kart" },
  { id: "r6", round: 6, name: "Final do Campeonato", location: "Interlagos, SP", date: "2026-07-18", time: "14:00", status: "upcoming", mapsQuery: "Autódromo de Interlagos" },
];

// raceId -> array of (driverId, position, bestLap)
export const results: RaceResult[] = [
  // R1
  { raceId: "r1", driverId: "d1", position: 1, bestLap: "00:42.318", points: calcPoints(1, false) },
  { raceId: "r1", driverId: "d2", position: 2, bestLap: "00:42.105", points: calcPoints(2, true) }, // fastest lap
  { raceId: "r1", driverId: "d4", position: 3, bestLap: "00:42.610", points: calcPoints(3) },
  { raceId: "r1", driverId: "d3", position: 4, bestLap: "00:42.890", points: calcPoints(4) },
  // R2
  { raceId: "r2", driverId: "d2", position: 1, bestLap: "00:41.992", points: calcPoints(1, true) },
  { raceId: "r2", driverId: "d1", position: 2, bestLap: "00:42.201", points: calcPoints(2) },
  { raceId: "r2", driverId: "d3", position: 3, bestLap: "00:42.411", points: calcPoints(3) },
  { raceId: "r2", driverId: "d4", position: 4, bestLap: "00:42.733", points: calcPoints(4) },
  // R3
  { raceId: "r3", driverId: "d1", position: 1, bestLap: "00:43.012", points: calcPoints(1) },
  { raceId: "r3", driverId: "d3", position: 2, bestLap: "00:42.880", points: calcPoints(2, true) },
  { raceId: "r3", driverId: "d2", position: 3, bestLap: "00:43.105", points: calcPoints(3) },
  { raceId: "r3", driverId: "d4", position: 4, bestLap: "00:43.401", points: calcPoints(4) },
];

export const news = [
  {
    id: "n1",
    title: "Vance amplia liderança após domínio em Aldeia",
    excerpt: "Elias Vance venceu de ponta a ponta a 3ª etapa, abrindo 12 pontos para Kowalski no campeonato.",
    image: news1,
    date: "2026-03-29",
    tag: "RACE REPORT",
  },
  {
    id: "n2",
    title: "Diretiva técnica: novo regulamento de chassis para 2027",
    excerpt: "Comissão anuncia mudanças na homologação de chassis a partir da próxima temporada amadora.",
    image: news2,
    date: "2026-03-22",
    tag: "TECHNICAL",
  },
  {
    id: "n3",
    title: "Gridline Racing fecha com novo patrocinador master",
    excerpt: "A equipe do estreante Marcus Thorne ganha reforço financeiro para o restante do campeonato.",
    image: news1,
    date: "2026-03-15",
    tag: "TEAM NEWS",
  },
];

// Standings calculation
export type Standing = {
  driver: Driver;
  points: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
};

export const calcStandings = (allResults: RaceResult[], allDrivers: Driver[]): Standing[] => {
  const map = new Map<string, Standing>();
  for (const d of allDrivers) {
    map.set(d.id, { driver: d, points: 0, wins: 0, podiums: 0, fastestLaps: 0 });
  }
  // Determine fastest lap per race
  const fastestByRace = new Map<string, string>();
  const grouped = new Map<string, RaceResult[]>();
  for (const r of allResults) {
    if (!grouped.has(r.raceId)) grouped.set(r.raceId, []);
    grouped.get(r.raceId)!.push(r);
  }
  for (const [raceId, list] of grouped) {
    const sorted = [...list].sort((a, b) => a.bestLap.localeCompare(b.bestLap));
    if (sorted[0]) fastestByRace.set(raceId, sorted[0].driverId);
  }
  for (const r of allResults) {
    const s = map.get(r.driverId);
    if (!s) continue;
    s.points += r.points;
    if (r.position === 1) s.wins += 1;
    if (r.position <= 3) s.podiums += 1;
    if (fastestByRace.get(r.raceId) === r.driverId) s.fastestLaps += 1;
  }
  return Array.from(map.values()).sort((a, b) => b.points - a.points || b.wins - a.wins);
};

export const getRaceResults = (raceId: string): (RaceResult & { driver: Driver })[] => {
  return results
    .filter((r) => r.raceId === raceId)
    .map((r) => ({ ...r, driver: drivers.find((d) => d.id === r.driverId)! }))
    .sort((a, b) => a.position - b.position);
};

export const getNextRace = (): Race | undefined =>
  races.find((r) => r.status === "upcoming");

export const getLastCompleted = (): Race | undefined =>
  [...races].reverse().find((r) => r.status === "completed");
