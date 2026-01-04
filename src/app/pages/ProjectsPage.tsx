import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Calendar, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../../data/projects';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');

  const categories = ['wszystkie', 'Sklep internetowy', 'Aplikacja webowa', 'Strona wizytówka', 'Strona firmowa'];

  const filteredProjects = selectedCategory === 'wszystkie' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
            Moje realizacje
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Projekty, które stworzyłem dla klientów z różnych branż. Każdy z nich to unikalne wyzwanie i nowe doświadczenie.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/realizacje/${project.slug}`} className="bg-white text-slate-900 px-6 py-3 rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      Zobacz szczegóły
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Tag size={16} />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{project.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl mb-3 group-hover:text-indigo-600 transition-colors" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">
                Brak projektów w tej kategorii.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Chcesz mieć podobny projekt?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Skontaktuj się ze mną i omówmy Twoje potrzeby. Stworzę dla Ciebie rozwiązanie dopasowane do Twojego biznesu.
          </p>
          <a 
            href="/#contact"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg hover:shadow-2xl transition-all"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
          >
            Skontaktuj się
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}