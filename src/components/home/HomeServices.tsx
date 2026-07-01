import { ArrowRight, Code2, LayoutTemplate, PencilRuler, Search, Shield, ShoppingCart } from 'lucide-react';

const services = [
  { title: 'Strony internetowe WordPress', copy: 'Profesjonalne strony firmowe z ofertą, formularzami i łatwą edycją treści.', icon: LayoutTemplate },
  { title: 'Sklepy WooCommerce', copy: 'Sklepy dopasowane do oferty, płatności i wygodnej obsługi zamówień.', icon: ShoppingCart },
  { title: 'Opieka nad stronami', copy: 'Aktualizacje, kopie zapasowe, monitoring i szybka reakcja techniczna.', icon: Shield },
  { title: 'Optymalizacja SEO', copy: 'Lepsza widoczność w Google dzięki technicznie poprawnym wdrożeniom.', icon: Search },
  { title: 'Aplikacje webowe', copy: 'Dedykowane systemy i panele dopasowane do procesów w Twojej firmie.', icon: Code2 },
  { title: 'Projekty graficzne / UI', copy: 'Nowoczesne layouty, bannery, interfejsy i materiały wizualne do projektu.', icon: PencilRuler },
] as const;

export default function HomeServices() {
  return (
    <section id="services" className="section">
      <div className="section-shell">
        <div className="mx-auto max-w-[40ch] text-center">
          <div className="wc-eyebrow justify-center">Co mogę dla Ciebie zrobić?</div>
          <h2 className="wc-heading-section wc-text-dark">Zakres usług dopasowany <span className="wc-text-highlight">do wzrostu Twojej firmy</span></h2>
          <p className="wc-body-lg mt-5">Łączę projekt, wdrożenie i wsparcie techniczne, żebyś nie składał strony z przypadkowych elementów.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="wc-surface-card wc-card-block group transition-transform duration-300 hover:-translate-y-1">
              <div className="wc-icon-badge h-14 w-14">
                <Icon size={24} />
              </div>
              <h3 className="wc-heading-sm wc-text-dark mt-4 lg:mt-6">{title}</h3>
              <p className="wc-body-md mt-2 lg:mt-3">{copy}</p>
              <div className="wc-text-blue mt-5 flex items-center gap-2 text-[0.875rem] font-[600]">
                Zobacz więcej
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
