import type { Metadata } from 'next';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import HomeContact from '@/src/components/home/HomeContact';
import LogoSlider from '@/src/components/LogoSlider';
import HomeTechnologies from '@/src/components/home/HomeTechnologies';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';

type ContactPageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: ContactPageProps): Promise<Metadata> {
    const {locale} = await params;
    setRequestLocale(locale);
    const [page, t] = await Promise.all([
        getCmsPageBySlug('kontakt', locale),
        getTranslations({locale, namespace: 'Metadata'}),
    ]);
    const title = page?.seo?.metaTitle ?? t('contactTitle');
    const description = page?.seo?.metaDescription ?? t('contactDescription');
    const canonical = getLocalizedUrl(locale, '/kontakt');
    const localizedPaths = Object.fromEntries(
        (page?.localizations ?? [{locale, slug: 'kontakt'}]).map((item) => [item.locale, '/kontakt']),
    ) as Partial<Record<AppLocale, string>>;

    return {
        title,
        description,
        alternates: getAvailableAlternates(locale, localizedPaths),
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title,
            description,
            type: 'website',
            url: canonical,
            locale: OPEN_GRAPH_LOCALE[locale],
            siteName: 'Webcode',
        },
    };
}

export default async function ContactPage({params}: ContactPageProps) {
    const {locale} = await params;
    setRequestLocale(locale);
    const page = await getCmsPageBySlug('kontakt', locale);
    if (locale !== 'pl' && !page?.blocks?.length) notFound();
    const localeLinks = Object.fromEntries(
        (page?.localizations ?? [{locale: 'pl'}]).map((item) => [item.locale, '/kontakt']),
    );
    const heroData = {
        eyebrow: "Kontakt",
        title: "Porozmawiajmy o<br>",
        titleHighlight: "Twoim projekcie",
        description: "Napisz maila lub wypełnij formularz. Odpowiemy szybko i zaproponujemy najlepsze reozwiązania dla Twojego biznesu.", 
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
                        <HomeTechnologies />
                        <LogoSlider />
                        <HomeContact />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
