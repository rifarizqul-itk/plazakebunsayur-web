import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { useContent } from '../hooks/useContent';

export function NotFound() {
  const title = useContent('not_found.title', 'Halaman Tidak Ditemukan');
  const description = useContent(
    'not_found.description',
    'Halaman yang Anda tuju mungkin telah dipindahkan atau tautan yang Anda masukkan salah.'
  );
  const ctaHome = useContent('not_found.cta_home', 'Kembali ke Beranda');
  const ctaDirectory = useContent('not_found.cta_directory', 'Direktori Belanja');

  return (
    <div className="py-24 sm:py-32 bg-canvas flex-1 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-4">
          <span className="text-6xl sm:text-7xl font-bold text-brand-primary tracking-tight">
            404
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button as={Link} to="/" variant="primary" size="md">
              <Home size={16} className="mr-2" />
              <span>{ctaHome}</span>
            </Button>
            <Button as={Link} to="/belanja" variant="outline" size="md">
              <ShoppingBag size={16} className="mr-2" />
              <span>{ctaDirectory}</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
