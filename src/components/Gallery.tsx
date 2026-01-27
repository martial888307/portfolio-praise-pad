import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGallery } from "../hooks/useGallery";

// Mapping des valeurs API vers les labels d'affichage
const MEDIUM_LABELS: Record<string, string> = {
  "peinture": "Peinture",
  "dessin": "Dessin",
  "sculpture": "Sculpture",
  "curiosity": "Curiosités",
  "edition": "Édition",
};


interface GalleryProps {
  onEnquire?: (message: string) => void;
}

export function Gallery({ onEnquire }: GalleryProps) {
  const {
    artworks,
    collections,
    availableCollections,
    selectedCollectionId,
    handleCollectionChange,
    selectedMedium,
    handleMediumChange,
    loading,
    error,
    availableMediums,
  } = useGallery();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit visible artworks to 9 (3 rows) unless expanded
  const INITIAL_LIMIT = 9;
  const visibleArtworks = isExpanded ? artworks : artworks.slice(0, INITIAL_LIMIT);
  const hasMoreArtworks = artworks.length > INITIAL_LIMIT;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (lightboxIndex - 1 + artworks.length) % artworks.length
        : (lightboxIndex + 1) % artworks.length;
    setLightboxIndex(newIndex);
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    if (path.includes("placeholder")) return path;
    // Proxy through /api_sylviane to avoid mixed content issues on HTTPS
    return `/api_sylviane${path}`;
  };

  return (
    <section id="galerie" className="py-24 md:py-32 bg-background min-h-screen scroll-mt-28">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body uppercase tracking-widest text-sm text-primary fade-in-up">
            Explorez les collections !
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground fade-in-up delay-100">
            Galerie des <span className="italic font-normal">œuvres</span>
          </h2>
          <div className="section-separator fade-in-up delay-200" />
        </div>

        {/* Filters - Using native HTML selects for robustness */}
        {!error && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 fade-in-up delay-300">
            <div className="w-full md:w-64">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center md:text-left">
                Collection
              </label>
              <select
                value={selectedCollectionId}
                onChange={(e) => handleCollectionChange(e.target.value)}
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Toutes les collections</option>
                {availableCollections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-64">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center md:text-left">
                Medium / Technique
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => handleMediumChange(e.target.value)}
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Tous les médiums</option>
                {availableMediums.map((med) => (
                  <option key={med} value={med}>
                    {MEDIUM_LABELS[med] || med}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-auto self-end">
              <button
                onClick={() => { handleCollectionChange(""); handleMediumChange(""); }}
                className="w-full md:w-auto px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-border rounded-md"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}

        {/* ... existing code ... */}
        {selectedCollectionId && collections.find(c => c.id === selectedCollectionId)?.description && (
          <div key={selectedCollectionId} className="max-w-3xl mx-auto mb-16 px-4 text-center overflow-hidden">
            <p className="font-display italic tracking-tight text-lg md:text-xl text-primary/80 leading-relaxed animate-slide-up">
              {collections.find(c => c.id === selectedCollectionId)?.description || ""}
            </p>
          </div>
        )}



        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-destructive">
            <p>Impossible de charger la galerie.</p>
            <p className="text-sm mt-2 text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!error && (
          loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !selectedCollectionId && !selectedMedium ? (
            /* Placeholder élégant quand aucun filtre n'est sélectionné */
            <div className="text-center py-16 md:py-24 fade-in-up">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Sélectionnez une collection ou un médium ci-dessus
                  pour découvrir les œuvres de Sylviane Le Boulc'h.
                </p>
              </div>
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              Aucune œuvre ne correspond à ces critères.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    onClick={() => openLightbox(index)}
                    className="artwork-card group fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={getImageUrl(artwork.img_url)}
                        alt={artwork.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                    <div className="py-4">
                      <p className="font-body text-xs tracking-widest text-muted-foreground mb-1">
                        {artwork.collection_name}
                      </p>
                      <h3 className="font-display text-lg text-foreground">
                        {artwork.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expand/Collapse button */}
              {hasMoreArtworks && (
                <div className="text-center mt-12 fade-in-up">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-body uppercase tracking-widest text-sm"
                  >
                    {isExpanded ? (
                      <>
                        <span>Réduire</span>
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Voir toutes les œuvres ({artworks.length})</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && artworks[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors z-50"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream transition-colors z-50 p-2 bg-black/40 md:bg-transparent rounded-full"
            aria-label="Précédent"
          >
            <ChevronLeft size={32} className="md:w-10 md:h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream transition-colors z-50 p-2 bg-black/40 md:bg-transparent rounded-full"
            aria-label="Suivant"
          >
            <ChevronRight size={32} className="md:w-10 md:h-10" />
          </button>

          {/* Container Scrollable */}
          <div
            className="w-full h-full overflow-y-auto flex items-center justify-center p-4 md:p-8"
            onClick={(e) => {
              // Close if clicking outside main content area
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <div
              className="max-w-4xl w-full bg-black/40 backdrop-blur-sm rounded-sm overflow-hidden animate-scale-in my-auto shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative bg-black/20 flex justify-center">
                <img
                  src={getImageUrl(artworks[lightboxIndex].img_url)}
                  alt={artworks[lightboxIndex].name}
                  className="max-w-full max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 bg-[#0a0a0a]">
                <div className="flex flex-col md:flex-row gap-8 justify-between items-start">

                  {/* Infos Oeuvre */}
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-display text-xl text-cream mb-1">
                        {artworks[lightboxIndex].name}
                      </h3>
                      <p className="font-body text-cream/60 text-sm tracking-wider">
                        {artworks[lightboxIndex].collection_name}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-sm font-body text-cream/70">
                      {/* Price / Dimensions */}
                      <div>
                        {/* Removed label "Dimensions" */}
                        <span>
                          {[
                            artworks[lightboxIndex].width,
                            artworks[lightboxIndex].height,
                            artworks[lightboxIndex].depth
                          ].filter(Boolean).join(" x ") + " cm"}
                        </span>
                      </div>
                      {/* Medium */}
                      <div>
                        {/* Removed label "Technique" */}
                        <span className="capitalize">
                          {artworks[lightboxIndex].description || artworks[lightboxIndex].collection_name.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Description */}

                  </div>

                  {/* Action Column */}
                  <div className="w-full md:w-auto flex flex-col gap-4 min-w-[200px]">
                    <div className="font-display text-xl text-cream text-right md:text-right">
                      {/* Price Logic */}
                      {(String(artworks[lightboxIndex].sold) === "1" || Number(artworks[lightboxIndex].sold) === 1) ? (
                        <span className="text-[#FF4444]">Vendu</span>
                      ) : (
                        <span>
                          {String(artworks[lightboxIndex].visiblePrice) === "1" && artworks[lightboxIndex].price
                            ? `${artworks[lightboxIndex].price} €`
                            : "Prix sur demande"}
                        </span>
                      )}
                    </div>

                    {!(String(artworks[lightboxIndex].sold) === "1" || Number(artworks[lightboxIndex].sold) === 1) && (
                      <button
                        onClick={() => {
                          const message = `Bonjour, je souhaiterais obtenir plus d'informations concernant l'œuvre "${artworks[lightboxIndex].name}" (Collection: ${artworks[lightboxIndex].collection_name}). Merci.`;
                          closeLightbox();
                          if (onEnquire) {
                            onEnquire(message);
                          } else {
                            // Fallback
                            window.location.href = "#contact";
                          }
                        }}
                        className="w-full py-3 px-6 bg-primary text-primary-foreground font-body uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors text-center"
                      >
                        Acheter / Demander
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </section >
  );
}
