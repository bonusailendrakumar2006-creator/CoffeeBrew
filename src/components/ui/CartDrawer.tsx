import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Button } from './Button'

export function CartDrawer() {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity } = useStore()
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-bg-primary border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-gray-100">Your Bag</h2>
              <button 
                onClick={toggleCart}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 font-sans">
                  <p className="mb-6 uppercase tracking-widest text-xs">Your bag is empty</p>
                  <Button variant="outline" onClick={toggleCart}>Continue Shopping</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-bg-secondary p-4 rounded-xl border border-white/5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 font-sans">
                      <h3 className="text-gray-100 text-sm font-bold mb-1">{item.name}</h3>
                      <p className="text-accent text-xs mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4 text-gray-400">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-white transition-colors"><Minus size={14} /></button>
                        <span className="text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-white transition-colors"><Plus size={14} /></button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-bg-secondary/50">
                <div className="flex justify-between items-center mb-6 font-sans text-gray-100">
                  <span className="uppercase tracking-widest text-xs text-gray-400">Subtotal</span>
                  <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <Button variant="primary" className="w-full">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
