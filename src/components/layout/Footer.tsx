import { Coffee, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'

export function Footer() {
  return (
    <footer className="bg-bg-primary pt-48 pb-12 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Huge background text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none flex justify-center pt-24">
        <span className="font-serif text-[18vw] leading-none whitespace-nowrap text-accent">COFFEEBREW</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-20 mb-32">
          <div>
            <h2 className="text-gray-100 text-5xl font-serif mb-8 flex items-center gap-4">
              <Coffee size={48} className="text-accent" /> CoffeeBrew
            </h2>
            <p className="text-gray-400 max-w-[400px] font-sans text-lg mb-12 font-light leading-relaxed">
              Elevating the daily ritual, one cup at a time. Join us in our pursuit of the perfect extraction.
            </p>
            <div className="flex gap-6">
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                className="bg-transparent border-b border-white/20 pb-4 px-2 text-gray-100 font-sans focus:outline-none focus:border-accent transition-colors w-full max-w-[288px] placeholder:text-gray-600"
                data-interactive="true"
              />
              <Button variant="ghost" size="sm">Subscribe</Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6">Explore</h3>
            {['Story', 'Blends', 'Process', 'Visit'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-accent transition-colors text-base font-sans w-fit tracking-wide" data-interactive="true">{item}</a>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6">Connect</h3>
            <div className="flex gap-6 items-center">
              <a href="#" aria-label="Email" className="text-gray-400 hover:text-bg-primary hover:bg-accent transition-all duration-300 p-4 rounded-full border border-white/10 hover:border-accent" data-interactive="true"><Mail size={20} /></a>
              <a href="#" aria-label="Phone" className="text-gray-400 hover:text-bg-primary hover:bg-accent transition-all duration-300 p-4 rounded-full border border-white/10 hover:border-accent" data-interactive="true"><Phone size={20} /></a>
              <a href="#" aria-label="Location" className="text-gray-400 hover:text-bg-primary hover:bg-accent transition-all duration-300 p-4 rounded-full border border-white/10 hover:border-accent" data-interactive="true"><MapPin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-gray-600 font-sans text-xs uppercase tracking-[0.1em]">
          <p>&copy; {new Date().getFullYear()} CoffeeBrew. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors" data-interactive="true">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors" data-interactive="true">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
