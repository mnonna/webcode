import I_HeroOffer from "@/src/interface/HeroOffer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function OfferHero(props: I_HeroOffer) {
    const { eyebrow, titleHighlight, title, description, image, imageAlt } = props;

    return (
        <section className="section section--offerHero">
            <div className="section-shell">
                <div className="wc-fluid-gap-hero grid items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                    <div className="relative z-10">
                        <div data-hero-eyebrow="" className="wc-eyebrow">{ eyebrow }</div>
                        <h1 data-hero-heading="" className="wc-heading-hero wc-text-dark">
                            <span className="wc-text-blue">{titleHighlight}</span> {title}
                        </h1>
                        <p data-hero-copy="" className="wc-body-lg mt-6 max-w-[60ch]">
                            { description }
                        </p>
                        <div data-hero-cta="" className="mt-8 flex flex-wrap gap-4">
                        <a href="#contact" className="wc-btn-primary">
                            Bezpłatna wycena
                            <ArrowRight size={18} />
                        </a>
                        <a href="#process" className="wc-btn-secondary">
                            Zobacz, jak pracuję
                        </a>
                        </div>
                    </div>
                    <div className="relative aspect-[16/9]">
                        <Image
                            src={image}
                            alt={imageAlt ?? ''}
                            width={800}
                            height={600}
                            preload
                            unoptimized
                            className="wc-hero-image absolute top-0 left-0 w-full h-full rounded-[16px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );

}
