import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default interface I_HeroOffer {
    eyebrow: string;
    titleHighlight: string;
    title: string;
    description: string;
    image: string | StaticImport,
    imageAlt?: string;
}
