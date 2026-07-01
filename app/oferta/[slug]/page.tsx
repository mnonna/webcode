import I_PageParams from '@/src/interface/PageParams';
import getHeroOfferData from '@/src/data/offer/hero';
import OfferHero from '@/src/components/offer/Hero';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export const dynamicParams = false;

export function generateStaticParams() {
    return [
        { slug: 'strony-internetowe-poznan' },
    ];
}

export default async function OfferSinglePage({ params }: I_PageParams) {
    const { slug } = await params;
    const heroData = getHeroOfferData(slug);

    return (
        <div
            className="min-h-screen"
        >
            <Header />
            <main>
                <OfferHero {...heroData} />
            </main>
            <Footer />
        </div>
    )
}
