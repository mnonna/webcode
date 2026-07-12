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
import { getOfferDefinition, offerPageSlugs, SITE_URL } from '@/src/data/offer/catalog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
    return offerPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: I_PageParams): Promise<Metadata> {
    const { slug } = await params;
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
    const offer = getOfferDefinition(slug);
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
                <OfferPricing />
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
