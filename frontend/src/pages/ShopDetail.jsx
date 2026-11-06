import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { TikTokIcon } from '../components/ui/TikTokIcon';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { fetchTenantBySlug } from '../services/api';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { getWitaOperatingStatus } from '../utils/hours';

const FALLBACK_SHOP_IMAGE = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';

function FacebookIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function ShareButton({ copied, onShare, label = 'Bagikan tautan kios' }) {
  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 text-xs font-medium text-text-muted hover:text-text-primary hover:bg-surface-subtle active:bg-surface-muted transition-colors rounded-sm cursor-pointer"
      title={label}
      aria-label={label}
    >
      <Share2 size={15} />
      <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
    </button>
  );
}

function OperatingHoursBadge({ daysOpen, hours }) {
  const prefix = daysOpen ? `${daysOpen} • ` : '';
  const badgeClass = hours.isOpen
    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    : 'bg-surface-muted text-text-muted';

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-secondary">
      <Clock size={15} className="text-mono-400 shrink-0" />
      <span>{prefix}{hours.hoursText}</span>
      {hours.statusLabel && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {hours.statusLabel}
        </span>
      )}
    </div>
  );
}

function extractImageList(tenant) {
  if (!tenant) return [FALLBACK_SHOP_IMAGE];
  const rawList = tenant.image_urls || tenant.images;
  let list = [];

  if (Array.isArray(rawList) && rawList.length > 0) {
    list = rawList.filter((img) => typeof img === 'string' && img.trim().length > 0);
  } else if (typeof rawList === 'string' && rawList.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(rawList);
      if (Array.isArray(parsed)) {
        list = parsed.filter((img) => typeof img === 'string' && img.trim().length > 0);
      }
    } catch {
      // ignore JSON parse error
    }
  }

  if (list.length === 0 && tenant.image_url) {
    list = [tenant.image_url];
  }

  if (list.length === 0) {
    list = [FALLBACK_SHOP_IMAGE];
  }

  return list;
}

