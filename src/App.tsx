import './App.css'
import { addToCart, cartTotal, getState, placeOrder, setAddress, setPaymentMethod, updateQty } from './store'

type Category = { name: string; icon: string }
type Product = {
  id: string
  title: string
  price: number
  originalPrice: string
  discount: string
  rating: string
  reviews: string
  image: string
}

const categories: Category[] = [
  { name: 'Mobiles', icon: '📱' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Electronics', icon: '🎧' },
  { name: 'Home', icon: '🛋️' },
  { name: 'Appliances', icon: '🧺' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Toys', icon: '🧸' },
]

const products: Product[] = [
  { id: 'p1', title: 'iQ Zentech Neo 5G (128 GB)', price: 16999, originalPrice: '₹21,999', discount: '22% off', rating: '4.4', reviews: '14,832 ratings', image: '📱' },
  { id: 'p2', title: 'NoiseBuds Air Pro ANC Earbuds', price: 1999, originalPrice: '₹5,499', discount: '63% off', rating: '4.2', reviews: '2,104 ratings', image: '🎧' },
  { id: 'p3', title: 'UrbanFit Smart Watch 1.9" AMOLED', price: 2499, originalPrice: '₹6,999', discount: '64% off', rating: '4.1', reviews: '8,900 ratings', image: '⌚' },
  { id: 'p4', title: 'HomeCloud Air Fryer 6L Digital', price: 3799, originalPrice: '₹8,999', discount: '57% off', rating: '4.3', reviews: '1,662 ratings', image: '🍟' },
  { id: 'p5', title: 'Men Solid Casual Shirt', price: 699, originalPrice: '₹1,999', discount: '65% off', rating: '4.0', reviews: '6,011 ratings', image: '👔' },
  { id: 'p6', title: 'Women Running Shoes', price: 1299, originalPrice: '₹3,499', discount: '62% off', rating: '4.2', reviews: '10,354 ratings', image: '👟' },
  { id: 'p7', title: 'ErgoBack Office Chair', price: 5999, originalPrice: '₹12,999', discount: '53% off', rating: '4.3', reviews: '2,321 ratings', image: '🪑' },
  { id: 'p8', title: 'Kitchen Essentials Set (18 pc)', price: 1499, originalPrice: '₹3,999', discount: '62% off', rating: '4.1', reviews: '3,087 ratings', image: '🍳' },
]

function inr(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`
}

function pagePath(): string {
  return window.location.hash.replace('#', '') || '/'
}

function Header() {
  const cartCount = getState().cart.reduce((sum, item) => sum + item.qty, 0)
  return (
    <header className="header">
      <a className="logo" href="#/">Flipkartish</a>
      <input className="search" placeholder="Search for products, brands and more" />
      <button className="login">Login</button>
      <nav className="top-links">
        <a href="#/products">Products</a>
        <a href="#/checkout">Checkout</a>
        <a href="#/cart">Cart ({cartCount})</a>
      </nav>
    </header>
  )
}

function CategoryBar() {
  return (
    <section className="categories">
      {categories.map((cat) => (
        <article key={cat.name} className="category">
          <span>{cat.icon}</span>
          <p>{cat.name}</p>
        </article>
      ))}
    </section>
  )
}

function Hero() {
  return (
    <section className="hero">
      <p className="hero-badge">Big Savings Festival</p>
      <h1>Build your cart, checkout and pay in minutes</h1>
      <p>Modern ecommerce flow with Cart → Address → Payment → Success pages.</p>
      <a className="cta" href="#/products">Start Shopping</a>
    </section>
  )
}

function ProductCard({ item }: { item: Product }) {
  return (
    <article key={item.title} className="card">
      <div className="thumb">{item.image}</div>
      <h3>{item.title}</h3>
      <p className="price">{inr(item.price)} <span>{item.originalPrice}</span></p>
      <p className="discount">{item.discount}</p>
      <p className="rating">⭐ {item.rating} · {item.reviews}</p>
      <button className="add-btn" onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })}>Add to Cart</button>
    </article>
  )
}

function ProductGrid({ title, items }: { title: string; items: Product[] }) {
  return (
    <section className="row">
      <div className="row-heading">
        <h2>{title}</h2>
        <a className="link" href="#/products">View All</a>
      </div>
      <div className="grid">
        {items.map((item) => <ProductCard item={item} />)}
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <CategoryBar />
      <Hero />
      <ProductGrid title="Best Deals on Electronics" items={products.slice(0, 4)} />
      <ProductGrid title="Top Picks for You" items={products.slice(4)} />
    </>
  )
}

function ProductsPage() {
  return (
    <section className="row">
      <div className="row-heading"><h2>All Products</h2><a className="link" href="#/cart">Go to Cart</a></div>
      <div className="grid">{products.map((item) => <ProductCard item={item} />)}</div>
    </section>
  )
}

function CartPage() {
  const state = getState()
  if (state.cart.length === 0) {
    return <section className="row"><h2>Your cart is empty</h2><a className="cta-inline" href="#/products">Browse Products</a></section>
  }

  return (
    <section className="checkout-layout">
      <div className="row">
        <h2>Shopping Cart</h2>
        {state.cart.map((item) => (
          <article className="cart-item">
            <div className="thumb small">{item.image}</div>
            <div className="cart-meta">
              <h3>{item.title}</h3>
              <p className="price">{inr(item.price)}</p>
              <div className="qty-row">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="summary">
        <h3>Price Details</h3>
        <p><span>Items Total</span><strong>{inr(cartTotal())}</strong></p>
        <p><span>Delivery</span><strong className="green">FREE</strong></p>
        <p className="total"><span>Payable</span><strong>{inr(cartTotal())}</strong></p>
        <a className="cta-inline block" href="#/checkout">Place Order</a>
      </aside>
    </section>
  )
}

function saveAddress() {
  const fullName = (document.getElementById('fullName') as HTMLInputElement | null)?.value ?? ''
  const phone = (document.getElementById('phone') as HTMLInputElement | null)?.value ?? ''
  const street = (document.getElementById('street') as HTMLInputElement | null)?.value ?? ''
  const city = (document.getElementById('city') as HTMLInputElement | null)?.value ?? ''
  const state = (document.getElementById('state') as HTMLInputElement | null)?.value ?? ''
  const pincode = (document.getElementById('pincode') as HTMLInputElement | null)?.value ?? ''

  if (!fullName || !phone || !street || !city || !state || !pincode) {
    window.alert('Please fill all address fields.')
    return
  }

  setAddress({ fullName, phone, street, city, state, pincode })
  window.location.hash = '/payment'
}

function CheckoutPage() {
  return (
    <section className="row form-wrap">
      <h2>Delivery Address</h2>
      <div className="form-grid">
        <input id="fullName" placeholder="Full Name" />
        <input id="phone" placeholder="Phone Number" />
        <input id="street" placeholder="Street Address" />
        <input id="city" placeholder="City" />
        <input id="state" placeholder="State" />
        <input id="pincode" placeholder="Pincode" />
      </div>
      <button className="add-btn wide" onClick={saveAddress}>Continue to Payment</button>
    </section>
  )
}

function PaymentPage() {
  const state = getState()
  if (!state.address.fullName) {
    return <section className="row"><h2>Add address before payment</h2><a className="cta-inline" href="#/checkout">Go to Checkout</a></section>
  }

  return (
    <section className="checkout-layout">
      <div className="row form-wrap">
        <h2>Payment Method</h2>
        <button className="payment-btn" onClick={() => setPaymentMethod('upi')}>UPI</button>
        <button className="payment-btn" onClick={() => setPaymentMethod('card')}>Credit / Debit Card</button>
        <button className="payment-btn" onClick={() => setPaymentMethod('cod')}>Cash on Delivery</button>
        <p className="payment-note">Selected: <strong>{state.paymentMethod.toUpperCase()}</strong></p>
        <button className="add-btn wide" onClick={() => { placeOrder(); window.location.hash = '/success' }}>Pay {inr(cartTotal())}</button>
      </div>
      <aside className="summary">
        <h3>Deliver To</h3>
        <p>{state.address.fullName}</p>
        <p>{state.address.street}, {state.address.city}</p>
        <p>{state.address.state} - {state.address.pincode}</p>
        <p>{state.address.phone}</p>
      </aside>
    </section>
  )
}

function SuccessPage() {
  return (
    <section className="row success">
      <h2>✅ Order placed successfully</h2>
      <p>Your payment is confirmed. You can continue shopping for more deals.</p>
      <a className="cta-inline" href="#/products">Continue Shopping</a>
    </section>
  )
}

function RouterView() {
  const route = pagePath()
  if (route === '/products') return <ProductsPage />
  if (route === '/cart') return <CartPage />
  if (route === '/checkout') return <CheckoutPage />
  if (route === '/payment') return <PaymentPage />
  if (route === '/success') return <SuccessPage />
  return <HomePage />
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="content">
        <div className="steps">
          <span>1. Cart</span><span>2. Checkout</span><span>3. Payment</span><span>4. Success</span>
        </div>
        <RouterView />
      </main>
    </div>
  )
}

export default App
