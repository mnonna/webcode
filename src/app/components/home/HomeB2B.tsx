import { useLayoutEffect, useRef } from 'react';
import { Handshake, Lock, ShieldCheck, Users } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const trustPoints = [
  { title: 'Poufność', copy: 'Szanuję ustalenia z klientami i nie publikuję projektów bez zgody.', icon: Lock },
  { title: 'Partnerstwo', copy: 'Wspieram agencje i software house’y jako techniczny partner B2B.', icon: Handshake },
  { title: 'Zaufanie', copy: 'Pracuję terminowo, jasno komunikuję zakres i dowożę jakość.', icon: ShieldCheck },
  { title: 'Elastyczność', copy: 'Wchodzę tam, gdzie trzeba dowieźć UX, frontend lub cały landing.', icon: Users },
] as const;

export default function HomeB2B() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('[data-b2b-reveal]', {
        y: 32,
        scale: 0.98,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 74%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="b2b" ref={sectionRef} className="landing-section">
      <div className="section-shell wc-surface-panel overflow-hidden px-6 py-8 md:px-10 lg:px-12">
        <div className="grid items-center gap-6 lg:gap-10 lg:grid-cols-[0.95fr_0.8fr_0.72fr]">
          <div data-b2b-reveal="" className="relative mx-auto max-w-[560px]">
            <div className="absolute inset-x-[12%] top-[18%] h-[46%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.16)_0%,_rgba(21,87,255,0)_72%)] blur-3xl"></div>
            <img src="/landing/b2b-illustration.png" alt="Ilustracja współpracy B2B" className="relative z-10 w-full rounded-[28px] object-contain" />
          </div>

          <div data-b2b-reveal="">
            <div className="wc-eyebrow">Współpraca B2B</div>
            <h2 className="wc-heading-section wc-text-dark max-w-[12ch]">Pracuję przy projektach komercyjnych w modelu B2B</h2>
            <p className="wc-body-lg mt-5">
              Część projektów realizuję dla agencji i firm technologicznych jako partner lub podwykonawca. W takich współpracach liczy się poufność, terminowość i odpowiedzialność za jakość wdrożenia.
            </p>
          </div>

          <div className="grid gap-4">
            {trustPoints.map(({ icon: Icon, title, copy }) => (
              <div key={title} data-b2b-reveal="" className="wc-surface-card wc-card-row">
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
