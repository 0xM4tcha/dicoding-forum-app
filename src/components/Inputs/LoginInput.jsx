import React from 'react';
import PropTypes from 'prop-types';
import useInput from '@/hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    login(Object.fromEntries(formData.entries()));
  }

  return (
    <form className="login-input" onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        data-testid="email"
        required
        value={email}
        onChange={onEmailChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        data-testid="password"
        required
        value={password}
        onChange={onPasswordChange}
      />
      <button type="submit" data-testid="login-button">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
