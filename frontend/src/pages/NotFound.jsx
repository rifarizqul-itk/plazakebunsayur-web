import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="py-24 sm:py-32 bg-canvas flex-1 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-4">
          <span className="text-6xl sm:text-7xl font-extrabold text-brand-primary tracking-tight">
            404
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Halaman yang Anda tuju mungkin telah dipindahkan atau tautan yang Anda masukkan salah.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button as={Link} to="/" variant="primary" size="md">
              <Home size={16} className="mr-2" />
              <span>Kembali ke Beranda</span>
            </Button>
            <Button as={Link} to="/belanja" variant="outline" size="md">
              <ShoppingBag size={16} className="mr-2" />
              <span>Direktori Belanja</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
