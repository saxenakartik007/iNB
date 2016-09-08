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

function mainController($scope,$http,$cookieStore){
	//login admin starts
	$scope.login=function(){
		$http({
			method : 'PUT',
			url :'http://10.20.14.83:9000/admin/login',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : {				
				userName : $scope.uname,
				password : $scope.password
			}
		}).then(function successCallback(response) {
			if(response.data.error!=null){
				alert("no login");
			}
			else{
				alert(response.data.id);
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id)
			}
				
		},function successCallback(response){
			alert("no response");
		});
	};
	//login admin ends
	
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
	.when('/login', {
			controller: 'MainController',
			templateUrl: 'login_html.html'
		})
	.otherwise({redirectTo:'/'})
})


