export default interface I_Cta {
    eyebrow: string;
    title: string | TrustedHTML;
    description: string;
    button: {
        text: string;
        href: string;
    },
}