class Auth {
    BASE_URL = "https://api.guzzlerapp.nomoredomains.sbs";

    register = ({ email, password }) => {
        return fetch(`${this.BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

    authorize = ({ email, password }) => {
        return fetch(`${this.BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

    getContent = (token) => {
        return fetch(`${this.BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
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

const auth = new Auth();

export default auth;
