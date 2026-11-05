import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Container } from '../layout/Container';
import { TenantCard } from '../directory/TenantCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import { useContent } from '../../hooks/useContent';
import { formatDateRange } from '../../utils/date';

function PromoCard({ promo }) {
  const detailLink = `/informasi/${promo.slug}`;
  const bannerImage = promo.banner_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
  const dateRange = formatDateRange(promo.start_date, promo.end_date);

  return (
    <article className="group flex flex-col bg-canvas border border-border-subtle hover:border-border-strong active:border-border-strong transition-all duration-150 rounded-md overflow-hidden">
      <Link
        to={detailLink}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block w-full aspect-[16/10] bg-surface-muted overflow-hidden focus:outline-none"
      >
        <img
          src={bannerImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-brand-primary text-white rounded-sm shadow-subtle">
            <Tag size={12} />
            <span>Promo Kios</span>
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 text-left">
        <div className="flex flex-col gap-2">
          {dateRange && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted tabular-nums">
              <Calendar size={13} className="text-brand-primary shrink-0" />
              <span>{dateRange}</span>
            </div>
          )}

          <Link
            to={detailLink}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            <h3 className="font-semibold text-base sm:text-lg text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
              {promo.title}
            </h3>
          </Link>

          {promo.summary && (
            <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">
              {promo.summary}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-border-subtle mt-1">
          <Link
            to={detailLink}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-text-primary hover:text-brand-primary hover:border-brand-primary active:bg-surface-muted bg-surface-subtle border border-border-subtle rounded-sm transition-colors group/btn"
          >
            <span>Lihat Detail Promo</span>
            <ArrowRight size={14} className="text-text-secondary group-hover/btn:text-brand-primary group-hover/btn:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PromoGrid({ promos, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (promos.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-text-muted">
        Belum ada promo aktif yang ditampilkan saat ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {promos.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  );
}

function OlehOlehGrid({ tenants, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-text-muted">
        Belum ada kios oleh-oleh pilihan yang ditampilkan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tenants.map((tenant) => (
        <TenantCard
          key={tenant.id}
          tenant={tenant}
          basePath={tenant.category?.type === 'fashion' ? '/fashion' : '/belanja'}
        />
      ))}
    </div>
  );
}

function resolveActiveOlehOleh(olehOlehTenants, retailTenants, culinaryTenants) {
  if (olehOlehTenants.length > 0) {
    return olehOlehTenants.slice(0, 4);
  }
  if (retailTenants.length > 0) {
    return retailTenants.slice(0, 4);
  }
  return culinaryTenants.slice(0, 4);
}

export function FeaturedSection({
  promos = [],
  olehOlehTenants = [],
  retailTenants = [],
  culinaryTenants = [],
  loading = false,
}) {
  const activePromos = promos.slice(0, 4);
  const activeOlehOleh = resolveActiveOlehOleh(olehOlehTenants, retailTenants, culinaryTenants);

  const promoEyebrow = useContent('home.promos.eyebrow', 'Penawaran Spesial Kios & Gedung');
  const promoTitle = useContent('home.promos.title', 'Promo Minggu Ini / Bulan Ini');
  const promoCtaLabel = useContent('home.promos.cta_label', 'Lihat semua promo & informasi');

  const olehOlehEyebrow = useContent('home.oleh_oleh.eyebrow', 'Batik, Busana Adat & Kerajinan Khas');
  const olehOlehTitle = useContent('home.oleh_oleh.title', 'Oleh-Oleh Khas & Cenderamata');
  const olehOlehCtaLabel = useContent('home.oleh_oleh.cta_label', 'Lihat semua kios belanja & oleh-oleh');

  return (
    <section className="py-16 sm:py-20 bg-surface-subtle border-b border-border-subtle">
      <Container>
        {/* 1. Promo Minggu Ini / Bulan Ini */}
        <div className="flex flex-col gap-6">
          <div>
            {promoEyebrow && (
              <span className="text-xs font-semibold text-brand-primary tracking-wide block mb-1">
                {promoEyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {promoTitle}
            </h2>
          </div>

          <PromoGrid promos={activePromos} loading={loading} />

          <div className="pt-2">
            <Link
              to="/informasi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors min-h-[44px] py-2"
            >
              <span>{promoCtaLabel}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* 2. Oleh-Oleh Khas & Cenderamata */}
        <div className="flex flex-col gap-6 mt-16 sm:mt-20 pt-12 border-t border-border-subtle">
          <div>
            {olehOlehEyebrow && (
              <span className="text-xs font-semibold text-brand-primary tracking-wide block mb-1">
                {olehOlehEyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {olehOlehTitle}
            </h2>
          </div>

          <OlehOlehGrid tenants={activeOlehOleh} loading={loading} />

          <div className="pt-2">
            <Link
              to="/belanja"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors min-h-[44px] py-2"
            >
              <span>{olehOlehCtaLabel}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedSection;
