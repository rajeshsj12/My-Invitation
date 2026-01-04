import { useState } from 'react'

interface GalleryProps {
  gallery: any[]
}

const Gallery = ({ gallery }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Memories
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-300">
                  <img 
                    src={image.image_url} 
                    alt={image.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            src={gallery[selectedImage].image_url}
            alt={gallery[selectedImage].caption}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
          <button 
            className="absolute top-8 right-8 text-white text-4xl hover:scale-110 transition-transform"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

export default Gallery
