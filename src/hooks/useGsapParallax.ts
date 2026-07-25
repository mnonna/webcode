'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/src/lib/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

interface GsapParallaxOptions {
  selector: string;
  scrub?: number;
}

export function useGsapParallax<T extends HTMLElement>({
  selector,
  scrub = 1,
}: GsapParallaxOptions) {
  const scopeRef = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const scope = scopeRef.current;

    if (!scope || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector, scope);

      elements.forEach((element) => {
        const distance = Number(element.dataset.parallaxDistance ?? 120);

        gsap.fromTo(
          element,
          {
            y: distance * -0.2,
          },
          {
            y: distance,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: scope,
              start: 'top top',
              end: 'bottom bottom',
              scrub,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, scope);

    return () => context.revert();
  }, [reducedMotion, scrub, selector]);

  return scopeRef;
}
