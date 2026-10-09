import React from 'react';

export function CategoryFilter({
  categories = [],
  selectedCategoryId = null,
  onSelectCategory,
}) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-1 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
          selectedCategoryId === null
            ? 'bg-brand-primary text-white font-semibold'
            : 'bg-surface-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary border border-border-subtle'
        }`}
      >
        Semua Kategori
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              isSelected
                ? 'bg-brand-primary text-white font-semibold'
                : 'bg-surface-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary border border-border-subtle'
            }`}
          >
            {cat.name}
            {cat.tenants_count !== undefined && (
              <span className="ml-1.5 opacity-75 text-xs tabular-nums">
                ({cat.tenants_count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
