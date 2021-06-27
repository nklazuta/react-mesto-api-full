import { BASE_URL } from './utils';

class Api {
    constructor(BASE_URL) {
      this._baseUrl = BASE_URL;
    }

    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => this._parseResponse(res))
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => this._parseResponse(res))
    }

    setUserAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar
        })
      })
        .then(res => this._parseResponse(res))
    }

    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            about
        })
      })
        .then(res => this._parseResponse(res))
    }

    handleAddCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            link
        })
      })
        .then(res => this._parseResponse(res))
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => this._parseResponse(res))
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => this._parseResponse(res))
  }
}

export const api = new Api(BASE_URL);