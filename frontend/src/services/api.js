import {
  MOCK_CATEGORIES,
  MOCK_FLOORS,
  MOCK_TENANTS,
  MOCK_FACILITIES,
  MOCK_WHATS_ON,
  MOCK_SITE_SETTINGS,
  MOCK_PAGE_CONTENTS,
  MOCK_VISIT_GUIDE,
  MOCK_NAV_ITEMS,
  MOCK_LEGAL_PAGES,
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const DEFAULT_HEADERS = { 'ngrok-skip-browser-warning': '1' };

// Strict environment isolation: Mock data is ONLY allowed during local npm run dev
const isDev = import.meta.env.DEV;
const isMockForced = isDev && (import.meta.env.VITE_USE_MOCK === 'true');

/**
 * Fetch categories, optional filter by type ('retail' | 'culinary')
 */
export async function fetchCategories(type = null) {
  if (isMockForced) {
    return type ? MOCK_CATEGORIES.filter((c) => c.type === type) : MOCK_CATEGORIES;
  }

  try {
    const url = type ? `${API_BASE_URL}/categories?type=${type}` : `${API_BASE_URL}/categories`;
    const res = await fetch(url, { headers: DEFAULT_HEADERS, signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch categories`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock categories:', err.message);
      return type ? MOCK_CATEGORIES.filter((c) => c.type === type) : MOCK_CATEGORIES;
    }
    throw err;
  }
}

/**
 * Fetch floors
 */
export async function fetchFloors() {
  if (isMockForced) return MOCK_FLOORS;

  try {
    const res = await fetch(`${API_BASE_URL}/floors`, { headers: DEFAULT_HEADERS, signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch floors`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock floors:', err.message);
      return MOCK_FLOORS;
    }
    throw err;
  }
}

/**
 * Fetch paginated tenants with filters
 */
export async function fetchTenants(params = {}) {
  const query = new URLSearchParams();
  if (params.type) query.set('type', params.type);
  if (params.category_id) query.set('category_id', params.category_id);
  if (params.category_slug) query.set('category_slug', params.category_slug);
  if (params.floor_id) query.set('floor_id', params.floor_id);
  if (params.q) query.set('q', params.q);
  if (params.featured) query.set('featured', '1');
  if (params.page) query.set('page', params.page);
  if (params.per_page) query.set('per_page', params.per_page);

  if (isMockForced) {
    return getMockPaginatedTenants(params);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/tenants?${query.toString()}`, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch tenants`);
    const json = await res.json();
    return {
      data: json.data || [],
      meta: json.meta || { current_page: 1, last_page: 1, total: (json.data || []).length, per_page: 12 },
    };
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock tenants:', err.message);
      return getMockPaginatedTenants(params);
    }
    throw err;
  }
}

function getMockPaginatedTenants(params) {
  let list = [...MOCK_TENANTS];
  if (params.type) {
    list = list.filter((t) => t.category?.type === params.type);
  }
  if (params.category_id) {
    list = list.filter((t) => t.category_id === Number(params.category_id));
  }
  if (params.category_slug) {
    list = list.filter((t) => t.category?.slug === params.category_slug);
  }
  if (params.floor_id) {
    list = list.filter((t) => t.floor_id === Number(params.floor_id));
  }
  if (params.featured) {
    list = list.filter((t) => t.is_featured);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.unit_number && t.unit_number.toLowerCase().includes(q))
    );
  }

  const perPage = Number(params.per_page) || 12;
  const page = Number(params.page) || 1;
  const start = (page - 1) * perPage;
  const paged = list.slice(start, start + perPage);

  return {
    data: paged,
    meta: {
      current_page: page,
      last_page: Math.max(1, Math.ceil(list.length / perPage)),
      per_page: perPage,
      total: list.length,
    },
  };
}

/**
 * Fetch single tenant by slug
 */
export async function fetchTenantBySlug(slug) {
  if (isMockForced) {
    const found = MOCK_TENANTS.find((t) => t.slug === slug);
    if (!found) throw new Error('Tenant tidak ditemukan');
    return found;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/tenants/${slug}`, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error('NOT_FOUND');
      throw new Error(`HTTP ${res.status}: Failed to fetch tenant`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    if (err.message === 'NOT_FOUND') throw err;
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, searching mock tenant:', slug);
      const found = MOCK_TENANTS.find((t) => t.slug === slug);
      if (!found) throw new Error('NOT_FOUND');
      return found;
    }
    throw err;
  }
}

/**
 * Fetch facilities
 */
export async function fetchFacilities() {
  if (isMockForced) return MOCK_FACILITIES;

  try {
    const res = await fetch(`${API_BASE_URL}/facilities`, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch facilities`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock facilities:', err.message);
      return MOCK_FACILITIES;
    }
    throw err;
  }
}

