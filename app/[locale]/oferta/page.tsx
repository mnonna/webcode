import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import OfferPricing from "@/src/components/offer/OfferPricing";
import HomeContact from '@/src/components/home/HomeContact';

import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';
import type { Metadata } from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';

type OfferPageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: OfferPageProps): Promise<Metadata> {
    const {locale} = await params;
    setRequestLocale(locale);
    const [page, t] = await Promise.all([
        getCmsPageBySlug('oferta', locale),
        getTranslations({locale, namespace: 'Metadata'}),
    ]);
    const title = page?.seo?.metaTitle ?? t('offerTitle');
    const description = page?.seo?.metaDescription ?? t('offerDescription');
    const canonical = getLocalizedUrl(locale, '/oferta');
    const localizedPaths = Object.fromEntries(
        (page?.localizations ?? [{locale, slug: 'oferta'}]).map((item) => [item.locale, '/oferta']),
    ) as Partial<Record<AppLocale, string>>;

    return {
        title,
        description,
        alternates: getAvailableAlternates(locale, localizedPaths),
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {title, description, url: canonical, locale: OPEN_GRAPH_LOCALE[locale], type: 'website'},
    };
}

export default async function OfferPage({params}: OfferPageProps) {
    const {locale} = await params;
    setRequestLocale(locale);
    const page = await getCmsPageBySlug('oferta', locale);
    if (locale !== 'pl' && !page?.blocks?.length) notFound();
    const localeLinks = Object.fromEntries(
        (page?.localizations ?? [{locale: 'pl'}]).map((item) => [item.locale, '/oferta']),
    );
    const heroData = {
        eyebrow: "Oferta",
        title: "Rozwiązania dopasowane<br>",
        titleHighlight: "do twojego biznesu",
        description: "Wybierz usługę i sprawdź orientacyjny zakres projektu. Tworzymy strony i sklepy, które przyciągają klientów i realnie zwiększają sprzedaż.",
        image: "/offer/common/offer-hero.avif",
        disableSecondButton: true,
    }

    return (
        <div
            className="min-h-screen"
        >
            <Header localeLinks={localeLinks} />
            <main>
                {page?.blocks?.length ? (
                    <CmsPageBlocks blocks={page.blocks} />
                ) : (
                    <>
                        <OfferHero {...heroData} />
                        <OfferPricing />
                        <HomeContact />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
