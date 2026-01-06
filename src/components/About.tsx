import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import artistPortrait from "@/assets/artist-portrait.jpg";
import cvContent from "@/assets/cv-content.png";
import cvBackground from "@/assets/cv-background.jpg";

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

            <div className="fade-in-up delay-300 pt-4 flex flex-wrap items-center gap-6">
              <a
                href="#demarche"
                className="inline-flex items-center font-body uppercase tracking-widest text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                Découvrir ma démarche
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-body uppercase tracking-widest text-sm rounded-sm transition-colors">
                    <FileText className="w-4 h-4" />
                    Voir mon CV
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden border-none bg-transparent shadow-2xl">
                  {/* Background Layer with Blur */}
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${cvBackground})` }}
                  >
                    <div className="absolute inset-0 backdrop-blur-md bg-background/40" />
                  </div>

                  {/* Content Layer */}
                  <div className="relative z-10 w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center">
                    <img
                      src={cvContent}
                      alt="CV Sylviane Le Boulc'h"
                      className="max-w-full h-auto shadow-lg object-contain bg-white/95"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
