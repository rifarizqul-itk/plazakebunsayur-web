import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Navigation,
  ShieldAlert,
  ExternalLink,
  Moon,
  Users,
  CreditCard,
  Car,
  ShieldCheck,
  Building2,
  Wifi,
  Accessibility,
  Baby,
  Utensils,
  ShoppingBag,
  Sparkles,
  Info,
  HeartPulse,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchFacilities, fetchVisitGuide } from '../services/api';
import { ACCESS_ROUTES, SHOPPING_TIPS, BUILDING_RULES } from '../content/visitGuide';
import { useContent, useSiteSettings } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const FACILITY_ICON_MAP = {
  Moon,
  Users,
  CreditCard,
  Car,
  ShieldCheck,
  Building2,
  Wifi,
  Accessibility,
  Baby,
  Utensils,
  ShoppingBag,
  Sparkles,
  Info,
  HeartPulse,
  MapPin,
};

function getFacilityIcon(iconNameOrTitle) {
  const raw = String(iconNameOrTitle || '').trim();
  if (!raw) return Building2;

  // 1. Direct match (case-insensitive) against curated Lucide icon names
  const directMatch = Object.keys(FACILITY_ICON_MAP).find(
    (key) => key.toLowerCase() === raw.toLowerCase()
  );
  if (directMatch) {
    return FACILITY_ICON_MAP[directMatch];
  }

  // 2. Keyword-based matching for legacy strings or Indonesian titles
  const key = raw.toLowerCase();
  if (key.includes('moon') || key.includes('musholla') || key.includes('musala') || key.includes('ibadah')) {
    return Moon;
  }
  if (key.includes('user') || key.includes('toilet') || key.includes('bath') || key.includes('sanitasi')) {
    return Users;
  }
  if (key.includes('credit') || key.includes('card') || key.includes('atm') || key.includes('bank') || key.includes('finansial')) {
    return CreditCard;
  }
  if (key.includes('car') || key.includes('parkir') || key.includes('kendaraan')) {
    return Car;
  }
  if (key.includes('shield') || key.includes('keamanan') || key.includes('satpam') || key.includes('pos')) {
    return ShieldCheck;
  }
  if (key.includes('wifi') || key.includes('internet')) {
    return Wifi;
  }
  if (key.includes('access') || key.includes('disabilitas') || key.includes('kursi')) {
    return Accessibility;
  }
  if (key.includes('baby') || key.includes('laktasi') || key.includes('anak')) {
    return Baby;
  }
  if (key.includes('utensil') || key.includes('makan') || key.includes('kuliner') || key.includes('kantin')) {
    return Utensils;
  }
  if (key.includes('shop') || key.includes('belanja') || key.includes('kios')) {
    return ShoppingBag;
  }
  if (key.includes('sparkle') || key.includes('khusus')) {
    return Sparkles;
  }
  if (key.includes('info') || key.includes('informasi')) {
    return Info;
  }
  if (key.includes('heart') || key.includes('pulse') || key.includes('p3k') || key.includes('sehat')) {
    return HeartPulse;
  }
  if (key.includes('pin') || key.includes('lokasi') || key.includes('titik')) {
    return MapPin;
  }

  // 3. Fallback to standard Building2 icon
  return Building2;
}

const DEFAULT_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid';

