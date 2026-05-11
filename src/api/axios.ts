import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://maroon-gnu-600298.hostingersite.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
