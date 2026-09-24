import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function TheRitual() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for the crema image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.1, y: '-15%' },
          {
            scale: 1.2,
            y: '15%',
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

      // Text reveal animation
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.reveal-text')
        gsap.fromTo(textElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              once: true
            }
          }
        )
      }

      // Fade overlay based on scroll
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0.8 },
          {
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: true
            }
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[100vh] bg-[#110e0c] flex items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Background Image: Close-up coffee crema / pouring */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2000&auto=format&fit=crop"
          alt="Coffee Crema"
          className="w-full h-[130%] object-cover opacity-70 mix-blend-luminosity"
          loading="lazy"
        />
        {/* Cinematic Lighting Overlays */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#110e0c]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary opacity-90" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
        <div className="mb-8 w-px h-24 bg-gradient-to-b from-transparent to-accent/50" />
        
        <h2 ref={textRef} className="text-[clamp(3rem,6vw,5rem)] text-gray-100 font-serif leading-[1.2] tracking-tight">
          <span className="block reveal-text">Take a moment.</span>
          <span className="block reveal-text text-gray-400">Let the aroma arrive first.</span>
        </h2>
        
        <div className="mt-16 w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  )
}
