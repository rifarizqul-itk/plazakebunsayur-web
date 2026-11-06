import React from 'react';
import { Container } from '../layout/Container';
import { useContent, useContentImage } from '../../hooks/useContent';

export function HistorySection() {
  const eyebrow = useContent('home.history.eyebrow', 'Warisan Budaya Balikpapan');
  const title = useContent('home.history.title', 'Plaza Kebun Sayur Balikpapan');
  const p1 = useContent(
    'home.history.p1',
    'Berdiri kokoh di kawasan perniagaan Kebun Sayur, Balikpapan Barat, Plaza Kebun Sayur telah tumbuh menjadi sentra belanja modern dan pusat cinderamata utama di Kalimantan Timur.'
  );
  const p2 = useContent(
    'home.history.p2',
    'Pengunjung dapat menemukan ragam batu mulia khas Kalimantan seperti Kecubung dan Red Borneo, perhiasan emas dan perak, kerajinan Dayak, manik-manik etnik, serta kain tenun dan batik khas pesisir dengan fasilitas gedung yang nyaman.'
  );
  const p3 = useContent(
    'home.history.p3',
    'Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.'
  );
  const historyImage = useContentImage('home.history.image', '/assets/Photograph_of_plaza_building.webp');

  return (
    <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* History Description (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              {eyebrow && (
                <span className="text-xs font-semibold text-brand-primary tracking-wide block mb-1">
                  {eyebrow}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                {title}
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-prose font-normal">
              <p>{p1}</p>
              <p>{p2}</p>
              <p>{p3}</p>
            </div>
          </div>

          {/* Authentic Heritage Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-border-subtle bg-surface-muted rounded-md shadow-card">
              <img
                src={historyImage}
                alt="Gedung Plaza Kebun Sayur Balikpapan"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HistorySection;
