'use client';

import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Code2, Search, ShieldCheck, ShoppingCart, Sparkles, Wrench } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const heroCards = [
  {
    title: 'WordPress',
    subtitle: 'Szybki CMS dla firm',
    positionCompact: 'lg:left-[-10%] lg:top-[0%] xl:left-[-8%] xl:top-[-10%] 2xl:top-[2%]',
    positionWide: 'min-[1400px]:left-[-4%] min-[1400px]:top-[10%] xl:left-[-2%]',
    depth: 14,
    tone: 'icon',
  },
  {
    title: 'WooCommerce',
    subtitle: 'Sklepy, które sprzedają',
    positionCompact: 'lg:left-[-16%] lg:top-[35%] xl:left-[-13%] xl:top-[35%] 2xl:top-[45%] 2xl:left-[-7%]',
    positionWide: '',
    depth: 24,
    tone: 'accent',
  },
  {
    title: 'SEO',
    subtitle: 'Widoczność, która pracuje',
    positionCompact: 'lg:right-[-6%] lg:top-[12%] xl:right-[-5%] xl:top-[12%] 2xl:top-[6%] 2xl:right-[-5%]',
    positionWide: '',
    depth: 16,
    tone: 'icon',
  },
  {
    title: 'UX / UI',
    subtitle: 'Czytelny interfejs',
    positionCompact: 'lg:right-[-8%] lg:top-[47%] xl:right-[-7%] xl:top-[48%] 2xl:top-[40%]',
    positionWide: 'min-[1400px]:right-[-6%] min-[1400px]:top-[48%] 2xl:right-[-7%]',
    depth: 26,
    tone: 'accent',
  },
  {
    title: 'Więcej zapytań',
    subtitle: '+28% miesiąc do miesiąca',
    positionCompact: 'lg:left-[-7%] lg:bottom-[0%] xl:left-[-5%] xl:bottom-[1%] 2xl:left-[1%] 2xl:bottom-[10%]',
    positionWide: '',
    depth: 12,
    tone: 'icon',
  },
  {
    title: '.growth {',
    subtitle: 'color: #2563eb;',
    positionCompact: 'lg:right-[-3%] lg:bottom-[4%] xl:right-[-2%] xl:bottom-[5%]',
    positionWide: 'min-[1400px]:right-[-2%] min-[1400px]:bottom-[6%] 2xl:right-[-3%]',
    depth: 18,
    tone: 'code',
  },
] as const;

const heroChips = [
  { label: 'WordPress', logoSrc: '/landing/brands/wordpress-logo.png', logoAlt: 'WordPress', logoClassName: 'h-5 w-5' },
  { label: 'WooCommerce', logoSrc: '/landing/brands/woo-logo.svg', logoAlt: 'WooCommerce', logoClassName: 'h-4 w-auto' },
  { label: 'UX/UI', icon: Sparkles },
  { label: 'SEO', icon: Search },
  { label: 'Opieka techniczna', icon: Wrench },
  { label: 'Aplikacje webowe', icon: Code2 },
] as const;

const heroHighlights = [
  { icon: ShieldCheck, title: 'Bezpieczne wdrożenie', copy: 'Przemyślana architektura, czysty kod i dobry proces.' },
  { icon: Sparkles, title: 'Spójny UX', copy: 'Strona wygląda nowocześnie i prowadzi do konkretnej akcji.' },
  { icon: Wrench, title: 'Wsparcie po starcie', copy: 'Nie znikam po publikacji. Mogę rozwijać projekt dalej.' },
] as const;

