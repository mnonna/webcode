import type { SectionSpacing } from '@/src/components/common/Section';

export default interface I_Cta {
    eyebrow: string;
    title: string | TrustedHTML;
    description: string;
    button: {
        text: string;
        href: string;
    },
    image?: {
        src: string;
        alt: string;
        width?: number | null;
        height?: number | null;
    },
    paddingTop?: SectionSpacing | null;
    paddingBottom?: SectionSpacing | null;
}
