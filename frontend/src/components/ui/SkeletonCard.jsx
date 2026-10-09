import React from 'react';

export function SkeletonCard() {
  return (
    <div className="flex flex-col bg-canvas border border-border-subtle rounded-md overflow-hidden animate-pulse">
      {/* 4:3 Image ratio placeholder */}
      <div className="w-full aspect-[4/3] bg-surface-muted" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="w-20 h-4 bg-surface-muted rounded-full" />
        <div className="w-3/4 h-5 bg-surface-muted rounded-sm" />
        <div className="w-1/2 h-3.5 bg-surface-muted rounded-sm" />
        <div className="w-full h-11 bg-surface-muted rounded-sm mt-2" />
      </div>
    </div>
  );
}

export function SkeletonBanner() {
  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-surface-muted rounded-md animate-pulse" />
  );
}
