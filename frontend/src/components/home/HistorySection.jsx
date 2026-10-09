import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '../layout/Container';

export function HistorySection() {
  return (
    <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* History Description (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
              Pasar Inpres Kebun Sayur Balikpapan
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-prose font-normal">
              <p>
                Dikenal luas masyarakat sebagai <strong className="text-text-primary font-semibold">Pasar Inpres Kebun Sayur</strong>, kawasan ini bermula dari pasar tradisional pasca kemerdekaan sebelum diresmikan sebagai pusat cinderamata terpadu pada era 1980-an.
              </p>
              <p>
                Kini, Plaza Kebun Sayur menjadi pusat perdagangan cinderamata di Balikpapan Barat. Pengunjung dapat menemukan batu mulia seperti <em>Kecubung</em> dan <em>Red Borneo</em>, kerajinan Dayak, manik-manik etnik, serta kain tenun dan batik khas pesisir.
              </p>
              <p>
                Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.
              </p>
            </div>

            <div className="mt-2 p-5 bg-surface-subtle border border-border-subtle flex items-start gap-3.5">
              <ShieldCheck size={20} className="text-brand-primary shrink-0 mt-0.5" />
              <div className="text-xs text-text-secondary leading-relaxed">
                <span className="font-bold uppercase tracking-wider block text-text-primary mb-1">
                  Layanan Kios Batu Mulia & Kerajinan
                </span>
                Pedagang di lantai dasar menyediakan jasa ikat cincin perak dan pengujian batu permata. Anda dapat berkonsultasi langsung mengenai bahan dan asal-usul batu dengan pedagang di tempat.
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/panduan-kunjungan"
                className="group/guide inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-none"
              >
                <span>Pelajari Panduan Kunjungan Gedung</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover/guide:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Google Maps & Address (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Peta & Lokasi
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-text-primary">
              Akses Menuju Lokasi
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Berada strategis di Balikpapan Barat, berjarak sekitar 25 menit berkendara dari Bandara Internasional SAMS Sepinggan dan 10 menit dari Pelabuhan Semayang.
            </p>

            <div className="relative w-full aspect-[4/3] overflow-hidden border border-border-subtle bg-surface-muted group">
              <iframe
                title="Peta Lokasi Plaza Kebun Sayur Balikpapan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.852924403164!2d116.82035317496556!3d-1.2604603987275815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f0!3m3!1m2!1s0x2df147391a6d9d43%3A0xe510c4cce8f01b7a!2sPasar%20Inpres%20Kebun%20Sayur!5e0!3m2!1sid!2sid!4v1727700000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Quick Maps Action Badge */}
              <a
                href="https://maps.google.com/?q=Pasar+Inpres+Kebun+Sayur+Balikpapan"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-dark/90 hover:bg-brand-primary active:bg-brand-primary-pressed text-white text-xs font-bold uppercase tracking-wider rounded-none backdrop-blur-sm border border-white/20 transition-all shadow-subtle"
                title="Buka rute navigasi di Google Maps"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HistorySection;
