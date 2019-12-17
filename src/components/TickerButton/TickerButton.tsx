import React from 'react';
import { Link } from 'react-router-dom';

const styles = require('./TickerButton.module.scss');

export enum ButtonTypes {
  button = 'tickerButton',
  dropdown = 'tickerButtonDropdown',
  link = 'tickerButtonLink'
}

interface Props {
  buttonType?: ButtonTypes;
  children: React.ReactNode;
  link?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: any;
  onChange?: any;
  defaultSort?: string;
  ariaLabel?: string;
  testId?: string;
  id?: string;
}

export const TickerButton = ({
  buttonType = ButtonTypes.button,
  children,
  link,
  className = '',
  isDisabled = false,
  onClick,
  onChange,
  defaultSort,
  ariaLabel,
  testId,
  id
}: Props) => {
  /**
   * @element A reference to the button DOM element, to be used to trigger blur and focus in @method handleClick.
   */
  const buttonRef: React.RefObject<any> = React.createRef();

  const handleClick = event => {
    if (onClick != null) {
      onClick(event);
    }
  };

  const handleChange = event => {
    if (onChange != null) {
      onChange(event);
    }
  };

  const renderDropdown = () => {
    return (
      <select
        onChange={handleChange}
        aria-label={ariaLabel}
        className={styles['tickerDropDown']}
        defaultValue={defaultSort}
      >
        <option value="name">Name</option>
        <option value="symbol">Symbol</option>
        <option value="cusip">CUSIP</option>
        <option value="isin">ISIN</option>
        <option value="open">Opening Price</option>
        <option value="close">Closing Price</option>
        <option value="high">Highest Price</option>
        <option value="low">Lowest Price</option>
        <option value="change">Price Change</option>
      </select>
    );
  };

  const renderButton = () => {
    let b;
    switch (buttonType) {
      case ButtonTypes.button:
        b = (
          <button
            id={id}
            className={[styles['tickerButton'], className].join(' ')}
            data-testid={testId || 'TickerButton'}
            disabled={isDisabled}
            onClick={handleClick}
            aria-label={ariaLabel}
            type={'button'}
            ref={buttonRef}
          >
            {children}
          </button>
        );
        break;
      case ButtonTypes.dropdown:
        b = (
          <>
            <button
              id={id}
              className={[styles['tickerButtonDropdown'], className].join(' ')}
              data-testid={testId || 'TickerButton'}
              disabled={isDisabled}
              type={'button'}
              ref={buttonRef}
            >
              {children}
              {renderDropdown()}
            </button>
          </>
        );
        break;
      case ButtonTypes.link:
        b = (
          <Link
            id={id}
            to={link}
            className={[styles['tickerButtonLink'], className].join(' ')}
            data-testid={testId || 'TickerButton'}
            disabled={isDisabled}
            onClick={handleClick}
            aria-label={ariaLabel}
            type={'button'}
            ref={buttonRef}
          >
            {children}
          </Link>
        );
        break;
      default:
        break;
    }
    return b;
  };

  return renderButton();
};

export default TickerButton;
