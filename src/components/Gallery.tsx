import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import artworkBronze from "@/assets/artwork-bronze-lace.jpg";
import artworkWater from "@/assets/artwork-water-lace.jpg";
import artworkFossil from "@/assets/artwork-fossil.jpg";
import artworkCeramic from "@/assets/artwork-ceramic.jpg";
import artworkDrawing from "@/assets/artwork-drawing.jpg";
import artworkMonumental from "@/assets/artwork-monumental.jpg";

interface Artwork {
  id: number;
  title: string;
  collection: string;
  medium: string;
  year: string;
  image: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Dentelle de Bronze I",
    collection: "Dentelles Humaines",
    medium: "Bronze",
    year: "2023",
    image: artworkBronze,
  },
  {
    id: 2,
    title: "Flux et Mémoire",
    collection: "L'Eau",
    medium: "Installation textile",
    year: "2022",
    image: artworkWater,
  },
  {
    id: 3,
    title: "Fossile III",
    collection: "Fossiles",
    medium: "Pierre et dentelle",
    year: "2023",
    image: artworkFossil,
  },
  {
    id: 4,
    title: "Lumière Intérieure",
    collection: "Curiosités",
    medium: "Céramique ajourée",
    year: "2024",
    image: artworkCeramic,
  },
  {
    id: 5,
    title: "Portrait Voilé",
    collection: "La Femme",
    medium: "Dessin à l'encre",
    year: "2021",
    image: artworkDrawing,
  },
  {
    id: 6,
    title: "Ardentelle",
    collection: "Monumentales",
    medium: "Bronze monumental",
    year: "2020",
    image: artworkMonumental,
  },
];

const categories = ["Toutes", "Dentelles Humaines", "L'Eau", "Fossiles", "La Femme", "Monumentales"];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredArtworks =
    selectedCategory === "Toutes"
      ? artworks
      : artworks.filter((a) => a.collection === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (lightboxIndex - 1 + filteredArtworks.length) % filteredArtworks.length
        : (lightboxIndex + 1) % filteredArtworks.length;
    setLightboxIndex(newIndex);
  };

  return (
    <section id="galerie" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body uppercase tracking-widest text-sm text-primary fade-in-up">
            Collections
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground fade-in-up delay-100">
            Galerie des <span className="italic font-normal">œuvres</span>
          </h2>
          <div className="section-separator fade-in-up delay-200" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in-up delay-300">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 font-body text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              onClick={() => openLightbox(index)}
              className="artwork-card group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-end">
                  <div className="p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-body text-xs uppercase tracking-widest text-cream/80 mb-1">
                      {artwork.collection}
                    </p>
                    <h3 className="font-display text-xl text-cream">
                      {artwork.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <h3 className="font-display text-lg text-foreground">
                  {artwork.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {artwork.medium} · {artwork.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            className="absolute left-4 md:left-8 text-cream/70 hover:text-cream transition-colors z-10"
            aria-label="Précédent"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-4 md:right-8 text-cream/70 hover:text-cream transition-colors z-10"
            aria-label="Suivant"
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredArtworks[lightboxIndex].image}
              alt={filteredArtworks[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="font-display text-2xl text-cream">
                {filteredArtworks[lightboxIndex].title}
              </h3>
              <p className="font-body text-cream/70 mt-2">
                {filteredArtworks[lightboxIndex].collection} · {filteredArtworks[lightboxIndex].medium} · {filteredArtworks[lightboxIndex].year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
