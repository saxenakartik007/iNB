var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);

inbapp.directive('ngSlider', function() {
	return {
		restrict: 'E',
		templateUrl: 'slider.html',
		link: function(scope, iElement, iAttrs) {
		      //alert("table function called");
		}
	}
});

function mainController($scope,$http){
	
	//getUnregisterdUsers starts
	/*$scope.getUnregisteredUsers(){
		$scope.unregisteredUsers=[];
		var url=something+/unregistereduser/details;
		$http.get(url).success(function(data,status){
			angular.forEach(data.data.something,function(value,key){
				$scope.unRegisteredUsers.push(value.something);
			})
		})
	};*/
	//getUnregisteredUsers ends
}

inbapp.controller('MainController',mainController);

inbapp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller : 'MainController',
		templateUrl : 'home.html'
	})
	.otherwise({redirectTo:'/'})
})


