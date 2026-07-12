
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import OfferPricing from "@/src/components/offer/OfferPricing";
import HomeContact from '@/src/components/home/HomeContact';

import I_PageParams from "@/src/interface/PageParams";

export default async function OfferPage({ params }: I_PageParams) {
    const heroData = {
        eyebrow: "Oferta",
        title: "do Twojego biznesu",
        titleHighlight: "Rozwiązania dopasowane",
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
                <OfferHero {...heroData} />
                <OfferPricing />
                <HomeContact />
            </main>
            <Footer />
        </div>
    );
}