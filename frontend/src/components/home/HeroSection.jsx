import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  Pause,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../layout/Container';
import { useContent, useContentImage, useSiteSettings } from '../../hooks/useContent';

const slides = [
  {
    id: 1,
    image: '/assets/Photograph_of_plaza_building.webp',
    tag: 'Fasad Utama Gedung',
    title: 'Gedung Plaza Kebun Sayur Balikpapan',
    desc: 'Pusat perdagangan batu mulia dan kerajinan tradisional Kalimantan Timur.',
    ctaText: 'Pelajari Panduan Kunjungan',
    ctaHref: '/panduan-kunjungan',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80',
    tag: 'Sentra Batu Mulia Borneo',
    title: 'Koleksi Akik, Permata & Cangkang Perak',
    desc: 'Pengrajin ikat cincin dan ragam batu mulia khas Kalimantan terpercaya.',
    ctaText: 'Jelajahi Kios Batu Mulia',
    ctaHref: '/belanja',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80',
    tag: 'Cinderamata & Etnik Dayak',
    title: 'Kerajinan Manik, Tenun & Suvenir Tradisional',
    desc: 'Karya seni ukir Dayak, manik-manik, mandau, dan cenderamata khas Borneo.',
    ctaText: 'Lihat Cinderamata & Tenun',
    ctaHref: '/belanja',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1800&q=80',
    tag: 'Sentra Kuliner Kaltim',
    title: 'Soto Banjar, Mantau & Amplang Renyah',
    desc: 'Sajian kuliner otentik serta panganan khas siap kemas untuk bagasi pesawat.',
    ctaText: 'Cari Stan Kuliner & Oleh-Oleh',
    ctaHref: '/kuliner',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
    tag: 'Suasana Kios Plaza Kebun Sayur',
    title: 'Ratusan Kios Resmi Pengrajin Lokal',
    desc: 'Keramahan interaksi perniagaan dan belanja cinderamata yang nyaman dan terpercaya.',
    ctaText: 'Buka Direktori Lengkap',
    ctaHref: '/belanja',
  },
];

