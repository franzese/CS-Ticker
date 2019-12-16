import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from 'src/assets/logo.svg';
import TickerButton, { ButtonTypes } from 'src/components/TickerButton/TickerButton';
import TickerNav, { NavTypes } from 'src/components/TickerNav/TickerNav';
import TickerWrap from 'src/components/TickerWrap/TickerWrap';

const Home = () => (
    <>
        <TickerNav navType={NavTypes.home}></TickerNav>
        <TickerWrap>
            <h1>Stocks</h1>
            <TickerButton buttonType={ButtonTypes.button}>Sort</TickerButton>
        </TickerWrap>
    </>
);

const Details = () => (
    <>
        <TickerNav navType={NavTypes.details}></TickerNav>
        <TickerWrap>
            <h1>AAPL</h1>
        </TickerWrap>
    </>
);

const FourOhFour = () => (
    <>
        <TickerNav navType={NavTypes.details}></TickerNav>
        <TickerWrap>
            <h1>Sorry, that stock was not found</h1>
            <TickerButton buttonType={ButtonTypes.link}>
                <Link to="/">Back</Link>
            </TickerButton>
        </TickerWrap>
    </>
);

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
