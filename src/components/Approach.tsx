import approachWater from "@/assets/approach-water.jpg";
import approachBalance from "@/assets/approach-balance.jpg";
import approachSource from "@/assets/approach-source.jpg";
import approachFossil from "@/assets/approach-fossil.jpg";

export function Approach() {
  const sections = [
    {
      title: "Le vivant",
      description: "Un voyage de création, au cours duquel il doit faire beau et sens tout à la fois.",
      image: null,
      fullWidth: true
    },
    {
      title: "L'équilibre",
      description: (
        <>
          La <strong className="text-cream">dentelle</strong>, avec ses ajours et sa transparence, incarne à la fois la puissance du collectif et la vulnérabilité de l'existence. Chaque fil est une <em>ligne de vie</em>, chaque vide un <em>espace de respiration</em>.
        </>
      ),
      image: approachFossil,
      imageAlt: "Équilibre et dentelle",
      reverse: false
    },
    {
      title: "L'unité commune",
      description: (
        <>
          L'eau nous constitue, nous traverse, nous relie. <strong className="text-cream">Mémoire fluide</strong>, elle porte nos histoires collectives et nos émotions les plus intimes. Valeur de la vie, précieuse, elle devient un <strong className="text-blue-200">or bleu</strong> en danger.
        </>
      ),
      image: approachWater,
      imageAlt: "L'eau et la mémoire fluide",
      reverse: true
    },
    {
      title: "La source",
      description: (
        <>
          La figure féminine est source d'inspiration. Elle est à la fois sujet et surface de projection, <strong className="text-cream">force et vulnérabilité</strong>. À travers elle se lisent les rapports humains, les jeux de pouvoir et les déséquilibres hérités qui structurent nos regards. <em>La source qui pourrait bien changer l'histoire</em>.
        </>
      ),
      image: approachSource,
      imageAlt: "La source féminine",
      reverse: false
    },
    {
      title: "La mémoire",
      description: (
        <>
          Une interrogation sur ce qui restera de notre inaction, sidérés devant ce que nous avons fait au vivant. <strong className="text-cream">Corps fossilisés</strong>, hébétés, traces du présent conjuguées au passé qui seront trouvées dans l'avenir, nos images ridiculement <em>calcifiées</em> questionnent notre permanence.
        </>
      ),
      image: approachBalance,
      imageAlt: "Fossiles et mémoire",
      reverse: true
    }
  ];

  return (
    <section id="demarche" className="py-24 md:py-32 bg-black text-cream scroll-mt-28">
      <div className="container space-y-32">
        {/* Header */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <span className="font-body uppercase tracking-widest text-sm text-bronze-light fade-in-up">
            Démarche artistique
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream fade-in-up delay-100">
            L’anthropocène,
            <br />
            <span className="italic font-normal text-cream/90">sans le nommer</span>
          </h2>
          <div className="w-16 h-px bg-bronze mx-auto fade-in-up delay-200" />
          <p className="font-body text-xl font-normal leading-relaxed fade-in-up delay-300">
            Ma démarche se structure par le <strong className="text-cream font-medium">questionnement</strong>, caché ou emballé dans une certaine <em>poésie</em> ou la <em>dérision</em>. J'explore la <strong className="text-cream font-medium">condition humaine face au vivant</strong>, au travers de thèmes fondamentaux qui s'entrelacent comme les fils d'une dentelle, d'une histoire.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-32">
          {sections.map((section, index) => (
            <div key={section.title} className={`fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              {section.fullWidth ? (
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6">{section.title}</h3>
                  <p className="font-body text-xl italic text-cream/90">{section.description}</p>
                </div>
              ) : (
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${section.reverse ? '' : ''}`}>
                  {/* Content - First on mobile, varies on desktop based on reverse prop */}
                  <div className={`space-y-6 ${section.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="font-display text-3xl md:text-4xl text-cream">{section.title}</h3>
                    <div className="font-body text-lg leading-relaxed text-cream/70 space-y-4">
                      <p>{section.description}</p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${section.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    {section.image && (
                      <div className="relative">
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          className="w-full shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700 ease-out"
                        />
                        {/* Decorative element */}
                        <div className={`absolute -bottom-6 ${section.reverse ? '-left-6' : '-right-6'} w-24 h-24 border border-bronze/30 -z-10`} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center fade-in-up">
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-cream/90 max-w-4xl mx-auto leading-relaxed">
            « Je cherche à révéler l'invisible qui nous relie,
            à sculpter le vide autant que la matière. »
          </blockquote>
        </div>
      </div>
    </section>
  );
}
