import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatsOnSection from './components/WhatsOnSection'
import TenantDirectory from './components/TenantDirectory'
import FacilitiesSection from './components/FacilitiesSection'
import SpaceEnquirySection from './components/SpaceEnquirySection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import { MessageCircle } from 'lucide-react'
import {
  fetchCategories,
  fetchFloors,
  fetchTenants,
  fetchFacilities,
  fetchWhatsOn,
} from './services/api'

export function App() {
  const [activeSection, setActiveSection] = useState('beranda')
  const [categories, setCategories] = useState([])
  const [floors, setFloors] = useState([])
  const [tenants, setTenants] = useState([])
  const [facilities, setFacilities] = useState([])
  const [whatsOnList, setWhatsOnList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, flrs, tnts, facs, news] = await Promise.all([
          fetchCategories(),
          fetchFloors(),
          fetchTenants(),
          fetchFacilities(),
          fetchWhatsOn(),
        ])
        setCategories(cats)
        setFloors(flrs)
        setTenants(tnts)
        setFacilities(facs)
        setWhatsOnList(news)
      } catch (err) {
        console.error('Failed to load initial data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-mono-50 font-sans selection:bg-red selection:text-white">
      {/* Top Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <div id="beranda">
          <Hero
            onExploreClick={() => handleNavigate('direktori')}
            onEnquiryClick={() => handleNavigate('sewa')}
          />
        </div>

        {/* What's On / Events & Promos */}
        <WhatsOnSection whatsOnList={whatsOnList} />

        {/* Commercial Directory (Tenants, Kiosks, Crafts) */}
        <TenantDirectory
          tenants={tenants}
          categories={categories}
          floors={floors}
        />

        {/* Mall Facilities */}
        <FacilitiesSection facilities={facilities} />

        {/* Space Enquiry / Booth & Kiosk Leasing */}
        <SpaceEnquirySection />

        {/* History, About Us, and Google Maps */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/6281234567890?text=Halo%20Pengelola%20Plaza%20Kebun%20Sayur,%20saya%20ingin%20bertanya"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-modal hover:shadow-card-elevated hover:scale-105 transition-all duration-200 font-bold text-xs sm:text-sm tracking-wide"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Tanya Pengelola</span>
        </a>
      </aside>
    </div>
  )
}

export default App
