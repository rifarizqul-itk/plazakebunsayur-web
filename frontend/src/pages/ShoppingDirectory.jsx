import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, X, AlertCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { TenantCard } from '../components/directory/TenantCard';
import { CategoryFilter } from '../components/directory/CategoryFilter';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { PaginationControls } from '../components/ui/PaginationControls';
import { fetchCategories, fetchFloors, fetchTenants } from '../services/api';
import { useContent } from '../hooks/useContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

function buildTenantQueryParams({ selectedCatId, selectedFloorId, searchQuery, sortOrder, currentPage, selectedType }) {
  const params = {
    sort: sortOrder,
    page: currentPage,
    per_page: 12,
  };
  if (selectedCatId) params.category_id = selectedCatId;
  if (selectedFloorId) params.floor_id = selectedFloorId;
  if (searchQuery) params.q = searchQuery;
  if (selectedType) params.type = selectedType;
  return params;
}

function useShoppingData({ selectedCatId, selectedFloorId, searchQuery, sortOrder, currentPage, selectedType }) {
  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, flrs] = await Promise.all([
          fetchCategories(),
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

  useEffect(() => {
    let isCancelled = false;
    async function loadTenants() {
      setLoading(true);
      setError(null);
      try {
        const queryParams = buildTenantQueryParams({
          selectedCatId,
          selectedFloorId,
          searchQuery,
          sortOrder,
          currentPage,
          selectedType,
        });
        const res = await fetchTenants(queryParams);
        if (!isCancelled) {
          setTenants(res?.data ?? []);
          setMeta(res?.meta ?? { current_page: 1, last_page: 1, total: 0 });
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load shopping tenants:', err);
          setError('Gagal memuat data kios. Periksa koneksi internet Anda atau coba lagi.');
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
  }, [selectedCatId, selectedFloorId, searchQuery, currentPage, sortOrder, retryCount, selectedType]);

  return {
    categories,
    floors,
    tenants,
    meta,
    loading,
    error,
    retry: () => setRetryCount((c) => c + 1),
  };
}

function FilterBadge({ label, onRemove, ariaLabel }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-muted border border-border-subtle rounded-sm text-text-primary">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-brand-primary cursor-pointer"
        aria-label={ariaLabel}
      >
        <X size={12} />
      </button>
    </span>
  );
}

function ActiveFilterBadges({
  searchQuery,
  handleSearchChange,
  selectedCategoryObj,
  setSelectedCatId,
  selectedFloorObj,
  setSelectedFloorId,
  selectedType,
  setSelectedType,
  searchParams,
  setSearchParams,
  setCurrentPage,
  handleResetFilters,
}) {
  const hasActiveFilters = Boolean(searchQuery || selectedCategoryObj || selectedFloorObj || selectedType);
  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle text-xs">
      <span className="text-text-muted">Filter Aktif:</span>

      {searchQuery && (
        <FilterBadge
          label={`Pencarian: "${searchQuery}"`}
          onRemove={() => handleSearchChange('')}
          ariaLabel="Hapus kata kunci pencarian"
        />
      )}

      {selectedType && (
        <FilterBadge
          label={`Sentra: ${selectedType === 'fashion' ? 'Fashion & Busana' : selectedType}`}
          onRemove={() => {
            setSelectedType('');
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('type');
            setSearchParams(newParams);
            setCurrentPage(1);
          }}
          ariaLabel="Hapus filter sentra"
        />
      )}

      {selectedCategoryObj && (
        <FilterBadge
          label={`Kategori: ${selectedCategoryObj.name}`}
          onRemove={() => {
            setSelectedCatId(null);
            setCurrentPage(1);
          }}
          ariaLabel="Hapus filter kategori"
        />
      )}

      {selectedFloorObj && (
        <FilterBadge
          label={`Lantai: ${selectedFloorObj.name}`}
          onRemove={() => {
            setSelectedFloorId(null);
            setCurrentPage(1);
          }}
          ariaLabel="Hapus filter lantai"
        />
      )}

      <button
        type="button"
        onClick={handleResetFilters}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline ml-auto cursor-pointer"
      >
        <RotateCcw size={12} />
        <span>Reset Filter</span>
      </button>
    </div>
  );
}

function ShoppingFilterHeader({
  headerTitle,
  headerDesc,
  searchQuery,
  handleSearchChange,
  selectedFloorId,
  setSelectedFloorId,
  floors,
  categories,
  selectedCatId,
  setSelectedCatId,
  selectedType,
  setSelectedType,
  searchParams,
  setSearchParams,
  setCurrentPage,
  handleResetFilters,
}) {
  const selectedCategoryObj = categories.find((c) => c.id === selectedCatId);
  const selectedFloorObj = floors.find((f) => f.id === selectedFloorId);

  return (
    <div className="p-6 sm:p-8 bg-surface-subtle border border-border-subtle rounded-md mb-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-2">
        {headerTitle}
      </h1>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mb-6">
        {headerDesc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
        <div className="sm:col-span-8 relative">
          <input
            id="shopping-search"
            type="text"
            placeholder="Cari nama kios, nomor unit, jenis batu, atau busana..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full py-2.5 pl-3.5 pr-10 text-xs sm:text-sm bg-canvas border border-border-input focus:border-brand-primary focus:outline-none rounded-sm"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Hapus kata kunci pencarian"
            >
              <X size={16} />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Search size={16} />
            </div>
          )}
        </div>

        <div className="sm:col-span-4">
          <select
            id="shopping-floor"
            value={selectedFloorId || ''}
            onChange={(e) => {
              setSelectedFloorId(e.target.value ? Number(e.target.value) : null);
              setCurrentPage(1);
            }}
            className="w-full py-2.5 px-3 text-xs sm:text-sm bg-canvas border border-border-input focus:border-brand-primary focus:outline-none rounded-sm cursor-pointer"
          >
            <option value="">Semua Lantai</option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ActiveFilterBadges
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        selectedCategoryObj={selectedCategoryObj}
        setSelectedCatId={setSelectedCatId}
        selectedFloorObj={selectedFloorObj}
        setSelectedFloorId={setSelectedFloorId}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setCurrentPage={setCurrentPage}
        handleResetFilters={handleResetFilters}
      />
    </div>
  );
}

function ShoppingToolbar({ totalCount, sortOrder, setSortOrder, setCurrentPage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-border-subtle mb-6 text-xs text-text-secondary">
      <div className="font-semibold text-text-primary">
        Hasil Pencarian: <span className="tabular-nums font-bold text-text-primary">{totalCount} Kios Ditemukan</span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label htmlFor="shopping-sort" className="font-medium text-text-muted cursor-pointer">
          Urutan:
        </label>
        <select
          id="shopping-sort"
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
  );
}

function ShoppingGrid({ loading, error, tenants, onRetry, onReset }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 bg-surface-subtle border border-border-subtle rounded-md my-6 flex flex-col items-center gap-3">
        <AlertCircle size={28} className="text-brand-primary" />
        <h3 className="font-bold text-base text-text-primary">Gagal Memuat Data Kios</h3>
        <p className="text-sm text-text-secondary max-w-md">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-white bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed rounded-sm cursor-pointer transition-colors"
        >
          Muat Ulang Data
        </button>
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-surface-subtle border border-border-subtle rounded-md my-6">
        <h3 className="font-bold text-base text-text-primary">Kios Tidak Ditemukan</h3>
        <p className="text-sm text-text-secondary mt-1">
          Coba ubah kata kunci pencarian atau pilih kategori lain.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-text-primary bg-canvas border border-border-input hover:border-border-strong active:bg-surface-subtle transition-colors rounded-sm cursor-pointer"
        >
          Reset Semua Filter
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} basePath="/belanja" />
      ))}
    </div>
  );
}

