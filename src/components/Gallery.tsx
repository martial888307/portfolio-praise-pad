import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGallery } from "../hooks/useGallery";

// Fixed list from documentation
const mediums = [
  { label: "Tous les matériaux", value: "" },
  { label: "Peinture", value: "peinture" },
  { label: "Dessin", value: "dessin" },
  { label: "Volume", value: "volume" },
  { label: "Installation", value: "installation" },
  { label: "Édition", value: "edition" },
];

export function Gallery() {
  const {
    artworks,
    collections,
    selectedCollectionId,
    setSelectedCollectionId,
    selectedMedium,
    setSelectedMedium,
    loading,
    error,
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
    return `https://www.sylvianeleboulch.com${path}`;
  };

  return (
    <section id="galerie" className="py-24 md:py-32 bg-background min-h-screen">
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

        {/* Filters - Using native HTML selects for robustness */}
        {!error && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 fade-in-up delay-300">
            <div className="w-full md:w-64">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center md:text-left">
                Collection
              </label>
              <select
                value={selectedCollectionId}
                onChange={(e) => setSelectedCollectionId(e.target.value)}
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Toutes les collections</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-64">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center md:text-left">
                Technique / Matériau
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {mediums.map((med) => (
                  <option key={med.value} value={med.value}>
                    {med.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-auto self-end">
              <button
                onClick={() => { setSelectedCollectionId(""); setSelectedMedium(""); }}
                className="w-full md:w-auto px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-border rounded-md"
              >
                Réinitialiser
              </button>
            </div>
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
            /* Elegant placeholder when no filter is selected */
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
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  Explorez les collections
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                  Sélectionnez une collection ou une technique ci-dessus
                  pour découvrir les œuvres de Sylviane Le Boulc'h.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {collections.slice(0, 4).map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        setSelectedCollectionId(col.id);
                        setSelectedMedium("peinture");
                      }}
                      className="px-5 py-2.5 font-body text-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 rounded-sm"
                    >
                      {col.name}
                    </button>
                  ))}
                </div>
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
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-end">
                        <div className="p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="font-body text-xs uppercase tracking-widest text-cream/80 mb-1">
                            {artwork.collection_name}
                          </p>
                          <h3 className="font-display text-xl text-cream">
                            {artwork.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="py-4">
                      <h3 className="font-display text-lg text-foreground">
                        {artwork.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {artwork.dateRealisation && <span>{artwork.dateRealisation}</span>}
                      </p>
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
            className="max-w-5xl max-h-[85vh] mx-4 animate-scale-in relative group"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={getImageUrl(artworks[lightboxIndex].img_url)}
                alt={artworks[lightboxIndex].name}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl"
              />

              {/* Description Overlay on Hover */}
              {artworks[lightboxIndex].description && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto p-8 rounded-sm backdrop-blur-[2px]">
                  <p className="font-body text-cream text-lg md:text-xl text-center leading-relaxed animate-fade-in">
                    {artworks[lightboxIndex].description}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <h3 className="font-display text-2xl text-cream inline-block">
                  {artworks[lightboxIndex].name}
                </h3>
                {/* Sold Badge */}
                {(String(artworks[lightboxIndex].sold) === "1" || Number(artworks[lightboxIndex].sold) === 1) && (
                  <span className="font-body text-xs uppercase tracking-widest text-[#FF4444] border border-[#FF4444] px-2 py-0.5 rounded-sm">
                    Vendu
                  </span>
                )}
              </div>
              <p className="font-body text-cream/70 mt-2">
                {artworks[lightboxIndex].collection_name}
                {artworks[lightboxIndex].dateRealisation && ` · ${artworks[lightboxIndex].dateRealisation}`}
              </p>
            </div>
          </div>
        </div>
      )
      }
    </section >
  );
}
