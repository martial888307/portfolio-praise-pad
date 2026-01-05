import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CreativeProcess } from "@/components/CreativeProcess";
import { ArtworkCarousel } from "@/components/ArtworkCarousel";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [messageSubject, setMessageSubject] = useState("");
  const location = useLocation();

  // Handle scroll to hash when location changes (e.g. navigation from another page)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Small timeout to ensure DOM is ready and layout is stable
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleEnquire = (message: string) => {
    setMessageSubject(message);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <ArtworkCarousel /> - Removed as per user request */}
        <About />
        <CreativeProcess />
        <Gallery onEnquire={handleEnquire} />
        <Approach />
        <Contact initialMessage={messageSubject} />
      </main>
      <Footer />
    </>
  );
};

export default Index;
