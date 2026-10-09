import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ArrowRight, MessageCircle } from 'lucide-react';
import { Container } from './Container';
import { generateManagementWhatsAppLink } from '../../utils/whatsapp';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'belanja' | 'kuliner' | null
  const [searchNavInput, setSearchNavInput] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const waLink = generateManagementWhatsAppLink('081234567890');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable;
      if (!isInput && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchNavInput.trim()) {
      navigate(`/belanja?q=${encodeURIComponent(searchNavInput.trim())}`);
      setSearchNavInput('');
      setActiveDropdown(null);
    }
  };

  const retailCategories = [
    { name: 'Batu Mulia & Akik', desc: 'Permata, Red Borneo, Kecubung, Ikat Cincin' },
    { name: 'Perhiasan Emas & Perak', desc: 'Toko Emas Kadar Resmi, Perak Bakar 925' },
    { name: 'Kerajinan Dayak & Souvenir', desc: 'Mandau Asli, Rompi Manik Kenyah, Kayu Ulin' },
    { name: 'Batik & Songket Kaltim', desc: 'Batik Mangrove, Sarung Tenun Samarinda' },
    { name: 'Cinderamata & Aksesoris', desc: 'Miniatur Rumah Betang, Kaos Balikpapan' },
  ];

  const culinaryCategories = [
    { name: 'Oleh-Oleh Khas Kaltim', desc: 'Amplang Kuku Macan, Mantau Sapi, Lempok Durian' },
    { name: 'Makanan Berat & Soto', desc: 'Soto Banjar H. Ridwan, Nasi Kuning Habang' },
    { name: 'Kudapan & Minuman Tradisional', desc: 'Bingka Kentang Bakar, Es Kelapa, Kopi Paser' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-canvas transition-colors shadow-sm">
      {/* Main Navigation Bar */}
      <div className="relative border-b border-border-subtle bg-canvas">
        <Container>
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Logo & Mall Title */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm p-1 shrink-0"
            >
              <img
                src="/assets/main_logo_transparent_for_light_bg.webp"
                alt="Logo Plaza Kebun Sayur"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight text-text-primary group-hover:text-brand-primary transition-colors whitespace-nowrap">
                  PLAZA KEBUN SAYUR
                </span>
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold whitespace-nowrap">
                  Pasar Inpres Balikpapan
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Mega Menu Triggers */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-3 2xl:gap-5 h-full" aria-label="Navigasi Utama">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'
                  }`
                }
              >
                BERANDA
              </NavLink>

              {/* Belanja Dropdown Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDropdown('belanja')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to="/belanja"
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                      isActive || activeDropdown === 'belanja'
                        ? 'text-brand-primary'
                        : 'text-text-primary hover:text-brand-primary'
                    }`
                  }
                >
                  <span>BELANJA</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'belanja' ? 'rotate-180' : ''}`} />
                </NavLink>

                {/* Dark Mega Menu */}
                {activeDropdown === 'belanja' && (
                  <div className="fixed left-0 right-0 top-20 sm:top-22 w-full bg-surface-dark text-white border-y border-mono-800 shadow-2xl z-50 animate-fadeIn">
                    <Container>
                      <div className="py-8">
                        <div className="flex items-center justify-between border-b border-mono-800 pb-4 mb-6">
                          <div>
                            <h3 className="text-lg font-bold tracking-wider text-white uppercase">
                              Sentra Kios Belanja & Cinderamata
                            </h3>
                            <p className="text-xs text-mono-300 mt-0.5">
                              Pusat perhiasan, batu mulia Kalimantan, kerajinan Dayak, dan kain tenun.
                            </p>
                          </div>
                          <Link
                            to="/belanja"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-surface-dark text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
                          >
                            <span>Lihat Semua Kios Belanja</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                          {retailCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={`/belanja`}
                              onClick={() => setActiveDropdown(null)}
                              className="group block p-3 rounded-sm hover:bg-mono-800 border border-transparent hover:border-mono-700 transition-all"
                            >
                              <strong className="block text-sm text-mono-100 group-hover:text-gold transition-colors font-semibold">
                                {cat.name}
                              </strong>
                              <span className="block text-xs text-mono-300 mt-1 leading-relaxed">
                                {cat.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Container>
                  </div>
                )}
              </div>

              {/* Kuliner Dropdown Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDropdown('kuliner')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to="/kuliner"
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                      isActive || activeDropdown === 'kuliner'
                        ? 'text-brand-primary'
                        : 'text-text-primary hover:text-brand-primary'
                    }`
                  }
                >
                  <span>KULINER</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'kuliner' ? 'rotate-180' : ''}`} />
                </NavLink>

                {/* Dark Mega Menu for Culinary */}
                {activeDropdown === 'kuliner' && (
                  <div className="fixed left-0 right-0 top-20 sm:top-22 w-full bg-surface-dark text-white border-y border-mono-800 shadow-2xl z-50 animate-fadeIn">
                    <Container>
                      <div className="py-8">
                        <div className="flex items-center justify-between border-b border-mono-800 pb-4 mb-6">
                          <div>
                            <h3 className="text-lg font-bold tracking-wider text-white uppercase">
                              Sentra Kuliner Khas Banjar & Kaltim
                            </h3>
                            <p className="text-xs text-mono-300 mt-0.5">
                              Amplang renyah, soto banjar, nasi kuning habang, dan bingka bakar.
                            </p>
                          </div>
                          <Link
                            to="/kuliner"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-surface-dark text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
                          >
                            <span>Lihat Semua Stan Kuliner</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {culinaryCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={`/kuliner`}
                              onClick={() => setActiveDropdown(null)}
                              className="group block p-4 rounded-sm hover:bg-mono-800 border border-transparent hover:border-mono-700 transition-all"
                            >
                              <strong className="block text-sm text-mono-100 group-hover:text-gold transition-colors font-semibold">
                                {cat.name}
                              </strong>
                              <span className="block text-xs text-mono-300 mt-1 leading-relaxed">
                                {cat.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Container>
                  </div>
                )}
              </div>

              <NavLink
                to="/agenda"
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'
                  }`
                }
              >
                AGENDA
              </NavLink>

              <NavLink
                to="/panduan-kunjungan"
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'
                  }`
                }
              >
                PANDUAN
              </NavLink>

              <NavLink
                to="/kontak"
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'
                  }`
                }
              >
                KONTAK
              </NavLink>
            </nav>

            {/* Desktop Right Search Field & Hotline Pengelola */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Cari kios / produk..."
                  value={searchNavInput}
                  onChange={(e) => setSearchNavInput(e.target.value)}
                  className="w-24 focus:w-44 xl:w-36 2xl:w-48 py-1.5 pl-2 pr-11 text-xs border-b border-border-strong bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all duration-200 rounded-sm"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd
                    aria-hidden="true"
                    className="hidden xl:inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-mono font-semibold text-text-muted bg-surface-muted border border-border-subtle rounded-sm select-none pointer-events-none"
                    title="Tekan / untuk fokus pencarian"
                  >
                    /
                  </kbd>
                  <button
                    type="submit"
                    aria-label="Cari Kios"
                    className="p-1 text-text-primary hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    <Search size={14} />
                  </button>
                </div>
              </form>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-text-primary bg-surface-subtle hover:bg-surface-muted hover:border-brand-primary border border-border-subtle rounded-sm transition-colors min-h-[40px] whitespace-nowrap shrink-0"
              >
                <MessageCircle size={14} className="text-whatsapp transition-transform duration-200 group-hover/wa:scale-115 group-hover/wa:-rotate-12" />
                <span>Hotline Pengelola</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-sm text-text-primary hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </div>

      {/* 3. Mobile Navigation Drawer (surface-dark per DESIGN.md) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-mono-800 bg-surface-dark text-white px-4 pt-4 pb-6 flex flex-col gap-2 shadow-card animate-fadeIn">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Cari nama kios atau produk..."
              value={searchNavInput}
              onChange={(e) => setSearchNavInput(e.target.value)}
              className="w-full py-2.5 pl-3 pr-9 min-h-[44px] text-xs border border-mono-700 rounded-sm bg-mono-900 text-white placeholder:text-mono-400 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mono-400 hover:text-gold"
            >
              <Search size={16} />
            </button>
          </form>

          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center"
          >
            BERANDA
          </NavLink>

          <NavLink
            to="/belanja"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center justify-between"
          >
            <span>DIREKTORI BELANJA</span>
            <span className="text-xs font-normal text-mono-400">5 Kategori</span>
          </NavLink>

          <NavLink
            to="/kuliner"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center justify-between"
          >
            <span>SENTRA KULINER</span>
            <span className="text-xs font-normal text-mono-400">3 Kategori</span>
          </NavLink>

          <NavLink
            to="/agenda"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center"
          >
            AGENDA & PROMO
          </NavLink>

          <NavLink
            to="/panduan-kunjungan"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center"
          >
            PANDUAN KUNJUNGAN
          </NavLink>

          <NavLink
            to="/kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center"
          >
            KONTAK RESMI
          </NavLink>

          <div className="pt-3 border-t border-mono-800 mt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-sm min-h-[44px]"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Hotline Pengelola</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
