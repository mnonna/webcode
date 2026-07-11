import { I_CardBasic } from "@/src/interface/CardBasic";
import Image from "next/image";

export default function CardBasic({ image, title, description }: I_CardBasic) {
    return (
        <div className="card-basic flex flex-col gap-4">
            <div className="relative aspect-[16/9] rounded-[8px] overflow-hidden">
                <Image
                    src={image}
                    alt={title ?? ''}
                    width={700}
                    height={400}
                    preload
                    unoptimized
                    className="absolute top-0 left-0 w-full h-full rounded-[8px] object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="wc-heading-sm">{title}</p>
                <p className="wc-body-md">{description}</p>
            </div>
        </div>
    );
}