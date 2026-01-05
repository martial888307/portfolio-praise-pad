import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MentionsLegales = () => {
    return (
        <>
            <Header />
            <main className="pt-32 pb-24 bg-secondary min-h-screen">
                <div className="container max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl text-foreground">
                            Mentions Légales
                        </h1>
                        <p className="font-body text-lg text-foreground/60">
                            & Politique de Confidentialité
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm space-y-8 font-body text-foreground/80 leading-relaxed">

                        <section className="space-y-4">
                            <h2 className="font-display text-2xl text-foreground border-b border-primary/20 pb-2">1. Identité</h2>
                            <p>
                                Le présent site est édité par : <strong>Sylviane Le Boulc'h</strong>.<br />
                                Artiste Plasticienne (Affiliée à la Maison des Artistes / SIRET : XXX XXX XXX XXXX).
                            </p>
                            <p>
                                <strong>Adresse de l'atelier :</strong><br />
                                Vieille-Église-en-Yvelines, 78125, France.
                            </p>
                            <p>
                                <strong>Contact :</strong><br />
                                Email : via le formulaire de contact du site.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-display text-2xl text-foreground border-b border-primary/20 pb-2">2. Hébergement</h2>
                            <p>
                                Ce site est hébergé par :<br />
                                <strong>[Nom de l'hébergeur - ex: Vercel Inc.]</strong><br />
                                Adresse : [Adresse de l'hébergeur]<br />
                                Site web : [Site de l'hébergeur]
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-display text-2xl text-foreground border-b border-primary/20 pb-2">3. Propriété Intellectuelle</h2>
                            <p>
                                L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle.
                                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                            <p>
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site (notamment les photos des œuvres), quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'artiste.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-display text-2xl text-foreground border-b border-primary/20 pb-2">4. Données Personnelles & Cookies</h2>
                            <h3 className="font-bold text-foreground">Formulaire de contact</h3>
                            <p>
                                Les informations recueillies sur le formulaire de contact (Nom, Email, Message) ne sont utilisées que dans le cadre de la réponse à votre demande (acquisition, exposition, information)..
                                Elles ne sont en aucun cas vendues, louées ou cédées à des tiers.
                            </p>

                            <h3 className="font-bold text-foreground">Cookies</h3>
                            <p>
                                Ce site est un site vitrine et n'utilise <strong>aucun cookie de traçage publicitaire</strong> ou commercial.
                                Seuls des cookies techniques essentiels au bon fonctionnement du site peuvent être déposés, pour lesquels le consentement n'est pas requis.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-display text-2xl text-foreground border-b border-primary/20 pb-2">5. Droit applicable</h2>
                            <p>
                                Tout litige en relation avec l’utilisation du site est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                            </p>
                        </section>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default MentionsLegales;
