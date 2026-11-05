import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function EventNotFound({ onBack }) {
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

export function EventHighlightsCard({ highlightsList }) {
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

export function EventBanner({ bannerSrc, title, type, onImageError }) {
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

export function EventBreadcrumb({ title }) {
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

export function EventMainContent({
  eventItem,
  bannerSrc,
  fallbackBanner,
  dateRange,
  highlightsList,
  onImageError,
}) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <EventBanner
        bannerSrc={bannerSrc || fallbackBanner}
        title={eventItem.title}
        type={eventItem.type}
        onImageError={onImageError}
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
  );
}
