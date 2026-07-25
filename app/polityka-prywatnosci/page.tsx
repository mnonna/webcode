import { privacyPolicy } from '@/src/data/privacy';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <section className="section wysiwyg">
                    <div className="section-shell">
                        <article className='wysiwyg xl:max-w-[1000px] mx-auto' dangerouslySetInnerHTML={{ __html: privacyPolicy }}></article>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}