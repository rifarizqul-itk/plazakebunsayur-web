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
    <section id="direktori" className="py-20 bg-mono-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Yas Mall Luxury Retail Style */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-gold-accent tracking-widest uppercase block mb-1">
            SHOPPING & RETAIL DIRECTORY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-text">
            Direktori Kios & Toko
          </h2>
          <div className="w-12 h-1 bg-red mx-auto mt-2 mb-3" />
          <p className="text-xs sm:text-sm text-text-2">
            Jelajahi ratusan kios batu mulia, perhiasan emas, kerajinan ukir Dayak, batik, dan kuliner khas Balikpapan.
          </p>
        </div>

        {/* Yas Mall Style Clean Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          
          {/* Integrated Search Input + Button */}
          <div className="flex shadow-card">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama toko, jenis batu akik, mandau, cinderamata, kuliner..."
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-r-0 border-border text-xs sm:text-sm text-text placeholder:text-text-3 focus:outline-none focus:ring-1 focus:ring-red focus:border-red"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-text-3 hover:text-text cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => {}}
              className="bg-red hover:bg-red-rich text-white text-xs font-bold tracking-widest uppercase px-6 sm:px-8 flex items-center justify-center cursor-pointer transition-colors"
            >
              Cari
            </button>
          </div>

          {/* Category Tabs & Floor Filter (Editorial Style) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            
            {/* Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-red text-white shadow-xs'
                    : 'bg-white text-text-2 border border-border hover:border-red hover:text-red'
                }`}
              >
                Semua ({tenants.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red text-white shadow-xs'
                      : 'bg-white text-text-2 border border-border hover:border-red hover:text-red'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Floor Filter Selector */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-text-3">Lantai:</span>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="bg-white border border-border px-3 py-1.5 text-xs font-bold text-text focus:outline-none focus:ring-1 focus:ring-red cursor-pointer shadow-xs uppercase tracking-wider"
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
          <p className="text-xs text-text-2 font-medium">
            Menampilkan <strong className="text-red font-bold">{filteredTenants.length}</strong> gerai terverifikasi
          </p>
          {(selectedCategory !== 'all' || selectedFloor !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedFloor('all')
                setSearchQuery('')
              }}
              className="text-xs text-red font-bold hover:underline cursor-pointer uppercase tracking-wider"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Tenant Cards Grid - Yas Mall Luxury Retail Cards */}
        {filteredTenants.length === 0 ? (
          <div className="bg-white border border-dashed border-border p-12 text-center max-w-sm mx-auto shadow-subtle">
            <Filter size={32} className="mx-auto text-text-3 mb-2" />
            <h3 className="text-sm font-bold text-text uppercase tracking-wider">Toko Tidak Ditemukan</h3>
            <p className="text-xs text-text-2 mt-1">
              Coba gunakan kata kunci pencarian lain atau reset filter kategori.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white border border-border hover:border-gold-accent shadow-card hover:shadow-card-elevated transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="p-6 space-y-3">
                  {/* Category & Location */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-[10px] font-bold text-red tracking-widest uppercase">
                      {tenant.category?.name || 'Toko'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-accent bg-gold-light/60 px-2 py-0.5">
                      <MapPin size={11} />
                      {tenant.floor?.code || 'GF'} • {tenant.unit_number || 'Lobi'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveModalTenant(tenant)}
                    className="text-base sm:text-lg font-bold text-text tracking-tight uppercase group-hover:text-red transition-colors cursor-pointer"
                  >
                    {tenant.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-2 line-clamp-2 leading-relaxed">
                    {tenant.description}
                  </p>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-1.5 text-[11px] text-text-3 pt-1">
                    <Clock size={12} className="text-gold-accent" />
                    <span>{tenant.opening_hours || '09.00 – 18.00 WITA'}</span>
                  </div>
                </div>

                {/* Card Action Row - Yas Mall Style Crisp Footer */}
                <div className="border-t border-border flex items-stretch">
                  <a
                    href={generateWhatsAppUrl(tenant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-mono-50 hover:bg-green hover:text-white text-green text-xs font-bold uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle size={14} />
                    <span>Chat WA</span>
                  </a>
                  
                  <button
                    onClick={() => setActiveModalTenant(tenant)}
                    className="border-l border-border bg-white hover:bg-mono-900 hover:text-white text-text-2 text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors cursor-pointer"
                  >
                    Detail ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Store Detail Modal */}
      {activeModalTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 border border-border shadow-modal space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalTenant(null)}
              className="absolute top-4 right-4 p-1.5 text-text-3 hover:text-text hover:bg-mono-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="maroon">{activeModalTenant.category?.name}</Badge>
                <Badge variant="gold">{activeModalTenant.floor?.name || 'Lantai Dasar'}</Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-text">
                {activeModalTenant.name}
              </h2>
              <p className="text-xs text-gold-accent font-bold mt-1 uppercase tracking-wider">
                Lokasi: {activeModalTenant.unit_number}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-text-3 uppercase tracking-widest">
                Deskripsi Toko & Komoditas
              </h4>
              <p className="text-xs sm:text-sm text-text-2 leading-relaxed bg-mono-50 p-4 border border-border">
                {activeModalTenant.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-mono-50 border border-border">
                <span className="text-text-3 font-semibold block uppercase tracking-wider text-[10px]">Jam Operasional</span>
                <span className="font-bold text-text mt-0.5 block">{activeModalTenant.opening_hours || '09.00 – 18.00 WITA'}</span>
              </div>
              <div className="p-3 bg-mono-50 border border-border">
                <span className="text-text-3 font-semibold block uppercase tracking-wider text-[10px]">Media Sosial</span>
                <span className="font-bold text-red mt-0.5 block">{activeModalTenant.instagram || 'Toko Fisik'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateWhatsAppUrl(activeModalTenant)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button variant="whatsapp" fullWidth size="md" className="gap-2 text-xs font-bold uppercase tracking-wider py-3.5">
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
