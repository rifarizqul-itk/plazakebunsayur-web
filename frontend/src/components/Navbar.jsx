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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs transition-all">
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
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-red">
                PLAZA KEBUN SAYUR
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-gold-accent uppercase -mt-1">
                Pusat Batu Mulia & Kerajinan Kaltim
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer py-1 relative ${
                  activeSection === link.id
                    ? 'text-red font-bold'
                    : 'text-text hover:text-red'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA & Hotline */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur,%20saya%20ingin%20bertanya%20informasi%20mall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm" className="gap-2">
                <MessageCircle size={16} />
                <span>Hotline Pengelola</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text hover:bg-mono-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
