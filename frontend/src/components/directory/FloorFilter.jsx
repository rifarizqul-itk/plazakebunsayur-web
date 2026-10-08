import React from 'react';

export function FloorFilter({
  floors = [],
  selectedFloorId = null,
  onSelectFloor,
}) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
      <button
        type="button"
        onClick={() => onSelectFloor(null)}
        className={`px-3.5 py-2 text-xs font-medium rounded-full min-h-[44px] flex items-center transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
          selectedFloorId === null
            ? 'bg-surface-dark text-white font-bold'
            : 'text-text-muted hover:text-text-primary bg-surface-subtle border border-border-subtle'
        }`}
      >
        Semua Lantai
      </button>

      {floors.map((flr) => {
        const isSelected = selectedFloorId === flr.id;
        return (
          <button
            key={flr.id}
            type="button"
            onClick={() => onSelectFloor(flr.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-full min-h-[44px] flex items-center transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              isSelected
                ? 'bg-surface-dark text-white font-bold'
                : 'text-text-muted hover:text-text-primary bg-surface-subtle border border-border-subtle'
            }`}
          >
            {flr.code || flr.name}
          </button>
        );
      })}
    </div>
  );
}

export default FloorFilter;
