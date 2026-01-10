
import "./OrderSuccessToast.css";

function OrderSuccessToast({ side, symbol }) {
  return (
    <div className={`order-toast ${side === "BUY" ? "buy" : "sell"}`}>
      <div className="checkmark">✓</div>
      <div>
        <strong>{side} Order Placed</strong>
        <p>{symbol} successfully executed</p>
      </div>
    </div>
  );
}

export default OrderSuccessToast;
