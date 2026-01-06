import { useState } from "react";
import { useTrading } from "../context/TradingContext";
import "./ConfirmOrderModal.css";

function OrderPanel({ symbol, candles }) {
  const [qty, setQty] = useState(1);
  const [confirm, setConfirm] = useState(null); // { side }
  const { placeOrder, prices } = useTrading();

  const ltp = prices[symbol];

  const openConfirm = (side) => {
    if (!candles.length || !ltp) return;
    setConfirm({ side });
  };

  const executeOrder = () => {
    placeOrder({
      symbol,
      side: confirm.side,
      qty: Number(qty),
      price: ltp,
      time: candles[candles.length - 1].time,
    });
    setConfirm(null);
  };

  return (
    <>
      {/* ===== ORDER BAR ===== */}
      <div className="trade-panel">
        <div className="symbol-box">{symbol}</div>

        <div className="qty-box">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <button onClick={() => setQty(q => q + 1)}>+</button>
        </div>

        <button className="btn buy-btn" onClick={() => openConfirm("BUY")}>
          BUY
        </button>

        <button className="btn sell-btn" onClick={() => openConfirm("SELL")}>
          SELL
        </button>
      </div>

      {/* ===== CONFIRM MODAL ===== */}
      {confirm && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3 className={confirm.side === "BUY" ? "buy" : "sell"}>
              Confirm {confirm.side}
            </h3>

            <div className="confirm-details">
              <p><span>Stock</span> {symbol}</p>
              <p><span>Quantity</span> {qty}</p>
              <p><span>Price</span> ₹{ltp.toFixed(2)}</p>
              <p className="total">
                <span>Total</span> ₹{(qty * ltp).toFixed(2)}
              </p>
            </div>

            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setConfirm(null)}>
                Cancel
              </button>
              <button
                className={`confirm-btn ${confirm.side === "BUY" ? "buy" : "sell"}`}
                onClick={executeOrder}
              >
                Confirm {confirm.side}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderPanel;
