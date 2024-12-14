import React from 'react';
import '../style/components.css';

function ColorSelector({ availableColors, selectedColors, onColorToggle }) {
  return (
    <div className="color-section">
      <h3>Available Colors</h3>
      <div className="color-options">
        {availableColors.map(color => (
          <label key={color} className="color-checkbox">
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => onColorToggle(color)}
            />
            <span 
              className="color-swatch"
              style={{ backgroundColor: color.toLowerCase() }}
            />
            <span className="color-name">{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ColorSelector; 