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
  { id: 6, name: 'Oleh-Oleh Khas Kaltim', slug: 'oleh-oleh-khas-kaltim', type: 'culinary', icon_name: 'PackageOpen', description: 'Amplang kuku macan gurih, mantau Balikpapan, dan lempok durian asli.' },
  { id: 7, name: 'Makanan Berat & Soto', slug: 'makanan-berat-dan-soto', type: 'culinary', icon_name: 'UtensilsCrossed', description: 'Soto Banjar ayam kampung, nasi kuning bumbu habang, dan olahan kepiting.' },
  { id: 8, name: 'Kudapan & Minuman Tradisional', slug: 'kudapan-dan-minuman-tradisional', type: 'culinary', icon_name: 'Coffee', description: 'Bingka kentang bakar, es kelapa jeruk, dan seduhan kopi Borneo harum.' },
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
    phone_whatsapp: '080000000000',
    instagram: '@permataborneo.bunsay',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
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
    phone_whatsapp: '080000000000',
    instagram: '@mustikasafir_kaltim',
    opening_time: '09:30:00',
    closing_time: '17:30:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
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
    phone_whatsapp: '080000000000',
    instagram: '@emas_sejahterabunsay',
    opening_time: '08:30:00',
    closing_time: '17:00:00',
    days_open: 'Senin - Sabtu',
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
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
    phone_whatsapp: '080000000000',
    instagram: '@dayakart_kebunsayur',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80',
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
    phone_whatsapp: '080000000000',
    instagram: '@batikampiek.official',
    opening_time: '09:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
  {
    id: 6,
    name: 'Oleh-Oleh Amplang Kuku Macan Ibu Ani',
    slug: 'oleh-oleh-amplang-ibu-ani',
    category_id: 6,
    floor_id: 1,
    category: { id: 6, name: 'Oleh-Oleh Khas Kaltim', slug: 'oleh-oleh-khas-kaltim', type: 'culinary' },
    floor: { id: 1, name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok E No. 01',
    description: 'Amplang tenggiri khas Balikpapan gurih dan renyah. Sedia juga mantau kukus, lempok durian asli kutai, dan abon kepiting.',
    phone_whatsapp: '080000000000',
    instagram: '@amplangkukumacani',
    opening_time: '08:00:00',
    closing_time: '20:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
  {
    id: 7,
    name: 'Warung Soto Banjar H. Ridwan',
    slug: 'warung-soto-banjar-h-ridwan',
    category_id: 7,
    floor_id: 3,
    category: { id: 7, name: 'Makanan Berat & Soto', slug: 'makanan-berat-dan-soto', type: 'culinary' },
    floor: { id: 3, name: 'Lantai 2', code: 'L2' },
    unit_number: 'Food Court No. 02',
    description: 'Soto Banjar legendaris kuah susu rempah wangi dengan suwiran ayam kampung, telur bebek rebus, dan perkedel singkong renyah.',
    phone_whatsapp: '080000000000',
    instagram: '@sotobanjar.ridwan',
    opening_time: '08:00:00',
    closing_time: '18:00:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
  {
    id: 8,
    name: 'Kedai Kopi Khas Paser',
    slug: 'kedai-kopi-khas-paser',
    category_id: 8,
    floor_id: 3,
    category: { id: 8, name: 'Kudapan & Minuman Tradisional', slug: 'kudapan-dan-minuman-tradisional', type: 'culinary' },
    floor: { id: 3, name: 'Lantai 2', code: 'L2' },
    unit_number: 'Food Court No. 14',
    description: 'Seduhan kopi robusta biji lokal Kaltim racikan saring tradisional, pisang gapit sirup gula merah wangi pandan, dan singkong goreng sambal roa.',
    phone_whatsapp: '080000000000',
    instagram: '@kopipaser_bunsay',
    opening_time: '08:30:00',
    closing_time: '19:30:00',
    days_open: 'Setiap Hari (Senin - Minggu)',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
];

export const MOCK_FACILITIES = [
  {
    id: 1,
    name: 'Musholla Nyaman',
    icon_name: 'Moon',
    location_note: 'Lantai 2 Barat',
    description: 'Tempat ibadah yang bersih dan terawat dengan area wudhu terpisah untuk kenyamanan pengunjung muslim.',
  },
  {
    id: 2,
    name: 'Toilet Bersih & Difabel',
    icon_name: 'Users',
    location_note: 'Lantai Dasar & Lantai 1',
    description: 'Fasilitas sanitasi yang rutin dibersihkan setiap jam, dilengkapi akses toilet ramah disabilitas.',
  },
  {
    id: 3,
    name: 'ATM Center Terpadu',
    icon_name: 'CreditCard',
    location_note: 'Lantai Dasar Pintu Timur',
    description: 'Kemudahan transaksi dengan ATM Bank Mandiri, BCA, BRI, dan Bank Kaltimtara.',
  },
  {
    id: 4,
    name: 'Area Parkir Luas',
    icon_name: 'Car',
    location_note: 'Halaman Depan & Belakang',
    description: 'Lahan parkir kendaraan roda 2 dan roda 4 yang luas dengan sistem karcis dan penjagaan satpam terpadu.',
  },
  {
    id: 5,
    name: 'Pos Keamanan & Informasi',
    icon_name: 'ShieldCheck',
    location_note: 'Lobby Utama Gedung',
    description: 'Petugas keamanan (Satpam) siaga siap membantu arah denah kios dan kenyamanan pengunjung.',
  },
  {
    id: 6,
    name: 'Food Court Kuliner Kaltim',
    icon_name: 'Utensils',
    location_note: 'Lantai 2 Sisi Timur',
    description: 'Pusat istirahat bersantap dengan aneka pilihan es kelapa, soto banjar, nasi kuning, dan camilan khas Balikpapan.',
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
    banner_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Pameran akbar koleksi permata nusantara, kontes batu akik Borneo, dan pentas seni tradisional Dayak.',
    content: 'Sambut semarak Festival Budaya Plaza Kebun Sayur! Dimeriahkan oleh puluhan kolektor batu akik se-Kalimantan, demonstrasi ukiran mandau langsung, serta promo suvenir khas Kalimantan Timur.',
    highlights: [
      'Pameran lebih dari 500 koleksi batu akik & permata alam langka se-Borneo (Red Borneo, Kecubung, Jamrud).',
      'Kontes dan uji keaslian batu mulia dengan sertifikasi gemologi langsung di tempat.',
      'Pertunjukan musik petik Sape dan tarian tradisional Dayak Kenyah setiap sore.',
      'Demonstrasi langsung pembuatan ukiran kayu ulin dan pengrajin ikat cincin perak.',
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
    location: 'Kios Cinderamata, Batik & Kuliner Berpartisipasi',
    admission: 'Promo Belanja Langsung',
    banner_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    summary: 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau perhiasan minimal Rp 500.000.',
    content: 'Menyambut para delegasi dan wisatawan Nusantara ke Balikpapan dan kawasan IKN, puluhan kios cinderamata dan pengrajin lokal memberikan penawaran suvenir spesial serta kemasan siap bagasi penerbangan.',
    highlights: [
      'Gratis suvenir gantungan kunci manik Dayak eksklusif dengan belanja minimal Rp 500.000.',
      'Diskon spesial hingga 20% untuk pembelian kain tenun dan batik motif mangrove Balikpapan.',
      'Kemasan khusus dus siap bagasi pesawat untuk produk oleh-oleh khas dan kerajinan.',
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
};

export const MOCK_PAGE_CONTENTS = {
  'home.hero.eyebrow': 'Sentra Kerajinan Tradisional & Batu Mulia Balikpapan',
  'home.hero.title': 'Pusat Cinderamata & Pesona Budaya Borneo',
  'home.hero.subtitle': 'Temukan koleksi batu akik, permata langka, kerajinan etnik Dayak, kain batik khas, dan kuliner tradisional Kalimantan Timur di jantung Balikpapan Barat.',
  'home.hero.cta_primary': 'Jelajahi Direktori Kios',
  'home.hero.cta_secondary': 'Sentra Kuliner Khas',
  'home.hero.image': '/assets/Photograph_of_plaza_building.webp',
  'home.featured.eyebrow': 'Pilihan Pengunjung',
  'home.featured.title': 'Kios Pilihan & Rekomendasi Unggulan',
  'home.featured.description': 'Rekomendasi kios kerajinan, perhiasan, dan kuliner terfavorit yang wajib Anda kunjungi saat berada di Plaza Kebun Sayur.',
  'home.history.eyebrow': 'Warisan Budaya Balikpapan',
  'home.history.title': 'Sejarah & Perjalanan Pasar Inpres Kebun Sayur',
  'home.history.p1': 'Berdiri sejak puluhan tahun silam di kawasan Balikpapan Barat, Pasar Inpres Kebun Sayur telah tumbuh menjadi ikon wisata belanja budaya utama di Kalimantan Timur. Dikenal luas oleh wisatawan nusantara hingga mancanegara sebagai sentra perniagaan batu mulia dan kerajinan otentik Dayak.',
  'home.history.p2': 'Kini hadir dengan bangunan modern Plaza Kebun Sayur yang nyaman, gedung ini tetap merawat denyut ekonomi rakyat dan keaslian tradisi lokal. Setiap sudut kios menyimpan cerita ketekunan para pengrajin dan pedagang yang setia melestarikan warisan bumi Borneo.',
  'home.history.image': '/assets/Photograph_of_plaza_building.webp',
  'home.quick_access.title': 'Akses Cepat Direktori',
  'home.quick_access.description': 'Temukan kios belanja favorit, stan kuliner khas, jadwal kegiatan pameran, dan informasi rute kunjungan Anda.',
  'home.events.title': 'Agenda & Kegiatan Mendatang',
  'home.events.description': 'Informasi pameran batu mulia, pentas seni budaya Dayak, dan promo menarik dari pedagang pasar.',
  'header.belanja.eyebrow': 'Katalog Pedagang',
  'header.belanja.title': 'Direktori Kios Belanja',
  'header.belanja.description': 'Jelajahi kios batu mulia, perhiasan emas dan perak, cinderamata khas Dayak, serta batik Kalimantan di Plaza Kebun Sayur.',
  'header.kuliner.eyebrow': 'Sentra Kuliner Lokal',
  'header.kuliner.title': 'Pusat Jajanan & Oleh-Oleh Khas',
  'header.kuliner.description': 'Nikmati aneka panganan tradisional Kalimantan Timur, mulai dari amplang renyah, bingka kentang, mantau, hingga kopi lokal.',
  'header.agenda.eyebrow': 'Agenda & Pengumuman',
  'header.agenda.title': 'Agenda Kegiatan & Promo Pasar',
  'header.agenda.description': 'Temukan informasi pameran batu akik, pergelaran seni etnik Dayak, bazar diskon cinderamata, serta pengumuman resmi pengelola mall.',
  'header.panduan.eyebrow': 'Panduan & Informasi Gedung',
  'header.panduan.title': 'Rencanakan Kunjungan Anda',
  'header.panduan.description': 'Panduan terpadu jam operasional, rute transportasi dari bandara dan pelabuhan, fasilitas umum, serta tata tertib di Plaza Kebun Sayur Balikpapan.',
  'header.kontak.eyebrow': 'Pusat Bantuan & Pengaduan',
  'header.kontak.title': 'Hubungi Pengelola Gedung',
  'header.kontak.description': 'Layanan informasi sewa kios, informasi pameran, kehilangan barang, serta saran dan kritik untuk kenyamanan pengunjung Plaza Kebun Sayur.',
  'header.privacy.eyebrow': 'Informasi Legal & Kepatuhan',
  'header.privacy.title': 'Kebijakan Privasi',
  'header.privacy.description': 'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).',
  'header.terms.eyebrow': 'Informasi Legal & Kepatuhan',
  'header.terms.title': 'Syarat & Ketentuan',
  'header.terms.description': 'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.',
  'footer.mall_description': 'Pusat perniagaan Pasar Inpres Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, batik, dan kuliner khas.',
  'footer.management_title': 'Kantor Pengelola',
  'footer.management_description': 'Kantor manajemen berlokasi di Lantai Dasar (Pintu Timur). Melayani informasi kios, ketertiban, dan layanan pengunjung.',
  'brand.logo': '/assets/main_logo_transparent_for_light_bg.webp',
  'seo.default_og_image': '/assets/Photograph_of_plaza_building.webp',
  'seo.home.title': 'Plaza Kebun Sayur Balikpapan | Sentra Kerajinan & Batu Mulia Borneo',
  'seo.home.description': 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik, dan kuliner khas Kalimantan Timur.',
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
        'Tradisi berniaga di Pasar Inpres mengedepankan keramahan dan kekeluargaan. Silakan berdiskusi dan menawar harga cinderamata secara wajar dengan para pedagang kios.',
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
      title: 'Kenyamanan & Kebersihan',
      description:
        'Jagalah kebersihan bersama dengan membuang sampah pada tempat pemilahan yang tersedia di setiap koridor dan lantai gedung.',
    },
    {
      id: 2,
      title: 'Kawasan Tertib Merokok',
      description:
        'Merokok hanya diperkenankan di area terbuka yang telah ditentukan di luar koridor utama berpendingin ruangan.',
    },
    {
      id: 3,
      title: 'Keamanan Barang Bawaan',
      description:
        'Selalu awasi barang bawaan dan tas pribadi Anda saat berada di keramaian sentra belanja. Laporkan segera ke Pos Keamanan jika menemui hal mencurigakan.',
    },
  ],
};

export const MOCK_NAV_ITEMS = {
  header: [
    { id: 1, label: 'BERANDA', path: '/', location: 'header', is_external: false, is_cta: false },
    { id: 2, label: 'BELANJA', path: '/belanja', location: 'header', is_external: false, is_cta: false },
    { id: 3, label: 'KULINER', path: '/kuliner', location: 'header', is_external: false, is_cta: false },
    { id: 4, label: 'AGENDA', path: '/agenda', location: 'header', is_external: false, is_cta: false },
    { id: 5, label: 'PANDUAN', path: '/panduan-kunjungan', location: 'header', is_external: false, is_cta: false },
    { id: 6, label: 'KONTAK', path: '/kontak', location: 'header', is_external: false, is_cta: false },
  ],
  footer: [
    { id: 7, label: 'Direktori Kios Belanja', path: '/belanja', location: 'footer', is_external: false },
    { id: 8, label: 'Sentra Kuliner Tradisional', path: '/kuliner', location: 'footer', is_external: false },
    { id: 9, label: 'Agenda & Promo Pasar', path: '/agenda', location: 'footer', is_external: false },
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
<p>Pengelola Plaza Kebun Sayur (Pasar Inpres Kebun Sayur Balikpapan) berkomitmen penuh untuk menghormati, menjaga kerahasiaan, dan melindungi hak privasi setiap pengunjung situs direktori resmi ini.</p>
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
<p>Situs ini dikelola sebagai portal profil komersial resmi dan direktori pedagang bagi pusat perniagaan Plaza Kebun Sayur (Pasar Inpres Kebun Sayur, Balikpapan Barat). Fungsi utama situs ini adalah:</p>
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


