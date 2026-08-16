import CardBasic from "../common/CardBasic";
import { I_CardBasic } from "@/src/interface/CardBasic";
import { offerCardsData } from "@/src/data/offer/offerCards";
import Section from "@/src/components/common/Section";
import type { SectionSpacing } from "@/src/components/common/Section";

type OfferCardsProps = {
    eyebrow?: string | null;
    title?: string;
    titleHighlight?: string;
    items?: I_CardBasic[];
    anchor?: string | null;
    paddingTop?: SectionSpacing | null;
    paddingBottom?: SectionSpacing | null;
};

export default function OfferCards({
    eyebrow,
    title = 'Dla kogo jest',
    titleHighlight = 'ta oferta?',
    items = offerCardsData,
    anchor,
    paddingTop,
    paddingBottom,
}: OfferCardsProps = {}) {
    return (
        <Section id={anchor ?? undefined} paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <div className="section-shell">
                <div className="gap-8 mb-10 max-lg:max-w-[24ch] text-center mx-auto">
                    {eyebrow && <div className="wc-eyebrow justify-center">{eyebrow}</div>}
                    <h2 className="wc-heading-section">{title} <span className="wc-text-highlight">{titleHighlight}</span></h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((card: I_CardBasic, index: number) => (
                        <CardBasic
                            key={card.href ?? index}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
