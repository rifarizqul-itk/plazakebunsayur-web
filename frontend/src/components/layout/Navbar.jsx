import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Container } from './Container';
import { generateManagementWhatsAppLink } from '../../utils/whatsapp';
import { useContent, useContentImage, useNavItems, useSiteSettings } from '../../hooks/useContent';

const DEFAULT_HEADER_NAV = [
  { id: 1, label: 'BERANDA', path: '/', is_external: false, is_cta: false },
  { id: 2, label: 'BELANJA', path: '/belanja', is_external: false, is_cta: false },
  { id: 3, label: 'INFORMASI', path: '/informasi', is_external: false, is_cta: false },
  { id: 4, label: 'PANDUAN', path: '/panduan-kunjungan', is_external: false, is_cta: false },
  { id: 5, label: 'KONTAK', path: '/kontak', is_external: false, is_cta: false },
];

function resolveItemPathAndLabel(item) {
  if (item.path === '/agenda') {
    const label = item.label === 'AGENDA' ? 'INFORMASI' : item.label;
    return { ...item, path: '/informasi', label };
  }
  return item;
}

function normalizeNavItems(rawItems) {
  return rawItems
    .filter((item) => item.path !== '/fashion' && item.path !== '/kuliner')
    .map(resolveItemPathAndLabel);
}

function DesktopNavItem({ item }) {
  const isCta = Boolean(item.is_cta);
  const classes = isCta
    ? 'inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-sm font-semibold text-xs xl:text-sm tracking-wide transition-colors shadow-subtle ml-2 whitespace-nowrap'
    : 'px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap';

  if (item.is_external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {item.label}
      </a>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        isCta
          ? classes
          : `${classes} ${isActive ? 'text-brand-primary' : 'text-text-primary hover:text-brand-primary'}`
      }
    >
      {item.label}
    </NavLink>
  );
}

function MobileNavItem({ item, onClose }) {
  const isCta = Boolean(item.is_cta);
  const classes = isCta
    ? 'inline-flex items-center justify-center w-full my-1.5 px-4 py-3 bg-brand-primary text-white font-bold text-sm tracking-wide rounded-sm hover:bg-brand-primary-hover active:bg-brand-primary-pressed transition-colors min-h-[44px]'
    : 'px-3 py-3 min-h-[44px] text-sm font-semibold tracking-wide rounded-sm flex items-center transition-colors text-white hover:bg-mono-800';

  if (item.is_external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={classes}
      >
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      className={({ isActive }) =>
        isCta
          ? classes
          : `${classes} ${isActive ? 'bg-mono-800 text-gold font-bold border-l-2 border-gold pl-2.5' : ''}`
      }
    >
      <span>{item.label}</span>
    </NavLink>
  );
}


function NavbarBrand({ logoUrl, brandName, brandSubLocation }) {
  return (
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
          {brandName}
        </span>
        <span className="text-[10px] sm:text-xs tracking-wider uppercase text-text-muted font-medium">
          {brandSubLocation}
        </span>
      </div>
    </Link>
  );
}

function DesktopCta({ waLink }) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-subtle"
        aria-label="Hubungi Kami"
      >
        <MessageCircle size={16} className="text-white" />
        <span>Hubungi Kami</span>
      </a>
    </div>
  );
}

function MobileActions({ waLink, mobileMenuOpen, setMobileMenuOpen }) {
  return (
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
  );
}

function MobileDrawer({
  navItems,
  waLink,
  onClose,
}) {
  return (
    <div className="lg:hidden border-b border-mono-800 bg-surface-dark text-white px-4 pt-4 pb-6 flex flex-col gap-2 shadow-card animate-fadeIn">
      {navItems.map((item) => (
        <MobileNavItem
          key={item.id || item.path}
          item={item}
          onClose={onClose}
        />
      ))}

      <div className="pt-3 border-t border-mono-800 mt-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-1.5 min-h-[38px] text-xs font-bold uppercase tracking-wider text-white bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-lg"
        >
          <MessageCircle size={16} className="text-white" />
          <span>Hubungi Kami</span>
        </a>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const siteSettings = useSiteSettings();
  const waNumber = siteSettings?.management_whatsapp || '080000000000';
  const logoUrl = useContentImage('brand.logo', '/assets/main_logo_transparent_for_light_bg.webp');
  const brandName = useContent('brand.name', 'PLAZA KEBUN SAYUR');
  const brandSubLocation = useContent('brand.sub_location', 'Balikpapan Barat');
  const waLink = generateManagementWhatsAppLink(waNumber);
  const headerNavItems = useNavItems('header');

  const rawNavItems = headerNavItems?.length > 0 ? headerNavItems : DEFAULT_HEADER_NAV;
  const navItems = normalizeNavItems(rawNavItems);

  return (
    <header className="sticky top-0 z-50 bg-canvas transition-colors shadow-sm">
      <div className="relative border-b border-border-subtle bg-canvas">
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavbarBrand
              logoUrl={logoUrl}
              brandName={brandName}
              brandSubLocation={brandSubLocation}
            />

            <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigasi Utama">
              {navItems.map((item) => (
                <DesktopNavItem key={item.id || item.path} item={item} />
              ))}
            </nav>

            <DesktopCta waLink={waLink} />

            <MobileActions
              waLink={waLink}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </Container>
      </div>

      {mobileMenuOpen && (
        <MobileDrawer
          navItems={navItems}
          waLink={waLink}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
