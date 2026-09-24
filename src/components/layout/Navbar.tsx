import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '../ui/Button'
import { useStore } from '../../store/useStore'

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleCart, cart } = useStore()

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > 150 && latest > previous) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' }
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-gray-100 font-serif text-2xl" data-interactive="true">
          <Coffee size={28} className="text-accent" />
          <span>CoffeeBrew</span>
        </a>
        
        <div className="hidden md:flex gap-8 items-center">
          {['Story', 'Blends', 'Process', 'Visit'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-accent font-sans text-[10px] tracking-[0.3em] uppercase transition-colors" data-interactive="true">
              {item}
            </a>
          ))}
          <Button variant="outline" size="sm" onClick={toggleCart} className="flex gap-2">
            <ShoppingBag size={14} />
            Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          aria-label="Toggle menu"
          className="md:hidden text-gray-100 z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-interactive="true"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-bg-primary z-40 flex flex-col items-center justify-center pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={mobileMenuOpen}
      >
        <div className="flex flex-col items-center gap-10">
          {['Story', 'Blends', 'Process', 'Visit'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-100 font-serif text-4xl hover:text-accent transition-colors" 
              data-interactive="true"
            >
              {item}
            </a>
          ))}
          <Button 
            variant="primary"
            size="lg"
            className="mt-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop Now
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  )
}
