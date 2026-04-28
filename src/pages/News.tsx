import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { NewsCard } from "@/components/NewsCard";
import { news } from "@/data/championship";

const News = () => (
  <div className="min-h-dvh bg-asphalt flex flex-col">
    <Navbar />
    <main className="container py-12 flex-1">
      <SectionHeader eyebrow="Notícias do Paddock" title="Notícias" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((n) => <NewsCard key={n.id} {...n} />)}
      </div>
    </main>
    <Footer />
  </div>
);

export default News;
