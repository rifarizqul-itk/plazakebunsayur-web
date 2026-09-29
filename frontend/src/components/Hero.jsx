import React from 'react'
import { Clock, MapPin, Store, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import Button from './Button'

export function Hero({ onExploreClick, onEnquiryClick }) {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-mono-900 text-white">
      {/* Background Photograph with Elegant Vignette & Maroon Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/assets/Photograph_of_plaza_building.webp')`,
        }}
      />
      
      {/* Deep Maroon & Charcoal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D0D]/95 via-[#4E0E0E]/85 to-[#1A0D0D]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-accent/15 via-transparent to-transparent opacity-60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Badges / Micro Labels */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-accent/20 border border-gold-accent text-gold-accent backdrop-blur-md">
                <Sparkles size={14} className="text-gold-accent" />
                Ikon Wisata Belanja Balikpapan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-mono-100 backdrop-blur-md">
                <Clock size={14} />
                Buka Tiap Hari: 08.30 – 21.00 WITA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Pusat Perhiasan, Permata, & Cinderamata{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent via-[#F4D06F] to-gold-accent">
                Kalimantan Timur
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-mono-200 max-w-2xl leading-relaxed font-normal">
              Selamat datang di website resmi <strong>Plaza Kebun Sayur</strong>. Temukan ribuan koleksi batu akik Kalimantan, kerajinan seni khas Dayak, kain batik etnik, hingga kuliner tradisional langsung dari pedagang lokal terpercaya.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button 
                variant="gold" 
                size="lg" 
                onClick={onExploreClick}
                className="w-full sm:w-auto gap-2 text-mono-900 font-bold"
              >
                <span>Jelajahi Direktori Toko</span>
                <ArrowRight size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onEnquiryClick}
                className="w-full sm:w-auto border-mono-200 text-mono-100 hover:bg-white/10"
              >
                <span>Informasi Sewa Kios / Pameran</span>
              </Button>
            </div>

            {/* Quick Highlights / Trust stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold-accent">300+</p>
                <p className="text-xs text-mono-300 font-medium">Kios & Toko Aktif</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">3 Lantai</p>
                <p className="text-xs text-mono-300 font-medium">Zona Belanja Terpadu</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold-accent">1980-an</p>
                <p className="text-xs text-mono-300 font-medium">Warisan Wisata Kaltim</p>
              </div>
            </div>

          </div>

          {/* Right Card / Fast Info Card */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl text-left space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-rich/80 text-gold-accent">
                  <Store size={26} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Komoditas Legendaris</h3>
                  <p className="text-xs text-mono-300">Paling dicari wisatawan IKN</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-mono-100">
                <li className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span>Batu Akik Red Borneo & Kecubung Asli</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span>Perhiasan Emas & Perak Custom</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span>Mandau Dayak, Manik, & Kayu Ulin</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span>Batik Balikpapan & Tenun Samarinda</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span>Amplang Kuku Macan & Mantau Sapi</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-mono-300">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-gold-accent" />
                  Jl. Letjen Suprapto, Balikpapan
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
