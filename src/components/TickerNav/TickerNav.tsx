import * as React from 'react';
import TickerButton, { ButtonTypes } from 'src/components/TickerButton/TickerButton';

const styles = require('./TickerNav.module.scss');

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
    return (
        <header className={styles['tickerHeader']}>
            <div className={styles['inner']}>
                <TickerButton buttonType={ButtonTypes.link} link={'/'}>
                    Back
                </TickerButton>
            </div>
        </header>
    );
};

export default TickerNav;
