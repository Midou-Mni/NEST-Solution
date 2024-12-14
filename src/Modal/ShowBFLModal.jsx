import React from 'react'

function ShowBFLModal( ) {
  return (
    <div className="modal-overlay" onClick={() => setShowBLFModal(false)}>
            <div className="modal-content blf-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Test BLF - Upload File</h2>
                <button className="close-btn" onClick={() => setShowBLFModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div 
                  className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="uploaded-file">
                      <span className="file-name">{uploadedFile.name}</span>
                      <button 
                        className="remove-file"
                        onClick={() => setUploadedFile(null)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <p>Drag & Drop your file here or</p>
                      <label className="file-input-label">
                        <input
                          type="file"
                          accept=".csv,.xlsx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <span>Browse Files</span>
                      </label>
                      <p className="file-types">Supported files: CSV, Excel</p>
                    </>
                  )}
                </div>

                <div className="modal-actions">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowBLFModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="submit-btn"
                    disabled={!uploadedFile}
                    onClick={handleProcessFile}
                  >
                    Process File
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ShowBFLModal