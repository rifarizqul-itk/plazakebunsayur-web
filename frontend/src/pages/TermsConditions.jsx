import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchLegalPage } from '../services/api';
import { useContent, useSiteSettings } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { formatDate } from '../utils/date';

function TermsFallbackSections() {
  return (
    <>
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          1. Penerimaan Ketentuan
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Selamat datang di situs resmi Plaza Kebun Sayur (<a href="https://plazakebunsayur.com" className="text-brand-primary hover:underline">plazakebunsayur.com</a>). Dengan mengakses, menjelajahi, atau memanfaatkan fitur direktori pada situs ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh seluruh Syarat & Ketentuan Penggunaan ini.
          </p>
          <p>
            Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak melanjutkan penggunaan situs ini.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          2. Ruang Lingkup Layanan Situs
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Situs web ini disediakan oleh Pengelola Plaza Kebun Sayur sebagai sarana informasi publik dan direktori komersial yang memuat:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Daftar profil kios, jenis komoditas, lokasi nomor unit lantai, dan kontak resmi pedagang.</li>
            <li>Jadwal operasional mall, rute transportasi, dan fasilitas umum gedung.</li>
            <li>Agenda kegiatan kebudayaan, pameran batu mulia, pengumuman resmi, dan penawaran promo kios.</li>
            <li>Formulir kontak dan pengaduan untuk kemudahan komunikasi pengunjung dengan kantor pengelola.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          3. Hubungan Transaksi Jual-Beli & Independensi Pedagang
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p className="font-semibold text-text-primary">
            Harap dipahami dengan saksama:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Situs ini berfungsi semata-mata sebagai portal direktori informasi dan katalog digital. Situs ini <strong>bukan merupakan lokapasar (*marketplace*) transaksi daring langsung</strong> dan tidak memproses pembayaran perniagaan barang.</li>
            <li>Seluruh transaksi jual-beli, kesepakatan harga, garansi keaslian batu permata/akik, atau pemesanan kain batik berlangsung secara langsung (*offline*) di lokasi kios gedung mall atau melalui komunikasi privat mandiri antara pembeli dan pemilik stan via WhatsApp/telepon.</li>
            <li>Pengelola gedung Plaza Kebun Sayur bukan merupakan pihak dalam transaksi individual tersebut dan tidak memungut komisi transaksi penjualan dari pengunjung.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          4. Hak Kekayaan Intelektual
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Seluruh konten yang terdapat di situs ini—termasuk logo Plaza Kebun Sayur, tata letak antarmuka, teks deskripsi panduan, ikonografi, dan materi grafis publikasi—adalah milik Pengelola Plaza Kebun Sayur atau pemegang lisensi resminya, yang dilindungi oleh Undang-Undang Hak Cipta Republik Indonesia.
          </p>
          <p>
            Foto kios, logo stan, atau merek dagang pedagang individual adalah milik dari masing-masing penyewa kios terkait. Pengutipan informasi untuk tujuan jurnalistik atau promosi wisata Balikpapan diperbolehkan dengan mencantumkan sumber rujukan yang sah.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          5. Larangan Penggunaan (Prohibited Conduct)
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>Dalam menggunakan situs ini, Anda setuju untuk tidak:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Melakukan penambangan data massal otomatis (*automated scraping* atau *bot crawling*) yang mengganggu stabilitas beban peladen situs.</li>
            <li>Mengirimkan pesan spam, muatan berbahaya, ancaman, atau pesan penipuan melalui formulir Kontak.</li>
            <li>Menyalahgunakan nomor kontak pedagang yang tertera untuk tujuan telemarketing tanpa izin, pelecehan, atau penipuan.</li>
            <li>Mencoba memperoleh akses tidak sah ke sistem peladen (*server*) atau basis data pengelola.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          6. Batasan Tanggung Jawab (Limitation of Liability)
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Pengelola senantiasa berupaya menyajikan informasi direktori, nomor kios, dan jadwal operasional yang akurat serta mutakhir. Kendati demikian:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pengelola tidak menjamin bahwa informasi jam buka kios atau ketersediaan stok barang tertentu selalu identik setiap hari, mengingat keputusan jam buka individual berada di bawah kendali masing-masing pedagang.</li>
            <li>Pengelola tidak bertanggung jawab atas kerugian materiil maupun immateriil yang timbul akibat perselisihan kesepakatan jual-beli independen antara pengunjung dan pedagang di luar gedung mall.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          7. Hukum yang Berlaku & Penyelesaian Sengketa
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Syarat & Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul sehubungan dengan penggunaan situs ini akan diselesaikan secara musyawarah untuk mufakat terlebih dahulu, dan bila tidak tercapai titik temu, akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Kota Balikpapan.
          </p>
        </div>
      </section>
    </>
  );
}

