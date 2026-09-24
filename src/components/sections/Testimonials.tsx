import { motion } from 'framer-motion'

const reviews = [
  { name: 'Elena R.', role: 'Coffee Connoisseur', text: 'An absolute masterpiece of flavor. The Midnight Reserve changed my perception of dark roasts.' },
  { name: 'James T.', role: 'Food Critic', text: 'CoffeeBrew delivers an experience that is both visually stunning and texturally perfect.' },
  { name: 'Sarah L.', role: 'Daily Brewer', text: 'The cinematic approach to coffee roasting is evident in every sip. Truly a ritual.' },
]

export function Testimonials() {
  return (
    <section className="py-48 bg-bg-primary border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-[clamp(3rem,8vw,5rem)] text-gray-100 font-serif mb-24 text-center tracking-tight leading-[1.1]">Words of<br/>Affirmation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="bg-bg-secondary p-12 rounded-[2rem] border border-white/5 shadow-xl flex flex-col justify-between transition-all duration-700 hover:border-accent/20"
              data-interactive="true"
            >
              <p className="text-gray-400 font-sans text-lg italic mb-12 leading-[1.8] font-light">"{review.text}"</p>
              <div>
                <h4 className="text-gray-100 font-serif text-2xl mb-2">{review.name}</h4>
                <span className="text-accent font-sans text-[10px] tracking-[0.3em] uppercase">{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