const actionCards = [
  {
    id: 'belanja',
    category: 'KIOS BELANJA',
    title: 'Batu Mulia, Perhiasan & Cinderamata',
    href: '/belanja',
    btnText: 'LIHAT KIOS BELANJA',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kuliner',
    category: 'SENTRA KULINER',
    title: 'Kuliner Tradisional & Oleh-Oleh',
    href: '/kuliner',
    btnText: 'LIHAT STAN KULINER',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'panduan',
    category: 'INFORMASI GEDUNG',
    title: 'Panduan Kunjungan & Fasilitas',
    href: '/panduan-kunjungan',
    btnText: 'BUKA PANDUAN',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
];

function SlideItem({ slide, idx, isActive }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover scale-102 transition-transform duration-7000 ease-out"
        loading={idx === 0 ? 'eager' : 'lazy'}
      />
      {/* Cinematic dark gradients for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-mono-900/95 via-mono-900/40 to-mono-900/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-mono-900/60 via-transparent to-mono-900/30" />

      {/* Slide Minimal Caption */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 sm:pb-12 pt-16">
        <Container>
          <div className="max-w-xl flex flex-col gap-1.5 text-white">
            <span className="text-xs font-semibold tracking-wider uppercase text-gold">
              {slide.tag}
            </span>
            {idx === 0 ? (
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {slide.title}
              </h1>
            ) : (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {slide.title}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-mono-200 line-clamp-2 mt-0.5">
              {slide.desc}
            </p>
            {slide.ctaHref && (
              <Link
                to={slide.ctaHref}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-gold transition-colors self-start group/link min-h-[44px] py-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

function SlideControls({ isPaused, onTogglePause, currentSlide, totalSlides, onSelectSlide }) {
  const currentFormatted = String(currentSlide + 1).padStart(2, '0');
  const totalFormatted = String(totalSlides).padStart(2, '0');

  return (
    <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-30 flex items-center gap-2 bg-surface-dark/85 backdrop-blur-sm px-2.5 py-1 border border-white/10 rounded-sm shadow-subtle">
      <button
        type="button"
        onClick={onTogglePause}
        className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-gold active:text-gold-text transition-colors rounded-sm cursor-pointer focus:outline-none"
        aria-label={isPaused ? 'Putar otomatis slider' : 'Jeda otomatis slider'}
        title={isPaused ? 'Putar slider' : 'Jeda slider'}
      >
        {isPaused ? <Play size={16} className="fill-current" /> : <Pause size={16} className="fill-current" />}
      </button>
      <span className="text-xs font-mono font-bold text-white tracking-widest tabular-nums border-l border-white/20 pl-2 pr-1">
        {currentFormatted} / {totalFormatted}
      </span>
      <div className="flex items-center gap-1" role="group" aria-label="Navigasi Slide">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSlide(idx)}
            className="min-h-[44px] flex items-center px-1 cursor-pointer focus:outline-none"
            aria-label={`Buka slide ${idx + 1}`}
            aria-current={idx === currentSlide ? 'true' : 'false'}
          >
            <span
              className={`h-1.5 overflow-hidden transition-all rounded-sm relative block ${
                idx === currentSlide
                  ? 'w-8 bg-white/20'
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            >
              {idx === currentSlide && (
                <span
                  key={`progress-${currentSlide}`}
                  className="absolute inset-y-0 left-0 bg-brand-primary animate-slide-progress"
                  style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActionCardItem({ card }) {
  return (
    <Link
      to={card.href}
      className="group relative rounded-md overflow-hidden bg-surface-dark border border-mono-800 flex flex-col justify-end p-6 min-h-[300px] sm:min-h-[340px] h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary transition-all duration-300 hover:border-mono-600 cursor-pointer"
    >
      {/* Background Ambient Image */}
      <img
        src={card.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out z-0 pointer-events-none"
      />
      {/* Balanced dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-mono-900/90 via-mono-900/60 to-mono-900/20 z-1 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gold drop-shadow-sm">
          {card.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 drop-shadow-sm">
          {card.title}
        </h3>
        <div className="w-full py-3 px-4 min-h-[44px] bg-brand-primary group-hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 rounded-sm shadow-sm">
          <span>{card.btnText}</span>
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [witaTime, setWitaTime] = useState('');
  const siteSettings = useSiteSettings();

  const heroImage = useContentImage('home.hero.image', '/assets/Photograph_of_plaza_building.webp');
  const heroTitle = useContent('home.hero.title', 'Gedung Plaza Kebun Sayur Balikpapan');
  const heroSubtitle = useContent(
    'home.hero.subtitle',
    'Pusat perdagangan batu mulia dan kerajinan tradisional Kalimantan Timur.'
  );
  const ctaPrimaryText = useContent('home.hero.cta_primary', 'LIHAT KIOS BELANJA');
  const ctaSecondaryText = useContent('home.hero.cta_secondary', 'JELAJAHI SENTRA KULINER');

  const activeSlides = [
    {
      ...slides[0],
      image: heroImage,
      title: heroTitle,
      desc: heroSubtitle,
    },
    ...slides.slice(1),
  ];

  const activeActionCards = [
    { ...actionCards[0], btnText: ctaPrimaryText },
    { ...actionCards[1], btnText: ctaSecondaryText },
    actionCards[2],
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Auto-slide 5s with pause on hover, focus, and prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    if (isPaused || (mediaQuery && mediaQuery.matches)) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Real-time WITA Clock Tracker (UTC+8)
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

  const mallAddress = siteSettings?.office_address || 'Plaza Kebun Sayur, Jl. Letjen Suprapto, Baru Ilir, Kec. Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131';
  const mallHours = siteSettings?.mall_opening_hours || '08.00 – 18.00 WITA (Buka Setiap Hari)';
  const mapsUrl = siteSettings?.maps_url || 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(mallAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    }
  };

  return (
    <div className="flex flex-col bg-canvas">
      {/* 1. Auto-Sliding Photo Highlights Gallery */}
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
        {/* Slides */}
        {activeSlides.map((slide, idx) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            idx={idx}
            isActive={idx === currentSlide}
          />
        ))}

        {/* Prev / Next Arrows */}
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

        {/* Slide Controls: Play/Pause, Counter & Progress Indicator */}
        <SlideControls
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
          currentSlide={currentSlide}
          totalSlides={activeSlides.length}
          onSelectSlide={setCurrentSlide}
        />
      </section>

      {/* 2. Layanan dan Komoditas Belanja */}
      <section className="py-14 sm:py-18 bg-canvas border-b border-border-subtle">
        <Container>
          {/* Centered Display Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
              Apa Yang Ada Di Plaza Kebun Sayur?
            </h2>
          </div>

          {/* Trio Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {activeActionCards.map((card) => (
              <ActionCardItem key={card.id} card={card} />
            ))}
          </div>

          {/* 3. Quick Info Module: Opening Hours & Getting Here */}
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
                {/* Interactive Quick Actions (Salin Alamat & Google Maps Navigasi) */}
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
                <span>Lihat rute dari bandara & pelabuhan</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default HeroSection;
