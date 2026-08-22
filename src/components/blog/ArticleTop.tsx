import { I_ArticleTop } from "@/src/interface/Article";
import { Calendar, CircleUserRound, Timer } from "lucide-react";
import Image from "next/image";
import {useLocale, useTranslations} from 'next-intl';

export default function ArticleTop({ category, title, excerpt, date, author, readTime, image, imageAlt }: I_ArticleTop) {
    const locale = useLocale();
    const t = useTranslations('Blog');
    const displayedDate = new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw'
    }).format(new Date(date));

    return (
        <div className="flex flex-col gap-4">
            {category && <div className="wc-eyebrow">{category}</div>}
            <h1 className="wc-heading-section">
                {title}
            </h1>
            <div className="wc-body-md" dangerouslySetInnerHTML={{__html: excerpt}}></div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex gap-2 items-center">
                    <Calendar size={16} className="text-blue" />
                    <span className="wc-body-sm">{displayedDate}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <CircleUserRound size={16} className="text-blue" />
                    <span className="wc-body-sm">{author}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Timer size={16} className="text-blue" />
                    <span className="wc-body-sm">{t('readingTime', {time: readTime})}</span>
                </div>
            </div>
            {image && (
                <figure className="flex flex-col gap-2">
                    <div className="aspect-[16/9]">
                        <Image
                            src={image}
                            alt={imageAlt ?? title}
                            loading="eager"
                            width={1200}
                            height={675}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                    {imageAlt && <figcaption className="wc-body-sm">{imageAlt}</figcaption>}
                </figure>
            )}
        </div>
    )
}