export function ShopDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Touch swipe tracking
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function loadDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTenantBySlug(slug);
        if (isCancelled) return;

        setTenant(data);
        setActiveImageIndex(0);
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load shop detail:', err);
          setError(err.message === 'NOT_FOUND' ? 'Kios tidak ditemukan' : 'Gagal memuat informasi kios');
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadDetail();
    return () => {
      isCancelled = true;
    };
  }, [slug, navigate]);

  const imageList = extractImageList(tenant);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minDistance = 40;
    if (distance > minDistance) {
      handleNextImage();
    } else if (distance < -minDistance) {
      handlePrevImage();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextImage();
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            <div className="w-full aspect-[4/3] bg-surface-muted rounded-md" />
            <div className="flex flex-col gap-4">
              <div className="w-32 h-4 bg-surface-muted rounded-sm" />
              <div className="w-3/4 h-8 bg-surface-muted rounded-sm" />
              <div className="w-1/2 h-4 bg-surface-muted rounded-sm" />
              <div className="w-full h-24 bg-surface-muted rounded-sm mt-4" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="py-20 text-center">
        <Container>
          <div className="max-w-md mx-auto p-8 bg-surface-subtle border border-border-subtle rounded-md">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Kios Tidak Ditemukan</h2>
            <p className="text-sm text-text-secondary mt-2">
              Kios yang Anda cari mungkin telah pindah unit atau tautan tidak valid.
            </p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => navigate('/belanja')}
            >
              Kembali ke Direktori Belanja
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const waLink = generateWhatsAppLink(tenant.phone_whatsapp, tenant.name);
  const hours = getWitaOperatingStatus(tenant.opening_time, tenant.closing_time);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentImage = imageList[activeImageIndex] || FALLBACK_SHOP_IMAGE;

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link to="/" className="hover:text-text-primary transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link to="/belanja" className="hover:text-text-primary transition-colors">
            Belanja
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium line-clamp-1">{tenant.name}</span>
        </nav>

        {/* 2-Column Responsive Layout per DESIGN.md */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Swipeable Multi-Photo Carousel */}
          <div className="flex flex-col gap-3">
            <div
              tabIndex={0}
              role="region"
              aria-label="Galeri Foto Kios"
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full aspect-[4/3] bg-surface-muted rounded-md overflow-hidden border border-border-subtle shadow-card select-none group focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <img
                src={currentImage}
                alt={`${tenant.name} - Foto ${activeImageIndex + 1}`}
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_SHOP_IMAGE) {
                    e.currentTarget.src = FALLBACK_SHOP_IMAGE;
                  }
                }}
                className="w-full h-full object-cover transition-opacity duration-200"
              />

              {/* Navigation Arrows (if > 1 image) */}
              {imageList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Foto sebelumnya"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-mono-900/65 hover:bg-mono-900/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs focus:outline-none focus:ring-2 focus:ring-gold z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Foto berikutnya"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-mono-900/65 hover:bg-mono-900/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs focus:outline-none focus:ring-2 focus:ring-gold z-10"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute top-3 right-3 bg-mono-900/75 text-white text-[11px] font-mono font-semibold px-2 py-0.5 rounded-sm backdrop-blur-xs select-none">
                    {activeImageIndex + 1} / {imageList.length}
                  </div>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {imageList.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'w-5 bg-gold' : 'w-1.5 bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Lihat foto ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip (if > 1 image) */}
            {imageList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                {imageList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-brand-primary ring-1 ring-brand-primary opacity-100'
                        : 'border-border-subtle opacity-65 hover:opacity-100'
                    }`}
                    aria-label={`Pilih foto ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_SHOP_IMAGE) {
                          e.currentTarget.src = FALLBACK_SHOP_IMAGE;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Identity, Details, and Actions */}
          <div className="flex flex-col gap-5">
            {/* Category Tag & Featured Indicator */}
            <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {tenant.category?.name || 'Direktori Belanja'}
              </span>
              <div className="flex items-center gap-3">
                <ShareButton
                  copied={copied}
                  onShare={handleShare}
                  label="Bagikan tautan kios"
                />
              </div>
            </div>

            {/* Shop Name (H1, Weight 700) */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary leading-tight">
              {tenant.name}
            </h1>

            {/* Location (Floor & Unit) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-primary font-medium">
              <MapPin size={15} className="text-brand-primary shrink-0" />
              <span>
                {tenant.floor?.name || tenant.floor?.code || 'Lantai Dasar'}{tenant.unit_number ? ` • ${tenant.unit_number}` : ''}
              </span>
            </div>

            {/* Operating Hours in WITA */}
            <OperatingHoursBadge daysOpen={tenant.days_open} hours={hours} />

            {/* Description */}
            <div className="pt-2 border-t border-border-subtle">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Deskripsi Kios
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line max-w-[68ch]">
                {tenant.description || 'Kios resmi pedagang di kawasan Plaza Kebun Sayur Balikpapan.'}
              </p>
            </div>

            {/* Direct WhatsApp Action Button (Wording: Chat Penjual, Min 44px) */}
            <div className="pt-3 flex flex-col gap-3">
              {tenant.phone_whatsapp ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold uppercase tracking-wider text-white bg-whatsapp hover:bg-emerald-700 active:bg-emerald-800 rounded-sm transition-colors cursor-pointer"
                  title={`Chat WhatsApp dengan ${tenant.name}`}
                >
                  <MessageCircle size={16} />
                  <span>Chat Penjual</span>
                </a>
              ) : (
                <div className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-text-muted bg-surface-muted border border-border-subtle rounded-sm">
                  <span>Kontak WhatsApp belum tersedia</span>
                </div>
              )}

              {/* Conditional Social Media Channels */}
              <div className="flex flex-col gap-2">
                {tenant.instagram && (
                  <a
                    href={`https://instagram.com/${tenant.instagram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle active:bg-surface-muted rounded-sm transition-colors"
                  >
                    <InstagramIcon size={14} />
                    <span>@{tenant.instagram.replace(/^@/, '')}</span>
                  </a>
                )}

                {tenant.tiktok && (
                  <a
                    href={`https://www.tiktok.com/@${tenant.tiktok.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle active:bg-surface-muted rounded-sm transition-colors"
                  >
                    <TikTokIcon size={14} />
                    <span>@{tenant.tiktok.replace(/^@/, '')}</span>
                  </a>
                )}

                {tenant.facebook && (
                  <a
                    href={tenant.facebook.startsWith('http') ? tenant.facebook : `https://facebook.com/${tenant.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle active:bg-surface-muted rounded-sm transition-colors"
                  >
                    <FacebookIcon size={14} />
                    <span>Facebook: {tenant.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '')}</span>
                  </a>
                )}

                {tenant.website && (
                  <a
                    href={tenant.website.startsWith('http') ? tenant.website : `https://${tenant.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle active:bg-surface-muted rounded-sm transition-colors"
                  >
                    <Globe size={14} />
                    <span>{tenant.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                  </a>
                )}
              </div>

              <span className="text-xs text-text-muted pt-1">
                Lokasi: Plaza Kebun Sayur, Jl. Letjen Suprapto, Balikpapan Barat
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShopDetail;
