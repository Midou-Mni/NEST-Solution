import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style/webpage.css";
import Footer from '../components/Footer';
import Header from "../components/Header";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error:', err);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error:', err);
      }
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axios.put(`http://localhost:5000/api/products/${productId}`, {
        status: newStatus
      });
      
      setProducts(products.map(product => 
        product._id === productId 
          ? { ...product, status: newStatus }
          : product
      ));
    } catch (err) {
      setError('Failed to update product status');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <Header />

      <main>
        <section className="my-products-section">
          <div className="section-header">
            <h1 className="section-title">
              My <span className="highlight">Products</span>
            </h1>
            <div className="product-actions">
              <select className="filter-select">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td className="product-cell">
                      <img 
                        src={`http://localhost:5000${product.image}`} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <span>{product.name}</span>
                    </td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn edit"
                        onClick={() => window.location.href = `/edit-product/${product._id}`}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn toggle"
                        onClick={() => handleToggleStatus(product._id, product.status)}
                      >
                        {product.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MyProducts; 