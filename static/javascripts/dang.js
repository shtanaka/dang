angular
	.module('dang', ['dang.routes'], 
	function($interpolateProvider) {
    	$interpolateProvider.startSymbol('[[');
    	$interpolateProvider.endSymbol(']]');
	}).run(run);

run.$inject = ['$http'];
function run($http) {	
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
  	$http.defaults.xsrfCookieName = 'csrftoken';
}
