export function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let ema = data[0].close;
  return data.map((c, i) => {
    ema = i === 0 ? c.close : c.close * k + ema * (1 - k);
    return { time: c.time, value: ema };
  });
}

export function calculateRSI(data, period = 14) {
  let gains = 0, losses = 0;
  let rsi = [];

  for (let i = 1; i < data.length; i++) {
    const diff = data[i].close - data[i - 1].close;
    diff >= 0 ? gains += diff : losses -= diff;

    if (i >= period) {
      const rs = gains / (losses || 1);
      rsi.push({
        time: data[i].time,
        value: 100 - 100 / (1 + rs),
      });
      gains = losses = 0;
    }
  }
  return rsi;
}

export function calculateMACD(data) {
  const ema12 = calculateEMA(data, 12);
  const ema26 = calculateEMA(data, 26);

  let macd = ema12.map((e, i) => ({
    time: e.time,
    value: e.value - ema26[i].value,
  }));

  const signal = calculateEMA(macd.map(m => ({ close: m.value, time: m.time })), 9);

  const histogram = macd.map((m, i) => ({
    time: m.time,
    value: m.value - signal[i].value,
  }));

  return { macd, signal, histogram };
}
