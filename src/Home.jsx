import { useState } from 'react'
import { products } from './data'
import './App.css'

function Home() {
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categories = [...new Set(products.map(p => p.name))].sort()

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !selectedCategory || p.name === selectedCategory
    const matchesPrice = parseFloat(p.price) >= priceRange[0] && parseFloat(p.price) <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.open(`/search?q=${encodeURIComponent(query.trim())}`, '_blank')
    }
  }

  return (
    <div className="layout">
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Filters</h2>

        <form onSubmit={handleSearch} className="search-form-sidebar">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="filter-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="filter-section">
          <h3>Product Name</h3>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={() => setSelectedCategory('')}
              />
              All Products
            </label>
            {categories.map(cat => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseFloat(e.target.value) || 0, priceRange[1]])}
              className="price-input"
              placeholder="Min"
            />
            <span>to</span>
            <input
              type="number"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value) || 1000])}
              className="price-input"
              placeholder="Max"
            />
          </div>
        </div>

        <button
          className="reset-btn"
          onClick={() => {
            setQuery('')
            setSelectedCategory('')
            setPriceRange([0, 1000])
          }}
        >
          Reset Filters
        </button>
      </aside>

      <main className="main-content">
        <h1>All Products</h1>
        <p className="count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="product-grid">
          {filtered.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.product} alt={item.name} className="product-image" />
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">${item.price}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="no-results">No products match your filters</p>
        )}
      </main>

      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}

export default Home