
function LastBoard() {
  return (
    <section className="last-board-section">
      <h2 className="section-title">
        Last <span className="highlight">Board</span> Products
      </h2>
      <div className="board-table-wrapper">
        <table className="board-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Size</th>
              <th>Color</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "b1",
                name: "Leather Jacket",
                status: "Delivered",
                date: "2024-03-15",
                customer: "John Doe",
                image: "/assets/men.jpg",
                size: "M",
                color: "Black",
              },
              {
                id: "b2",
                name: "Denim Jacket",
                status: "Pending",
                date: "2024-03-14",
                customer: "Jane Smith",
                image: "/assets/women.jpg",
                size: "S",
                color: "Navy",
              },
              {
                id: "b3",
                name: "Winter Coat",
                status: "Processing",
                date: "2024-03-13",
                customer: "Mike Johnson",
                image: "/assets/men.jpg",
                size: "L",
                color: "Gray",
              },
            ].map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.customer}</td>
                <td>
                  <span className="size-cell">{product.size}</span>
                </td>
                <td>
                  <div className="color-cell">
                    <span
                      className="color-dot"
                      style={{ backgroundColor: product.color.toLowerCase() }}
                      title={product.color}
                    />
                  </div>
                </td>
                <td>{new Date(product.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`status-badge ${product.status.toLowerCase()}`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default LastBoard;
