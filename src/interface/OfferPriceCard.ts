export type OfferPacketName = 'basic' | 'standard' | 'premium' | 'custom';

export default interface I_OfferPriceCard {
    packetName: OfferPacketName;
    priceNet: number;
    priceGross: number;
    description: string;
    realizationTime: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
}
