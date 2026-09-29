import React from 'react'
import { Home, Users, CreditCard, Car, ShieldCheck, Coffee, Sparkles, MapPin } from 'lucide-react'

// Icon mapping helper
const iconMap = {
  Home: Home,
  Users: Users,
  CreditCard: CreditCard,
  Car: Car,
  ShieldCheck: ShieldCheck,
  Coffee: Coffee,
}

export function FacilitiesSection({ facilities = [] }) {
  return (
    <section id="fasilitas" className="py-16 sm:py-20 bg-bunsay-cream/30 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with Yas Mall tracking */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold text-brand uppercase tracking-[0.25em] block mb-2">
            Kenyamanan Pengunjung
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif uppercase">
            FASILITAS & SARANA GEDUNG
          </h2>
          <div className="w-12 h-0.5 bg-bunsay-gold mx-auto my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Sarana pendukung lengkap untuk menjamin kenyamanan berbelanja bagi seluruh wisatawan nusantara dan mancanegara.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => {
            const IconComponent = iconMap[fac.icon_name] || Sparkles
            return (
              <div
                key={fac.id}
                className="group bg-white p-6 sm:p-7 border border-neutral-200 hover:border-brand/40 hover:shadow-subtle transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Clean Yas Mall Inspired Icon Box */}
                  <div className="w-12 h-12 bg-bunsay-cream border border-neutral-200 flex items-center justify-center text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white transition-all">
                    <IconComponent size={22} />
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand transition-colors">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
                  <MapPin size={13} className="text-brand" />
                  <span>{fac.location_note || 'Dalam Gedung'}</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FacilitiesSection
