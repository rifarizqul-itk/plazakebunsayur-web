import React from 'react'
import { cn } from '../utils/cn'

const variantClasses = {
  primary: 'bg-red text-white hover:bg-red-rich focus:ring-2 focus:ring-red focus:ring-offset-2 shadow-xs hover:shadow-sm active:scale-[0.98]',
  gold: 'bg-gold-accent text-white hover:bg-[#b0871e] focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 shadow-xs hover:shadow-sm active:scale-[0.98]',
  secondary: 'bg-mono-100 text-text border border-border hover:bg-mono-200 focus:ring-2 focus:ring-red focus:ring-offset-2 active:scale-[0.98]',
  outline: 'bg-transparent text-red border border-red hover:bg-red-50 focus:ring-2 focus:ring-red focus:ring-offset-2 active:scale-[0.98]',
  ghost: 'bg-transparent text-text hover:bg-mono-100 active:scale-[0.98]',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1EBE5D] focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-xs hover:shadow-sm active:scale-[0.98]',
}

const sizeClasses = {
  xs: 'px-2.5 py-1 text-xs min-h-8 rounded-lg font-semibold',
  sm: 'px-3.5 py-1.5 text-xs sm:text-sm min-h-9 rounded-lg font-semibold',
  md: 'px-5 py-2 text-xs sm:text-sm min-h-10 rounded-xl font-semibold',
  lg: 'px-6 py-2.5 text-sm sm:text-base min-h-11 rounded-xl font-bold',
}

export const Button = React.memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-sans transition-all duration-150 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        fullWidth && 'w-full',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
