import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { Container } from './Container';
import { generateManagementWhatsAppLink } from '../../utils/whatsapp';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const waLink = generateManagementWhatsAppLink('081234567890');

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
                  src="/assets/main_logo_transparent_for_light_bg.webp"
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
                  <p className="text-xs text-mono-300">Pasar Inpres Balikpapan Barat</p>
                </div>
              </div>
              <p className="text-xs text-mono-300 leading-relaxed">
                Pusat perniagaan Pasar Inpres Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, batik, dan kuliner khas.
              </p>
            </div>

            {/* Column 2: Direktori Kios & Kuliner */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                Direktori Kios
              </h4>
              <nav className="flex flex-col gap-2.5 text-xs text-mono-200">
                <Link to="/belanja" className="hover:text-white transition-colors">
                  Batu Mulia & Akik Borneo
                </Link>
                <Link to="/belanja" className="hover:text-white transition-colors">
                  Perhiasan Emas & Perak
                </Link>
                <Link to="/belanja" className="hover:text-white transition-colors">
                  Kerajinan Tradisional Dayak
                </Link>
                <Link to="/belanja" className="hover:text-white transition-colors">
                  Batik & Kain Tenun
                </Link>
                <Link to="/kuliner" className="hover:text-white transition-colors">
                  Sentra Oleh-Oleh & Amplang
                </Link>
                <Link to="/kuliner" className="hover:text-white transition-colors">
                  Stan Soto Banjar & Nasi Kuning
                </Link>
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
                    <span className="text-mono-300">08.00 – 18.00 WITA</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Alamat Gedung</strong>
                    <span className="text-mono-300 leading-relaxed block">
                      Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131
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
                Kantor Pengelola
              </h4>
              <p className="text-xs text-mono-300 leading-relaxed">
                Kantor manajemen berlokasi di Lantai Dasar (Pintu Timur). Melayani informasi kios, ketertiban, dan layanan pengunjung.
              </p>

              <div className="flex flex-col gap-2.5 mt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider rounded-none min-h-[44px] transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Pengelola</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-mono-300">
                  <Phone size={13} className="text-mono-400 shrink-0" />
                  <span>Pos Keamanan: (0542) 734567</span>
                </div>
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
              © {CURRENT_YEAR} Plaza Kebun Sayur Balikpapan.
            </span>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/panduan-kunjungan" className="hover:text-white transition-colors">
                Panduan Kunjungan
              </Link>
              <span>•</span>
              <Link to="/kontak" className="hover:text-white transition-colors">
                Kontak Pengelola
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
