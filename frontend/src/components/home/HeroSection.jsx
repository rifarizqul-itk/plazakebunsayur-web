import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../layout/Container';
import { useContent, useContentImage, useSiteSettings } from '../../hooks/useContent';
import { resolveBuildingPhotos } from '../../utils/media';
import { SlideItem, SlideControls, ActionCardItem } from './HeroSliderParts';

function useHeroSlider(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const mediaQuery = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    if (isPaused || (mediaQuery && mediaQuery.matches)) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return {
    currentSlide,
    setCurrentSlide,
    isPaused,
    setIsPaused,
    nextSlide,
    prevSlide,
  };
}

function useWitaClock() {
  const [witaTime, setWitaTime] = useState('');

  useEffect(() => {
    const checkOperatingStatus = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const witaHours = (utcHours + 8) % 24;

      const formattedTime = `${String(witaHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')} WITA`;
      setWitaTime(formattedTime);
    };

    checkOperatingStatus();
    const interval = setInterval(checkOperatingStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return witaTime;
}

function useCopyAddress(mallAddress) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(mallAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    }
  }, [mallAddress]);

  return { copiedAddress, handleCopyAddress };
}

function HeroSliderModule({
  activeSlides,
  currentSlide,
  isPaused,
  setIsPaused,
  nextSlide,
  prevSlide,
  setCurrentSlide,
}) {
  return (
    <section
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] max-h-[580px] bg-surface-dark overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      aria-label="Galeri Sorotan Plaza Kebun Sayur"
    >
      {activeSlides.map((slide, idx) => (
        <SlideItem
          key={slide.id}
          slide={slide}
          idx={idx}
          isActive={idx === currentSlide}
        />
      ))}

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center bg-surface-dark/70 hover:bg-brand-primary active:bg-brand-primary-pressed text-white border border-white/20 transition-all rounded-sm cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center bg-surface-dark/70 hover:bg-brand-primary active:bg-brand-primary-pressed text-white border border-white/20 transition-all rounded-sm cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
        aria-label="Slide berikutnya"
      >
        <ChevronRight size={22} />
      </button>

      <SlideControls
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        currentSlide={currentSlide}
        totalSlides={activeSlides.length}
        onSelectSlide={setCurrentSlide}
      />
    </section>
  );
}

