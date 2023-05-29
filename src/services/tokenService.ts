export const TokenService = {
	getToken: function () {
		return localStorage.getItem('token');
	},
	getRefreshToken: function () {
		return localStorage.getItem('rtoken');
	},
	setToken: function (token: string) {
		return localStorage.setItem('token', token);
	},
	setRefreshToken: function (rtoken: string) {
		return localStorage.setItem('rtoken', rtoken);
	},
	clearTokens: function () {
		localStorage.removeItem('token');
		localStorage.removeItem('rtoken');
		return;
	}
};
