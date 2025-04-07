const API_KEY =
  "731d4cacf4190c9e96c213fda951d3f73e8292481b977ba0cfa69404fe2a06b6";

const tickers = new Map();

//TODO: refactor to use URLSearchParams
export const loadTicker = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
      ","
    )}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((resp) => resp.json())
    .then((rawData) =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      )
    )
    .catch((err) => console.log(err));

// получать стоимость криптовалютных пар с АПИшки? НЕТ
// получать ОБНОВЛЕНИЯ стоимости криптовалютных пар с АПИшки? ДА

export const subscribeToTicker = (ticker, cb) => {
  if (!tickers.has(ticker)) {
    ticker.set(ticker, []);
  }

  const existingSubscribers = tickers.get();
};