function TermsContactBox({ siteSettings }) {
  return (
    <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-3 mt-4">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
        Hubungi Kantor Pengelola
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Untuk pertanyaan mengenai ketentuan layanan atau kerja sama kemitraan penyewaan stan pameran, silakan hubungi kami:
      </p>
      <div className="text-xs sm:text-sm text-text-primary space-y-1 font-medium">
        <div>Kantor Manajemen Pengelola Plaza Kebun Sayur</div>
        <div>{siteSettings?.office_address || 'Lantai Dasar (Pintu Timur), Jl. Letjen Suprapto, Balikpapan Barat 76131'}</div>
        {siteSettings?.security_phone && (
          <div>Telepon: {siteSettings.security_phone}</div>
        )}
        {siteSettings?.management_email && (
          <div>
            Email:{' '}
            <a href={`mailto:${siteSettings.management_email}`} className="text-brand-primary hover:underline">
              {siteSettings.management_email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function TermsConditions() {
  const metaTitle = useContent('seo.terms.title', 'Syarat & Ketentuan | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.terms.description', 'Syarat dan ketentuan penggunaan situs direktori dan layanan informasi Plaza Kebun Sayur Balikpapan.');
  useDocumentMeta(metaTitle, metaDesc);

  const siteSettings = useSiteSettings();
  const [legalPage, setLegalPage] = useState(null);

  const headerEyebrow = useContent('header.terms.eyebrow', 'Informasi Legal & Kepatuhan');
  const headerTitle = useContent('header.terms.title', 'Syarat & Ketentuan');
  const headerDesc = useContent(
    'header.terms.description',
    'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.'
  );

  useEffect(() => {
    let isMounted = true;
    fetchLegalPage('syarat-ketentuan')
      .then((page) => {
        if (isMounted && page) {
          setLegalPage(page);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const updatedDate = formatDate(legalPage?.updated_label) || '11 Oktober 2026';

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <PageHeader
        eyebrow={headerEyebrow}
        title={headerTitle}
        description={headerDesc}
      />

      <section className="py-10 sm:py-14 flex-1">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-8 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-text-primary transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-text-primary font-medium">Syarat & Ketentuan</span>
          </nav>

          <article className="max-w-3xl mx-auto flex flex-col gap-10">
            <div className="flex items-center gap-2 text-xs text-text-muted border-b border-border-subtle pb-4">
              <Calendar size={14} className="text-brand-primary" />
              <span>Terakhir diperbarui: {updatedDate}</span>
              <span className="text-border-subtle" aria-hidden="true">•</span>
              <span className="flex items-center gap-1 font-medium text-text-primary">
                <FileText size={14} className="text-brand-primary" />
                Ketentuan Layanan Resmi
              </span>
            </div>

            {legalPage?.intro && (
              <p className="text-base md:text-lg text-brand-dark/80 font-medium leading-relaxed mb-8 p-4 bg-brand-warm/30 rounded-sm border-l-4 border-brand-primary">
                {legalPage.intro}
              </p>
            )}

            {legalPage?.body ? (
              <div
                className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-4 [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-bold [&>h2]:text-text-primary [&>h2]:tracking-tight [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-border-subtle [&>h2:first-child]:pt-0 [&>h2:first-child]:border-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&_strong]:text-text-primary [&_strong]:font-semibold [&_a]:text-brand-primary [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: legalPage.body }}
              />
            ) : (
              <TermsFallbackSections />
            )}

            <TermsContactBox siteSettings={siteSettings} />

            <div className="pt-6 border-t border-border-subtle">
              <Link
                to="/"
                className="inline-flex items-center gap-2 py-2.5 min-h-[44px] text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors"
              >
                <ArrowLeft size={15} />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </div>
  );
}

export default TermsConditions;
