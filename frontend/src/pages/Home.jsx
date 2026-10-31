import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { HistorySection } from '../components/home/HistorySection';
import { Container } from '../components/layout/Container';
import { fetchTenants, fetchWhatsOn } from '../services/api';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { formatDateRange } from '../utils/date';

export function Home() {
  const metaTitle = useContent('seo.home.title', 'Plaza Kebun Sayur Balikpapan | Sentra Kerajinan & Batu Mulia Borneo');
  const metaDesc = useContent('seo.home.description', 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik, dan kuliner khas Kalimantan Timur.');
  useDocumentMeta(metaTitle, metaDesc);

  const eventsTitle = useContent('home.events.title', 'Agenda & Kegiatan Mendatang');
  const [retailTenants, setRetailTenants] = useState([]);
  const [culinaryTenants, setCulinaryTenants] = useState([]);
  const [latestEvents, setLatestEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    async function loadHomeData() {
      try {
        setLoading(true);
        const [retailRes, culinaryRes, eventsRes] = await Promise.all([
          fetchTenants({ type: 'retail', featured: true, per_page: 4 }),
          fetchTenants({ type: 'culinary', featured: true, per_page: 4 }),
          fetchWhatsOn(),
        ]);
        if (!isCancelled) {
          setRetailTenants(retailRes.data || []);
          setCulinaryTenants(culinaryRes.data || []);
          setLatestEvents(eventsRes?.slice(0, 2) || []);
        }
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    loadHomeData();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Tenants & Culinary Section */}
      <FeaturedSection
        retailTenants={retailTenants}
        culinaryTenants={culinaryTenants}
        loading={loading}
      />

      {/* 3. Whats On / Event & Promo Highlights */}
      {latestEvents.length > 0 && (
        <section className="py-16 sm:py-20 bg-canvas border-b border-border-subtle">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  {eventsTitle}
                </h2>
              </div>
              <Link
                to="/agenda"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary transition-colors"
              >
                <span>Lihat Semua Agenda</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {latestEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 group"
                >
                  {/* Left: Date & Type Column */}
                  <div className="w-full sm:w-48 shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {evt.type === 'event' ? 'Pameran & Acara' : 'Promo Kios'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-primary tabular-nums">
                      <Calendar size={13} className="text-brand-primary" />
                      <span>{formatDateRange(evt.start_date, evt.end_date)}</span>
                    </div>
                  </div>

                  {/* Right: Title, Summary & Action */}
                  <div className="flex-1 flex flex-col gap-2">
                    <Link to={`/agenda/${evt.slug}`}>
                      <h3 className="font-semibold text-lg text-text-primary group-hover:text-brand-primary transition-colors">
                        {evt.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed max-w-[68ch]">
                      {evt.summary}
                    </p>
                    <div className="pt-1">
                      <Link
                        to={`/agenda/${evt.slug}`}
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
          </Container>
        </section>
      )}

      {/* 4. History & Culture Section */}
      <HistorySection />
    </div>
  );
}

export default Home;
