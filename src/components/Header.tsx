import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Galerie", href: "#galerie" },
  { label: "Démarche", href: "#demarche" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
        : "bg-gradient-to-b from-charcoal/40 to-transparent py-6"
        }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#accueil"
          className={`font-display text-xl md:text-2xl font-medium tracking-wide transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-bronze-light"
            }`}
        >
          Sylviane <span className="italic">Le Boulc'h</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link text-sm font-body uppercase tracking-widest transition-colors pb-1 ${isScrolled ? "text-foreground/80 hover:text-foreground" : "text-cream/90 hover:text-cream"
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`md:hidden p-2 transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-bronze-light"}`}
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay - Portal to Body to avoid stacking context issues */}
      {isMobileMenuOpen && createPortal(
        <div
          className={`md:hidden fixed inset-0 z-[100] backdrop-blur-md transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          style={{ backgroundColor: "rgba(10, 10, 10, 0.9)" }}
        >
          <div className="flex flex-col h-full relative">
            {/* Close Button */}
            <div className="container flex justify-end py-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-cream/80 hover:text-cream transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={32} />
              </button>
            </div>

            {/* Menu Items Centered */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 pb-20">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-3xl md:text-4xl text-cream hover:text-bronze-light transition-all duration-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Decoratif Element */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-cream/40">
                Sylviane Le Boulc'h
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
