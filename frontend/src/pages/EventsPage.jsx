import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { FilterPills } from '../components/ui/FilterPills';
import { fetchWhatsOn } from '../services/api';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { formatDateRange } from '../utils/date';

const EVENT_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Agenda' },
  { value: 'event', label: 'Pameran & Acara' },
  { value: 'promo', label: 'Promo Kios' },
];

export function EventsPage() {
  const metaTitle = useContent('seo.agenda.title', 'Agenda & Promo | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.agenda.description', 'Jadwal pameran batu akik, bazar cinderamata, pentas seni budaya Dayak, dan promo pedagang di Plaza Kebun Sayur.');
  useDocumentMeta(metaTitle, metaDesc);

  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const headerEyebrow = useContent('header.agenda.eyebrow', 'Agenda & Informasi Resmi');
  const headerTitle = useContent('header.agenda.title', 'Pameran Budaya, Bazar & Promo Kios');
  const headerDesc = useContent(
    'header.agenda.description',
    'Ikuti agenda pameran batu mulia tingkat nusantara, kontes akik Borneo, pertunjukan seni tari Dayak, serta penawaran promo cinderamata terbaru di Plaza Kebun Sayur.'
  );

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
        eyebrow={headerEyebrow}
        title={headerTitle}
        description={headerDesc}
      />

      <section className="py-8 bg-canvas flex-1">
        <Container>
          {/* Filter Pills */}
          <div className="pb-6 border-b border-border-subtle">
            <FilterPills
              options={EVENT_FILTER_OPTIONS}
              selectedValue={filterType}
              onSelect={setFilterType}
            />
          </div>

          {/* List of Events as Rows per DESIGN.md */}
          {loading ? (
            <div className="py-12 text-center text-text-muted">Memuat agenda...</div>
          ) : events.length > 0 ? (
            <div className="divide-y divide-border-subtle border-b border-border-subtle pt-2">
              {events.map((item) => (
                <div
                  key={item.id}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 group"
                >
                  {/* Left Column: Date & Type */}
                  <div className="w-full sm:w-56 shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {item.type === 'event' ? 'Pameran & Acara' : 'Promo Belanja'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-primary tabular-nums">
                      <Calendar size={13} className="text-brand-primary" />
                      <span>{formatDateRange(item.start_date, item.end_date)}</span>
                    </div>
                  </div>

                  {/* Right Column: Title, Summary & Read More */}
                  <div className="flex-1 flex flex-col gap-2">
                    <Link to={`/agenda/${item.slug}`}>
                      <h2 className="font-bold text-lg sm:text-xl text-text-primary group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-text-secondary leading-relaxed max-w-[68ch]">
                      {item.summary}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={`/agenda/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:underline"
                      >
                        <span>Lihat detail agenda</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-subtle rounded-md border border-dashed border-border-subtle my-6">
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
