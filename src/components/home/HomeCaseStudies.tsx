'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const caseStudies = [
  {
    category: 'Strona produktowa',
    title: 'Opakowania, które budują markę',
    description:
      'Wyrazista koncepcja strony dla producenta opakowań, łącząca ofertę, proces i branżowe zastosowania w jeden spójny system.',
    image: '/case-study/opakowania.png',
    imageHeight: 9566,
    mobileImage: '/case-study/mobile/opakowania.png',
    mobileImageHeight: 13588,
    tags: ['Figma', 'UX/UI', 'B2B'],
  },
  {
    category: 'Strona internetowa',
    title: 'Księgowość oparta na jasnych zasadach',
    description: 'Spokojny, ekspercki kierunek dla marki, która porządkuje finanse rozwijających się firm.',
    image: '/case-study/ksiegowe.png',
    imageHeight: 5982,
    mobileImage: '/case-study/mobile/ksiegowe.png',
    mobileImageHeight: 7932,
    tags: ['Figma', 'UX/UI'],
  },
  {
    category: 'Marka wnętrzarska',
    title: 'Przestrzeń zaprojektowana od podstaw',
    description: 'Edytorialna strona pracowni meblarskiej, w której realizacje i materiały grają pierwszoplanową rolę.',
    image: '/case-study/meble.png',
    imageHeight: 9700,
    mobileImage: '/case-study/mobile/meble.png',
    mobileImageHeight: 8080,
    tags: ['Figma', 'Web design'],
  },
] as const;

type ProjectPreviewProps = {
  image: string;
  imageHeight: number;
  mobileImage: string;
  mobileImageHeight: number;
  index: number;
  featured?: boolean;
};

