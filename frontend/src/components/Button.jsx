import React from 'react'
import { cn } from '../utils/cn'

const variantClasses = {
  primary: 'bg-red hover:bg-red-rich text-white font-bold tracking-wider uppercase shadow-subtle active:scale-[0.99] transition-all',
  dark: 'bg-mono-900 hover:bg-black text-white font-bold tracking-wider uppercase shadow-subtle active:scale-[0.99] transition-all',
  gold: 'bg-gold-accent hover:bg-[#A88647] text-white font-bold tracking-wider uppercase shadow-subtle active:scale-[0.99] transition-all',
  secondary: 'bg-white text-text border border-border hover:border-red hover:text-red font-semibold tracking-wide transition-all',
  outline: 'bg-transparent text-red border border-red hover:bg-red hover:text-white font-bold tracking-wider uppercase transition-all',
  ghost: 'bg-transparent text-text hover:text-red hover:bg-mono-100 transition-all',
  whatsapp: 'bg-green hover:bg-[#0E3E20] text-white font-semibold tracking-wide shadow-subtle transition-all',
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
