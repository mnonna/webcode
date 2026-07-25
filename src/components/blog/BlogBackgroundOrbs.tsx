'use client';

import { useGsapParallax } from '@/src/hooks/useGsapParallax';

const ORB_SELECTOR = '[data-blog-parallax-orb]';

export default function BlogBackgroundOrbs() {
  const layerRef = useGsapParallax<HTMLDivElement>({
    selector: ORB_SELECTOR,
    scrub: 1.15,
  });

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        data-blog-parallax-orb=""
        data-parallax-distance="150"
        className="absolute -right-24 top-52 h-72 w-72 rounded-full bg-blue-soft opacity-80 sm:h-96 sm:w-96"
      />

      <div
        data-blog-parallax-orb=""
        data-parallax-distance="-110"
        className="absolute -left-40 top-[25%] h-80 w-80 rounded-full bg-blue-soft opacity-70 lg:h-[28rem] lg:w-[28rem]"
      />

      <div className="absolute bottom-[30%] right-0 translate-x-[20%]">
        <div
          data-blog-parallax-orb=""
          data-parallax-distance="190"
          className="h-72 w-72 rounded-full bg-blue-soft opacity-75 sm:h-96 sm:w-96"
        />
      </div>
    </div>
  );
}
