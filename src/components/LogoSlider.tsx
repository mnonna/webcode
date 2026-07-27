'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/src/lib/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import Image from 'next/image';
import Link from 'next/link';

const brands: { name: string; logo: string; url: string }[] = [
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
  {
    name: 'justgood',
    logo: '/logos/justgood-app.png',
    url: 'https://justgood.app/',
  },
] as const;

function BrandList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {brands.map((brand, idx) => (
        <li
          key={idx}
          className="h-20 max-w-[190px] shrink-0 rounded-[16px] border border-[rgba(230,236,245,0.95)] bg-white px-6 text-dark shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:h-24 sm:w-[230px]"
        >
          <Link href={brand.url} target="_blank" className='flex items-center justify-center gap-2.5 w-full h-full'>
            {brand.logo ? (
              <Image 
                width={100}
                height={100}
                alt={brand.name}
                src={brand.logo}
                style={{
                  height: 'auto',
                }}
              />
            ) : (
              brand.name ?? (
                <span className="wc-body-sm">{brand.name}</span>
              )
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;

    if (!track || reducedMotion) {
      return;
    }

    const firstSet = track.firstElementChild as HTMLElement | null;

    if (!firstSet) {
      return;
    }

    const context = gsap.context(() => {
      const distance = firstSet.getBoundingClientRect().width;

      gsap.to(track, {
        x: -distance,
        duration: distance / 70,
        ease: 'none',
        repeat: -1,
      });
    }, track);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className="section overflow-hidden border-y border-[rgba(230,236,245,0.72)]"
    >
      <div className="section-shell mb-8 flex flex-col items-center text-center sm:mb-10">
        <div className="wc-eyebrow mb-3">
          Współpraca
        </div>
        <h2 id="trusted-brands-heading" className="wc-heading-section mb-6">
          Współpraca <span className='wc-text-highlight'>to podstawa</span>
        </h2>
        <p className="max-w-[75ch]">
          Współpracuję z wieloma firmami, które dostarczają wysokiej jakości produkty i usługi. Przez lata nawiązałem wiele wartościowych relacji biznesowych, które pozwalają mi oferować klientom najlepsze rozwiązania. Współpraca z tymi markami jest dla mnie źródłem inspiracji i motywacji do dalszego rozwoju.
        </p>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div
          ref={trackRef}
          className={`flex w-max ${reducedMotion ? 'mx-auto' : 'will-change-transform'}`}
        >
          <BrandList />
          {!reducedMotion && <BrandList hidden />}
        </div>
      </div>
    </section>
  );
}
