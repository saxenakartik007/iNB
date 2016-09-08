var inbApp = angular.module('inbAPP', ['ngRoute','ngCookies']);

var mainController = function($scope,$location,$http,$routeParams,$cookieStore,$anchorScroll,$rootScope) {
	
}

inbApp.controller('MainController',mainController);

inbApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'home.html'
		})
		.otherwise({redirectTo: '/'})
});