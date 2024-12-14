import React from 'react';

function ProductModal({ product, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <div className="modal-price">{product.price}</div>
            
            <div className="modal-section">
              <h3>Select Size</h3>
              <div className="size-buttons">
                {["S", "M", "L", "XL"].map(size => (
                  <button key={size} className="size-btn">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="modal-section">
              <h3>Select Color</h3>
              <div className="color-buttons">
                {["Black", "White", "Blue", "Red"].map(color => (
                  <button 
                    key={color} 
                    className="color-btn"
                    style={{ backgroundColor: color.toLowerCase() }}
                  >
                    <span className="color-name">{color}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <div className="quantity-selector">
                <button className="qty-btn">-</button>
                <input type="number" min="1" value="1" readOnly />
                <button className="qty-btn">+</button>
              </div>
              <button className="add-to-cart-modal">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal; 