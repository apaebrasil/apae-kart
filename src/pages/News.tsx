import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { NewsCard } from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDataset } from "@/api/fetch-dataset";
import type { News } from "@/data/championship";

export function News() {
  const { data: newsData } = useQuery({
    queryKey: ["news"],
    queryFn: async () => fetchDataset<News>({ datasetId: "cadNoticiasKart" }),
  });

  return (
    <div className="min-h-dvh bg-asphalt flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <SectionHeader eyebrow="Notícias do Paddock" title="Notícias" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData?.items.map((news) => (
            <NewsCard key={news.documentid} {...news} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
