import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import OfferHero from "@/src/components/offer/Hero";
import HomeContact from '@/src/components/home/HomeContact';
import LogoSlider from '@/src/components/LogoSlider';

import I_PageParams from "@/src/interface/PageParams";

export default async function OfferPage({ params }: I_PageParams) {
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
                <OfferHero {...heroData} />
                <LogoSlider />
                <HomeContact />
            </main>
            <Footer />
        </div>
    );
}
