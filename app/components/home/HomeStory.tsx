import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { BadgeCheck, Eye, Rocket, ShieldCheck } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const storySteps = [
  {
    title: 'Przyciąga uwagę',
    copy: 'Pierwsze sekundy decydują. Przejrzysty układ i mocny przekaz zatrzymują właściwego odbiorcę.',
    icon: Eye,
  },
  {
    title: 'Wyjaśnia ofertę',
    copy: 'Treść i sekcje prowadzą użytkownika przez usługę bez chaosu i bez zbędnych pytań.',
    icon: Rocket,
  },
  {
    title: 'Buduje zaufanie',
    copy: 'Dowody społeczne, jakość wykonania i spójny interfejs wspierają decyzję zakupową.',
    icon: ShieldCheck,
  },
  {
    title: 'Prowadzi do działania',
    copy: 'CTA, formularz i proces kontaktu są zaprojektowane tak, by zamieniać ruch w zapytania.',
    icon: BadgeCheck,
  },
] as const;

function setHeaderHidden(hidden: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent('webcode:header-visibility', {
      detail: { hidden },
    })
  );
}

export default function HomeStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const preview = previewRef.current;

    if (!section || !stage || !preview) {
      return;
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const syncViewport = () => {
      const desktop = desktopQuery.matches;
      setIsDesktop(desktop);
      setActiveStep(desktop ? 0 : storySteps.length - 1);
      section.style.setProperty('--story-progress-scale', desktop && !reducedMotion ? '0' : '1');
    };

    syncViewport();
    desktopQuery.addEventListener('change', syncViewport);

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from('[data-story-heading]', {
          y: 24,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
          },
        });

        gsap.from('[data-story-preview]', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 68%',
          },
        });
      }

      media.add('(min-width: 1024px)', () => {
        const desktopDuration = window.innerHeight * (storySteps.length - 1);

        setActiveStep(0);
        section.style.setProperty('--story-progress-scale', '0');

        return ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: `+=${desktopDuration}`,
          pin: stage,
          pinSpacing: true,
          scrub: true,
          onToggle: (self) => {
            setHeaderHidden(self.isActive);
          },
          onUpdate: (self) => {
            section.style.setProperty('--story-progress-scale', `${self.progress}`);

            const nextStep = Math.min(
              storySteps.length - 1,
              Math.floor(self.progress * (storySteps.length - 1) + 0.0001)
            );
            setActiveStep((previous) => (previous === nextStep ? previous : nextStep));
          },
        });
      });
    }, section);

    return () => {
      desktopQuery.removeEventListener('change', syncViewport);
      setHeaderHidden(false);
      media.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="landing-section landing-section--story"
      style={{ ['--story-progress-scale' as string]: reducedMotion || !isDesktop ? '1' : '0' }}
    >
      <div className="section-shell mb-10 flex flex-col items-center text-center">
        <div data-story-heading="" className="wc-eyebrow">
          Strona ma prowadzić do działania
        </div>
        <h2 data-story-heading="" className="wc-heading-section wc-text-dark max-w-[20ch]">
          Dobra strona nie tylko wygląda. <span className="wc-text-highlight">Ona prowadzi klienta dalej.</span>
        </h2>
        <p data-story-heading="" className="wc-body-lg mt-5 max-w-[52ch]">
          Projektuję układ, który zbiera uwagę, porządkuje ofertę i prowadzi użytkownika do konkretnej decyzji.
        </p>
      </div>

      <div
        ref={stageRef}
        className="section-shell wc-contain-layout-paint wc-fluid-gap-main grid lg:min-h-[100svh] lg:grid-cols-[0.42fr_minmax(0,0.58fr)] lg:items-center"
      >
        <div>
          <div className="relative mt-10 pl-[52px] md:pl-[56px]">
            <div className="absolute bottom-[88px] left-[17px] top-3 w-px overflow-hidden md:bottom-[96px] md:left-[19px]">
              <div className="absolute inset-0 bg-[rgba(230,236,245,1)]"></div>
              <div
                className="absolute inset-0 origin-top bg-[var(--wc-blue)] transition-transform duration-300"
                style={{ transform: `scaleY(${reducedMotion ? '1' : 'var(--story-progress-scale)'})` }}
              ></div>
            </div>
            <div className="space-y-4 lg:space-y-6">
              {storySteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;
                const isRevealed = reducedMotion || !isDesktop || index <= activeStep;

                return (
                  <article
                    key={step.title}
                    className={clsx(
                      'relative flex min-h-[112px] items-start gap-4 rounded-[24px] p-3 transition-all duration-500 md:min-h-[124px]',
                      (isActive || !isDesktop) && 'bg-white/92 shadow-[0_18px_42px_rgba(15,23,42,0.08)]',
                      isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-[0.18]'
                    )}
                  >
                    <div className="wc-step-dot absolute -left-[52px] top-3 md:-left-[56px]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div
                      className={clsx(
                        'wc-icon-badge mt-1 shrink-0 transition-colors duration-300',
                        isActive || !isDesktop ? 'wc-icon-badge--active' : ''
                      )}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="pt-1">
                      <h3 className="wc-heading-sm wc-text-dark">{step.title}</h3>
                      <p className="wc-body-md mt-2 max-w-[34ch]">{step.copy}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <div ref={previewRef} data-story-preview="" className="wc-surface-panel wc-contain-paint wc-panel-fluid-preview w-full overflow-hidden">
            <div className="absolute inset-x-[10%] top-[4%] h-[52%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.14)_0%,_rgba(21,87,255,0)_72%)] blur-2xl"></div>
            <img
              src="/landing/story-preview.avif"
              alt="Makieta sekcji pokazującej, jak strona prowadzi klienta do działania"
              className="relative z-10 w-full rounded-[28px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