/**
 * Fetch whats-on (events & promos)
 */
export async function fetchWhatsOn(type = null) {
  if (isMockForced) {
    return type ? MOCK_WHATS_ON.filter((w) => w.type === type) : MOCK_WHATS_ON;
  }

  try {
    const url = type ? `${API_BASE_URL}/whats-on?type=${type}` : `${API_BASE_URL}/whats-on`;
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch whats-on`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock whats-on:', err.message);
      return type ? MOCK_WHATS_ON.filter((w) => w.type === type) : MOCK_WHATS_ON;
    }
    throw err;
  }
}

/**
 * Fetch single whats-on by slug
 */
export async function fetchWhatsOnBySlug(slug) {
  if (isMockForced) {
    const found = MOCK_WHATS_ON.find((w) => w.slug === slug);
    if (!found) throw new Error('NOT_FOUND');
    return found;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/whats-on/${slug}`, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error('NOT_FOUND');
      throw new Error(`HTTP ${res.status}: Failed to fetch agenda detail`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    if (err.message === 'NOT_FOUND') throw err;
    if (isDev) {
      const found = MOCK_WHATS_ON.find((w) => w.slug === slug);
      if (!found) throw new Error('NOT_FOUND');
      return found;
    }
    throw err;
  }
}

/**
 * Submit contact message
 */
export async function submitContactMessage(formData) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...DEFAULT_HEADERS,
    },
    body: JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error('Terlalu banyak permintaan. Mohon tunggu beberapa menit sebelum mengirim pesan kembali.');
    }
    const validationMsg = json.errors ? Object.values(json.errors).flat().join(', ') : null;
    throw new Error(validationMsg || json.message || 'Gagal mengirim pesan.');
  }

  return json;
}

/**
 * Fetch site settings (key-value dictionary)
 */
export async function fetchSiteSettings() {
  if (isMockForced) return MOCK_SITE_SETTINGS;

  try {
    const res = await fetch(`${API_BASE_URL}/site-settings`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch site settings`);
    const json = await res.json();
    return json.data || {};
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock site settings:', err.message);
      return MOCK_SITE_SETTINGS;
    }
    throw err;
  }
}

/**
 * Fetch page contents (key-value dictionary of all CMS texts & images)
 */
export async function fetchPageContents() {
  if (isMockForced) return MOCK_PAGE_CONTENTS;

  try {
    const res = await fetch(`${API_BASE_URL}/page-contents`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch page contents`);
    const json = await res.json();
    return json.data || {};
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock page contents:', err.message);
      return MOCK_PAGE_CONTENTS;
    }
    throw err;
  }
}

/**
 * Fetch visit guide data (access routes, shopping tips, building rules)
 */
export async function fetchVisitGuide() {
  if (isMockForced) return MOCK_VISIT_GUIDE;

  try {
    const res = await fetch(`${API_BASE_URL}/visit-guide`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch visit guide`);
    const json = await res.json();
    return json.data || {};
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock visit guide:', err.message);
      return MOCK_VISIT_GUIDE;
    }
    throw err;
  }
}

/**
 * Fetch navigation items (header & footer links)
 */
export async function fetchNavItems() {
  if (isMockForced) return MOCK_NAV_ITEMS;

  try {
    const res = await fetch(`${API_BASE_URL}/nav-items`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch nav items`);
    const json = await res.json();
    return json.data || { header: [], footer: [] };
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock nav items:', err.message);
      return MOCK_NAV_ITEMS;
    }
    throw err;
  }
}

/**
 * Fetch legal page by slug (e.g. kebijakan-privasi, syarat-ketentuan)
 */
export async function fetchLegalPage(slug) {
  if (isMockForced) return MOCK_LEGAL_PAGES[slug] || null;

  try {
    const res = await fetch(`${API_BASE_URL}/legal-pages/${slug}`, {
      headers: { 'ngrok-skip-browser-warning': '1' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch legal page`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    if (isDev) {
      console.warn('[DEV ONLY] Backend unavailable, using mock legal page:', slug, err.message);
      return MOCK_LEGAL_PAGES[slug] || null;
    }
    throw err;
  }
}



