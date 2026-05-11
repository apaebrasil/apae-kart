import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { fetchDataset } from "./api/fetch-dataset";

import type { Driver, News, Race, Results } from "./data/championship";

import { Index } from "./pages/Index";
import { Standings } from "./pages/Standings";
import { Drivers } from "./pages/Drivers";
import { News as NewsComponent } from "./pages/News";
import { CalendarPage } from "./pages/CalendarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Index,
    loader: async () => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["drivers"],
          queryFn: async () => fetchDataset<Driver>({ datasetId: "cadPilotosKart" }),
        }),
        queryClient.prefetchQuery({
          queryKey: ["drivers"],
          queryFn: async () => fetchDataset<Race>({ datasetId: "cadProvas" }),
        }),
        queryClient.prefetchQuery({
          queryKey: ["drivers"],
          queryFn: async () => fetchDataset<News>({ datasetId: "cadNoticias" }),
        }),
        queryClient.prefetchQuery({
          queryKey: ["results"],
          queryFn: async () => fetchDataset<Results>({ datasetId: "cadResultadosKart" }),
        }),
      ]);

      return null;
    },
  },
  {
    path: "/standings",
    Component: Standings,
    loader: async () => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["results"],
          queryFn: async () => fetchDataset<Results>({ datasetId: "cadResultadosKart" }),
        }),
      ]);
      return null;
    },
  },
  {
    path: "/drivers",
    Component: Drivers,
  },
  {
    path: "/calendar",
    Component: CalendarPage,
  },
  {
    path: "/calendar",
    Component: CalendarPage,
  },
  {
    path: "/news",
    Component: NewsComponent,
  },
  {
    path: "/admin",
    Component: NewsComponent,
  },
]);
