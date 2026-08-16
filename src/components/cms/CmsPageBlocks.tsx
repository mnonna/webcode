import HomeAbout from '@/src/components/home/HomeAbout';
import HomeApproach from '@/src/components/home/HomeApproach';
import HomeB2B from '@/src/components/home/HomeB2B';
import HomeCaseStudies from '@/src/components/home/HomeCaseStudies';
import HomeContact from '@/src/components/home/HomeContact';
import HomeHero from '@/src/components/home/HomeHero';
import HomeProcess from '@/src/components/home/HomeProcess';
import HomeServices from '@/src/components/home/HomeServices';
import HomeStory from '@/src/components/home/HomeStory';
import HomeTechnologies from '@/src/components/home/HomeTechnologies';
import Faq from '@/src/components/home/Faq';
import LogoSlider from '@/src/components/LogoSlider';
import Cta from '@/src/components/offer/Cta';
import Section from '@/src/components/common/Section';
import type { CmsPageBlock } from '@/src/interface/CmsPage';
import { getStrapiMediaUrl } from '@/src/lib/strapi-media';

export default function CmsPageBlocks({ blocks }: { blocks: CmsPageBlock[] }) {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'sections.hero':
        return <HomeHero key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.about':
        return <HomeAbout key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.story':
        return <HomeStory key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.case-studies':
        return <HomeCaseStudies key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.services':
        return (
          <Section key={`${block.__component}-${block.id}`} id={block.anchor ?? undefined} className="py-section-y-big">
            <HomeServices data={block} />
          </Section>
        );
      case 'sections.approach':
        return <HomeApproach key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.b2b':
        return (
          <Section key={`${block.__component}-${block.id}`} id={block.anchor ?? undefined} className="py-section-y-big">
            <HomeB2B data={block} />
          </Section>
        );
      case 'sections.process':
        return <HomeProcess key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.faq':
        return <Faq key={`${block.__component}-${block.id}`} data={block.items} heading={block} />;
      case 'sections.technologies':
        return <HomeTechnologies key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.partners':
        return <LogoSlider key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.contact':
        return <HomeContact key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.cta':
        return (
          <Cta
            key={`${block.__component}-${block.id}`}
            eyebrow={block.eyebrow ?? ''}
            title={`${block.title}${block.titleHighlight ? ` <span class="wc-text-blue">${block.titleHighlight}</span>` : ''}`}
            description={block.description}
            button={{ text: block.button.label, href: block.button.href }}
            image={block.image ? {
              src: getStrapiMediaUrl(block.image),
              alt: block.imageAlternativeText ?? block.image.alternativeText ?? '',
              width: block.image.width,
              height: block.image.height,
            } : undefined}
          />
        );
      default:
        return null;
    }
  });
}
