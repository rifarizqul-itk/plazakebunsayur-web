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
    <section id="fasilitas" className="py-20 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest text-gold-accent uppercase">
            FACILITIES & SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-red tracking-tight mt-2">
            Fasilitas Kenyamanan Pengunjung
          </h2>
          <p className="text-sm sm:text-base text-text-2 mt-3">
            Plaza Kebun Sayur menyediakan berbagai sarana pendukung guna menjamin keamanan dan kenyamanan berbelanja bagi seluruh wisatawan lokal maupun mancanegara.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => {
            const IconComponent = iconMap[fac.icon_name] || Sparkles
            return (
              <div
                key={fac.id}
                className="bg-mono-50 rounded-2xl p-6 sm:p-7 border border-border hover:border-red/40 shadow-card hover:shadow-card-elevated transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className="w-13 h-13 rounded-2xl bg-red text-white flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-gold-accent group-hover:text-mono-900 transition-all duration-300">
                    <IconComponent size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-text group-hover:text-red transition-colors">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-border/80 flex items-center gap-1.5 text-xs text-gold-accent font-bold">
                  <MapPin size={13} />
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
