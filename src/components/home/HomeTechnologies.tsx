'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const technologies = [
  {
    name: 'PHP',
    src: '/logos/php.svg',
    width: 100,
    height: 50,
    position: 'lg:left-[7%] lg:top-[2%]',
  },
  {
    name: 'Tailwind CSS',
    src: '/logos/tailwind.png',
    width: 330,
    height: 202,
    position: 'lg:left-[23%] lg:top-[23%]',
  },
  {
    name: 'JavaScript',
    src: '/logos/js.png',
    width: 250,
    height: 250,
    position: 'lg:left-[4%] lg:top-[47%]',
  },
  {
    name: 'Git',
    src: '/logos/git.svg',
    width: 273,
    height: 114,
    position: 'lg:left-[25%] lg:top-[70%]',
  },
  {
    name: 'Laravel',
    src: '/logos/laravel.svg',
    width: 1280,
    height: 308,
    position: 'lg:right-[6%] lg:top-[2%]',
  },
  {
    name: 'GSAP',
    src: '/logos/gsap-black.svg',
    width: 623,
    height: 231,
    position: 'lg:right-[20%] lg:top-[23%]',
  },
  {
    name: 'SCSS',
    src: '/logos/scss.png',
    width: 330,
    height: 248,
    position: 'lg:right-[4%] lg:top-[47%]',
  },
  {
    name: 'React',
    src: '/logos/react.svg',
    width: 800,
    height: 800,
    position: 'lg:right-[23%] lg:top-[70%]',
  },
  {
    name: 'WordPress',
    src: '/landing/brands/wordpress-logo.png',
    width: 960,
    height: 961,
    position: 'lg:left-1/2 lg:top-[2%] lg:-translate-x-1/2',
  },
] as const;

function setHeaderHidden(hidden: boolean) {
  window.dispatchEvent(
    new CustomEvent('webcode:header-visibility', {
      detail: { hidden },
    })
  );
}

export default function HomeTechnologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>('[data-technology-card]', section);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(cards, { clearProps: 'all' });
        return;
      }

      media.add('(min-width: 1024px)', () => {
        gsap.set(cards, { force3D: true, willChange: 'transform,opacity' });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 4.8, 3400)}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onToggle: (self) => {
              setHeaderHidden(self.isActive);
            },
          },
        });

        cards.forEach((card, index) => {
          timeline.fromTo(
            card,
            {
              x: index % 2 === 0 ? 260 : -260,
              y: -180,
              scale: 0.42,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
            },
            index * 0.62
          );
        });

        return () => {
          setHeaderHidden(false);
          gsap.set(cards, { clearProps: 'willChange' });
        };
      });

      media.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          cards,
          {
            y: 30,
            scale: 0.9,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 68%',
            },
          }
        );
      });
    }, section);

    return () => {
      setHeaderHidden(false);
      media.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-16 lg:py-8"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.12)_0%,_rgba(21,87,255,0)_70%)]"></div>
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-[68%] w-[46%] rounded-full bg-[radial-gradient(circle,_rgba(21,87,255,0.11)_0%,_rgba(21,87,255,0)_70%)] blur-3xl"></div>

      <div className="mx-auto grid w-full max-w-[1700px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:px-[clamp(48px,5.73vw,110px)]">
        <div className="relative z-10">
          <div className="wc-eyebrow">Technologie</div>

          <div className="">
            <h2 className="wc-heading-hero wc-text-dark">
              Technologie, <span className="wc-text-highlight">które napędzają</span> nowoczesne strony.
            </h2>
          </div>

          <div className="max-w-[46ch]">
            <p className="wc-body-lg mt-7">
              Wybieram sprawdzone rozwiązania, które zapewniają szybkość, bezpieczeństwo i pełną elastyczność — teraz i w przyszłości.
            </p>
          </div>

          <div className="mt-9 flex max-w-[39rem] items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue/20 bg-blue-soft text-blue">
              <Zap size={24} />
            </div>
            <div className="h-14 w-px shrink-0 bg-blue/25"></div>
            <p className="wc-body-lg">
              Stawiam na jakość kodu, wydajność i narzędzia, które dają realne możliwości.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:block lg:h-[min(72vh,680px)] lg:min-h-[560px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[68%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue/15 lg:block"></div>

          {technologies.map((technology) => (
            <div
              key={technology.name}
              data-technology-card=""
              aria-label={technology.name}
              className={`flex min-h-28 flex-col items-center justify-center rounded-[22px] border border-blue/10 bg-white/90 p-4 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md lg:absolute lg:h-28 lg:w-36 ${technology.position}`}
            >
              <Image
                src={technology.src}
                alt=""
                width={technology.width}
                height={technology.height}
                className="h-10 w-full object-contain"
              />
              <span className="wc-caption mt-2">{technology.name}</span>
            </div>
          ))}

          <div
            data-technology-card=""
            aria-label="Next.js"
            className="col-span-2 flex min-h-40 flex-col items-center justify-center rounded-[28px] border border-blue/15 bg-white p-7 shadow-[0_28px_70px_rgba(21,87,255,0.16)] sm:col-span-1 lg:absolute lg:bottom-[29%] lg:left-1/2 lg:h-56 lg:w-64 lg:-translate-x-1/2"
          >
            <Image
              src="/logos/nextjs.svg"
              alt=""
              width={800}
              height={800}
              sizes="(max-width: 1023px) 33vw, 256px"
              className="h-24 w-24 object-contain lg:h-32 lg:w-32"
            />
            <span className="wc-caption mt-3">Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}
