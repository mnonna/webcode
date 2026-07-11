import CardBasic from "../common/CardBasic";
import { I_CardBasic } from "@/src/interface/CardBasic";
import { offerCardsData } from "@/src/data/offer/offerCards";

export default function OfferCards() {
    return (
        <section className="section section--offerCards">
            <div className="section-shell">
                <div className="gap-8 mb-10 max-lg:max-w-[24ch] text-center mx-auto">
                    <h2 className="wc-heading-section">Dla kogo jest <span className="wc-text-highlight">ta oferta?</span></h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {offerCardsData.map((card: I_CardBasic, index: number) => (
                        <CardBasic
                            key={card.href ?? index}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
