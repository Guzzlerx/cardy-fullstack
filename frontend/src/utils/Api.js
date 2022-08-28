class Api {
    constructor({ baseUrl, headers, credentials }) {
        this._profileUrl = baseUrl;
        this._headers = headers;
		this._credentials = credentials;
        this._cardsUrl = "https://api.guzzlerapp.nomoredomains.sbs/cards";
    }

    getUserInfo() {
        return fetch(this._profileUrl, {
			headers: this._headers,
			credentials: this._credentials,
		})
			.then((res) => this._checkResponseStatus(res));
    }

    _checkResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
			headers: {
        		"Content-Type": "application/json",
			},
			credentials: this._credentials,
			method: "GET"
		}).then((res) => this._checkResponseStatus(res));
    }

    setUserInfo(userInfoObj) {
        return fetch(this._profileUrl, {
            headers: this._headers,
            method: "PATCH",
			credentials: this._credentials,
            body: JSON.stringify(userInfoObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    addNewCard(cardDataObj) {
        return fetch(this._cardsUrl, {
            headers: this._headers,
            method: "POST",
			credentials: this._credentials,
            body: JSON.stringify(cardDataObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    deleteCard(id) {
        return fetch(`${this._cardsUrl}/${id}`, {
            headers: this._headers,
			credentials: this._credentials,
            method: "DELETE",
        }).then((res) => this._checkResponseStatus(res));
    }

    likeCard(id, method) {
        return fetch(
            `${this._cardsUrl}/${id}/likes`, {
                headers: this._headers,
				credentials: this._credentials,
                method: method,
            }
        ).then((res) => this._checkResponseStatus(res));
    }

    setUserAvatar(urlObj) {
        return fetch(`${this._profileUrl}/avatar`, {
            headers: this._headers,
			credentials: this._credentials,
            method: "PATCH",
            body: JSON.stringify(urlObj),
        }).then((res) => this._checkResponseStatus(res));
    }
}

const api = new Api({
    baseUrl: "https://api.guzzlerapp.nomoredomains.sbs/users/me",
    headers: {
        // authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
    },
	credentials: "include",
});

export default api;
