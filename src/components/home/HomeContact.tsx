import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LucideIcon, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../ContactForm';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

const contactDetails: ContactDetail[] = [
  { icon: Mail, label: 'E-mail', value: 'webcode.kontakt@gmail.com', href: 'mailto:webcode.kontakt@gmail.com' },
  { icon: Phone, label: 'Telefon', value: '+48 798 344 959', href: 'tel:+48798344959' },
  { icon: MapPin, label: 'Lokalizacja', value: '62-052 Komorniki, Polska' },
];

export default function HomeContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const illustrationCardRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('[data-contact-reveal]', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 76%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

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
    <section id="contact" ref={sectionRef} className="section section--contact">
      <div className="section-shell wc-fluid-gap-main grid lg:grid-cols-[0.92fr_minmax(0,1.08fr)]">
        <div>
          <div data-contact-reveal="" className="wc-eyebrow">Masz projekt? Napisz do mnie.</div>
          <h2 data-contact-reveal="" className="wc-heading-section wc-text-dark max-w-[15ch]">
            Zacznijmy od krótkiej rozmowy o <span className="wc-text-highlight">Twoim celu</span>.
          </h2>
          <p data-contact-reveal="" className="wc-body-lg mt-5 max-w-[52ch]">Opisz potrzeby, a przygotuję wstępną propozycję działań i wycenę. Możesz też od razu dołączyć materiały do projektu.</p>

          <div className="mt-8 grid gap-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
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
            ))}
          </div>
        </div>

        <div data-contact-reveal="" className="wc-surface-panel wc-panel-fluid-contact">
          <div className="mb-6">
            <h3 className="wc-heading-card wc-text-dark">Napisz wiadomość</h3>
            <p className="wc-body-md mt-3">Odpowiadam zwykle w ciągu 48 godzin roboczych. Im konkretniejszy brief, tym szybciej wrócę z propozycją.</p>
          </div>
          <ContactForm onFocusFieldChange={setFocusedField} />
        </div>
      </div>
    </section>
  );
}
