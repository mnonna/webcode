import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const processSlides = [
  {
    id: 'process-01',
    stepLabel: 'Rozmowa',
    title: 'Rozmowa i potrzeby',
    copy: 'Ustalamy cele, grupę docelową i funkcje, które ma spełniać Twoja strona.',
    ctaLabel: 'Omówmy potrzeby',
    imageSrc: '/landing/process/process-step-01.png',
    imageAlt: 'Spotkanie projektowe poświęcone zebraniu potrzeb i celów strony internetowej',
  },
  {
    id: 'process-02',
    stepLabel: 'Struktura',
    title: 'Struktura i zakres',
    copy: 'Plan strony, układ sekcji, treści i funkcjonalności dopasowane do biznesu.',
    ctaLabel: 'Plan strony i funkcje',
    imageSrc: '/landing/process/process-step-02.png',
    imageAlt: 'Projektowanie mapy strony i struktury treści przy wspólnej analizie zakresu projektu',
  },
  {
    id: 'process-03',
    stepLabel: 'Projekt',
    title: 'Projekt i wdrożenie',
    copy: 'Tworzę UI/UX i techniczne wdrożenie w WordPressie lub jako aplikację webową.',
    ctaLabel: 'Zobacz etapy wdrożenia',
    imageSrc: '/landing/process/process-step-03.png',
    imageAlt: 'Praca nad projektem interfejsu i technicznym wdrożeniem strony lub aplikacji',
  },
  {
    id: 'process-04',
    stepLabel: 'Testy',
    title: 'Testy i publikacja',
    copy: 'Sprawdzamy działanie, responsywność, formularze, szybkość i podstawy SEO.',
    ctaLabel: 'Przygotujmy publikację',
    imageSrc: '/landing/process/process-step-04.png',
    imageAlt: 'Weryfikacja jakości projektu, testy wydajności i przygotowanie do publikacji',
  },
  {
    id: 'process-05',
    stepLabel: 'Wsparcie',
    title: 'Wsparcie po starcie',
    copy: 'Możesz liczyć na opiekę techniczną, aktualizacje i dalszy rozwój projektu.',
    ctaLabel: 'Zaplanujmy opiekę',
    imageSrc: '/landing/process/process-step-05.png',
    imageAlt: 'Opieka techniczna nad stroną po wdrożeniu, aktualizacje i bieżące wsparcie',
  },
] as const;

const DESKTOP_BREAKPOINT = '(min-width: 1024px)';
const PROCESS_STEPS_COUNT = processSlides.length;
const PROCESS_SEGMENTS = PROCESS_STEPS_COUNT - 1;

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

function clampSlideIndex(index: number) {
  return Math.min(PROCESS_STEPS_COUNT - 1, Math.max(0, index));
}

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

type ProcessStepNavProps = {
  activeIndex: number;
  fillWidth: string;
  onSelect: (index: number) => void;
  compact?: boolean;
};

