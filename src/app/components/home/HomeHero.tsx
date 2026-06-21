import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, BarChart3, Code2, Search, ShieldCheck, ShoppingCart, Sparkles, Wrench } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const heroCards = [
  { title: 'WordPress', subtitle: 'Szybki CMS dla firm', position: 'lg:left-[2%] lg:top-[11%] xl:left-[-4%] xl:top-[10%]', depth: 14, tone: 'icon' },
  { title: 'WooCommerce', subtitle: 'Sklepy, które sprzedają', position: 'lg:left-[2%] lg:top-[56%] xl:left-[-6%] xl:top-[56%]', depth: 24, tone: 'accent' },
  { title: 'SEO', subtitle: 'Widoczność, która pracuje', position: 'lg:right-[2%] lg:top-[12%] xl:right-[-4%] xl:top-[12%]', depth: 16, tone: 'icon' },
  { title: 'UX / UI', subtitle: 'Czytelny interfejs', position: 'lg:right-[3%] lg:top-[50%] xl:right-[-6%] xl:top-[48%]', depth: 26, tone: 'accent' },
  { title: 'Więcej zapytań', subtitle: '+28% miesiąc do miesiąca', position: 'lg:left-[8%] lg:bottom-[2%] xl:left-[2%] xl:bottom-[2%]', depth: 12, tone: 'stat' },
  { title: '.growth {', subtitle: 'color: #2563eb;', position: 'lg:right-[8%] lg:bottom-[5%] xl:right-[-2%] xl:bottom-[6%]', depth: 18, tone: 'code' },
] as const;

const heroChips = ['WordPress', 'WooCommerce', 'UX/UI', 'SEO', 'Opieka techniczna', 'Aplikacje webowe'];

const heroHighlights = [
  { icon: ShieldCheck, title: 'Bezpieczne wdrożenie', copy: 'Przemyślana architektura, czysty kod i dobry proces.' },
  { icon: Sparkles, title: 'Spójny UX', copy: 'Strona wygląda nowocześnie i prowadzi do konkretnej akcji.' },
  { icon: Wrench, title: 'Wsparcie po starcie', copy: 'Nie znikam po publikacji. Mogę rozwijać projekt dalej.' },
] as const;

