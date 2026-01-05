export function Footer() {
  return (
    <footer className="py-12 bg-charcoal text-cream/60">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a
              href="#accueil"
              className="font-display text-xl text-cream hover:text-bronze transition-colors"
            >
              Sylviane <span className="italic">Le Boulc'h</span>
            </a>
            <p className="font-body text-sm mt-2">
              Artiste plasticienne · Vieille-Église-en-Yvelines
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="#apropos"
              className="font-body text-sm uppercase tracking-wider hover:text-cream transition-colors"
            >
              À propos
            </a>
            <a
              href="#galerie"
              className="font-body text-sm uppercase tracking-wider hover:text-cream transition-colors"
            >
              Galerie
            </a>
            <a
              href="#demarche"
              className="font-body text-sm uppercase tracking-wider hover:text-cream transition-colors"
            >
              Démarche
            </a>
            <a
              href="#contact"
              className="font-body text-sm uppercase tracking-wider hover:text-cream transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-body text-sm">
              © {new Date().getFullYear()} Tous droits réservés
            </p>
            <a
              href="/mentions-legales"
              className="font-body text-xs text-cream/40 hover:text-cream transition-colors"
            >
              Mentions Légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
