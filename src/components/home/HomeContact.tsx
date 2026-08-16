'use client'

import { useEffect, useRef, useState } from 'react';
import { LucideIcon, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../ContactForm';
import { gsap } from '../../lib/gsap';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import Section from '@/src/components/common/Section';
import type { CmsContactBlock } from '@/src/interface/CmsPage';
import { getCmsIcon } from '@/src/components/cms/icons';

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

const contactDetails: ContactDetail[] = [
  { icon: Mail, label: 'E-mail', value: 'webcode.kontakt@gmail.com', href: 'mailto:webcode.kontakt@gmail.com' },
  { icon: MapPin, label: 'Lokalizacja', value: '62-052 Komorniki, Polska' },
];

export default function HomeContact({ data }: { data?: CmsContactBlock }) {
  const sectionRef = useGsapReveal<HTMLElement>({
    selector: '[data-contact-reveal]',
    start: 'top 76%',
  });
  const illustrationCardRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const illustration = illustrationCardRef.current;

    if (!illustration || reducedMotion) {
      return;
    }

    gsap.to(illustration, {
      y: focusedField ? -8 : 0,
      scale: focusedField ? 1.02 : 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [focusedField, reducedMotion]);

  return (
    <Section id={data?.anchor ?? 'contact'} ref={sectionRef} className="pb-section-bottom-contact">
      <div className="section-shell grid gap-grid-main lg:grid-cols-[0.92fr_minmax(0,1.08fr)]">
        <div>
          <div data-contact-reveal="" className="wc-eyebrow">{data?.eyebrow ?? 'Masz projekt? Napisz do mnie.'}</div>
          <h2 data-contact-reveal="" className="wc-heading-section wc-text-dark max-w-[15ch]">
            {data?.title ?? 'Zacznijmy od krótkiej rozmowy o'} <span className="wc-text-highlight">{data?.titleHighlight ?? 'Twoim celu'}</span>.
          </h2>
          <p data-contact-reveal="" className="wc-body-lg mt-5 max-w-[52ch]">{data?.description ?? 'Opisz potrzeby, a przygotuję wstępną propozycję działań i wycenę. Możesz też od razu dołączyć materiały do projektu.'}</p>

          <div className="mt-8 grid gap-4">
            {(data?.contactDetails ?? contactDetails).map((detail) => {
              const Icon = 'icon' in detail ? detail.icon : getCmsIcon(detail.iconKey);
              const { label, value, href } = detail;
              return (
              <div key={label} data-contact-reveal="" className="wc-surface-card wc-card-row-compact">
                <div className="wc-icon-badge shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="wc-kicker wc-text-muted">{label}</div>
                  {href ? (
                    <a href={href} className="wc-heading-xs wc-text-dark mt-1 block">
                      {value}
                    </a>
                  ) : (
                    <div className="wc-heading-xs wc-text-dark mt-1">{value}</div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <div data-contact-reveal="" className="wc-surface-panel p-panel-contact">
          <div className="mb-6">
            <h3 className="wc-heading-card wc-text-dark">{data?.formTitle ?? 'Napisz wiadomość'}</h3>
            <p className="wc-body-md mt-3">{data?.formDescription ?? 'Odpowiadam zwykle w ciągu 48 godzin roboczych. Im konkretniejszy brief, tym szybciej wrócę z propozycją.'}</p>
          </div>
          <ContactForm onFocusFieldChange={setFocusedField} />
        </div>
      </div>
    </Section>
  );
}
