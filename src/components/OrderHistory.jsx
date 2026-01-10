

import "./OrderHistory.css";

import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/user/${username}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [username]);

  return (
    <div className="order-history">
      <h3>Order History</h3>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Side</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.symbol}</td>
              <td>{o.side}</td>
              <td>{o.qty}</td>
              <td>₹{o.price}</td>
              <td>{new Date(o.time * 1000).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
