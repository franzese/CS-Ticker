import React, { useContext } from 'react';
import TickerContext from 'src/contexts/Contexts';

const styles = require('./TickerSearch.module.scss').tickerSearch;

export const TickerSearch = () => {
  const context = useContext(TickerContext);
  const handleChange = event => {
    let searchString = (event.target.value as string).toUpperCase();
    context.setSearchString(searchString);
  };

  return (
    <>
      <TickerContext.Consumer>
        {context => (
          <form className={styles}>
            <input
              type={'search'}
              pattern={'[A-Za-z]'}
              placeholder={'Symbol Search'}
              onChange={handleChange}
              value={context.searchString}
            />
          </form>
        )}
      </TickerContext.Consumer>
    </>
  );
};

export default TickerSearch;
