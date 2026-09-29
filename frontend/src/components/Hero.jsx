import React from 'react'
import { Clock, MapPin, Store, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import Button from './Button'

export function Hero({ onExploreClick, onEnquiryClick }) {
  const pillars = [
    {
      title: 'BATU MULIA & PERHIASAN',
      tagline: 'Kecubung, Red Borneo, Emas & Perak',
      desc: 'Sentra ratusan pengrajin dan toko batu permata Kalimantan terpercaya sejak 1980-an.',
      badge: 'ZONA LANTAI DASAR',
    },
    {
      title: 'KERAJINAN ETNIK DAYAK',
      tagline: 'Mandau, Manik Kaltim & Kayu Ulin',
      desc: 'Cinderamata cagar budaya Dayak Kenyah & Paser langsung dari tangan para perajin lokal.',
      badge: 'ZONA LANTAI 1',
    },
    {
      title: 'BATIK & KULINER PESISIR',
      tagline: 'Batik Balikpapan, Amplang & Mantau',
      desc: 'Oleh-oleh panganan legendaris khas Balikpapan dan kain tenun tradisional nusantara.',
      badge: 'ZONA KULINER & F&B',
    },
  ]

  return (
    <div className="bg-mono-50">
      {/* Full-Bleed Grand Editorial Hero Banner (Yas Mall Style) */}
      <section className="relative min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-mono-900 text-white">
        {/* Real Architectural Photograph */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-90"
          style={{
            backgroundImage: `url('/assets/Photograph_of_plaza_building.webp')`,
          }}
        />
        
        {/* Deep Elegant Maroon Vignette (Authentic Plaza Kebun Sayur) */}
        <div className="absolute inset-0 bg-gradient-to-t from-mono-900 via-mono-900/75 to-mono-900/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-red-rich/20 to-mono-900/90 opacity-90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md border border-gold-accent/40 text-gold-accent text-[11px] font-bold tracking-widest uppercase">
            <span>IKON WISATA BELANJA & PERMATA NUSANTARA</span>
          </div>

          {/* Grand Condensed Uppercase Headline (Yas Mall Editorial Headline Style) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Pusat Cinderamata, Batu Mulia & Kerajinan{' '}
            <span className="text-gold-accent underline decoration-red decoration-4 underline-offset-8">
              Kalimantan Timur
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-mono-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Selamat datang di gerbang resmi <strong>Plaza Kebun Sayur Balikpapan</strong>. Jelajahi lebih dari 300 kios pedagang permata, kerajinan seni etnik Dayak, kain batik, dan kuliner khas pesisir.
          </p>

          {/* Yas Mall Style Crisp Rectangular Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onExploreClick}
              className="w-full sm:w-auto text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-3.5 border border-red-rich shadow-md"
            >
              <span>Jelajahi Direktori Toko</span>
              <ArrowRight size={16} />
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={onEnquiryClick}
              className="w-full sm:w-auto text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-3.5 bg-white text-mono-900 border-none hover:bg-gold-accent hover:text-white"
            >
              <span>Info Sewa Kios & Lahan</span>
            </Button>
          </div>

          {/* Location & Schedule Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-mono-300 text-xs tracking-wide">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-accent" />
              Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold-accent" />
              Buka Setiap Hari: 08.30 – 21.00 WITA
            </span>
          </div>

        </div>
      </section>

      {/* Yas Mall Style 3-Column Pillar Grid ("MORE THAN A MALL") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-12">
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              onClick={onExploreClick}
              className="bg-white border border-border hover:border-gold-accent shadow-card hover:shadow-card-elevated transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="p-6 space-y-2.5">
                <span className="text-[10px] font-bold text-red tracking-widest uppercase block">
                  {item.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-red transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-gold-accent">
                  {item.tagline}
                </p>
                <p className="text-xs text-text-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Dark Strip with Chevron (Identical to Yas Mall) */}
              <div className="bg-mono-900 group-hover:bg-red px-6 py-3 flex items-center justify-between transition-colors">
                <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                  Lihat Toko Terdaftar
                </span>
                <span className="text-white text-sm font-bold group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
