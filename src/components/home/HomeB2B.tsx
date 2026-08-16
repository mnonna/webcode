'use client';

import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Check,
  MessageCircleMore,
  UserRoundCheck,
  Zap,
} from 'lucide-react';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';
import { getCmsIcon } from '@/src/components/cms/icons';
import type { CmsB2bBlock } from '@/src/interface/CmsPage';

const benefits = [
  {
    title: 'Konkurencyjna wycena',
    copy: 'Bez agencyjnego narzutu. Ta sama realizacja może kosztować w agencji nawet 3× więcej.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Bezpośredni kontakt',
    copy: 'Rozmawiasz od razu ze mną - bez accountów, PM-ów i przekazywania tasków.',
    icon: MessageCircleMore,
  },
  {
    title: 'Sprawna realizacja',
    copy: 'Decyzje zapadają szybko, a projekt idzie do przodu bez tygodni ciszy.',
    icon: Zap,
  },
  {
    title: 'Jedna odpowiedzialność',
    copy: 'Od ustaleń po wdrożenie wiesz, kto odpowiada za efekt i termin.',
    icon: UserRoundCheck,
  },
] as const;

export default function HomeB2B({ data }: { data?: CmsB2bBlock }) {
  const sectionRef = useGsapReveal<HTMLDivElement>({
    selector: '[data-b2b-reveal]',
    start: 'top 74%',
    duration: 0.9,
    scale: 0.992,
    ease: 'power2.out',
  });

  return (
    <div ref={sectionRef} className="section-shell">
        <div className="grid gap-grid-feature items-center xl:[grid-template-areas:'a_b''c_c']">
          <div
            data-b2b-reveal=""
            role="img"
            aria-label="Porównanie wieloetapowego modelu agencyjnego z bezpośrednią współpracą z Webcode"
            className="relative mx-auto w-full max-w-[500px] xl:[grid-area:a]"
          >
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.18)_0%,_rgba(21,87,255,0)_72%)] blur-3xl"></div>
            <div className="wc-surface-card relative overflow-hidden p-5 shadow-[0_24px_70px_rgba(30,74,180,0.12)] sm:p-7">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[rgba(21,87,255,0.08)] blur-2xl"></div>
              <p className="wc-heading-sm wc-text-dark relative">{data?.comparison.title ?? 'Krótsza droga do gotowego projektu'}</p>

              <div className="relative mt-5 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 text-slate-500">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Building2 size={18} />
                  {data?.comparison.agencyLabel ?? 'Model agencyjny'}
                </div>
                <div className="mt-3 flex items-center justify-between gap-1 text-[11px] font-semibold sm:text-xs">
                  {(data?.comparison.agencySteps.map(({ text }) => text) ?? ['Klient', 'Account', 'PM', 'Wykonawca']).map((step, index, steps) => (
                    <span key={step} className="contents">
                      <span>{step}</span>
                      {index < steps.length - 1 && <ArrowRight size={14} />}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-3 rounded-[22px] bg-[linear-gradient(135deg,#1557ff_0%,#4a70ee_100%)] p-4 text-white shadow-[0_16px_34px_rgba(21,87,255,0.24)]">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {data?.comparison.directLabel ?? 'Współpraca bezpośrednia'}
                </div>
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="rounded-[16px] bg-white/12 px-3 py-3 text-center text-sm font-semibold">{data?.comparison.directSteps[0]?.text ?? 'Ty'}</div>
                  <ArrowRight size={20} />
                  <div className="rounded-[16px] bg-white px-3 py-3 text-center text-sm font-bold text-[var(--wc-blue)]">{data?.comparison.directSteps[1]?.text ?? 'Webcode'}</div>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-3">
                {(data?.comparison.stats ?? [{ value: '0', label: 'pośredników' }, { value: '1', label: 'osoba kontaktowa' }]).map((stat) => (
                  <div key={stat.label} className="rounded-[18px] bg-[rgba(21,87,255,0.07)] px-4 py-3">
                    <div className="text-xl font-bold text-[var(--wc-blue)]">{stat.value}</div>
                    <div className="mt-0.5 text-xs font-semibold text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-b2b-reveal="" className="xl:[grid-area:b] xl:max-w-[500px]">
            <div className="wc-eyebrow">{data?.eyebrow ?? 'Bez pośredników'}</div>
            <h2 className="wc-heading-section wc-text-dark">{data?.title ?? 'Co zyskujesz zamiast współpracy'} <span className="wc-text-highlight">{data?.titleHighlight ?? 'z agencją?'}</span></h2>
            <p className="wc-body-lg mt-5">
              {data?.description ?? 'Współpracujesz bezpośrednio z osobą, która projektuje i wdraża. Płacisz za pracę nad projektem, nie za agencyjną strukturę - i nie czekasz, aż zadanie przejdzie przez kilka osób.'}
            </p>
          </div>

          <div className="grid gap-4 xl:[grid-area:c] xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[repeat(4,minmax(0,1fr))]">
            {(data?.benefits ?? benefits).map((benefit) => {
              const Icon = 'icon' in benefit ? benefit.icon : getCmsIcon(benefit.iconKey);
              const copy = 'copy' in benefit ? benefit.copy : benefit.description;
              const { title } = benefit;
              return (
              <div key={title} data-b2b-reveal="" className="wc-surface-card wc-card-row shadow-none">
                <div className="wc-icon-badge shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="wc-heading-sm wc-text-dark">{title}</h3>
                  <p className="wc-body-md mt-2">{copy}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
    </div>
  );
}
