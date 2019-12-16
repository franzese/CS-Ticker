const BASE_URL = 'http://localhost:4000/stocks';

export default async function getStockList(
  limit: number,
  skip: number = 0,
  sort: string = 'name'
) {
  const url = BASE_URL.concat(
    `?limit=${limit}&skip=${skip}&sort=${sort.trim()}&increasing=true`
  );
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getStock(cusip: string) {
  const url = BASE_URL.concat(`/${cusip}`);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
