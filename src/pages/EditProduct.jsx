import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/webpage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ColorSelector from "../components/ProductForm/ColorSelector";

function EditProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(
    location.state?.product || null
  );

  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
  ];

  useEffect(() => {
    if (!productData) {
      fetchProductData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      const product = response.data;
      setProductData({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        status: product.status,
        colors: product.colors || [],
        image: product.image
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to fetch product data');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorToggle = (color) => {
    setProductData(prev => ({
      ...prev,
      colors: prev.colors?.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...(prev.colors || []), color]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, productData);
      navigate(-1);
    } catch (err) {
      console.error('Error updating product:', err);
      alert(err.response?.data?.message || 'Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="home-wrapper">
        <Header />
        <main>
          <section className="add-product-section">
            <h1 className="section-title">Loading...</h1>
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper">
        <Header />
        <main>
          <section className="add-product-section">
            <h1 className="section-title">Error: {error}</h1>
            <button 
              className="retry-btn"
              onClick={fetchProductData}
            >
              Retry
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <Header />
      <main>
        <section className="add-product-section">
          <h1 className="section-title">
            Edit <span className="highlight">Product</span>
          </h1>

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="add-product-grid">
              {/* Left Column - Image Upload and Colors */}
              <div className="image-upload-column">
                <div className="square-image-container">
                  <img
                    src={`http://localhost:5000${productData.image}`}
                    alt={productData.name}
                    className="square-image"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder.jpg";
                    }}
                  />
                  <button type="button" className="change-image-btn">
                    Change Image
                  </button>
                </div>
                <div className="color-selector-container">
                  <ColorSelector
                    availableColors={colors}
                    selectedColors={productData.colors || []}
                    onColorToggle={handleColorToggle}
                  />
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="product-info-column">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={productData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={productData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditProduct;
