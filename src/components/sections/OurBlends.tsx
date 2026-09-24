import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { useStore } from '../../store/useStore'

const blends = [
  { 
    name: 'Midnight Espresso', 
    notes: 'Dark Chocolate, Black Cherry, Smoked Oak', 
    delay: 0,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop'
  },
  { 
    name: 'Golden Sunrise', 
    notes: 'Caramel, Hazelnut, Orange Zest', 
    delay: 0.2,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop'
  },
  { 
    name: 'Velvet Reserve', 
    notes: 'Vanilla, Toasted Almond, Honey', 
    delay: 0.4,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
  },
]

export function OurBlends() {
  const addToCart = useStore(state => state.addToCart)

  return (
    <section id="blends" className="py-32 bg-bg-primary min-h-screen flex items-center relative z-10 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-[clamp(3rem,8vw,5rem)] text-gray-100 font-serif mb-6 tracking-tight leading-[1.1]"
          >
            Curated Blends
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm uppercase tracking-[0.3em] text-accent font-sans"
          >
            Selections for the discerning palate
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blends.map((blend, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: blend.delay, ease: 'easeOut' }}
              className="group bg-bg-secondary rounded-[2rem] p-12 flex flex-col justify-between min-h-[480px] border border-white/5 shadow-none hover:shadow-2xl hover:shadow-black/50 relative overflow-hidden transition-all duration-700 ease-out hover:border-accent/20 hover:-translate-y-2"
              data-interactive="true"
            >
              {/* Product Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={blend.image} 
                  alt={blend.name} 
                  className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-[1.05]" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/80 to-transparent" />
                <div className="absolute inset-0 bg-bg-secondary/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
              
              <div className="relative z-10 mt-auto pt-24">
                <h3 className="text-4xl mb-8 text-gray-100 font-serif group-hover:text-accent transition-colors duration-500">{blend.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-gray-500 font-sans">Tasting Notes:</p>
                <span className="text-base italic text-brand-gold font-sans">{blend.notes}</span>
              </div>
              <div className="mt-12 relative z-10">
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={() => addToCart({
                    id: blend.name.toLowerCase().replace(/\s+/g, '-'),
                    name: blend.name,
                    price: 24.00,
                    image: blend.image,
                    quantity: 1
                  })}
                >
                  Add to Bag
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
