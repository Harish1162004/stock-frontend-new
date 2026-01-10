

import "./dashboard.css";

function MarketCard({ name, price, prevPrice }) {
  const isUp = price > prevPrice;

  return (
    <div className="card">
      <h3>{name}</h3>

      <p>₹ {price?.toFixed(2)}</p>

      <span className={isUp ? "up" : "down"}>
        {isUp ? "▲ Up" : "▼ Down"}
      </span>
    </div>
  );
}

export default MarketCard;
