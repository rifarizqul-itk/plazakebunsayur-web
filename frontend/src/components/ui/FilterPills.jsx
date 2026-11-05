import React from 'react';
import {
  Gem,
  Sparkles,
  ShoppingBag,
  PackageOpen,
  Package,
  Shirt,
  Crown,
  Scissors,
  Watch,
  Gift,
  Palette,
  Store,
  UtensilsCrossed,
} from 'lucide-react';

const CATEGORY_ICONS = {
  gem: Gem,
  sparkles: Sparkles,
  shoppingbag: ShoppingBag,
  packageopen: PackageOpen,
  package: Package,
  shirt: Shirt,
  crown: Crown,
  scissors: Scissors,
  watch: Watch,
  gift: Gift,
  palette: Palette,
  store: Store,
  utensilscrossed: UtensilsCrossed,
};

function getCategoryIcon(iconName) {
  if (!iconName) return null;
  const key = String(iconName).trim().toLowerCase().replace(/[-_\s]/g, '');
  return CATEGORY_ICONS[key] || null;
}

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
        const IconComponent = opt.icon || getCategoryIcon(opt.icon_name);

        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={isSelected}
            className={`group px-4 py-2 min-h-[44px] text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              isSelected
                ? 'bg-brand-primary text-white'
                : 'bg-canvas text-text-secondary border border-border-input hover:bg-surface-subtle hover:text-text-primary'
            }`}
          >
            {IconComponent && (
              <IconComponent
                className="w-4 h-4 mr-1.5 shrink-0 opacity-80 group-hover:opacity-100"
                aria-hidden="true"
              />
            )}
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
