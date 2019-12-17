import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TickerButton, {
  ButtonTypes
} from 'src/components/TickerButton/TickerButton';
import TickerNav, { NavTypes } from 'src/components/TickerNav/TickerNav';
import TickerWrap from 'src/components/TickerWrap/TickerWrap';
import TickerList from 'src/components/TickerList/TickerList';

function Home() {
  const [sortType, setSortType] = useState('name');

  const sortChange = (event: any) => {
    setSortType(event.target.value);
  };

  return (
    <>
      <TickerNav navType={NavTypes.home} />
      <TickerWrap>
        <h1>Stocks</h1>
        <TickerButton
          buttonType={ButtonTypes.dropdown}
          onChange={sortChange}
          defaultSort={sortType}
          ariaLabel="Sort stocks by these options"
        >
          Sort
        </TickerButton>
        <TickerList sortBy={sortType} />
      </TickerWrap>
    </>
  );
}

function Details(props: any) {
  return (
    <>
      <TickerNav navType={NavTypes.details} />
      <TickerWrap>
        <TickerList cusip={props.match.params.cusip} />
      </TickerWrap>
    </>
  );
}

function FourOhFour() {
  return (
    <>
      <TickerNav navType={NavTypes.details} />
      <TickerWrap>
        <h1>Sorry, that stock was not found</h1>
        <TickerButton buttonType={ButtonTypes.link} aria-label="Return to Home">
          <Link to="/">Back</Link>
        </TickerButton>
      </TickerWrap>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/not-found" exact component={FourOhFour} />
        <Route path="/:cusip" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
