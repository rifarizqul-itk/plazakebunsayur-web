export const FALLBACK_BANNERS = {
  event: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  promo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
};

export function parseHighlights(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim().startsWith('[')) {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

export function resolveTermsText(eventItem) {
  if (eventItem.terms) return eventItem.terms;
  if (eventItem.admission) return eventItem.admission;
  if (eventItem.type === 'event') return 'Gratis (Terbuka untuk Umum)';
  return 'Promo Belanja Langsung';
}
