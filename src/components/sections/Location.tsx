import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Create a premium custom marker icon
const customIcon = new L.DivIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #d4a373; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #1a0b02; box-shadow: 0 0 15px rgba(212,163,115,0.8);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
})

const POSITION: [number, number] = [34.0522, -118.2437] // LA placeholder

export function Location() {
  return (
    <section id="visit" className="py-48 bg-bg-secondary border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] text-gray-100 font-serif mb-12 leading-[1.1] tracking-tight">Visit The<br/>Sanctuary</h2>
          <div className="flex flex-col gap-10 mb-16">
            <div className="flex items-start gap-6">
              <MapPin className="text-accent mt-1" size={24} />
              <div>
                <h3 className="text-gray-100 font-serif text-2xl mb-2">The Roastery</h3>
                <p className="text-gray-400 font-sans">123 Cinematic Way<br/>Los Angeles, CA 90012</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-accent mt-1" size={24} />
              <div>
                <h3 className="text-gray-100 font-serif text-2xl mb-3">Hours</h3>
                <p className="text-gray-400 font-sans leading-relaxed">Mon-Fri: 7am - 7pm<br/>Sat-Sun: 8am - 8pm</p>
              </div>
            </div>
          </div>
          <button 
            data-interactive="true"
            className="flex items-center gap-4 text-accent uppercase tracking-[0.25em] font-sans text-[10px] group transition-colors hover:text-gray-100"
          >
            Get Directions 
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        
        <div 
          className="w-full aspect-square md:aspect-[4/3] bg-bg-primary rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-700 hover:border-accent/30 shadow-2xl z-20" 
          data-interactive="true"
        >
          {/* Interactive Map */}
          <MapContainer 
            center={POSITION} 
            zoom={13} 
            scrollWheelZoom={false}
            className="w-full h-full z-10"
            style={{ 
              // CSS Filter to make the free OSM map match the dark cinematic aesthetic
              filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%) sepia(30%)',
              backgroundColor: '#1a0b02'
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={POSITION} icon={customIcon}>
              <Popup className="coffee-popup">
                <div className="text-center font-sans p-2">
                  <h4 className="text-[#1a0b02] font-serif text-xl mb-1 font-bold">CoffeeBrew</h4>
                  <p className="text-sm text-gray-600 mb-2">Open daily 7am — 8pm</p>
                  <p className="text-xs text-[#d4a373] uppercase tracking-[0.1em] font-bold">Freshly roasted.</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-[2rem] pointer-events-none transition-colors duration-700 z-30" />
        </div>
      </div>
    </section>
  )
}
