import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const scale = useMotionValue(1)
  const outerScale = useMotionValue(1)
  const outerBg = useMotionValue('transparent')
  const outerSpringScale = useSpring(outerScale, { stiffness: 150, damping: 15, mass: 0.5 })

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
      return
    }

    const updateMousePosition = (e: MouseEvent) => {
      // Use direct set on motion values - no React re-render!
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-interactive="true"]')) {
        scale.set(0)
        outerScale.set(1.5)
        outerBg.set('rgba(201, 162, 39, 0.1)')
      } else {
        scale.set(1)
        outerScale.set(1)
        outerBg.set('transparent')
      }
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, scale, outerScale, outerBg])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: scale
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-brand-gold rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: outerSpringScale,
          backgroundColor: outerBg
        }}
      />
    </>
  )
}
