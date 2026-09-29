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
      desc: 'Lahan terbuka di atrium utama untuk penyelenggaraan pameran batu akik, bazar UMKM, dan event promosi.',
    },
    {
      id: 'open_counter',
      title: 'Open Counter / Lapak Teras',
      icon: Building2,
      desc: 'Booth island atau gerai terbuka di koridor lalu lintas pengunjung untuk produk oleh-oleh atau aksesoris.',
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
    <section id="sewa" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Penyewaan Kios & Lahan Usaha
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Buka gerai bisnis Anda di pusat cinderamata dan perhiasan terpopuler Balikpapan.
          </p>
        </div>

        {/* Clean Segmented Tab Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto mb-8">
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.title}
              </button>
            )
          })}
        </div>

        {/* Clean Centered Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-card">
          
          {/* Active Tab Notice */}
          <div className="mb-6 pb-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Formulir Minat: {spaceTypes.find((t) => t.id === activeTab)?.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {spaceTypes.find((t) => t.id === activeTab)?.desc}
            </p>
          </div>

          {status.success ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 size={44} className="mx-auto text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Permohonan Berhasil Terkirim</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Terima kasih. Tim pengelola Plaza Kebun Sayur akan segera menghubungi nomor telepon/WhatsApp Anda untuk informasi ketersediaan unit dan jadwal survei lokasi.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setStatus({ loading: false, success: false, error: null })}
                className="text-xs"
              >
                Kirim Permohonan Lain
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {status.error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  <AlertCircle size={15} />
                  <span>{status.error}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nama Usaha / Brand
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Nama Toko atau Brand"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Pilihan Lokasi
                  </label>
                  <select
                    name="preferred_floor"
                    value={formData.preferred_floor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="Lantai Dasar (GF)">Lantai Dasar (GF) - Perhiasan & Kuliner</option>
                    <option value="Lantai 1 (L1)">Lantai 1 (L1) - Kerajinan Dayak & Batik</option>
                    <option value="Lantai 2 (L2)">Lantai 2 (L2) - Food Court & Jasa Poles</option>
                    <option value="Atrium Utama">Atrium Utama - Area Pameran</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Rencana Komoditas / Barang Dagangan
                </label>
                <textarea
                  name="business_description"
                  rows="2"
                  value={formData.business_description}
                  onChange={handleChange}
                  placeholder="Deskripsikan singkat jenis produk atau rencana jualan Anda..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  size="md" 
                  disabled={status.loading}
                  className="gap-2 text-sm font-semibold"
                >
                  <Send size={15} />
                  <span>{status.loading ? 'Mengirim...' : 'Kirim Pengajuan Sewa'}</span>
                </Button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Butuh respon cepat?{' '}
                  <a 
                    href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur,%20saya%20tertarik%20sewa%20kios" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle size={13} />
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
