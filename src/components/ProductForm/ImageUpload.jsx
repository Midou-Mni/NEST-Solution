import React from 'react';
import '../style/components.css';

function ImageUpload({ imagePreview, onImageChange, dragActive, handleDrag, handleDrop }) {
  return (
    <div className="image-upload-column">
      <div 
        className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="image-preview">
            <img src={imagePreview} alt="Product preview" />
            <button 
              type="button" 
              className="remove-image"
              onClick={() => onImageChange(null)}
            >
              Change Image
            </button>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p>Drag & Drop your image here or</p>
            <label className="upload-btn">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files[0])}
                className="hidden"
              />
              Browse Files
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUpload; 