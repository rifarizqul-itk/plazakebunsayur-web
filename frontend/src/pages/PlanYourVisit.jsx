import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, ShieldAlert, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchFacilities, fetchSiteSettings, fetchVisitGuide } from '../services/api';
import { ACCESS_ROUTES, SHOPPING_TIPS, BUILDING_RULES } from '../content/visitGuide';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function PlanYourVisit() {
  const metaTitle = useContent('seo.panduan.title', 'Panduan Kunjungan Gedung | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.panduan.description', 'Rute transportasi bandara dan pelabuhan, jam operasional, fasilitas toilet dan mushola, serta tips belanja di Plaza Kebun Sayur.');
  useDocumentMeta(metaTitle, metaDesc);

  const [facilities, setFacilities] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [visitGuide, setVisitGuide] = useState(null);

  const headerEyebrow = useContent('header.panduan.eyebrow', 'Panduan & Informasi Gedung');
  const headerTitle = useContent('header.panduan.title', 'Rencanakan Kunjungan Anda');
  const headerDesc = useContent(
    'header.panduan.description',
    'Panduan terpadu jam operasional, rute transportasi dari bandara dan pelabuhan, fasilitas umum, serta tata tertib di Plaza Kebun Sayur Balikpapan.'
  );

  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      try {
        const [facs, settings, guide] = await Promise.all([
          fetchFacilities(),
          fetchSiteSettings(),
          fetchVisitGuide(),
        ]);
        if (!isCancelled) {
          setFacilities(facs);
          setSiteSettings(settings);
          setVisitGuide(guide);
        }
      } catch (err) {
        console.error('Failed to load visit guide data:', err);
      }
    }
    loadData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const accessRoutes = visitGuide?.access_routes?.length > 0 ? visitGuide.access_routes : ACCESS_ROUTES;
  const shoppingTips = visitGuide?.shopping_tips?.length > 0 ? visitGuide.shopping_tips : SHOPPING_TIPS;
  const buildingRules = visitGuide?.building_rules?.length > 0 ? visitGuide.building_rules : BUILDING_RULES;

  const mallHours = siteSettings?.mall_opening_hours || 'Buka Setiap Hari: 08.00 – 18.00 WITA';
  const mallAddress = siteSettings?.office_address || 'Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat, Kota Balikpapan 76123';
  const mapsUrl = siteSettings?.maps_url || 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan';

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Standard Page Header per DESIGN.md */}
      <PageHeader
        eyebrow={headerEyebrow}
        title={headerTitle}
        description={headerDesc}
      />

      {/* 3. Main Reading Guide Content (Reading layout per DESIGN.md: titles, text, subtle dividers) */}
      <div className="py-16 md:py-24 flex-1">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-20">

            {/* Section A: Jam Operasional & Titik Lokasi (Dua Kolom di Desktop) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Operasional
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Waktu Operasional & Lokasi Mall
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold text-base">
                    <Clock size={18} className="text-brand-primary shrink-0" />
                    <span>Waktu Buka Gedung</span>
                  </div>
                  <div className="text-sm text-text-secondary leading-relaxed space-y-2 max-w-[68ch]">
                    <p className="text-text-primary font-medium">{mallHours}</p>
                    <p>
                      Kios cinderamata, permata, dan batik beroperasi optimal pukul 09.00 – 17.30 WITA. Stan kuliner dan oleh-oleh mulai melayani pengunjung sejak pagi hari.
                    </p>
                    <p className="text-xs text-text-muted">
                      Waktu kunjungan paling nyaman disarankan antara pukul 10.00 hingga 16.00 WITA.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold text-base">
                    <MapPin size={18} className="text-brand-primary shrink-0" />
                    <span>Alamat & Titik Temu</span>
                  </div>
                  <div className="text-sm text-text-secondary leading-relaxed space-y-2 max-w-[68ch]">
                    <p className="text-text-primary font-medium">{mallAddress}</p>
                    <p>
                      Terletak di pusat perniagaan Kebun Sayur (Pasar Inpres), berhadapan langsung dengan koridor jalan raya utama dan dekat kawasan permukiman Kampung Baru.
                    </p>
                    {mapsUrl && (
                      <div className="pt-2">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary-hover underline"
                        >
                          <Navigation size={14} />
                          <span>Buka Petunjuk Arah di Google Maps</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Google Maps Embed */}
              <div className="mt-8 relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[380px] overflow-hidden border border-border-subtle bg-surface-muted rounded-md group">
                <iframe
                  title="Peta Lokasi Plaza Kebun Sayur Balikpapan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full"
                />
                <a
                  href={mapsUrl || 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-dark/90 hover:bg-brand-primary active:bg-brand-primary-pressed text-white text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm border border-white/20 transition-all shadow-subtle"
                  title="Buka rute navigasi di Google Maps"
                >
                  <span>Buka Petunjuk Arah di Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </section>

            {/* Section B: Rute Transportasi (Daftar Baris dengan Divider) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Aksesibilitas
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Panduan Menuju Lokasi
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  Plaza Kebun Sayur mudah dijangkau dari berbagai pintu masuk utama Kota Balikpapan.
                </p>
              </div>

              <div className="divide-y divide-border-subtle">
                {accessRoutes.map((route) => (
                  <div key={route.id || route.title} className="py-6 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-sm font-semibold text-text-primary">
                        {route.title}
                      </h3>
                      <span className="text-xs text-text-muted mt-0.5 block">
                        {route.distance}
                      </span>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[68ch]">
                        {route.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section C: Fasilitas Gedung (Daftar Baris dengan Divider) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Fasilitas Umum
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Fasilitas Gedung Plaza
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  Fasilitas penunjang kenyamanan belanja dan ibadah yang tersedia di lingkungan gedung.
                </p>
              </div>

              <div className="divide-y divide-border-subtle">
                {facilities.map((fac) => (
                  <div key={fac.id} className="py-5 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <Building2 size={16} className="text-brand-primary shrink-0" />
                        <span>{fac.name}</span>
                      </h3>
                      <span className="text-xs text-text-muted mt-1 block">
                        Lokasi: {fac.location_note}
                      </span>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[68ch]">
                        {fac.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section D: Tips Berbelanja Cerdas (Daftar Baris dengan Divider) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Saran Pengunjung
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Tips Berbelanja Cerdas
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  Praktik terbaik saat berbelanja suvenir, kerajinan etnik, dan batu mulia di Pasar Inpres Kebun Sayur.
                </p>
              </div>

              <div className="divide-y divide-border-subtle">
                {shoppingTips.map((tip) => (
                  <div key={tip.id || tip.title} className="py-5 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <Sparkles size={16} className="text-gold-text shrink-0" />
                        <span>{tip.title}</span>
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[68ch]">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section E: Tata Tertib Gedung */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Ketertiban Bersama
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  Tata Tertib & Keamanan
                </h2>
              </div>

              <div className="divide-y divide-border-subtle">
                {buildingRules.map((rule) => (
                  <div key={rule.id || rule.title} className="py-5 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <ShieldAlert size={16} className="text-brand-primary shrink-0" />
                        <span>{rule.title}</span>
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[68ch]">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </Container>
      </div>
    </div>
  );
}

export default PlanYourVisit;
