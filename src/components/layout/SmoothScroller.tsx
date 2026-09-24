import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let scrollTimeout: ReturnType<typeof setTimeout>

    lenis.on('scroll', () => {
      document.body.classList.add('is-scrolling')
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 150)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      clearTimeout(scrollTimeout)
      document.body.classList.remove('is-scrolling')
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
