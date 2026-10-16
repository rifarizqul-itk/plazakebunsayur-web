import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MessageCircle } from 'lucide-react';
import { Container } from './Container';
import { generateManagementWhatsAppLink } from '../../utils/whatsapp';
import { fetchSiteSettings } from '../../services/api';
import { useContentImage, useNavItems } from '../../hooks/useContent';

const DEFAULT_HEADER_NAV = [
  { id: 1, label: 'BERANDA', path: '/', is_external: false },
  { id: 2, label: 'BELANJA', path: '/belanja', is_external: false },
  { id: 3, label: 'KULINER', path: '/kuliner', is_external: false },
  { id: 4, label: 'AGENDA', path: '/agenda', is_external: false },
  { id: 5, label: 'PANDUAN', path: '/panduan-kunjungan', is_external: false },
  { id: 6, label: 'KONTAK', path: '/kontak', is_external: false },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchNavInput, setSearchNavInput] = useState('');
  const [waNumber, setWaNumber] = useState('080000000000');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const logoUrl = useContentImage('brand.logo', '/assets/main_logo_transparent_for_light_bg.webp');
  const waLink = generateManagementWhatsAppLink(waNumber);
  const headerNavItems = useNavItems('header');
  const navItems = headerNavItems?.length > 0 ? headerNavItems : DEFAULT_HEADER_NAV;

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings()
      .then((settings) => {
        if (isMounted && settings?.management_whatsapp) {
          setWaNumber(settings.management_whatsapp);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

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
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-canvas transition-colors shadow-sm">
      {/* Main Navigation Bar */}
      <div className="relative border-b border-border-subtle bg-canvas">
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo & Mall Title */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm p-1 shrink-0"
            >
              <img
                src={logoUrl}
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

            {/* Desktop Navigation Links (Flat Navigation) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-3 2xl:gap-5 h-full" aria-label="Navigasi Utama">
              {navItems.map((item) =>
                item.is_external ? (
                  <a
                    key={item.id || item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap text-text-primary hover:text-brand-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    key={item.id || item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                        isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-text-primary bg-surface-subtle hover:bg-surface-muted hover:border-brand-primary border border-border-subtle rounded-sm transition-colors min-h-[44px] whitespace-nowrap shrink-0"
              >
                <MessageCircle size={14} className="text-whatsapp" />
                <span>Hotline Pengelola</span>
              </a>
            </div>

            {/* Mobile Actions: Hotline WhatsApp & Hamburger Button */}
            <div className="flex lg:hidden items-center gap-1">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-sm text-whatsapp hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="WhatsApp Hotline Pengelola"
                title="WhatsApp Hotline Pengelola"
              >
                <MessageCircle size={22} />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-sm text-text-primary hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
                aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
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

          {navItems.map((item) =>
            item.is_external ? (
              <a
                key={item.id || item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.id || item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white hover:bg-mono-800 rounded-sm flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.path === '/belanja' && (
                  <span className="text-xs font-normal text-mono-400">5 Kategori</span>
                )}
                {item.path === '/kuliner' && (
                  <span className="text-xs font-normal text-mono-400">3 Kategori</span>
                )}
              </NavLink>
            )
          )}

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
