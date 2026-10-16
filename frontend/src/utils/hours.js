/**
 * Helper untuk menghitung status buka/tutup dan format jam operasional
 * berbasis zona waktu WITA (Asia/Makassar, UTC+8) per spesifikasi DESIGN.md & SPECIFICATION.md
 */
export function getWitaOperatingStatus(openingTime, closingTime) {
  if (!openingTime || !closingTime) {
    return {
      hasHours: false,
      isOpen: false,
      hoursText: 'Jam buka belum tersedia',
      statusLabel: null,
    };
  }

  try {
    const [openHour, openMin] = openingTime.split(':').map(Number);
    const [closeHour, closeMin] = closingTime.split(':').map(Number);

    if (isNaN(openHour) || isNaN(closeHour)) {
      return {
        hasHours: false,
        isOpen: false,
        hoursText: 'Jam buka belum tersedia',
        statusLabel: null,
      };
    }

    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const witaTotalMinutes = ((utcHours + 8) % 24) * 60 + utcMinutes;

    const openTotalMinutes = openHour * 60 + (openMin || 0);
    const closeTotalMinutes = closeHour * 60 + (closeMin || 0);

    const isOpen = witaTotalMinutes >= openTotalMinutes && witaTotalMinutes < closeTotalMinutes;
    const openStr = `${String(openHour).padStart(2, '0')}.${String(openMin || 0).padStart(2, '0')}`;
    const closeStr = `${String(closeHour).padStart(2, '0')}.${String(closeMin || 0).padStart(2, '0')}`;

    return {
      hasHours: true,
      isOpen,
      hoursText: `${openStr} – ${closeStr} WITA`,
    };
  } catch {
    return {
      hasHours: false,
      isOpen: false,
      hoursText: 'Jam buka belum tersedia',
      statusLabel: null,
    };
  }
}
