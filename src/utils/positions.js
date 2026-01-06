export function calculatePosition(orders, ltp) {
  let buyQty = 0;
  let buyValue = 0;
  let sellQty = 0;

  orders.forEach((o) => {
    if (o.side === "BUY") {
      buyQty += o.qty;
      buyValue += o.qty * o.price;
    } else {
      sellQty += o.qty;
    }
  });

  const netQty = buyQty - sellQty;
  const avgPrice = buyQty ? buyValue / buyQty : 0;

  const invested = netQty * avgPrice;
  const currentValue = netQty * (ltp || 0);
  const pnl = currentValue - invested;
  const pnlPercent = invested ? (pnl / invested) * 100 : 0;

  return {
    netQty,
    avgPrice,
    invested,
    currentValue,
    pnl,
    pnlPercent,
  };
}
