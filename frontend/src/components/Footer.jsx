import React from 'react'
import { MapPin, Phone, Clock, MessageCircle, Heart, Globe, Share2 } from 'lucide-react'

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/main_logo_transparent_for_light_bg.webp" 
                alt="Logo Plaza Kebun Sayur" 
                className="h-8 w-auto bg-white/90 p-0.5 rounded"
              />
              <span className="font-bold text-base text-white tracking-tight">
                Plaza Kebun Sayur
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Sentra perhiasan emas, batu mulia Kalimantan, kerajinan ukir Dayak, kain batik etnik, dan ragam kuliner tradisional khas nusantara di Balikpapan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('direktori')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Direktori Toko & Kios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('fasilitas')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fasilitas Gedung
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sewa')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sewa Kios & Lahan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tentang')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang & Lokasi
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Informasi Operasional
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Clock size={14} className="text-slate-300 shrink-0" />
                <span>Buka Setiap Hari: 08.30 – 21.00 WITA</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-300 shrink-0" />
                <span>Jl. Letjen Suprapto, Balikpapan Barat</span>
              </p>
              <div className="pt-1">
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-medium"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Pengelola Gedung</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Plaza Kebun Sayur Balikpapan.</p>
          <p className="text-slate-400">
            Pusat Cagar Belanja & Seni Budaya Kalimantan Timur
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
