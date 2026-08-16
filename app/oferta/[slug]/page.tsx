import I_PageParams from '@/src/interface/PageParams';
import getHeroOfferData from '@/src/data/offer/hero';
import getOfferFaq from "@/src/data/offer/faq";
import OfferHero from '@/src/components/offer/Hero';
import OfferCards from '@/src/components/offer/OfferCards';
import OfferPricing from '@/src/components/offer/OfferPricing';
import Faq from '@/src/components/home/Faq';
import Cta from '@/src/components/offer/Cta';
import OtherLocations from '@/src/components/offer/OtherLocations';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import getOfferCta from '@/src/data/offer/cta';
import { SITE_URL } from '@/src/config/site';
import { getOfferDefinition, offerPageSlugs } from '@/src/data/offer/catalog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';

export const dynamicParams = true;

export function generateStaticParams() {
    return offerPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: I_PageParams): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCmsPageBySlug(slug);
    if (page?.template === 'offer-detail' && page.seo) {
        const canonical = page.seo.canonicalPath
            ? `${SITE_URL}${page.seo.canonicalPath}`
            : `${SITE_URL}/oferta/${slug}`;

        return {
            title: page.seo.metaTitle,
            description: page.seo.metaDescription,
            alternates: { canonical },
            robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
            openGraph: {
                title: page.seo.metaTitle,
                description: page.seo.metaDescription,
                url: canonical,
                type: 'website',
                locale: 'pl_PL',
            },
        };
    }

    const offer = getOfferDefinition(slug);
    if (!offer) return {};

    const { service, location } = offer;
    const title = `${service.name} ${location.name} | Webcode`;
    const description = service.metadataDescription(location);
    const canonical = `${SITE_URL}/oferta/${slug}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: 'website',
            locale: 'pl_PL',
        },
    };
}

export default async function OfferSinglePage({ params }: I_PageParams) {
    const { slug } = await params;
    const page = await getCmsPageBySlug(slug);
    if (page && page.template !== 'offer-detail') notFound();

    const offer = getOfferDefinition(slug);
    if (!page && !offer) notFound();
    if (page) {
        return (
            <div className="min-h-screen">
                <Header />
                <main>
                    <CmsPageBlocks blocks={page.blocks} />
                </main>
                <Footer />
            </div>
        );
    }

    if (!offer) notFound();
    const heroData = getHeroOfferData(slug);
    const faqData = getOfferFaq(slug);
    const ctaData = getOfferCta(slug);

    return (
        <div
            className="min-h-screen"
        >
            <Header />
            <main>
                <OfferHero {...heroData} />
                <OfferCards />
                <OfferPricing serviceSlug={offer.serviceSlug} />
                <Cta {...ctaData} />
                <OtherLocations
                    serviceSlug={offer.serviceSlug}
                    currentLocationSlug={offer.locationSlug}
                />
                <Faq data={faqData} />
            </main>
            <Footer />
        </div>
    )
}
