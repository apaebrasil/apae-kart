export interface Driver {
  cardid: number;
  criado_em: string;
  criado_por: string;
  descricao: string;
  documentid: number;
  id: number;
  id_pasta: string;
  modificado_em: string;
  modificado_por: string;
  nome: string;
  status: "ATIVO" | "INATIVO";
  tableid: string;
  url_foto: string;
  version: number;
}

export interface Results {
  json_resultados: string;
}

export interface News {
  cardid: number;
  criado_em: string;
  criado_por: string;
  descricao: string;
  documentid: number;
  id: number;
  id_pasta: string;
  modificado_em: string;
  modificado_por: string;
  status: "ATIVO" | "INATIVO";
  titulo: string;
  url_foto: string;
}

// types/race.ts

export interface Race {
  cardid: number;
  criado_em: string;
  criado_por: string;
  data_prova: string;
  descricao: string;
  documentid: number;
  endereco: string;
  horario: string;
  id: number;
  id_pasta: string;
  local_prova: string;
  modificado_em: string;
  modificado_por: string;
  status: "ATIVO" | "INATIVO";
  tableid: string;
  titulo: string;
  url_foto: string;
}

export type RaceResult = {
  raceId: string;
  driverId: string;
  position: number;
  bestLap: string; // mm:ss.mmm
  points: number;
};

// Standings calculation
export type Standing = {
  driver: Driver;
  points: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
};

export interface JSONResults {
  atleta: string;
  colocacao: string;
  pontuacao: string;
  tempo: string;
}
