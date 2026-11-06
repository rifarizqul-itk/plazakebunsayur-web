import React from 'react';
import { Container } from './Container';

export function PageHeader({ eyebrow, title, description, children, backgroundImage }) {
  const hasHeroImage = Boolean(backgroundImage);
  const heroBgUrl =
    typeof backgroundImage === 'string' && backgroundImage.trim().length > 0
      ? backgroundImage
      : '/assets/Photograph_of_plaza_building.webp';

  if (hasHeroImage) {
    return (
      <div className="relative bg-surface-dark py-12 sm:py-16 md:py-20 overflow-hidden border-b border-border-subtle">
        <img
          src={heroBgUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mono-900/90 via-mono-900/60 to-mono-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-mono-900/60 via-transparent to-mono-900/30" />
        <Container className="relative z-10">
          <div className="max-w-3xl flex flex-col gap-2">
            {eyebrow && (
              <span className="text-xs font-semibold text-gold tracking-wide">
                {eyebrow}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              {title}
            </h1>
            {description && (
              <p className="text-sm sm:text-base text-mono-200 leading-relaxed mt-1 max-w-prose">
                {description}
              </p>
            )}
            {children && <div className="mt-4">{children}</div>}
          </div>
        </Container>
      </div>
    );
  }

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
