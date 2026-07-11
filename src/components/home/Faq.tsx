'use client';

import { faq } from "../../data/faq";
import FaqCard from "../common/FaqCard";
import { useRef } from "react";
import { I_Data_Faq } from "@/src/interface/Faq";

export default function Faq({ data } : I_Data_Faq) {
    const sectionEl = useRef<HTMLElement>(null);
    const faqData = (!data) ? faq : data;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <section className="section section--faq" ref={sectionEl}>
                <div className="section-shell">
                    <div className="flex flex-col items-center justify-center text-center mb-12 lg:mb-16">
                        <div className="wc-eyebrow">FAQ</div>
                        <h2 className="">
                            Masz pytania?<br/><span className="wc-text-highlight">Sprawdź odpowiedzi</span>
                        </h2>
                    </div>
                    <div className="faq-list lg:max-w-[800px] mx-auto">
                        {faqData.map((item, index) => (
                            <div key={index} className="faq-item mb-4 last:mb-0">
                                <FaqCard question={item.question} answer={item.answer}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
