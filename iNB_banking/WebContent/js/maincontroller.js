var inbapp=angular.module('iNBapp',['ngRoute']);


function mainController($scope,$http){
	
	//getUnregisterdUsers starts
	$scope.getUnregisteredUsers(){
		$scope.unregisteredUsers=[];
		var url=/*something*/+/unregistereduser/details;
		$http.get(url).success(function(data,status){
			angular.forEach(data.data./*something*/,function(value,key){
				$scope.unRegisteredUsers.push(value./*something*/);
			})
		})
	};
	//getUnregisteredUsers ends
}

inbapp.controller('mainController',mainController);

inbapp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller:mainController,
		templateUrl:index.html
	})
	.otherwise({redirectTo:'/'})
})