import "./OrderHistory.css";

function OrderHistory({ orders }) {
  const downloadCSV = () => {
    if (!orders.length) return;

    const headers = ["Time", "Symbol", "Side", "Qty", "Price"];

    const rows = orders.map(o => [
      new Date(o.time * 1000).toLocaleString(),
      o.symbol,
      o.side,
      o.qty,
      o.price.toFixed(2),
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${orders[0].symbol}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="order-history">
      <div className="history-header">
        <h3>📜 Order History</h3>

        <button
          className="download-btn"
          onClick={downloadCSV}
          disabled={!orders.length}
        >
          ⬇ Download CSV
        </button>
      </div>

      {!orders.length ? (
        <p className="muted">No orders yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Symbol</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td className="muted">
                  {new Date(o.time * 1000).toLocaleTimeString()}
                </td>
                <td>{o.symbol}</td>
                <td>
                  <span className={`side-badge ${o.side.toLowerCase()}`}>
                    {o.side}
                  </span>
                </td>
                <td>{o.qty}</td>
                <td className={o.side === "BUY" ? "price-buy" : "price-sell"}>
                  ₹{o.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
