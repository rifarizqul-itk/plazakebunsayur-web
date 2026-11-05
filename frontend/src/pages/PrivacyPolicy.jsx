import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchLegalPage } from '../services/api';
import { useContent, useSiteSettings } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { formatDate } from '../utils/date';

function PrivacyFallbackSections() {
  return (
    <>
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          1. Pendahuluan & Prinsip Perlindungan Data
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Pengelola Plaza Kebun Sayur Balikpapan berkomitmen penuh untuk menghormati, menjaga kerahasiaan, dan melindungi hak privasi setiap pengunjung situs direktori resmi ini.
          </p>
          <p>
            Dokumen Kebijakan Privasi ini menjelaskan bagaimana data dan informasi pribadi Anda dikumpulkan, digunakan, disimpan, dan dilindungi saat mengakses portal web serta layanan informasi digital kami. Kami mematuhi ketentuan peraturan perundang-undangan Republik Indonesia, khususnya Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          2. Data yang Kami Kumpulkan
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>Situs ini mengumpulkan data secara terbatas dan proporsional untuk keperluan penyediaan informasi:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-text-primary font-semibold">Data yang Anda Berikan Secara Sukarela:</strong> Nama, alamat email, nomor telepon/WhatsApp, dan isi pesan yang Anda kirimkan melalui formulir Kontak & Pengaduan.</li>
            <li><strong className="text-text-primary font-semibold">Data Teknis Navigasi:</strong> Alamat IP, jenis peramban (*browser*), resolusi layar, dan waktu akses yang dicatat secara otomatis dalam log peladen (*server logs*) guna pemeliharaan keamanan infrastruktur sistem.</li>
            <li><strong className="text-text-primary font-semibold">Pencarian Kios & Filter:</strong> Kata kunci pencarian direktori yang diproses secara langsung di peramban Anda tanpa menghubungkan ke identitas pribadi.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          3. Tujuan Pemrosesan Data
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>Data yang dikumpulkan hanya digunakan untuk tujuan:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Merespons pertanyaan, masukan, laporan barang tertinggal, atau koordinasi kunjungan rombongan ke pengelola.</li>
            <li>Menjaga stabilitas, mencegah serangan siber, dan memastikan kelancaran operasional website direktori.</li>
            <li>Menganalisis statistik agregat tanpa identitas pribadi (*anonymized traffic*) guna meningkatkan kemudahan navigasi publik.</li>
          </ul>
          <p className="font-semibold text-text-primary">
            Kami tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga untuk kepentingan komersial maupun periklanan.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          4. Kerahasiaan & Keamanan Data
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Pengelola menerapkan standar perlindungan teknis dan organisasi yang wajar, termasuk enkripsi transmisi (HTTPS/SSL), pembatasan akses data hanya kepada staf manajemen yang berwenang, dan mekanisme anti-spam (*honeypot*) pada formulir interaktif.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          5. Hak Subjek Data Pribadi
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>Sesuai dengan ketentuan Bab IV UU PDP No. 27/2022, Anda memiliki hak-hak hukum berikut:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-text-primary font-semibold">Hak Akses:</strong> Mendapatkan konfirmasi dan informasi mengenai data pribadi Anda yang tersimpan di sistem kami.</li>
            <li><strong className="text-text-primary font-semibold">Hak Koreksi:</strong> Meminta perbaikan data pribadi Anda jika terjadi kekeliruan atau ketidaklengkapan.</li>
            <li><strong className="text-text-primary font-semibold">Hak Penghapusan (Right to Erasure):</strong> Meminta penghapusan riwayat data pesan atau kontak yang pernah Anda kirimkan.</li>
            <li><strong className="text-text-primary font-semibold">Hak Penarikan Persetujuan:</strong> Menarik kembali persetujuan pemrosesan data pribadi yang sebelumnya telah diberikan.</li>
          </ul>
          <p>
            Untuk menggunakan hak-hak tersebut, Anda dapat menghubungi kantor manajemen pengelola melalui saluran kontak resmi yang tercantum di bagian akhir dokumen ini.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          6. Penggunaan Cookie & Penyimpanan Lokal
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Situs ini hanya menggunakan cookie teknis esensial atau penyimpanan lokal peramban (Local Storage) untuk mengingat preferensi filter direktori kios dan kinerja navigasi. Situs ini tidak menggunakan cookie pelacak iklan pihak ketiga (third-party advertising trackers) yang memantau riwayat lintas situs Anda.
          </p>
        </div>
      </section>

      <section className="space-y-3 pt-6 border-t border-border-subtle">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          7. Perubahan atas Kebijakan Privasi
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
          <p>
            Pengelola Plaza Kebun Sayur dapat memperbarui dokumen kebijakan ini sewaktu-waktu guna menyesuaikan dengan perkembangan regulasi perundang-undangan atau penambahan fitur layanan situs. Setiap perubahan akan dicantumkan pada halaman ini dengan mencantumkan tanggal revisi terbaru di bagian atas.
          </p>
        </div>
      </section>
    </>
  );
}

function PrivacyContactBox({ siteSettings }) {
  return (
    <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-3 mt-4">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
        Pertanyaan & Layanan Pelindungan Data
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Apabila Anda memiliki pertanyaan, keberatan, atau ingin mengajukan permohonan terkait data pribadi Anda, silakan hubungi Kantor Pengelola Plaza Kebun Sayur:
      </p>
      <div className="text-xs sm:text-sm text-text-primary space-y-1 font-medium">
        <div>Kantor Pengelola Plaza Kebun Sayur</div>
        <div>{siteSettings?.office_address || 'Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat, Kota Balikpapan 76131'}</div>
        {siteSettings?.management_email && (
          <div>
            Email:{' '}
            <a href={`mailto:${siteSettings.management_email}`} className="text-brand-primary hover:underline">
              {siteSettings.management_email}
            </a>
          </div>
        )}
        {siteSettings?.security_phone && (
          <div>Telepon: {siteSettings.security_phone}</div>
        )}
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  const metaTitle = useContent('seo.privacy.title', 'Kebijakan Privasi | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.privacy.description', 'Kebijakan privasi dan perlindungan data pribadi pengunjung website resmi Plaza Kebun Sayur Balikpapan sesuai UU PDP No. 27/2022.');
  useDocumentMeta(metaTitle, metaDesc);

  const siteSettings = useSiteSettings();
  const [legalPage, setLegalPage] = useState(null);

  const headerEyebrow = useContent('header.privacy.eyebrow', 'Informasi Legal & Kepatuhan');
  const headerTitle = useContent('header.privacy.title', 'Kebijakan Privasi');
  const headerDesc = useContent(
    'header.privacy.description',
    'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).'
  );

  useEffect(() => {
    let isMounted = true;
    fetchLegalPage('kebijakan-privasi')
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
            <span className="text-text-primary font-medium">Kebijakan Privasi</span>
          </nav>

          <article className="max-w-3xl mx-auto flex flex-col gap-10">
            <div className="flex items-center gap-2 text-xs text-text-muted border-b border-border-subtle pb-4">
              <Calendar size={14} className="text-brand-primary" />
              <span>Terakhir diperbarui: {updatedDate}</span>
              <span className="text-border-subtle" aria-hidden="true">•</span>
              <span className="flex items-center gap-1 font-medium text-text-primary">
                <ShieldCheck size={14} className="text-whatsapp" />
                Sesuai Regulasi UU PDP No. 27/2022
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
              <PrivacyFallbackSections />
            )}

            <PrivacyContactBox siteSettings={siteSettings} />

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

export default PrivacyPolicy;
