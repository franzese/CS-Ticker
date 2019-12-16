import * as React from 'react';
import { useEffect, useState } from 'react';
import TickerRow from 'src/components/TickerRow/TickerRow';
import getStockData, { getStock } from 'src/services/Services';

const styles = require('./TickerList.module.scss')['tickerList'];

interface Props {
  cusip?: string;
}

export const TickerList = ({ cusip }: Props) => {
  const limit = 20;
  const [count, setCount] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [sortType, setSortType] = useState('name');

  useEffect(() => {
    if (cusip) {
      getStock(cusip)
        .then(data => {
          setStocks([data]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      getStockData(limit, count, 'name')
        .then(data => {
          setStocks(data.stocks);
        })
        .catch(error => {
          console.log(error);
        });
    }
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
