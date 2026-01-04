import { useState } from 'react'

interface RsvpProps {
  config: any[]
  messages: any
  triggerConfetti: () => void
}

const RsvpForm = ({ config, messages, triggerConfetti }: RsvpProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Send email via mailto (production: use EmailJS)
    const subject = `RSVP - ${formData.name || 'Guest'}`
    const body = Object.entries(formData)
      .map(([key, value]) => `${config.find(c => c.key === key)?.label || key}: ${value}`)
      .join('\n')
    
    const mailto = `mailto:rsvp@arjpriya.wedding?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    
    setSubmitted(true)
    setLoading(false)
    triggerConfetti()
  }

  if (submitted) {
    return (
      <section className="py-32 px-4">
        <div className="max-w-2xl mx-auto text-center animate__animated animate__bounceIn">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent">
            RSVP Confirmed!
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto">
            {messages.body}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-12 py-4 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-3xl hover:shadow-2xl transition-all duration-300"
          >
            Send Another
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
        >
          Will You Join Us?
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl">
          {config.map((field) => (
            <div key={field.key} className={`animate__animated animate__fadeInUp ${field.required === 'true' ? 'animate__delay-1s' : 'animate__delay-2s'}`}>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                {field.label} {field.required === 'true' && <span className="text-red-500">*</span>}
              </label>
              {field.key === 'message' ? (
                <textarea
                  name={field.key}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-vertical"
                  required={field.required === 'true'}
                />
              ) : (
                <input
                  type={field.key === 'guests' ? 'number' : 'text'}
                  name={field.key}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChange={handleChange}
                  min={field.key === 'guests' ? 0 : undefined}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                  required={field.required === 'true'}
                />
              )}
            </div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full p-6 bg-gradient-to-r from-primary via-pink-500 to-secondary text-white text-2xl font-black rounded-3xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 animate__animated animate__pulse"
          >
            {loading ? 'Sending...' : `Yes, I'll be there!`}
          </motion.button>
        </form>
      </div>
    </section>
  )
}

export default RsvpForm
