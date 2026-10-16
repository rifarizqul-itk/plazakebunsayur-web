import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { useContent, useContentImage } from '../../hooks/useContent';

export function HistorySection() {
  const title = useContent('home.history.title', 'Pasar Inpres Kebun Sayur Balikpapan');
  const p1 = useContent(
    'home.history.p1',
    'Dikenal luas masyarakat sebagai Pasar Inpres Kebun Sayur, kawasan ini bermula dari pasar tradisional pasca kemerdekaan sebelum diresmikan sebagai pusat cinderamata terpadu pada era 1980-an.'
  );
  const p2 = useContent(
    'home.history.p2',
    'Kini, Plaza Kebun Sayur menjadi pusat perdagangan cinderamata di Balikpapan Barat. Pengunjung dapat menemukan batu mulia seperti Kecubung dan Red Borneo, kerajinan Dayak, manik-manik etnik, serta kain tenun dan batik khas pesisir.'
  );
  const historyImage = useContentImage('home.history.image', '/assets/Photograph_of_plaza_building.webp');

  return (
    <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* History Description (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
              {title}
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-prose font-normal">
              <p>{p1}</p>
              <p>{p2}</p>
              <p>
                Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/panduan-kunjungan"
                className="group/guide inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-sm self-start"
              >
                <span>Pelajari Panduan Kunjungan Gedung</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover/guide:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Authentic Heritage Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-border-subtle bg-surface-muted rounded-md group">
              <img
                src={historyImage}
                alt="Gedung Pasar Inpres Kebun Sayur Balikpapan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mono-900/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                  Pusat Cinderamata Tradisional
                </span>
                <p className="text-xs text-mono-200 mt-0.5 font-medium">
                  Kawasan perniagaan batu akik & budaya Kalimantan sejak era 1980-an
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HistorySection;
