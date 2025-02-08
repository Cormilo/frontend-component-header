import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';

import messages from './messages';

const AuthenticatedUserDropdown = ({ intl, username }) => {
  const dropdownItems = [
    {
      message: intl.formatMessage(messages.mycourses),
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
    },
    {
      message: intl.formatMessage(messages.discover),
      href: `${getConfig().LMS_BASE_URL}/courses`,
    },
    ...(getConfig().ORDER_HISTORY_URL ? [{
      message: intl.formatMessage(messages.orderHistory),
      href: getConfig().ORDER_HISTORY_URL,
    }] : []),
    {
      message: intl.formatMessage(messages.signOut),
      href: getConfig().LOGOUT_URL,
    },
  ];

  return (
    <Dropdown className="user-dropdown ml-3">
      <Dropdown.Toggle variant="outline-primary">
        <div className="hamburger-menu">
          <span className="line" />
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
        <span data-hj-suppress className="d-none d-md-inline">
          {username}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        <LearningUserMenuSlot items={dropdownItems} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
