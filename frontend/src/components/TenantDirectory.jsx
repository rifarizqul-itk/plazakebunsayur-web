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
    <section id="direktori" className="py-20 bg-mono-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-gold-accent uppercase">
            SHOP • DINE • SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-red tracking-tight mt-2">
            Direktori Lengkap Kios & Tenant
          </h2>
          <p className="text-sm sm:text-base text-text-2 mt-3">
            Cari toko permata, cinderamata suku Dayak, penjahit batik, dan kuliner khas Balikpapan. Hubungi pemilik kios secara langsung melalui WhatsApp.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-card mb-10 space-y-5">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari toko, produk (misal: akik, batu kecubung, mandau, amplang, emas)..."
              className="w-full pl-12 pr-10 py-3.5 bg-mono-50 border border-border rounded-xl text-sm sm:text-base text-text focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-text-3 hover:text-text cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter Pills (Categories & Floors) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-border/60">
            
            {/* Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-red text-white shadow-xs'
                    : 'bg-mono-100 text-text hover:bg-mono-200'
                }`}
              >
                Semua Kategori ({tenants.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red text-white shadow-xs'
                      : 'bg-mono-100 text-text hover:bg-mono-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Floor Filter Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-text-3">Lantai:</span>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="bg-mono-50 border border-border rounded-xl px-3 py-1.5 text-xs font-bold text-text focus:outline-none focus:ring-1 focus:ring-red cursor-pointer"
              >
                <option value="all">Semua Lantai</option>
                {floors.map((fl) => (
                  <option key={fl.id} value={fl.id}>{fl.name}</option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-text-2 font-medium">
            Menampilkan <strong className="text-red">{filteredTenants.length}</strong> toko terdaftar
          </p>
          {(selectedCategory !== 'all' || selectedFloor !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedFloor('all')
                setSearchQuery('')
              }}
              className="text-xs text-red font-bold hover:underline cursor-pointer"
            >
              Reset Semua Filter
            </button>
          )}
        </div>

        {/* Tenant Cards Grid */}
        {filteredTenants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-border p-12 text-center max-w-md mx-auto">
            <Filter size={40} className="mx-auto text-text-3 mb-3 opacity-50" />
            <h3 className="text-base font-bold text-text">Toko Tidak Ditemukan</h3>
            <p className="text-xs text-text-2 mt-1">
              Coba gunakan kata kunci lain atau ubah filter kategori/lantai di atas.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white rounded-2xl border border-border hover:border-gold-accent/60 shadow-card hover:shadow-card-elevated transition-all duration-200 flex flex-col justify-between p-6 group"
              >
                <div className="space-y-3.5">
                  {/* Category & Floor Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="maroon">
                      {tenant.category?.name || 'Toko'}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-accent bg-gold-light/60 px-2 py-0.5 rounded-md">
                      <MapPin size={12} />
                      {tenant.floor?.code || 'GF'} • {tenant.unit_number || 'Lobi'}
                    </span>
                  </div>

                  {/* Store Title */}
                  <h3 
                    onClick={() => setActiveModalTenant(tenant)}
                    className="text-lg font-bold text-text group-hover:text-red transition-colors cursor-pointer"
                  >
                    {tenant.name}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-xs text-text-2 line-clamp-3 leading-relaxed">
                    {tenant.description}
                  </p>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-1.5 text-xs text-text-3 font-medium pt-1">
                    <Clock size={13} />
                    <span>{tenant.opening_hours || '09.00 – 18.00 WITA'}</span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-5 mt-4 border-t border-border/80 flex items-center gap-2.5">
                  <a
                    href={generateWhatsAppUrl(tenant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="whatsapp" size="sm" fullWidth className="gap-2">
                      <MessageCircle size={15} />
                      <span>Chat Toko (WA)</span>
                    </Button>
                  </a>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveModalTenant(tenant)}
                    className="px-3"
                    title="Detail Toko"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-border shadow-modal space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalTenant(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-text-3 hover:text-text hover:bg-mono-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="maroon">{activeModalTenant.category?.name}</Badge>
                <Badge variant="gold">{activeModalTenant.floor?.name || 'Lantai Dasar'}</Badge>
              </div>
              <h2 className="text-2xl font-extrabold text-red">
                {activeModalTenant.name}
              </h2>
              <p className="text-xs text-gold-accent font-bold mt-1">
                Lokasi: {activeModalTenant.unit_number}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-3 uppercase tracking-wider">
                Tentang Kios & Komoditas
              </h4>
              <p className="text-sm text-text-2 leading-relaxed bg-mono-50 p-4 rounded-xl border border-border/60">
                {activeModalTenant.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-mono-100/70 border border-border">
                <span className="text-text-3 font-semibold block">Jam Operasional:</span>
                <span className="font-bold text-text mt-0.5 block">{activeModalTenant.opening_hours || '09.00 – 18.00 WITA'}</span>
              </div>
              <div className="p-3 rounded-xl bg-mono-100/70 border border-border">
                <span className="text-text-3 font-semibold block">Media Sosial:</span>
                <span className="font-bold text-red mt-0.5 block">{activeModalTenant.instagram || 'Toko Fisik'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateWhatsAppUrl(activeModalTenant)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="whatsapp" fullWidth size="lg" className="gap-2">
                  <MessageCircle size={18} />
                  <span>Kirim Pesan Langsung via WhatsApp</span>
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