function HeroCard({ title, subtitle, position, tone, depth }: (typeof heroCards)[number]) {
  const Icon = tone === 'accent' ? ShoppingCart : tone === 'stat' ? BarChart3 : tone === 'code' ? Code2 : Search;

  return (
    <div
      data-hero-card=""
      data-depth={depth}
      className={`wc-surface-card wc-card-compact absolute z-20 hidden w-44 lg:block xl:w-52 ${position}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="wc-heading-xs wc-text-dark">{title}</div>
          <div className={`mt-1 text-[0.82rem] leading-[1.45] ${tone === 'code' ? 'wc-font-mono wc-text-blue' : 'wc-text-muted'}`}>{subtitle}</div>
        </div>
        <div className="wc-icon-badge h-10 w-10 rounded-[16px] shrink-0">
          <Icon size={18} />
        </div>
      </div>
      {tone === 'stat' && (
        <div className="mt-3 h-16 rounded-[18px] bg-gradient-to-br from-[rgba(21,87,255,0.08)] via-white to-[rgba(21,87,255,0.02)] p-3">
          <div className="flex h-full items-end gap-2">
            <div className="h-5 w-8 rounded-full bg-[rgba(21,87,255,0.25)]"></div>
            <div className="h-7 w-8 rounded-full bg-[rgba(21,87,255,0.35)]"></div>
            <div className="h-10 w-8 rounded-full bg-[rgba(21,87,255,0.5)]"></div>
            <div className="h-12 w-8 rounded-full bg-[var(--wc-blue)]"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTimeline
        .from('[data-hero-eyebrow]', { y: 18, opacity: 0, duration: 0.55 })
        .from('[data-hero-heading]', { y: 28, opacity: 0, duration: 0.75 }, '-=0.25')
        .from('[data-hero-copy]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('[data-hero-cta]', { y: 18, opacity: 0, stagger: 0.1, duration: 0.45 }, '-=0.4')
        .from('[data-hero-chip]', { y: 16, opacity: 0, stagger: 0.05, duration: 0.35 }, '-=0.2')
        .from('[data-hero-asset]', { scale: 0.96, y: 18, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('[data-hero-card]', { y: 30, opacity: 0, scale: 0.96, stagger: 0.08, duration: 0.55 }, '-=0.55')
        .from('[data-hero-highlight]', { y: 20, opacity: 0, stagger: 0.08, duration: 0.45 }, '-=0.35')
        .add(() => {
          gsap.set('[data-hero-eyebrow], [data-hero-heading], [data-hero-copy], [data-hero-cta], [data-hero-chip], [data-hero-highlight]', {
            clearProps: 'opacity,transform',
          });
        });

      if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth < 1024) {
        return;
      }

      const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-hero-card]'));
      const xSetters = cards.map((card) => gsap.quickTo(card, 'x', { duration: 0.48, ease: 'power3.out' }));
      const ySetters = cards.map((card) => gsap.quickTo(card, 'y', { duration: 0.48, ease: 'power3.out' }));

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect();
        const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

        cards.forEach((card, index) => {
          const currentDepth = Number(card.dataset.depth || 12);
          xSetters[index](normalizedX * currentDepth * 2.2);
          ySetters[index](normalizedY * currentDepth * 2.2);
        });
      };

      const handlePointerLeave = () => {
        xSetters.forEach((setter) => setter(0));
        ySetters.forEach((setter) => setter(0));
      };

      section.addEventListener('pointermove', handlePointerMove);
      section.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        section.removeEventListener('pointermove', handlePointerMove);
        section.removeEventListener('pointerleave', handlePointerLeave);
      };
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="landing-section overflow-hidden pt-28 md:pt-32">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <div className="relative z-10">
            <div data-hero-eyebrow="" className="wc-eyebrow">
              Tworzę strony, które działają
            </div>
            <h1 data-hero-heading="" className="wc-heading-hero wc-text-dark">
              Strony internetowe, sklepy i aplikacje webowe dla firm, które chcą <span className="wc-text-blue">działać skuteczniej online</span>
            </h1>
            <p data-hero-copy="" className="wc-body-lg mt-6 max-w-[60ch]">
              Projektuję i wdrażam nowoczesne strony WordPress, sklepy WooCommerce oraz aplikacje webowe. Pomagam uporządkować ofertę, poprawić UX i stworzyć stronę gotową do pozyskiwania klientów.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a data-hero-cta="" href="#contact" className="wc-btn-primary">
                Bezpłatna wycena
                <ArrowRight size={18} />
              </a>
              <a data-hero-cta="" href="#process" className="wc-btn-secondary">
                Zobacz, jak pracuję
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {heroChips.map((chip) => (
                <span key={chip} data-hero-chip="" className="wc-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[860px] lg:max-w-none">
            <div className="absolute inset-x-[10%] top-[8%] h-[58%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.18)_0%,_rgba(21,87,255,0)_72%)] blur-3xl"></div>
            <div data-hero-asset="" className="relative z-10">
              <img src="/landing/hero-main.png" alt="Mockup panelu projektu Webcode" className="w-full rounded-[32px] object-contain drop-shadow-[0_34px_90px_rgba(15,23,42,0.18)]" />
            </div>
            {heroCards.map((card) => (
              <HeroCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {heroHighlights.map(({ icon: Icon, title, copy }) => (
            <div key={title} data-hero-highlight="" className="wc-surface-card wc-card-row">
              <div className="wc-icon-badge shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <div className="wc-heading-sm wc-text-dark">{title}</div>
                <p className="wc-body-md mt-2">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
