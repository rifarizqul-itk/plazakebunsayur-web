import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html tidak ditemukan. Jalankan vite build terlebih dahulu.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

function injectMeta(html, { title, description, image, url, schema }) {
  let result = html;

  // Replace Title
  result = result.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  );

  // Inject Meta & Open Graph Tags before </head>
  const metaTags = `
    <!-- Pre-rendered SEO Meta Tags -->
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta property="og:site_name" content="Plaza Kebun Sayur Balikpapan">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
  `;

  return result.replace('</head>', `${metaTags}\n  </head>`);
}

function writeHtml(targetPath, content) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, content, 'utf8');
}

async function fetchTenants() {
  const apiUrl = process.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  const allTenants = [];
  try {
    let page = 1;
    let lastPage = 1;
    do {
      const res = await fetch(`${apiUrl}/tenants?per_page=100&page=${page}`, {
        headers: { 'ngrok-skip-browser-warning': '1' },
      });
      if (!res.ok) break;
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        allTenants.push(...json.data);
      }
      lastPage = json.meta?.last_page || 1;
      page++;
    } while (page <= lastPage);

    if (allTenants.length > 0) {
      console.log(`📡 Berhasil mengambil ${allTenants.length} tenant dari backend API`);
      return allTenants;
    }
  } catch (err) {
    console.log(`ℹ️ Backend API tidak merespons (${err.message}), beralih ke dataset lokal.`);
  }

  // Fallback to local data
  try {
    const mockModule = await import('../src/data/mockData.js');
    return mockModule.MOCK_TENANTS || mockModule.mockTenants || [];
  } catch (err) {
    console.warn('⚠️ Gagal membaca mockData:', err.message);
    return [];
  }
}

async function fetchPageContents() {
  const apiUrl = process.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  try {
    const res = await fetch(`${apiUrl}/page-contents`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Object.keys(json.data).length > 0) {
        console.log(`📡 Berhasil mengambil CMS page-contents dari backend API`);
        return json.data;
      }
    }
  } catch {
    // Fallback quietly to mock data
  }

  try {
    const mockModule = await import('../src/data/mockData.js');
    return mockModule.MOCK_PAGE_CONTENTS || {};
  } catch {
    return {};
  }
}

