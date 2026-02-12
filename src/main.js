const products = [
  { id: 'p1', title: 'iQ Zentech Neo 5G (128 GB)', price: 16999, originalPrice: 21999, discount: '22% off', rating: '4.4', reviews: '14,832 ratings', image: '📱' },
  { id: 'p2', title: 'NoiseBuds Air Pro ANC Earbuds', price: 1999, originalPrice: 5499, discount: '63% off', rating: '4.2', reviews: '2,104 ratings', image: '🎧' },
  { id: 'p3', title: 'UrbanFit Smart Watch 1.9" AMOLED', price: 2499, originalPrice: 6999, discount: '64% off', rating: '4.1', reviews: '8,900 ratings', image: '⌚' },
  { id: 'p4', title: 'HomeCloud Air Fryer 6L Digital', price: 3799, originalPrice: 8999, discount: '57% off', rating: '4.3', reviews: '1,662 ratings', image: '🍟' },
  { id: 'p5', title: 'Men Solid Casual Shirt', price: 699, originalPrice: 1999, discount: '65% off', rating: '4.0', reviews: '6,011 ratings', image: '👔' },
  { id: 'p6', title: 'Women Running Shoes', price: 1299, originalPrice: 3499, discount: '62% off', rating: '4.2', reviews: '10,354 ratings', image: '👟' },
  { id: 'p7', title: 'ErgoBack Office Chair', price: 5999, originalPrice: 12999, discount: '53% off', rating: '4.3', reviews: '2,321 ratings', image: '🪑' },
  { id: 'p8', title: 'Kitchen Essentials Set (18 pc)', price: 1499, originalPrice: 3999, discount: '62% off', rating: '4.1', reviews: '3,087 ratings', image: '🍳' },
]

const root = document.getElementById('root')

const state = {
  cart: [],
  address: { fullName: '', phone: '', street: '', city: '', state: '', pincode: '' },
  paymentMethod: 'upi',
}

const money = (n) => `₹${n.toLocaleString('en-IN')}`
const cartCount = () => state.cart.reduce((s, i) => s + i.qty, 0)
const cartTotal = () => state.cart.reduce((s, i) => s + i.qty * i.price, 0)
const findProduct = (id) => products.find((p) => p.id === id)

function addToCart(id) {
  const existing = state.cart.find((c) => c.id === id)
  if (existing) existing.qty += 1
  else {
    const item = findProduct(id)
    if (item) state.cart.push({ id: item.id, title: item.title, image: item.image, price: item.price, qty: 1 })
  }
  render()
}

function updateQty(id, delta) {
  const item = state.cart.find((c) => c.id === id)
  if (!item) return
  item.qty += delta
  state.cart = state.cart.filter((c) => c.qty > 0)
  render()
}

function header() {
  return `<header class="header">
      <a class="logo" href="#/">Flipkartish</a>
      <input class="search" placeholder="Search for products, brands and more" />
      <button class="login">Login</button>
      <nav class="top-links">
        <a href="#/products">Products</a>
        <a href="#/checkout">Checkout</a>
        <a href="#/cart">Cart (${cartCount()})</a>
      </nav>
    </header>`
}

function productCard(item) {
  return `<article class="card">
      <div class="thumb">${item.image}</div>
      <h3>${item.title}</h3>
      <p class="price">${money(item.price)} <span>${money(item.originalPrice)}</span></p>
      <p class="discount">${item.discount}</p>
      <p class="rating">⭐ ${item.rating} · ${item.reviews}</p>
      <button class="add-btn" data-action="add" data-id="${item.id}">Add to Cart</button>
    </article>`
}

function homePage() {
  return `<section class="row"><h2>Best Deals</h2><div class="grid">${products.slice(0, 4).map(productCard).join('')}</div></section>
    <section class="row"><h2>Top Picks</h2><div class="grid">${products.slice(4).map(productCard).join('')}</div></section>`
}

function productsPage() {
  return `<section class="row"><div class="row-heading"><h2>All Products</h2><a class="link" href="#/cart">Go to Cart</a></div><div class="grid">${products.map(productCard).join('')}</div></section>`
}

