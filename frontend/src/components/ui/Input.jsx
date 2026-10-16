import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-canvas border rounded-sm transition-all duration-150',
            'placeholder:text-text-muted text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary',
            error
              ? 'border-brand-primary focus-visible:ring-brand-primary'
              : 'border-border-input focus-visible:ring-brand-primary focus:border-brand-primary',
            className
          )
        )}
        {...props}
      />
      {error && <span className="text-sm text-brand-primary font-medium">{error}</span>}
      {!error && helperText && <span className="text-xs text-text-secondary">{helperText}</span>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={twMerge(
          clsx(
            'w-full px-3.5 py-2.5 text-sm bg-canvas border rounded-sm transition-all duration-150',
            'placeholder:text-text-muted text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary resize-y',
            error
              ? 'border-brand-primary focus-visible:ring-brand-primary'
              : 'border-border-input focus-visible:ring-brand-primary focus:border-brand-primary',
            className
          )
        )}
        {...props}
      />
      {error && <span className="text-sm text-brand-primary font-medium">{error}</span>}
      {!error && helperText && <span className="text-xs text-text-secondary">{helperText}</span>}
    </div>
  );
}
