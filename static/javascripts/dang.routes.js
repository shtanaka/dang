angular
	.module('dang.routes', ['ngRoute', 'dang.authentication.controllers', 'dang.site.controllers'])
	.config(config);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider
		.when('/register', {
			controller: 'registerController',
			controllerAs: 'vm',
			templateUrl: 'authentication/register.html'
		})
		.when('/login', {
			controller: 'loginController',
			controllerAs: 'vm',
			templateUrl: 'authentication/login.html'
		})
		.when('/', {
			controller: 'mainController',
			controllerAs: 'vm',
			templateUrl: 'site/main.html'
		});
};


