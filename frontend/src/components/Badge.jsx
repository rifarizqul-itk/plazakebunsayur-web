import React from 'react'
import { cn } from '../utils/cn'

const variantClasses = {
  default: 'bg-mono-100 text-text border border-border',
  maroon: 'bg-red-50 text-red border border-red/20 font-medium',
  gold: 'bg-gold-light text-[#7C5A0B] border border-gold-accent/30 font-medium',
  green: 'bg-green-bg text-green border border-green/20 font-medium',
  orange: 'bg-orange-bg text-orange border border-orange/20 font-medium',
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
