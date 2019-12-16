import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./TickerButton.module.scss');

export enum ButtonTypes {
  button = 'tickerButton',
  dropdown = 'tickerButtonDropdown',
  link = 'tickerButtonLink'
}

interface Props {
  /** Type of button to be styled on instantiation in case switch block */
  buttonType?: ButtonTypes;
  /** Children inside the button */
  children: React.ReactNode;
  /** Children inside the button */
  link?: string;
  /** Button disabled state */
  isDisabled?: boolean;
  /** onClick behavior from parent to be used in @method handleClick */
  onClick?: any;
  /** Aria label for the button */
  ariaLabel?: string;
  /** testId to be used when creating tests */
  testId?: string;
  /** Id to be used for testing and other various tasks */
  id?: string;
}

export const TickerButton = ({
  buttonType = ButtonTypes.button,
  children,
  link,
  isDisabled = false,
  onClick,
  ariaLabel,
  testId,
  id
}: Props) => {
  /**
   * @element A reference to the button DOM element, to be used to trigger blur and focus in @method handleClick.
   */
  const buttonRef: React.RefObject<any> = React.createRef();

  /**
   * @description Click handler that will wrap @prop {function} onClick and trigger animation for all browsers.
   */
  const handleClick = () => {
    if (onClick != null) {
      onClick();
    }
    /** In the case of repeated button clicks, blur buttonRef before triggering focus for animation */
    buttonRef.current.blur();
    buttonRef.current.focus();
  };

  let dropdown;
  if (buttonType == ButtonTypes.dropdown) {
    dropdown = (
      <select>
        <option>ONE</option>
        <option>TWO</option>
        <option>THREE</option>
        <option>FOUR</option>
        <option>FIVE</option>
      </select>
    );
  } else {
    dropdown = false;
  }

  const renderButton = () => {
    let b;
    switch (buttonType) {
      case ButtonTypes.button:
        b = (
          <button
            id={id}
            className={styles['tickerButton']}
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
              className={styles['tickerButtonDropdown']}
              data-testid={testId || 'TickerButton'}
              disabled={isDisabled}
              onClick={handleClick}
              aria-label={ariaLabel}
              type={'button'}
              ref={buttonRef}
            >
              {children}
            </button>
            {dropdown}
          </>
        );
        break;
      case ButtonTypes.link:
        b = (
          <Link
            id={id}
            to={link}
            className={styles['tickerButtonLink']}
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
    }
    return b;
  };

  return renderButton();
};

export default TickerButton;
