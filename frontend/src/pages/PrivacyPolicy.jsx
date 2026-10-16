import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchSiteSettings, fetchLegalPage } from '../services/api';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { formatDate } from '../utils/date';

export function PrivacyPolicy() {
  const metaTitle = useContent('seo.privacy.title', 'Kebijakan Privasi | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.privacy.description', 'Kebijakan privasi dan perlindungan data pribadi pengunjung website resmi Plaza Kebun Sayur Balikpapan sesuai UU PDP No. 27/2022.');
  useDocumentMeta(metaTitle, metaDesc);

  const [siteSettings, setSiteSettings] = useState(null);
  const [legalPage, setLegalPage] = useState(null);

  const headerEyebrow = useContent('header.privacy.eyebrow', 'Informasi Legal & Kepatuhan');
  const headerTitle = useContent('header.privacy.title', 'Kebijakan Privasi');
  const headerDesc = useContent(
    'header.privacy.description',
    'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).'
  );

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([
      fetchSiteSettings(),
      fetchLegalPage('kebijakan-privasi'),
    ]).then(([settingsRes, pageRes]) => {
      if (!isMounted) return;
      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        setSiteSettings(settingsRes.value);
      }
      if (pageRes.status === 'fulfilled' && pageRes.value) {
        setLegalPage(pageRes.value);
      }
    });

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

      <section className="py-12 sm:py-16 flex-1">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-8 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-text-primary transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-text-primary font-medium">Kebijakan Privasi</span>
          </nav>

          <article className="max-w-3xl mx-auto flex flex-col gap-10">
            {/* Meta Update Header */}
            <div className="flex items-center gap-2 text-xs text-text-muted border-b border-border-subtle pb-4">
              <Calendar size={14} className="text-brand-primary" />
              <span>Terakhir diperbarui: {updatedDate}</span>
              <span className="text-border-subtle" aria-hidden="true">•</span>
              <span className="flex items-center gap-1 font-medium text-text-primary">
                <ShieldCheck size={14} className="text-whatsapp" />
                Sesuai Regulasi UU PDP No. 27/2022
              </span>
            </div>

            {legalPage?.body ? (
              <div
                className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-4 [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-bold [&>h2]:text-text-primary [&>h2]:tracking-tight [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-border-subtle [&>h2:first-child]:pt-0 [&>h2:first-child]:border-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&_strong]:text-text-primary [&_strong]:font-semibold [&_a]:text-brand-primary [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: legalPage.body }}
              />
            ) : (
              <>
                {/* Fallback Section 1 */}
                <section className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    1. Pendahuluan & Prinsip Perlindungan Data
                  </h2>
                  <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                    <p>
                      Pengelola Plaza Kebun Sayur (Pasar Inpres Kebun Sayur Balikpapan) berkomitmen penuh untuk menghormati, menjaga kerahasiaan, dan melindungi hak privasi setiap pengunjung situs direktori resmi ini.
                    </p>
                    <p>
                      Dokumen Kebijakan Privasi ini menjelaskan bagaimana data dan informasi pribadi Anda dikumpulkan, digunakan, disimpan, dan dilindungi saat mengakses portal web serta layanan informasi digital kami, sejalan dengan prinsip transparansi hukum Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
                    </p>
                  </div>
                </section>

                {/* Fallback Section 2 */}
                <section className="space-y-3 pt-6 border-t border-border-subtle">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    2. Data Pribadi yang Kami Kumpulkan
                  </h2>
                  <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                    <p>
                      Kami hanya mengumpulkan data yang relevan dan terbatas sesuai tujuan operasional direktori:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong className="text-text-primary font-semibold">Data yang Diberikan Secara Sukarela:</strong> Saat Anda mengirimkan pesan melalui formulir pada halaman Kontak, data yang dikirimkan meliputi nama lengkap, nomor telepon (WhatsApp), alamat surat elektronik (email), dan isi pesan/pertanyaan Anda.
                      </li>
                      <li>
                        <strong className="text-text-primary font-semibold">Data Teknis & Akses:</strong> Informasi standar log peladen peramban web seperti alamat protokol internet (IP address), jenis perangkat keras, jenis peramban web, serta stempel waktu kunjungan untuk keperluan pemeliharaan stabilitas server dan keamanan infrastruktur situs.
                      </li>
                      <li>
                        <strong className="text-text-primary font-semibold">Interaksi Tautan Eksternal WhatsApp:</strong> Saat Anda menekan tombol &ldquo;Chat Penjual&rdquo; atau &ldquo;WhatsApp Pengelola&rdquo;, Anda akan dialihkan ke layanan pihak ketiga (WhatsApp by Meta). Kami tidak menyimpan isi percakapan pribadi atau rincian transaksi jual beli yang Anda lakukan secara langsung dengan pedagang.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Fallback Section 3 */}
                <section className="space-y-3 pt-6 border-t border-border-subtle">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    3. Tujuan Pemrosesan Data
                  </h2>
                  <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                    <p>Data yang dikumpulkan hanya diproses untuk tujuan-tujuan yang sah, yaitu:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Menanggapi pertanyaan, permintaan bantuan sewa ruang pameran, atau pengaduan fasilitas gedung yang Anda sampaikan.</li>
                      <li>Memastikan keamanan teknis sistem situs dari percobaan serangan siber, akses tidak sah, dan aktivitas otomatis yang berbahaya (bot/spam).</li>
                      <li>Menganalisis pola keterbacaan direktori kios dan kuliner secara agregat tanpa mengidentifikasi profil individu secara spesifik, guna meningkatkan kenyamanan navigasi pengunjung.</li>
                    </ul>
                  </div>
                </section>

                {/* Fallback Section 4 */}
                <section className="space-y-3 pt-6 border-t border-border-subtle">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    4. Keamanan & Kerahasiaan Data
                  </h2>
                  <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                    <p>
                      Kami menerapkan langkah-langkah teknis dan organisasional yang memadai guna mencegah kehilangan, penyalahgunaan, atau pengubahan data pribadi:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Seluruh transmisi data dienkripsi menggunakan protokol aman Transport Layer Security (HTTPS/TLS).</li>
                      <li>Akses terhadap pesan masuk pada sistem hanya diberikan kepada staf pengelola gedung yang berwenang.</li>
                      <li>Kami tidak pernah memperjualbelikan, menyewakan, atau membagikan data kontak Anda kepada pihak ketiga mana pun untuk tujuan promosi komersial atau telemarketing.</li>
                    </ul>
                  </div>
                </section>

                {/* Fallback Section 5 */}
                <section className="space-y-3 pt-6 border-t border-border-subtle">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    5. Hak Anda sebagai Subjek Data Pribadi
                  </h2>
                  <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                    <p>Sesuai Bab IV UU PDP Nomor 27 Tahun 2022, Anda memiliki hak-hak hukum berikut:</p>
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

                {/* Fallback Section 6 */}
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

                {/* Fallback Section 7 */}
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
            )}

            {/* Contact Box */}
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

            {/* Back Link */}
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
