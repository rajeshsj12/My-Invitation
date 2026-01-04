import { useEffect } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim' // loadSlim provided by @tsparticles/slim

const BackgroundParticles = () => {
  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine)
    })
  }, [])

  return (
    <Particles
      id="tsparticles"
      options={({
        fullScreen: { enable: false, zIndex: 1 },
        particles: {
          number: { value: 80 },
          color: { value: ['#ff6b9d', '#4ecdc4', '#ffd93d', '#ff8b76'] },
          shape: { type: ['heart', 'circle', 'star'] },
          opacity: { value: 0.5, random: true },
          size: { value: { min: 2, max: 6 }, random: true },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' }
          },
          wobble: { enable: true, distance: 10, speed: 1 }
        },
        detectRetina: true,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60
      } as any)}
      className="absolute inset-0 z-0"
    />
  )
}

export default BackgroundParticles
