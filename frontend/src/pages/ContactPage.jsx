import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { submitContactMessage } from '../services/api';
import { generateManagementWhatsAppLink } from '../utils/whatsapp';
import { useContent, useSiteSettings } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

function parseContactList(value) {
  if (!value) return [];
  return String(value)
    .split(/[,;\n\r]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function sanitizePhoneHref(phone) {
  return phone.replace(/[^\d+]/g, '');
}

function useContactForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
    bot_check: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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

  return {
    formData,
    loading,
    success,
    errorMsg,
    handleChange,
    handleSubmit,
  };
}

function OfficeInfoColumn({
  officeTitle,
  officeAddress,
  mallHours,
  securityPhone,
  managementEmail,
  waLink,
}) {
  const phones = parseContactList(securityPhone);
  const emails = parseContactList(managementEmail);

  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-2">
          {officeTitle}
        </h1>
      </div>

      <div className="divide-y divide-border-subtle text-xs sm:text-sm">
        <div className="py-4 first:pt-0 flex items-start gap-3.5">
          <MapPin size={18} className="text-brand-primary shrink-0 mt-0.5" />
          <div>
            <strong className="block text-text-primary text-sm font-semibold">Alamat Kantor Manajemen</strong>
            <span className="text-text-secondary mt-0.5 block leading-relaxed">
              {officeAddress}
            </span>
          </div>
        </div>

        <div className="py-4 flex items-start gap-3.5">
          <Clock size={18} className="text-brand-primary shrink-0 mt-0.5" />
          <div>
            <strong className="block text-text-primary text-sm font-semibold">Waktu Operasional Mall & Kantor</strong>
            <span className="text-text-secondary mt-0.5 block">
              {mallHours}
            </span>
          </div>
        </div>

        <div className="py-4 flex items-start gap-3.5">
          <Phone size={18} className="text-brand-primary shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <strong className="block text-text-primary text-sm font-semibold">Telepon Pos Keamanan & Pengaduan</strong>
            <div className="mt-1 flex flex-col gap-1 text-text-secondary tabular-nums">
              {phones.length > 0 ? (
                phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${sanitizePhoneHref(phone)}`}
                    className="hover:text-brand-primary hover:underline transition-colors block"
                  >
                    {phone}
                  </a>
                ))
              ) : (
                <span>{securityPhone || '-'}</span>
              )}
            </div>
          </div>
        </div>

        <div className="py-4 flex items-start gap-3.5">
          <Mail size={18} className="text-brand-primary shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <strong className="block text-text-primary text-sm font-semibold">Surat Elektronik (Email)</strong>
            <div className="mt-1 flex flex-col gap-1 text-text-secondary">
              {emails.length > 0 ? (
                emails.map((email, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${email}`}
                    className="hover:text-brand-primary hover:underline transition-colors block break-all"
                  >
                    {email}
                  </a>
                ))
              ) : (
                <span>{managementEmail || '-'}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-whatsapp hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
        >
          <MessageCircle size={18} />
          <span>Chat WhatsApp Siaga Pengelola</span>
        </a>
      </div>
    </div>
  );
}

function ContactFormCard({
  formTitle,
  formDesc,
  formData,
  loading,
  success,
  errorMsg,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="lg:col-span-7 bg-surface-subtle border border-border-subtle p-6 sm:p-8 rounded-md">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary">{formTitle}</h3>
        {formDesc && (
          <p className="text-xs text-text-secondary mt-1">
            {formDesc}
          </p>
        )}
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm flex items-start gap-3 text-xs sm:text-sm">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Pesan Berhasil Terkirim!</span>
            Terima kasih atas pesan Anda. Tim pengelola Plaza Kebun Sayur akan segera menindaklanjuti.
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-sm flex items-start gap-3 text-xs sm:text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Terjadi Kendala</span>
            {errorMsg}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <span>{loading ? 'Mengirim pesan...' : 'Kirim pesan'}</span>
        </Button>
      </form>
    </div>
  );
}

export function ContactPage() {
  const metaTitle = useContent('seo.kontak.title', 'Kontak & Pengaduan | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.kontak.description', 'Hubungi kantor manajemen Plaza Kebun Sayur Balikpapan untuk informasi sewa tempat, perizinan acara, dan layanan pengaduan.');
  useDocumentMeta(metaTitle, metaDesc);

  const officeTitle = useContent('contact.office_title', 'Informasi Kontak Resmi');
  const formTitle = useContent('contact.form_title', 'Kirim Pesan atau Pertanyaan');
  const formDesc = useContent(
    'contact.form_description',
    'Sampaikan pertanyaan Anda kepada tim pengelola mall. Kami akan membalas pesan Anda sesegera mungkin.'
  );

  const siteSettings = useSiteSettings();
  const waLink = generateManagementWhatsAppLink(siteSettings?.management_whatsapp || '080000000000');
  const officeAddress = siteSettings?.office_address || 'Lantai Dasar (Dekat Pintu Masuk Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131';
  const mallHours = siteSettings?.mall_opening_hours || '08.00 – 18.00 WITA';
  const securityPhone = siteSettings?.security_phone || '(0542) 734567';
  const managementEmail = siteSettings?.management_email || 'pengelola@plazakebunsayur.com';

  const formState = useContactForm();

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <section className="py-10 sm:py-14 bg-canvas flex-1">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <OfficeInfoColumn
              officeTitle={officeTitle}
              officeAddress={officeAddress}
              mallHours={mallHours}
              securityPhone={securityPhone}
              managementEmail={managementEmail}
              waLink={waLink}
            />

            <ContactFormCard
              formTitle={formTitle}
              formDesc={formDesc}
              formData={formState.formData}
              loading={formState.loading}
              success={formState.success}
              errorMsg={formState.errorMsg}
              handleChange={formState.handleChange}
              handleSubmit={formState.handleSubmit}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ContactPage;
