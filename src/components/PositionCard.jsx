import React from "react";
import "./PositionCard.jsx";

function PositionCard({ symbol, position, ltp }) {
  if (!position || !ltp) {
    return null; // ⛔ prevent crash until data is ready
  }

  const {
    netQty = 0,
    avgPrice = 0,
    invested = 0,
    currentValue = 0,
    pnl = 0,
    pnlPercent = 0,
  } = position;

  return (
    <div className="position-card">
      <h4>{symbol}</h4>

      <div className="row">
        <span>Qty</span>
        <span>{netQty}</span>
      </div>

      <div className="row">
        <span>Avg Price</span>
        <span>₹{avgPrice.toFixed(2)}</span>
      </div>

      <div className="row">
        <span>LTP</span>
        <span>₹{ltp.toFixed(2)}</span>
      </div>

      <div className="row">
        <span>Invested</span>
        <span>₹{invested.toFixed(2)}</span>
      </div>

      <div className={`row ${pnl >= 0 ? "profit" : "loss"}`}>
        <span>P&L</span>
        <span>
          ₹{pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}

export default PositionCard;
