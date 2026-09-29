import React, { useState } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import Button from './Button'

export function Navbar({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'direktori', label: 'Direktori Toko' },
    { id: 'fasilitas', label: 'Fasilitas' },
    { id: 'sewa', label: 'Sewa Kios (Space Enquiry)' },
    { id: 'tentang', label: 'Tentang & Sejarah' },
  ]

  const handleLinkClick = (id) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-subtle transition-all">
      {/* Yas Mall Style Top Utility Bar */}
      <div className="bg-mono-900 text-mono-100 text-[11px] font-medium tracking-wide py-2 px-4 sm:px-8 border-b border-mono-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-mono-300">
            <span className="hidden sm:inline">Buka Tiap Hari: 08.30 – 21.00 WITA</span>
            <span className="hidden md:inline">•</span>
            <span>Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold-accent hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <MessageCircle size={13} />
              <span>Hotline Pengelola</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleLinkClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img 
              src="/assets/main_logo_transparent_for_light_bg.webp" 
              alt="Plaza Kebun Sayur" 
              className="h-11 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-red">
                PLAZA KEBUN SAYUR
              </span>
              <span className="text-[10px] font-bold text-gold-accent tracking-widest uppercase -mt-0.5">
                BALIKPAPAN • KALIMANTAN TIMUR
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Yas Mall uppercase tracked style) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer py-1 relative ${
                  activeSection === link.id
                    ? 'text-red'
                    : 'text-text hover:text-red'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Clean Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleLinkClick('sewa')}
              className="text-xs"
            >
              <span>Info Sewa Kios</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text hover:bg-mono-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-border shadow-card-elevated animate-in slide-in-from-top-4 duration-200">
          <div className="px-5 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  activeSection === link.id
                    ? 'bg-red-50 text-red border-l-4 border-red'
                    : 'text-text hover:bg-mono-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-border mt-3">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="whatsapp" fullWidth className="gap-2">
                  <MessageCircle size={18} />
                  <span>Hubungi Hotline Pengelola</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
