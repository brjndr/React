import './App.css'

type Category = { name: string; icon: string }
type Product = { title: string; price: string; originalPrice: string; discount: string; rating: string; reviews: string; image: string }

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

const deals: Product[] = [
  {
    title: 'iQ Zentech Neo 5G (128 GB)',
    price: '₹16,999',
    originalPrice: '₹21,999',
    discount: '22% off',
    rating: '4.4',
    reviews: '14,832 ratings',
    image: '📱',
  },
  {
    title: 'NoiseBuds Air Pro ANC Earbuds',
    price: '₹1,999',
    originalPrice: '₹5,499',
    discount: '63% off',
    rating: '4.2',
    reviews: '2,104 ratings',
    image: '🎧',
  },
  {
    title: 'UrbanFit Smart Watch 1.9" AMOLED',
    price: '₹2,499',
    originalPrice: '₹6,999',
    discount: '64% off',
    rating: '4.1',
    reviews: '8,900 ratings',
    image: '⌚',
  },
  {
    title: 'HomeCloud Air Fryer 6L Digital',
    price: '₹3,799',
    originalPrice: '₹8,999',
    discount: '57% off',
    rating: '4.3',
    reviews: '1,662 ratings',
    image: '🍟',
  },
]

const topPicks: Product[] = [
  {
    title: 'Men Solid Casual Shirt',
    price: '₹699',
    originalPrice: '₹1,999',
    discount: '65% off',
    rating: '4.0',
    reviews: '6,011 ratings',
    image: '👔',
  },
  {
    title: 'Women Running Shoes',
    price: '₹1,299',
    originalPrice: '₹3,499',
    discount: '62% off',
    rating: '4.2',
    reviews: '10,354 ratings',
    image: '👟',
  },
  {
    title: 'ErgoBack Office Chair',
    price: '₹5,999',
    originalPrice: '₹12,999',
    discount: '53% off',
    rating: '4.3',
    reviews: '2,321 ratings',
    image: '🪑',
  },
  {
    title: 'Kitchen Essentials Set (18 pc)',
    price: '₹1,499',
    originalPrice: '₹3,999',
    discount: '62% off',
    rating: '4.1',
    reviews: '3,087 ratings',
    image: '🍳',
  },
]

function Header() {
  return (
    <header className="header">
      <div className="logo">Flipkartish</div>
      <input className="search" placeholder="Search for products, brands and more" />
      <button className="login">Login</button>
      <nav className="top-links">
        <a href="#">Become a Seller</a>
        <a href="#">More</a>
        <a href="#">Cart</a>
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
      <h1>Up to 70% Off on Top Brands</h1>
      <p>Fashion, mobiles, electronics, appliances and more.</p>
      <button>Shop Now</button>
    </section>
  )
}

function ProductRow({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="row">
      <div className="row-heading">
        <h2>{title}</h2>
        <button>View All</button>
      </div>
      <div className="grid">
        {products.map((item) => (
          <article key={item.title} className="card">
            <div className="thumb">{item.image}</div>
            <h3>{item.title}</h3>
            <p className="price">{item.price} <span>{item.originalPrice}</span></p>
            <p className="discount">{item.discount}</p>
            <p className="rating">⭐ {item.rating} · {item.reviews}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="content">
        <CategoryBar />
        <Hero />
        <ProductRow title="Best Deals on Electronics" products={deals} />
        <ProductRow title="Top Picks for You" products={topPicks} />
      </main>
    </div>
  )
}

export default App
