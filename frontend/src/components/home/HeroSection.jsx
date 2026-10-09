import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { Container } from '../layout/Container';

const slides = [
  {
    id: 1,
    image: '/assets/Photograph_of_plaza_building.webp',
    tag: 'Fasad Utama Gedung',
    title: 'Gedung Plaza Kebun Sayur Balikpapan',
    desc: 'Pusat perdagangan cagar budaya dan kerajinan tradisional Kalimantan Timur.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80',
    tag: 'Sentra Batu Mulia Borneo',
    title: 'Koleksi Akik, Permata & Cangkang Perak',
    desc: 'Pengrajin ikat cincin dan ragam batu mulia khas Kalimantan terpercaya.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80',
    tag: 'Cinderamata & Etnik Dayak',
    title: 'Kerajinan Manik, Tenun & Suvenir Tradisional',
    desc: 'Karya seni ukir Dayak, manik-manik, mandau, dan cenderamata khas Borneo.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1800&q=80',
    tag: 'Sentra Kuliner Kaltim',
    title: 'Soto Banjar, Mantau & Amplang Renyah',
    desc: 'Sajian kuliner otentik serta panganan khas siap kemas untuk bagasi pesawat.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
    tag: 'Suasana Kios Pasar Inpres',
    title: 'Ratusan Kios Resmi Pengrajin Lokal',
    desc: 'Keramahan interaksi pasar tradisional yang telah melegenda puluhan tahun.',
  },
];

const actionCards = [
  {
    id: 'belanja',
    category: 'Kios Belanja',
    title: 'Batu Mulia, Perhiasan & Cinderamata',
    description: 'Temukan pengrajin batu akik Borneo, perhiasan emas perak, dan cinderamata Dayak.',
    href: '/belanja',
    btnText: 'Lihat Kios Belanja',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'kuliner',
    category: 'Sentra Kuliner',
    title: 'Kuliner Tradisional & Oleh-Oleh',
    description: 'Stan amplang kuku macan, soto banjar, mantau, dan kudapan khas pesisir.',
    href: '/kuliner',
    btnText: 'Lihat Stan Kuliner',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'panduan',
    category: 'Informasi Gedung',
    title: 'Panduan Kunjungan & Fasilitas',
    description: 'Jadwal buka harian, akses dari bandara/pelabuhan, denah lantai, dan fasilitas umum.',
    href: '/panduan-kunjungan',
    btnText: 'Buka Panduan',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [witaTime, setWitaTime] = useState('');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-slide 5s with pause on hover, focus, and prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    if (isPaused || (mediaQuery && mediaQuery.matches)) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Real-time WITA Operating Hours Tracker (UTC+8)
  useEffect(() => {
    const checkOperatingStatus = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const witaHours = (utcHours + 8) % 24;

      const isOpen = witaHours >= 8 && witaHours < 18;
      setIsOpenNow(isOpen);

      const formattedTime = `${String(witaHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')} WITA`;
      setWitaTime(formattedTime);
    };

    checkOperatingStatus();
    const interval = setInterval(checkOperatingStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        'Plaza Kebun Sayur, Jl. Letjen Suprapto, Baru Ilir, Kec. Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131'
      );
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
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={idx !== currentSlide}
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
                  <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <span>{slide.tag}</span>
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-mono-200 line-clamp-2 mt-0.5">
                    {slide.desc}
                  </p>
                </div>
              </Container>
            </div>
          </div>
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

        {/* Slide Counter & Progress Countdown Indicator (Design Spell) */}
        <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-30 flex items-center gap-3 bg-surface-dark/80 backdrop-blur-sm px-3.5 py-2 border border-white/10 rounded-sm shadow-subtle">
          <span className="text-xs font-mono font-bold text-white tracking-widest tabular-nums">
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Navigasi Slide">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 overflow-hidden transition-all rounded-sm cursor-pointer relative ${
                  idx === currentSlide
                    ? 'w-8 bg-white/20'
                    : 'w-2.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Buka slide ${idx + 1}`}
                aria-current={idx === currentSlide ? 'true' : 'false'}
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Layanan dan Komoditas Pasar */}
      <section className="py-14 sm:py-18 bg-canvas border-b border-border-subtle">
        <Container>
          {/* Centered Display Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
              Layanan dan Komoditas Pasar
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Pusat perdagangan batu mulia, kerajinan tradisional, kain tenun, dan kuliner khas Balikpapan dalam satu kawasan terpadu.
            </p>
          </div>

          {/* Trio Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card) => (
              <div
                key={card.id}
                className={`group relative rounded-md overflow-hidden bg-surface-dark border border-mono-800 flex flex-col justify-end p-6 ${
                  card.featured
                    ? 'md:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[320px]'
                    : 'col-span-1 aspect-[16/10] sm:aspect-[4/3]'
                }`}
              >
                {/* Background Ambient Image */}
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out z-0 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mono-900 via-mono-900/85 to-mono-900/40 z-1 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">
                    {card.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-mono-300 line-clamp-2">
                    {card.description}
                  </p>
                  <Link
                    to={card.href}
                    className="group/btn mt-3 w-full py-2.5 px-4 min-h-[44px] bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 rounded-sm"
                  >
                    <span>{card.btnText}</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Quick Info Module: Opening Hours & Getting Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Box 1: Opening Hours with Live Status Beacon */}
            <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md flex flex-col gap-1.5 hover:border-border-strong transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-base font-bold text-text-primary">
                  Waktu operasional mall
                </h4>
                {/* Status operasional */}
                <span className={`text-xs font-semibold ${isOpenNow ? 'text-emerald-700' : 'text-text-muted'}`}>
                  {isOpenNow ? 'Buka sekarang' : 'Tutup sekarang'}
                </span>
              </div>
              <p className="text-sm font-semibold text-text-primary">
                08.00 – 18.00 WITA (Buka Setiap Hari)
              </p>
              {witaTime && (
                <span className="text-xs text-text-muted">
                  Waktu lokal WITA saat ini: <span className="font-mono font-medium text-text-secondary">{witaTime}</span>
                </span>
              )}
              <Link
                to="/panduan-kunjungan"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline mt-1 self-start"
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
                {/* Interactive Quick-Copy Button (Design Spell) */}
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary active:bg-surface-muted bg-canvas border border-border-subtle rounded-sm transition-all cursor-pointer"
                  title="Salin alamat lengkap untuk navigasi GPS / ojek online"
                >
                  {copiedAddress ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="text-text-muted" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm font-semibold text-text-primary">
                Jl. Letjen Suprapto, Balikpapan Barat 76131
              </p>
              <Link
                to="/panduan-kunjungan"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline mt-1 self-start"
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
