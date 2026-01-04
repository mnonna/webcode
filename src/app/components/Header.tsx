import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 12L6 24L14 36" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 12L42 24L34 36" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28 8L20 40" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#475569' }}>
              Web<span style={{ fontWeight: 500, color: '#64748b' }}>code</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-slate-600 hover:text-indigo-600 transition-colors">
              Start
            </button>
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-indigo-600 transition-colors">
              Usługi
            </button>
            <Link to="/realizacje" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Realizacje
            </Link>
            <button onClick={() => scrollToSection('bio')} className="text-slate-600 hover:text-indigo-600 transition-colors">
              O mnie
            </button>
            <Link 
              to="/kontakt" 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-slate-600 hover:text-indigo-600 py-2">
              Start
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-slate-600 hover:text-indigo-600 py-2">
              Usługi
            </button>
            <Link to="/realizacje" className="block w-full text-left text-slate-600 hover:text-indigo-600 py-2" onClick={() => setIsMenuOpen(false)}>
              Realizacje
            </Link>
            <button onClick={() => scrollToSection('bio')} className="block w-full text-left text-slate-600 hover:text-indigo-600 py-2">
              O mnie
            </button>
            <Link 
              to="/kontakt" 
              className="block w-full text-left bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}