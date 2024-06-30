import React from 'react';
import PropTypes from 'prop-types';
import useInput from '@/hooks/useInput';

function RegisterInput({ regist }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    regist(Object.fromEntries(formData.entries()));
  }

  return (
    <form className="register-input" onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        data-testid="name"
        placeholder="Name"
        required
        value={name}
        onChange={onNameChange}
      />
      <input
        name="email"
        type="email"
        data-testid="email"
        placeholder="Email"
        required
        value={email}
        onChange={onEmailChange}
      />
      <input
        name="password"
        type="password"
        data-testid="password"
        placeholder="Password"
        required
        value={password}
        onChange={onPasswordChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  regist: PropTypes.func.isRequired,
};

export default RegisterInput;
