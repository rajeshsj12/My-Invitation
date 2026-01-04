import { motion } from 'framer-motion'

interface StoryProps {
  messages: any[]
}

const Story = ({ messages }: StoryProps) => {
  return (
    <section className="py-32 px-4 bg-white/30 backdrop-blur-xl rounded-3xl mx-8 -mt-16 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-24 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
        >
          Our Journey
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {messages.map((message, index) => (
            <motion.div
              key={message.section}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="group hover:scale-[1.02] transition-all duration-500"
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors">{message.heading}</h3>
              <div className="relative">
                <p className="text-xl leading-relaxed text-gray-700 pr-8 animate__animated animate__fadeIn">
                  {message.body}
                </p>
                <div className="absolute -bottom-2 right-0 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Story
