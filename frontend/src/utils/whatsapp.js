/**
 * Menghasilkan tautan resmi WhatsApp click-to-chat dengan nomor internasional terformat
 * dan pesan pembuka terenkripsi.
 *
 * @param {string} rawPhone - Nomor telepon pedagang (misal: "081234567890", "+6281234567890")
 * @param {string} storeName - Nama kios / stan pedagang
 * @returns {string} URL WhatsApp siap klik
 */
export function generateWhatsAppLink(rawPhone, storeName = 'Toko') {
  if (!rawPhone) return '#';

  // Bersihkan semua karakter selain angka
  let cleanPhone = String(rawPhone).replace(/\D/g, '');

  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  const greeting = `Halo ${storeName}, saya melihat profil toko Anda di Website Plaza Kebun Sayur dan ingin bertanya mengenai produk Anda.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Menghasilkan tautan WhatsApp resmi untuk pengelola mall
 */
export function generateManagementWhatsAppLink(rawPhone = '081234567890') {
  let cleanPhone = String(rawPhone).replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }
  const greeting = 'Halo Pengelola Plaza Kebun Sayur, saya ingin bertanya mengenai kunjungan atau informasi umum.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}
