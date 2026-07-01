import Link from 'next/link';
import { HOME_NAV_ITEMS } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(230,236,245,0.9)] bg-white/86 py-10 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <img src="/logo.png" alt="Webcode Logo" className="h-auto max-w-[178px]" />
            <p className="mt-4 max-w-[34ch] text-[0.96rem] leading-[1.7] text-[var(--wc-text)]">
              Projektuję i wdrażam strony, które mają wyglądać nowocześnie, działać szybko i prowadzić do kontaktu.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {HOME_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.95rem] font-[600] text-[var(--wc-text)] transition-colors hover:text-[var(--wc-blue)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(230,236,245,0.9)] pt-6 text-[0.92rem] text-[var(--wc-text)] md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Webcode. Wszystkie prawa zastrzeżone.</p>
          <a href="mailto:webcode.kontakt@gmail.com" className="font-[600] text-[var(--wc-blue)]">
            webcode.kontakt@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