function ProcessStepNav({ activeIndex, fillWidth, onSelect, compact = false }: ProcessStepNavProps) {
  return (
    <div className={clsx('relative', compact ? 'pt-8' : 'pt-9')}>
      <div className="absolute left-[10%] right-[10%] top-5">
        <div
          className="h-px bg-[var(--wc-blue)] transition-[width] duration-300"
          style={{ width: fillWidth }}
        ></div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {processSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(index)}
              className="group text-center"
              aria-label={`Przejdź do kroku ${formatStepNumber(index)}: ${slide.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={clsx(
                  'wc-font-heading relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-[1rem] font-[800] transition-all duration-300',
                  isActive
                    ? 'border-[var(--wc-blue)] bg-[var(--wc-blue)] text-white shadow-[0_16px_40px_rgba(21,87,255,0.24)]'
                    : isPast
                      ? 'border-[rgba(21,87,255,0.22)] bg-[var(--wc-blue-soft)] text-[var(--wc-blue)]'
                      : 'border-[rgba(214,224,241,1)] bg-white text-[var(--wc-text)]'
                )}
              >
                {formatStepNumber(index)}
              </span>

              {!compact && (
                <span
                  className={clsx(
                    'mt-4 block text-[0.95rem] font-[600] transition-colors duration-300',
                    isActive ? 'text-[var(--wc-blue)]' : 'text-[var(--wc-dark)]'
                  )}
                >
                  {slide.stepLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const desktopTriggerRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
  });
  const manualProgress = useMemo(
    () => `${(activeIndex / Math.max(1, PROCESS_SEGMENTS)) * 100}%`,
    [activeIndex]
  );
  const useScrollMode = isDesktop && !reducedMotion;
  const activeSlide = processSlides[activeIndex];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < PROCESS_STEPS_COUNT - 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const syncDesktopState = () => setIsDesktop(mediaQuery.matches);

    syncDesktopState();
    mediaQuery.addEventListener('change', syncDesktopState);

    return () => mediaQuery.removeEventListener('change', syncDesktopState);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || useScrollMode) {
      return;
    }

    section.style.setProperty('--process-progress', manualProgress);
  }, [manualProgress, useScrollMode]);

  useEffect(() => {
    if (!emblaApi || useScrollMode) {
      return;
    }

    const syncEmblaState = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    syncEmblaState();
    emblaApi.on('select', syncEmblaState);
    emblaApi.on('reInit', syncEmblaState);

    return () => {
      emblaApi.off('select', syncEmblaState);
      emblaApi.off('reInit', syncEmblaState);
    };
  }, [emblaApi, useScrollMode]);

  useEffect(() => {
    if (!emblaApi || useScrollMode) {
      return;
    }

    emblaApi.scrollTo(activeIndex, true);
  }, [activeIndex, emblaApi, useScrollMode]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = desktopStageRef.current;

    if (!section || !stage || !useScrollMode) {
      desktopTriggerRef.current = null;
      setHeaderHidden(false);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-process-desktop-slide]', { willChange: 'opacity, transform, filter' });

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${PROCESS_SEGMENTS * Math.max(window.innerHeight * 0.95, 780)}`,
        pin: stage,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          setHeaderHidden(self.isActive);
        },
        onRefresh: (self) => {
          section.style.setProperty('--process-progress', `${self.progress * 100}%`);
        },
        onUpdate: (self) => {
          section.style.setProperty('--process-progress', `${self.progress * 100}%`);

          const nextIndex = clampSlideIndex(Math.floor(self.progress * PROCESS_SEGMENTS));
          setActiveIndex((previous) => (previous === nextIndex ? previous : nextIndex));
        },
      });

      desktopTriggerRef.current = trigger;
    }, section);

    return () => {
      desktopTriggerRef.current = null;
      setHeaderHidden(false);
      ctx.revert();
    };
  }, [useScrollMode]);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      const targetIndex = clampSlideIndex(nextIndex);

      if (useScrollMode) {
        const trigger = desktopTriggerRef.current;

        if (!trigger) {
          return;
        }

        const progress = targetIndex / Math.max(1, PROCESS_SEGMENTS);
        const scrollTop = trigger.start + (trigger.end - trigger.start) * progress;

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });

        return;
      }

      if (emblaApi) {
        emblaApi.scrollTo(targetIndex);
      } else {
        setActiveIndex(targetIndex);
      }
    },
    [emblaApi, useScrollMode]
  );

  const handlePrev = useCallback(() => {
    if (!canGoPrev) {
      return;
    }

    goToSlide(activeIndex - 1);
  }, [activeIndex, canGoPrev, goToSlide]);

  const handleNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    goToSlide(activeIndex + 1);
  }, [activeIndex, canGoNext, goToSlide]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="landing-section overflow-hidden"
      style={{ ['--process-progress' as string]: manualProgress }}
    >
      <div className="section-shell">
        <div className={clsx('flex flex-col items-center text-center mx-auto max-w-[75%] lg:max-w-[50%] mb-16')}>
          <div className={clsx('wc-eyebrow')}>
            Jak wygląda współpraca?
          </div>
          <h2
            className={clsx('wc-heading-section wc-text-dark lg:max-w-[20ch] leading-[1.02]')}
          >
            Przejrzysty proces od briefu do publikacji
          </h2>
          <p
            className={clsx(
              'wc-body-lg mt-5 text-[1rem] leading-[1.75]',
              useScrollMode
                ? 'max-w-[40ch]'
                : 'max-w-[24ch] lg:mx-auto lg:max-w-[42ch] lg:text-center'
            )}
          >
            Każdy etap ma jasny cel. Dzięki temu wiesz, co dzieje się z projektem i gdzie jesteśmy w danym momencie.
          </p>
        </div>
      </div>

      {useScrollMode ? (
        <div
          ref={desktopStageRef}
          className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden"
        >
            <div className="absolute inset-0">
              {processSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  data-process-desktop-slide=""
                  className={clsx(
                    'absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-out',
                    index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                  )}
                  style={{
                    transform: index === activeIndex ? 'scale(1)' : 'scale(1.035)',
                    filter: index === activeIndex ? 'blur(0px)' : 'blur(8px)',
                  }}
                >
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="h-[100svh] w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.95)_0%,rgba(248,250,252,0.9)_24%,rgba(248,250,252,0.72)_40%,rgba(248,250,252,0.18)_60%,rgba(248,250,252,0.08)_100%)]"></div>
            <div className="absolute inset-y-0 left-0 w-[52%] bg-[radial-gradient(circle_at_left_center,rgba(21,87,255,0.14)_0%,rgba(21,87,255,0)_72%)]"></div>
            <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(248,250,252,0)_0%,rgba(248,250,252,0.84)_100%)]"></div>

            <div className="relative z-10 flex h-[100svh] flex-col px-16 pb-12 pt-14 xl:px-20">
              <div className="section-shell relative flex min-h-[420px] mt-auto">
                <div className="absolute inset-0 flex flex-col justify-start">
                  <div className="flex items-end gap-5">
                    <span className="wc-font-heading text-[clamp(5rem,9vw,7rem)] font-[800] leading-none tracking-[-0.06em] text-[var(--wc-blue)]">
                      {formatStepNumber(activeIndex)}
                    </span>
                    <span className="mb-3 text-[2.1rem] font-[500] tracking-[-0.04em] text-[rgba(71,85,105,0.9)]">
                      / {String(PROCESS_STEPS_COUNT).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="wc-text-dark mt-6 font-[700] tracking-[-0.04em] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.02]">
                    {activeSlide.title}
                  </h3>
                  <p className="wc-body-lg mt-5 max-w-[28ch] text-[1.08rem] leading-[1.8]">{activeSlide.copy}</p>
                  <div className="mt-8">
                    <a href="#contact" className="wc-btn-primary">
                      {activeSlide.ctaLabel}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={clsx(
                  'absolute left-8 top-1/2 z-20 flex h-10 w-10 2xl:h-16 2xl:w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[var(--wc-dark)] shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-200',
                  canGoPrev ? 'hover:-translate-y-1/2 hover:scale-[1.02]' : 'cursor-not-allowed opacity-45'
                )}
                aria-label="Poprzedni krok procesu"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                className={clsx(
                  'absolute right-8 top-1/2 z-20 flex h-10 w-10 2xl:h-16 2xl:w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[var(--wc-dark)] shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-200',
                  canGoNext ? 'hover:-translate-y-1/2 hover:scale-[1.02]' : 'cursor-not-allowed opacity-45'
                )}
                aria-label="Następny krok procesu"
              >
                <ChevronRight size={24} />
              </button>

              <div className="relative z-10 mt-auto px-16 pb-2 xl:px-20">
                <ProcessStepNav
                  activeIndex={activeIndex}
                  fillWidth="var(--process-progress)"
                  onSelect={goToSlide}
                />
              </div>
            </div>
          </div>
      ) : (
        <div className="section-shell">
          <div>
            <div className="mt-8 overflow-hidden" ref={emblaRef}>
              <div className="-ml-4 flex">
                {processSlides.map((slide, index) => (
                  <div key={slide.id} className="min-w-0 flex-[0_0_100%] pl-4">
                    <article className="overflow-hidden rounded-[32px] border border-[rgba(230,236,245,0.9)] bg-white lg:shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                      <div className="aspect-[0.93] overflow-hidden bg-[var(--wc-surface)] lg:aspect-[1.36]">
                        <img
                          src={slide.imageSrc}
                          alt={slide.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="bg-white px-6 pb-7 pt-6 lg:px-8 lg:pb-8 lg:pt-7">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-end gap-3">
                            <span className="wc-font-heading text-[3.65rem] font-[800] leading-none tracking-[-0.06em] text-[var(--wc-blue)] lg:text-[4.25rem]">
                              {formatStepNumber(index)}
                            </span>
                            <span className="mb-2 text-[1.75rem] font-[500] tracking-[-0.04em] text-[rgba(71,85,105,0.9)] lg:text-[2rem]">
                              / {String(PROCESS_STEPS_COUNT).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={handlePrev}
                              disabled={!canGoPrev}
                              className={clsx(
                                'flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-[rgba(230,236,245,1)] bg-white text-[var(--wc-dark)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200',
                                canGoPrev ? 'hover:scale-[1.02]' : 'cursor-not-allowed opacity-40'
                              )}
                              aria-label="Poprzedni krok procesu"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={!canGoNext}
                              className={clsx(
                                'flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-[rgba(230,236,245,1)] bg-white text-[var(--wc-dark)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200',
                                canGoNext ? 'hover:scale-[1.02]' : 'cursor-not-allowed opacity-40'
                              )}
                              aria-label="Następny krok procesu"
                            >
                              <ChevronRight size={24} />
                            </button>
                          </div>
                        </div>

                        <h3 className="wc-text-dark mt-6 font-[700] tracking-[-0.04em] text-[clamp(1.4rem,5vw,2.7rem)] leading-[1.06]">
                          {slide.title}
                        </h3>
                        <p className="wc-body-lg mt-2 lg:mt-5 max-w-[24ch] text-[1rem] leading-[1.8] lg:max-w-[32ch]">
                          {slide.copy}
                        </p>

                        <div className="mt-8 hidden lg:block">
                          <ProcessStepNav
                            activeIndex={activeIndex}
                            fillWidth={manualProgress}
                            onSelect={goToSlide}
                            compact
                          />
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
