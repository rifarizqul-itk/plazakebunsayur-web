/**
 * Utilitas pemformatan tanggal dan rentang waktu berbahasa Indonesia.
 * Menangani format ISO-8601 (mis. 2026-10-10T00:00:00.000000Z), YYYY-MM-DD,
 * serta objek Date tanpa distorsi zona waktu browser.
 */

const INDONESIAN_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const INDONESIAN_MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

/**
 * Ekstraksi tahun, bulan (1-12), dan tanggal (1-31) secara aman
 * tanpa terpengaruh perbedaan zona waktu atau offset UTC browser.
 */
function parseDateParts(dateInput) {
  if (!dateInput) return null;

  if (dateInput instanceof Date) {
    if (isNaN(dateInput.getTime())) return null;
    return {
      year: dateInput.getFullYear(),
      month: dateInput.getMonth() + 1,
      day: dateInput.getDate(),
    };
  }

  const str = String(dateInput).trim();
  // Cocokkan pola YYYY-MM-DD baik murni maupun bagian awal ISO-8601 (mis. 2026-10-10T00:00:00.000000Z)
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10),
    };
  }

  return null;
}

/**
 * Format satu tanggal ke Bahasa Indonesia (misal: "10 Oktober 2026").
 * Jika input sudah berupa teks bebas (misal: "11 Oktober 2026"), dikembalikan apa adanya.
 */
export function formatDate(dateInput, shortMonth = false) {
  if (!dateInput) return '';

  const parts = parseDateParts(dateInput);
  if (!parts) return String(dateInput);

  const months = shortMonth ? INDONESIAN_MONTHS_SHORT : INDONESIAN_MONTHS;
  const monthName = months[parts.month - 1] || '';

  return `${parts.day} ${monthName} ${parts.year}`.trim();
}

/**
 * Format rentang tanggal ke Bahasa Indonesia secara elegan dan padat.
 * Contoh hasil:
 * - Tanggal tunggal: "10 Oktober 2026"
 * - Bulan & tahun sama: "10 – 15 Oktober 2026"
 * - Bulan beda, tahun sama: "1 September – 31 Oktober 2026"
 * - Tahun beda: "25 Desember 2026 – 5 Januari 2027"
 */
export function formatDateRange(startDateInput, endDateInput, shortMonth = false) {
  if (!startDateInput && !endDateInput) return '';
  if (startDateInput && !endDateInput) return formatDate(startDateInput, shortMonth);
  if (!startDateInput && endDateInput) return formatDate(endDateInput, shortMonth);

  const start = parseDateParts(startDateInput);
  const end = parseDateParts(endDateInput);

  // Jika salah satu gagal diparse (misal string bebas), fallback ke perbandingan format aman
  if (!start || !end) {
    const formattedStart = formatDate(startDateInput, shortMonth);
    const formattedEnd = formatDate(endDateInput, shortMonth);
    if (formattedStart === formattedEnd) return formattedStart;
    return `${formattedStart} s.d ${formattedEnd}`;
  }

  const months = shortMonth ? INDONESIAN_MONTHS_SHORT : INDONESIAN_MONTHS;

  // Tanggal sama persis
  if (start.year === end.year && start.month === end.month && start.day === end.day) {
    return `${start.day} ${months[start.month - 1]} ${start.year}`;
  }

  // Tahun & bulan sama: "10 – 15 Oktober 2026"
  if (start.year === end.year && start.month === end.month) {
    return `${start.day} – ${end.day} ${months[start.month - 1]} ${start.year}`;
  }

  // Tahun sama, bulan berbeda: "1 September – 31 Oktober 2026"
  if (start.year === end.year) {
    return `${start.day} ${months[start.month - 1]} – ${end.day} ${months[end.month - 1]} ${start.year}`;
  }

  // Tahun berbeda: "25 Desember 2026 – 5 Januari 2027"
  return `${start.day} ${months[start.month - 1]} ${start.year} – ${end.day} ${months[end.month - 1]} ${end.year}`;
}