export function PlanYourVisit() {
  const metaTitle = useContent('seo.panduan.title', 'Panduan Kunjungan Gedung | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent(
    'seo.panduan.description',
    'Jam operasional, lokasi mall, fasilitas umum gedung, dan tata tertib di Plaza Kebun Sayur Balikpapan.'
  );
  useDocumentMeta(metaTitle, metaDesc);

  const [facilities, setFacilities] = useState([]);
  const [visitGuide, setVisitGuide] = useState(null);
  const siteSettings = useSiteSettings();

  const headerTitle = useContent('header.panduan.title', 'Rencanakan Kunjungan Anda');
  const headerDesc = useContent(
    'header.panduan.description',
    'Panduan terpadu jam operasional gedung, titik lokasi, fasilitas umum, serta tata tertib kunjungan di Plaza Kebun Sayur Balikpapan.'
  );

  const hoursTitle = useContent('panduan.hours_title', 'Waktu Operasional & Lokasi Mall');
  const hoursDetail = useContent(
    'panduan.hours_detail',
    'Kios cinderamata, batu mulia, pakaian adat, dan batik beroperasi optimal pukul 09.00 – 17.30 WITA. Kios depan dan pedagang oleh-oleh mulai melayani pengunjung sejak pagi hari.'
  );
  const hoursTip = useContent(
    'panduan.hours_tip',
    'Waktu kunjungan paling nyaman disarankan antara pukul 10.00 hingga 16.00 WITA.'
  );
  const locationTitle = useContent('panduan.location_title', 'Alamat & Titik Temu');
  const locationDetail = useContent(
    'panduan.location_detail',
    'Terletak di pusat perniagaan Kebun Sayur, Balikpapan Barat, berhadapan langsung dengan koridor jalan raya utama dan dekat kawasan permukiman Kampung Baru.'
  );
  const facilitiesTitle = useContent('panduan.facilities_title', 'Fasilitas Gedung Plaza');
  const facilitiesDesc = useContent(
    'panduan.facilities_description',
    'Fasilitas penunjang kenyamanan belanja dan ibadah yang tersedia di lingkungan gedung Plaza Kebun Sayur.'
  );
  const routesTitle = useContent('panduan.routes_title', 'Akses Transportasi Menuju Lokasi');
  const routesDesc = useContent(
    'panduan.routes_description',
    'Panduan rute perjalanan dari bandara, pelabuhan, dan angkutan kota menuju Plaza Kebun Sayur.'
  );
  const tipsTitle = useContent('panduan.tips_title', 'Tips Berbelanja Cerdas');
  const tipsDesc = useContent(
    'panduan.tips_description',
    'Praktik terbaik saat berbelanja suvenir, kerajinan etnik, dan batu mulia di Plaza Kebun Sayur.'
  );
  const rulesTitle = useContent('panduan.rules_title', 'Tata Tertib & Keamanan');
  const rulesDesc = useContent(
    'panduan.rules_description',
    'Panduan ketertiban demi kenyamanan, kebersihan, dan keselamatan bersama selama berada di Plaza Kebun Sayur.'
  );

  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      try {
        const [facs, guide] = await Promise.all([
          fetchFacilities(),
          fetchVisitGuide(),
        ]);
        if (!isCancelled) {
          setFacilities(facs);
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

  // Filter out any facility with 'food court' or 'kuliner' in the name
  const filteredFacilities = (facilities || []).filter((fac) => {
    const name = String(fac.name || '').toLowerCase();
    const desc = String(fac.description || '').toLowerCase();
    return !name.includes('food court') && !name.includes('kuliner') && !desc.includes('food court');
  });

  const mallHours = siteSettings?.mall_opening_hours || 'Buka Setiap Hari: 08.00 – 18.00 WITA';
  const mallAddress = siteSettings?.office_address || 'Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat, Kota Balikpapan 76123';
  const mapsUrl = siteSettings?.maps_url || 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan';
  const mapsEmbedUrl = siteSettings?.maps_embed_url || DEFAULT_MAPS_EMBED_URL;

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Standard Page Header per DESIGN.md */}
      <PageHeader
        title={headerTitle}
        description={headerDesc}
      />

      {/* 2. Main Reading Guide Content */}
      <section className="py-10 sm:py-14 bg-canvas flex-1">
        <Container>
          <div className="flex flex-col gap-12 sm:gap-16">

            {/* Section A: Jam Operasional & Titik Lokasi (Dua Kolom di Desktop) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {hoursTitle}
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
                      {hoursDetail}
                    </p>
                    <p className="text-xs text-text-muted">
                      {hoursTip}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold text-base">
                    <MapPin size={18} className="text-brand-primary shrink-0" />
                    <span>{locationTitle}</span>
                  </div>
                  <div className="text-sm text-text-secondary leading-relaxed space-y-2 max-w-[68ch]">
                    <p className="text-text-primary font-medium">{mallAddress}</p>
                    <p>
                      {locationDetail}
                    </p>
                    {mapsUrl && (
                      <div className="pt-2">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[44px] py-2 text-xs font-semibold text-brand-primary hover:text-brand-primary-hover underline"
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
                  src={mapsEmbedUrl}
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
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 bg-surface-dark/90 hover:bg-brand-primary active:bg-brand-primary-pressed text-white text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm border border-white/20 transition-all shadow-subtle cursor-pointer"
                  title="Buka rute navigasi di Google Maps"
                >
                  <span>Buka Petunjuk Arah di Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </section>

            {/* Section B: Akses Transportasi Menuju Lokasi */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {routesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  {routesDesc}
                </p>
              </div>

              <div className="divide-y divide-border-subtle">
                {accessRoutes.map((route) => (
                  <div key={route.id || route.title} className="py-6 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-sm font-semibold text-text-primary">
                        {route.title}
                      </h3>
                      {route.distance && (
                        <span className="text-xs text-text-muted mt-0.5 block">
                          {route.distance}
                        </span>
                      )}
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

            {/* Section C: Fasilitas Gedung Plaza (Grid Ikon dengan Label Singkat) */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {facilitiesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  {facilitiesDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {filteredFacilities.map((fac) => {
                  const Icon = getFacilityIcon(fac.icon_name || fac.name);
                  return (
                    <div
                      key={fac.id || fac.name}
                      className="flex flex-col items-center justify-center text-center p-5 bg-surface-subtle border border-border-subtle rounded-md hover:border-brand-primary/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-sm font-bold text-text-primary">
                        {fac.name}
                      </h3>
                      {fac.location_note && (
                        <span className="text-xs text-text-muted mt-1">
                          {fac.location_note}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section D: Tips Berbelanja Cerdas */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {tipsTitle}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  {tipsDesc}
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

            {/* Section E: Tata Tertib & Keamanan */}
            <section>
              <div className="border-b border-border-subtle pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {rulesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[68ch]">
                  {rulesDesc}
                </p>
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
      </section>
    </div>
  );
}

export default PlanYourVisit;
