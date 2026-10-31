import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, RotateCcw, X, AlertCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { TenantCard } from '../components/directory/TenantCard';
import { CategoryFilter } from '../components/directory/CategoryFilter';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { PaginationControls } from '../components/ui/PaginationControls';
import { fetchCategories, fetchFloors, fetchTenants } from '../services/api';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function CulinaryDirectory() {
  const metaTitle = useContent('seo.kuliner.title', 'Sentra Kuliner Tradisional | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent('seo.kuliner.description', 'Daftar warung dan stan kuliner khas Balikpapan di Plaza Kebun Sayur: amplang, mantau, bingka kentang, dan aneka jajanan lokal.');
  useDocumentMeta(metaTitle, metaDesc);

  const headerTitle = useContent('header.kuliner.title', 'Sentra Kuliner & Oleh-Oleh');
  const headerDesc = useContent(
    'header.kuliner.description',
    'Temukan aneka kudapan khas Balikpapan: amplang kuku macan, mantau, soto banjar, bingka bakar, dan oleh-oleh siap terbang.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Filters
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [selectedFloorId, setSelectedFloorId] = useState(null);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);

  if (prevInitialQuery !== initialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  // Load Categories & Floors (type = culinary)
  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, flrs] = await Promise.all([
          fetchCategories('culinary'),
          fetchFloors(),
        ]);
        setCategories(cats);
        setFloors(flrs);
      } catch (err) {
        console.error('Failed to load culinary meta:', err);
      }
    }
    loadMeta();
  }, []);

  // Load Tenants with server-side sorting & pagination
  useEffect(() => {
    let isCancelled = false;
    async function loadTenants() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchTenants({
          type: 'culinary',
          category_id: selectedCatId || undefined,
          floor_id: selectedFloorId || undefined,
          q: searchQuery || undefined,
          sort: sortOrder,
          page: currentPage,
          per_page: 12,
        });
        if (!isCancelled) {
          setTenants(res.data || []);
          setMeta(res.meta || { current_page: 1, last_page: 1, total: 0 });
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load culinary tenants:', err);
          setError('Gagal memuat data kuliner. Periksa koneksi internet Anda atau coba lagi.');
          setTenants([]);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadTenants();
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [selectedCatId, selectedFloorId, searchQuery, currentPage, sortOrder, retryCount]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSelectedCatId(null);
    setSelectedFloorId(null);
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <section className="py-8 sm:py-12 flex-1">
        <Container>
          {/* 2. Header & Search / Floor Filter Block */}
          <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle rounded-md mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-2">
              {headerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mb-6 max-w-[68ch]">
              {headerDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Keyword Input */}
              <div className="md:col-span-8 flex flex-col gap-1.5">
                <label htmlFor="culinary-search" className="text-xs font-semibold uppercase tracking-wider text-text-secondary cursor-pointer">
                  Kata Kunci Pencarian
                </label>
                <div className="relative">
                  <input
                    id="culinary-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Cari menu, stan kuliner, atau nomor unit..."
                    className="w-full pl-3.5 pr-10 py-2.5 min-h-[44px] text-xs bg-canvas border border-border-input text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary focus:border-brand-primary rounded-sm"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => handleSearchChange('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                      aria-label="Hapus pencarian"
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Floor Dropdown */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label htmlFor="culinary-floor" className="text-xs font-semibold uppercase tracking-wider text-text-secondary cursor-pointer">
                  Lantai Gedung
                </label>
                <select
                  id="culinary-floor"
                  value={selectedFloorId || ''}
                  onChange={(e) => {
                    setSelectedFloorId(e.target.value ? Number(e.target.value) : null);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 min-h-[44px] text-xs bg-canvas border border-border-input text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary focus:border-brand-primary rounded-sm cursor-pointer"
                >
                  <option value="">Semua Lantai</option>
                  {floors.map((flr) => (
                    <option key={flr.id} value={flr.id}>
                      {flr.name} ({flr.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filter Button */}
              <div className="md:col-span-1 flex items-center">
                {(searchQuery || selectedCatId || selectedFloorId) ? (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-full min-h-[44px] bg-canvas hover:bg-surface-subtle active:bg-surface-muted border border-border-input text-text-primary transition-colors rounded-sm flex items-center justify-center cursor-pointer"
                    title="Reset Filter"
                    aria-label="Reset Filter"
                  >
                    <RotateCcw size={15} />
                  </button>
                ) : (
                  <div className="hidden md:block w-full min-h-[44px]" />
                )}
              </div>
            </div>
          </div>

          {/* 3. Horizontal Scrollable Category Capsule Filter per DESIGN.md */}
          <div className="relative mb-8">
            <div className="overflow-x-auto scrollbar-none pb-2">
              <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCatId}
                onSelectCategory={(id) => {
                  setSelectedCatId(id);
                  setCurrentPage(1);
                }}
              />
            </div>
            {/* Visual fade hint on right for mobile screen */}
            <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-canvas to-transparent" />
          </div>

          {/* 4. Result Bar & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-border-subtle mb-6 text-xs text-text-secondary">
            <div className="font-semibold text-text-primary">
              Hasil Pencarian: <span className="tabular-nums font-bold text-text-primary">{meta.total || tenants.length} Stan Kuliner Ditemukan</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="culinary-sort" className="font-medium text-text-muted cursor-pointer">
                Urutan:
              </label>
              <select
                id="culinary-sort"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-1.5 px-2.5 text-xs bg-canvas border border-border-input text-text-primary focus:outline-none focus:border-brand-primary rounded-sm cursor-pointer"
              >
                <option value="name_asc">Alfabet A ke Z</option>
                <option value="name_desc">Alfabet Z ke A</option>
                <option value="floor">Urutan Lantai (Dasar ke Atas)</option>
              </select>
            </div>
          </div>

          {/* 5. Tenant Grid (1 col mobile, 2 col tablet, 4 col desktop per DESIGN.md) */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 px-4 bg-surface-subtle border border-border-subtle rounded-md my-6 flex flex-col items-center gap-3">
              <AlertCircle size={28} className="text-brand-primary" />
              <h3 className="font-bold text-base text-text-primary">Gagal Memuat Data Kuliner</h3>
              <p className="text-sm text-text-secondary max-w-md">{error}</p>
              <button
                type="button"
                onClick={() => setRetryCount((c) => c + 1)}
                className="mt-2 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-white bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-sm cursor-pointer transition-colors"
              >
                Muat Ulang Data
              </button>
            </div>
          ) : tenants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
              {tenants.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} basePath="/kuliner" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-surface-subtle border border-border-subtle rounded-md my-6">
              <h3 className="font-bold text-base text-text-primary">Stan Kuliner Tidak Ditemukan</h3>
              <p className="text-sm text-text-secondary mt-1">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-text-primary bg-canvas border border-border-input hover:border-border-strong active:bg-surface-subtle transition-colors rounded-sm cursor-pointer"
              >
                Reset Semua Filter
              </button>

              {searchQuery && (
                <div className="mt-5 pt-4 border-t border-border-subtle text-xs text-text-secondary max-w-sm mx-auto">
                  <span>Mencari perhiasan, batu permata, atau cinderamata? </span>
                  <Link
                    to={`/belanja?q=${encodeURIComponent(searchQuery)}`}
                    className="font-semibold text-brand-primary hover:underline inline-block mt-1"
                  >
                    Cari &ldquo;{searchQuery}&rdquo; di Sentra Belanja & Permata &rarr;
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 6. Pagination (Touch target >= 44px) */}
          <div className="pt-6">
            <PaginationControls
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default CulinaryDirectory;
