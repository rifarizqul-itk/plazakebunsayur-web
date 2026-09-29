import React from 'react'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import Badge from './Badge'

export function WhatsOnSection({ whatsOnList = [] }) {
  if (!whatsOnList || whatsOnList.length === 0) return null

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Agenda & Informasi Terkini
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pameran batu akik, bazar cinderamata khas Dayak, dan promo pedagang.
            </p>
          </div>
        </div>

        {/* Minimal Grid Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {whatsOnList.map((item) => (
            <div 
              key={item.id}
              className="group bg-slate-50/70 rounded-xl p-5 sm:p-6 border border-slate-200/70 hover:border-slate-300 hover:bg-white hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                    <Tag size={12} className="text-slate-500" />
                    <span>{item.type === 'event' ? 'Event' : 'Promo'}</span>
                  </span>
                  {item.start_date && (
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar size={13} />
                      {item.start_date} {item.end_date ? `s/d ${item.end_date}` : ''}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Atrium Utama</span>
                <span className="font-medium text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Detail agenda</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatsOnSection
