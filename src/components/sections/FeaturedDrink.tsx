import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../ui/Button'
import { useStore } from '../../store/useStore'

gsap.registerPlugin(ScrollTrigger)

export function FeaturedDrink() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const addToCart = useStore(state => state.addToCart)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for the main image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.1, y: '-10%' },
          {
            scale: 1.15,
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }

      // Fade up text
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center+=100',
              once: true
            }
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="featured" className="relative min-h-[120vh] bg-[#110e0c] flex items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Full Editorial Background */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1495474472205-16284eb86b38?q=80&w=2000&auto=format&fit=crop"
          alt="Midnight Reserve"
          className="w-full h-[120%] object-cover opacity-60 mix-blend-luminosity"
          loading="lazy"
        />
        {/* Subtle noise/texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] pointer-events-none opacity-20" />
        
        {/* Dramatic Vignette / Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-[#110e0c]/60 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary opacity-80" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-xs mb-6 font-sans">The Signature Collection</span>
          
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] text-gray-100 font-serif mb-8 leading-[1.1] tracking-tight">Midnight<br/>Reserve</h2>
          
          <p className="text-gray-400 font-sans text-lg mb-10 leading-[1.8] max-w-[400px]">
            A deeply luxurious dark roast. Notes of black cherry, smoked oak, and rich dark chocolate. Crafted for the true aficionado.
          </p>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => addToCart({
              id: 'midnight-reserve',
              name: 'Midnight Reserve',
              price: 32.00,
              image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1200&auto=format&fit=crop',
              quantity: 1
            })}
          >
            Reserve a Bag
          </Button>
        </div>

        {/* Midnight Reserve Image Card */}
        <div className="order-1 md:order-2 w-full aspect-[3/4] md:aspect-[4/5] bg-[#0c0a09] rounded-[2rem] overflow-hidden relative shadow-2xl group border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1200&auto=format&fit=crop"
            alt="Midnight Reserve Pour"
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/30" />
          <div className="text-accent font-serif text-[clamp(10rem,25vw,18rem)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-20 mix-blend-overlay drop-shadow-2xl">M</div>
        </div>
      </div>
    </section>
  )
}
