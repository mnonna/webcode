"use client";

import { useState } from "react";
import I_OfferPriceCard from "@/src/interface/OfferPriceCard";
import resolveOfferPacketName from "@/src/data/offer/offerPricing";
import { Check } from "lucide-react";
import Link from "next/link";
import Toggle from "@/src/components/common/Toggle";

export default function OfferPriceCard (props: I_OfferPriceCard) {
    const { packetName, priceNet, priceGross, description, realizationTime, features, buttonText, buttonLink } = props;
    const [priceType, setPriceType] = useState<'net' | 'gross'>('net');
    const title = resolveOfferPacketName(packetName);
    const price = priceType === 'net' ? priceNet : priceGross;
    const formattedPrice = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 2 }).format(price);

    return (
        <div className="flex flex-col p-4 rounded-[16px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="flex flex-col gap-4 mb-4 last:mb-0">
                <h3 className="wc-body-section">{title}</h3>
                <div className="wc-body-sm">{ description }</div>
            </div>
            <div className="flex flex-col gap-2 mb-4 last:mb-0">
                <div className="flex items-baseline gap-1" aria-label="Cena pakietu">
                    {packetName === 'custom' ? 
                        (
                            <>
                                <span className="wc-heading-lg wc-text-blue font-extrabold">Indywidualnie</span>
                            </>
                        )
                    : 
                        (
                            <>
                                <span>od</span>
                                <span className="wc-heading-lg wc-text-blue font-extrabold">{formattedPrice}</span>
                                <span>
                                    <strong>zł</strong>
                                </span>
                            </>
                        )
                    }
                    
                </div>
                <div className="wc-caption">czas realizacji <strong>{ realizationTime }</strong></div>
                {packetName !== 'custom' && (
                    <Toggle
                        checked={priceType === 'gross'}
                        onCheckedChange={(isGross) => setPriceType(isGross ? 'gross' : 'net')}
                        leftLabel="Netto"
                        rightLabel="Brutto"
                        ariaLabel="Przełącz cenę netto lub brutto"
                    />
                )}
            </div>
            <div className="mb-6 last:mb-0">
                {features && features.length > 0 && (
                    <ul>
                        {features.map((feature) => (
                            <li key={feature} className="flex gap-2 mb-2 last:mb-0">
                                <Check className="wc-text-blue" size={20} />
                                <span className="wc-body-sm">{ feature }</span>
                            </li>
                        )) }
                    </ul>
                )}
            </div>
            <div className="mt-auto">
                <Link href={buttonLink} className="wc-btn-primary">{buttonText}</Link>
            </div>
        </div>
    )
}
