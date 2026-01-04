import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (selectedFile) {
      console.log('Attached file:', selectedFile.name);
    }
    alert('Dziękujemy za wiadomość! Skontaktuję się wkrótce.');
    setFormData({ name: '', email: '', message: '' });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type)) {
        alert('Dozwolone formaty: PDF, DOCX, JPG, JPEG, PNG');
        return;
      }

      if (file.size > maxSize) {
        alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm mb-2 text-slate-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Imię i nazwisko
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
          placeholder="Jan Kowalski"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-2 text-slate-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
          placeholder="jan@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm mb-2 text-slate-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Wiadomość
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
          placeholder="Opowiedz o swoim projekcie..."
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm mb-2 text-slate-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Załącz plik (opcjonalnie)
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p className="text-xs text-slate-500 mt-2">
          Dozwolone formaty: PDF, DOCX, JPG, JPEG, PNG (max 10MB)
        </p>
        {selectedFile && (
          <div className="mt-2 text-sm text-indigo-600">
            Wybrany plik: {selectedFile.name}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
      >
        <span>Wyślij wiadomość</span>
        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
