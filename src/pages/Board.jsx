import { useState } from "react";
import "./style/webpage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DownloadComponent from "../components/BoardComp/DownloadComponent";
import ProductsSidebar from "../components/BoardComp/ProductsSidebar";
import RiskFilter from "../components/BoardComp/RiskFilter";
import OrdersTable from "../components/BoardComp/OrdersTable";

function Board() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [showBLF, setShowBLF] = useState(false);
  const [riskThreshold, setRiskThreshold] = useState(50);
  const [showFilteredRisk, setShowFilteredRisk] = useState(false);
  const [filters, setFilters] = useState({
    pending: true,
    confirmed: true,
    returned: true,
  });

  const products = [
    { id: 1, name: "Veste femme zara" },
    { id: 2, name: "Veste home LV" },
    { id: 3, name: "T-shirt Classic" },
    { id: 4, name: "Robe d'été" },
    { id: 5, name: "Pantalon Jean Slim" },
    { id: 6, name: "Chemise Blanche" },
    { id: 7, name: "Blazer Noir" },
    { id: 8, name: "Pull Cachemire" },
    { id: 9, name: "Jupe Plissée" },
    { id: 10, name: "Manteau Laine" },
  ];

  const allOrders = [
    {
      id: 1,
      product: "Veste femme zara",
      customerName: "John Doe",
      phoneNumber: "+1 234-567-8900",
      address: "123 Main St, City, Country",
      size: "L",
      color: "Black",
      quantity: 1,
      status: "pending",
      date: "2024-03-15",
      riskPercentage: 25,
    },
    {
      id: 2,
      product: "Veste home LV",
      customerName: "Jane Smith",
      phoneNumber: "+1 234-567-8901",
      address: "456 Oak St, City, Country",
      size: "M",
      color: "Navy",
      quantity: 2,
      status: "confirmed",
      date: "2024-03-14",
      riskPercentage: 75,
    },
    {
      id: 3,
      product: "T-shirt Classic",
      customerName: "Alice Johnson",
      phoneNumber: "+1 234-567-8902",
      address: "789 Pine St, City, Country",
      size: "S",
      color: "White",
      quantity: 3,
      status: "returned",
      date: "2024-03-13",
      riskPercentage: 90,
    },
    {
      id: 4,
      product: "Robe d'été",
      customerName: "Emma Wilson",
      phoneNumber: "+1 234-567-8903",
      address: "321 Elm St, City, Country",
      size: "M",
      color: "Blue",
      quantity: 1,
      status: "pending",
      date: "2024-03-15",
      riskPercentage: 45,
    },
    {
      id: 5,
      product: "Pantalon Jean Slim",
      customerName: "Michael Brown",
      phoneNumber: "+1 234-567-8904",
      address: "654 Maple St, City, Country",
      size: "L",
      color: "Blue",
      quantity: 1,
      status: "confirmed",
      date: "2024-03-14",
      riskPercentage: 15,
    },
    {
      id: 6,
      product: "Chemise Blanche",
      customerName: "Sophie Martin",
      phoneNumber: "+1 234-567-8905",
      address: "987 Cedar St, City, Country",
      size: "S",
      color: "White",
      quantity: 2,
      status: "pending",
      date: "2024-03-15",
      riskPercentage: 60,
    },
    {
      id: 7,
      product: "Blazer Noir",
      customerName: "David Lee",
      phoneNumber: "+1 234-567-8906",
      address: "147 Birch St, City, Country",
      size: "M",
      color: "Black",
      quantity: 1,
      status: "confirmed",
      date: "2024-03-14",
      riskPercentage: 30,
    },
    {
      id: 8,
      product: "Pull Cachemire",
      customerName: "Laura Taylor",
      phoneNumber: "+1 234-567-8907",
      address: "258 Walnut St, City, Country",
      size: "L",
      color: "Gray",
      quantity: 1,
      status: "returned",
      date: "2024-03-13",
      riskPercentage: 85,
    },
    {
      id: 9,
      product: "Jupe Plissée",
      customerName: "Marie Dubois",
      phoneNumber: "+1 234-567-8908",
      address: "369 Pine St, City, Country",
      size: "S",
      color: "Red",
      quantity: 1,
      status: "pending",
      date: "2024-03-15",
      riskPercentage: 40,
    },
    {
      id: 10,
      product: "Manteau Laine",
      customerName: "Thomas Anderson",
      phoneNumber: "+1 234-567-8909",
      address: "741 Oak St, City, Country",
      size: "XL",
      color: "Beige",
      quantity: 1,
      status: "confirmed",
      date: "2024-03-14",
      riskPercentage: 20,
    },
  ];

  const handleFilterChange = (status) => {
    setFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const filteredOrders = allOrders.filter((order) => {
    if (selectedProduct !== "all" && order.product !== selectedProduct)
      return false;
    return filters[order.status];
  });

  const handleRiskSubmit = (e) => {
    e.preventDefault();
    setShowFilteredRisk(true);
  };

  const getHighRiskOrders = () => {
    return filteredOrders.filter(
      (order) => order.riskPercentage >= riskThreshold
    );
  };

  const ordersToDisplay = showFilteredRisk && showBLF 
    ? getHighRiskOrders() 
    : filteredOrders;

  return (
    <div className="home-wrapper">
      <Header />

      <main className="board-layout">
        <ProductsSidebar 
          products={products}
          selectedProduct={selectedProduct}
          onProductSelect={setSelectedProduct}
        />

        <section className="board-section">
          <h1 className="section-title">
            {showBLF ? "BLF Analysis" : "Orders"}{" "}
            <span className="highlight">Board</span>
          </h1>

          <div className="board-actions">
            {showBLF && (
              <RiskFilter 
                riskThreshold={riskThreshold}
                onRiskChange={setRiskThreshold}
                onSubmit={handleRiskSubmit}
              />
            )}
            
            <button
              className={`blf-btn ${showBLF ? "bg-secondary-600" : ""}`}
              onClick={() => {
                setShowBLF(!showBLF);
                setShowFilteredRisk(false);
              }}
            >
              {showBLF ? "Hide BLF Analysis" : "Use BLF for All Orders"}
              <span className="action-count">{filteredOrders.length}</span>
            </button>

            <DownloadComponent
              data={ordersToDisplay}
              showBLF={showBLF}
              selectedProduct={selectedProduct}
            />
          </div>

          {showBLF && showFilteredRisk && (
            <div className="risk-summary">
              <h3>High Risk Orders Summary</h3>
              <p>
                Found {getHighRiskOrders().length} orders with risk level ≥{" "}
                {riskThreshold}%
              </p>
            </div>
          )}

          <OrdersTable 
            orders={ordersToDisplay}
            showBLF={showBLF}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Board;
