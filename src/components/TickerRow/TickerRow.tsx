import * as React from 'react';

const styles = require('./TickerRow.module.scss');

interface Props {
  name: string;
  symbol: string;
  cusip: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export const TickerRow = ({
  name = '',
  symbol = '',
  cusip = '',
  open,
  close,
  high,
  low
}: Props) => {
  const fixedSize = 2;
  const getChangePercent = () => {
    const change = ((open - close) / open) * 100;
    return <code>{change.toFixed(fixedSize) + '%'}</code>;
  };

  return (
    <a href={'/' + cusip} className={styles['tickerRow']}>
      <div className={styles['tickerRowMain']}>
        <div>
          <h2>
            <code>{symbol}</code>
          </h2>
          <label>Symbol</label>
        </div>
        <div>
          <h2>{getChangePercent()}</h2>
          <label>Change</label>
        </div>
        <div>
          <h2>
            <code>{name}</code>
          </h2>
          <label>Name</label>
        </div>
      </div>
      <div className={styles['tickerRowStats']}>
        <div>
          <code>{open.toFixed(fixedSize)}</code>
          <label>Open</label>
        </div>
        <div>
          <code>{close.toFixed(fixedSize)}</code>
          <label>Close</label>
        </div>
        <div>
          <code>{high.toFixed(fixedSize)}</code>
          <label>High</label>
        </div>
        <div>
          <code>{low.toFixed(fixedSize)}</code>
          <label>Low</label>
        </div>
      </div>
    </a>
  );
};

export default TickerRow;
