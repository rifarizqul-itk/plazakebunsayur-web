import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-sm select-none transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-pressed focus-visible:ring-brand-primary',
    accent:
      'bg-gold-text text-white hover:bg-[#73580e] focus-visible:ring-gold-text',
    dark:
      'bg-surface-dark text-white hover:bg-mono-800 focus-visible:ring-surface-dark',
    outline:
      'border border-border-subtle bg-transparent text-text-primary hover:bg-surface-subtle hover:border-border-hover focus-visible:ring-border-strong',
    ghost:
      'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle focus-visible:ring-border-subtle',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-5 py-3 min-h-[48px] gap-2 font-semibold',
  };

  const combinedClass = twMerge(
    clsx(baseClasses, variants[variant], sizes[size], className)
  );

  return (
    <Component className={combinedClass} disabled={disabled} {...props}>
      {children}
    </Component>
  );
}

export default Button;