async function main() {
  console.log('🚀 Memulai proses Pre-render SSG untuk SEO...');

  const contents = await fetchPageContents();
  const defaultOgImage = contents['seo.default_og_image'] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';

  // 0. Update Root Home index.html
  const homeTitle = contents['seo.home.title'] || 'Plaza Kebun Sayur Balikpapan | Sentra Kerajinan & Batu Mulia Borneo';
  const homeDesc = contents['seo.home.description'] || 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik, dan kuliner khas Kalimantan Timur.';
  const homeHtml = injectMeta(template, {
    title: homeTitle,
    description: homeDesc,
    image: defaultOgImage,
    url: 'https://plazakebunsayur.com/',
  });
  writeHtml(templatePath, homeHtml);
  console.log('  📄 Pre-rendered / (Beranda)');

  // 1. Static Pages
  const staticPages = [
    {
      route: 'belanja',
      title: contents['seo.belanja.title'] || 'Direktori Belanja & Batu Mulia - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.belanja.description'] || 'Temukan koleksi permata, batu akik, perhiasan emas perak, dan kerajinan Dayak khas Kalimantan di Plaza Kebun Sayur.',
      image: defaultOgImage,
      url: 'https://plazakebunsayur.com/belanja',
    },
    {
      route: 'kuliner',
      title: contents['seo.kuliner.title'] || 'Sentra Kuliner Khas Kaltim - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.kuliner.description'] || 'Nikmati Soto Banjar legendaris, Mantau Sapi, kepiting Dandito, amplang kuku macan, dan kuliner khas Balikpapan di Sentra Kuliner Plaza Bunsay.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      url: 'https://plazakebunsayur.com/kuliner',
    },
    {
      route: 'agenda',
      title: contents['seo.agenda.title'] || 'Agenda & Kegiatan Budaya - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.agenda.description'] || 'Informasi pameran batu mulia, pentas seni Dayak, festival kuliner, dan kegiatan terbaru di Plaza Kebun Sayur.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      url: 'https://plazakebunsayur.com/agenda',
    },
    {
      route: 'panduan-kunjungan',
      title: contents['seo.panduan.title'] || 'Panduan Kunjungan & Fasilitas - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.panduan.description'] || 'Rute transportasi, tips menawar ramah, informasi parkir, musholla, dan fasilitas lengkap untuk wisatawan di Plaza Kebun Sayur.',
      image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=1200&q=80',
      url: 'https://plazakebunsayur.com/panduan-kunjungan',
    },
    {
      route: 'kontak',
      title: contents['seo.kontak.title'] || 'Hubungi Kami - Pengelola Plaza Kebun Sayur Balikpapan',
      description: contents['seo.kontak.description'] || 'Hubungi pengelola gedung Plaza Kebun Sayur untuk informasi kemitraan, direktori kios, layanan informasi, dan kritik/saran.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      url: 'https://plazakebunsayur.com/kontak',
    },
    {
      route: 'kebijakan-privasi',
      title: contents['seo.privacy.title'] || 'Kebijakan Privasi - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.privacy.description'] || 'Komitmen perlindungan data pribadi dan transparansi pemrosesan data pengunjung sesuai UU No. 27 Tahun 2022 di Plaza Kebun Sayur.',
      image: defaultOgImage,
      url: 'https://plazakebunsayur.com/kebijakan-privasi',
    },
    {
      route: 'syarat-ketentuan',
      title: contents['seo.terms.title'] || 'Syarat & Ketentuan Penggunaan - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.terms.description'] || 'Syarat dan ketentuan penggunaan situs direktori komersial, batasan tanggung jawab transaksi kios, dan hak cipta di Plaza Kebun Sayur.',
      image: defaultOgImage,
      url: 'https://plazakebunsayur.com/syarat-ketentuan',
    },
  ];

  for (const page of staticPages) {
    const pageHtml = injectMeta(template, page);
    const dest = path.join(distDir, page.route, 'index.html');
    writeHtml(dest, pageHtml);
    console.log(`  📄 Pre-rendered /${page.route}`);
  }

  // 2. Tenant Dynamic Pages
  const tenants = await fetchTenants();
  let count = 0;

  for (const tenant of tenants) {
    const isCulinary = tenant.category?.type === 'culinary';
    const folder = isCulinary ? 'kuliner' : 'belanja';
    const pageUrl = `https://plazakebunsayur.com/${folder}/${tenant.slug}`;
    const cleanDesc = (tenant.description || `Kunjungi toko ${tenant.name} di ${tenant.floor?.name || 'Plaza Kebun Sayur Balikpapan'}`).replace(/\s+/g, ' ').slice(0, 155);
    const photoUrl = tenant.image_url || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';

    const schema = {
      '@context': 'https://schema.org',
      '@type': isCulinary ? 'Restaurant' : 'Store',
      'name': tenant.name,
      'description': tenant.description,
      'image': photoUrl,
      'telephone': tenant.phone_whatsapp,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `Unit ${tenant.unit_number || '-'}, Jl. Letjen Suprapto, Baru Ilir`,
        'addressLocality': 'Balikpapan Barat',
        'addressRegion': 'Kalimantan Timur',
        'postalCode': '76131',
        'addressCountry': 'ID',
      },
      'openingHours': `${tenant.opening_time || '09:00'}-${tenant.closing_time || '21:00'}`,
    };

    const tenantHtml = injectMeta(template, {
      title: `${tenant.name} - Plaza Kebun Sayur Balikpapan`,
      description: cleanDesc,
      image: photoUrl,
      url: pageUrl,
      schema,
    });

    const dest = path.join(distDir, folder, tenant.slug, 'index.html');
    writeHtml(dest, tenantHtml);
    count++;
  }

  console.log(`✨ Sukses melakukan pre-rendering ${count} halaman kios/stan dinamis!`);
  console.log('🎉 Pre-rendering selesai dengan sempurna!');
}

main().catch((err) => {
  console.error('❌ Gagal menjalankan prerender:', err);
  process.exit(1);
});
