import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import OfferPricing from "@/src/components/offer/OfferPricing";
import HomeContact from '@/src/components/home/HomeContact';

import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';
import { SITE_URL } from '@/src/config/site';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getCmsPageBySlug('oferta');
    if (!page?.seo) return {};

    const canonical = page.seo.canonicalPath
        ? `${SITE_URL}${page.seo.canonicalPath}`
        : `${SITE_URL}/oferta`;

    return {
        title: page.seo.metaTitle,
        description: page.seo.metaDescription,
        alternates: { canonical },
        robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function OfferPage() {
    const page = await getCmsPageBySlug('oferta');
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
            <Header />
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
