import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface AppState {
  isCartOpen: boolean
  cart: CartItem[]
  toggleCart: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
}

export const useStore = create<AppState>((set) => ({
  isCartOpen: false,
  cart: [],
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id)
    if (existing) {
      return {
        cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i),
        isCartOpen: true
      }
    }
    return {
      cart: [...state.cart, { ...item, quantity: 1 }],
      isCartOpen: true
    }
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(i => i.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
  }))
}))
