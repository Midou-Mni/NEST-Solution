import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function YourProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit-product/${product._id}`, {
      state: {
        product: {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          status: product.status,
          colors: product.colors,
          image: product.image
        }
      }
    });
  };

  const handlePreview = (productId) => {
    navigate(`/product-preview/${productId}`);
  };

  if (loading) {
    return (
      <section className="products-section">
        <h2 className="section-title">Loading products...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section">
        <h2 className="section-title">Error: {error}</h2>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2 className="section-title">
        <span className="highlight">your</span> products
      </h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img 
                  src={`http://localhost:5000${product.image}`} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "/assets/placeholder.jpg";
                  }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="price">${product.price}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="preview-btn"
                    onClick={() => handlePreview(product._id)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found. Start by adding some products.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default YourProducts;