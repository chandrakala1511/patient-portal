import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <img src={Banner} className="banner" alt="Patient Portal" />
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/appointments">
          <FormattedMessage {...messages.appointments} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;