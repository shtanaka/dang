angular
	.module('dang.authentication.services', ['ngCookies'])	
	.factory('Authentication', Authentication);

Authentication.$inject = ['$http', '$cookies'];
function Authentication($http, $cookies) {
	
	var authentication = {
		login: login,
		register: register,
		setAuthenticatedAccount: setAuthenticatedAccount,
		getAuthenticatedAccount: getAuthenticatedAccount,
		isAuthenticated: isAuthenticated,
		unauthenticate: unauthenticate,
		logout: logout,
		activate: activate,
		deactivate: deactivate
	};
	return authentication;

	function register(email, password, username) {
		return $http.post('/api-auth/v1/accounts/', {
			username: username,
			password: password,
			email: email
		}).then(handler, handler);
	}

	function login(email, password) {
		return $http.post('/api-auth/v1/login/', {
			email: email,
			password: password
		}).then(handlerLogin, handler);
	}

	function logout() {
		return $http.post('/api-auth/v1/logout/', {})
			.then(handlerLogout, handler);
	}


	function handlerLogin(response) {
		authentication.setAuthenticatedAccount(response.data);
		return response;
	}

	function handlerLogout(response) {
		authentication.unauthenticate();
		return response;
	}
	
	function handler(response) {
		alert("SOME ERROR HAPPENED: " + response.data.message);
		return response;
	}

	function setAuthenticatedAccount(account) {
  		$cookies.put('authenticatedAccount', JSON.stringify(account), { path: '/'});
	}

	function unauthenticate() {
		$cookies.remove('authenticatedAccount', { path: '/'});
	}
	
	function getAuthenticatedAccount() {
		if (!$cookies.get('authenticatedAccount')) {
			return;
		}
		return JSON.parse($cookies.get('authenticatedAccount'));
	}

	function isAuthenticated() {
		return !!$cookies.get('authenticatedAccount') && !!$cookies.get('sessionid');
	}

	function activate() {
		if (authentication.isAuthenticated()) {
			window.location = '/#/';
		}
	}

	function deactivate() {
		if (!authentication.isAuthenticated()) {
			window.location = '/#/login';
		}
	}

}

