import React, { useState, createContext } from 'react';

const TickerContext = createContext(null);
export default TickerContext;

interface ContextProviderProps {
  children?: any;
}

export const TickerContextProvider = (props: ContextProviderProps) => {
  const [searchString, setSearchString] = useState('Yoo');

  return (
    <TickerContext.Provider
      value={{
        searchString: searchString,
        setSearchString: setSearchString
      }}
    >
      {props.children}
    </TickerContext.Provider>
  );
};
