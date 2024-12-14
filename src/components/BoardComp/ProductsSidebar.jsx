
import '../style/components.css';

function ProductsSidebar({ products, selectedProduct, onProductSelect }) {
  return (
    <aside className="products-sidebar">
      <h3>Products</h3>
      <div className="product-filters">
        <button
          className={`product-filter ${selectedProduct === "all" ? "active" : ""}`}
          onClick={() => onProductSelect("all")}
        >
          All Products
        </button>
        {products.map((product) => (
          <button
            key={product.id}
            className={`product-filter ${
              selectedProduct === product.name ? "active" : ""
            }`}
            onClick={() => onProductSelect(product.name)}
          >
            {product.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ProductsSidebar; 