export type CartItem = {
  id: string
  title: string
  price: number
  image: string
  qty: number
}

type Address = {
  fullName: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
}

type PaymentMethod = 'upi' | 'card' | 'cod'

type AppState = {
  cart: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
  orderPlaced: boolean
}

const state: AppState = {
  cart: [],
  address: {
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  },
  paymentMethod: 'upi',
  orderPlaced: false,
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getState(): AppState {
  return state
}

export function addToCart(item: Omit<CartItem, 'qty'>): void {
  const existing = state.cart.find((cartItem) => cartItem.id === item.id)
  if (existing) {
    existing.qty += 1
  } else {
    state.cart.push({ ...item, qty: 1 })
  }
  notify()
}

export function updateQty(id: string, delta: number): void {
  const item = state.cart.find((cartItem) => cartItem.id === id)
  if (!item) return
  item.qty += delta
  if (item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== id)
  }
  notify()
}

export function setAddress(payload: Address): void {
  state.address = payload
  notify()
}

export function setPaymentMethod(method: PaymentMethod): void {
  state.paymentMethod = method
  notify()
}

export function placeOrder(): void {
  state.orderPlaced = true
  state.cart = []
  notify()
}

export function cartTotal(): number {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}
