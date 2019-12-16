const BASE_URL = 'http://localhost:4000/';

interface Stocks {
  limit?: number;
  skip?: number;
  sort?: string;
}

export default async function getStockData({
  limit = 20,
  skip = 0,
  sort = 'name'
}: Stocks) {
  const url = BASE_URL.concat(
    `stocks?limit=${limit}&skip=${skip}&sort=${sort.trim()}&increasing=false`
  );
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
