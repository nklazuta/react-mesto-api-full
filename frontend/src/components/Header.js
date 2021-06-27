import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import logo from "../images/header-logo.svg";

export default function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
      <div className="header__nav">
        <Switch>
          <Route exact path="/">
            <div className="header__user-email">{email}</div>
            <Link to="/signin" className="header__button header__button_type_logged-in" onClick={onLogout}>
              Выйти
            </Link>
          </Route>
          <Route path="/signup">
            <Link to="/signin" className="header__button">
              Войти
            </Link>
          </Route>
          <Route path="/signin">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