function ProjectPreview({ image, imageHeight, mobileImage, mobileImageHeight, index, featured = false }: ProjectPreviewProps) {
  return (
    <>
      <div
        role="img"
        aria-label="Mobilny widok projektu w ramce telefonu"
        className={`relative mx-auto aspect-[430/880] w-full md:hidden ${featured ? 'max-w-[250px]' : 'max-w-[220px]'}`}
      >
        <div className={`absolute left-[12.56%] top-[4.77%] h-[90.45%] w-[74.88%] overflow-hidden bg-[#f8fafc] ${featured ? 'rounded-[25px]' : 'rounded-[22px]'}`}>
          <Image
            data-case-study-image-mobile=""
            data-animation-index={index}
            src={mobileImage}
            alt=""
            aria-hidden="true"
            width={390}
            height={mobileImageHeight}
            sizes={featured ? '250px' : '220px'}
            className="absolute inset-x-0 top-0 h-auto w-full max-w-none will-change-transform"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        <Image
          src="/case-study/iphone-scroll-mockup.svg"
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          sizes={featured ? '250px' : '220px'}
          className="pointer-events-none z-10 object-contain"
        />
      </div>

      <div
        className={`hidden md:block ${
          featured
            ? 'relative mx-auto aspect-[1.64/1] w-full max-w-[780px] pb-[5%]'
            : 'relative overflow-hidden rounded-[18px] border border-[rgba(15,23,42,0.1)] bg-[#eef3fb] shadow-[0_18px_50px_rgba(15,23,42,0.12)]'
        }`}
      >
        {featured ? (
          <>
            <div className="absolute inset-x-[4%] bottom-[8%] top-0 rounded-[22px] bg-[linear-gradient(145deg,#313a4b_0%,#070b15_48%,#263044_100%)] p-[1.4%] shadow-[0_30px_70px_rgba(15,23,42,0.24)]">
              <div className="relative h-full overflow-hidden rounded-[12px] bg-[#f8fafc]">
                <Image
                  data-case-study-image-desktop=""
                  data-animation-index={index}
                  src={image}
                  alt=""
                  aria-hidden="true"
                  width={1920}
                  height={imageHeight}
                  sizes="(max-width: 1023px) calc(100vw - 72px), 52vw"
                  className="absolute inset-x-0 top-0 h-auto w-full max-w-none will-change-transform"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[12%] rounded-b-[50%] bg-[linear-gradient(180deg,#f8fafc_0%,#9aa6b8_70%,#667386_100%)] shadow-[0_18px_28px_rgba(15,23,42,0.16)]">
              <div className="mx-auto h-[32%] w-[24%] rounded-b-[18px] bg-[#c8d0dc] shadow-inner" />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-9 items-center gap-1.5 border-b border-[rgba(15,23,42,0.08)] bg-white px-4">
              <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
              <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-3 h-3.5 flex-1 rounded-full bg-[#f1f5f9]" />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden bg-[#f8fafc]">
              <Image
                data-case-study-image-desktop=""
                data-animation-index={index}
                src={image}
                alt=""
                aria-hidden="true"
                width={1920}
                height={imageHeight}
                sizes="46vw"
                className="absolute inset-x-0 top-0 h-auto w-full max-w-none will-change-transform"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function HomeCaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const animateImages = (selector: string) => {
        const images = gsap.utils.toArray<HTMLImageElement>(selector);

        if (reducedMotion) {
          images.forEach((image) => gsap.set(image, { y: 0 }));
          return;
        }

        images.forEach((image) => {
          const viewport = image.parentElement;

          if (!viewport) {
            return;
          }

          const travel = () => Math.min(0, viewport.clientHeight - image.clientHeight);
          const animationIndex = Number(image.dataset.animationIndex ?? 0);
          const animation = gsap.timeline({
            delay: animationIndex * 0.9,
            paused: true,
            repeat: -1,
          });

          animation
            .set(image, { y: 0 })
            .to(image, {
              y: travel,
              duration: () => Math.max(14, Math.min(32, Math.abs(travel()) / 85)),
              ease: 'none',
              invalidateOnRefresh: true,
            })
            .to({}, { duration: 1.5 })
            .to(image, {
              y: 0,
              duration: 0.65,
              ease: 'power2.inOut',
              invalidateOnRefresh: true,
            });

          ScrollTrigger.create({
            trigger: viewport,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => animation.play(),
            onEnterBack: () => animation.play(),
            onLeave: () => animation.pause(),
            onLeaveBack: () => animation.pause(),
          });
        });
      };

      media.add('(max-width: 767px)', () => animateImages('[data-case-study-image-mobile]'));
      media.add('(min-width: 768px)', () => animateImages('[data-case-study-image-desktop]'));
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  const featured = caseStudies[0];

  return (
    <section id="case-studies" ref={sectionRef} className="section overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_48%,#ffffff_100%)] py-section-y-big">
      <div className="section-shell">
        <div className="mx-auto flex max-w-[62ch] flex-col items-center text-center">
          <div className="wc-eyebrow justify-center">Wybrane projekty</div>
          <h2 className="wc-heading-section wc-text-dark">
            Projekty, które pokazują <span className="wc-text-highlight">możliwości.</span>
          </h2>
          <p className="wc-body-lg mt-5 max-w-[56ch]">
            Autorskie koncepcje stron zaprojektowane w Figmie — od pierwszej decyzji po kompletny, gotowy do wdrożenia interfejs.
          </p>
        </div>

        <article className="wc-surface-panel mt-8 grid items-center gap-7 overflow-hidden rounded-[24px] p-5 md:mt-10 md:gap-8 md:rounded-[32px] md:p-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:gap-12 lg:p-10">
          <ProjectPreview
            image={featured.image}
            imageHeight={featured.imageHeight}
            mobileImage={featured.mobileImage}
            mobileImageHeight={featured.mobileImageHeight}
            index={0}
            featured
          />

          <div className="mx-auto max-w-[520px] lg:text-center lg:mx-0 lg:pr-4 lg:text-left">
            <div className="wc-kicker">{featured.category}</div>
            <h3 className="wc-heading-lg wc-text-dark mt-5">{featured.title}</h3>
            <p className="wc-body-md mt-4">{featured.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span key={tag} className="wc-chip px-4 py-2 text-[0.8125rem]">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="#contact" className="wc-btn-primary mt-7 w-full justify-center sm:w-auto">
              Porozmawiajmy o projekcie
              <ArrowRight size={17} />
            </Link>
          </div>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {caseStudies.slice(1).map((project, projectIndex) => {
            const index = projectIndex + 1;

            return (
              <article key={project.title} className="wc-surface-card overflow-hidden p-4 md:p-4 lg:p-5">
                <ProjectPreview
                  image={project.image}
                  imageHeight={project.imageHeight}
                  mobileImage={project.mobileImage}
                  mobileImageHeight={project.mobileImageHeight}
                  index={index}
                />
                <div className="px-1 pb-1 pt-6">
                  <div className="wc-kicker">{project.category}</div>
                  <h3 className="wc-heading-sm wc-text-dark mt-3">{project.title}</h3>
                  <p className="wc-body-md mt-2 max-w-[56ch]">{project.description}</p>
                  <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="wc-chip px-3 py-2 text-[0.75rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href="#contact" className="wc-text-blue group flex shrink-0 items-center gap-2 text-[0.875rem] font-[600]">
                      Zobacz projekt
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
