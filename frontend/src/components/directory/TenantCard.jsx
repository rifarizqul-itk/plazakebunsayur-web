import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const FALLBACK_STOCK_PHOTOS = {
  culinary: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  retail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
};

function getTenantPhoto(tenant) {
  const fallback = FALLBACK_STOCK_PHOTOS[tenant.category?.type] || FALLBACK_STOCK_PHOTOS.retail;
  return tenant.image_url || fallback;
}

function getTenantLocation(tenant) {
  const floor = tenant.floor?.name || tenant.floor?.code || 'Lantai Dasar';
  return tenant.unit_number ? `${floor} • ${tenant.unit_number}` : floor;
}

function CategoryHeader({ categoryName, isFeatured }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
      <span className="truncate">{categoryName || 'Direktori Kios'}</span>
      {isFeatured && (
        <span className="shrink-0 text-brand-primary font-bold text-[11px]">
          • Pilihan
        </span>
      )}
    </div>
  );
}

export function TenantCard({ tenant, basePath = '/belanja' }) {
  if (!tenant) return null;

  const detailLink = `${basePath}/${tenant.slug}`;
  const locationText = getTenantLocation(tenant);
  const imageSource = getTenantPhoto(tenant);
  const fallbackPhoto = FALLBACK_STOCK_PHOTOS[tenant.category?.type] || FALLBACK_STOCK_PHOTOS.retail;

  return (
    <article className="group flex flex-col bg-canvas border border-border-subtle hover:border-border-strong active:border-border-strong transition-all duration-150 rounded-md overflow-hidden">
      {/* 4:3 Ratio Photographic Frame */}
      <Link
        to={detailLink}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block w-full aspect-[4/3] bg-surface-muted overflow-hidden focus:outline-none"
      >
        <img
          src={imageSource}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== fallbackPhoto) {
              e.currentTarget.src = fallbackPhoto;
            }
          }}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Card Info Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-left">
        <div className="flex flex-col gap-1">
          <CategoryHeader
            categoryName={tenant.category?.name}
            isFeatured={tenant.is_featured}
          />

          {/* Store Name (Max 2 baris line-clamp-2, font-semibold / weight 600) */}
          <Link
            to={detailLink}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            <h3 className="font-semibold text-base text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
              {tenant.name}
            </h3>
          </Link>

          {/* Floor & Location */}
          <span className="text-xs text-text-secondary font-normal">
            {locationText}
          </span>
        </div>

        {/* Detail Direct Action Bar (Min 44px Touch Target) */}
        <div className="pt-2 border-t border-border-subtle mt-1">
          <Link
            to={detailLink}
            tabIndex={-1}
            aria-hidden="true"
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-text-primary hover:text-brand-primary hover:border-brand-primary active:bg-surface-muted bg-surface-subtle border border-border-subtle rounded-sm transition-colors group/btn"
          >
            <Eye size={15} className="text-text-secondary group-hover/btn:text-brand-primary transition-colors" />
            <span>Lihat Detail</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TenantCard;
