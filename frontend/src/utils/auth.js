export const BASE_URL = 'https://auth.nomoreparties.co';

const parseResponse = res => {
  return res.ok ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`);
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(res => parseResponse(res));
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(res => parseResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => parseResponse(res));
};