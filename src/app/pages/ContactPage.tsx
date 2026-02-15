import React from 'react';
import { Mail, Clock, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1758611970075-42ef0f35e3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwY29tbXVuaWNhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3Njc1MzUwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/90 to-indigo-50/95"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
            Skontaktuj się ze mną
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Masz pytania? Chcesz omówić projekt? Jestem dostępny od poniedziałku do piątku, w godzinach 9:00-17:00.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                  Email
                </h3>
                <a href="mailto:kontakt@webcode.pl" className="text-slate-600 hover:text-indigo-600 transition-colors">
                webcode.kontakt@gmail.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                  Godziny dostępności
                </h3>
                <div className="text-slate-600 space-y-1">
                  <p>Pon - Pt: 9:00 - 17:00</p>
                  <p>Sob - Niedz: Nieczynne</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                  Lokalizacja
                </h3>
                <p className="text-slate-600">
                  62-052 Komorniki, Polska
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-2xl border border-indigo-200">
                <h3 className="text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                  Szybka odpowiedź
                </h3>
                <p className="text-slate-600 text-sm">
                  Odpowiadam na wiadomości zwykle w ciągu 48 godzin roboczych.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/50">
                <div className="mb-8">
                  <h2 className="text-3xl mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                    Napisz do mnie
                  </h2>
                  <p className="text-slate-600">
                    Wypełnij formularz poniżej, a odezwę się do Ciebie najszybciej jak to możliwe. Możesz również załączyć pliki z dokumentacją projektu.
                  </p>
                </div>

                <ContactForm />
              </div>

              {/* Additional Info */}
              <div className="mt-8 bg-gradient-to-br from-slate-50 to-stone-50 p-6 rounded-2xl border border-slate-200/50">
                <h3 className="text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                  Co dalej?
                </h3>
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px' }}>
                      1
                    </div>
                    <p>Otrzymasz ode mnie odpowiedź w ciągu 48 godzin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px' }}>
                      2
                    </div>
                    <p>Umówimy się na krótką rozmowę, aby omówić szczegóły projektu</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px' }}>
                      3
                    </div>
                    <p>Przygotowuję wycenę i harmonogram realizacji</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px' }}>
                      4
                    </div>
                    <p>Po akceptacji zaczynamy pracę nad Twoim projektem!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