export function ShoppingDirectory() {
  const metaTitle = useContent('seo.belanja.title', 'Direktori Kios Belanja | Plaza Kebun Sayur Balikpapan');
  const metaDesc = useContent(
    'seo.belanja.description',
    'Katalog lengkap kios batu mulia, perhiasan, suvenir Dayak, batik, dan kerajinan tradisional di Plaza Kebun Sayur Balikpapan.'
  );
  useDocumentMeta(metaTitle, metaDesc);

  const headerTitle = useContent('header.belanja.title', 'Direktori Kios Belanja');
  const headerDesc = useContent(
    'header.belanja.description',
    'Cari kios batu akik, permata, kerajinan Dayak Kenyah, perhiasan emas perak, busana etnik, batik, dan cinderamata khas Kalimantan.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';

  const [selectedCatId, setSelectedCatId] = useState(null);
  const [selectedFloorId, setSelectedFloorId] = useState(null);
  const [selectedType, setSelectedType] = useState(initialType);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [prevInitialType, setPrevInitialType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);

  if (prevInitialQuery !== initialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  if (prevInitialType !== initialType) {
    setPrevInitialType(initialType);
    setSelectedType(initialType);
  }

  const { categories, floors, tenants, meta, loading, error, retry } = useShoppingData({
    selectedCatId,
    selectedFloorId,
    searchQuery,
    sortOrder,
    currentPage,
    selectedType,
  });

  const visibleCategories = selectedType
    ? categories.filter((c) => c.type === selectedType)
    : categories;

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCatId(null);
    setSelectedFloorId(null);
    setSelectedType('');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <section className="py-8 sm:py-12 flex-1">
        <Container>
          <ShoppingFilterHeader
            headerTitle={headerTitle}
            headerDesc={headerDesc}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            selectedFloorId={selectedFloorId}
            setSelectedFloorId={setSelectedFloorId}
            floors={floors}
            categories={categories}
            selectedCatId={selectedCatId}
            setSelectedCatId={setSelectedCatId}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setCurrentPage={setCurrentPage}
            handleResetFilters={handleResetFilters}
          />

          <div className="relative mb-6">
            <CategoryFilter
              categories={visibleCategories}
              selectedCategoryId={selectedCatId}
              onSelectCategory={(id) => {
                setSelectedCatId(id);
                setCurrentPage(1);
              }}
            />
            <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-canvas to-transparent" />
          </div>

          <ShoppingToolbar
            totalCount={meta.total || tenants.length}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setCurrentPage={setCurrentPage}
          />

          <ShoppingGrid
            loading={loading}
            error={error}
            tenants={tenants}
            onRetry={retry}
            onReset={handleResetFilters}
            searchQuery={searchQuery}
          />

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
