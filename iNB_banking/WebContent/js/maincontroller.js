var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);

function mainController($scope,$http){
	
	$('.basicslider').flexslider({
        animation: "slide",
        // animationLoop: true,
        pauseOnHover: true,
        controlNav: true,
        directionNav: false,
		smoothHeight: true,
		slideshowSpeed: 3000,
        start: function(slider) {
            $('body').removeClass('loading');
        }
    });
	
	
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
		templateUrl : 'index.html'
	})
	.otherwise({redirectTo:'/'})
})


