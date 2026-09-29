import React from 'react'
import { Clock, MapPin, Store, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import Button from './Button'

export function Hero({ onExploreClick, onEnquiryClick }) {
  return (
    <section className="relative bg-white pt-16 pb-20 border-b border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
          <Sparkles size={13} className="text-amber-600" />
          <span>Sentra Cinderamata & Batu Mulia Balikpapan</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Eksplorasi Warisan Belanja Nusantara di{' '}
          <span className="text-brand">Plaza Kebun Sayur</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Temukan koleksi batu akik Kalimantan, kerajinan etnik Dayak, kain batik tradisional, dan kuliner khas langsung dari pedagang lokal terpercaya.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={onExploreClick}
            className="w-full sm:w-auto gap-2 text-sm font-semibold"
          >
            <span>Cari Toko & Kios</span>
            <ArrowRight size={16} />
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={onEnquiryClick}
            className="w-full sm:w-auto text-sm font-medium"
          >
            <span>Informasi Sewa Kios</span>
          </Button>
        </div>

        {/* Minimalist Stats & Meta */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-600 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-base sm:text-lg">300+</span>
            <span className="text-slate-500">Kios Aktif</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:inline" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-base sm:text-lg">3 Lantai</span>
            <span className="text-slate-500">Zona Belanja</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:inline" />
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-slate-400" />
            <span className="text-slate-700 font-medium">Buka Tiap Hari: 08.30 – 21.00 WITA</span>
          </div>
        </div>

      </div>

      {/* Featured Photo Frame - Elegant & Minimal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-card aspect-21/9 bg-slate-100">
          <img 
            src="/assets/Photograph_of_plaza_building.webp" 
            alt="Gedung Plaza Kebun Sayur Balikpapan" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
            <span className="flex items-center gap-1.5 font-medium drop-shadow-sm">
              <MapPin size={14} />
              Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat
            </span>
            <span className="hidden sm:inline bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/20">
              Gedung Resmi Plaza Kebun Sayur
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
