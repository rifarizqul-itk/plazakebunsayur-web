import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { TenantCard } from '../components/directory/TenantCard';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { PaginationControls } from '../components/ui/PaginationControls';
import { fetchCategories, fetchFloors, fetchTenants } from '../services/api';

export function ShoppingDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);

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

  // Load Categories & Floors (type = retail)
  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, flrs] = await Promise.all([
          fetchCategories('retail'),
          fetchFloors(),
        ]);
        setCategories(cats);
        setFloors(flrs);
      } catch (err) {
        console.error('Failed to load shopping meta:', err);
      }
    }
    loadMeta();
  }, []);

  // Load Tenants
  useEffect(() => {
    let isCancelled = false;
    async function loadTenants() {
      setLoading(true);
      try {
        const res = await fetchTenants({
          type: 'retail',
          category_id: selectedCatId || undefined,
          floor_id: selectedFloorId || undefined,
          q: searchQuery || undefined,
          page: currentPage,
          per_page: 12,
        });
        if (!isCancelled) {
          let tenantList = res.data || [];
          if (sortOrder === 'name_desc') {
            tenantList = [...tenantList].sort((a, b) => b.name.localeCompare(a.name));
          } else if (sortOrder === 'floor') {
            tenantList = [...tenantList].sort((a, b) => (a.floor?.order_index || 0) - (b.floor?.order_index || 0));
          } else {
            tenantList = [...tenantList].sort((a, b) => a.name.localeCompare(b.name));
          }
          setTenants(tenantList);
          setMeta(res.meta || { current_page: 1, last_page: 1, total: 0 });
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load tenants:', err);
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
  }, [selectedCatId, selectedFloorId, searchQuery, currentPage, sortOrder]);

  const handleResetFilters = () => {
    setSelectedCatId(null);
    setSelectedFloorId(null);
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Breadcrumbs ala YasMall */}
      <div className="bg-surface-subtle border-b border-border-subtle py-3 text-xs text-text-muted">
        <Container>
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} />
            <span className="text-text-primary font-semibold">Direktori Belanja</span>
          </div>
        </Container>
      </div>

      <section className="py-8 sm:py-12 flex-1">
        <Container>
          {/* 2. YasMall-Style Integrated Search & Filter Block */}
          <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle mb-8">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary mb-6">
              Pencarian Kios & Toko Belanja
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Keyword Input */}
              <div className="md:col-span-4 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Kata Kunci Pencarian
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Contoh: batu akik, cincin, mandau..."
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-xs bg-canvas border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary rounded-none"
                  />
                  <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Kategori Produk
                </label>
                <select
                  value={selectedCatId || ''}
                  onChange={(e) => {
                    setSelectedCatId(e.target.value ? Number(e.target.value) : null);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 min-h-[44px] text-xs bg-canvas border border-border-subtle text-text-primary focus:outline-none focus:border-brand-primary rounded-none"
                >
                  <option value="">Semua Kategori Belanja</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Floor Dropdown */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Lantai Gedung
                </label>
                <select
                  value={selectedFloorId || ''}
                  onChange={(e) => {
                    setSelectedFloorId(e.target.value ? Number(e.target.value) : null);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 min-h-[44px] text-xs bg-canvas border border-border-subtle text-text-primary focus:outline-none focus:border-brand-primary rounded-none"
                >
                  <option value="">Semua Lantai</option>
                  {floors.map((flr) => (
                    <option key={flr.id} value={flr.id}>
                      {flr.name} ({flr.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-3 flex items-center gap-2">
                <Link
                  to="/panduan-kunjungan"
                  className="flex-1 py-2.5 px-3 min-h-[44px] bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white font-bold text-xs uppercase tracking-wider text-center transition-colors rounded-none inline-flex items-center justify-center gap-1.5"
                >
                  <BookOpen size={13} />
                  <span>Panduan Mall</span>
                </Link>
                {(searchQuery || selectedCatId || selectedFloorId) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="p-2.5 min-h-[44px] min-w-[44px] bg-canvas hover:bg-surface-subtle border border-border-subtle text-text-primary transition-colors rounded-none flex items-center justify-center"
                    title="Reset Filter"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. Result Bar & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-border-subtle mb-6 text-xs text-text-secondary">
            <div className="font-semibold text-text-primary">
              Hasil Pencarian: <span className="tabular-nums font-bold text-text-primary">{meta.total || tenants.length} Kios Ditemukan</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="font-medium text-text-muted">Urutan:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="py-1.5 px-2.5 text-xs bg-canvas border border-border-subtle text-text-primary focus:outline-none focus:border-brand-primary rounded-none"
              >
                <option value="name_asc">Alfabet A ke Z</option>
                <option value="name_desc">Alfabet Z ke A</option>
                <option value="floor">Urutan Lantai (Dasar ke Atas)</option>
              </select>
            </div>
          </div>

          {/* 4. 4-Column Tenant Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : tenants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {tenants.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} basePath="/belanja" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-surface-subtle border border-border-subtle my-6">
              <h3 className="font-bold text-base text-text-primary">Tidak Ada Kios Ditemukan</h3>
              <p className="text-sm text-text-secondary mt-1">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-text-primary bg-canvas border border-border-subtle hover:border-border-strong transition-colors rounded-none"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* 5. Pagination */}
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

export default ShoppingDirectory;
