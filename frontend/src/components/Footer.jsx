import React from 'react'
import { MapPin, Phone, Clock, MessageCircle, Heart, Globe, Share2 } from 'lucide-react'

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#140808] text-neutral-300 border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/main_logo_transparent_for_light_bg.webp" 
                alt="Logo Plaza Kebun Sayur" 
                className="h-9 w-auto bg-white/95 p-1 rounded-sm shadow-sm"
              />
              <div>
                <span className="font-extrabold text-base text-white tracking-wider uppercase block font-serif">
                  PLAZA KEBUN SAYUR
                </span>
                <span className="text-[10px] text-bunsay-gold tracking-[0.2em] uppercase font-semibold">
                  Balikpapan • Kalimantan Timur
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-normal">
              Pusat perhiasan emas, batu akik mulia Kalimantan, kerajinan ukir etnik Dayak, kain batik nusantara, dan ragam kuliner khas pesisir Balikpapan sejak 1980-an.
            </p>

            <div className="pt-2">
              <span className="inline-block text-[10px] uppercase tracking-widest text-bunsay-gold border border-bunsay-gold/30 bg-bunsay-gold/10 px-2.5 py-1">
                Destinasi Wisata Belanja Resmi Balikpapan
              </span>
            </div>
          </div>

          {/* Quick Links with Yas Mall Style Tracking */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold text-bunsay-gold uppercase tracking-[0.25em]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')} 
                  className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] hover:translate-x-1 inline-block transition-transform"
                >
                  › Beranda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('direktori')} 
                  className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] hover:translate-x-1 inline-block transition-transform"
                >
                  › Direktori Toko & Kios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('fasilitas')} 
                  className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] hover:translate-x-1 inline-block transition-transform"
                >
                  › Fasilitas Gedung
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sewa')} 
                  className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] hover:translate-x-1 inline-block transition-transform"
                >
                  › Sewa Kios & Lahan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tentang')} 
                  className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] hover:translate-x-1 inline-block transition-transform"
                >
                  › Sejarah & Lokasi Peta
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold text-bunsay-gold uppercase tracking-[0.25em]">
              Informasi Operasional
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <p className="flex items-start gap-2">
                <Clock size={15} className="text-bunsay-gold shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Buka Setiap Hari:</strong>
                  08.30 – 21.00 WITA
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-bunsay-gold shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Alamat:</strong>
                  Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat, 76131
                </span>
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Pengelola Gedung</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <p>© {new Date().getFullYear()} Plaza Kebun Sayur Balikpapan. Hak cipta dilindungi undang-undang.</p>
          <p className="text-neutral-400 text-[11px] uppercase tracking-wider">
            Ikon Cagar Budaya & Wisata Belanja Kalimantan Timur
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
