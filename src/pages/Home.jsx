import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/webpage.css";
import Footer from '../components/Footer';
import Header from "../components/Header";
import YourProducts from "../components/YourProducts";
import LastBoard from "../components/LastBoard";
import logo from "../assets/react.svg"

function Home() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBLFModal, setShowBLFModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleEdit = (productId, productName) => {
    setSelectedProduct({ id: productId, name: productName });
    setShowEditModal(true);
  };

  const handlePreview = (productId) => {
    navigate(`/product-preview/${productId}`);
  };

  const handleTestBLF = (e) => {
    e.preventDefault();
    setShowBLFModal(true);
  };

  const EditModal = ({ product, onClose }) => {
    if (!product) return null;

    const colors = ['Black', 'White', 'Navy', 'Red', 'Blue', 'Gray', 'Beige'];
    
    const [selectedColors, setSelectedColors] = useState(['Black']); // Default color
    const [images, setImages] = useState([]);

    

    const handleColorToggle = (color) => {
      setSelectedColors(prev => 
        prev.includes(color) 
          ? prev.filter(c => c !== color)
          : [...prev, color]
      );
    };

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
      setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Edit Product</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <form className="edit-form">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  defaultValue={product.name}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  id="productPrice"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Product Images</label>
                <div className="images-container">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image.url} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button" 
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <label className="image-upload-btn">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span>+ Add Image</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Available Colors</label>
                <div className="colors-grid">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-btn ${selectedColors.includes(color) ? 'selected' : ''}`}
                      onClick={() => handleColorToggle(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      <span className="color-check">✓</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea
                  id="productDescription"
                  className="form-input"
                  rows="3"
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // File upload handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploadedFile(file);
    }
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append('uploadFile', uploadedFile);

    try {
      setProcessingStatus('uploading');
      
      const response = await axios.post('http://localhost:5000/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
          navigate('/board')
        }
      });

      setProcessingStatus('success');
      console.log('File processed:', response.data);
      
      // Reset states
      setUploadedFile(null);
      setShowBLFModal(false);
      setUploadProgress(0);
      
      // Show success message
      alert(`Successfully processed ${response.data.recordsInserted} records`);

    } catch (error) {
      setProcessingStatus('error');
      console.error('Error processing file:', error);
      alert(error.response?.data?.error || 'Failed to process file');
    }
  };

  return (
    <div className="home-wrapper">
      <Header />

      <main>
        <section className="hero-section">
          <h1 className="hero-title">
            With <span className="highlight">NEST</span> reduce the<br />
            COD prblems using <span className="highlight">BLF</span>
          </h1>
          <p className="hero-description">
            BLF stand for black list filter is a solution for you so you can filter your
            clients depending on there risk ratio
          </p>
          <button onClick={handleTestBLF} className="cta-button">
            test BLF
            <span className="arrow">→</span>
          </button>
        </section>
        <YourProducts />

        <LastBoard />

        {showBLFModal && (
          <div className="modal-overlay" onClick={() => setShowBLFModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Test BLF</h2>
                <button className="close-btn" onClick={() => setShowBLFModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div 
                  className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="file-info">
                      <span>{uploadedFile.name}</span>
                      <button 
                        className="remove-file"
                        onClick={() => setUploadedFile(null)}
                      >
                        Remove
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
                      <p>Drag & Drop your Excel file here or</p>
                      <label className="upload-btn">
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        Browse Files
                      </label>
                    </>
                  )}

                  {processingStatus === 'uploading' && (
                    <div className="upload-progress">
                      <div 
                        className="progress-bar"
                        style={{ width: `${uploadProgress}%` }}
                      />
                      <span>{uploadProgress}%</span>
                    </div>
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
                    disabled={!uploadedFile || processingStatus === 'uploading'}
                    onClick={handleProcessFile}
                  >
                    {processingStatus === 'uploading' ? 'Processing...' : 'Process File'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showEditModal && (
        <EditModal 
          product={selectedProduct} 
          onClose={() => setShowEditModal(false)} 
        />
      )}

      <Footer />
    </div>
  );
}

export default Home;