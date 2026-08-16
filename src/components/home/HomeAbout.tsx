import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Section from '@/src/components/common/Section';
import type { CmsAboutBlock } from '@/src/interface/CmsPage';
import { getStrapiMediaUrl } from '@/src/lib/strapi-media';

export default function HomeAbout({ data }: { data?: CmsAboutBlock }) {
  const imageSrc = data?.image ? getStrapiMediaUrl(data.image) : '/landing/about-character-cutout.png';

  return (
    <Section id={data?.anchor ?? 'about'} className="overflow-hidden pb-0">
      <div className="section-shell">
        <div className="relative grid lg:min-h-[680px] lg:grid-cols-[minmax(0,0.8fr)_minmax(460px,0.98fr)]">
          <div
            className="wc-about-dot-grid wc-about-dot-grid--top"
            aria-hidden="true"
          />
          <div
            className="wc-about-dot-grid wc-about-dot-grid--bottom"
            aria-hidden="true"
          />
          <div className="relative z-20 flex flex-col justify-center">
              <div className="wc-eyebrow">
                {data?.eyebrow ?? 'O mnie'}
              </div>

              <h2 className="wc-heading-section wc-text-dark">
                {data?.title ?? 'Kto to'} <span className="wc-text-highlight">{data?.titleHighlight ?? 'Webcode?'}</span>
              </h2>

              {data?.body ? (
                <div
                  className="wysiwyg wc-body-lg mt-8 max-w-[62ch]"
                  dangerouslySetInnerHTML={{ __html: data.body }}
                />
              ) : (
              <div className="wysiwyg wc-body-lg mt-8 max-w-[62ch]">
                <p>
                  Webcode to freelancer specjalizujący się w projektowaniu i wdrażaniu
                  nowoczesnych stron internetowych oraz aplikacji webowych.
                </p>
                <p>
                  Pracuję na podstawie umowy B2B, co przekłada się na elastyczną
                  współpracę, jasne warunki i pełne zaangażowanie w każdy projekt.
                </p>
                <p>
                  Łączę estetyczny design z solidnym kodem, aby dostarczać rozwiązania,
                  które są szybkie, bezpieczne i skutecznie wspierają rozwój Twojej firmy.
                </p>
              </div>
              )}

              <div className="mt-8">
                <a
                  href={data?.button.href ?? '#contact'}
                  target={data?.button.external ? '_blank' : undefined}
                  rel={data?.button.external ? 'noreferrer' : undefined}
                  className="wc-btn-primary justify-between px-7 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--wc-blue)]"
                >
                  {data?.button.label ?? 'Poznaj mnie'}
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative flex items-end justify-center lg:min-h-[520px] lg:min-h-full mt-[64px] lg:mt-[120px]">
              <div
                className="wc-about-dot-grid wc-about-dot-grid--mobile !-z-1"
                aria-hidden="true"
              />
              <div className="wc-about-character">
                <div
                  className="wc-about-circle wc-about-circle--character"
                  aria-hidden="true"
                />

              <Image
                src={imageSrc}
                alt={data?.imageAlternativeText ?? 'Ilustracja twórcy Webcode'}
                width={data?.image.width ?? 409}
                height={data?.image.height ?? 885}
                sizes="(max-width: 639px) 78vw, (max-width: 1023px) 330px, 409px"
              />
              </div>
            </div>
          </div>
      </div>
    </Section>
  );
}
