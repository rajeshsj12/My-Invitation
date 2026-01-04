import { motion } from 'framer-motion'

interface EventProps {
  events: any[]
}

const Events = ({ events }: EventProps) => {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-center mb-24 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
        >
          Our Celebrations
        </motion.h2>
        
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/30 to-secondary/30 rounded-full"></div>
          
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Event Card */}
                <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:scale-[1.02] animate__animated animate__fadeInUp">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                      <p className="text-primary font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{event.venue}</span>
                    <a href={event.map_url} target="_blank" className="text-primary hover:underline font-medium">
                      📍 Directions
                    </a>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl group hover:scale-105 transition-all duration-500">
                  <iframe
                    src={event.map_url}
                    width="100%"
                    height="100%"
                    className="rounded-2xl border-0"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
