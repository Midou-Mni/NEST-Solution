import React from 'react';
import '../style/components.css';

function OrdersTable({ orders, showBLF }) {
  const getRiskClass = (percentage) => {
    if (percentage <= 30) return "text-green-600 bg-green-50";
    if (percentage <= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Status</th>
            {showBLF && <th>Risk Level</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={order.status}>
              <td>{order.customerName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>{order.size}</td>
              <td>
                <span
                  className="color-dot"
                  style={{ backgroundColor: order.color.toLowerCase() }}
                />
                {order.color}
              </td>
              <td>{order.quantity}</td>
              <td>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </td>
              {showBLF && (
                <td>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getRiskClass(
                      order.riskPercentage
                    )}`}
                  >
                    {order.riskPercentage}%
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable; 