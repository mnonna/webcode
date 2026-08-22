import { I_ArticleAuthor } from "@/src/interface/Article";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import {useTranslations} from 'next-intl';

export default function ArticleAuthor(author: I_ArticleAuthor) {
    const t = useTranslations('Blog');
    const { avatar, name, bio } = author;

    return (
        <Section className="xl:max-w-[1200px] mx-auto">
            <div className="section-shell">
                <div className="flex flex-col lg:flex-row items-center gap-x-10 gap-y-6 rounded-lg p-6 lg:py-8 lg:px-10 bg-blue-soft">
                    <div className="shrink-0 max-w-[130px] lg:max-w-[170px] rounded-full overflow-hidden">
                        <Image
                            width={170}
                            height={170}
                            src={avatar}
                            alt={t('authorAvatar', {name})}
                            className="h-auto object-cover aspect-1/1"
                        />
                    </div>
                    <div className="flex flex-col gap-4 text-dark">
                        <div className="wc-eyebrow !mb-0">{t('author')}</div>
                        <div className="wc-heading-section">{ name }</div>
                        <div className="wc-body-sm">{ bio }</div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
