import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/webpage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageUpload from "../components/ProductForm/ImageUpload";
import ColorSelector from "../components/ProductForm/ColorSelector";
import ProductDetails from "../components/ProductForm/ProductDetails";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    colors: [],
    stock: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Gray"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  const handleColorToggle = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "colors") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/my-products");
    } catch (err) {
      setError(err.response?.data?.error || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    }
  }, []);

  const handleTextareaHeight = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="home-wrapper">
      <Header />

      <main>
        <section className="add-product-section">
          <h1 className="section-title">
            Add New <span className="highlight">Product</span>
          </h1>

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="add-product-grid">
              <ImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
              />

              <div className="form-content">
                <ProductDetails
                  formData={formData}
                  onChange={handleChange}
                  handleTextareaHeight={handleTextareaHeight}
                />
                <div style={{ height: "50px" }}></div>
                <ColorSelector
                  availableColors={availableColors}
                  selectedColors={formData.colors}
                  onColorToggle={handleColorToggle}
                />

                {error && <div className="error-message">{error}</div>}

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    style={{ height: "40px", marginTop: "12px" }}
                    onClick={() => navigate("/my-products")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    style={{ height: "40px" }}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AddProduct;
