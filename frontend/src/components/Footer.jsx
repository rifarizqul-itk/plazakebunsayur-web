import React from 'react'
import { MapPin, Phone, Clock, MessageCircle, Heart, Globe, Share2 } from 'lucide-react'

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-mono-900 text-mono-200 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/main_logo_transparent_for_light_bg.webp" 
                alt="Logo Plaza Kebun Sayur" 
                className="h-10 w-auto bg-white/90 p-1 rounded-lg"
              />
              <div>
                <span className="font-extrabold text-lg text-white block tracking-tight">
                  PLAZA KEBUN SAYUR
                </span>
                <span className="text-[11px] font-semibold text-gold-accent tracking-wider block">
                  BALIKPAPAN • KALIMANTAN TIMUR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-mono-300 leading-relaxed">
              Sentra perhiasan emas, batu mulia Kalimantan, kerajinan ukir Dayak Kenyah, kain batik etnik, dan ragam kuliner khas nusantara terlengkap di Balikpapan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')} 
                  className="hover:text-gold-accent transition-colors cursor-pointer"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('direktori')} 
                  className="hover:text-gold-accent transition-colors cursor-pointer"
                >
                  Direktori Toko & Kios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('fasilitas')} 
                  className="hover:text-gold-accent transition-colors cursor-pointer"
                >
                  Fasilitas Gedung
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sewa')} 
                  className="hover:text-gold-accent transition-colors cursor-pointer"
                >
                  Sewa Kios & Lahan (Space Enquiry)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tentang')} 
                  className="hover:text-gold-accent transition-colors cursor-pointer"
                >
                  Sejarah & Profil Pasar
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Management */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Jam Operasional
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-mono-300">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-gold-accent shrink-0" />
                <span>Buka Setiap Hari: 08.30 – 21.00 WITA</span>
              </p>
              <div className="pt-2">
                <span className="text-white font-bold block text-xs">Dikelola Oleh:</span>
                <span className="text-mono-300 text-xs">Pengelola Gedung Plaza Kebun Sayur & Paguyuban Pedagang Pasar Inpres Balikpapan</span>
              </div>
            </div>
          </div>

          {/* Contact / Social Media */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hubungi Kami
            </h4>
            <div className="space-y-2 text-xs text-mono-300">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gold-accent shrink-0" />
                <span>Balikpapan Barat</span>
              </p>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:underline"
              >
                <MessageCircle size={16} className="shrink-0" />
                <span>WhatsApp Pengelola</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-mono-400 gap-4">
          <p>© {new Date().getFullYear()} Plaza Kebun Sayur Balikpapan. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan rasa bangga untuk memajukan UMKM Kalimantan Timur
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
