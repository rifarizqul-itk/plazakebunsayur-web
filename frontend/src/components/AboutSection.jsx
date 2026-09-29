import React from 'react'
import { MapPin, Navigation, Compass, Landmark } from 'lucide-react'
import Button from './Button'

export function AboutSection() {
  return (
    <section id="tentang" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Historical Narratives with Yas Mall Style Tracking */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-bold text-brand uppercase tracking-[0.25em] block mb-2">
                Sejarah & Warisan Budaya
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight font-serif uppercase leading-tight">
                SENTRA CAGAR BELANJA & SENI DAYAK SEJAK 1980-AN
              </h2>
              <div className="w-14 h-0.5 bg-bunsay-gold my-3.5" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              <p>
                <strong className="text-neutral-900 font-semibold">Plaza Kebun Sayur</strong> (awalnya dikenal sebagai <em>Pasar Inpres Kebun Sayur</em>) merupakan salah satu cagar belanja cenderamata tertua dan paling ikonik di Kota Balikpapan, pintu gerbang Kalimantan Timur.
              </p>
              <p>
                Pasar ini terkenal di seantero nusantara sebagai sentra perburuan <strong>Batu Mulia Kalimantan</strong> (seperti Kecubung Pangkalan Bun, Red Borneo, dan Akik Motif Asli), perhiasan emas/perak, kerajinan ukir Dayak, mandau pusaka, manik-manik etnik, sarung tenun Samarinda, serta oleh-oleh panganan khas pesisir.
              </p>
              <p>
                Dengan gedung plaza representatif 3 lantai yang tertata rapi, Plaza Kebun Sayur melestarikan warisan ekonomi kerakyatan dan menjadi destinasi wajib bagi setiap wisatawan domestik, instansi pemerintahan, hingga delegasi Ibu Kota Nusantara (IKN).
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation size={14} className="text-brand" />
                  <span>PETUNJUK ARAH GOOGLE MAPS</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Frame & Location Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden border border-neutral-300 shadow-subtle bg-neutral-100 aspect-video lg:aspect-4/3 relative">
              <iframe
                title="Peta Lokasi Plaza Kebun Sayur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.850406560938!2d116.8222687758778!3d-1.2621008356012874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df147573d8a7c1b%3A0xe54d4f6efba98305!2sPasar%20Inpres%20Kebun%20Sayur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-5 bg-bunsay-cream border border-neutral-200 text-xs text-neutral-600 flex items-start gap-3">
              <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider text-neutral-900 text-[11px]">
                  Alamat Lengkap Kawasan
                </p>
                <p className="mt-1 leading-relaxed">
                  Jl. Letjen Suprapto, Baru Ilir, Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutSection
