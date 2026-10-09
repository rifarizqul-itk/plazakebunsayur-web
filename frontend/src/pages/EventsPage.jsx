import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { fetchWhatsOn } from '../services/api';

export function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const typeParam = filterType === 'all' ? null : filterType;
        const data = await fetchWhatsOn(typeParam);
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [filterType]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        eyebrow="Agenda & Informasi Resmi"
        title="Pameran Budaya, Bazar & Promo Kios"
        description="Ikuti agenda pameran batu mulia tingkat nusantara, kontes akik Borneo, pertunjukan seni tari Dayak, serta penawaran promo cinderamata terbaru di Plaza Kebun Sayur."
      />

      <section className="py-8 bg-canvas flex-1">
        <Container>
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border-subtle">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 min-h-[44px] text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center ${
                filterType === 'all'
                  ? 'bg-brand-primary text-white'
                  : 'bg-canvas text-text-secondary border border-border-subtle hover:bg-surface-subtle hover:text-text-primary'
              }`}
            >
              Semua Agenda
            </button>
            <button
              type="button"
              onClick={() => setFilterType('event')}
              className={`px-4 py-2 min-h-[44px] text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center ${
                filterType === 'event'
                  ? 'bg-brand-primary text-white'
                  : 'bg-canvas text-text-secondary border border-border-subtle hover:bg-surface-subtle hover:text-text-primary'
              }`}
            >
              Pameran & Acara
            </button>
            <button
              type="button"
              onClick={() => setFilterType('promo')}
              className={`px-4 py-2 min-h-[44px] text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center ${
                filterType === 'promo'
                  ? 'bg-brand-primary text-white'
                  : 'bg-canvas text-text-secondary border border-border-subtle hover:bg-surface-subtle hover:text-text-primary'
              }`}
            >
              Promo Kios
            </button>
          </div>

          {/* List of Events */}
          {loading ? (
            <div className="py-12 text-center text-text-muted">Memuat agenda...</div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {events.map((item) => (
                <article
                  key={item.id}
                  className="p-5 sm:p-6 bg-surface-subtle border border-border-subtle hover:border-border-strong rounded-none flex flex-col justify-between gap-4 transition-all"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={item.type === 'event' ? 'brand' : 'neutral'} size="sm">
                        {item.type === 'event' ? 'Pameran & Acara' : 'Promo Belanja'}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                        <Calendar size={14} />
                        <span className="tabular-nums">
                          {item.start_date}
                          {item.end_date ? ` s.d ${item.end_date}` : ''}
                        </span>
                      </div>
                    </div>

                    <Link to={`/agenda/${item.slug}`}>
                      <h3 className="font-bold text-lg sm:text-xl text-text-primary hover:text-brand-primary transition-colors tracking-tight">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    to={`/agenda/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary-hover self-start pt-1"
                  >
                    <span>Baca selengkapnya</span>
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-subtle rounded-none border border-dashed border-border-subtle my-6">
              <h3 className="font-bold text-base text-text-primary">Belum Ada Agenda Aktif</h3>
              <p className="text-sm text-text-secondary mt-1">
                Kunjungi kembali halaman ini untuk pembaruan jadwal event dan promo mendatang.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default EventsPage;
