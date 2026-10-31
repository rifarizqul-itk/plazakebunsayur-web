import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Share2,
  Check,
  Navigation,
  MessageCircle,
  Info,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { fetchWhatsOnBySlug } from '../services/api';
import { generateEventWhatsAppLink } from '../utils/whatsapp';
import { formatDateRange } from '../utils/date';
import { useSiteSettings } from '../hooks/useContent';

const FALLBACK_BANNERS = {
  event: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  promo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
};

export function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [eventItem, setEventItem] = useState(null);
  const siteSettings = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
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
          setError(err.message === 'NOT_FOUND' ? 'Agenda tidak ditemukan' : 'Gagal memuat agenda');
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-text-muted">
        Memuat detail agenda...
      </div>
    );
  }

  if (error || !eventItem) {
    return (
      <div className="py-20 text-center">
        <Container>
          <div className="max-w-md mx-auto p-8 bg-surface-subtle border border-border-subtle rounded-md">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Agenda Tidak Ditemukan</h2>
            <p className="text-sm text-text-secondary mt-2">
              Agenda kegiatan atau promo yang Anda tuju mungkin sudah berakhir atau tautan tidak valid.
            </p>
            <Button variant="primary" className="mt-6" onClick={() => navigate('/agenda')}>
              Kembali ke Daftar Agenda
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const fallbackBanner = FALLBACK_BANNERS[eventItem.type] || FALLBACK_BANNERS.event;
  const waLink = generateEventWhatsAppLink(
    siteSettings?.management_whatsapp || '080000000000',
    eventItem.title
  );

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link to="/" className="hover:text-text-primary transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link to="/agenda" className="hover:text-text-primary transition-colors">
            Agenda & Promo
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium line-clamp-1">{eventItem.title}</span>
        </nav>

        {/* 2-Column Responsive Layout per DESIGN.md */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Content (Left: 8 cols) */}
          <article className="lg:col-span-8 flex flex-col gap-6">
            {/* Category / Type & Date */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {eventItem.type === 'event' ? 'Pameran & Acara' : 'Promo Belanja'}
              </span>
              <span className="text-border-subtle" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary tabular-nums">
                <Calendar size={13} className="text-brand-primary" />
                <span>{formatDateRange(eventItem.start_date, eventItem.end_date)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary leading-tight">
              {eventItem.title}
            </h1>

            {/* Banner Photographic Frame (16:9 ratio) */}
            <div className="w-full aspect-[16/9] rounded-md overflow-hidden border border-border-subtle bg-surface-muted shadow-card">
              <img
                src={bannerSrc || fallbackBanner}
                alt={eventItem.title}
                onError={() => {
                  if (bannerSrc !== fallbackBanner) {
                    setBannerSrc(fallbackBanner);
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Summary & Story Content */}
            <div className="space-y-4 pt-2">
              <p className="font-semibold text-text-primary text-base sm:text-lg leading-relaxed">
                {eventItem.summary}
              </p>
              <div className="text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-line space-y-4 max-w-prose">
                <p>{eventItem.content}</p>
              </div>
            </div>

            {/* Event Highlights Section */}
            {Array.isArray(eventItem.highlights) && eventItem.highlights.length > 0 && (
              <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-4 mt-2">
                <h2 className="text-base font-bold text-text-primary">
                  Sorotan & Rangkaian Aktivitas
                </h2>
                <ul className="space-y-3">
                  {eventItem.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                      <Check size={16} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-6 border-t border-border-subtle">
              <Link
                to="/agenda"
                className="inline-flex items-center gap-2 py-2.5 min-h-[44px] text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors"
              >
                <ArrowLeft size={15} />
                <span>Kembali ke Daftar Agenda</span>
              </Link>
            </div>
          </article>

          {/* Logistics & Action Sidebar (Right: 4 cols, sticky on desktop) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Implementation Details Card */}
            <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border-subtle pb-3">
                Informasi Pelaksanaan
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-text-muted font-medium">Tanggal Pelaksanaan</div>
                    <div className="font-semibold text-text-primary mt-0.5 tabular-nums">
                      {formatDateRange(eventItem.start_date, eventItem.end_date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-text-muted font-medium">Waktu Operasional</div>
                    <div className="font-semibold text-text-primary mt-0.5">
                      {eventItem.time || '10.00 – 18.00 WITA'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-text-muted font-medium">Lokasi di Mall</div>
                    <div className="font-semibold text-text-primary mt-0.5">
                      {eventItem.location || 'Plaza Kebun Sayur Balikpapan'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-text-muted font-medium">Ketentuan / HTM</div>
                    <div className="font-semibold text-text-primary mt-0.5">
                      {eventItem.admission || (eventItem.type === 'event' ? 'Gratis (Terbuka untuk Umum)' : 'Promo Belanja Langsung')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-border-subtle">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white text-xs font-semibold transition-colors min-h-[44px] text-center"
                >
                  <MessageCircle size={15} />
                  <span>Tanya Panitia via WhatsApp</span>
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
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm border border-border-subtle hover:border-border-hover bg-canvas text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors min-h-[44px] text-center cursor-pointer"
                >
                  <Share2 size={14} />
                  <span>{copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Agenda Ini'}</span>
                </button>
              </div>
            </div>

            {/* Space Rental Callout */}
            <div className="p-5 bg-surface-muted border border-border-subtle rounded-md space-y-2">
              <div className="flex items-center gap-2 text-text-primary font-semibold text-xs">
                <Info size={14} className="text-brand-primary" />
                <span>Ingin Menggelar Event di Bunsay?</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Area Atrium dan Koridor Plaza Kebun Sayur terbuka untuk pameran batu mulia, pentas seni, maupun bazar UMKM.
              </p>
              <Link
                to="/kontak"
                className="inline-block text-xs font-semibold text-brand-primary hover:underline pt-1"
              >
                Hubungi Manajemen Pengelola &rarr;
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

export default EventDetail;
