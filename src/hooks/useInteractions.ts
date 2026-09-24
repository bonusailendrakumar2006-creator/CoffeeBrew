import { useCallback } from 'react'

export function useInteractions() {
  const playClick = useCallback(() => {
    try {
      // 1. Auditory Feedback (Web Audio API procedural sound - zero latency)
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      // Extremely short, high-end "tick" sound
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03)
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime) // Low volume
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + 0.04)

      // 2. Haptic Feedback (Vibration API for mobile)
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10) // Ultra-subtle 10ms tap
      }
    } catch (e) {
      // Gracefully ignore if blocked by browser policies
    }
  }, [])

  return { playClick }
}
