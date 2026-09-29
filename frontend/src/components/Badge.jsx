import React from 'react'
import { cn } from '../utils/cn'

const variantClasses = {
  default: 'bg-slate-100 text-slate-700 border border-slate-200/70 font-medium',
  maroon: 'bg-rose-50 text-rose-900 border border-rose-200/60 font-medium',
  gold: 'bg-amber-50 text-amber-800 border border-amber-200/60 font-medium',
  green: 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium',
  orange: 'bg-orange-50 text-orange-800 border border-orange-200/60 font-medium',
}

export function Badge({ children, variant = 'default', className = '', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
