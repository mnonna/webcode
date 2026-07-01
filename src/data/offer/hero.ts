import I_HeroOffer from "@/src/interface/HeroOffer";
import poznanHeroImage from "@/public/offer/poznan/hero.avif";

type HeroOfferData = Record<string, Record<string, I_HeroOffer>>;

const emptyHeroOffer: I_HeroOffer = {
    eyebrow: '',
    titleHighlight: '',
    title: '',
    description: '',
    image: '',
    imageAlt: '',
};

export function parseOfferPageSlug(slug: string) {
    const normalizedSlug = slug.toLowerCase().trim().replace(/\s+/g, '-');
    const slugParts = normalizedSlug.split('-').filter(Boolean);

    return {
        locationSlug: slugParts.at(-1) ?? '',
        offerSlug: slugParts.slice(0, -1).join('-'),
    };
}

export default function getHeroOfferData(slug: string): I_HeroOffer {
    const { offerSlug, locationSlug } = parseOfferPageSlug(slug);

    const heroOfferData: HeroOfferData = {
        'strony-internetowe': {
            'poznan': {
                eyebrow: 'Strony internetowe Poznań',
                titleHighlight: 'Strony internetowe w Poznaniu',
                title: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Poznania i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: poznanHeroImage,
                imageAlt: 'Strony internetowe Poznań - zdjęcie rynku w Poznaniu z widokiem na Stary Rynek i Ratusz, symbolizujące lokalizację usług.',
            },
        },
    };

    return heroOfferData[offerSlug]?.[locationSlug] || emptyHeroOffer;
}
