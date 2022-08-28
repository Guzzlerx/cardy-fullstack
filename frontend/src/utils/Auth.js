class Auth {
    BASE_URL = "https://api.guzzlerapp.nomoredomains.sbs";

	constructor({ headers, credentials }) {
		this._headers = headers;
		this._credentials = credentials;
	}

    register = ({ email, password }) => {
        return fetch(`${this.BASE_URL}/signup`, {
            method: "POST",
			credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

    authorize = ({ email, password }) => {
        return fetch(`${this.BASE_URL}/signin`, {
            method: "POST",
			credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

	logout = () => {
		return fetch(`${this.BASE_URL}/logout`, {
			method: "GET",
			credentials: this._credentials,
			headers: this._headers,
		})
	}

    getContent = () => {
        return fetch(`${this.BASE_URL}/users/me`, {
			method: "GET",
			credentials: this._credentials,
            headers: this._headers,
        }).then(this._checkResponse);
    };

    _checkResponse = async (response) => {
        if (response.ok) {
            return response.json();
        }

        const answer = await response.json();

        return Promise.reject(
            answer.message || answer.error || "Что-то пошло не так :("
        );
    };
}

const auth = new Auth({
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
});

export default auth;
