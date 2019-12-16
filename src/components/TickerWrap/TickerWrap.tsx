import * as React from 'react';

const styles = {
    margin: '2rem',
};

interface Props {
    children?: React.ReactNode;
}

export const TickerWrap = ({ children }: Props) => {
    return <div style={styles}>{children}</div>;
};

export default TickerWrap;
