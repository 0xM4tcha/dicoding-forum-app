import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '@/states/authUser/action';
import LoginInput from '@/components/Inputs/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));

    navigate('/');
  };

  return (
    <main>
      <section className="login-page">
        <h2>Login</h2>
        <LoginInput login={onLogin} />
        <p className="register-info">
          Belum punya akun? <Link to="/register">Daftar di sini.</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
