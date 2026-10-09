import React from 'react';
import { FilterPills } from '../ui/FilterPills';

export function CategoryFilter({
  categories = [],
  selectedCategoryId = null,
  onSelectCategory,
}) {
  const options = [
    { value: null, label: 'Semua Kategori' },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
      count: cat.tenants_count,
    })),
  ];

  return (
    <FilterPills
      options={options}
      selectedValue={selectedCategoryId}
      onSelect={onSelectCategory}
      className="w-full overflow-x-auto scrollbar-none py-1 flex-nowrap"
    />
  );
}

export default CategoryFilter;
