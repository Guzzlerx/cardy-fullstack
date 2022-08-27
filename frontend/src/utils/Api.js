class Api {
    constructor({ baseUrl, headers }) {
        this._profileUrl = baseUrl;
        this._headers = headers;
        this._cardsUrl = "https://api.guzzlerapp.nomoredomains.sbs/cards";
    }

    getUserInfo() {
        return fetch(this._profileUrl, this._headers)
			.then((res) => this._checkResponseStatus(res));
    }

    _checkResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch('https://asdasd', {
			headers: {
				credentials: "include",
        		"Content-Type": "application/json",
			},
			method: "GET"
		}).then((res) => this._checkResponseStatus(res));
    }

    setUserInfo(userInfoObj) {
        return fetch(this._profileUrl, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(userInfoObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    addNewCard(cardDataObj) {
        return fetch(this._cardsUrl, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(cardDataObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    deleteCard(id) {
        return fetch(`https://api.guzzlerapp.nomoredomains.sbs/cards/${id}`, {
            headers: this._headers,
            method: "DELETE",
        }).then((res) => this._checkResponseStatus(res));
    }

    likeCard(id, method) {
        return fetch(
            `https://api.guzzlerapp.nomoredomains.sbs/cards/${id}/likes`, {
                headers: this._headers,
                method: method,
            }
        ).then((res) => this._checkResponseStatus(res));
    }

    setUserAvatar(urlObj) {
        return fetch("https://api.guzzlerapp.nomoredomains.sbs/users/me/avatar", {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(urlObj),
        }).then((res) => this._checkResponseStatus(res));
    }
}

const api = new Api({
    baseUrl: "https://api.guzzlerapp.nomoredomains.sbs/users/me",
    headers: {
        // authorization: localStorage.getItem('jwt'),
		credentials: "include",
        "Content-Type": "application/json",
    },
});

export default api;
