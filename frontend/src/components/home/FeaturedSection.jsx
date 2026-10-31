import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { TenantCard } from '../directory/TenantCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import { useContent } from '../../hooks/useContent';

export function FeaturedSection({ retailTenants = [], culinaryTenants = [], loading = false }) {
  const featuredRetail = retailTenants.slice(0, 4);
  const featuredCulinary = culinaryTenants.slice(0, 4);
  const retailTitle = useContent('home.featured.title', 'Kios Belanja Pilihan');
  const culinaryTitle = useContent('home.featured.culinary_title', 'Kuliner Khas Balikpapan');

  return (
    <section className="py-16 sm:py-20 bg-surface-subtle border-b border-border-subtle">
      <Container>
        {/* 1. Featured Retail Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {retailTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : featuredRetail.length > 0 ? (
              featuredRetail.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} basePath="/belanja" />
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-text-muted">
                Belum ada kios pilihan yang ditampilkan.
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/belanja"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors min-h-[44px] py-2"
            >
              <span>Lihat semua kios belanja</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* 2. Featured Culinary Section */}
        <div className="flex flex-col gap-6 mt-16 sm:mt-20 pt-12 border-t border-border-subtle">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {culinaryTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : featuredCulinary.length > 0 ? (
              featuredCulinary.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} basePath="/kuliner" />
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-text-muted">
                Belum ada stan kuliner pilihan yang ditampilkan.
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/kuliner"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors min-h-[44px] py-2"
            >
              <span>Lihat semua kuliner</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedSection;
