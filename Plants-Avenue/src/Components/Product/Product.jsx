import React, { useState, useMemo, forwardRef } from 'react';
import './Product.css';
import productsData, { CATEGORIES } from './Productdata';

const Products = forwardRef(function Products(
  { addToCart, wishlist, toggleWishlist, onOpenProductModal },
  ref
) {
  const [activeCategory, setActiveCategory] = useState('All Plants');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [addedIds, setAddedIds] = useState({});

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        // Category match
        const matchesCategory =
          activeCategory === 'All Plants' ||
          item.category === activeCategory ||
          (item.categories && item.categories.includes(activeCategory));

        // Search match
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.scientificName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.id - b.id; // featured
      });
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCartClick = (item) => {
    addToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const isItemWishlisted = (id) => wishlist.some((w) => w.id === id);

  return (
    <section className="products-section" id="shop">
      <div className="container">
        {/* Section Header */}
        <div className="products-header">
          <span className="section-badge">🌿 Hand-Grown Botanicals</span>
          <h2 className="section-title">Explore Our Living Collection</h2>
          <p className="section-subtitle">
            From easy-care trailing vines to sculptural air-purifying foliage, find the perfect plant to elevate your indoor sanctuary.
          </p>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="catalog-toolbar">
          <div className="search-box-wrapper">
            <span className="search-icon">🔍</span>
            <input
              ref={ref}
              type="text"
              placeholder="Search by plant name, care type, or benefit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="catalog-search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="toolbar-controls-right">
            <div className="sort-dropdown-box">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated ★</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="category-tabs-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="catalog-counter-bar">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of {productsData.length} plants
          </span>
          {(searchQuery || activeCategory !== 'All Plants') && (
            <button
              className="reset-filters-link"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Plants');
              }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-state">
            <div className="no-products-icon">🌱</div>
            <h3>No matching plants found</h3>
            <p>Try searching with another keyword or resetting your category filters.</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Plants');
              }}
            >
              View All Plants
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((item) => {
              const isWish = isItemWishlisted(item.id);
              const isAdded = addedIds[item.id];

              return (
                <div className="product-card" key={item.id}>
                  {/* Badges */}
                  <div className="card-top-row">
                    {item.badge ? (
                      <span className={`card-badge badge-${item.badgeType || 'hot'}`}>
                        {item.badge}
                      </span>
                    ) : (
                      <span></span>
                    )}

                    <button
                      className={`card-wishlist-btn ${isWish ? 'active' : ''}`}
                      onClick={() => toggleWishlist(item)}
                      title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      {isWish ? '❤️' : '🤍'}
                    </button>
                  </div>

                  {/* Image with Quick View Hover */}
                  <div
                    className="card-image-box"
                    onClick={() => onOpenProductModal(item)}
                  >
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <button
                      className="card-quick-view-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(item);
                      }}
                    >
                      👁️ Quick View
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="card-info">
                    <div className="card-category-rating">
                      <span className="card-category">{item.category}</span>
                      <span className="card-rating">
                        ★ {item.rating} <small>({item.reviewsCount})</small>
                      </span>
                    </div>

                    <h3
                      className="card-title"
                      onClick={() => onOpenProductModal(item)}
                    >
                      {item.name}
                    </h3>
                    <p className="card-scientific">
                      <em>{item.scientificName}</em>
                    </p>

                    {/* Micro care specs */}
                    <div className="card-care-chips">
                      <span title={item.care?.water}>💧 {item.care?.water?.split(' ')[0]}</span>
                      <span title={item.care?.light}>☀️ {item.care?.light?.split(' ')[0]}</span>
                      {item.care?.petSafe && <span title="Pet Friendly">🐾 Pet Safe</span>}
                    </div>

                    {/* Price and Cart Action */}
                    <div className="card-footer-row">
                      <div className="card-pricing">
                        <span className="card-current-price">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="card-original-price">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        className={`card-add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCartClick(item)}
                      >
                        {isAdded ? '✓ Added' : 'Add to Cart +'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
});

export default Products;
