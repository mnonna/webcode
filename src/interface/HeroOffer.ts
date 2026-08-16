import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { SectionSpacing } from '@/src/components/common/Section';

type HeroOfferButton = {
    label: string;
    href: string;
};

export default interface I_HeroOffer {
    eyebrow: string;
    titleHighlight: string;
    title: string;
    description: string;
    image: string | StaticImport,
    imageAlt?: string;
    disableSecondButton?: boolean;
    primaryButton?: HeroOfferButton;
    secondaryButton?: HeroOfferButton | null;
    anchor?: string | null;
    paddingTop?: SectionSpacing | null;
    paddingBottom?: SectionSpacing | null;
}
