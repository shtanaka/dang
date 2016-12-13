angular
	.module('dang.authentication.controllers', ['dang.authentication.services'])
	.controller('registerController', registerController)
	.controller('loginController', loginController);

registerController.$inject = ['$scope', 'Authentication'];
function registerController($scope, Authentication) {
	
	var vm = this;
	vm.fieldErrors = {};

	vm.activate = Authentication.activate;
	vm.register = register;

	vm.activate();

	function register() {
		Authentication.register(vm.email, vm.password, vm.username)
			.then(function (response) {
				if (response.status == 201) {
					for (var error in vm.fieldErrors)
						vm.fieldErrors[error] = "";
					vm.activate();
				} else if (response.status == 400) {	
					for (var error in response.data)	
						vm.fieldErrors[error] = response.data[error][0];
				}
			});
	}

}

loginController.$inject = ['$scope', 'Authentication'];
function loginController($scope, Authentication) {
	
	var vm = this;
	
	vm.activate = Authentication.activate;
	vm.login = login;

	vm.activate();
	
	function login() {
		Authentication.login(vm.email, vm.password)
			.then(function(response) {
				vm.activate();
			});
	}

}








