const UNAVAILABLE_STATUS = {
  hasHours: false,
  isOpen: false,
  hoursText: 'Jam buka belum tersedia',
  statusLabel: null,
};

function parseTimeString(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parts = timeStr.split(':').map(Number);
  const hour = parts[0];
  const min = parts[1] || 0;
  if (isNaN(hour) || isNaN(min)) return null;

  return {
    totalMinutes: hour * 60 + min,
    formatted: `${String(hour).padStart(2, '0')}.${String(min).padStart(2, '0')}`,
  };
}

function getCurrentWitaMinutes() {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  return ((utcHours + 8) % 24) * 60 + utcMinutes;
}

/**
 * Helper untuk menghitung status buka/tutup dan format jam operasional
 * berbasis zona waktu WITA (Asia/Makassar, UTC+8) per spesifikasi DESIGN.md & SPECIFICATION.md
 */
export function getWitaOperatingStatus(openingTime, closingTime) {
  const open = parseTimeString(openingTime);
  const close = parseTimeString(closingTime);

  if (!open || !close) {
    return UNAVAILABLE_STATUS;
  }

  const currentWitaMinutes = getCurrentWitaMinutes();
  const isOpen = currentWitaMinutes >= open.totalMinutes && currentWitaMinutes < close.totalMinutes;

  return {
    hasHours: true,
    isOpen,
    statusLabel: isOpen ? 'Buka Sekarang' : 'Tutup',
    hoursText: `${open.formatted} – ${close.formatted} WITA`,
  };
}
