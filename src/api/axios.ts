import { env } from "@/zod-env";
import axios from "axios";

export const axiosApi = axios.create({
  baseURL: env.VITE_BASE_URL_TESTE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
