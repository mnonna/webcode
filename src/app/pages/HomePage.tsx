import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Code2, Users, Lightbulb, CheckCircle2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  const projects = [
    {
      id: 1,
      title: 'Platforma E-commerce',
      category: 'Sklep internetowy',
      image: 'https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2NzUzMzA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Node.js', 'Stripe']
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      category: 'Panel administracyjny',
      image: 'https://images.unsplash.com/photo-1634804519576-d7047c5b39d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY3NTA1MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Vue.js', 'Chart.js', 'API']
    },
    {
      id: 3,
      title: 'Portfolio Kreatywne',
      category: 'Strona wizytówka',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlfGVufDF8fHx8MTc2NzUzMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Next.js', 'Tailwind', 'Motion']
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="pt-24 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1620334731210-d5f9b5109635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwYXR0ZXJuJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njc1MzQwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/90 to-indigo-50/95"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="z-10">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
                <span className="text-sm">Tworzę rozwiązania cyfrowe</span>
              </div>
              <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Przekształcam pomysły w{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  kod
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Projektuję i buduję nowoczesne strony internetowe oraz aplikacje webowe, które pomagają Twojemu biznesowi rosnąć w cyfrowym świecie.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all"
                >
                  Rozpocznij projekt
                </button>
                <button 
                  onClick={() => scrollToSection('bio')}
                  className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all"
                >
                  Poznaj mnie
                </button>
              </div>
            </div>
            
            {/* Video with Fixed Scroll Effect */}
            <div className="relative md:sticky md:top-24 h-[500px] md:h-[600px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/50 to-violet-200/50 blur-3xl rounded-full"></div>
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-violet-600/10 z-10 pointer-events-none"></div>
                
                {/* Video Element */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                  {/* Fallback image if video doesn't load */}
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2NzQ2Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Profesjonalne workspace"
                    className="w-full h-full object-cover"
                  />
                </video>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      Dostępny
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg z-20">
                  <div className="text-sm text-slate-600 mb-1">Realizowane projekty</div>
                  <div className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                    50+
                  </div>
                </div>
              </div>
              
              {/* Decorative Code Snippets */}
              <div className="hidden lg:block absolute -left-12 top-1/4 bg-slate-900 text-green-400 px-4 py-3 rounded-lg shadow-xl text-xs font-mono z-30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-500">// React Component</div>
                <div><span className="text-purple-400">const</span> App = () =&gt; &#123;</div>
                <div className="pl-4"><span className="text-blue-400">return</span> &lt;Hero /&gt;</div>
                <div>&#125;</div>
              </div>
              
              <div className="hidden lg:block absolute -right-8 bottom-1/3 bg-slate-900 text-blue-400 px-4 py-3 rounded-lg shadow-xl text-xs font-mono z-30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-500">/* CSS Styling */</div>
                <div><span className="text-yellow-400">.hero</span> &#123;</div>
                <div className="pl-4"><span className="text-pink-400">display</span>: flex;</div>
                <div className="pl-4"><span className="text-pink-400">gap</span>: 2rem;</div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="pt-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
              Moje usługi
            </h2>
            <p className="text-xl text-slate-600">
              Kompleksowe rozwiązania dostosowane do Twoich potrzeb
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="text-white" size={28} />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Strony internetowe
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Responsywne, szybkie i nowoczesne strony www, które wyróżniają Twoją markę w sieci.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Aplikacje webowe
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Zaawansowane aplikacje internetowe z intuicyjnym interfejsem i mocną funkcjonalnością.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Konsulting IT
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Doradztwo technologiczne i strategia cyfrowa dla rozwijających się firm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/30 to-violet-200/30 blur-3xl rounded-full"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY3NDgyMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="O Webcode"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                O Webcode
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                Jestem niezależnym developerem z pasją do tworzenia wyjątkowych rozwiązań webowych. Od ponad 5 lat pomagam firmom budować ich obecność w internecie.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Łączę kreatywność z techniczną wiedzą, aby tworzyć projekty, które nie tylko wyglądają świetnie, ale przede wszystkim działają i przynoszą rezultaty biznesowe.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                      Doświadczenie
                    </h4>
                    <p className="text-slate-600">Ponad 50 zrealizowanych projektów dla firm z różnych branż</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                      Nowoczesne technologie
                    </h4>
                    <p className="text-slate-600">Korzystam z najnowszych narzędzi i frameworków</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                      Dostępność
                    </h4>
                    <p className="text-slate-600">Jestem dostępny w godzinach 9:00-17:00, od poniedziałku do piątku</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
              Skontaktuj się ze mną
            </h2>
            <p className="text-xl text-slate-600">
              Masz pomysł na projekt? Porozmawiajmy!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                      Email
                    </h4>
                    <a href="mailto:kontakt@webcode.pl" className="text-indigo-600 hover:underline">
                      webcode.kontakt@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                      Lokalizacja
                    </h4>
                    <p className="text-slate-600">62-052 Komorniki, Polska</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/50">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}