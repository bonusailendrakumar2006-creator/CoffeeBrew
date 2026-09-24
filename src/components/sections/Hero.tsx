import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { HeroScene } from '../3d/HeroScene'
import { Button } from '../ui/Button'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      if (headline) {
        const text = headline.innerText
        headline.innerHTML = ''
        text.split(' ').forEach((word) => {
          const wordContainer = document.createElement('span')
          wordContainer.style.display = 'inline-block'
          wordContainer.style.overflow = 'hidden'
          wordContainer.style.verticalAlign = 'bottom'
          wordContainer.style.paddingRight = '20px'
          
          const wordSpan = document.createElement('span')
          wordSpan.style.display = 'inline-block'
          wordSpan.innerText = word
          wordSpan.className = 'word inline-block'
          
          wordContainer.appendChild(wordSpan)
          headline.appendChild(wordContainer)
        })

        gsap.fromTo(headline.querySelectorAll('.word'), 
          { y: '100%', rotateZ: 5 },
          { y: '0%', rotateZ: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out', delay: 2.5 }
        )
      }

      gsap.fromTo([subheadlineRef.current, ctaRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out', delay: 3.2 }
      )
    })

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return // Disable on touch devices
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40

      gsap.to(headlineRef.current, {
        x: -x,
        y: -y,
        duration: 1,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <HeroScene />
      <div className="relative z-10 flex flex-col items-center pointer-events-none mt-16">
        <h1 
          ref={headlineRef} 
          className="text-[clamp(4rem,12vw,12rem)] text-gray-100 leading-[0.85] drop-shadow-2xl text-center mb-8 font-serif tracking-tight"
        >
          Awaken Your Senses
        </h1>
        <div className="overflow-hidden mb-12">
          <p 
            ref={subheadlineRef} 
            className="text-[clamp(0.75rem,1.5vw,1rem)] font-sans tracking-[0.3em] uppercase text-accent text-center font-light"
          >
            Discover the craft of cinematic coffee roasting
          </p>
        </div>
        <div ref={ctaRef} className="pointer-events-auto mt-6">
          <Button variant="outline" size="lg">
            Explore Collection
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-brand-gold mb-2 font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  )
}
