import * as React from 'react';
import { useEffect, useState } from 'react';
import TickerRow from 'src/components/TickerRow/TickerRow';
import TickerButton from 'src/components/TickerButton/TickerButton';
import getStockData, { getStock } from 'src/services/Services';

const styles = require('./TickerList.module.scss')['tickerList'];

interface Props {
  cusip?: string;
}

export const TickerList = ({ cusip }: Props) => {
  const limit = 50;
  const [count, setCount] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState('name');

  const getStocks = () => {
    getStockData(limit, count, 'name')
      .then(data => {
        setLoaded(true);
        setCount(count + data.stocks.length);
        // alert(`Count: ${count + data.stocks.length}`);
        setStocks(stocks.concat(data.stocks));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const mapStockToRow = (s, i) => {
    return (
      <TickerRow
        key={i}
        name={s.name}
        symbol={s.symbol}
        cusip={s.cusip}
        open={s.open}
        close={s.close}
        high={s.high}
        low={s.low}
      />
    );
  };

  const loadMore = () => {
    getStocks();
  };

  useEffect(() => {
    if (cusip) {
      getStock(cusip)
        .then(data => {
          setLoaded(true);
          setStocks([data]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      window.addEventListener('scroll', loadMore);
      getStocks();
    }
  }, []);

  const getList = () => {
    let list;
    if (loaded) {
      if (cusip) {
        list = (
          <>
            <div className={styles}>{stocks.map(mapStockToRow)}</div>
          </>
        );
      } else {
        list = (
          <>
            <div className={styles}>{stocks.map(mapStockToRow)}</div>
            <TickerButton onClick={loadMore}>Load More</TickerButton>
          </>
        );
      }
    } else {
      list = <h4 className={'m-4'}>Loading...</h4>;
    }
    return list;
  };

  return getList();
};

export default TickerList;
