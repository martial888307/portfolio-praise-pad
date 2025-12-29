import { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
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
    <section id="contact" className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <div className="space-y-10">
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

            <div className="fade-in-up delay-200 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:sleboulch@gmail.com"
                    className="font-body text-foreground hover:text-primary transition-colors"
                  >
                    sleboulch@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                    Atelier
                  </p>
                  <p className="font-body text-foreground">Vieille-Église-en-Yvelines, France</p>
                </div>
              </div>
            </div>

            <div className="fade-in-up delay-300 flex gap-4">
              <a
                href="https://instagram.com/sleboulch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sylviane-le-boulch-a9280130/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Partners */}
            <div className="fade-in-up delay-400 pt-8 border-t border-border">
              <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-4">
                Partenaires
              </p>
              <div className="flex gap-6 text-muted-foreground font-body">
                <span>ICAC</span>
                <span>·</span>
                <span>Artsper</span>
              </div>
            </div>
          </div>

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
                className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
