/**
 * Dataset cadangan HANYA untuk mode pengembangan lokal (npm run dev).
 * Dilarang keras digunakan pada lingkungan produksi!
 */

export const MOCK_MARKER = '__MOCK_DATA_DEV_ONLY__';

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Batu Mulia & Akik', slug: 'batu-mulia-dan-akik', type: 'retail', icon_name: 'Gem', description: 'Pusat koleksi batu akik Kalimantan, kecubung wulung, red borneo, dan aneka permata.' },
  { id: 2, name: 'Perhiasan Emas & Perak', slug: 'perhiasan-emas-dan-perak', type: 'retail', icon_name: 'Sparkles', description: 'Deretan toko emas terpercaya, perak bakar, dan custom cincin pernikahan.' },
  { id: 3, name: 'Kerajinan Dayak & Souvenir', slug: 'kerajinan-dayak-dan-souvenir', type: 'retail', icon_name: 'ShoppingBag', description: 'Mandau asli, tameng motif Dayak Kenyah, tas manik, dan gelang ulin.' },
  { id: 4, name: 'Batik & Songket Kaltim', slug: 'batik-dan-songket-kaltim', type: 'retail', icon_name: 'Shirt', description: 'Batik motif mangrove Balikpapan dan sarung tenun Samarinda asli.' },
  { id: 5, name: 'Cinderamata & Aksesoris', slug: 'cinderamata-dan-aksesoris', type: 'retail', icon_name: 'Package', description: 'Miniatur khas Kaltim, gantungan kunci manik, dan suvenir IKN.' },
  { id: 6, name: 'Batik & Tenun Kaltim', slug: 'batik-dan-tenun-kaltim', type: 'fashion', icon_name: 'Shirt', description: 'Kain batik motif mangrove Balikpapan, tenun ikat Dayak, dan sarung Samarinda asli.' },
  { id: 7, name: 'Busana Adat & Etnik', slug: 'busana-adat-dan-etnik', type: 'fashion', icon_name: 'Sparkles', description: 'Pakaian adat Dayak, rompi manik etnik, blus tenun modern, dan perlengkapan busana daerah.' },
  { id: 8, name: 'Pakaian & Aksesoris', slug: 'pakaian-dan-aksesoris', type: 'fashion', icon_name: 'Scissors', description: 'Koleksi busana pria dan wanita, pakaian harian etnik Borneo, serta aksesoris pelengkap busana.' },
];

export const MOCK_FLOORS = [
  { id: 1, name: 'Lantai Dasar (Ground Floor)', code: 'GF' },
  { id: 2, name: 'Lantai 1', code: 'L1' },
  { id: 3, name: 'Lantai 2', code: 'L2' },
];

