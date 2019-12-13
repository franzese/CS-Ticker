import React from 'react';
import TickerButton, { ButtonTypes } from './components/TickerButton/TickerButton';
import TickerNav, { NavTypes } from './components/TickerNav/TickerNav';
import logo from 'src/assets/logo.svg';

function App() {
    return (
        <div className="App">
            <TickerNav navType={NavTypes.home}></TickerNav>
            <h1>Stocks</h1>
            <TickerButton buttonType={ButtonTypes.button}>Sort</TickerButton>
            {/* <img className="mb-4" src={logo} alt="logo" /> */}
        </div>
    );
}

export default App;
