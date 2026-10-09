import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { fetchWhatsOnBySlug } from '../services/api';

export function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function loadItem() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWhatsOnBySlug(slug);
        if (!isCancelled) setEventItem(data);
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
          <div className="max-w-md mx-auto p-8 bg-surface-subtle border border-border-subtle rounded-none">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Agenda Tidak Ditemukan</h2>
            <p className="text-sm text-text-secondary mt-2">
              Agenda kegiatan yang Anda tuju mungkin sudah berakhir atau tautan tidak valid.
            </p>
            <Button variant="primary" className="mt-6" onClick={() => navigate('/agenda')}>
              Kembali ke Daftar Agenda
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
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

        <article className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge variant={eventItem.type === 'event' ? 'brand' : 'neutral'} size="sm">
              {eventItem.type === 'event' ? 'Pameran & Acara' : 'Promo Belanja'}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar size={14} />
              <span className="tabular-nums">
                {eventItem.start_date}
                {eventItem.end_date ? ` s.d ${eventItem.end_date}` : ''}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
            {eventItem.title}
          </h1>

          {/* Banner image if available */}
          {eventItem.banner_url && (
            <div className="w-full aspect-[16/9] rounded-none overflow-hidden border border-border-subtle bg-surface-muted my-2 shadow-card">
              <img
                src={eventItem.banner_url}
                alt={eventItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-4 pt-4 border-t border-border-subtle whitespace-pre-line max-w-prose">
            <p className="font-semibold text-text-primary text-base sm:text-lg">
              {eventItem.summary}
            </p>
            <p>{eventItem.content}</p>
          </div>

          <div className="pt-8 border-t border-border-subtle">
            <Link
              to="/agenda"
              className="inline-flex items-center gap-2 py-2.5 min-h-[44px] text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Kembali ke Agenda</span>
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}

export default EventDetail;
