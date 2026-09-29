import React from 'react'
import { cn } from '../utils/cn'

const variantClasses = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 shadow-xs active:scale-[0.98]',
  brand: 'bg-brand text-white hover:bg-brand-hover focus:ring-2 focus:ring-brand focus:ring-offset-2 shadow-xs active:scale-[0.98]',
  gold: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-xs active:scale-[0.98]',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-xs active:scale-[0.98]',
  outline: 'bg-transparent text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]',
  ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98]',
  whatsapp: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-xs active:scale-[0.98]',
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
