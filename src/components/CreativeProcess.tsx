import processDrawing from "@/assets/process-drawing.jpg";
import processArtwork from "@/assets/process-artwork.jpg";

export function CreativeProcess() {
    return (
        <section id="processus" className="py-24 md:py-32">
            <div className="container space-y-32">
                {/* Subsection 1 */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <div className="fade-in-up">
                            <span className="font-body uppercase tracking-widest text-sm text-primary">
                                Processus Créatif
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl mt-4 text-foreground">
                                Dessiner pour tisser mes langages
                            </h2>
                        </div>

                        <div className="fade-in-up delay-200 space-y-6 font-body text-lg text-foreground/80 leading-relaxed">
                            <p>
                                Mon esprit vit dans un mouvement brownien d’idées que je cherche à organiser et à modéliser de
                                façon cohérente.
                            </p>
                            <p>
                                Le plaisir des infinis possibles de la création se superpose à l’excitation d’un certain engagement.
                                Toute émotion est prétexte à raconter des histoires, à symboliser des sujets lourds, à tenter de les
                                rendre légers.
                            </p>
                            <p>
                                Le début est toujours une nouvelle recherche de matière, de forme, parfois même d’outil.
                                Je griffonne, barbouille ou modèle sans autre objectif que de provoquer un accident graphique ou un
                                geste qui me surprenne.
                            </p>
                            <p>
                                Je me fabrique ainsi une palette, un nouveau médium qui devient langage.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="fade-in-up">
                        <div className="relative">
                            <img
                                src={processArtwork}
                                alt="Processus créatif - Dessin et recherche"
                                className="w-full shadow-xl"
                            />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary/20 -z-10" />
                        </div>
                    </div>
                </div>

                {/* Subsection 2 */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <div className="fade-in-up order-2 lg:order-1">
                        <div className="relative">
                            <img
                                src={processDrawing}
                                alt="La dentelle humaine - œuvre en cours"
                                className="w-full shadow-xl object-cover aspect-[4/3]"
                            />
                            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-primary/20 -z-10" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="fade-in-up">
                            <h2 className="font-display text-3xl md:text-4xl mt-4 text-foreground">
                                La dentelle humaine une palette tout terrain.
                            </h2>
                        </div>

                        <div className="fade-in-up delay-200 space-y-6 font-body text-lg text-foreground/80 leading-relaxed">
                            <p>
                                Par l’entrelacement compulsif de visages, répétés, brodés, tricotés les uns aux autres, une trame est
                                apparue. Une peau, un tissu biologique à visage humain. Cette matière est devenue organique et
                                constitutive de ma démarche.
                            </p>
                            <p>
                                Aujourd’hui, ce processus se poursuit et s’ouvre.
                            </p>
                            <p>
                                D’autres formes émergent, d’autres écritures prennent place pour aborder d'autres thèmes dans mes
                                nouvelles collections.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
