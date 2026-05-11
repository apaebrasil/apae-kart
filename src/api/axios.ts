import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "/api/fluig-proxy.php",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
