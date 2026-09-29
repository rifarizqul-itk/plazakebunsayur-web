const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Fallback seed data in case backend server is offline during development/preview
const FALLBACK_CATEGORIES = [
  { id: 1, name: 'Batu Mulia & Akik', slug: 'batu-mulia-dan-akik', icon: 'Gem', description: 'Pusat koleksi batu akik Kalimantan, kecubung wulung, red borneo, dan aneka permata.' },
  { id: 2, name: 'Perhiasan Emas & Perak', slug: 'perhiasan-emas-dan-perak', icon: 'Sparkles', description: 'Deretan toko emas terpercaya, perak bakar, dan custom cincin pernikahan.' },
  { id: 3, name: 'Kerajinan Dayak & Souvenir', slug: 'kerajinan-dayak-dan-souvenir', icon: 'ShoppingBag', description: 'Mandau asli, tameng motif Dayak, tas manik-manik, dan gelang ulin.' },
  { id: 4, name: 'Batik & Songket Kaltim', slug: 'batik-dan-songket-kaltim', icon: 'Shirt', description: 'Batik motif mangrove Balikpapan dan sarung tenun Samarinda asli.' },
  { id: 5, name: 'Oleh-Oleh & Kuliner Tradisional', slug: 'oleh-oleh-dan-kuliner-tradisional', icon: 'UtensilsCrossed', description: 'Amplang kuku macan gurih, mantau Balikpapan, dan lempok durian.' },
  { id: 6, name: 'Jasa & Reparasi', slug: 'jasa-dan-reparasi', icon: 'Wrench', description: 'Jasa gosok batu akik, patri emas, cuci perhiasan, dan penjahit adat.' },
];

const FALLBACK_FLOORS = [
  { id: 1, name: 'Lantai Dasar (Ground Floor)', code: 'GF' },
  { id: 2, name: 'Lantai 1', code: 'L1' },
  { id: 3, name: 'Lantai 2', code: 'L2' },
];

