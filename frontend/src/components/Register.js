import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = evt => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = evt => {
    setPassword(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onRegister({
      password,
      email
    });
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input
          className="auth__input auth__input_type_email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          className="auth__input auth__input_type_password"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__login-redirect">
        Уже зарегистрированы? <Link to="/sign-in" className="auth__login-link">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
