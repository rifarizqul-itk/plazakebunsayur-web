import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export function PaginationControls({
  currentPage = 1,
  lastPage = 1,
  onPageChange,
  className = '',
}) {
  if (lastPage <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 pt-6 ${className}`}>
      <Button
        variant="outline"
        size="md"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline ml-1">Sebelumnya</span>
      </Button>

      <span className="text-xs font-medium text-text-secondary tabular-nums px-3">
        Halaman {currentPage} dari {lastPage}
      </span>

      <Button
        variant="outline"
        size="md"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Halaman selanjutnya"
      >
        <span className="hidden sm:inline mr-1">Selanjutnya</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}

export default PaginationControls;
