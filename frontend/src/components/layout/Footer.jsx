import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { Container } from './Container';
import { generateManagementWhatsAppLink } from '../../utils/whatsapp';
import { fetchSiteSettings } from '../../services/api';
import { useContent, useContentImage, useNavItems } from '../../hooks/useContent';

const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_FOOTER_NAV = [
  { id: 1, label: 'Direktori Kios Belanja', path: '/belanja', is_external: false },
  { id: 2, label: 'Sentra Kuliner Tradisional', path: '/kuliner', is_external: false },
  { id: 3, label: 'Agenda & Promo Plaza', path: '/agenda', is_external: false },
  { id: 4, label: 'Panduan Kunjungan Gedung', path: '/panduan-kunjungan', is_external: false },
  { id: 5, label: 'Kontak & Pengaduan', path: '/kontak', is_external: false },
];

export function Footer() {
  const [siteSettings, setSiteSettings] = useState(null);

  const mallDesc = useContent(
    'footer.mall_description',
    'Pusat perniagaan Plaza Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, batik, dan kuliner khas.'
  );
  const mgmtTitle = useContent('footer.management_title', 'Kantor Pengelola');
  const mgmtDesc = useContent(
    'footer.management_description',
    'Kantor manajemen berlokasi di Lantai Dasar (Pintu Timur). Melayani informasi kios, ketertiban, dan layanan pengunjung.'
  );
  const logoUrl = useContentImage('brand.logo', '/assets/main_logo_transparent_for_light_bg.webp');

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings()
      .then((settings) => {
        if (isMounted) setSiteSettings(settings);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const waLink = generateManagementWhatsAppLink(siteSettings?.management_whatsapp || '080000000000');
  const mallHours = siteSettings?.mall_opening_hours || '08.00 – 18.00 WITA';
  const mallAddress = siteSettings?.office_address || 'Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131';

  const footerNavItems = useNavItems('footer');
  const navItems = footerNavItems?.length > 0 ? footerNavItems : DEFAULT_FOOTER_NAV;

  return (
    <footer className="bg-surface-dark text-white border-t border-mono-800 mt-auto">
      {/* Main Footer Multi-Column Section */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Mall Identity */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="Logo Plaza Kebun Sayur"
                  className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase text-white">
                    Plaza Kebun Sayur
                  </h4>
                  <p className="text-xs text-mono-300">Balikpapan Barat</p>
                </div>
              </div>
              <p className="text-xs text-mono-300 leading-relaxed">
                {mallDesc}
              </p>
            </div>

            {/* Column 2: Direktori & Navigasi */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                Direktori & Layanan
              </h4>
              <nav className="flex flex-col gap-2.5 text-xs text-mono-200">
                {navItems.map((item) =>
                  item.is_external ? (
                    <a
                      key={item.id || item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.id || item.path}
                      to={item.path}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Column 3: Jam Buka & Akses Kunjungan */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                Waktu & Lokasi
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-mono-200">
                <li className="flex items-start gap-2.5">
                  <Clock size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Buka Setiap Hari</strong>
                    <span className="text-mono-300">{mallHours}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Alamat Gedung</strong>
                    <span className="text-mono-300 leading-relaxed block">
                      {mallAddress}
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/panduan-kunjungan"
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline mt-1"
                  >
                    <span>Panduan Kunjungan & Transportasi</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Pengelola & Hotline */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                {mgmtTitle}
              </h4>
              <p className="text-xs text-mono-300 leading-relaxed">
                {mgmtDesc}
              </p>

              <div className="flex flex-col gap-2.5 mt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider rounded-sm min-h-[44px] transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Pengelola</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-mono-800 bg-surface-dark text-mono-300 py-4 text-xs font-normal">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <span>
              © {CURRENT_YEAR} Plaza Kebun Sayur Balikpapan
            </span>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/kebijakan-privasi" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <span className="text-mono-500" aria-hidden="true">•</span>
              <Link to="/syarat-ketentuan" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
