import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './style/webpage.css';

function ProductPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
      if (response.data.colors?.length > 0) {
        setSelectedColor(response.data.colors[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to fetch product');
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="home-wrapper">
        <Header />
        <main className="preview-main">
          <div className="loading-state">Loading product details...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper">
        <Header />
        <main className="preview-main">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchProduct} className="retry-btn">
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="home-wrapper">
        <Header />
        <main className="preview-main">
          <div className="error-state">Product not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <Header />
      <main className="preview-main">
        <div className="preview-container">
          <div className="preview-header">
            <h1>Product Preview</h1>
            <div className="preview-header-actions">
              <button 
                className="share-btn"
                onClick={handleShare}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Share
                {showCopiedMessage && (
                  <span className="copied-message">Link copied!</span>
                )}
              </button>
              <button 
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>

          <div className="preview-content">
            <div className="preview-image-section">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="preview-image"
                onError={(e) => {
                  e.target.src = "/assets/placeholder.jpg";
                }}
              />
              {product.colors?.length > 0 && (
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="preview-details">
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              
              <div className="product-meta">
                <div className="price">
                  <span className="label">Price:</span>
                  <span className="value">${product.price}</span>
                </div>
                <div className="stock">
                  <span className="label">Stock:</span>
                  <span className="value">{product.stock} units</span>
                </div>
                <div className="category">
                  <span className="label">Category:</span>
                  <span className="value">{product.category}</span>
                </div>
                <div className="status">
                  <span className="label">Status:</span>
                  <span className={`status-badge ${product.status}`}>
                    {product.status}
                  </span>
                </div>
              </div>

              <div className="preview-actions">
                <button 
                  className="edit-btn"
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPreview; 