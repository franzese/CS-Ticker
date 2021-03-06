import * as React from 'react';

const styles = require('./TickerRow.module.scss');

export interface Stock {
  isDetailView?: boolean;
  name: string;
  symbol: string;
  cusip: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export const TickerRow = ({
  isDetailView = false,
  name = '',
  symbol = '',
  cusip = '',
  open,
  close,
  high,
  low
}: Stock) => {
  const fixedSize = 2;

  const getChangePercent = () => {
    const change = ((open - close) / open) * 100;
    return <code>{change.toFixed(fixedSize) + '%'}</code>;
  };

  const getClassNames = () => {
    if (isDetailView) {
      return styles.tickerRowNoHover;
    } else {
      return styles.tickerRow;
    }
  };

  return (
    <a href={'/' + cusip} className={getClassNames()}>
      <div className={styles.tickerRowMain}>
        <div className={styles.name}>
          <h2>
            <code>{name}</code>
          </h2>
          <label>Name</label>
        </div>
        <div className={styles.symbol}>
          <h2>
            <code>{symbol}</code>
          </h2>
          <label>Symbol</label>
        </div>
        <div className={styles.change}>
          <h2>{getChangePercent()}</h2>
          <label>Change</label>
        </div>
      </div>
      <div className={styles.tickerRowStats}>
        <div className={styles.open}>
          <code>{open.toFixed(fixedSize)}</code>
          <label>Open</label>
        </div>
        <div className={styles.close}>
          <code>{close.toFixed(fixedSize)}</code>
          <label>Close</label>
        </div>
        <div className={styles.high}>
          <code>{high.toFixed(fixedSize)}</code>
          <label>High</label>
        </div>
        <div className={styles.low}>
          <code>{low.toFixed(fixedSize)}</code>
          <label>Low</label>
        </div>
      </div>
    </a>
  );
};

export default TickerRow;
