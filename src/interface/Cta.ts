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
}
