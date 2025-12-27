import artistPortrait from "@/assets/artist-portrait.jpg";

export function About() {
  return (
    <section id="apropos" className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="fade-in-up order-2 lg:order-1">
            <div className="relative">
              <img
                src={artistPortrait}
                alt="Portrait de l'artiste dans son atelier"
                className="w-full aspect-[3/4] object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/20 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="fade-in-up">
              <span className="font-body uppercase tracking-widest text-sm text-primary">
                À propos
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
                Une artiste
                <br />
                <span className="italic font-normal">de la fragilité</span>
              </h2>
            </div>

            <div className="section-separator !mx-0" />

            <div className="fade-in-up delay-200 space-y-6 font-body text-lg text-foreground/80 leading-relaxed">
              <p>
                Depuis plus de dix ans, je sculpte l'éphémère. La dentelle, 
                ce tissu ajouré qui laisse passer la lumière, est devenue 
                mon vocabulaire pour exprimer ce qui nous constitue : 
                la vulnérabilité, la mémoire, le passage du temps.
              </p>
              <p>
                Mes œuvres explorent trois thèmes majeurs : la femme comme 
                sujet et objet, l'eau qui nous compose et nous traverse, 
                et les traces fossiles que nous laissons derrière nous. 
                Chaque pièce est une méditation sur notre condition humaine.
              </p>
              <p>
                Du bronze à la céramique, du dessin à la sculpture monumentale, 
                je traduis cette « dentelle humaine » dans une multitude de médiums, 
                cherchant toujours à révéler l'invisible qui nous relie.
              </p>
            </div>

            <div className="fade-in-up delay-300 pt-4">
              <a
                href="#demarche"
                className="inline-flex items-center font-body uppercase tracking-widest text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                Découvrir ma démarche
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
