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
    <section id="sewa" className="py-20 bg-mono-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest text-gold-accent uppercase">
            SPACE ENQUIRY • KEMITRAAN USAHA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-red tracking-tight mt-2">
            Penyewaan Kios & Lahan Usaha
          </h2>
          <p className="text-sm sm:text-base text-text-2 mt-3">
            Buka usaha Anda di pusat kerajinan dan wisata belanja paling legendaris di Balikpapan. Dapatkan kunjungan ribuan wisatawan dan pembeli setiap bulannya.
          </p>
        </div>

        {/* Tab Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {spaceTypes.map((tab) => {
            const Icon = tab.icon
            const isSelected = activeTab === tab.id
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setFormData((prev) => ({ ...prev, enquiry_type: tab.id }))
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-red shadow-card-elevated ring-2 ring-red/20'
                    : 'bg-white/70 border-border hover:border-gold-accent hover:bg-white shadow-card'
                }`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-red text-white' : 'bg-mono-100 text-text-2'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-base font-bold ${isSelected ? 'text-red' : 'text-text'}`}>
                    {tab.title}
                  </h3>
                  <p className="text-xs text-text-2 leading-relaxed">
                    {tab.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-red' : 'text-text-3'}>
                    {isSelected ? '✓ Terpilih' : 'Pilih Opsi Ini'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Form Container */}
        <div className="grid lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-card">
          
          {/* Left Column: Form Guidelines & Hotline */}
          <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-border lg:pr-8">
            <h3 className="text-xl font-bold text-text">
              Hubungi Tim Pemasaran & Pengelola
            </h3>
            <p className="text-sm text-text-2 leading-relaxed">
              Silakan isi formulir di samping untuk menyampaikan ketertarikan sewa kios, booth terbuka, atau izin penyelenggaraan pameran di Plaza Kebun Sayur.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-mono-50 border border-border">
                <div className="p-2 rounded-lg bg-green-bg text-green shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-text">Kantor Pengelola Gedung</p>
                  <p className="text-text-2 mt-0.5">(0542) 734xxx / 0812-3456-7890</p>
                  <p className="text-[11px] text-text-3 mt-1">Senin – Sabtu, 08.30 – 16.30 WITA</p>
                </div>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur,%20saya%20tertarik%20untuk%20menyewa%20kios/lahan"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="whatsapp" fullWidth className="gap-2">
                  <MessageCircle size={18} />
                  <span>Konsultasi Cepat via WhatsApp</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Actual Form */}
          <div className="lg:col-span-7">
            {status.success ? (
              <div className="bg-green-bg border border-green/30 rounded-2xl p-8 text-center space-y-4 my-8">
                <CheckCircle2 size={48} className="mx-auto text-green" />
                <h4 className="text-lg font-bold text-green">Permohonan Berhasil Dikirim!</h4>
                <p className="text-sm text-text-2 max-w-md mx-auto">
                  Terima kasih atas ketertarikan Anda. Tim pengelola Plaza Kebun Sayur akan segera menghubungi nomor telepon/WhatsApp Anda untuk informasi ketersediaan unit dan biaya sewa.
                </p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => setStatus({ loading: false, success: false, error: null })}
                >
                  Kirim Permohonan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {status.error && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red/30 text-xs text-red font-medium">
                    <AlertCircle size={16} />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-2 mb-1.5">
                      Nama Lengkap Pemohon *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2.5 bg-mono-50 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-2 mb-1.5">
                      Nama Usaha / Brand (Opsional)
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Contoh: Borneo Craft Gallery"
                      className="w-full px-3.5 py-2.5 bg-mono-50 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-red"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-2 mb-1.5">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-3.5 py-2.5 bg-mono-50 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-2 mb-1.5">
                      Pilihan Lokasi Lantai
                    </label>
                    <select
                      name="preferred_floor"
                      value={formData.preferred_floor}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-mono-50 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-red cursor-pointer"
                    >
                      <option value="Lantai Dasar (GF)">Lantai Dasar (GF) - Area Perhiasan & Kuliner</option>
                      <option value="Lantai 1 (L1)">Lantai 1 (L1) - Area Kerajinan Dayak & Batik</option>
                      <option value="Lantai 2 (L2)">Lantai 2 (L2) - Area Food Court & Jasa Poles</option>
                      <option value="Atrium Utama">Atrium Utama - Area Pameran / Event</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-2 mb-1.5">
                    Rencana Komoditas / Barang Dagangan
                  </label>
                  <textarea
                    name="business_description"
                    rows="3"
                    value={formData.business_description}
                    onChange={handleChange}
                    placeholder="Ceritakan singkat jenis barang yang akan Anda jual atau jenis acara pameran yang direncanakan..."
                    className="w-full px-3.5 py-2.5 bg-mono-50 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-red"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    disabled={status.loading}
                    className="gap-2"
                  >
                    <Send size={18} />
                    <span>{status.loading ? 'Mengirim Permohonan...' : 'Kirim Pengajuan Sewa Sekarang'}</span>
                  </Button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}

export default SpaceEnquirySection
