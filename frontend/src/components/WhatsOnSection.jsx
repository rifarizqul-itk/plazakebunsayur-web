import React from 'react'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

export function WhatsOnSection({ whatsOnList = [] }) {
  if (!whatsOnList || whatsOnList.length === 0) return null

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Yas Mall Style Tracking */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[11px] font-bold text-brand uppercase tracking-[0.25em] block mb-2">
              Agenda & Kegiatan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
              AGENDA TERKINI & PROMO
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xl">
              Pameran batu mulia, bazar cenderamata khas Dayak, dan promo pedagang resmi Plaza Kebun Sayur.
            </p>
          </div>
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            {whatsOnList.length} Agenda Aktif
          </div>
        </div>

        {/* Editorial Retail Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {whatsOnList.map((item) => (
            <div 
              key={item.id}
              className="group bg-white p-6 sm:p-7 border border-neutral-200 hover:border-brand/40 hover:shadow-subtle transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-50 text-brand border border-brand/20">
                    <Tag size={11} className="text-brand" />
                    <span>{item.type === 'event' ? 'Pameran / Acara' : 'Promosi Toko'}</span>
                  </span>
                  {item.start_date && (
                    <span className="text-xs text-neutral-400 font-medium flex items-center gap-1.5 tracking-wide">
                      <Calendar size={13} />
                      {item.start_date} {item.end_date ? `— ${item.end_date}` : ''}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-400 uppercase tracking-wider text-[11px] font-medium">
                  Atrium Utama Gedung
                </span>
                <span className="font-bold text-brand uppercase tracking-wider text-[11px] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Informasi</span>
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
