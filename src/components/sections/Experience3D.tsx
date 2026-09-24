import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CoffeeCupScene } from '../3d/CoffeeCupScene'

gsap.registerPlugin(ScrollTrigger)

export function Experience3D() {
  const containerRef = useRef<HTMLElement>(null)
  
  // We use a mutable ref for scroll progress to avoid React state re-renders inside useFrame
  const scrollProgress = useRef({ value: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scrub the progress value from 0 to 1 over a large scroll distance
      gsap.to(scrollProgress.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Gives the user 3 screens worth of scrolling to watch the pour
          pin: true,
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-bg-primary z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 w-full h-full flex items-center justify-between px-[10vw]">
        <div className="w-full md:w-[40%] z-20 pointer-events-none mix-blend-difference mt-[10vh] md:mt-0 text-center md:text-left">
          <h2 className="text-[clamp(3.5rem,8vw,7rem)] text-gray-100 font-serif mb-8 leading-[1.1] tracking-tight">The Perfect<br/>Pour</h2>
          <p className="text-accent font-sans text-[clamp(0.75rem,1.5vw,1rem)] uppercase tracking-[0.25em] leading-relaxed">
            Every cup tells a story of precision, temperature, and timing. Explore the anatomy of the perfect extraction.
          </p>
        </div>
        
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
          <CoffeeCupScene scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  )
}
