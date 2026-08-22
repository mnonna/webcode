import { ArrowRight, Code2, LayoutTemplate, PencilRuler, Search, Shield, ShoppingCart } from 'lucide-react';
import {Link} from '@/src/i18n/navigation';
import { getCmsIcon } from '@/src/components/cms/icons';
import type { CmsServicesBlock } from '@/src/interface/CmsPage';

const defaultServices = [
  { title: 'Strony internetowe WordPress', copy: 'Profesjonalne strony firmowe z ofertą, formularzami i łatwą edycją treści.', icon: LayoutTemplate, href: '/oferta/strony-internetowe-poznan' },
  { title: 'Sklepy WooCommerce', copy: 'Sklepy dopasowane do oferty, płatności i wygodnej obsługi zamówień.', icon: ShoppingCart, href: '/oferta/sklepy-woocommerce-poznan' },
  { title: 'Aplikacje webowe', copy: 'Dedykowane systemy i panele dopasowane do procesów w Twojej firmie.', icon: Code2, href: '/oferta/aplikacje-webowe-poznan' },
  { title: 'Opieka nad stronami', copy: 'Aktualizacje, kopie zapasowe, monitoring i szybka reakcja techniczna.', icon: Shield, href: '/oferta/opieka-nad-stronami-poznan' },
  { title: 'Optymalizacja SEO', copy: 'Lepsza widoczność w Google dzięki technicznie poprawnym wdrożeniom.', icon: Search, href: '/oferta/optymalizacja-seo-poznan' },
  { title: 'Projekty graficzne / UI', copy: 'Projekty interfejsów w Figmie, tworzone ze wsparciem AI i dopasowane do potrzeb klienta oraz późniejszego wdrożenia.', icon: PencilRuler, href: '/oferta/projekty-graficzne-ui-poznan' },
] as const;

export default function HomeServices({ data }: { data?: CmsServicesBlock }) {
  const services = data?.items ?? defaultServices;

  return (
    <div className="section-shell">
        <div className="mx-auto max-w-[40ch] text-center">
          <div className="wc-eyebrow justify-center">{data?.eyebrow ?? 'Co mogę dla Ciebie zrobić?'}</div>
          <h2 className="wc-heading-section wc-text-dark">{data?.title ?? 'Zakres usług dopasowany'} <span className="wc-text-highlight">{data?.titleHighlight ?? 'do wzrostu Twojej firmy'}</span></h2>
          <p className="wc-body-lg mt-5">{data?.description ?? 'Łączę projekt, wdrożenie i wsparcie techniczne, żebyś nie składał strony z przypadkowych elementów.'}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = 'icon' in service ? service.icon : getCmsIcon(service.iconKey);
            const copy = 'copy' in service ? service.copy : service.description;
            const { title, href } = service;
            return (
            <Link key={title} href={href} className="wc-surface-card wc-card-block group transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--wc-blue)]">
              <div className="wc-icon-badge h-14 w-14">
                <Icon size={24} />
              </div>
              <h3 className="wc-heading-sm wc-text-dark mt-4 lg:mt-6">{title}</h3>
              <p className="wc-body-md mt-2 lg:mt-3">{copy}</p>
              <div className="wc-text-blue mt-5 flex items-center gap-2 text-[0.875rem] font-[600]">
                {data?.linkLabel ?? 'Zobacz więcej'}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
            );
          })}
        </div>
    </div>
  );
}
