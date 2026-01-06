export function calculatePnL(orders, ltp) {
  if (!orders.length || !ltp) return 0;

  let netQty = 0;
  let totalCost = 0;

  orders.forEach(o => {
    if (o.side === "BUY") {
      netQty += o.qty;
      totalCost += o.qty * o.price;
    } else {
      netQty -= o.qty;
      totalCost -= o.qty * o.price;
    }
  });

  if (netQty === 0) return 0;

  const avg = totalCost / netQty;
  return (ltp - avg) * netQty;
}
