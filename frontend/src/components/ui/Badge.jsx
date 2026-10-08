import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center font-medium rounded-full select-none transition-colors';

  const variants = {
    neutral: 'bg-surface-subtle text-text-secondary border border-border-subtle',
    brand: 'bg-brand-surface-strong text-brand-primary border border-brand-primary/20',
    gold: 'bg-surface-dark text-gold border border-gold/30',
    dark: 'bg-surface-dark text-white',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    muted: 'bg-surface-muted text-text-muted border border-border-subtle',
  };

  const sizes = {
    xs: 'text-xs px-2 py-0.5 leading-normal',
    sm: 'text-xs px-2.5 py-0.5 leading-normal',
    md: 'text-xs px-3 py-1 leading-normal font-semibold',
  };

  return (
    <span
      className={twMerge(clsx(baseClasses, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
