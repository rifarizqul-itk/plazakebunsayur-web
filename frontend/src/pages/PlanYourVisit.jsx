import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Car, Plane, Anchor, ChevronRight } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { fetchFacilities } from '../services/api';

export function PlanYourVisit() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    async function loadFacs() {
      try {
        const data = await fetchFacilities();
        if (!isCancelled) setFacilities(data);
      } catch (err) {
        console.error('Failed to load facilities:', err);
      }
    }
    loadFacs();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Breadcrumbs */}
      <div className="bg-surface-subtle border-b border-border-subtle py-3 text-xs text-text-muted">
        <Container>
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} />
            <span className="text-text-primary font-semibold">Panduan Kunjungan</span>
          </div>
        </Container>
      </div>

      {/* 2. Architectural Facade Hero Banner */}
      <section className="relative w-full aspect-[21/9] sm:aspect-[24/8] min-h-[260px] max-h-[380px] bg-mono-900 overflow-hidden flex items-end">
        <img
          src="/assets/Photograph_of_plaza_building.webp"
          alt="Gedung Plaza Kebun Sayur"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mono-900 via-mono-900/60 to-transparent" />
        <Container className="relative z-10 pb-8 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-mono-200 block mb-1">
            Panduan & Informasi Gedung
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
            Rencanakan Kunjungan Anda
          </h1>
          <p className="text-xs sm:text-sm text-mono-200 max-w-2xl mt-1 leading-relaxed">
            Panduan terpadu jam operasional, rute transportasi dari bandara dan pelabuhan, tata tertib, serta fasilitas umum di Plaza Kebun Sayur Balikpapan.
          </p>
        </Container>
      </section>

      {/* 3. Main Guide Content */}
      <section className="py-12 sm:py-16 flex-1">
        <Container>
          <div className="flex flex-col gap-14 max-w-5xl mx-auto">
            {/* Jam Operasional & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle flex flex-col gap-3">
                <h2 className="text-lg font-bold text-text-primary">
                  Waktu operasional mall
                </h2>
                <div className="text-sm text-text-secondary leading-relaxed space-y-1">
                  <p><strong className="text-text-primary font-semibold">Buka Setiap Hari:</strong> 08.00 – 18.00 WITA</p>
                  <p><strong className="text-text-primary font-semibold">Waktu Kunjungan Optimal:</strong> 10.00 – 16.00 WITA</p>
                  <p className="text-xs text-text-muted pt-2 leading-relaxed">
                    Kios pengrajin batu mulia dan perhiasan emas beroperasi penuh mulai pukul 09.00 WITA. Stan kuliner mulai buka pukul 08.00 WITA.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle flex flex-col gap-3">
                <h2 className="text-lg font-bold text-text-primary">
                  Alamat dan titik lokasi
                </h2>
                <div className="text-sm text-text-secondary leading-relaxed space-y-1">
                  <p><strong className="text-text-primary font-semibold">Lokasi:</strong> Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131.</p>
                  <p><strong className="text-text-primary font-semibold">Patokan:</strong> Berada di seberang Polsek Balikpapan Barat dan persimpangan Kampung Baru.</p>
                </div>
              </div>
            </div>

            {/* Rute Transportasi */}
            <div className="flex flex-col gap-6">
              <div className="border-b border-border-subtle pb-3">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
                  Panduan menuju Plaza Kebun Sayur
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-border-subtle bg-canvas flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-text-primary font-bold text-sm uppercase tracking-wide">
                    <Plane size={18} className="text-brand-primary" />
                    <span>Dari Bandara Sepinggan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Jarak tempuh sekitar 15 km (25–35 menit). Dapat diakses via taksi bandara atau transportasi online via koridor Jl. Marsma Iswahyudi.
                  </p>
                </div>

                <div className="p-6 border border-border-subtle bg-canvas flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-text-primary font-bold text-sm uppercase tracking-wide">
                    <Anchor size={18} className="text-brand-primary" />
                    <span>Dari Pelabuhan Semayang</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Jarak dekat sekitar 4 km (8–12 menit berkendara). Melintasi koridor Jl. Yos Sudarso dan Jl. Minyak langsung menuju pintu mall.
                  </p>
                </div>

                <div className="p-6 border border-border-subtle bg-canvas flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-text-primary font-bold text-sm uppercase tracking-wide">
                    <Car size={18} className="text-brand-primary" />
                    <span>Transportasi Kota</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Angkutan kota trayek No. 1 (Putih) dan No. 2A melintas tepat di depan halte gerbang timur Plaza Kebun Sayur.
                  </p>
                </div>
              </div>
            </div>

            {/* Fasilitas Gedung Services Grid */}
            <div className="flex flex-col gap-6">
              <div className="border-b border-border-subtle pb-3">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
                  Fasilitas gedung
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((fac) => (
                  <div
                    key={fac.id}
                    className="p-6 bg-surface-subtle border border-border-subtle hover:border-border-strong flex flex-col gap-3 transition-colors"
                  >
                    <div className="text-text-primary font-bold text-sm uppercase tracking-tight">
                      <span>{fac.name}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Lokasi: {fac.location_note}
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Belanja Cerdas */}
            <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center gap-2.5 text-text-primary font-bold text-base uppercase tracking-wider">
                <Compass size={20} className="text-brand-primary" />
                <span>Tips Berbelanja Cerdas di Plaza Kebun Sayur</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-text-primary font-semibold">Tawar-Menawar Bersahabat:</strong> Tradisi pasar cinderamata mengedepankan keramahan. Diskusikan harga terbaik secara santun dengan pedagang.
                </li>
                <li>
                  <strong className="text-text-primary font-semibold">Uji Keaslian Permata:</strong> Pedagang siap mendemonstrasikan keaslian batu akik dengan senter kristal dan alat pengujian lab standar.
                </li>
                <li>
                  <strong className="text-text-primary font-semibold">Jasa Ikat Cincin Cepat:</strong> Kios di lantai dasar menyediakan jasa ikat cangkang perak atau titanium dalam waktu 15–30 menit.
                </li>
                <li>
                  <strong className="text-text-primary font-semibold">Kemasan Oleh-Oleh Penerbangan:</strong> Untuk panganan seperti amplang atau mantau, mintalah kemasan dus khusus yang aman untuk bagasi kabin pesawat.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default PlanYourVisit;
