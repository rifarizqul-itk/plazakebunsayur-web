import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, Utensils, Share2 } from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { fetchTenantBySlug } from '../services/api';
import { generateWhatsAppLink } from '../utils/whatsapp';

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

        // Type Guard: If this tenant is retail, replace redirect to /belanja/:slug
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
          <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
            <div className="w-48 h-5 bg-surface-muted rounded-sm" />
            <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-surface-muted rounded-md" />
            <div className="w-3/4 h-8 bg-surface-muted rounded-sm" />
            <div className="w-1/2 h-4 bg-surface-muted rounded-sm" />
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
              Stan yang Anda cari mungkin telah tutup atau alamat URL salah.
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

  // Format jam buka terstruktur
  let hoursDisplay = tenant.opening_hours || '09.00 - 21.00 WITA';
  if (tenant.opening_time && tenant.closing_time) {
    const open = tenant.opening_time.slice(0, 5);
    const close = tenant.closing_time.slice(0, 5);
    hoursDisplay = `${open} - ${close} WITA`;
  }

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

        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Main Photo (Clean Frame) */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-surface-muted rounded-md overflow-hidden border border-border-subtle shadow-card">
            {tenant.image_url ? (
              <img
                src={tenant.image_url}
                alt={tenant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-surface-muted text-center p-6">
                <Utensils size={44} className="text-mono-400 mb-2 stroke-[1.5]" />
                <span className="text-xs text-text-secondary font-medium">Sajian Kuliner Tradisional</span>
              </div>
            )}
          </div>

          {/* Info Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-brand-primary font-semibold tracking-wide">
                <span>{tenant.category?.name || 'Sentra Kuliner'}</span>
                {tenant.is_featured && (
                  <>
                    <span>•</span>
                    <span className="text-gold-text">Menu Andalan</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
                {tenant.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-text-secondary mt-1">
                <div className="flex items-center gap-1.5 font-medium text-text-primary">
                  <MapPin size={15} className="text-brand-primary" />
                  <span>
                    {tenant.floor?.name || 'Lantai Dasar'} • {tenant.unit_number || 'Unit Stan'}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Clock size={15} />
                  <span>
                    {tenant.days_open || 'Setiap Hari'}, {hoursDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium text-text-secondary border border-border-subtle rounded-sm hover:bg-surface-subtle hover:text-text-primary transition-all cursor-pointer self-start active:bg-surface-muted"
            >
              <Share2 size={14} />
              <span>{copied ? 'Tautan Disalin' : 'Bagikan Stan'}</span>
            </button>
          </div>

          {/* Grid Content: Description & Order Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Description & Details */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div>
                <h2 className="text-sm font-semibold text-text-primary mb-2">
                  Menu & Keistimewaan
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-line max-w-prose">
                  {tenant.description ||
                    'Sajian kuliner khas Kalimantan Timur yang diolah dengan bumbu rempah pilihan dan resep legendaris.'}
                </p>
              </div>

              {/* Tips Kuliner */}
              <div className="p-4 bg-surface-subtle border border-border-subtle rounded-md flex items-start gap-3">
                <Utensils size={18} className="text-brand-primary shrink-0 mt-0.5" />
                <div className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold block text-text-primary mb-0.5">Layanan Dine-in & Oleh-Oleh Siap Terbang</span>
                  Sebagian besar stan oleh-oleh (amplang, mantau, lempok) menyediakan kemasan kardus khusus bersegel aman untuk bagasi kabin pesawat.
                </div>
              </div>
            </div>

            {/* Right Col: Action & Contact Box */}
            <div className="flex flex-col gap-4 p-5 sm:p-6 bg-surface-subtle border border-border-subtle rounded-md sticky top-24">
              <div>
                <h3 className="font-bold text-sm text-text-primary tracking-tight">
                  Pesan / Tanya Menu
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Hubungi langsung pemilik stan untuk reservasi, cek stok porsi, atau pemesanan oleh-oleh.
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-whatsapp hover:bg-emerald-700 active:bg-emerald-800 rounded-sm transition-all min-h-[44px]"
              >
                <MessageCircle size={16} />
                <span>Pesan via WhatsApp</span>
              </a>

              {tenant.instagram && (
                <a
                  href={`https://instagram.com/${tenant.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-text-primary bg-canvas border border-border-subtle hover:bg-surface-subtle rounded-sm transition-all min-h-[44px]"
                >
                  <InstagramIcon size={14} />
                  <span>{tenant.instagram}</span>
                </a>
              )}

              <div className="pt-3 border-t border-border-subtle text-xs text-text-muted leading-relaxed flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0" />
                <span>Sentra Kuliner Plaza Kebun Sayur Balikpapan</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CulinaryDetail;
