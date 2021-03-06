import React, { useEffect, useState, useContext } from 'react';
import TickerRow, { Stock } from 'src/components/TickerRow/TickerRow';
import TickerButton from 'src/components/TickerButton/TickerButton';
import TickerContext from 'src/contexts/Contexts';
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
  const context = useContext(TickerContext);

  const getStocks = () => {
    getStockData(limit, count, sortType)
      .then(data => {
        setLoaded(true);
        setCount(count + data.stocks.length);
        setStocks(stocks.concat(data.stocks));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const searchSuccess = (stock: Stock) => {
    const symbolMatch =
      stock.symbol.toUpperCase().search(context.searchString) >= 0;
    const nameMatch =
      stock.name.toUpperCase().search(context.searchString) >= 0;
    return symbolMatch || nameMatch;
  };

  const mapStockToRow = (stock: Stock, i) => {
    if (!context.searchString || searchSuccess(stock)) {
      return (
        <TickerRow
          isDetailView={isDetailView}
          key={i}
          name={stock.name}
          symbol={stock.symbol}
          cusip={stock.cusip}
          open={stock.open}
          close={stock.close}
          high={stock.high}
          low={stock.low}
        />
      );
    }
    return;
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

  const renderList = context => {
    let list;
    if (loaded && isDetailView) {
      list = (
        <>
          <div className={stylesList}>{stocks.map(mapStockToRow)}</div>
        </>
      );
    } else if (loaded && !isDetailView) {
      {
        list = (
          <>
            <div className={stylesList}>{stocks.map(mapStockToRow)}</div>
            <TickerButton onClick={getStocks}>Load More</TickerButton>
            <TickerButton onClick={scrollToTop} className={stylesScroll}>
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

  return (
    <TickerContext.Consumer>
      {context => renderList(context)}
    </TickerContext.Consumer>
  );
};

export default TickerList;
