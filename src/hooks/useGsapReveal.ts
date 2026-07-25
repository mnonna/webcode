'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/src/lib/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

interface GsapRevealOptions {
  selector: string;
  start?: string;
  duration?: number;
  stagger?: number;
  y?: number;
  scale?: number;
  ease?: string;
  once?: boolean;
  dependencyKey?: string | number;
}

export function useGsapReveal<T extends HTMLElement>({
  selector,
  start = 'top 76%',
  duration = 0.75,
  stagger = 0.08,
  y = 24,
  scale = 1,
  ease = 'power3.out',
  once = true,
  dependencyKey = 0,
}: GsapRevealOptions) {
  const scopeRef = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const elements = gsap.utils.toArray<HTMLElement>(selector, scope);

    if (reducedMotion) {
      gsap.set(elements, { clearProps: 'all' });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y,
          scale,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: scope,
            start,
            once,
          },
        },
      );
    }, scope);

    return () => context.revert();
  }, [
    dependencyKey,
    duration,
    ease,
    once,
    reducedMotion,
    scale,
    selector,
    stagger,
    start,
    y,
  ]);

  return scopeRef;
}
