import * as React from 'react';

const styles = require('./TickerNav.module.scss')['tickerHeader'];

export enum NavTypes {
    home = 'home',
    details = 'details',
}

interface Props {
    /** Type of button to be styled on instantiation in case switch block */
    navType?: NavTypes;
    /** Children inside the button */
    children?: React.ReactNode;
}

export const TickerNav = ({ navType = NavTypes.home, children }: Props) => {
    return <header className={styles}>{children}</header>;
};

export default TickerNav;
