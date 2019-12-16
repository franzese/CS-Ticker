import * as React from 'react';
import TickerButton, {
  ButtonTypes
} from 'src/components/TickerButton/TickerButton';
import TickerSearch from 'src/components/TickerSearch/TickerSearch';

const styles = require('./TickerNav.module.scss');

export enum NavTypes {
  home = 'home',
  details = 'details'
}

interface Props {
  /** Type of button to be styled on instantiation in case switch block */
  navType?: NavTypes;
  /** Children inside the button */
  children?: React.ReactNode;
}

export const TickerNav = ({ navType = NavTypes.home, children }: Props) => {
  let inner;
  if (navType == NavTypes.home) {
    inner = (
      <div className={styles['innerSearch']}>
        <TickerSearch />
      </div>
    );
  } else {
    inner = (
      <div className={styles['innerBack']}>
        <TickerButton buttonType={ButtonTypes.link} link={'/'}>
          Back
        </TickerButton>
      </div>
    );
  }

  return <header className={styles['tickerHeader']}>{inner}</header>;
};

export default TickerNav;
