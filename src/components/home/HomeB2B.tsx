'use client';

import Image from 'next/image';
import { Handshake, Lock, ShieldCheck, Users } from 'lucide-react';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';

const trustPoints = [
  { title: 'Poufność', copy: 'Szanuję ustalenia z klientami i nie publikuję projektów bez zgody.', icon: Lock },
  { title: 'Partnerstwo', copy: 'Wspieram agencje i software house’y jako techniczny partner B2B.', icon: Handshake },
  { title: 'Zaufanie', copy: 'Pracuję terminowo, jasno komunikuję zakres i dowożę jakość.', icon: ShieldCheck },
  { title: 'Elastyczność', copy: 'Wchodzę tam, gdzie trzeba dowieźć UX, frontend lub cały landing.', icon: Users },
] as const;

export default function HomeB2B() {
  const sectionRef = useGsapReveal<HTMLElement>({
    selector: '[data-b2b-reveal]',
    start: 'top 74%',
    duration: 0.9,
    scale: 0.992,
    ease: 'power2.out',
  });

  return (
    <section id="b2b" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="wc-fluid-gap-feature grid items-center xl:[grid-template-areas:'a_b''c_c']">
          <div data-b2b-reveal="" className="relative mx-auto max-w-[500px] max-lg:max-w-[300px] xl:[grid-area:a]">
            <div className="absolute inset-x-[12%] top-[18%] h-[46%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.16)_0%,_rgba(21,87,255,0)_72%)] blur-3xl"></div>
            <Image
              src="/landing/b2b-illustration-1049x881.avif"
              alt="Ilustracja współpracy B2B"
              width={1049}
              height={881}
              sizes="(max-width: 1023px) min(300px, calc(100vw - 32px)), (max-width: 1279px) calc(100vw - 32px), min(38vw, 1049px)"
              className="relative z-10 h-auto w-auto max-w-full rounded-[28px] object-contain"
            />
          </div>

          <div data-b2b-reveal="" className="xl:[grid-area:b] xl:max-w-[500px]">
            <div className="wc-eyebrow">Współpraca B2B</div>
            <h2 className="wc-heading-section wc-text-dark">Pracuję przy projektach komercyjnych <br /><span className="wc-text-highlight">w modelu B2B</span></h2>
            <p className="wc-body-lg mt-5">
              Część projektów realizuję dla agencji i firm technologicznych jako partner lub podwykonawca. W takich współpracach liczy się poufność, terminowość i odpowiedzialność za jakość wdrożenia.
            </p>
          </div>

          <div className="grid gap-4 xl:[grid-area:c] xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[repeat(4,minmax(0,1fr))]">
            {trustPoints.map(({ icon: Icon, title, copy }) => (
              <div key={title} data-b2b-reveal="" className="wc-surface-card wc-card-row shadow-none">
                <div className="wc-icon-badge shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="wc-heading-sm wc-text-dark">{title}</h3>
                  <p className="wc-body-md mt-2">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
