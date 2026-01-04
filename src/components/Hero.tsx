import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  couple: any
  timerLabels: any[]
  triggerConfetti: () => void
}

interface Timer {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Hero = ({ couple, timerLabels, triggerConfetti }: HeroProps) => {
  const [timer, setTimer] = useState<Timer>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [flipping, setFlipping] = useState<Record<string, boolean>>({})

  const weddingDate = new Date(couple.wedding_datetime)
  
  const updateTimer = useCallback(() => {
    const now = new Date()
    const diff = weddingDate.getTime() - now.getTime()
    
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimer({ days, hours, minutes, seconds })
    }
  }, [weddingDate])

  const flipNumber = (key: string, newValue: number) => {
    setFlipping(prev => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setFlipping(prev => ({ ...prev, [key]: false }))
    }, 600)
  }

  useEffect(() => {
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [updateTimer])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="animate__animated animate__fadeInUp max-w-4xl mx-auto z-10"
      >
        {/* Names */}
        <div className="mb-16 space-y-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent animate-glow mb-4">
            {couple.groom_name}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full animate-pulse"></div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic text-white/90 drop-shadow-2xl">
            &amp;
          </h2>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-secondary via-pink-400 to-primary bg-clip-text text-transparent animate-glow">
            {couple.bride_name}
          </h1>
        </div>

        {/* Message */}
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 max-w-3xl mx-auto mb-16 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          {couple.hero_message}
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => {
            const label = timerLabels.find(l => l.key === unit)?.label || unit
            const value = timer[unit]
            
            return (
              <div key={unit} className="flip-card group relative">
                <div className={`w-32 h-32 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/20 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-2xl flex flex-col items-center justify-center mx-auto p-6 flip-card-inner transition-all duration-500 hover:scale-110 hover:shadow-3xl ${flipping[unit] ? 'flipping' : ''}`}>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-medium text-white/80 tracking-wide uppercase">
                    {label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="px-12 py-6 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-500 animate__animated animate__pulse animate__infinite"
        >
          Open Invitation
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