export const MOCK_TENANTS = [
  {
    id: 1,
    name: 'Permata Borneo Gems',
    slug: 'permata-borneo-gems',
    category_id: 1,
    floor_id: 1,
    category: { id: 1, name: 'Batu Mulia & Akik', slug: 'batu-mulia-dan-akik', type: 'retail' },
    floor: { id: 1, name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok A No. 04',
    description: 'Menyediakan aneka batu akik asli Kalimantan: Red Borneo, Kecubung Pangkalan Bun, Giok Sojol, serta jasa ikat cincin perak & titanium.',
    phone_whatsapp: '081234567801',
    instagram: '@permataborneo.bunsay',
    tiktok: '@permataborneo.gems',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 2,
    name: 'Galeri Mustika Safir',
    slug: 'galeri-mustika-safir',
    category_id: 1,
    floor_id: 1,
    category: { id: 1, name: 'Batu Mulia & Akik', slug: 'batu-mulia-dan-akik', type: 'retail' },
    floor: { id: 1, name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok A No. 11',
    description: 'Spesialis batu mulia natural: Safir Ceylon, Zamrud Kolombia, Ruby Burma, dan pengujian keaslian lab gemologi.',
    phone_whatsapp: '081234567802',
    instagram: '@mustikasafir_kaltim',
    tiktok: '@mustikasafir',
    opening_time: '09:30:00',
    closing_time: '17:30:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 3,
    name: 'Toko Emas Sejahtera Sayur',
    slug: 'toko-emas-sejahtera-sayur',
    category_id: 2,
    floor_id: 1,
    category: { id: 2, name: 'Perhiasan Emas & Perak', slug: 'perhiasan-emas-dan-perak', type: 'retail' },
    floor: { id: 1, name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok B No. 01 - 02',
    description: 'Pusat jual beli perhiasan emas kadar 700, 750, dan 999. Model kalung, gelang, dan cincin pengantin terkini dengan sertifikat resmi.',
    phone_whatsapp: '081234567803',
    instagram: '@emas_sejahterabunsay',
    tiktok: '@tokoemas_sejahtera',
    opening_time: '08:30:00',
    closing_time: '17:00:00',
    days_open: 'Senin - Sabtu',
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 4,
    name: 'Art Shop Dayak Kenyah',
    slug: 'art-shop-dayak-kenyah',
    category_id: 3,
    floor_id: 2,
    category: { id: 3, name: 'Kerajinan Dayak & Souvenir', slug: 'kerajinan-dayak-dan-souvenir', type: 'retail' },
    floor: { id: 2, name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok C No. 08',
    description: 'Pusat kerajinan seni suku Dayak terlengkap: Mandau tradisional gagang tanduk, tameng motif etnik, tas anyaman manik, dan gelang kayu ulin asli.',
    phone_whatsapp: '081234567804',
    instagram: '@dayakart_kebunsayur',
    tiktok: '@dayakart_borneo',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 5,
    name: 'Batik Ampiek Khas Balikpapan',
    slug: 'batik-ampiek-khas-balikpapan',
    category_id: 4,
    floor_id: 2,
    category: { id: 4, name: 'Batik & Songket Kaltim', slug: 'batik-dan-songket-kaltim', type: 'retail' },
    floor: { id: 2, name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok D No. 03',
    description: 'Pelopor batik khas Balikpapan bermotif kepiting, mangrove, dan corak etnik Kalimantan. Bahan katun halus dan sutra premium.',
    phone_whatsapp: '081234567805',
    instagram: '@batikampiek.official',
    tiktok: '@batikampiek',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 6,
    name: 'Galeri Batik & Tenun Dayak Kenyah',
    slug: 'galeri-batik-tenun-dayak-kenyah',
    category_id: 6,
    floor_id: 2,
    category: { id: 6, name: 'Batik & Tenun Kaltim', slug: 'batik-dan-tenun-kaltim', type: 'fashion' },
    floor: { id: 2, name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok D No. 05',
    description: 'Koleksi kain batik tulis motif mangrove Balikpapan, tenun Samarinda asli, serta selendang sutra etnik berkualitas tinggi.',
    phone_whatsapp: '081234567806',
    instagram: '@batiktenun_borneo',
    tiktok: '@batiktenun_borneo',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 7,
    name: 'Rumah Busana Adat Borneo',
    slug: 'rumah-busana-adat-borneo',
    category_id: 7,
    floor_id: 2,
    category: { id: 7, name: 'Busana Adat & Etnik', slug: 'busana-adat-dan-etnik', type: 'fashion' },
    floor: { id: 2, name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok D No. 12',
    description: 'Spesialis pakaian adat Dayak, busana tari tradisional Kalimantan, rompi manik khas, dan gaun etnik pesta modifikasi modern.',
    phone_whatsapp: '081234567807',
    instagram: '@busanaadat.borneo',
    tiktok: '@busanaadat.borneo',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
  {
    id: 8,
    name: 'Kencana Pakaian & Tenun Kaltim',
    slug: 'kencana-pakaian-dan-tenun-kaltim',
    category_id: 8,
    floor_id: 2,
    category: { id: 8, name: 'Pakaian & Aksesoris', slug: 'pakaian-dan-aksesoris', type: 'fashion' },
    floor: { id: 2, name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok D No. 18',
    description: 'Menjual aneka kemeja batik pria etnik Balikpapan, gamis motif Dayak, kaos cenderamata Borneo, dan aksesoris fashion harian.',
    phone_whatsapp: '081234567808',
    instagram: '@kencanafashion.kaltim',
    tiktok: '@kencanafashion',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    ],
    is_featured: true,
  },
];

export const MOCK_FACILITIES = [
  {
    id: 1,
    name: 'Musala',
    icon_name: 'Moon',
    location_note: 'Lantai 2 Barat',
    description: 'Tempat ibadah yang bersih dan terawat dengan area wudhu terpisah untuk kenyamanan pengunjung muslim.',
  },
  {
    id: 2,
    name: 'Toilet',
    icon_name: 'Users',
    location_note: 'Lantai Dasar & Lantai 1',
    description: 'Fasilitas sanitasi yang rutin dibersihkan setiap jam, dilengkapi akses toilet ramah disabilitas.',
  },
  {
    id: 3,
    name: 'ATM Center',
    icon_name: 'CreditCard',
    location_note: 'Lantai Dasar Pintu Timur',
    description: 'Kemudahan transaksi dengan aneka mesin ATM bank nasional (Mandiri, BCA, BRI, Bank Kaltimtara).',
  },
  {
    id: 4,
    name: 'Area Parkir',
    icon_name: 'Car',
    location_note: 'Halaman Depan & Belakang',
    description: 'Lahan parkir kendaraan roda dua dan roda empat luas dengan penjagaan satpam terpadu.',
  },
  {
    id: 5,
    name: 'Pos Keamanan',
    icon_name: 'ShieldCheck',
    location_note: 'Lobby Utama Gedung',
    description: 'Petugas keamanan (Satpam) siaga siap membantu arah denah kios dan kenyamanan pengunjung.',
  },
];

export const MOCK_WHATS_ON = [
  {
    id: 1,
    title: 'Festival Pesona Budaya & Batu Mulia Balikpapan 2026',
    slug: 'festival-pesona-budaya-batu-mulia-2026',
    type: 'event',
    start_date: '2026-10-10',
    end_date: '2026-10-15',
    time: '10.00 – 17.30 WITA',
    location: 'Atrium Utama (Lantai Dasar & Koridor Timur)',
    admission: 'Gratis (Terbuka untuk Umum)',
    terms: 'Terbuka bebas bagi seluruh masyarakat dan wisatawan nusantara.',
    contact_person: 'Bpk. Hendra (Koordinator Acara)',
    contact_phone: '081234567890',
    banner_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Pameran akbar koleksi permata nusantara, kontes batu akik Borneo, dan pentas seni tradisional Dayak.',
    content: 'Sambut semarak Festival Budaya Plaza Kebun Sayur! Dimeriahkan oleh puluhan kolektor batu akik se-Kalimantan, demonstrasi ukiran mandau langsung, serta promo suvenir khas Kalimantan Timur.',
    highlights: [
      'Pameran lebih dari 500 koleksi batu akik & permata alam langka se-Borneo (Red Borneo, Kecubung, Jamrud).',
      'Kontes dan uji keaslian batu mulia dengan sertifikasi gemologi langsung di tempat.',
      'Pertunjukan musik petik Sape dan tarian tradisional Dayak Kenyah setiap sore.',
      'Demonstrasi langsung pembuatan ukiran kayu ulin dan pengrajin ikat cincin perak.',
    ],
    rundown: [
      { time: '10:00 - 12:00 WITA', activity: 'Pembukaan Galeri Pameran & Demo Uji Lab Batu Mulia' },
      { time: '14:00 - 15:30 WITA', activity: 'Workshop Pembuatan Ikat Cincin & Ukir Tanduk Tradisional' },
      { time: '16:00 - 17:30 WITA', activity: 'Pergelaran Musik Sape Borneo & Tarian Sambutan Dayak' },
    ],
  },
  {
    id: 2,
    title: 'Promo Wisata Cinderamata IKN & Nusantara',
    slug: 'promo-wisata-cinderamata-ikn',
    type: 'promo',
    start_date: '2026-09-01',
    end_date: '2026-10-31',
    time: '09.00 – 18.00 WITA (Buka Setiap Hari)',
    location: 'Kios Cinderamata, Batik & Suvenir Berpartisipasi',
    admission: 'Promo Belanja Langsung',
    terms: 'Diberikan otomatis untuk transaksi pembelanjaan suvenir atau batik minimal Rp 500.000.',
    contact_person: 'Ibu Ratna (Sekretariat Paguyuban Pedagang)',
    contact_phone: '081234567891',
    banner_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    summary: 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau kerajinan minimal Rp 500.000.',
    content: 'Menyambut para delegasi dan wisatawan Nusantara ke Balikpapan dan kawasan IKN, puluhan kios cinderamata dan pengrajin lokal memberikan penawaran suvenir spesial serta kemasan siap bagasi penerbangan.',
    highlights: [
      'Gratis suvenir gantungan kunci manik Dayak eksklusif dengan belanja minimal Rp 500.000.',
      'Diskon spesial hingga 20% untuk pembelian kain tenun dan batik motif mangrove Balikpapan.',
      'Kemasan khusus dus siap bagasi pesawat untuk produk oleh-oleh khas dan kerajinan.',
    ],
    rundown: [
      { time: '09:00 - 18:00 WITA', activity: 'Layanan Pembagian Suvenir di Meja Informasi Utama' },
      { time: '10:00 - 16:00 WITA', activity: 'Kemasan Khusus Gratis Bagasi Pesawat di Kios Terdaftar' },
    ],
  },
  {
    id: 3,
    title: 'Gebyar Diskon Batik Balikpapan & Tenun Dayak',
    slug: 'gebyar-diskon-batik-dan-tenun-dayak',
    type: 'promo',
    start_date: '2026-10-01',
    end_date: '2026-11-15',
    time: '09.00 – 18.00 WITA (Buka Setiap Hari)',
    location: 'Sentra Fashion & Pakaian Adat Lantai 1',
    admission: 'Diskon Langsung Kios',
    terms: 'Berlaku di seluruh gerai busana dan batik mitra Paguyuban Lantai 1.',
    contact_person: 'Ibu Maya (Kencana Pakaian & Tenun)',
    contact_phone: '081398765432',
    banner_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    summary: 'Potongan harga hingga 25% untuk kain batik motif mangrove, busana adat Dayak, dan sarung tenun Samarinda pilihan.',
    content: 'Peluang istimewa bagi para pencinta kain Nusantara dan wisatawan. Kios-kios busana di Lantai 1 Plaza Kebun Sayur menghadirkan diskon serempak untuk aneka koleksi batik dan busana adat berkualitas tinggi.',
    highlights: [
      'Diskon 15% - 25% untuk kain batik tulis dan cap khas Balikpapan.',
      'Harga paket spesial untuk pembelian set busana adat Dayak dan aksesoris manik.',
      'Konsultasi padu padan kain tenun tradisional gratis langsung dengan pengrajin.',
    ],
    rundown: [
      { time: '09:00 - 18:00 WITA', activity: 'Penjualan Diskon Serempak di Lantai 1 Sentra Fashion' },
      { time: '13:00 - 15:00 WITA', activity: 'Sesi Demo Pengenalan Filosofi Motif Tenun Ikat Dayak' },
    ],
  },
  {
    id: 4,
    title: 'Promo Kilau Permata & Gratis Pasang Cincin Perak',
    slug: 'promo-kilau-permata-gratis-pasang-cincin',
    type: 'promo',
    start_date: '2026-10-15',
    end_date: '2026-11-30',
    time: '10.00 – 17.30 WITA',
    location: 'Sentra Batu Mulia Lantai Dasar (GF)',
    admission: 'Promo Khusus Pembelian Batu Mulia',
    terms: 'Berlaku di kios pengrajin batu mulia Lantai Dasar bertanda promo.',
    contact_person: 'Bpk. Ahmad (Permata Borneo)',
    contact_phone: '081122334455',
    banner_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Gratis biaya pasang dan poles cincin perak untuk setiap transaksi batu akik Red Borneo atau Kecubung di atas Rp 300.000.',
    content: 'Pengrajin ikat cincin dan kios batu mulia Plaza Kebun Sayur memberikan layanan pasang ikat perak gratis serta poles kilau batu di tempat untuk pembelian permata alam.',
    highlights: [
      'Gratis jasa pasang cangkang perak atau titanium langsung di tempat.',
      'Poles ulang cincin lama pengunjung dengan harga diskon khusus.',
      'Uji kekerasan dan keaslian batu gratis oleh pakar gemologi lokal.',
    ],
    rundown: [
      { time: '10:00 - 17:30 WITA', activity: 'Layanan Kilat Ikat Cincin 15 Menit di Blok A' },
      { time: '14:00 - 16:00 WITA', activity: 'Konsultasi Pengujian Keaslian Batu Mulia Bersertifikat' },
    ],
  },
];

export const MOCK_SITE_SETTINGS = {
  mall_opening_hours: 'Setiap Hari 08.00 - 18.00 WITA',
  management_whatsapp: '080000000000',
  security_phone: '(0542) 734567',
  office_address: 'Lantai Dasar (Pintu Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131',
  management_email: 'pengelola@plazakebunsayur.com',
  maps_url: 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan',
  maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid',
};

export const MOCK_PAGE_CONTENTS = {
  'brand.name': 'PLAZA KEBUN SAYUR',
  'brand.sub_location': 'Balikpapan Barat',
  'brand.logo': '/assets/main_logo_transparent_for_light_bg.webp',
  'home.hero.eyebrow': 'Sentra Kerajinan Tradisional & Batu Mulia Balikpapan',
  'home.hero.title': 'Pusat Cinderamata & Pesona Budaya Borneo',
  'home.hero.subtitle': 'Temukan koleksi batu akik, permata langka, kerajinan etnik Dayak, kain batik khas, dan busana tradisional Kalimantan Timur di jantung Balikpapan Barat.',
  'home.hero.cta_primary': 'Jelajahi Direktori Kios',
  'home.hero.cta_secondary': 'Lihat Sentra Fashion',
  'home.hero.building_tag': 'Fasad Utama Gedung',
  'home.hero.building_cta': 'Pelajari Panduan Kunjungan',
  'home.hero.image': '/assets/Photograph_of_plaza_building.webp',
  'home.hero.slide.batu_mulia.tag': 'Sentra Batu Mulia Borneo',
  'home.hero.slide.batu_mulia.title': 'Koleksi Akik, Permata & Cangkang Perak',
  'home.hero.slide.batu_mulia.desc': 'Pengrajin ikat cincin dan ragam batu mulia khas Kalimantan terpercaya.',
  'home.hero.slide.batu_mulia.cta': 'Jelajahi Kios Batu Mulia',
  'home.hero.slide.batu_mulia.image': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80',
  'home.hero.slide.cinderamata.tag': 'Cinderamata & Etnik Dayak',
  'home.hero.slide.cinderamata.title': 'Kerajinan Manik, Tenun & Suvenir Tradisional',
  'home.hero.slide.cinderamata.desc': 'Karya seni ukir Dayak, manik-manik, mandau, dan cenderamata khas Borneo.',
  'home.hero.slide.cinderamata.cta': 'Lihat Cinderamata & Tenun',
  'home.hero.slide.cinderamata.image': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80',
  'home.hero.slide.fashion.tag': 'Sentra Fashion & Busana Kaltim',
  'home.hero.slide.fashion.title': 'Batik Balikpapan, Tenun Samarinda & Busana Adat',
  'home.hero.slide.fashion.desc': 'Koleksi pakaian etnik Kalimantan, kain tenun asli, dan busana modern pilihan.',
  'home.hero.slide.fashion.cta': 'Jelajahi Sentra Fashion',
  'home.hero.slide.fashion.image': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=80',
  'home.hero.slide.suasana.tag': 'Suasana Kios Plaza Kebun Sayur',
  'home.hero.slide.suasana.title': 'Ratusan Kios Resmi Pengrajin Lokal',
  'home.hero.slide.suasana.desc': 'Keramahan interaksi perniagaan dan belanja cinderamata yang nyaman dan terpercaya.',
  'home.hero.slide.suasana.cta': 'Buka Direktori Lengkap',
  'home.hero.slide.suasana.image': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
  'home.promos.eyebrow': 'Penawaran Spesial Kios & Gedung',
  'home.promos.title': 'Promo Minggu Ini / Bulan Ini',
  'home.promos.cta_label': 'Lihat semua promo & informasi',
  'home.oleh_oleh.eyebrow': 'Batik, Busana Adat & Kerajinan Khas',
  'home.oleh_oleh.title': 'Oleh-Oleh Khas & Cenderamata',
  'home.oleh_oleh.cta_label': 'Lihat semua kios belanja & oleh-oleh',
  'home.featured.eyebrow': 'Pilihan Pengunjung',
  'home.featured.title': 'Promo Minggu Ini / Bulan Ini',
  'home.featured.description': 'Temukan promo belanja, diskon spesial kios, dan oleh-oleh khas pilihan pengunjung di Plaza Kebun Sayur.',
  'home.history.eyebrow': 'Warisan Budaya Balikpapan',
  'home.history.title': 'Sejarah & Perjalanan Plaza Kebun Sayur',
  'home.history.p1': 'Berdiri kokoh di kawasan perniagaan Kebun Sayur, Balikpapan Barat, Plaza Kebun Sayur telah tumbuh menjadi sentra belanja modern dan pusat cinderamata utama di Kalimantan Timur. Dikenal luas oleh wisatawan nusantara hingga mancanegara sebagai pusat perniagaan batu mulia, perhiasan emas, dan kerajinan otentik Dayak.',
  'home.history.p2': 'Menghadirkan kenyamanan berbelanja di dalam gedung bertingkat yang rapi dan terawat, Plaza Kebun Sayur tetap merawat denyut ekonomi rakyat dan keaslian tradisi lokal. Setiap sudut kios menyimpan cerita ketekunan para pengrajin dan pedagang yang setia melestarikan warisan bumi Borneo.',
  'home.history.p3': 'Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.',
  'home.history.cta_label': 'Pelajari Panduan Kunjungan Gedung',
  'home.history.image': '/assets/Photograph_of_plaza_building.webp',
  'home.quick_access.title': 'Apa Yang Ada Di Plaza Kebun Sayur?',
  'home.quick_access.description': 'Temukan kios belanja favorit, sentra fashion khas, jadwal kegiatan pameran, dan panduan kunjungan Anda.',
  'home.action.belanja.category': 'KIOS BELANJA',
  'home.action.belanja.title': 'Batu Mulia, Perhiasan & Cinderamata',
  'home.action.belanja.btn_text': 'LIHAT KIOS BELANJA',
  'home.action.belanja.image': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  'home.action.fashion.category': 'SENTRA FASHION',
  'home.action.fashion.title': 'Batik, Busana Adat & Pakaian',
  'home.action.fashion.btn_text': 'LIHAT SENTRA FASHION',
  'home.action.fashion.image': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  'home.action.panduan.category': 'INFORMASI GEDUNG',
  'home.action.panduan.title': 'Panduan Kunjungan & Fasilitas',
  'home.action.panduan.btn_text': 'BUKA PANDUAN',
  'home.action.panduan.image': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'home.events.title': 'Informasi & Kegiatan Mendatang',
  'home.events.description': 'Temukan jadwal kegiatan, pameran seni budaya Dayak, dan promo menarik dari pedagang di Plaza Kebun Sayur.',
  'header.belanja.eyebrow': 'Katalog Pedagang',
  'header.belanja.title': 'Direktori Kios Belanja',
  'header.belanja.description': 'Jelajahi kios batu mulia, perhiasan emas dan perak, cinderamata khas Dayak, serta suvenir IKN di Plaza Kebun Sayur.',
  'header.fashion.eyebrow': 'Sentra Busana Daerah',
  'header.fashion.title': 'Sentra Fashion & Pakaian Adat',
  'header.fashion.description': 'Jelajahi keanggunan motif batik Balikpapan, tenun Dayak, pakaian adat etnik, dan busana modern khas Kalimantan Timur.',
  'header.informasi.eyebrow': 'Pusat Informasi & Promo',
  'header.informasi.title': 'Informasi & Promo Plaza',
  'header.informasi.description': 'Temukan informasi kegiatan budaya, kontes batu akik, bazar diskon cinderamata, serta pengumuman resmi pengelola mall.',
  'header.panduan.eyebrow': 'Panduan & Informasi Gedung',
  'header.panduan.title': 'Rencanakan Kunjungan Anda',
  'header.panduan.description': 'Panduan jam operasional mall, titik lokasi, fasilitas umum gedung, dan tata tertib di Plaza Kebun Sayur Balikpapan.',
  'header.kontak.eyebrow': 'Pusat Bantuan & Pengaduan',
  'header.kontak.title': 'Hubungi Pengelola Gedung',
  'header.kontak.description': 'Layanan informasi sewa kios, informasi pameran, kehilangan barang, serta saran dan kritik untuk kenyamanan pengunjung Plaza Kebun Sayur.',
  'header.privacy.eyebrow': 'Informasi Legal & Kepatuhan',
  'header.privacy.title': 'Kebijakan Privasi',
  'header.privacy.description': 'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).',
  'header.terms.eyebrow': 'Informasi Legal & Kepatuhan',
  'header.terms.title': 'Syarat & Ketentuan',
  'header.terms.description': 'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.',
  'panduan.hours_title': 'Waktu Operasional & Lokasi Mall',
  'panduan.hours_detail': 'Kios cinderamata, batu mulia, pakaian adat, dan batik beroperasi optimal pukul 09.00 – 17.30 WITA. Kios depan dan pedagang oleh-oleh mulai melayani pengunjung sejak pagi hari.',
  'panduan.hours_tip': 'Waktu kunjungan paling nyaman disarankan antara pukul 10.00 hingga 16.00 WITA.',
  'panduan.location_title': 'Alamat & Titik Temu',
  'panduan.location_detail': 'Terletak di pusat perniagaan Kebun Sayur, Balikpapan Barat, berhadapan langsung dengan koridor jalan raya utama dan dekat kawasan permukiman Kampung Baru.',
  'panduan.facilities_title': 'Fasilitas Gedung Plaza',
  'panduan.facilities_description': 'Fasilitas penunjang kenyamanan belanja dan ibadah yang tersedia di lingkungan gedung Plaza Kebun Sayur.',
  'panduan.routes_title': 'Akses Transportasi Menuju Lokasi',
  'panduan.routes_description': 'Panduan rute perjalanan dari bandara, pelabuhan, dan angkutan kota menuju Plaza Kebun Sayur.',
  'panduan.tips_title': 'Tips Berbelanja Cerdas',
  'panduan.tips_description': 'Praktik terbaik saat berbelanja suvenir, kerajinan etnik, dan batu mulia di Plaza Kebun Sayur.',
  'panduan.rules_title': 'Tata Tertib & Keamanan',
  'panduan.rules_description': 'Panduan ketertiban demi kenyamanan, kebersihan, dan keselamatan bersama selama berada di Plaza Kebun Sayur.',
  'event.callout.title': 'Ingin Menggelar Event di Bunsay?',
  'event.callout.description': 'Area Atrium dan Koridor Plaza Kebun Sayur terbuka untuk pameran batu mulia, pentas seni, maupun bazar UMKM.',
  'event.callout.cta_label': 'Hubungi Manajemen Pengelola →',
  'contact.office_eyebrow': 'Kantor Pengelola',
  'contact.office_title': 'Informasi Kontak Resmi',
  'contact.office_description': 'Kunjungi kantor manajemen mall di lantai dasar atau hubungi pusat layanan terpadu berikut.',
  'contact.form_title': 'Kirim Pesan atau Pertanyaan',
  'contact.form_description': 'Sampaikan pertanyaan Anda kepada tim pengelola mall. Kami akan membalas pesan Anda sesegera mungkin.',
  'not_found.title': 'Halaman Tidak Ditemukan',
  'not_found.description': 'Halaman yang Anda tuju mungkin telah dipindahkan atau tautan yang Anda masukkan salah.',
  'not_found.cta_home': 'Kembali ke Beranda',
  'not_found.cta_directory': 'Direktori Belanja',
  'footer.mall_description': 'Pusat perniagaan Plaza Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, fashion batik, dan cinderamata khas.',
  'footer.management_title': 'Kantor Pengelola',
  'footer.management_description': 'Kantor manajemen berlokasi di Lantai Dasar (Pintu Timur). Melayani informasi kios, ketertiban, dan layanan pengunjung.',
  'seo.default_og_image': '/assets/Photograph_of_plaza_building.webp',
  'seo.home.title': 'Plaza Kebun Sayur Balikpapan | Sentra Kerajinan & Batu Mulia Borneo',
  'seo.home.description': 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik, busana daerah, dan suvenir khas Kalimantan Timur.',
  'seo.fashion.title': 'Sentra Fashion & Pakaian Adat | Plaza Kebun Sayur Balikpapan',
  'seo.fashion.description': 'Koleksi busana adat Dayak, tenun Kalimantan, dan batik motif mangrove Balikpapan di Plaza Kebun Sayur.',
  'seo.informasi.title': 'Informasi & Promo Plaza | Plaza Kebun Sayur Balikpapan',
  'seo.informasi.description': 'Informasi terkini agenda pameran, kegiatan budaya Dayak, dan penawaran promo kios di Plaza Kebun Sayur Balikpapan.',
};

export const MOCK_VISIT_GUIDE = {
  access_routes: [
    {
      id: 1,
      title: 'Dari Bandara Internasional Sultan Aji Muhammad Sulaiman Sepinggan',
      distance: '± 15 km (25–35 menit perjalanan)',
      description:
        'Dapat ditempuh menggunakan taksi resmi bandara atau transportasi daring. Rute tercepat melintasi koridor Jl. Marsma R. Iswahyudi menuju Jl. Jenderal Sudirman, berlanjut ke Jl. Minyak dan Jl. Letjen Suprapto.',
    },
    {
      id: 2,
      title: 'Dari Pelabuhan Semayang Balikpapan',
      distance: '± 4 km (8–12 menit perjalanan)',
      description:
        'Sangat dekat dengan kawasan pelabuhan penumpang. Akses langsung melalui jalur pesisir Jl. Yos Sudarso (Jl. Minyak) lurus ke arah utara menuju gerbang masuk Plaza Kebun Sayur.',
    },
    {
      id: 3,
      title: 'Transportasi Publik / Angkutan Kota (Angkot)',
      distance: 'Tersedia setiap hari',
      description:
        'Angkutan kota trayek No. 1 (Warna Putih) rute Terminal Batu Ampar – Kebun Sayur dan trayek No. 2A melintas tepat di depan halte gerbang timur Plaza Kebun Sayur.',
    },
  ],
  shopping_tips: [
    {
      id: 1,
      title: 'Tawar-Menawar dengan Santun',
      description:
        'Tradisi berniaga di Plaza Kebun Sayur mengedepankan keramahan dan kekeluargaan. Silakan berdiskusi dan menawar harga cinderamata secara wajar dengan para pedagang kios.',
    },
    {
      id: 2,
      title: 'Uji Keaslian Batu Mulia',
      description:
        'Pedagang batu akik dan permata umumnya menyediakan senter batu khusus dan tester kekerasan batu di tempat. Anda juga dapat menanyakan memo hasil uji laboratorium gemologi untuk permata bernilai tinggi.',
    },
    {
      id: 3,
      title: 'Jasa Ikat dan Resize Cincin di Tempat',
      description:
        'Bila Anda membeli batu lepasan (loose stone), beberapa kios di lantai dasar melayani jasa pemasangan ikat cincin berbahan perak bakar atau titanium yang selesai dalam 15–30 menit.',
    },
    {
      id: 4,
      title: 'Kemasan Khusus untuk Penerbangan',
      description:
        'Untuk pembelian oleh-oleh panganan seperti amplang atau mantau, mintalah kemasan dus khusus yang disegel rapi agar aman disimpan di bagasi kabin maupun bagasi terdaftar pesawat.',
    },
  ],
  building_rules: [
    {
      id: 1,
      title: 'Keamanan & Ketertiban',
      description:
        'Patuhi arahan petugas keamanan dan tata tertib gedung demi keselamatan serta kenyamanan seluruh pengunjung Plaza Kebun Sayur.',
    },
    {
      id: 2,
      title: 'Kenyamanan & Kebersihan',
      description:
        'Jagalah kebersihan bersama dengan membuang sampah pada tempat pemilahan yang tersedia di setiap koridor dan lantai gedung.',
    },
    {
      id: 3,
      title: 'Kawasan Tertib Merokok',
      description:
        'Merokok hanya diperkenankan di area terbuka yang telah ditentukan di luar koridor utama berpendingin ruangan.',
    },
    {
      id: 4,
      title: 'Keamanan Barang Bawaan',
      description:
        'Selalu jaga dan awasi barang bawaan pribadi Anda agar tidak tertinggal atau hilang selama beraktivitas di area Plaza Kebun Sayur. Laporkan segera ke Pos Keamanan jika memerlukan bantuan.',
    },
  ],
};

export const MOCK_NAV_ITEMS = {
  header: [
    { id: 1, label: 'BERANDA', path: '/', location: 'header', is_external: false, is_cta: false },
    { id: 2, label: 'BELANJA', path: '/belanja', location: 'header', is_external: false, is_cta: false },
    { id: 3, label: 'FASHION', path: '/fashion', location: 'header', is_external: false, is_cta: false },
    { id: 4, label: 'INFORMASI', path: '/informasi', location: 'header', is_external: false, is_cta: false },
    { id: 5, label: 'PANDUAN', path: '/panduan-kunjungan', location: 'header', is_external: false, is_cta: false },
    { id: 6, label: 'KONTAK', path: '/kontak', location: 'header', is_external: false, is_cta: false },
  ],
  footer: [
    { id: 7, label: 'Direktori Kios Belanja', path: '/belanja', location: 'footer', is_external: false },
    { id: 8, label: 'Sentra Fashion & Busana Khas', path: '/fashion', location: 'footer', is_external: false },
    { id: 9, label: 'Informasi & Promo Plaza', path: '/informasi', location: 'footer', is_external: false },
    { id: 10, label: 'Panduan Kunjungan Gedung', path: '/panduan-kunjungan', location: 'footer', is_external: false },
    { id: 11, label: 'Kontak & Pengaduan', path: '/kontak', location: 'footer', is_external: false },
  ],
};

export const MOCK_LEGAL_PAGES = {
  'kebijakan-privasi': {
    slug: 'kebijakan-privasi',
    title: 'Kebijakan Privasi',
    intro:
      'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).',
    updated_label: '11 Oktober 2026',
    body: `<h2>1. Pendahuluan &amp; Prinsip Perlindungan Data</h2>
<p>Pengelola Plaza Kebun Sayur Balikpapan berkomitmen penuh untuk menghormati, menjaga kerahasiaan, dan melindungi hak privasi setiap pengunjung situs direktori resmi ini.</p>
<p>Dokumen Kebijakan Privasi ini menjelaskan bagaimana data dan informasi pribadi Anda dikumpulkan, digunakan, disimpan, dan dilindungi saat mengakses portal web serta layanan informasi digital kami, sejalan dengan prinsip transparansi hukum Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>

<h2>2. Data Pribadi yang Kami Kumpulkan</h2>
<p>Kami hanya mengumpulkan data yang relevan dan terbatas sesuai tujuan operasional direktori:</p>
<ul>
    <li><strong>Data yang Diberikan Secara Sukarela:</strong> Saat Anda mengirimkan pesan melalui formulir pada halaman Kontak, data yang dikirimkan meliputi nama lengkap, nomor telepon (WhatsApp), alamat surat elektronik (email), dan isi pesan/pertanyaan Anda.</li>
    <li><strong>Data Teknis &amp; Akses:</strong> Informasi standar log peladen peramban web seperti alamat protokol internet (IP address), jenis perangkat keras, jenis peramban web, serta stempel waktu kunjungan untuk keperluan pemeliharaan stabilitas server dan keamanan infrastruktur situs.</li>
    <li><strong>Interaksi Tautan Eksternal WhatsApp:</strong> Saat Anda menekan tombol "Chat Penjual" atau "WhatsApp Pengelola", Anda akan dialihkan ke layanan pihak ketiga (WhatsApp by Meta). Kami tidak menyimpan isi percakapan pribadi atau rincian transaksi jual beli yang Anda lakukan secara langsung dengan pedagang.</li>
</ul>

<h2>3. Tujuan Pemrosesan Data</h2>
<p>Data yang dikumpulkan hanya diproses untuk tujuan-tujuan yang sah, yaitu:</p>
<ul>
    <li>Menanggapi pertanyaan, permintaan bantuan sewa ruang pameran, atau pengaduan fasilitas gedung yang Anda sampaikan.</li>
    <li>Memastikan keamanan teknis sistem situs dari percobaan serangan siber, akses tidak sah, dan aktivitas otomatis yang berbahaya (bot/spam).</li>
    <li>Menganalisis pola keterbacaan direktori kios dan kuliner secara agregat tanpa mengidentifikasi profil individu secara spesifik, guna meningkatkan kenyamanan navigasi pengunjung.</li>
</ul>

<h2>4. Keamanan &amp; Kerahasiaan Data</h2>
<p>Kami menerapkan langkah-langkah teknis dan organisasional yang memadai guna mencegah kehilangan, penyalahgunaan, atau pengubahan data pribadi:</p>
<ul>
    <li>Seluruh transmisi data dienkripsi menggunakan protokol aman Transport Layer Security (HTTPS/TLS).</li>
    <li>Akses terhadap pesan masuk pada sistem hanya diberikan kepada staf pengelola gedung yang berwenang.</li>
    <li>Kami tidak pernah memperjualbelikan, menyewakan, atau membagikan data kontak Anda kepada pihak ketiga mana pun untuk tujuan promosi komersial atau telemarketing.</li>
</ul>

<h2>5. Hak Anda sebagai Subjek Data Pribadi</h2>
<p>Sesuai Bab IV UU PDP Nomor 27 Tahun 2022, Anda memiliki hak-hak hukum berikut:</p>
<ul>
    <li><strong>Hak Akses:</strong> Mendapatkan konfirmasi dan informasi mengenai data pribadi Anda yang tersimpan di sistem kami.</li>
    <li><strong>Hak Koreksi:</strong> Meminta perbaikan data pribadi Anda jika terjadi kekeliruan atau ketidaklengkapan.</li>
    <li><strong>Hak Penghapusan (Right to Erasure):</strong> Meminta penghapusan riwayat data pesan atau kontak yang pernah Anda kirimkan.</li>
    <li><strong>Hak Penarikan Persetujuan:</strong> Menarik kembali persetujuan pemrosesan data pribadi yang sebelumnya telah diberikan.</li>
</ul>
<p>Untuk menggunakan hak-hak tersebut, Anda dapat menghubungi kantor manajemen pengelola melalui saluran kontak resmi yang tercantum di bagian akhir dokumen ini.</p>

<h2>6. Penggunaan Cookie &amp; Penyimpanan Lokal</h2>
<p>Situs ini hanya menggunakan cookie teknis esensial atau penyimpanan lokal peramban (Local Storage) untuk mengingat preferensi filter direktori kios dan kinerja navigasi. Situs ini tidak menggunakan cookie pelacak iklan pihak ketiga (third-party advertising trackers) yang memantau riwayat lintas situs Anda.</p>

<h2>7. Perubahan atas Kebijakan Privasi</h2>
<p>Pengelola Plaza Kebun Sayur dapat memperbarui dokumen kebijakan ini sewaktu-waktu guna menyesuaikan dengan perkembangan regulasi perundang-undangan atau penambahan fitur layanan situs. Setiap perubahan akan dicantumkan pada halaman ini dengan mencantumkan tanggal revisi terbaru di bagian atas.</p>`,
  },
  'syarat-ketentuan': {
    slug: 'syarat-ketentuan',
    title: 'Syarat & Ketentuan',
    intro:
      'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.',
    updated_label: '11 Oktober 2026',
    body: `<h2>1. Penerimaan Ketentuan</h2>
<p>Selamat datang di situs resmi Plaza Kebun Sayur (<a href="https://plazakebunsayur.com">plazakebunsayur.com</a>). Dengan mengakses, menjelajahi, atau memanfaatkan fitur direktori pada situs ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh seluruh Syarat &amp; Ketentuan Penggunaan ini.</p>
<p>Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak melanjutkan penggunaan situs ini.</p>

<h2>2. Peran &amp; Ruang Lingkup Layanan</h2>
<p>Situs ini dikelola sebagai portal profil komersial resmi dan direktori pedagang bagi pusat perniagaan Plaza Kebun Sayur, Balikpapan Barat. Fungsi utama situs ini adalah:</p>
<ul>
    <li>Menyediakan katalog informasi kios perhiasan, batu permata mulia, cinderamata etnik Dayak, kain batik khas Kalimantan, serta warung kuliner tradisional.</li>
    <li>Menyajikan informasi denah lantai, fasilitas umum gedung (toilet, musholla, pos satpam, ATM), dan panduan akses transportasi pengunjung.</li>
    <li>Mempublikasikan agenda pameran budaya, kontes batu akik Borneo, dan penawaran promo resmi gedung.</li>
    <li>Menghubungkan pengunjung secara langsung dengan kontak WhatsApp resmi masing-masing pedagang atau kantor pengelola gedung.</li>
</ul>

<h2>3. Ketentuan Transaksi &amp; Interaksi Kios (Pernyataan Pelepasan Tanggung Jawab)</h2>
<p>Harap diperhatikan dengan saksama mengenai batasan layanan komersial kami:</p>
<ul>
    <li><strong>Bukan Platform E-Commerce:</strong> Situs ini bukan toko daring (marketplace) dan tidak memproses pembayaran elektronik, rekening bersama (escrow), maupun jasa pengiriman barang secara langsung.</li>
    <li><strong>Transaksi Independen:</strong> Segala bentuk tawar-menawar, kesepakatan harga perhiasan, sertifikasi batu mulia, maupun metode pembayaran dilakukan secara mandiri antara pengunjung dan pemilik kios, baik saat bertatap muka di toko fisik maupun melalui percakapan WhatsApp.</li>
    <li><strong>Ketiadaan Komisi:</strong> Pengelola Plaza Kebun Sayur tidak memungut komisi atau bagian persentase dari transaksi jual-beli antara pedagang dan pembeli.</li>
</ul>

<h2>4. Hak Kekayaan Intelektual</h2>
<p>Seluruh materi yang terdapat pada situs ini, mencakup namun tidak terbatas pada struktur direktori, desain antarmuka, teks penjelasan, logo Plaza Kebun Sayur, dan dokumentasi foto adalah milik pengelola Plaza Kebun Sayur atau pemegang lisensi terkait yang dilindungi undang-undang hak cipta Republik Indonesia.</p>
<p>Pengguna dilarang menyalin, mendistribusikan ulang, mereproduksi, atau memanfaatkan konten situs ini untuk kepentingan komersial pihak ketiga tanpa persetujuan tertulis dari pihak pengelola.</p>

<h2>5. Batasan Penggunaan yang Wajar</h2>
<p>Dalam menggunakan situs ini, Anda setuju untuk tidak:</p>
<ul>
    <li>Melakukan penambangan data massal otomatis (automated scraping atau bot crawling) yang mengganggu stabilitas beban peladen situs.</li>
    <li>Mengirimkan pesan spam, muatan berbahaya, ancaman, atau pesan penipuan melalui formulir Kontak.</li>
    <li>Menyalahgunakan nomor kontak pedagang yang tertera untuk tujuan telemarketing tanpa izin, pelecehan, atau penipuan.</li>
    <li>Mencoba memperoleh akses tidak sah ke sistem peladen (server) atau basis data pengelola.</li>
</ul>

<h2>6. Batasan Tanggung Jawab (Limitation of Liability)</h2>
<p>Pengelola senantiasa berupaya menyajikan informasi direktori, nomor kios, dan jadwal operasional yang akurat serta mutakhir. Kendati demikian:</p>
<ul>
    <li>Pengelola tidak menjamin bahwa informasi jam buka kios atau ketersediaan stok barang tertentu selalu identik setiap hari, mengingat keputusan jam buka individual berada di bawah kendali masing-masing pedagang.</li>
    <li>Pengelola tidak bertanggung jawab atas kerugian materiil maupun immateriil yang timbul akibat perselisihan kesepakatan jual-beli independen antara pengunjung dan pedagang di luar gedung mall.</li>
</ul>

<h2>7. Hukum yang Berlaku &amp; Penyelesaian Sengketa</h2>
<p>Syarat &amp; Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul sehubungan dengan penggunaan situs ini akan diselesaikan secara musyawarah untuk mufakat terlebih dahulu, dan bila tidak tercapai titik temu, akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Kota Balikpapan.</p>`,
  },
};
