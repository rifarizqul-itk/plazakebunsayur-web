import React from 'react'
import { MapPin, Navigation, Compass, Landmark } from 'lucide-react'
import Button from './Button'

export function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Historical Narratives */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold tracking-widest text-gold-accent uppercase">
              SEJARAH & PROFIL GEDUNG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-red tracking-tight">
              Ikon Warisan Budaya & Belanja Nusantara Sejak Era 1980-an
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-text-2 leading-relaxed">
              <p>
                <strong>Plaza Kebun Sayur</strong> (awalnya dikenal sebagai <em>Pasar Inpres Kebun Sayur</em>) merupakan salah satu cagar belanja cenderamata tertua dan paling ikonik di Kota Balikpapan, Kalimantan Timur.
              </p>
              <p>
                Pasar ini terkenal di seantero Indonesia dan mancanegara sebagai sentra perburuan <strong>Batu Mulia Kalimantan</strong> (seperti Kecubung Pangkalan Bun, Red Borneo, dan Akik Motif), perhiasan emas/perak, kerajinan ukir Dayak, mandau pusaka, sarung tenun Samarinda, serta oleh-oleh panganan khas pesisir.
              </p>
              <p>
                Kini dengan wajah bangunan plaza modern 3 lantai yang tertata rapi, Plaza Kebun Sayur terus melestarikan warisan ekonomi kerakyatan dan menjadi destinasi wajib bagi setiap wisatawan domestik, pejabat negara, hingga delegasi Ibu Kota Nusantara (IKN).
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a 
                href="https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 border-red text-red hover:bg-red-50">
                  <Navigation size={16} />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Frame & Location Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl overflow-hidden border border-border shadow-card bg-mono-100 aspect-video lg:aspect-square relative">
              <iframe
                title="Peta Lokasi Plaza Kebun Sayur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.850406560938!2d116.8222687758778!3d-1.2621008356012874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df147573d8a7c1b%3A0xe54d4f6efba98305!2sPasar%20Inpres%20Kebun%20Sayur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-5 rounded-2xl bg-mono-50 border border-border text-xs sm:text-sm text-text-2 space-y-1.5">
              <p className="font-bold text-text flex items-center gap-2">
                <MapPin size={16} className="text-red" />
                <span>Alamat Lengkap</span>
              </p>
              <p className="pl-6">
                Jl. Letjen Suprapto, Kelurahan Baru Ilir, Kec. Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutSection
