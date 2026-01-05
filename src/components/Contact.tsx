import { useState, useEffect } from "react";
import { Instagram, Linkedin, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/services/api";
import contactImage from "@/assets/contact-atelier.jpg";

interface ContactProps {
  initialMessage?: string;
}

export function Contact({ initialMessage }: ContactProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Sync with prop when it changes
  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
        subject: "acquisition",
      }));
    }
  }, [initialMessage]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast({
          title: "Succès",
          description: "Votre demande a bien été envoyée",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Problème à l'envoi de la demande, veuillez réessayer plus tard",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Problème à l'envoi de la demande, veuillez réessayer plus tard",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary scroll-mt-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Image */}
          <div className="fade-in-up order-2 lg:order-1 sticky top-32">
            <div className="relative">
              <img
                src={contactImage}
                alt="Sylviane Le Boulc'h devant son atelier"
                className="w-full aspect-[3/4] object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary/20 -z-10" />
            </div>
          </div>

          {/* Right Column: Content + Form */}
          <div className="order-1 lg:order-2 space-y-10">
            <div className="fade-in-up">
              <span className="font-body uppercase tracking-widest text-sm text-primary">
                Contact
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
                Entrons en
                <br />
                <span className="italic font-normal">conversation</span>
              </h2>
              <div className="section-separator !mx-0" />
            </div>

            <p className="fade-in-up delay-100 font-body text-lg text-foreground/80 leading-relaxed">
              Pour toute demande d'acquisition, de collaboration ou d'exposition,
              n'hésitez pas à me contacter. Je serai ravie d'échanger avec vous
              sur mon travail et mes projets.
            </p>

            {/* Form */}
            <div className="fade-in-up delay-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-body text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Objet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border font-body text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="acquisition">Acquisition d'œuvre</option>
                    <option value="exposition">Proposition d'exposition</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="presse">Presse & Médias</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-body text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </form>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-border my-8" />

            {/* Info & Socials */}
            <div className="fade-in-up delay-300 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                    Atelier
                  </p>
                  <p className="font-body text-foreground">Vieille-Église-en-Yvelines, France</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/sleboulch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 rounded-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sylviane-le-boulch-a9280130/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 rounded-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Partners */}
            <div className="fade-in-up delay-400 pt-4">
              <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-4">
                Partenaires
              </p>
              <div className="flex flex-wrap gap-6 text-foreground/80 font-body">
                <a
                  href="https://www.i-cac.fr/artiste/le-boulc-h-sylviane.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                >
                  I-CAC
                </a>
                <span>·</span>
                <a
                  href="https://www.artsper.com/fr/artistes-contemporains/france/127309/sylviane-le-boulc-h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                >
                  Artsper
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
