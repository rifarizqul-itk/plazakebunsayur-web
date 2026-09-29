import React from 'react'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import Badge from './Badge'

export function WhatsOnSection({ whatsOnList = [] }) {
  if (!whatsOnList || whatsOnList.length === 0) return null

  return (
    <section className="py-16 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-gold-accent uppercase">
              WHAT'S ON • INFO TERKINI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red tracking-tight mt-1">
              Agenda Event & Promo Terkini
            </h2>
          </div>
          <p className="text-sm text-text-2 max-w-md">
            Ikuti pameran batu akik, bazar cinderamata khas Dayak, dan penawaran menarik dari para pedagang Plaza Kebun Sayur.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {whatsOnList.map((item) => (
            <div 
              key={item.id}
              className="group bg-mono-50 rounded-2xl p-6 sm:p-8 border border-border hover:border-gold-accent/50 shadow-card hover:shadow-card-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={item.type === 'event' ? 'maroon' : 'gold'}>
                    {item.type === 'event' ? '🎪 Event Khusus' : '🏷️ Penawaran Promo'}
                  </Badge>
                  {item.start_date && (
                    <span className="text-xs text-text-3 font-medium flex items-center gap-1.5">
                      <Calendar size={14} />
                      {item.start_date} {item.end_date ? `s/d ${item.end_date}` : ''}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-red transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-text-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-border/80 flex items-center justify-between">
                <span className="text-xs font-bold text-gold-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight size={14} />
                </span>
                <span className="text-xs text-text-3 font-semibold">Atrium Utama</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatsOnSection
