import React, { useState, useMemo } from 'react'
import { Search, MapPin, Clock, MessageCircle, Sparkles, Filter, X } from 'lucide-react'
import Button from './Button'
import Badge from './Badge'

export function TenantDirectory({ tenants = [], categories = [], floors = [] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [activeModalTenant, setActiveModalTenant] = useState(null)

  // Filter logic
  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      // Category filter
      if (selectedCategory !== 'all' && tenant.category_id !== Number(selectedCategory)) {
        return false
      }
      // Floor filter
      if (selectedFloor !== 'all' && tenant.floor_id !== Number(selectedFloor)) {
        return false
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchName = tenant.name?.toLowerCase().includes(q)
        const matchDesc = tenant.description?.toLowerCase().includes(q)
        const matchUnit = tenant.unit_number?.toLowerCase().includes(q)
        const matchCat = tenant.category?.name?.toLowerCase().includes(q)
        return matchName || matchDesc || matchUnit || matchCat
      }
      return true
    })
  }, [tenants, selectedCategory, selectedFloor, searchQuery])

  const generateWhatsAppUrl = (tenant) => {
    const phone = tenant.phone_whatsapp?.replace(/\D/g, '') || '6281234567890'
    const message = encodeURIComponent(
      `Halo ${tenant.name}, saya melihat profil toko Anda di Website Resmi Plaza Kebun Sayur. Apakah barang dagangan tersedia?`
    )
    return `https://wa.me/${phone}?text=${message}`
  }

  return (
    <section id="direktori" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Direktori Kios & Tenant
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Cari toko permata, cinderamata Dayak, penjahit batik, dan kuliner khas Balikpapan.
          </p>
        </div>

        {/* Minimal Search & Filter Bar */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          
          {/* Clean Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari toko, batu akik, mandau, batik, amplang..."
              className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 shadow-xs transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Minimalist Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            
            {/* Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Semua ({tenants.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Floor Filter Selector */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="text-slate-500 font-medium">Lantai:</span>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer shadow-xs"
              >
                <option value="all">Semua Lantai</option>
                {floors.map((fl) => (
                  <option key={fl.id} value={fl.id}>{fl.name}</option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto px-1">
          <p className="text-xs text-slate-500">
            Menampilkan <strong className="text-slate-900 font-semibold">{filteredTenants.length}</strong> toko
          </p>
          {(selectedCategory !== 'all' || selectedFloor !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedFloor('all')
                setSearchQuery('')
              }}
              className="text-xs text-brand font-medium hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Tenant Cards Grid */}
        {filteredTenants.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-12 text-center max-w-sm mx-auto">
            <Filter size={32} className="mx-auto text-slate-300 mb-2" />
            <h3 className="text-sm font-semibold text-slate-800">Toko Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">
              Coba gunakan kata kunci lain atau reset filter.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 shadow-subtle hover:shadow-card-elevated transition-all duration-200 flex flex-col justify-between p-5 group"
              >
                <div className="space-y-3">
                  {/* Category & Location */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {tenant.category?.name || 'Toko'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <MapPin size={11} className="text-slate-400" />
                      {tenant.floor?.code || 'GF'} • {tenant.unit_number || 'Lobi'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveModalTenant(tenant)}
                    className="text-base font-bold text-slate-900 group-hover:text-brand transition-colors cursor-pointer"
                  >
                    {tenant.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {tenant.description}
                  </p>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Clock size={12} />
                    <span>{tenant.opening_hours || '09.00 – 18.00 WITA'}</span>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={generateWhatsAppUrl(tenant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="whatsapp" size="xs" fullWidth className="gap-1.5 text-xs py-2">
                      <MessageCircle size={14} />
                      <span>Chat WhatsApp</span>
                    </Button>
                  </a>
                  
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => setActiveModalTenant(tenant)}
                    className="px-3 text-xs py-2 text-slate-600"
                  >
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Store Detail Modal */}
      {activeModalTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-modal space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalTenant(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">{activeModalTenant.category?.name}</Badge>
                <Badge variant="default">{activeModalTenant.floor?.name || 'Lantai Dasar'}</Badge>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeModalTenant.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Unit / Lokasi: {activeModalTenant.unit_number}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Deskripsi
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {activeModalTenant.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-medium block">Jam Operasional</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeModalTenant.opening_hours || '09.00 – 18.00 WITA'}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-medium block">Media Sosial</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeModalTenant.instagram || 'Toko Fisik'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateWhatsAppUrl(activeModalTenant)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button variant="whatsapp" fullWidth size="md" className="gap-2 text-sm font-medium">
                  <MessageCircle size={16} />
                  <span>Kirim Pesan WhatsApp ke Pedagang</span>
                </Button>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

export default TenantDirectory
