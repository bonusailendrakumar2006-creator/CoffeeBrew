import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { 
    title: 'The Bean', 
    description: 'It all starts with the perfect seed, nurtured at high altitudes.',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: 'Selection', 
    description: 'Hand-picked at peak ripeness, ensuring only the best make the cut.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: 'Roasting', 
    description: 'Our signature cinematic roast profile, balancing heat and time.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: 'Grinding', 
    description: 'Precision burr grinding to unlock the volatile aromatics.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: 'Brewing', 
    description: 'Exact temperature and extraction time for optimal flavor.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: 'The Cup', 
    description: 'A masterpiece of taste, ready to awaken your senses.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'
  },
]

export function TheCraft() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bgRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia()
      
      matchMedia.add("(min-width: 768px)", () => {
        const scrollWidth = wrapper.scrollWidth - window.innerWidth
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
          }
        })

        // Move the cards horizontally
        tl.to(wrapper, {
          x: -scrollWidth,
          ease: 'none',
          duration: 1
        }, 0)

        // Sync background image opacities perfectly with the scroll progress
        const stepWidth = 1 / (steps.length - 1)
        bgRefs.current.forEach((bg, index) => {
          if (!bg) return
          // The first image starts at opacity 1, the others at 0
          if (index === 0) {
            tl.to(bg, { opacity: 0, duration: stepWidth, ease: 'none' }, stepWidth / 2)
          } else if (index === steps.length - 1) {
            tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: stepWidth, ease: 'none' }, (index - 1) * stepWidth)
          } else {
            tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: stepWidth, ease: 'none' }, (index - 1) * stepWidth)
            tl.to(bg, { opacity: 0, duration: stepWidth, ease: 'none' }, index * stepWidth + stepWidth / 2)
          }
        })

        // Highlight active cards
        cardRefs.current.forEach((card, index) => {
          if (!card) return
          
          if (index === 0) {
            tl.to(card, { backgroundColor: 'rgba(26,11,2,0.4)', borderColor: 'rgba(255,255,255,0.05)', duration: stepWidth/2 }, stepWidth/2)
            tl.to(card.querySelector('h3'), { color: 'rgb(209,213,219)', duration: stepWidth/2 }, stepWidth/2)
            tl.to(card.querySelector('.step-num'), { color: 'rgba(212,163,115,0.2)', duration: stepWidth/2 }, stepWidth/2)
          } else {
            // Fade in
            tl.to(card, { backgroundColor: 'rgba(26,11,2,0.9)', borderColor: 'rgba(255,255,255,0.2)', duration: stepWidth/2 }, (index - 0.5) * stepWidth)
            tl.to(card.querySelector('h3'), { color: '#ffffff', duration: stepWidth/2 }, (index - 0.5) * stepWidth)
            tl.to(card.querySelector('.step-num'), { color: '#d4a373', duration: stepWidth/2 }, (index - 0.5) * stepWidth)
            
            // Fade out
            if (index < steps.length - 1) {
              tl.to(card, { backgroundColor: 'rgba(26,11,2,0.4)', borderColor: 'rgba(255,255,255,0.05)', duration: stepWidth/2 }, (index + 0.5) * stepWidth)
              tl.to(card.querySelector('h3'), { color: 'rgb(209,213,219)', duration: stepWidth/2 }, (index + 0.5) * stepWidth)
              tl.to(card.querySelector('.step-num'), { color: 'rgba(212,163,115,0.2)', duration: stepWidth/2 }, (index + 0.5) * stepWidth)
            }
          }
        })
      })

      return () => matchMedia.revert()
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative min-h-screen md:h-screen bg-bg-secondary flex flex-col justify-center overflow-hidden border-t border-white/5 py-32 md:py-0">
      
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-bg-secondary">
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={el => { bgRefs.current[index] = el }}
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0, willChange: 'opacity' }}
          >
            <img 
              src={step.image} 
              alt={step.title}
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-transparent to-bg-secondary" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary via-transparent to-transparent opacity-90" />
      </div>

      <div className="md:absolute md:top-[15%] md:left-[10%] z-10 pointer-events-none px-6 md:px-0 mb-12 md:mb-0">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] text-gray-100 font-serif drop-shadow-lg leading-tight tracking-tight mb-4">The Process</h2>
        <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-accent font-sans uppercase tracking-[0.25em]">A cinematic journey from seed to cup.</p>
      </div>
      
      <div ref={wrapperRef} className="flex flex-col md:flex-row w-full md:w-fit px-6 md:pl-[30vw] md:pr-[30vw] gap-12 md:gap-[10vw] items-center md:h-full relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={el => { cardRefs.current[index] = el }}
            className="process-card w-[85vw] max-w-[380px] min-w-[300px] border p-10 md:p-14 rounded-[2rem] shadow-2xl group relative overflow-hidden backdrop-blur-xl"
            style={{ 
              backgroundColor: index === 0 ? 'rgba(26,11,2,0.9)' : 'rgba(26,11,2,0.4)',
              borderColor: index === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'
            }}
            data-interactive="true"
          >
            <div className="step-num font-serif text-7xl mb-8" style={{ color: index === 0 ? '#d4a373' : 'rgba(212,163,115,0.2)' }}>0{index + 1}</div>
            <h3 className="text-3xl mb-4 font-serif" style={{ color: index === 0 ? '#ffffff' : 'rgb(209,213,219)' }}>{step.title}</h3>
            <p className="text-base text-gray-400 leading-[1.8] font-sans font-light relative z-10">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
