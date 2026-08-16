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
import OfferHero from '@/src/components/offer/Hero';
import OfferCards from '@/src/components/offer/OfferCards';
import OfferPricing from '@/src/components/offer/OfferPricing';
import OtherLocations from '@/src/components/offer/OtherLocations';
import BlogListing from '@/src/components/blog/BlogListing';
import Section from '@/src/components/common/Section';
import type { CmsPageBlock } from '@/src/interface/CmsPage';
import { getStrapiMediaUrl } from '@/src/lib/strapi-media';
import type { BlogListItem } from '@/src/interface/Article';

export default function CmsPageBlocks({
  blocks,
  articles = [],
}: {
  blocks: CmsPageBlock[];
  articles?: BlogListItem[];
}) {
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
          <Section key={`${block.__component}-${block.id}`} id={block.anchor ?? undefined} paddingTop={block.paddingTop} paddingBottom={block.paddingBottom} className="py-section-y-big">
            <HomeServices data={block} />
          </Section>
        );
      case 'sections.approach':
        return <HomeApproach key={`${block.__component}-${block.id}`} data={block} />;
      case 'sections.b2b':
        return (
          <Section key={`${block.__component}-${block.id}`} id={block.anchor ?? undefined} paddingTop={block.paddingTop} paddingBottom={block.paddingBottom} className="py-section-y-big">
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
            paddingTop={block.paddingTop}
            paddingBottom={block.paddingBottom}
          />
        );
      case 'sections.offer-hero':
        return (
          <OfferHero
            key={`${block.__component}-${block.id}`}
            eyebrow={block.eyebrow}
            title={block.title}
            titleHighlight={block.titleHighlight}
            description={block.description}
            image={getStrapiMediaUrl(block.image)}
            imageAlt={block.imageAlternativeText ?? block.image.alternativeText ?? ''}
            primaryButton={{ label: block.primaryButton.label, href: block.primaryButton.href }}
            secondaryButton={block.secondaryButton
              ? { label: block.secondaryButton.label, href: block.secondaryButton.href }
              : null}
            anchor={block.anchor}
            paddingTop={block.paddingTop}
            paddingBottom={block.paddingBottom}
          />
        );
      case 'sections.offer-audience':
        return (
          <OfferCards
            key={`${block.__component}-${block.id}`}
            eyebrow={block.eyebrow}
            title={block.title}
            titleHighlight={block.titleHighlight}
            items={block.items.map((item) => ({
              image: getStrapiMediaUrl(item.image),
              imageAlt: item.imageAlternativeText ?? item.image.alternativeText ?? '',
              title: item.title,
              description: item.description,
            }))}
            anchor={block.anchor}
            paddingTop={block.paddingTop}
            paddingBottom={block.paddingBottom}
          />
        );
      case 'sections.offer-pricing':
        return (
          <OfferPricing
            key={`${block.__component}-${block.id}`}
            pricingKey={block.pricingKey}
            showTabs={block.showTabs}
            pricingSets={block.pricingSets?.map((pricingSet) => ({
              key: pricingSet.key,
              label: pricingSet.label,
              iconKey: pricingSet.iconKey,
              packages: pricingSet.packages.map((pricingPackage) => ({
                packetName: pricingPackage.packetName,
                displayName: pricingPackage.displayName ?? undefined,
                priceNet: Number(pricingPackage.priceNet),
                priceGross: Number(pricingPackage.priceGross),
                description: pricingPackage.description,
                realizationTime: pricingPackage.realizationTime,
                features: pricingPackage.features.map((feature) => feature.text),
                buttonText: pricingPackage.buttonText,
                buttonLink: pricingPackage.buttonLink,
              })),
            }))}
            eyebrow={block.eyebrow}
            title={block.title}
            titleHighlight={block.titleHighlight}
            description={block.description}
            anchor={block.anchor}
            paddingTop={block.paddingTop}
            paddingBottom={block.paddingBottom}
          />
        );
      case 'sections.other-locations':
        return (
          <OtherLocations
            key={`${block.__component}-${block.id}`}
            serviceSlug={block.serviceSlug}
            items={block.items}
            eyebrow={block.eyebrow}
            title={block.title}
            titleHighlight={block.titleHighlight}
            anchor={block.anchor}
            paddingTop={block.paddingTop}
            paddingBottom={block.paddingBottom}
          />
        );
      case 'sections.blog-listing':
        return (
          <BlogListing
            key={`${block.__component}-${block.id}`}
            articles={articles}
            data={block}
          />
        );
      default:
        return null;
    }
  });
}
