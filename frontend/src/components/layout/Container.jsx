import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Container({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={twMerge(clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className))}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
