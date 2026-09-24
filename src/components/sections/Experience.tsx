import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div 
        ref={bgRef} 
        className="absolute top-[-20%] left-0 w-full h-[140%] z-0 opacity-30"
        style={{ background: 'radial-gradient(circle at center, var(--accent-rust) 0%, var(--bg-primary) 70%)' }}
      ></div>
      <div className="relative z-10 text-center">
        <h2 
          ref={textRef}
          className="text-[clamp(3rem,10vw,8rem)] text-gray-100 leading-[1.1] font-serif drop-shadow-2xl"
        >
          Not just a drink.<br/>A Ritual.
        </h2>
      </div>
    </section>
  )
}
