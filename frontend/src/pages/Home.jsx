import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { HistorySection } from '../components/home/HistorySection';
import { Container } from '../components/layout/Container';
import { fetchTenants, fetchWhatsOn } from '../services/api';

export function Home() {
  const [retailTenants, setRetailTenants] = useState([]);
  const [culinaryTenants, setCulinaryTenants] = useState([]);
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [retailRes, culinaryRes, eventsRes] = await Promise.all([
          fetchTenants({ type: 'retail', featured: true, per_page: 4 }),
          fetchTenants({ type: 'culinary', featured: true, per_page: 3 }),
          fetchWhatsOn(),
        ]);
        setRetailTenants(retailRes.data || []);
        setCulinaryTenants(culinaryRes.data || []);
        setLatestEvents(eventsRes.slice(0, 2) || []);
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Tenants & Culinary Section */}
      <FeaturedSection
        retailTenants={retailTenants}
        culinaryTenants={culinaryTenants}
      />

      {/* 3. Whats On / Event & Promo Highlights */}
      {latestEvents.length > 0 && (
        <section className="py-16 sm:py-20 bg-canvas border-b border-border-subtle">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-border-subtle pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                  Agenda dan kegiatan pasar
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestEvents.map((evt) => (
                <article
                  key={evt.id}
                  className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle hover:border-border-strong active:border-border-strong flex flex-col justify-between gap-6 transition-all rounded-md"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text-muted">
                        {evt.type === 'event' ? 'Pameran & Acara' : 'Promo Kios'}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Calendar size={14} />
                        <span>{evt.start_date}</span>
                      </div>
                    </div>
                    <Link to={`/agenda/${evt.slug}`}>
                      <h3 className="font-bold text-lg sm:text-xl text-text-primary group-hover:text-brand-primary transition-colors tracking-tight">
                        {evt.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-text-secondary line-clamp-3 leading-relaxed">
                      {evt.summary}
                    </p>
                  </div>

                  <Link
                    to={`/agenda/${evt.slug}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white text-xs font-bold uppercase tracking-wider self-start transition-colors rounded-sm"
                  >
                    <span>Lihat Detail Agenda</span>
                    <ArrowRight size={13} />
                  </Link>
                </article>
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
