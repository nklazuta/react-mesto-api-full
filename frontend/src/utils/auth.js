import { BASE_URL } from './utils';

const parseResponse = res => {
  return res.ok ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`);
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    })
  })
    .then(res => parseResponse(res))
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    })
  })
    .then(res => parseResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => parseResponse(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => parseResponse(res));
}