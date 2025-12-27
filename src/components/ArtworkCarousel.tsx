import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";

const carouselImages = [
  { src: carousel1, alt: "Ardentelle - sculpture bronze dentelle" },
  { src: carousel2, alt: "Œuvre monumentale en bronze" },
  { src: carousel3, alt: "Installation artistique" },
  { src: carousel4, alt: "Dentelles et fossiles" },
  { src: carousel5, alt: "Sculpture légèreté et transparence" },
];

export function ArtworkCarousel() {
  return (
    <section className="py-12 md:py-20 bg-charcoal">
      <div className="container">
        <div className="text-center mb-10">
          <span className="font-body uppercase tracking-widest text-sm text-bronze fade-in-up">
            Aperçu
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mt-3 text-cream fade-in-up delay-100">
            Œuvres <span className="italic font-normal">sélectionnées</span>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {carouselImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-1/3"
              >
                <div className="relative aspect-[3/4] overflow-hidden group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 border-cream/30 text-cream hover:bg-cream/10 hover:text-cream" />
          <CarouselNext className="hidden md:flex -right-12 border-cream/30 text-cream hover:bg-cream/10 hover:text-cream" />
        </Carousel>

        <div className="text-center mt-10">
          <a
            href="#galerie"
            className="inline-block px-8 py-3 border border-cream/40 text-cream font-body uppercase tracking-widest text-sm hover:bg-cream/10 transition-colors"
          >
            Voir toutes les œuvres
          </a>
        </div>
      </div>
    </section>
  );
}
