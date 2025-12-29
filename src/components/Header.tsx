import { useState, useEffect } from "react";
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border transition-all duration-300 ${isMobileMenuOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-4"
          }`}
      >
        <nav className="container py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-body uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
