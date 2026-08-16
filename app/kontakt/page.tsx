import type { Metadata } from 'next';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import HomeContact from '@/src/components/home/HomeContact';
import LogoSlider from '@/src/components/LogoSlider';
import HomeTechnologies from '@/src/components/home/HomeTechnologies';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { SITE_URL } from '@/src/config/site';
import { getCmsPageBySlug } from '@/src/lib/strapi';

const fallbackMetadata: Metadata = {
    title: 'Kontakt | Webcode',
    description: 'Porozmawiajmy o Twoim projekcie. Napisz wiadomość lub wypełnij formularz kontaktowy.',
    alternates: { canonical: `${SITE_URL}/kontakt` },
};

export async function generateMetadata(): Promise<Metadata> {
    const page = await getCmsPageBySlug('kontakt');
    if (!page?.seo) return fallbackMetadata;

    const canonical = page.seo.canonicalPath
        ? `${SITE_URL}${page.seo.canonicalPath}`
        : `${SITE_URL}/kontakt`;

    return {
        title: page.seo.metaTitle,
        description: page.seo.metaDescription,
        alternates: { canonical },
        robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title: page.seo.metaTitle,
            description: page.seo.metaDescription,
            type: 'website',
            url: canonical,
            locale: 'pl_PL',
            siteName: 'Webcode',
        },
    };
}

export default async function ContactPage() {
    const page = await getCmsPageBySlug('kontakt');
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
            <Header />
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
