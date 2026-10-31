import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, Share2 } from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { fetchTenantBySlug } from '../services/api';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { getWitaOperatingStatus } from '../utils/hours';

const FALLBACK_CULINARY_IMAGE = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80';

export function CulinaryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    async function loadDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTenantBySlug(slug);
        if (isCancelled) return;

        // Type Guard: If this tenant is retail, redirect via replace to /belanja/:slug
        if (data.category?.type === 'retail') {
          navigate(`/belanja/${slug}`, { replace: true });
          return;
        }

        setTenant(data);
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load culinary detail:', err);
          setError(err.message === 'NOT_FOUND' ? 'Stan kuliner tidak ditemukan' : 'Gagal memuat informasi stan');
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
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Stan Kuliner Tidak Ditemukan</h2>
            <p className="text-sm text-text-secondary mt-2">
              Stan kuliner yang Anda cari mungkin telah tutup atau tautan tidak valid.
            </p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => navigate('/kuliner')}
            >
              Kembali ke Sentra Kuliner
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

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link to="/" className="hover:text-text-primary transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link to="/kuliner" className="hover:text-text-primary transition-colors">
            Sentra Kuliner
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium line-clamp-1">{tenant.name}</span>
        </nav>

        {/* 2-Column Responsive Layout per DESIGN.md */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Fixed 4:3 Photographic Frame */}
          <div className="w-full aspect-[4/3] bg-surface-muted rounded-md overflow-hidden border border-border-subtle shadow-card">
            <img
              src={tenant.image_url || FALLBACK_CULINARY_IMAGE}
              alt={tenant.name}
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_CULINARY_IMAGE) {
                  e.currentTarget.src = FALLBACK_CULINARY_IMAGE;
                }
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Identity, Details, and WhatsApp Action */}
          <div className="flex flex-col gap-5">
            {/* Category Tag & Featured Indicator */}
            <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {tenant.category?.name || 'Sentra Kuliner'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 text-xs font-medium text-text-muted hover:text-text-primary hover:bg-surface-subtle active:bg-surface-muted transition-colors rounded-sm cursor-pointer"
                  title="Bagikan tautan stan"
                  aria-label="Bagikan tautan stan"
                >
                  <Share2 size={15} />
                  <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
                </button>
              </div>
            </div>

            {/* Stan Name (H1, Weight 700) */}
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
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-secondary">
              <Clock size={15} className="text-mono-400 shrink-0" />
              <span>{tenant.days_open ? `${tenant.days_open} • ` : ''}{hours.hoursText}</span>
              {hours.statusLabel && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${hours.isOpen ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-surface-muted text-text-muted'}`}>
                  {hours.statusLabel}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="pt-2 border-t border-border-subtle">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Deskripsi Menu & Sajian
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line max-w-[68ch]">
                {tenant.description || 'Sajian kuliner khas tradisional di kawasan Sentra Kuliner Plaza Kebun Sayur.'}
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

              {tenant.instagram && (
                <a
                  href={`https://instagram.com/${tenant.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle active:bg-surface-muted rounded-sm transition-colors"
                >
                  <InstagramIcon size={14} />
                  <span>{tenant.instagram}</span>
                </a>
              )}

              <span className="text-xs text-text-muted pt-1">
                Lokasi: Sentra Kuliner Plaza Kebun Sayur, Balikpapan Barat
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CulinaryDetail;