function HeroCard({ title, subtitle, positionCompact, positionWide, tone, depth }: (typeof heroCards)[number]) {
  const Icon = tone === 'accent' ? ShoppingCart : tone === 'code' ? Code2 : Search;

  return (
    <div
      data-hero-card=""
      data-depth={depth}
      className={`wc-surface-card wc-card-compact absolute z-20 hidden p-3 lg:block xl:p-[0.875rem] min-[1400px]:p-4 ${positionCompact} ${positionWide}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="wc-heading-xs wc-text-dark text-[0.95rem] min-[1400px]:text-base">{title}</div>
          <div className={`mt-1 text-[0.76rem] leading-[1.42] min-[1400px]:text-[0.82rem] min-[1400px]:leading-[1.45] ${tone === 'code' ? 'wc-font-mono wc-text-blue' : 'wc-text-muted'}`}>{subtitle}</div>
        </div>
        <div className="wc-icon-badge h-9 w-9 shrink-0 rounded-[14px] min-[1400px]:h-10 min-[1400px]:w-10 min-[1400px]:rounded-[16px]">
          <Icon size={16} className="min-[1400px]:scale-[1.125]" />
        </div>
      </div>
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
      const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-hero-card]'));
      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTimeline
        .from('[data-hero-eyebrow]', { y: 18, opacity: 0, duration: 0.55 })
        .from('[data-hero-heading]', { y: 28, opacity: 0, duration: 0.75 }, '-=0.25')
        .from('[data-hero-copy]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('[data-hero-cta]', { y: 18, opacity: 0, duration: 0.45 }, '-=0.4')
        .from('[data-hero-chip]', { y: 16, opacity: 0, stagger: 0.05, duration: 0.35 }, '-=0.2')
        .from('[data-hero-asset]', { scale: 0.96, y: 18, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('[data-hero-card]', { y: 30, opacity: 0, scale: 0.96, stagger: 0.08, duration: 0.55 }, '-=0.55')
        .from('[data-hero-highlight]', { y: 20, opacity: 0, stagger: 0.08, duration: 0.45 }, '-=0.35')
        .add(() => {
          gsap.set('[data-hero-eyebrow], [data-hero-heading], [data-hero-copy], [data-hero-cta], [data-hero-chip], [data-hero-highlight]', {
            clearProps: 'opacity,transform',
          });
          gsap.set(cards, { clearProps: 'opacity,transform' });
        });

      const viewportWidth = window.innerWidth;

      if (viewportWidth < 1024) {
        return;
      }

      if (viewportWidth < 1280) {
        return;
      }

      const orbitScale = viewportWidth < 1536 ? 0.72 : 1;
      const orbitTimelines: gsap.core.Timeline[] = [];
      let heroTrigger: ScrollTrigger | null = null;

      gsap.set(cards, { force3D: true, willChange: 'transform' });

      cards.forEach((card, index) => {
        const depth = Number(card.dataset.depth || 12);
        const orbitX = depth * (0.78 + Math.random() * 0.42) * orbitScale;
        const orbitY = depth * (0.52 + Math.random() * 0.34) * orbitScale;
        const durationA = 3.8 + Math.random() * 1.2;
        const durationB = 4.4 + Math.random() * 1.6;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const varianceX = 0.7 + Math.random() * 0.22;
        const varianceY = 0.72 + Math.random() * 0.2;

        const orbitTimeline = gsap
          .timeline({
            paused: true,
            repeat: -1,
            yoyo: true,
            defaults: { ease: 'sine.inOut', force3D: true },
            delay: index * 0.18 + Math.random() * 0.45,
          })
          .to(card, { x: orbitX, y: orbitY * direction, duration: durationA })
          .to(card, { x: -orbitX * varianceX, y: orbitY * 0.74, duration: durationB })
          .to(card, { x: -orbitX, y: -orbitY * direction, duration: durationA })
          .to(card, { x: orbitX * varianceY, y: -orbitY * 0.82, duration: durationB });

        orbitTimelines.push(orbitTimeline);
      });

      heroTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          orbitTimelines.forEach((timeline) => {
            if (self.isActive) {
              timeline.play();
            } else {
              timeline.pause();
            }
          });
        },
      });

      introTimeline.add(() => {
        if (!heroTrigger || !heroTrigger.isActive) {
          return;
        }

        orbitTimelines.forEach((timeline) => timeline.play());
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="landing-section landing-section--hero overflow-hidden">
      <div className="section-shell">
        <div className="wc-fluid-gap-hero grid items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
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
            <div data-hero-cta="" className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="wc-btn-primary">
                Bezpłatna wycena
                <ArrowRight size={18} />
              </a>
              <a href="#process" className="wc-btn-secondary">
                Zobacz, jak pracuję
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {heroChips.map((chip) => (
                <span key={chip.label} data-hero-chip="" className="wc-chip gap-2.5">
                  {'logoSrc' in chip ? (
                    <img src={chip.logoSrc} alt={chip.logoAlt} className={`${chip.logoClassName} shrink-0 object-contain`} />
                  ) : (
                    <chip.icon size={15} className="shrink-0 text-[var(--wc-blue)]" aria-hidden="true" />
                  )}
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-1 mx-auto w-full max-w-[860px] lg:max-w-none">
            <div className="absolute inset-x-[14%] top-[10%] h-[52%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.16)_0%,_rgba(21,87,255,0)_72%)] opacity-80 blur-2xl min-[1400px]:inset-x-[10%] min-[1400px]:top-[8%] min-[1400px]:h-[58%] min-[1400px]:opacity-100 min-[1400px]:blur-3xl"></div>
            <div data-hero-asset="" className="wc-contain-paint relative z-10">
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
