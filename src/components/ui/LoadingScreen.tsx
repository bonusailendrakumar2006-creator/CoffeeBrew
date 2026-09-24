import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].value))
        },
        onComplete: () => {
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 1000) // Wait for exit animation
          }, 500)
        }
      })
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[10000] bg-bg-primary flex flex-col items-center justify-center"
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl text-brand-gold font-serif tracking-widest uppercase"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            >
              CoffeeBrew
            </motion.h1>
          </div>
          
          <div className="w-[200px] h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-gold"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-4 font-sans text-brand-gold text-sm tracking-widest">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
