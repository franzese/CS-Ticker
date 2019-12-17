import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { TickerNav, NavTypes } from './TickerNav';

const styles = require('./TickerNav.module.scss');

afterEach(cleanup);

describe('The TickerNav component', () => {
  it('uses a native <header/> to render', () => {
    const { container } = render(<TickerNav navType={NavTypes.home} />);
    expect(container).toContainHTML('header');
  });
});
