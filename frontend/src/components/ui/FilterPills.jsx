import React from 'react';

export function FilterPills({
  options = [],
  selectedValue = null,
  onSelect,
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`px-4 py-2 min-h-[44px] text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              isSelected
                ? 'bg-brand-primary text-white'
                : 'bg-canvas text-text-secondary border border-border-input hover:bg-surface-subtle hover:text-text-primary'
            }`}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span className="ml-1.5 opacity-75 text-xs tabular-nums">
                ({opt.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
