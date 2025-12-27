import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArtworkCarousel } from "@/components/ArtworkCarousel";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ArtworkCarousel />
        <About />
        <Gallery />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