function QuickInfoModule({
  mallHours,
  witaTime,
  mallAddress,
  mapsUrl,
  copiedAddress,
  handleCopyAddress,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Box 1: Opening Hours */}
      <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md flex flex-col gap-1.5 hover:border-border-strong transition-colors">
        <h4 className="text-base font-bold text-text-primary">
          Waktu operasional mall
        </h4>
        <p className="text-sm font-semibold text-text-primary">
          {mallHours}
        </p>
        {witaTime && (
          <span className="text-xs text-text-muted">
            Waktu lokal WITA saat ini: <span className="font-mono font-medium text-text-secondary">{witaTime}</span>
          </span>
        )}
        <Link
          to="/panduan-kunjungan"
          className="inline-flex items-center gap-1 min-h-[44px] py-2 text-xs font-semibold text-brand-primary hover:underline mt-1 self-start"
        >
          <span>Lihat jadwal operasional lengkap</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Box 2: Getting Here with Interactive Quick-Copy */}
      <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md flex flex-col gap-1.5 hover:border-border-strong transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base font-bold text-text-primary">
            Petunjuk lokasi dan akses
          </h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary active:bg-surface-muted bg-canvas border border-border-subtle rounded-sm transition-all cursor-pointer"
              title="Salin alamat lengkap untuk navigasi GPS / ojek online"
            >
              {copiedAddress ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-text-muted" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary active:bg-surface-muted bg-canvas border border-border-subtle rounded-sm transition-all"
              title="Buka rute navigasi langsung di Google Maps"
            >
              <span>Buka Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <p className="text-sm font-semibold text-text-primary">
          {mallAddress}
        </p>
        <Link
          to="/panduan-kunjungan"
          className="inline-flex items-center gap-1 min-h-[44px] py-2 text-xs font-semibold text-brand-primary hover:underline mt-1 self-start"
        >
          <span>Lihat informasi lokasi & fasilitas gedung</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export function HeroSection() {
  const siteSettings = useSiteSettings();
  const witaTime = useWitaClock();

  const heroImagesRaw = useContent('home.hero.images', null);
  const heroImage = useContentImage('home.hero.image', '/assets/Photograph_of_plaza_building.webp');
  const heroTitle = useContent('home.hero.title', 'Gedung Plaza Kebun Sayur Balikpapan');
  const heroSubtitle = useContent(
    'home.hero.subtitle',
    'Pusat perdagangan batu mulia dan kerajinan tradisional Kalimantan Timur.'
  );
  const ctaPrimaryText = useContent('home.hero.cta_primary', 'LIHAT KIOS BELANJA');
  const ctaSecondaryText = useContent('home.hero.cta_secondary', 'LIHAT SENTRA FASHION');
  const buildingTag = useContent('home.hero.building_tag', 'Fasad Utama Gedung');
  const buildingCta = useContent('home.hero.building_cta', 'Pelajari Panduan Kunjungan');

  // Category Slides CMS Bindings
  const batuMuliaTag = useContent('home.hero.slide.batu_mulia.tag', 'Sentra Batu Mulia Borneo');
  const batuMuliaTitle = useContent('home.hero.slide.batu_mulia.title', 'Koleksi Akik, Permata & Cangkang Perak');
  const batuMuliaDesc = useContent('home.hero.slide.batu_mulia.desc', 'Pengrajin ikat cincin dan ragam batu mulia khas Kalimantan terpercaya.');
  const batuMuliaCta = useContent('home.hero.slide.batu_mulia.cta', 'Jelajahi Kios Batu Mulia');
  const batuMuliaImg = useContentImage('home.hero.slide.batu_mulia.image', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80');

  const cindTag = useContent('home.hero.slide.cinderamata.tag', 'Cinderamata & Etnik Dayak');
  const cindTitle = useContent('home.hero.slide.cinderamata.title', 'Kerajinan Manik, Tenun & Suvenir Tradisional');
  const cindDesc = useContent('home.hero.slide.cinderamata.desc', 'Karya seni ukir Dayak, manik-manik, mandau, dan cenderamata khas Borneo.');
  const cindCta = useContent('home.hero.slide.cinderamata.cta', 'Lihat Cinderamata & Tenun');
  const cindImg = useContentImage('home.hero.slide.cinderamata.image', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80');

  const fashTag = useContent('home.hero.slide.fashion.tag', 'Sentra Fashion & Busana Kaltim');
  const fashTitle = useContent('home.hero.slide.fashion.title', 'Batik Balikpapan, Tenun Samarinda & Busana Adat');
  const fashDesc = useContent('home.hero.slide.fashion.desc', 'Koleksi pakaian etnik Kalimantan, kain tenun asli, dan busana modern pilihan.');
  const fashCta = useContent('home.hero.slide.fashion.cta', 'Jelajahi Sentra Fashion');
  const fashImg = useContentImage('home.hero.slide.fashion.image', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=80');

  const suasanaTag = useContent('home.hero.slide.suasana.tag', 'Suasana Kios Plaza Kebun Sayur');
  const suasanaTitle = useContent('home.hero.slide.suasana.title', 'Ratusan Kios Resmi Pengrajin Lokal');
  const suasanaDesc = useContent('home.hero.slide.suasana.desc', 'Keramahan interaksi perniagaan dan belanja cinderamata yang nyaman dan terpercaya.');
  const suasanaCta = useContent('home.hero.slide.suasana.cta', 'Buka Direktori Lengkap');
  const suasanaImg = useContentImage('home.hero.slide.suasana.image', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80');

  // Quick Access & Action Cards CMS Bindings
  const quickAccessTitle = useContent('home.quick_access.title', 'Apa Yang Ada Di Plaza Kebun Sayur?');
  const quickAccessDesc = useContent('home.quick_access.description', '');

  const actionBelanjaCategory = useContent('home.action.belanja.category', 'KIOS BELANJA');
  const actionBelanjaTitle = useContent('home.action.belanja.title', 'Batu Mulia, Perhiasan & Cinderamata');
  const actionBelanjaBtnText = useContent('home.action.belanja.btn_text', ctaPrimaryText || 'LIHAT KIOS BELANJA');
  const actionBelanjaImg = useContentImage('home.action.belanja.image', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80');

  const actionFashionCategory = useContent('home.action.fashion.category', 'SENTRA FASHION');
  const actionFashionTitle = useContent('home.action.fashion.title', 'Batik, Busana Adat & Pakaian');
  const actionFashionBtnText = useContent('home.action.fashion.btn_text', ctaSecondaryText || 'LIHAT SENTRA FASHION');
  const actionFashionImg = useContentImage('home.action.fashion.image', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80');

  const actionPanduanCategory = useContent('home.action.panduan.category', 'INFORMASI GEDUNG');
  const actionPanduanTitle = useContent('home.action.panduan.title', 'Panduan Kunjungan & Fasilitas');
  const actionPanduanBtnText = useContent('home.action.panduan.btn_text', 'BUKA PANDUAN');
  const actionPanduanImg = useContentImage('home.action.panduan.image', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80');

  const buildingPhotos = resolveBuildingPhotos(heroImagesRaw, siteSettings?.building_images, heroImage);

  const buildingSlides = buildingPhotos.map((photo, i) => ({
    id: `gedung-plaza-${i + 1}`,
    image: photo,
    tag: buildingPhotos.length > 1 ? `${buildingTag} (${i + 1}/${buildingPhotos.length})` : buildingTag,
    title: heroTitle,
    desc: heroSubtitle,
    ctaText: buildingCta,
    ctaHref: '/panduan-kunjungan',
  }));

  const categorySlides = [
    {
      id: 'batu-mulia',
      image: batuMuliaImg,
      tag: batuMuliaTag,
      title: batuMuliaTitle,
      desc: batuMuliaDesc,
      ctaText: batuMuliaCta,
      ctaHref: '/belanja',
    },
    {
      id: 'cinderamata-dayak',
      image: cindImg,
      tag: cindTag,
      title: cindTitle,
      desc: cindDesc,
      ctaText: cindCta,
      ctaHref: '/belanja',
    },
    {
      id: 'sentra-fashion',
      image: fashImg,
      tag: fashTag,
      title: fashTitle,
      desc: fashDesc,
      ctaText: fashCta,
      ctaHref: '/fashion',
    },
    {
      id: 'suasana-plaza',
      image: suasanaImg,
      tag: suasanaTag,
      title: suasanaTitle,
      desc: suasanaDesc,
      ctaText: suasanaCta,
      ctaHref: '/belanja',
    },
  ];

  const activeSlides = [...buildingSlides, ...categorySlides];

  const activeActionCards = [
    {
      id: 'belanja',
      category: actionBelanjaCategory,
      title: actionBelanjaTitle,
      href: '/belanja',
      btnText: actionBelanjaBtnText,
      image: actionBelanjaImg,
    },
    {
      id: 'fashion',
      category: actionFashionCategory,
      title: actionFashionTitle,
      href: '/fashion',
      btnText: actionFashionBtnText,
      image: actionFashionImg,
    },
    {
      id: 'panduan',
      category: actionPanduanCategory,
      title: actionPanduanTitle,
      href: '/panduan-kunjungan',
      btnText: actionPanduanBtnText,
      image: actionPanduanImg,
    },
  ];

  const slider = useHeroSlider(activeSlides.length);

  const mallAddress = siteSettings?.office_address || 'Plaza Kebun Sayur, Jl. Letjen Suprapto, Baru Ilir, Kec. Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131';
  const mallHours = siteSettings?.mall_opening_hours || '08.00 – 18.00 WITA (Buka Setiap Hari)';
  const mapsUrl = siteSettings?.maps_url || 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan';

  const { copiedAddress, handleCopyAddress } = useCopyAddress(mallAddress);

  return (
    <div className="flex flex-col bg-canvas">
      {/* 1. Auto-Sliding Photo Highlights Gallery */}
      <HeroSliderModule
        activeSlides={activeSlides}
        currentSlide={slider.currentSlide}
        isPaused={slider.isPaused}
        setIsPaused={slider.setIsPaused}
        nextSlide={slider.nextSlide}
        prevSlide={slider.prevSlide}
        setCurrentSlide={slider.setCurrentSlide}
      />

      {/* 2. Layanan dan Komoditas Belanja */}
      <section className="py-14 sm:py-18 bg-canvas border-b border-border-subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
              {quickAccessTitle}
            </h2>
            {quickAccessDesc && (
              <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
                {quickAccessDesc}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {activeActionCards.map((card) => (
              <ActionCardItem key={card.id} card={card} />
            ))}
          </div>

          <QuickInfoModule
            mallHours={mallHours}
            witaTime={witaTime}
            mallAddress={mallAddress}
            mapsUrl={mapsUrl}
            copiedAddress={copiedAddress}
            handleCopyAddress={handleCopyAddress}
          />
        </Container>
      </section>
    </div>
  );
}

export default HeroSection;
