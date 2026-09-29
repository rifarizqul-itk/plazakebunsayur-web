import React, { useState } from 'react'
import { Building2, Store, CalendarCheck, Phone, CheckCircle2, AlertCircle, Send, MessageCircle } from 'lucide-react'
import Button from './Button'
import { submitSpaceEnquiry } from '../services/api'

export function SpaceEnquirySection() {
  const [activeTab, setActiveTab] = useState('leasing_kios')
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone_number: '',
    email: '',
    enquiry_type: 'leasing_kios',
    preferred_floor: 'Lantai Dasar (GF)',
    business_description: '',
    notes: '',
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  const spaceTypes = [
    {
      id: 'leasing_kios',
      title: 'Sewa Kios Permanen',
      icon: Store,
      desc: 'Pilihan kios strategis untuk toko emas, permata, kerajinan etnik, dan batik dengan kontrak sewa tahunan.',
    },
    {
      id: 'exhibition',
      title: 'Stand Pameran / Atrium',
      icon: CalendarCheck,
      desc: 'Lahan terbuka di atrium utama untuk pameran batu akik mulia, expo kerajinan, dan bazar promosi.',
    },
    {
      id: 'open_counter',
      title: 'Open Counter / Lapak Teras',
      icon: Building2,
      desc: 'Booth island atau gerai terbuka di koridor utama pengunjung untuk produk cinderamata atau aksesoris.',
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      await submitSpaceEnquiry({ ...formData, enquiry_type: activeTab })
      setStatus({ loading: false, success: true, error: null })
      setFormData({
        full_name: '',
        company_name: '',
        phone_number: '',
        email: '',
        enquiry_type: activeTab,
        preferred_floor: 'Lantai Dasar (GF)',
        business_description: '',
        notes: '',
      })
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Terjadi kesalahan saat mengirim pengajuan.' })
    }
  }

  return (
    <section id="sewa" className="py-16 sm:py-20 bg-bunsay-cream/40 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Yas Mall Style Tracking */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-brand uppercase tracking-[0.25em] block mb-2">
            Kemitraan & Investasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif uppercase">
            PENYEWAAN KIOS & LAHAN USAHA
          </h2>
          <div className="w-12 h-0.5 bg-bunsay-gold mx-auto my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Buka gerai bisnis Anda di pusat cenderamata, perhiasan emas, dan batu mulia terpopuler di Balikpapan.
          </p>
        </div>

        {/* Clean Segmented Tab Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-8">
          {spaceTypes.map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setFormData((prev) => ({ ...prev, enquiry_type: tab.id }))
                }}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand text-white border border-brand shadow-sm'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand/40 hover:text-brand'
                }`}
              >
                {tab.title}
              </button>
            )
          })}
        </div>

        {/* Crisp Centered Form Card */}
        <div className="max-w-2xl mx-auto bg-white border border-neutral-200 p-7 sm:p-9 shadow-subtle">
          
          {/* Active Tab Notice */}
          <div className="mb-6 pb-5 border-b border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900 font-serif">
              Formulir Permohonan: {spaceTypes.find((t) => t.id === activeTab)?.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              {spaceTypes.find((t) => t.id === activeTab)?.desc}
            </p>
          </div>

          {status.success ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 size={46} className="mx-auto text-emerald-600" />
              <h4 className="text-lg font-bold text-neutral-900 font-serif">Permohonan Berhasil Terkirim</h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Terima kasih. Tim manajemen Plaza Kebun Sayur akan segera menghubungi nomor telepon/WhatsApp Anda untuk informasi ketersediaan unit, denah, dan jadwal survei lokasi.
              </p>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setStatus({ loading: false, success: false, error: null })}
                >
                  KIRIM PERMOHONAN LAIN
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {status.error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  <AlertCircle size={15} />
                  <span>{status.error}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nama Lengkap Pemohon"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Nama Usaha / Brand
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Nama Toko atau Merek"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Pilihan Lokasi Lantai
                  </label>
                  <select
                    name="preferred_floor"
                    value={formData.preferred_floor}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand cursor-pointer"
                  >
                    <option value="Lantai Dasar (GF)">Lantai Dasar (GF) - Perhiasan & Kuliner</option>
                    <option value="Lantai 1 (L1)">Lantai 1 (L1) - Kerajinan Dayak & Batik</option>
                    <option value="Lantai 2 (L2)">Lantai 2 (L2) - Food Court & Jasa Poles</option>
                    <option value="Atrium Utama">Atrium Utama - Area Pameran</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Rencana Komoditas / Barang Dagangan
                </label>
                <textarea
                  name="business_description"
                  rows="3"
                  value={formData.business_description}
                  onChange={handleChange}
                  placeholder="Deskripsikan jenis produk, perhiasan, batu mulia, cenderamata, atau konsep usaha Anda..."
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  size="md" 
                  disabled={status.loading}
                  className="gap-2"
                >
                  <Send size={15} />
                  <span>{status.loading ? 'MENGIRIM PERMOHONAN...' : 'KIRIM PERMOHONAN SEWA'}</span>
                </Button>
              </div>

              <div className="text-center pt-3 border-t border-neutral-100">
                <p className="text-xs text-neutral-500">
                  Perlu konsultasi unit langsung?{' '}
                  <a 
                    href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur,%20saya%20tertarik%20sewa%20kios" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand font-bold hover:underline inline-flex items-center gap-1 ml-1"
                  >
                    <MessageCircle size={14} />
                    Chat Pengelola via WhatsApp
                  </a>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  )
}

export default SpaceEnquirySection
