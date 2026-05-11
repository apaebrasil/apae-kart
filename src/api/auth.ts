import OAuth from "oauth-1.0a";
import CryptoJs from "crypto-js";
import axios, { type AxiosRequestHeaders, type InternalAxiosRequestConfig } from "axios";

// URL do Fluig (usada para assinar requisições OAuth em desenvolvimento)
const FLUIG_BASE_URL = "https://federacaonacional201538.fluig.cloudtotvs.com.br";

// Determina a base URL dependendo do ambiente
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "";
  }
  return "https://maroon-gnu-600298.hostingersite.com";
};

// Instância do Axios
export const axiosApi = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Funções e configurações OAuth 1.0a
const hashFunction = (baseString: string, key: string) => {
  return CryptoJs.HmacSHA1(baseString, key).toString(CryptoJs.enc.Base64);
};

const oauth = new OAuth({
  consumer: {
    key: import.meta.env.VITE_CONSUMER_KEY as string,
    secret: import.meta.env.VITE_CONSUMER_SECRET as string,
  },
  signature_method: "HMAC-SHA1",
  hash_function: hashFunction,
});

// Retorna autenticação OAuth
const getAuthorizationHeaders = async (url: string, method: string) => {
  const token = {
    key: import.meta.env.VITE_ACCESS_TOKEN_TESTE as string,
    secret: import.meta.env.VITE_TOKEN_SECRET_TESTE as string,
  };

  return oauth.toHeader(oauth.authorize({ url, method }, token));
};

// Interceptor de Requisição do Axios para OAuth 1.0a (apenas em DEV)
axiosApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Em produção, o proxy PHP cuida da autenticação
    // Então apenas fazemos OAuth em desenvolvimento
    if (import.meta.env.DEV) {
      const method = config.method ? config.method.toUpperCase() : "GET";
      if (!config.url) return config;

      const oauthURL = `${FLUIG_BASE_URL}${config.url}`;
      try {
        const authorizationHeader = await getAuthorizationHeaders(oauthURL, method);
        config.headers = { ...(config.headers || {}), ...authorizationHeader } as AxiosRequestHeaders;
      } catch {
        return Promise.reject(new Error("Falha na autenticação OAuth 1.0a."));
      }
    }
    // Em produção, a URL é chamada normalmente e o proxy PHP responde

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });

    if (error.message === "Network Error") {
      if (import.meta.env.DEV) {
        console.error("💡 DEV: Verifique o Vite Proxy e as credenciais OAuth");
      } else {
        console.error("💡 PROD: Verifique se o proxy.php está funcionando");
      }
    }

    return Promise.reject(error);
  },
);
