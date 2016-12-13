angular
	.module('dang.site.controllers', ['dang.authentication.services'])
	.controller('navbarController', navbarController)
	.controller('mainController', mainController);

navbarController.$inject = ['$scope', 'Authentication'];
function navbarController($scope, Authentication) {
	
	var vm = this;
	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.user = Authentication.getAuthenticatedAccount();

	vm.deactivate = Authentication.deactivate;
	vm.logout = logout;	
	
	function logout() {
		Authentication.logout().then(function (response) {
			vm.deactivate();
			vm.isAuthenticated = Authentication.isAuthenticated();
		});
	}

}

mainController.$inject = ['$scope', 'Authentication'];
function mainController($scope, Authentication) {
	
	var vm = this;
	vm.activate = Authentication.activate;
	vm.deactivate = Authentication.deactivate;
	vm.user = Authentication.getAuthenticatedAccount();

	vm.activate();
	vm.deactivate();

}
