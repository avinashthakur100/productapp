import { useSearchParams } from 'react-router-dom'
import { products } from './data'
import { Link } from 'react-router-dom'
import './App.css'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="search-results">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h1>Search Results for "{query}"</h1>
      <p className="count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.product} alt={item.name} className="product-image" />
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No products found matching "{query}"</p>
      )}
    </div>
  )
}

export default SearchResults