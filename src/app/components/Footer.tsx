import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 12L6 24L14 36" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M34 12L42 24L34 36" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 8L20 40" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#e2e8f0' }}>
                Web<span style={{ fontWeight: 500, color: '#cbd5e1' }}>code</span>
              </span>
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
              <li><a href="#bio" className="text-slate-400 hover:text-indigo-400 transition-colors">O mnie</a></li>
              <li><Link to="/realizacje" className="text-slate-400 hover:text-indigo-400 transition-colors">Realizacje</Link></li>
              <li><a href="#contact" className="text-slate-400 hover:text-indigo-400 transition-colors">Kontakt</a></li>
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