function cartPage() {
  if (!state.cart.length) return `<section class="row"><h2>Your cart is empty</h2><a class="cta-inline" href="#/products">Browse Products</a></section>`
  return `<section class="checkout-layout"><div class="row"><h2>Shopping Cart</h2>${state.cart.map((i) => `<article class="cart-item"><div class="thumb small">${i.image}</div><div class="cart-meta"><h3>${i.title}</h3><p class="price">${money(i.price)}</p><div class="qty-row"><button data-action="qty" data-id="${i.id}" data-delta="-1">-</button><span>${i.qty}</span><button data-action="qty" data-id="${i.id}" data-delta="1">+</button></div></div></article>`).join('')}</div>
    <aside class="summary"><h3>Price Details</h3><p><span>Items Total</span><strong>${money(cartTotal())}</strong></p><p><span>Delivery</span><strong class="green">FREE</strong></p><p class="total"><span>Payable</span><strong>${money(cartTotal())}</strong></p><a class="cta-inline block" href="#/checkout">Place Order</a></aside></section>`
}

function checkoutPage() {
  return `<section class="row form-wrap"><h2>Delivery Address</h2><div class="form-grid">
    <input id="fullName" placeholder="Full Name" value="${state.address.fullName}" />
    <input id="phone" placeholder="Phone Number" value="${state.address.phone}" />
    <input id="street" placeholder="Street Address" value="${state.address.street}" />
    <input id="city" placeholder="City" value="${state.address.city}" />
    <input id="state" placeholder="State" value="${state.address.state}" />
    <input id="pincode" placeholder="Pincode" value="${state.address.pincode}" />
  </div><button class="add-btn wide" data-action="save-address">Continue to Payment</button></section>`
}

function paymentPage() {
  if (!state.address.fullName) return `<section class="row"><h2>Add address before payment</h2><a class="cta-inline" href="#/checkout">Go to Checkout</a></section>`
  return `<section class="checkout-layout"><div class="row form-wrap"><h2>Payment Method</h2>
    <button class="payment-btn" data-action="payment" data-method="upi">UPI</button>
    <button class="payment-btn" data-action="payment" data-method="card">Credit / Debit Card</button>
    <button class="payment-btn" data-action="payment" data-method="cod">Cash on Delivery</button>
    <p class="payment-note">Selected: <strong>${state.paymentMethod.toUpperCase()}</strong></p>
    <button class="add-btn wide" data-action="place-order">Pay ${money(cartTotal())}</button></div>
    <aside class="summary"><h3>Deliver To</h3><p>${state.address.fullName}</p><p>${state.address.street}, ${state.address.city}</p><p>${state.address.state} - ${state.address.pincode}</p><p>${state.address.phone}</p></aside></section>`
}

function successPage() {
  return `<section class="row success"><h2>✅ Order placed successfully</h2><p>Your payment is confirmed.</p><a class="cta-inline" href="#/products">Continue Shopping</a></section>`
}

function routeView() {
  const route = window.location.hash.replace('#', '') || '/'
  if (route === '/products') return productsPage()
  if (route === '/cart') return cartPage()
  if (route === '/checkout') return checkoutPage()
  if (route === '/payment') return paymentPage()
  if (route === '/success') return successPage()
  return homePage()
}

function render() {
  root.innerHTML = `${header()}<main class="content"><div class="steps"><span>1. Cart</span><span>2. Checkout</span><span>3. Payment</span><span>4. Success</span></div>${routeView()}</main>`
}

document.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return

  const action = target.dataset.action
  if (!action) return

  if (action === 'add') addToCart(target.dataset.id)
  if (action === 'qty') updateQty(target.dataset.id, Number(target.dataset.delta))
  if (action === 'payment') {
    state.paymentMethod = target.dataset.method || 'upi'
    render()
  }
  if (action === 'save-address') {
    const fields = ['fullName', 'phone', 'street', 'city', 'state', 'pincode']
    for (const field of fields) {
      const el = document.getElementById(field)
      if (!(el instanceof HTMLInputElement) || !el.value.trim()) return window.alert('Please fill all address fields.')
      state.address[field] = el.value.trim()
    }
    window.location.hash = '/payment'
  }
  if (action === 'place-order') {
    state.cart = []
    window.location.hash = '/success'
  }
})

window.addEventListener('hashchange', render)
if (!window.location.hash) window.location.hash = '/'
render()
