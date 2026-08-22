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
import { getOfferDefinition, offerPageSlugs } from '@/src/data/offer/catalog';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates, getLocalizedPath, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';
import {setRequestLocale} from 'next-intl/server';

type OfferDetailPageProps = {params: Promise<{locale: AppLocale; slug: string}>};

export const dynamicParams = true;

export function generateStaticParams() {
    return offerPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: OfferDetailPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const page = await getCmsPageBySlug(slug, locale);
    if (page?.template === 'offer-detail' && page.seo) {
        const localizedPaths = Object.fromEntries(
            (page.localizations ?? [{locale, slug, template: page.template}]).map((item) => [item.locale, `/oferta/${item.slug}`]),
        ) as Partial<Record<AppLocale, string>>;
        const canonical = getLocalizedUrl(locale, localizedPaths[locale] ?? `/oferta/${slug}`);

        return {
            title: page.seo.metaTitle,
            description: page.seo.metaDescription,
            alternates: getAvailableAlternates(locale, localizedPaths),
            robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
            openGraph: {
                title: page.seo.metaTitle,
                description: page.seo.metaDescription,
                url: canonical,
                type: 'website',
                locale: OPEN_GRAPH_LOCALE[locale],
            },
        };
    }

    const offer = locale === 'pl' ? getOfferDefinition(slug) : null;
    if (!offer) return {};

    const { service, location } = offer;
    const title = `${service.name} ${location.name} | Webcode`;
    const description = service.metadataDescription(location);
    const canonical = getLocalizedUrl(locale, `/oferta/${slug}`);

    return {
        title,
        description,
        alternates: getAvailableAlternates(locale, {[locale]: `/oferta/${slug}`}),
        openGraph: {
            title,
            description,
            url: canonical,
            type: 'website',
            locale: OPEN_GRAPH_LOCALE[locale],
        },
    };
}

export default async function OfferSinglePage({ params }: OfferDetailPageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const page = await getCmsPageBySlug(slug, locale);
    if (page && page.template !== 'offer-detail') notFound();
    if (page && page.slug !== slug) redirect(getLocalizedPath(locale, `/oferta/${page.slug}`));

    const offer = locale === 'pl' ? getOfferDefinition(slug) : null;
    if (!page && !offer) notFound();
    if (page) {
        return (
            <div className="min-h-screen">
                <Header localeLinks={Object.fromEntries(
                    (page.localizations ?? [{locale, slug, template: page.template}]).map((item) => [item.locale, `/oferta/${item.slug}`]),
                )} />
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
            <Header localeLinks={{pl: `/oferta/${slug}`}} />
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
