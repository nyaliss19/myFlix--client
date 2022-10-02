import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './logout-button.scss';

export function LogoutButton(props) {
  const handleLogout = (e) => {
    e.preventDefault();
    props.logoutUser('useless param');
  };

  return (
    <Button
      className='btn btn-link float-sm-right'
      id='logout-button'
      type='button'
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

//prop-types
// give informational warnings in browser if data does not match required shape
LogoutButton.proptypes = {
  logoutUser: PropTypes.func.isRequired,
};
