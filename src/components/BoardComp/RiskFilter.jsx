import React from 'react';
import '../style/components.css';

function RiskFilter({ riskThreshold, onRiskChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="risk-filter-form">
      <div className="risk-input-group">
        <label htmlFor="riskLevel" className="risk-label">
          Risk Level (%)
        </label>
        <input
          type="number"
          id="riskLevel"
          min="0"
          max="100"
          value={riskThreshold}
          onChange={(e) => onRiskChange(Number(e.target.value))}
          className="risk-input"
        />
        <button type="submit" className="risk-submit-btn">
          Apply Filter
        </button>
      </div>
    </form>
  );
}

export default RiskFilter; 