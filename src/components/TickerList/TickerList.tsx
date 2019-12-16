import * as React from 'react';
import { useEffect, useState } from 'react';
import TickerRow from 'src/components/TickerRow/TickerRow';
import getStockData from 'src/services/Services';

const styles = require('./TickerList.module.scss')['tickerList'];

export const TickerList = () => {
  const [stocks, setStocks] = useState([]);
  const [count, setCount] = useState(0);
  const [sortType, setSortType] = useState('name');

  useEffect(() => {
    let params = { limit: 10, skip: 0, sort: sortType };
    getStockData(params)
      .then(data => {
        setStocks(data.stocks);
      })
      .catch(error => {
        debugger;
      });
  }, [count]);

  const getStockList = () => {
    const stockList = [];
    for (let i = 0; i < stocks.length; i++) {
      stockList.push(
        <TickerRow
          key={i}
          name={stocks[i].name}
          symbol={stocks[i].symbol}
          cusip={stocks[i].cusip}
          open={stocks[i].open}
          close={stocks[i].close}
          high={stocks[i].high}
          low={stocks[i].low}
        />
      );
    }
    return stockList;
  };

  return <div className={styles}>{getStockList()}</div>;
};

export default TickerList;
