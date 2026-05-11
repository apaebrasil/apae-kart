import axios from "axios";
import { axiosApi } from "./axios";
import "./auth";

export type DatasetRecord = Record<string, string | number | boolean | null>;

export interface DatasetResponse<T = DatasetRecord> {
  values?: T[];
}

export interface DatasetConstraint {
  fieldName: string;
  initialValue: string | number | boolean;
  finalValue?: string | number | boolean;
  constraintType?: "MUST" | "SHOULD" | "MUST_NOT";
}

interface FetchDatasetProps {
  datasetId: string;
  offset?: number;
  limit?: number;
  constraints?: DatasetConstraint[];
}

// Utilitário reutilizável para extrair detalhes do erro
function parseError(error: unknown): string {
  // Erro vindo do Axios (resposta da API)
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = typeof data === 'object' && data !== null && 'error' in data 
      ? (data as any).error 
      : error.response?.data?.message ?? error.message;
    
    return `[AxiosError] Status: ${status} | Mensagem: ${message}`;
  }

  // Erro genérico do JavaScript
  if (error instanceof Error) {
    return `[Error] ${error.name}: ${error.message}`;
  }

  // Qualquer outra coisa
  return `[Desconhecido] ${JSON.stringify(error)}`;
}

export async function fetchDataset<T = DatasetRecord>({ datasetId, offset, limit, constraints = [] }: FetchDatasetProps): Promise<{ items: T[]; hasNext: boolean }> {
  try {
    const params = new URLSearchParams();

    params.set("datasetId", datasetId);

    if (offset != null && limit != null) {
      params.set("offset", String(offset));
      params.set("limit", String(limit));
    }

    constraints.forEach((c) => {
      const type = c.constraintType ?? "MUST";
      const finalVal = c.finalValue ?? c.initialValue;

      params.append("constraintsField", c.fieldName);
      params.append("constraintsInitialValue", String(c.initialValue));
      params.append("constraintsFinalValue", String(finalVal));
      params.append("constraintsType", type);
    });

    // Em produção chama /proxy.php, em DEV chama direto a API
    const url = import.meta.env.DEV 
      ? `/dataset/api/v2/dataset-handle/search?${params.toString()}`
      : `/proxy.php?${params.toString()}`;
    
    const response = await axiosApi.get<DatasetResponse<T>>(url);

    return {
      items: response.data.values ?? [],
      hasNext: false,
    };
  } catch (error) {
    console.error(`Erro ao buscar dataset "${datasetId}":`, parseError(error));
    
    // Log detalhado em caso de erro
    if (axios.isAxiosError(error)) {
      console.error("📋 Resposta completa do erro:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
    }

    return { items: [], hasNext: false };
  }
}
