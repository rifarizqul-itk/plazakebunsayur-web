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
    <section id="fasilitas" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fasilitas Pengunjung
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Sarana pendukung untuk menjamin kenyamanan berbelanja bagi seluruh pengunjung.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((fac) => {
            const IconComponent = iconMap[fac.icon_name] || Sparkles
            return (
              <div
                key={fac.id}
                className="bg-slate-50/60 rounded-xl p-5 sm:p-6 border border-slate-200/70 hover:border-slate-300 hover:bg-white hover:shadow-subtle transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Clean Icon Badge */}
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                    <IconComponent size={20} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin size={12} className="text-slate-400" />
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
