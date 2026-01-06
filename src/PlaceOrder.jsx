import { useState } from "react";
import { useTrading } from "./context/TradingContext";
import "./placeOrder.css";

function PlaceOrder() {
  const { prices, placeOrder } = useTrading();

  const [symbol, setSymbol] = useState("TCS");
  const [qty, setQty] = useState("");

  // 🔥 AUTO MARKET PRICE
  const marketPrice = prices[symbol];

  const handleBuy = () => {
    if (!marketPrice) {
      alert("Market price not available");
      return;
    }

    placeOrder({
      symbol,
      side: "BUY",
      qty,
      price: marketPrice, // ✅ AUTO PRICE
    });

    setQty("");
  };

  const handleSell = () => {
    if (!marketPrice) {
      alert("Market price not available");
      return;
    }

    placeOrder({
      symbol,
      side: "SELL",
      qty,
      price: marketPrice, // ✅ AUTO PRICE
    });

    setQty("");
  };

  return (
    <div className="trade-page">
      <div className="trade-card">
        <h2>📊 Place Trade</h2>

        {/* STOCK */}
        <label>Stock</label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="TCS">TCS</option>
          <option value="INFY">INFY</option>
          <option value="RELIANCE">RELIANCE</option>
        </select>

        {/* LIVE PRICE */}
        <div className="ltp">
          Live Price:
          <span>
            {marketPrice ? `₹${marketPrice}` : "Fetching..."}
          </span>
        </div>

        {/* QTY */}
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        {/* ACTIONS */}
        <div className="actions">
          <button className="buy" onClick={handleBuy}>
            BUY
          </button>
          <button className="sell" onClick={handleSell}>
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
