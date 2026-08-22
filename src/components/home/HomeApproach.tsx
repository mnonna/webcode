import Image from 'next/image';
import {Link} from '@/src/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import HomeApproachTable from './HomeApproachTable';
import Section from '@/src/components/common/Section';
import type { CmsApproachBlock } from '@/src/interface/CmsPage';
import { getStrapiMediaUrl } from '@/src/lib/strapi-media';
import {toLocalizedHref} from '@/src/i18n/href';

export default function HomeApproach({ data }: { data?: CmsApproachBlock }) {
  return (
    <Section id={data?.anchor ?? 'approach'} paddingTop={data?.paddingTop} paddingBottom={data?.paddingBottom} className="relative py-section-y-big isolate overflow-hidden bg-blue-soft">
      <Image
        src={data?.backgroundImage ? getStrapiMediaUrl(data.backgroundImage) : '/landing/approach-background.avif'}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[54%_center] lg:object-center"
      />
      <div
        className="absolute inset-0 -z-10 bg-white/10 bg-[linear-gradient(90deg,rgba(248,250,252,0.2),rgba(234,241,255,0.32))]"
        aria-hidden="true"
      />

      <div className="section-shell relative z-10">
        <div className="flex flex-col xl:flex-row gap-8 lg:items-center mb-8">
          <div>
            <div className="wc-eyebrow">{data?.eyebrow ?? 'Podejście do projektu'}</div>
            <h2 className="wc-heading-section wc-text-dark max-w-[15ch]">
              {data?.title ?? 'Jak rozwiązuję konkretne'} <span className="wc-text-highlight">{data?.titleHighlight ?? 'problemy'}</span>
            </h2>
          </div>

          <p className="wc-body-lg max-w-[57ch] lg:border-l lg:border-[rgba(15,23,42,0.18)] lg:pl-8">
            {data?.description ?? 'Każdy projekt zaczynam od realnego problemu biznesowego. Analizuję go, upraszczam i projektuję rozwiązania, które są przejrzyste dla użytkownika i skuteczne dla Twojej firmy.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 mb-section-y-big">
          <div>
            <Link href={toLocalizedHref(data?.primaryButton.href ?? '#contact')} className="wc-btn-primary justify-center sm:justify-start">
              {data?.primaryButton.label ?? 'Porozmawiajmy o projekcie'}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div>
            <Link href={toLocalizedHref(data?.secondaryButton.href ?? '/oferta')} className="wc-btn-secondary">
              {data?.secondaryButton.label ?? 'Zobacz ofertę'}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:max-w-[1400px] lg:mx-auto">
          <HomeApproachTable items={data?.items} />
        </div>
      </div>
    </Section>
  );
}
