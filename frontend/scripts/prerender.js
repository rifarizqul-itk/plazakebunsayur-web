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

  result = result.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  );

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

function writeRedirectHtml(targetPath, targetUrl) {
  const content = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <title>Mengalihkan...</title>
</head>
<body>
  <p>Mengalihkan ke <a href="${targetUrl}">${targetUrl}</a>...</p>
</body>
</html>`;
  writeHtml(targetPath, content);
}

async function fetchApiData(endpoint) {
  const apiUrl = process.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
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
      if (Array.isArray(json.data) && json.data.length > 0) {
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

  try {
    const mockModule = await import('../src/data/mockData.js');
    return mockModule.MOCK_TENANTS || mockModule.mockTenants || [];
  } catch (err) {
    console.warn('⚠️ Gagal membaca mockData:', err.message);
    return [];
  }
}

async function fetchWhatsOnItems() {
  const data = await fetchApiData('/whats-on?per_page=100');
  if (Array.isArray(data) && data.length > 0) {
    console.log(`📡 Berhasil mengambil ${data.length} agenda/informasi dari backend API`);
    return data;
  }

  try {
    const mockModule = await import('../src/data/mockData.js');
    return mockModule.MOCK_WHATS_ON || [];
  } catch {
    return [];
  }
}

async function fetchPageContents() {
  const data = await fetchApiData('/page-contents');
  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    console.log('📡 Berhasil mengambil CMS page-contents dari backend API');
    return data;
  }

  try {
    const mockModule = await import('../src/data/mockData.js');
    return mockModule.DEFAULT_PAGE_CONTENTS || {};
  } catch {
    return {};
  }
}

function buildStaticPages(contents, defaultOgImage) {
  return [
    {
      route: 'belanja',
      title: contents['seo.belanja.title'] || 'Direktori Belanja & Batu Mulia - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.belanja.description'] || 'Temukan koleksi permata, batu akik, perhiasan emas perak, dan kerajinan Dayak khas Kalimantan di Plaza Kebun Sayur.',
      image: defaultOgImage,
      url: 'https://plazakebunsayur.com/belanja',
    },
    {
      route: 'fashion',
      title: contents['seo.fashion.title'] || 'Sentra Fashion & Busana Khas - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.fashion.description'] || 'Temukan koleksi batik Kalimantan, tenun ikat, busana adat Dayak, pakaian modern, dan aksesoris pilihan di Plaza Kebun Sayur.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      url: 'https://plazakebunsayur.com/fashion',
    },
    {
      route: 'informasi',
      title: contents['seo.informasi.title'] || contents['seo.agenda.title'] || 'Pusat Informasi & Promo Plaza - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.informasi.description'] || contents['seo.agenda.description'] || 'Informasi pameran batu mulia, pentas seni Dayak, bazar cinderamata, serta pengumuman promo spesial kios di Plaza Kebun Sayur.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      url: 'https://plazakebunsayur.com/informasi',
    },
    {
      route: 'panduan-kunjungan',
      title: contents['seo.panduan.title'] || 'Panduan Kunjungan & Fasilitas - Plaza Kebun Sayur Balikpapan',
      description: contents['seo.panduan.description'] || 'Informasi fasilitas gedung, jam operasional, pos keamanan, musholla, dan panduan lengkap untuk wisatawan di Plaza Kebun Sayur.',
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
}

function renderStaticPages(staticPages) {
  for (const page of staticPages) {
    const pageHtml = injectMeta(template, page);
    const dest = path.join(distDir, page.route, 'index.html');
    writeHtml(dest, pageHtml);
    console.log(`  📄 Pre-rendered /${page.route}`);
  }
}

function renderLegacyRedirects() {
  writeRedirectHtml(path.join(distDir, 'kuliner', 'index.html'), 'https://plazakebunsayur.com/fashion');
  writeRedirectHtml(path.join(distDir, 'agenda', 'index.html'), 'https://plazakebunsayur.com/informasi');
  console.log('  🔄 Generated legacy redirects: /kuliner -> /fashion, /agenda -> /informasi');
}

function buildTenantSchema(tenant, isFashion, photoUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': isFashion ? 'ClothingStore' : 'Store',
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
}

function renderTenantPages(tenants) {
  let count = 0;
  for (const tenant of tenants) {
    const isFashion = tenant.category?.type === 'fashion' || tenant.category?.type === 'culinary';
    const folder = isFashion ? 'fashion' : 'belanja';
    const pageUrl = `https://plazakebunsayur.com/${folder}/${tenant.slug}`;
    const cleanDesc = (tenant.description || `Kunjungi toko ${tenant.name} di ${tenant.floor?.name || 'Plaza Kebun Sayur Balikpapan'}`).replace(/\s+/g, ' ').slice(0, 155);
    const photoUrl = tenant.image_url || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';

    const schema = buildTenantSchema(tenant, isFashion, photoUrl);
    const tenantHtml = injectMeta(template, {
      title: `${tenant.name} - Plaza Kebun Sayur Balikpapan`,
      description: cleanDesc,
      image: photoUrl,
      url: pageUrl,
      schema,
    });

    const dest = path.join(distDir, folder, tenant.slug, 'index.html');
    writeHtml(dest, tenantHtml);

    if (isFashion) {
      writeRedirectHtml(
        path.join(distDir, 'kuliner', tenant.slug, 'index.html'),
        `https://plazakebunsayur.com/fashion/${tenant.slug}`
      );
    }
    count++;
  }
  return count;
}

