import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { Container } from '../layout/Container';

export function SlideItem({ slide, idx, isActive }) {
  const isFirstSlide = idx === 0;

  const innerContent = (
    <>
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover scale-102 transition-transform duration-7000 ease-out"
        loading={isFirstSlide ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mono-900/95 via-mono-900/40 to-mono-900/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-mono-900/60 via-transparent to-mono-900/30" />

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 sm:pb-12 pt-16">
        <Container>
          <div className="max-w-xl flex flex-col gap-1.5 text-white">
            {isFirstSlide ? (
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {slide.title}
              </h1>
            ) : (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {slide.title}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-mono-200 line-clamp-2 mt-0.5">
              {slide.desc}
            </p>
          </div>
        </Container>
      </div>
    </>
  );

  const containerClasses = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
  }`;

  if (slide.ctaHref) {
    return (
      <Link
        to={slide.ctaHref}
        className={`${containerClasses} block`}
        aria-hidden={!isActive}
        tabIndex={isActive ? 0 : -1}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div className={containerClasses} aria-hidden={!isActive}>
      {innerContent}
    </div>
  );
}

export function SlideControls({ isPaused, onTogglePause, currentSlide, totalSlides, onSelectSlide }) {
  const currentFormatted = String(currentSlide + 1).padStart(2, '0');
  const totalFormatted = String(totalSlides).padStart(2, '0');

  return (
    <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-30 flex items-center gap-2 bg-surface-dark/85 backdrop-blur-sm px-2.5 py-1 border border-white/10 rounded-sm shadow-subtle">
      <button
        type="button"
        onClick={onTogglePause}
        className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-gold active:text-gold-text transition-colors rounded-sm cursor-pointer focus:outline-none"
        aria-label={isPaused ? 'Putar otomatis slider' : 'Jeda otomatis slider'}
        title={isPaused ? 'Putar slider' : 'Jeda slider'}
      >
        {isPaused ? <Play size={16} className="fill-current" /> : <Pause size={16} className="fill-current" />}
      </button>
      <span className="text-xs font-mono font-bold text-white tracking-widest tabular-nums border-l border-white/20 pl-2 pr-1">
        {currentFormatted} / {totalFormatted}
      </span>
      <div className="flex items-center gap-1" role="group" aria-label="Navigasi Slide">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSlide(idx)}
            className="min-h-[44px] flex items-center px-1 cursor-pointer focus:outline-none"
            aria-label={`Buka slide ${idx + 1}`}
            aria-current={idx === currentSlide ? 'true' : 'false'}
          >
            <span
              className={`h-1.5 overflow-hidden transition-all rounded-sm relative block ${
                idx === currentSlide
                  ? 'w-8 bg-white/20'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            >
              {idx === currentSlide && (
                <span
                  key={`progress-${currentSlide}-${isPaused}`}
                  className="absolute inset-0 bg-gold rounded-sm origin-left"
                  style={{
                    animation: isPaused
                      ? 'none'
                      : 'hero-progress 5s linear forwards',
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ActionCardItem({ card }) {
  return (
    <Link
      to={card.href}
      className="group relative block w-full aspect-[4/3] bg-surface-muted rounded-md overflow-hidden border border-border-subtle hover:border-border-strong transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <img
        src={card.image}
        alt={card.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mono-900/90 via-mono-900/40 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1.5 text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-gold drop-shadow-sm">
          {card.category}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md leading-snug line-clamp-2">
          {card.title}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-gold transition-colors mt-1">
          <span>{card.btnText}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
