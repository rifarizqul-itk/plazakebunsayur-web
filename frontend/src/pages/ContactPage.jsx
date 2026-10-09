import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { submitContactMessage } from '../services/api';
import { generateManagementWhatsAppLink } from '../utils/whatsapp';

export function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
    bot_check: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const waLink = generateManagementWhatsAppLink('081234567890');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      await submitContactMessage(formData);
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        subject: '',
        message: '',
        bot_check: '',
      });
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mengirim pesan. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        eyebrow="Pusat Bantuan & Layanan"
        title="Hubungi Pengelola Plaza Kebun Sayur"
        description="Punya pertanyaan seputar fasilitas gedung, agenda kunjungan rombongan, atau barang tertinggal? Tim pengelola mall siap membantu Anda."
      />

      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Left 5 Cols: Management Office Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold text-text-muted block mb-1.5">
                  Kantor Pengelola
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Informasi Kontak Resmi
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Kunjungi kantor manajemen mall di lantai dasar atau hubungi pusat layanan terpadu berikut.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs sm:text-sm">
                <div className="p-4 bg-surface-subtle border border-border-subtle rounded-none flex items-start gap-3.5">
                  <MapPin size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text-primary text-sm font-semibold">Kantor Pengelola Gedung</strong>
                    <span className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                      Lantai Dasar (Dekat Pintu Masuk Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-surface-subtle border border-border-subtle rounded-none flex items-start gap-3.5">
                  <Clock size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text-primary text-sm font-semibold">Jam Kerja Kantor Pengelola</strong>
                    <span className="text-text-secondary">
                      Senin – Sabtu: 08.30 – 17.00 WITA (Hari Minggu & Libur via WhatsApp Siaga)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-surface-subtle border border-border-subtle rounded-none flex items-start gap-3.5">
                  <Phone size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text-primary text-sm font-semibold">Telepon Darurat / Pos Keamanan</strong>
                    <span className="text-text-secondary">(0542) 734567 / 0812-3456-7890</span>
                  </div>
                </div>

                <div className="p-4 bg-surface-subtle border border-border-subtle rounded-none flex items-start gap-3.5">
                  <Mail size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text-primary text-sm font-semibold">Email Resmi Pengelola</strong>
                    <span className="text-text-secondary">info@plazakebunsayur.com</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-1">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-whatsapp hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
                >
                  <MessageCircle size={18} />
                  <span>Chat WhatsApp Siaga Pengelola</span>
                </a>
              </div>
            </div>

            {/* Right 7 Cols: Public Contact Form */}
            <div className="lg:col-span-7 bg-surface-subtle border border-border-subtle p-6 sm:p-8 rounded-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-primary">Kirim Pesan atau Pertanyaan</h3>
                <p className="text-xs text-text-secondary mt-1">
                  Sampaikan pertanyaan Anda kepada tim pengelola mall. Kami akan membalas pesan Anda sesegera mungkin.
                </p>
              </div>

              {success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-none flex items-start gap-3 text-xs sm:text-sm">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Pesan Berhasil Terkirim!</span>
                    Terima kasih atas pesan Anda. Tim pengelola Plaza Kebun Sayur akan segera menindaklanjuti.
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-none flex items-start gap-3 text-xs sm:text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Terjadi Kendala</span>
                    {errorMsg}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot field (hidden from real users, traps spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="bot_check"
                    value={formData.bot_check}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap *"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                  />
                  <Input
                    label="Nomor WhatsApp / HP *"
                    name="phone_number"
                    required
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email (Opsional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                  />
                  <Input
                    label="Subjek Pesan *"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Contoh: Info Kunjungan Rombongan"
                  />
                </div>

                <Textarea
                  label="Isi Pesan *"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pertanyaan, saran, atau keperluan Anda secara jelas..."
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="mt-2 w-full sm:w-auto self-start"
                >
                  <Send size={16} className="mr-2" />
                  <span>{loading ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ContactPage;
