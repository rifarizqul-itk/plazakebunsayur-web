import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Share2,
  Navigation,
  MessageCircle,
  Info,
  User,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { fetchWhatsOnBySlug } from '../services/api';
import { formatDateRange } from '../utils/date';
import { useContent, useSiteSettings } from '../hooks/useContent';

const FALLBACK_BANNERS = {
  event: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  promo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
};

function parseHighlights(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim().startsWith('[')) {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function buildContactWaLink(contactPhone, contactPerson, title, defaultPhone) {
  const raw = contactPhone || defaultPhone || '080000000000';
  const cleanPhone = raw.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const name = contactPerson || 'Panitia Informasi';
  const msg = `Halo ${name}, saya ingin bertanya mengenai informasi "${title}" di Plaza Kebun Sayur.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}

function resolveTermsText(eventItem) {
  if (eventItem.terms) return eventItem.terms;
  if (eventItem.admission) return eventItem.admission;
  if (eventItem.type === 'event') return 'Gratis (Terbuka untuk Umum)';
  return 'Promo Belanja Langsung';
}

function useEventDetail(slug) {
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerSrc, setBannerSrc] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function loadItem() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWhatsOnBySlug(slug);
        if (!isCancelled) {
          setEventItem(data);
          const fallback = FALLBACK_BANNERS[data?.type] || FALLBACK_BANNERS.event;
          setBannerSrc(data?.banner_url || fallback);
        }
      } catch (err) {
        if (!isCancelled) {
          const msg = err.message === 'NOT_FOUND' ? 'Informasi tidak ditemukan' : 'Gagal memuat informasi';
          setError(msg);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    loadItem();
    return () => {
      isCancelled = true;
    };
  }, [slug]);

  return { eventItem, loading, error, bannerSrc, setBannerSrc };
}

function EventNotFound({ onBack }) {
  return (
    <div className="py-20 text-center">
      <Container>
        <div className="max-w-md mx-auto p-8 bg-surface-subtle border border-border-subtle rounded-md">
          <h2 className="text-xl font-bold text-text-primary tracking-tight">Informasi Tidak Ditemukan</h2>
          <p className="text-sm text-text-secondary mt-2">
            Agenda kegiatan atau promo yang Anda tuju mungkin sudah berakhir atau tautan tidak valid.
          </p>
          <Button variant="primary" className="mt-6" onClick={onBack}>
            Kembali ke Daftar Informasi
          </Button>
        </div>
      </Container>
    </div>
  );
}

function EventHighlightsCard({ highlightsList }) {
  if (!highlightsList || highlightsList.length === 0) return null;

  return (
    <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-3">
      <h3 className="font-bold text-base text-text-primary">
        Sorotan & Rangkaian Aktivitas
      </h3>
      <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
        {highlightsList.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0" />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventMetaRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-brand-primary shrink-0 mt-0.5" />
      <div>
        <div className="text-xs text-text-muted font-medium">{label}</div>
        <div className="font-semibold text-text-primary mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function EventOrganizerRow({ contactPerson, contactPhone }) {
  if (!contactPerson && !contactPhone) return null;
  return (
    <div className="flex items-start gap-3 pt-1 border-t border-border-subtle">
      <User size={16} className="text-brand-primary shrink-0 mt-0.5" />
      <div>
        <div className="text-xs text-text-muted font-medium">Narahubung Acara</div>
        <div className="font-semibold text-text-primary mt-0.5">{contactPerson || 'Panitia Informasi'}</div>
        {contactPhone && (
          <div className="text-xs text-text-secondary mt-0.5 font-mono">{contactPhone}</div>
        )}
      </div>
    </div>
  );
}

function EventSidebar({
  eventItem,
  dateRange,
  termsText,
  contactWaLink,
  copied,
  onShare,
  calloutTitle,
  calloutDesc,
  calloutCta,
}) {
  return (
    <aside className="space-y-6">
      <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-5">
        <h3 className="font-bold text-base text-text-primary border-b border-border-subtle pb-3">
          Ringkasan Pelaksanaan
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <EventMetaRow icon={Calendar} label="Jadwal Tanggal" value={dateRange} />
          <EventMetaRow icon={Clock} label="Waktu Operasional" value={eventItem.time || '10.00 – 18.00 WITA'} />
          <EventMetaRow icon={MapPin} label="Lokasi di Mall" value={eventItem.location || 'Plaza Kebun Sayur Balikpapan'} />
          <EventMetaRow icon={Tag} label="Ketentuan / HTM" value={termsText} />
          <EventOrganizerRow contactPerson={eventItem.contact_person} contactPhone={eventItem.contact_phone} />
        </div>

        <div className="space-y-3 pt-3 border-t border-border-subtle">
          <a
            href={contactWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white text-xs font-semibold transition-colors min-h-[44px] text-center"
          >
            <MessageCircle size={15} />
            <span>Tanya Narahubung via WhatsApp</span>
          </a>

          <Link
            to="/panduan-kunjungan"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm border border-border-subtle hover:border-border-hover bg-canvas text-text-primary text-xs font-semibold transition-colors min-h-[44px] text-center"
          >
            <Navigation size={14} />
            <span>Panduan Rute & Akses Mall</span>
          </Link>

          <button
            type="button"
            onClick={onShare}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm border border-border-subtle hover:border-border-hover bg-canvas text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors min-h-[44px] text-center cursor-pointer"
          >
            <Share2 size={14} />
            <span>{copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Informasi Ini'}</span>
          </button>
        </div>
      </div>

      <div className="p-5 bg-surface-muted border border-border-subtle rounded-md space-y-2">
        <div className="flex items-center gap-2 text-text-primary font-semibold text-xs">
          <Info size={14} className="text-brand-primary" />
          <span>{calloutTitle}</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {calloutDesc}
        </p>
        <Link
          to="/kontak"
          className="inline-block text-xs font-semibold text-brand-primary hover:underline pt-1"
        >
          {calloutCta}
        </Link>
      </div>
    </aside>
  );
}

function EventBanner({ bannerSrc, title, type, onImageError }) {
  const badgeLabel = type === 'event' ? 'Acara / Event' : 'Promo Kios';
  return (
    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-surface-muted border border-border-subtle shadow-sm">
      <img
        src={bannerSrc}
        alt={title}
        className="w-full h-full object-cover"
        onError={onImageError}
      />
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary text-white shadow-md">
          <Tag size={13} />
          <span>{badgeLabel}</span>
        </span>
      </div>
    </div>
  );
}

function EventBreadcrumb({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
      <Link to="/" className="hover:text-text-primary transition-colors">
        Beranda
      </Link>
      <span>/</span>
      <Link to="/informasi" className="hover:text-text-primary transition-colors">
        Informasi & Promo
      </Link>
      <span>/</span>
      <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-xs">
        {title}
      </span>
    </nav>
  );
}

export function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const siteSettings = useSiteSettings();

  const calloutTitle = useContent('event.callout.title', 'Ingin Menggelar Event di Bunsay?');
  const calloutDesc = useContent(
    'event.callout.description',
    'Area Atrium dan Koridor Plaza Kebun Sayur terbuka untuk pameran batu mulia, pentas seni, maupun bazar UMKM.'
  );
  const calloutCta = useContent('event.callout.cta_label', 'Hubungi Manajemen Pengelola →');

  const [copied, setCopied] = useState(false);
  const { eventItem, loading, error, bannerSrc, setBannerSrc } = useEventDetail(slug);

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-text-muted">
        Memuat detail informasi...
      </div>
    );
  }

  if (error || !eventItem) {
    return <EventNotFound onBack={() => navigate('/informasi')} />;
  }

  const fallbackBanner = FALLBACK_BANNERS[eventItem.type] || FALLBACK_BANNERS.event;
  const contactWaLink = buildContactWaLink(
    eventItem.contact_phone,
    eventItem.contact_person,
    eventItem.title,
    siteSettings?.management_whatsapp
  );

  const highlightsList = parseHighlights(eventItem.highlights);
  const dateRange = formatDateRange(eventItem.start_date, eventItem.end_date);
  const termsText = resolveTermsText(eventItem);

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
        <EventBreadcrumb title={eventItem.title} />

        <div className="mb-6">
          <Link
            to="/informasi"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors min-h-[44px] py-2"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Semua Informasi & Promo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <EventBanner
              bannerSrc={bannerSrc || fallbackBanner}
              title={eventItem.title}
              type={eventItem.type}
              onImageError={() => setBannerSrc(fallbackBanner)}
            />

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary leading-tight">
                {eventItem.title}
              </h1>

              {dateRange && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-primary tabular-nums">
                  <Calendar size={16} />
                  <span>{dateRange}</span>
                </div>
              )}

              {eventItem.summary && (
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed border-l-2 border-brand-primary pl-4 py-1 italic">
                  {eventItem.summary}
                </p>
              )}
            </div>

            <div className="prose prose-sm sm:prose max-w-none text-text-primary border-t border-border-subtle pt-6 leading-relaxed whitespace-pre-line">
              {eventItem.content}
            </div>

            <EventHighlightsCard highlightsList={highlightsList} />

            {eventItem.terms && (
              <div className="p-5 bg-surface-muted/60 border border-border-subtle rounded-md text-xs sm:text-sm space-y-1.5">
                <h4 className="font-bold text-text-primary">Syarat & Ketentuan:</h4>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {eventItem.terms}
                </p>
              </div>
            )}
          </div>

          <EventSidebar
            eventItem={eventItem}
            dateRange={dateRange}
            termsText={termsText}
            contactWaLink={contactWaLink}
            copied={copied}
            onShare={handleShare}
            calloutTitle={calloutTitle}
            calloutDesc={calloutDesc}
            calloutCta={calloutCta}
          />
        </div>
      </Container>
    </div>
  );
}

export default EventDetail;
