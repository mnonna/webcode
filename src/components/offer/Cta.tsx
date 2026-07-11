import React from "react";
import I_Cta from "@/src/interface/Cta";
import Link from 'next/link';
import { MessagesSquare, SquarePen, ShieldCheck } from "lucide-react";
import ContactCharacter from "../common/animate/ContactCharacter";

export default function Cta({ eyebrow, title, description, button }: I_Cta) {
    const icons = [
        {
            icon: MessagesSquare,
            text: 'Szybka odpowiedź na Twoje pytania',
        },
        {
            icon: SquarePen,
            text: 'Indywidualne podejście do Twojego projektu',
        },
        {
            icon: ShieldCheck,
            text: 'Profesjonalizm i doświadczenie w branży',
        },
    ];

    return (
        <section className="section">
            <div className="section-shell">
                <div className="px-16 py-6 pb-0 wc-bg-blue-soft rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
                        <div className="w-full lg:w-1/2 max-w-[70ch] lg:pb-6">
                            <div className="wc-eyebrow ">{eyebrow}</div>
                            <div className="flex flex-col gap-6">
                                <h2 className="wc-font-heading" dangerouslySetInnerHTML={{ __html: title }}></h2>
                                <div className="wc-font-body">{ description }</div>
                                {icons && (
                                    <div className="flex flex-col gap-6">
                                        {icons.map((icon, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="wc-icon wc-text-blue">{React.createElement(icon.icon)}</div>
                                                <div className="wc-body-sm">{icon.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {button && (
                                    <div>
                                        <Link href={button.href} className="wc-btn-primary">{button.text}</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full lg:w-1/2 max-w-[640px] shrink-0 justify-center">
                            <ContactCharacter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
