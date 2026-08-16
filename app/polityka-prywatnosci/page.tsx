import { privacyPolicy } from '@/src/data/privacy';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Section from '@/src/components/common/Section';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Section className="wysiwyg">
                    <div className="section-shell">
                        <article className='wysiwyg xl:max-w-[1000px] mx-auto' dangerouslySetInnerHTML={{ __html: privacyPolicy }}></article>
                    </div>
                </Section>
            </main>
            <Footer />
        </div>
    )
}
