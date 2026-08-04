'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CodeXml,
  LayoutPanelTop,
  MessageCircleMore,
  ShieldCheck,
} from 'lucide-react';

const processSteps = [
  {
    id: 'process-01',
    title: 'Brief',
    copy: 'Krótka rozmowa o celach, zakresie i potrzebach projektu.',
    icon: MessageCircleMore,
  },
  {
    id: 'process-02',
    title: 'Struktura',
    copy: 'Układ strony, zakres prac i konkretny plan działania.',
    icon: LayoutPanelTop,
  },
  {
    id: 'process-03',
    title: 'Projekt i wdrożenie',
    copy: 'Projektuję interfejs i wdrażam gotowe rozwiązanie.',
    icon: CodeXml,
  },
  {
    id: 'process-04',
    title: 'Testy i publikacja',
    copy: 'Sprawdzamy całość, nanosimy poprawki i publikujemy.',
    icon: CheckCircle2,
  },
] as const;

const PROCESS_STEPS_COUNT = processSteps.length;

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

export default function HomeProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
  });

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncActiveIndex = () => setActiveIndex(emblaApi.selectedScrollSnap());

    syncActiveIndex();
    emblaApi.on('select', syncActiveIndex);
    emblaApi.on('reInit', syncActiveIndex);

    return () => {
      emblaApi.off('select', syncActiveIndex);
      emblaApi.off('reInit', syncActiveIndex);
    };
  }, [emblaApi]);

  const goToStep = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section id="process" className="section">
      <div className="section-shell">
        <div className="wc-surface-panel px-0 py-0 max-lg:!rounded-none max-lg:!border-0 max-lg:!bg-transparent max-lg:!shadow-none max-lg:!backdrop-blur-none sm:px-0 sm:py-0 lg:overflow-hidden lg:px-12 lg:py-16 xl:px-16 xl:py-20">
          <header className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <div className="wc-eyebrow">Jak wygląda współpraca?</div>
            <h2 className="wc-heading-section wc-text-dark max-w-[22ch]">
              Przejrzysty proces od briefu do publikacji
            </h2>
            <p className="wc-body-lg mt-4 max-w-[62ch] lg:mt-5">
              Prosty, uporządkowany proces. Na każdym etapie wiesz, co robimy i co jest dalej.
            </p>
          </header>

          <div className="mt-10 hidden lg:grid lg:grid-cols-4 xl:mt-14" aria-label="Etapy współpracy">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.id} className="relative flex flex-col items-center px-3 text-center xl:px-5">
                  {index > 0 && (
                    <div className="absolute right-1/2 top-10 z-0 flex w-full -translate-y-1/2 items-center px-[52px]" aria-hidden="true">
                      <span className="h-px flex-1 border-t border-dashed border-[rgba(21,87,255,0.28)]" />
                      <ArrowRight className="-ml-px text-[rgba(21,87,255,0.55)]" size={20} strokeWidth={1.5} />
                    </div>
                  )}

                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-white bg-[var(--wc-blue-soft)] text-[var(--wc-blue)] shadow-[0_14px_36px_rgba(21,87,255,0.12)]">
                    <Icon size={38} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <div className="mt-7">
                    <span className="wc-kicker">{formatStepNumber(index)}</span>
                    <h3 className="wc-heading-sm wc-text-dark mt-2">{step.title}</h3>
                    <p className="wc-body-md mt-3 max-w-[24ch]">{step.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-9 lg:hidden">
            <div
              ref={emblaRef}
              className="-mx-5 -my-12 overflow-hidden px-5 py-12"
              role="region"
              aria-roledescription="karuzela"
              aria-label="Etapy współpracy"
            >
              <div className="-ml-3 flex touch-pan-y">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className="min-w-0 flex-[0_0_88%] pl-3 sm:flex-[0_0_62%]"
                      role="group"
                      aria-roledescription="slajd"
                      aria-label={`${index + 1} z ${PROCESS_STEPS_COUNT}: ${step.title}`}
                    >
                      <article className="h-full rounded-[24px] border border-[var(--wc-border)] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--wc-blue-soft)] text-[var(--wc-blue)]">
                            <Icon size={32} strokeWidth={1.8} aria-hidden="true" />
                          </div>
                          <span className="wc-font-heading text-[1rem] font-[800] text-[var(--wc-blue)]">
                            {formatStepNumber(index)}
                          </span>
                        </div>
                        <h3 className="wc-heading-card wc-text-dark mt-6">{step.title}</h3>
                        <p className="wc-body-md mt-3">{step.copy}</p>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-5">
              <div className="flex gap-2" aria-label="Wybierz krok procesu">
                {processSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(index)}
                    className={`h-2.5 rounded-full transition-[width,background-color] duration-200 ${
                      index === activeIndex ? 'w-8 bg-[var(--wc-blue)]' : 'w-2.5 bg-[rgba(21,87,255,0.18)]'
                    }`}
                    aria-label={`Przejdź do kroku ${index + 1}: ${step.title}`}
                    aria-current={index === activeIndex ? 'step' : undefined}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goToStep(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wc-border)] bg-white text-[var(--wc-dark)] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Poprzedni krok procesu"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(activeIndex + 1)}
                  disabled={activeIndex === PROCESS_STEPS_COUNT - 1}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wc-border)] bg-white text-[var(--wc-dark)] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Następny krok procesu"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-fit max-w-full items-center gap-3 rounded-full bg-[var(--wc-blue-soft)] px-5 py-3 text-left lg:mt-14 lg:px-7">
            <ShieldCheck className="shrink-0 text-[var(--wc-blue)]" size={21} aria-hidden="true" />
            <p className="wc-body-sm font-[600] text-[var(--wc-dark)]">
              Po publikacji możliwe jest dalsze wsparcie i rozwój projektu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
