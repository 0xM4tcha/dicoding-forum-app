import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '@/components/Inputs/RegisterInput';
import { asyncRegisterUser } from '@/states/users/action';
import Container from '@/components/styled/Container';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    const error = await dispatch(asyncRegisterUser({ name, email, password }));

    if (error) {
      alert(error.message);
      return;
    }

    navigate('/');
  };

  return (
    <Container>
      <section className="register-page">
        <h2>Register Page</h2>
        <RegisterInput regist={onRegister} />
        <p className="register-info">
          Sudah punya akun? <Link to="/login">Login.</Link>
        </p>
      </section>
    </Container>
  );
}

export default RegisterPage;
