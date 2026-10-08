import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { TenantCard } from '../directory/TenantCard';

export function FeaturedSection({ retailTenants = [], culinaryTenants = [] }) {
  const featuredRetail = retailTenants.slice(0, 4);
  const featuredCulinary = culinaryTenants.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-surface-subtle border-b border-border-subtle">
      <Container>
        {/* 1. Featured Retail Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Koleksi Pilihan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                Kios Belanja Pilihan
              </h2>
            </div>
            <Link
              to="/belanja"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary transition-colors self-start sm:self-auto py-1"
            >
              <span>Lihat Semua Kios</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRetail.map((tenant) => (
              <TenantCard key={tenant.id} tenant={tenant} basePath="/belanja" />
            ))}
          </div>
        </div>

        {/* 2. Featured Culinary Section */}
        <div className="flex flex-col gap-8 mt-16 sm:mt-20 pt-12 border-t border-border-subtle">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Sentra Makanan & Minuman
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                Kuliner Khas Balikpapan
              </h2>
            </div>
            <Link
              to="/kuliner"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-primary transition-colors self-start sm:self-auto py-1"
            >
              <span>Jelajahi Semua Kuliner</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCulinary.map((tenant) => (
              <TenantCard key={tenant.id} tenant={tenant} basePath="/kuliner" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedSection;
