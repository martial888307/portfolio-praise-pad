import heroImage from "@/assets/hero-light.jpg";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Sculpture en dentelle - œuvre emblématique"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6">
        <h1 className="hero-text-reveal font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-cream leading-tight mb-6">
          La dentelle
          <br />
          <span className="italic font-normal">comme médium</span>
        </h1>

        <p className="hero-text-reveal delay-200 font-body text-lg sm:text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto mb-10 tracking-wide">
          Artiste plasticienne qui dessine un langage pour dérouler ses récits.
        </p>

        <div className="hero-text-reveal delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#galerie"
            className="px-8 py-4 bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
          >
            Découvrir les œuvres
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#apropos" className="text-cream/60 hover:text-cream transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}
