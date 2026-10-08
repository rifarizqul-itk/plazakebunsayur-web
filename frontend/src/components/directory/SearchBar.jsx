import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value = '', onChange, placeholder = 'Cari toko, batu akik, batik, mandau...' }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 min-h-[44px] text-sm bg-surface-subtle border border-border-subtle rounded-none text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-canvas transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary"
          aria-label="Hapus pencarian"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
