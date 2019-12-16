import * as React from 'react';

const styles = require('./TickerSearch.module.scss')['tickerSearch'];

interface Props {
    children?: React.ReactNode;
}

export const TickerSearch = ({ children }: Props) => {
    return (
        <form className={styles}>
            <input type={'text'} placeholder={'Search'} />
        </form>
    );
};

export default TickerSearch;
