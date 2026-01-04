import { useEffect, useState, useCallback } from 'react'
import Papa from 'papaparse'
import { Particles } from 'react-tsparticles'
import { loadSlim } from 'tsparticles'
import { motion, AnimatePresence } from 'react' // Note: motion is Tailwind-based here
import Hero from './components/Hero'
import Events from './components/Events'
import Story from './components/Story'
import Gallery from './components/Gallery'
import RsvpForm from './components/RsvpForm'
import BackgroundParticles from './components/BackgroundParticles'

// Types
interface CoupleData {
  groom_name: string
  bride_name: string
  wedding_datetime: string
  hero_message: string
  theme_color_primary: string
  theme_color_secondary: string
  theme_color_bg: string
}

interface EventData {
  id: string
  title: string
  time: string
  venue: string
  full_address: string
  map_url: string
  description: string
}

interface MessageData {
  section: string
  heading: string
  body: string
}

interface GalleryData {
  id: string
  image_url: string
  caption: string
}

interface TimerLabel {
  key: string
  label: string
}

interface RsvpConfig {
  key: string
  label: string
  placeholder: string
  required: string
}

interface AppData {
  couple: CoupleData
  events: EventData[]
  messages: MessageData[]
  gallery: GalleryData[]
  timerLabels: TimerLabel[]
  rsvpConfig: RsvpConfig[]
}

// CSV Loader
const loadAllData = async (): Promise<AppData> => {
  const csvFiles = [
    'couple.csv',
    'events.csv',
    'messages.csv',
    'gallery.csv',
    'timer_labels.csv',
    'rsvp_config.csv'
  ]

  const promises = csvFiles.map(async (file) => {
    return new Promise<{ data: any[], errors: any[] }>((resolve) => {
      Papa.parse(`/data/${file}`, {
        download: true,
        header: true,
        complete: resolve as any,
        skipEmptyLines: true
      })
    })
  })

  const results = await Promise.all(promises)
  
  return {
    couple: results[0].data[0] as CoupleData,
    events: results[1].data as EventData[],
    messages: results[2].data as MessageData[],
    gallery: results[3].data as GalleryData[],
    timerLabels: results[4].data as TimerLabel[],
    rsvpConfig: results[5].data as RsvpConfig[]
  }
}

function App() {
  const [data, setData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    loadAllData().then(setData).finally(() => setLoading(false))
  }, [])

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }, [])

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Update CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', data.couple.theme_color_primary)
    document.documentElement.style.setProperty('--secondary-color', data.couple.theme_color_secondary)
    document.documentElement.style.setProperty('--bg-color', data.couple.theme_color_bg)
  }, [data.couple])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Meta Tags */}
      <head>
        <title>{data.couple.groom_name} weds {data.couple.bride_name}</title>
        <meta property="og:title" content={data.couple.groom_name + ' weds ' + data.couple.bride_name} />
        <meta property="og:description" content={data.couple.hero_message} />
        <meta name="theme-color" content={data.couple.theme_color_primary} />
      </head>
      
      {/* Background Particles */}
      <BackgroundParticles />
      
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  background: `linear-gradient(45deg, ${data.couple.theme_color_primary}, ${data.couple.theme_color_secondary})`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero 
          couple={data.couple} 
          timerLabels={data.timerLabels}
          triggerConfetti={triggerConfetti}
        />
        <Events events={data.events} />
        <Story messages={data.messages.filter(m => m.section === 'story')} />
        <Gallery gallery={data.gallery} />
        <RsvpForm 
          config={data.rsvpConfig}
          messages={data.messages.find(m => m.section === 'rsvp_thanks')!}
          triggerConfetti={triggerConfetti}
        />
        
        {/* Footer */}
        <footer className="py-12 bg-gradient-to-t from-white/80 to-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-lg font-medium text-gray-700 mb-4">
              {data.couple.groom_name} & {data.couple.bride_name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`https://wa.me/919876543210?text=${encodeURIComponent(data.couple.hero_message)}`}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 animate-pulse"
              >
                Share on WhatsApp
              </a>
              <button
                onClick={() => navigator.share?.({title: `${data.couple.groom_name} weds ${data.couple.bride_name}`, url: window.location.href})}
                className="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              >
                Share Invite
              </button>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              Made with ❤️ in Airoli, Maharashtra
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