function buildWhatsOnSchema(item, photoUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': item.type === 'event' ? 'Event' : 'SaleEvent',
    'name': item.title,
    'description': item.summary,
    'image': photoUrl,
    'startDate': item.start_date,
    'endDate': item.end_date,
    'location': {
      '@type': 'Place',
      'name': 'Plaza Kebun Sayur',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Jl. Letjen Suprapto, Baru Ilir',
        'addressLocality': 'Balikpapan Barat',
        'addressRegion': 'Kalimantan Timur',
        'postalCode': '76131',
        'addressCountry': 'ID',
      },
    },
  };
}

function renderWhatsOnPages(whatsOnList) {
  let infoCount = 0;
  for (const item of whatsOnList) {
    const pageUrl = `https://plazakebunsayur.com/informasi/${item.slug}`;
    const cleanDesc = (item.summary || item.title).replace(/\s+/g, ' ').slice(0, 155);
    const photoUrl = item.banner_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80';

    const schema = buildWhatsOnSchema(item, photoUrl);
    const itemHtml = injectMeta(template, {
      title: `${item.title} - Plaza Kebun Sayur Balikpapan`,
      description: cleanDesc,
      image: photoUrl,
      url: pageUrl,
      schema,
    });

    const dest = path.join(distDir, 'informasi', item.slug, 'index.html');
    writeHtml(dest, itemHtml);

    writeRedirectHtml(
      path.join(distDir, 'agenda', item.slug, 'index.html'),
      `https://plazakebunsayur.com/informasi/${item.slug}`
    );
    infoCount++;
  }
  return infoCount;
}

async function main() {
  console.log('🚀 Memulai Pre-rendering SSG untuk SEO & Social Media Share...');

  const contents = await fetchPageContents();
  const defaultOgImage = contents['seo.default_og_image'] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';

  const staticPages = buildStaticPages(contents, defaultOgImage);
  renderStaticPages(staticPages);
  renderLegacyRedirects();

  const tenants = await fetchTenants();
  const count = renderTenantPages(tenants);

  const whatsOnList = await fetchWhatsOnItems();
  const infoCount = renderWhatsOnPages(whatsOnList);

  console.log(`✨ Sukses melakukan pre-rendering ${count} halaman kios/stan dinamis!`);
  console.log(`✨ Sukses melakukan pre-rendering ${infoCount} halaman informasi/agenda dinamis!`);
  console.log('🎉 Pre-rendering selesai dengan sempurna!');
}

main().catch((err) => {
  console.error('❌ Gagal menjalankan prerender:', err);
  process.exit(1);
});
