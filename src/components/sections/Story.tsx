import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const p = textRef.current?.querySelector('p')
      if (p) {
        const text = p.innerText
        p.innerHTML = ''
        text.split(' ').forEach((word) => {
          const span = document.createElement('span')
          span.innerText = word + ' '
          span.style.opacity = '0.1'
          span.className = 'story-word'
          p.appendChild(span)
        })

        gsap.to(p.querySelectorAll('.story-word'), {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        })
      }

      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="story" className="py-56 min-h-[120vh] flex items-center justify-center bg-bg-primary relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Cinematic Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <img 
          src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2000&auto=format&fit=crop"
          alt="Coffee Origin"
          className="w-full h-full object-cover opacity-[0.15]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10" ref={textRef}>
        <p className="text-[clamp(2rem,4.5vw,4.5rem)] font-serif leading-[1.3] text-gray-100 text-center tracking-tight">
          We believe that coffee is more than just a morning routine. It is a moment of reflection, a catalyst for connection, and a canvas for artistry. Our master roasters coax out the hidden notes within every bean, delivering a cinematic experience in every cup.
        </p>
      </div>
    </section>
  )
}
