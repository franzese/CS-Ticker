const BASE_URL = 'http://localhost:4000/stocks';

export const SortTypes = {
  name: { name: 'Name', isIncreasing: true },
  symbol: { name: 'Symbol', isIncreasing: true },
  cusip: { name: 'CUSIP', isIncreasing: true },
  isin: { name: 'ISIN', isIncreasing: true },
  open: { name: 'Opening Price', isIncreasing: false },
  close: { name: 'Closing Price', isIncreasing: false },
  high: { name: 'Highest Price', isIncreasing: false },
  low: { name: 'Lowest Price', isIncreasing: true },
  change: { name: 'Price Change', isIncreasing: true }
};

export default async function getStockList(
  limit: number,
  skip: number = 0,
  sort: string = 'name'
) {
  const url = BASE_URL.concat(
    '?limit=' +
      limit +
      '&skip=' +
      skip +
      '&sort=' +
      sort.trim() +
      '&increasing=' +
      SortTypes[sort].isIncreasing
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
