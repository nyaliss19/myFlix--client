import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    props.toRegistrationView('');
  };

  return (
    <div className='login-view'>
      <h2>Login to myFlix</h2>

      <form className='login-form'>
        <div className='login-form__line'>
          <label className='login-form__line__label'>Username:</label>
          <input
            className='login-form__line__input-field'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='login-form__line'>
          <label className='login-form__line__label'>Password:</label>
          <input
            className='login-form__line__input-field'
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className='login-form__login-button'
          type='submit'
          onClick={handleSubmit}
        >
          Log In
        </button>
      </form>

      <div>
        <span>Don't have an account? </span>
        <button type='submit' onClick={handleClickRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired,
};
