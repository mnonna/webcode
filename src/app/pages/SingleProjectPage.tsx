import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Calendar, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { projects } from '../../data/projects';

export default function SingleProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/realizacje" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            {project.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Tag size={20} />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{project.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumbs 
            items={[
              { label: 'Start', path: '/' },
              { label: 'Realizacje', path: '/realizacje' },
              { label: project.title }
            ]}
          />
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Title (not h1, but same font) */}
          <div className="mb-8">
            <div className="text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
              {project.title}
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 rounded-lg border border-indigo-200"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Full Description */}
          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-slate-700 leading-relaxed mb-8">
              {project.fullDescription}
            </div>
          </div>

          {/* Project Details Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200/50">
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Kategoria projektu
              </h3>
              <p className="text-slate-600">{project.category}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200/50">
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
                Data realizacji
              </h3>
              <p className="text-slate-600">{project.date}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200">
            <h3 className="text-2xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#1e293b' }}>
              Podobny projekt?
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Jeśli chciałbyś stworzyć podobne rozwiązanie dla swojego biznesu, skontaktuj się ze mną.
            </p>
            <a 
              href="/#contact"
              className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            >
              Porozmawiajmy o Twoim projekcie
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
