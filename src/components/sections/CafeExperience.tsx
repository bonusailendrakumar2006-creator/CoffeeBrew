import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CafeExperience() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageRefs.current.forEach((img, i) => {
        if (!img) return
        gsap.to(img, {
          yPercent: -20 * (i + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-bg-secondary border-t border-white/5 py-48 overflow-hidden flex flex-col items-center">
      <div className="text-center mb-32 relative z-20 mix-blend-difference pointer-events-none">
        <h2 className="text-[clamp(3.5rem,10vw,8rem)] text-gray-100 font-serif mb-8 tracking-tight">The Atmosphere</h2>
        <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-accent font-sans uppercase tracking-[0.3em] max-w-[600px] mx-auto">
          Step into a sanctuary of roasted aromas.
        </p>
      </div>

      <div className="relative w-full max-w-[1200px] h-[80vh] mx-auto">
        <div 
          ref={el => { imageRefs.current[0] = el }}
          className="absolute top-[5%] md:top-[10%] left-[10%] md:left-[5%] w-[80%] md:w-[40%] aspect-[4/5] bg-bg-primary border border-white/5 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-700 hover:scale-105 hover:border-accent/20 group"
          data-interactive="true"
        >
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
            alt="Cafe Interior"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            loading="lazy"
          />
        </div>
        
        <div 
          ref={el => { imageRefs.current[1] = el }}
          className="absolute top-[40%] md:top-[30%] right-[10%] md:right-[5%] w-[70%] md:w-[45%] aspect-[3/4] bg-[#221c19] border border-white/5 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden z-10 transition-all duration-700 hover:scale-105 hover:border-accent/20 group"
          data-interactive="true"
        >
          <img 
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
            alt="Barista at work"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            loading="lazy"
          />
        </div>
        
        <div 
          ref={el => { imageRefs.current[2] = el }}
          className="hidden md:flex absolute bottom-[-20%] left-[25%] w-[50%] aspect-video bg-bg-primary border border-white/5 rounded-3xl shadow-2xl items-center justify-center overflow-hidden z-20 transition-all duration-700 hover:scale-105 hover:border-accent/20 group"
          data-interactive="true"
        >
          <img 
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop"
            alt="Coffee details"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
