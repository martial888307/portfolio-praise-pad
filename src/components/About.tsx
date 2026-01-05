import artistPortrait from "@/assets/artist-portrait.jpg";

export function About() {
  return (
    <section id="apropos" className="py-24 md:py-32 bg-secondary scroll-mt-28">
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
                J’ai toujours dessiné comme certains écrivent un journal.
              </p>
              <p>
                Élève du primaire, perdue devant les problèmes de baignoires et de trains qui se croisent, je me suis
                découverte, arrivée au collège, un goût profond pour les mathématiques — leur sens esthétique et
                leur esthétique du sens.
              </p>
              <p>
                C’est si beau, la théorie des ensembles.
                Un concept dessiné qui me parlait enfin. Un langage.
              </p>
              <p>
                Chaque année, les mathématiques m’enrichissaient de nouveaux signes, jusqu’au bout de mes
                études scientifiques à Orsay, où j’ai même rêvé d’une carrière tournée vers l’astrophysique.
                Jusqu’au moment où j’ai décidé de remettre, définitivement, ma tête dans les étoiles.
              </p>
              <p>
                Depuis, le dessin est resté mon point d’ancrage. Il est devenu un outil de recherche et d’organisation
                du chaos, le socle d’une pratique artistique que je développe aujourd’hui en peinture, sculpture,
                céramique, dessin et autres curiosités.
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
