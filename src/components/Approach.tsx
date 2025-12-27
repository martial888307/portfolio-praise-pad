export function Approach() {
  const themes = [
    {
      number: "01",
      title: "La Fragilité",
      description:
        "La dentelle, avec ses ajours et sa transparence, incarne la vulnérabilité de l'existence. Chaque fil est une ligne de vie, chaque vide un espace de respiration.",
    },
    {
      number: "02",
      title: "La Femme",
      description:
        "Sujet et objet tout à la fois, la figure féminine traverse mon œuvre comme un fil conducteur. Elle est force et délicatesse, présence et mystère.",
    },
    {
      number: "03",
      title: "L'Eau",
      description:
        "L'eau nous constitue, nous traverse, nous relie. Mémoire fluide, elle porte nos histoires collectives et nos émotions les plus intimes.",
    },
    {
      number: "04",
      title: "Les Fossiles",
      description:
        "Traces du passé tournées vers l'avenir, les fossiles questionnent notre permanence. La dentelle pétrifiée devient témoignage de notre passage.",
    },
  ];

  return (
    <section id="demarche" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-body uppercase tracking-widest text-sm text-bronze-light fade-in-up">
            Démarche artistique
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 fade-in-up delay-100">
            La dentelle humaine,
            <br />
            <span className="italic font-normal">une palette tout terrain</span>
          </h2>
          <div className="w-16 h-px bg-bronze mx-auto my-8 fade-in-up delay-200" />
          <p className="font-body text-lg text-cream/70 max-w-3xl mx-auto fade-in-up delay-300">
            Mon travail explore la condition humaine à travers quatre thèmes 
            fondamentaux qui s'entrelacent comme les fils d'une dentelle.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {themes.map((theme, index) => (
            <div
              key={theme.number}
              className="fade-in-up group"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <span className="font-display text-5xl md:text-6xl text-bronze/30 group-hover:text-bronze transition-colors duration-500">
                  {theme.number}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-bronze-light transition-colors duration-500">
                    {theme.title}
                  </h3>
                  <p className="font-body text-lg text-cream/70 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-24 text-center fade-in-up delay-500">
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-cream/90 max-w-4xl mx-auto leading-relaxed">
            « Je cherche à révéler l'invisible qui nous relie, 
            à sculpter le vide autant que la matière. »
          </blockquote>
          <p className="font-body text-sm uppercase tracking-widest text-bronze mt-8">
            — Sylviane Le Boulc'h
          </p>
        </div>
      </div>
    </section>
  );
}
