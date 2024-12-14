import { useState } from 'react';
import '../style/components.css';

function DownloadComponent({ data, showBLF, selectedProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('csv');

  const handleDownload = () => {
    let downloadContent = '';
    const fileName = `board-data-${showBLF ? 'blf-' : ''}${selectedProduct}-${downloadFormat}`;

    if (downloadFormat === 'csv') {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(item => Object.values(item).join(','));
      downloadContent = [headers, ...rows].join('\n');
    } else {
      downloadContent = JSON.stringify(data, null, 2);
    }

    const blob = new Blob([downloadContent], {
      type: downloadFormat === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  return (
    <>
      <button 
        className="download-btn"
        onClick={() => setShowModal(true)}
      >
        <svg 
          className="download-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download Data
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="download-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Download Options</h3>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="format-selection">
                <label className="format-label">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={downloadFormat === 'csv'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                  />
                  <span className="format-text">
                    <strong>CSV</strong>
                    <span className="format-desc">Spreadsheet format</span>
                  </span>
                </label>

                <label className="format-label">
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={downloadFormat === 'json'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                  />
                  <span className="format-text">
                    <strong>JSON</strong>
                    <span className="format-desc">Raw data format</span>
                  </span>
                </label>
              </div>

              <div className="download-info">
                <p>
                  {showBLF ? 'BLF Analysis data' : 'Order data'} for{' '}
                  <strong>{selectedProduct === 'all' ? 'all products' : selectedProduct}</strong>
                </p>
                <p className="record-count">
                  {data.length} records will be downloaded
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="download-confirm-btn"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DownloadComponent; 