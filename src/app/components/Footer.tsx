import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="../../../../logo-icon.png" alt="Webcode Logo" className="max-w-[64px]" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tworzę cyfrowe rozwiązania, które napędzają biznes.
            </p>
          </div>

          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#e2e8f0' }}>
              Usługi
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-slate-400 hover:text-indigo-400 transition-colors">Strony internetowe</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-indigo-400 transition-colors">Aplikacje webowe</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-indigo-400 transition-colors">Konsulting IT</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-indigo-400 transition-colors">UX/UI Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#e2e8f0' }}>
              Firma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/kontakt" 
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2026 Webcode. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
