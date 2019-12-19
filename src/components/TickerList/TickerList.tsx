import React, { useEffect, useState } from 'react';
import TickerRow from 'src/components/TickerRow/TickerRow';
import TickerButton from 'src/components/TickerButton/TickerButton';
import getStockData, { getStock } from 'src/services/Services';

const styles = require('./TickerList.module.scss');
const stylesList = styles['tickerList'];
const stylesScroll = styles['scrollToTop'];

interface Props {
  cusip?: string;
  sortBy?: string;
}

export const TickerList = ({ cusip, sortBy }: Props) => {
  const limit = 50;
  const isDetailView = !!cusip;
  const [count, setCount] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(sortBy);

  const getStocks = (currentCount = count, currentSortType = sortType) => {
    getStockData(limit, currentCount, currentSortType)
      .then(data => {
        setLoaded(true);
        setCount(count + data.stocks.length);
        setStocks(stocks.concat(data.stocks));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const mapStockToRow = (s, i) => {
    return (
      <TickerRow
        isDetailView={isDetailView}
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

  const scrollToTop = () => {
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const clearStocks = () => {
    setStocks([]);
    setCount(0);
  };

  useEffect(() => {
    if (sortType != sortBy) {
      setSortType(sortBy);
      setCount(0);
      setLoaded(false);
      setStocks([]);
    } else if (isDetailView) {
      getStock(cusip)
        .then(data => {
          setLoaded(true);
          setStocks([data]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      getStocks();
    }
  }, [cusip, sortBy, sortType]);

  const renderList = () => {
    let list;
    if (loaded) {
      if (cusip) {
        list = (
          <>
            <div className={stylesList}>{stocks.map(mapStockToRow)}</div>
          </>
        );
      } else {
        list = (
          <>
            <div className={stylesList}>{stocks.map(mapStockToRow)}</div>
            <TickerButton onClick={getStocks}>Load More</TickerButton>
            <TickerButton className={stylesScroll} onClick={scrollToTop}>
              Back to Top
            </TickerButton>
          </>
        );
      }
    } else {
      list = <h4 className={'m-4'}>Loading...</h4>;
    }
    return list;
  };

  return renderList();
};

export default TickerList;
