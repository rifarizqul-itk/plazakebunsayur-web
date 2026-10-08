import React from 'react';
import { Container } from './Container';

export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="bg-surface-subtle border-b border-border-subtle py-8 sm:py-12">
      <Container>
        <div className="max-w-3xl flex flex-col gap-2">
          {eyebrow && (
            <span className="text-xs font-semibold text-brand-primary tracking-wide">
              {eyebrow}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-1 max-w-prose">
              {description}
            </p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </Container>
    </div>
  );
}

export default PageHeader;
