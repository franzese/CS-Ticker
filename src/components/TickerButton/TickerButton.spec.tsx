import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { TickerButton, ButtonTypes } from './TickerButton';

const styles = require('./TickerButton.module.scss');

afterEach(cleanup);

describe('The TickerButton component', () => {
  it('uses a native <button/> with nested text to render', () => {
    const { container } = render(
      <TickerButton buttonType={ButtonTypes.button}>test</TickerButton>
    );
    expect(container.querySelector('button')).toHaveTextContent('test');
  });

  it('should trigger onClick method passed as prop and trigger button focus onClick', () => {
    const onClickMock = jest.fn().mockImplementation(() => {});
    const { getByTestId } = render(
      <TickerButton buttonType={ButtonTypes.button} onClick={onClickMock}>
        test
      </TickerButton>
    );
    const testTickerButton = getByTestId('TickerButton');

    fireEvent.click(testTickerButton);
    expect(onClickMock).toBeCalled();
    expect(testTickerButton.focus).toBeTruthy;
  });

  it('should not trigger handleClick but not onClick prop if no onClick method is passed', () => {
    const onClickMock = jest.fn().mockImplementation(() => {});
    const { getByTestId } = render(
      <TickerButton buttonType={ButtonTypes.button}>test</TickerButton>
    );
    const testTickerButton = getByTestId('TickerButton');

    fireEvent.click(testTickerButton);
    expect(onClickMock).toHaveBeenCalledTimes(0);
    expect(testTickerButton.focus).toBeTruthy;
  });

  it('should apply the dropdown button styles based on ButtonTypes.dropdown prop', () => {
    const { getByTestId } = render(
      <TickerButton buttonType={ButtonTypes.dropdown}>testPrimary</TickerButton>
    );
    const testTickerButton = getByTestId('TickerButton');

    expect(testTickerButton.className.trim()).toBe('tickerButtonDropdown');
  });

  it('should apply the default buttonType when no buttonType is passed', () => {
    const { getByTestId } = render(<TickerButton>testPrimary</TickerButton>);
    const testTickerButton = getByTestId('TickerButton');

    expect(testTickerButton.className.trim()).toBe('tickerButton');
  });

  it('should apply the appropriate button styles as well as className and buttonType prop', () => {
    const className = 'testClass';
    const { getByTestId } = render(
      <TickerButton className={`${className}`} buttonType={ButtonTypes.button}>
        testClassName
      </TickerButton>
    );
    const testTickerButton = getByTestId('TickerButton');

    expect(testTickerButton.className).toContain(`${className}`);
    expect(testTickerButton.className).toContain('tickerButton');
  });

  it('should apply ariaLabel prop', () => {
    const testLabel = 'test button';
    const { getByTestId } = render(
      <TickerButton buttonType={ButtonTypes.button} ariaLabel={`${testLabel}`}>
        testButton
      </TickerButton>
    );

    const testTickerButton = getByTestId('TickerButton');

    expect(testTickerButton.hasAttribute('aria-label')).toBeTruthy();
    expect(testTickerButton.getAttribute('aria-label')).toBe(`${testLabel}`);
  });
});
