import React from 'react';
import '../style/components.css';

function ProductDetails({ formData, onChange, handleTextareaHeight }) {
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          placeholder="Enter product description"
          rows="1"
          style={{ 
            resize: 'none',
            overflow: 'hidden',
            minHeight: '42px'
          }}
          onFocus={handleTextareaHeight}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={onChange}
            required
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          placeholder="Enter product category"
          className="category-input"
        />
        <small className="helper-text">
          Enter a category for your product (e.g., Electronics, Clothing, Books)
        </small>
      </div>
    </div>
  );
}

export default ProductDetails; 