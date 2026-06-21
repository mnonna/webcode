import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Send } from 'lucide-react';

type ContactFormProps = {
  onFocusFieldChange?: (field: string | null) => void;
};

export default function ContactForm({ onFocusFieldChange }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('message', formData.message);

    if (selectedFile) {
      payload.append('file', selectedFile);
    }

    try {
      const response = await fetch('https://mailer.webcode.com.pl/mail', {
        method: 'POST',
        body: payload,
      });

      if (response.ok) {
        alert('Dziękuję za wiadomość. Odezwę się najszybciej, jak to możliwe.');
        setFormData({ name: '', email: '', message: '' });
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert('Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie później.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie później.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert('Dozwolone formaty: PDF, DOCX, JPG, JPEG, PNG.');
      event.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      alert('Plik jest za duży. Maksymalny rozmiar to 10 MB.');
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="wc-label mb-2 block">Imię i nazwisko</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onFocus={() => onFocusFieldChange?.('name')}
            onBlur={() => onFocusFieldChange?.(null)}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="wc-form-input"
            placeholder="Jan Kowalski"
          />
        </div>

        <div>
          <label htmlFor="email" className="wc-label mb-2 block">E-mail</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onFocus={() => onFocusFieldChange?.('email')}
            onBlur={() => onFocusFieldChange?.(null)}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="wc-form-input"
            placeholder="jan@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="file" className="wc-label mb-2 block">Załącz plik (opcjonalnie)</label>
        <input
          ref={fileInputRef}
          type="file"
          id="file"
          onFocus={() => onFocusFieldChange?.('file')}
          onBlur={() => onFocusFieldChange?.(null)}
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
          className="wc-form-input file:mr-4 file:rounded-[12px] file:border-0 file:bg-[var(--wc-blue-soft)] file:px-4 file:py-2 file:text-[0.875rem] file:font-[600] file:text-[var(--wc-blue)] hover:file:bg-[rgba(21,87,255,0.16)]"
        />
        <p className="wc-body-sm mt-2">Dozwolone formaty: PDF, DOCX, JPG, JPEG, PNG. Maksymalny rozmiar pliku: 10 MB.</p>
        {selectedFile && <div className="wc-body-sm wc-text-blue mt-2 font-[600]">Wybrany plik: {selectedFile.name}</div>}
      </div>

      <div>
        <label htmlFor="message" className="wc-label mb-2 block">Opisz projekt</label>
        <textarea
          id="message"
          required
          rows={7}
          value={formData.message}
          onFocus={() => onFocusFieldChange?.('message')}
          onBlur={() => onFocusFieldChange?.(null)}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="wc-form-input min-h-[180px] resize-none"
          placeholder="Napisz, czego potrzebujesz, jaki jest cel strony i na kiedy planujesz wdrożenie."
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="wc-btn-primary group w-full justify-center disabled:pointer-events-none disabled:opacity-60">
        <span>{isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}</span>
        <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