const FALLBACK_TENANTS = [
  {
    id: 1,
    name: 'Permata Borneo Gems',
    slug: 'permata-borneo-gems',
    category_id: 1,
    floor_id: 1,
    category: { name: 'Batu Mulia & Akik' },
    floor: { name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok A No. 04',
    description: 'Menyediakan aneka batu akik asli Kalimantan: Red Borneo, Kecubung Pangkalan Bun, Giok Sojol, serta jasa ikat cincin perak & titanium.',
    phone_whatsapp: '6281234567801',
    instagram: '@permataborneo.bunsay',
    opening_hours: '09:00 - 18:00 WITA',
    is_featured: true,
  },
  {
    id: 2,
    name: 'Galeri Mustika Safir',
    slug: 'galeri-mustika-safir',
    category_id: 1,
    floor_id: 1,
    category: { name: 'Batu Mulia & Akik' },
    floor: { name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok A No. 11',
    description: 'Spesialis batu mulia natural: Safir Ceylon, Zamrud Kolombia, Ruby Burma, dan pengujian keaslian lab gemologi.',
    phone_whatsapp: '6281234567802',
    instagram: '@mustikasafir_kaltim',
    opening_hours: '09:30 - 17:30 WITA',
    is_featured: true,
  },
  {
    id: 3,
    name: 'Toko Emas Sejahtera Sayur',
    slug: 'toko-emas-sejahtera-sayur',
    category_id: 2,
    floor_id: 1,
    category: { name: 'Perhiasan Emas & Perak' },
    floor: { name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok B No. 01 - 02',
    description: 'Pusat jual beli perhiasan emas kadar 700, 750, dan 999. Model kalung, gelang, dan cincin pengantin terkini dengan sertifikat resmi.',
    phone_whatsapp: '6281234567803',
    instagram: '@emas_sejahterabunsay',
    opening_hours: '08:30 - 17:00 WITA',
    is_featured: true,
  },
  {
    id: 4,
    name: 'Art Shop Dayak Kenyah',
    slug: 'art-shop-dayak-kenyah',
    category_id: 3,
    floor_id: 2,
    category: { name: 'Kerajinan Dayak & Souvenir' },
    floor: { name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok C No. 08',
    description: 'Pusat kerajinan seni suku Dayak terlengkap: Mandau tradisional gagang tanduk, tameng motif etnik, tas anyaman manik, dan gelang kayu ulin asli.',
    phone_whatsapp: '6281234567804',
    instagram: '@dayakart_kebunsayur',
    opening_hours: '09:00 - 18:00 WITA',
    is_featured: true,
  },
  {
    id: 5,
    name: 'Kios Cinderamata Mahakam',
    slug: 'kios-cinderamata-mahakam',
    category_id: 3,
    floor_id: 2,
    category: { name: 'Kerajinan Dayak & Souvenir' },
    floor: { name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok C No. 15',
    description: 'Aneka miniatur rumah betang, gantungan kunci manik, kaos Balikpapan Beriman, dan gelang akar bahar.',
    phone_whatsapp: '6281234567805',
    instagram: '@souvenirs_kebunsayur',
    opening_hours: '09:00 - 18:30 WITA',
    is_featured: false,
  },
  {
    id: 6,
    name: 'Batik Ampiek Khas Balikpapan',
    slug: 'batik-ampiek-khas-balikpapan',
    category_id: 4,
    floor_id: 2,
    category: { name: 'Batik & Songket Kaltim' },
    floor: { name: 'Lantai 1', code: 'L1' },
    unit_number: 'Blok D No. 03',
    description: 'Pelopor batik khas Balikpapan bermotif kepiting, mangrove, dan corak etnik Kalimantan. Bahan katun halus dan sutra premium.',
    phone_whatsapp: '6281234567806',
    instagram: '@batikampiek.official',
    opening_hours: '09:00 - 18:00 WITA',
    is_featured: true,
  },
  {
    id: 7,
    name: 'Oleh-Oleh Amplang Kuku Macan Ibu Ani',
    slug: 'oleh-oleh-amplang-ibu-ani',
    category_id: 5,
    floor_id: 1,
    category: { name: 'Oleh-Oleh & Kuliner Tradisional' },
    floor: { name: 'Lantai Dasar (GF)', code: 'GF' },
    unit_number: 'Blok E No. 01',
    description: 'Amplang tenggiri khas Balikpapan gurih dan renyah. Sedia juga mantau kukus, lempok durian asli kutai, dan abon kepiting.',
    phone_whatsapp: '6281234567807',
    instagram: '@amplangkukumacani',
    opening_hours: '08:00 - 20:00 WITA',
    is_featured: true,
  },
  {
    id: 8,
    name: 'Bengkel Poles Batu Borneo',
    slug: 'bengkel-poles-batu-borneo',
    category_id: 6,
    floor_id: 3,
    category: { name: 'Jasa & Reparasi' },
    floor: { name: 'Lantai 2', code: 'L2' },
    unit_number: 'Blok F No. 05',
    description: 'Melayani potong bongkahan batu, asah mata cincin cabochon/faceted, serta pasang cangkang perak perhiasan.',
    phone_whatsapp: '6281234567808',
    instagram: null,
    opening_hours: '10:00 - 17:00 WITA',
    is_featured: false,
  },
];

const FALLBACK_FACILITIES = [
  {
    id: 1,
    name: 'Musholla As-Salam',
    icon_name: 'Home',
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
    description: 'Petugas keamanan (Satpam) siaga 24 jam siap membantu arah denah kios dan kenyamanan pengunjung.',
  },
  {
    id: 6,
    name: 'Food Court Kuliner Kaltim',
    icon_name: 'Coffee',
    location_note: 'Lantai 2 Sisi Timur',
    description: 'Pusat istirahat bersantap dengan aneka pilihan es kelapa, soto banjar, nasi kuning, dan camilan khas Balikpapan.',
  },
];

const FALLBACK_WHATS_ON = [
  {
    id: 1,
    title: 'Festival Pesona Budaya & Batu Mulia Balikpapan 2026',
    slug: 'festival-pesona-budaya-batu-mulia-2026',
    type: 'event',
    start_date: '2026-10-10',
    end_date: '2026-10-15',
    summary: 'Pameran akbar koleksi permata nusantara, kontes batu akik Borneo, dan pentas seni tradisional Dayak.',
  },
  {
    id: 2,
    title: 'Promo Wisata Cinderamata IKN & Nusantara',
    slug: 'promo-wisata-cinderamata-ikn',
    type: 'promo',
    start_date: '2026-09-01',
    end_date: '2026-10-31',
    summary: 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau perhiasan minimal Rp 500.000.',
  },
];

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Using fallback categories:', err.message);
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchFloors() {
  try {
    const res = await fetch(`${API_BASE_URL}/floors`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Using fallback floors:', err.message);
    return FALLBACK_FLOORS;
  }
}

export async function fetchTenants(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/tenants?${query}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Using fallback tenants:', err.message);
    let filtered = [...FALLBACK_TENANTS];
    if (params.category_id) {
      filtered = filtered.filter(t => t.category_id === Number(params.category_id));
    }
    if (params.floor_id) {
      filtered = filtered.filter(t => t.floor_id === Number(params.floor_id));
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.unit_number.toLowerCase().includes(q)
      );
    }
    return filtered;
  }
}

export async function fetchFacilities() {
  try {
    const res = await fetch(`${API_BASE_URL}/facilities`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Using fallback facilities:', err.message);
    return FALLBACK_FACILITIES;
  }
}

export async function fetchWhatsOn() {
  try {
    const res = await fetch(`${API_BASE_URL}/whats-on`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Using fallback whats-on:', err.message);
    return FALLBACK_WHATS_ON;
  }
}

export async function submitSpaceEnquiry(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/space-enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengirim pengajuan sewa.');
    return result;
  } catch (err) {
    console.warn('Space enquiry submission error:', err);
    throw err;
  }
}
