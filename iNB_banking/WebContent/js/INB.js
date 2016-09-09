var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$http,$cookieStore,$location){
	//login admin starts
	
	$scope.gotologinPage=function(){
		$location.path("/login");
	}
	
	
	
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
				$scope.errormsg="no login";
			}
			else{
				alert("Successfull response"+response.data.id);
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id)
				
			}
				
		},function successCallback(response){
			$scope.errormsg="no response";
		});
	};
	//login admin ends
	
	
	//register user starts
	$scope.registerCustomer=function(){
		if($scope.password1==$scope.password2){
		$http({
			method : 'POST',
			url :'http://10.20.14.83:9000/registeredcustomer',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : {				
				firstName : $scope.firstname,
				lastName : $scope.lastname,
				email : $scope.email,
				phone : $scope.phone,
				address : $scope.addr,
				dateOfBirth : $scope.dob,
				 customerId : $scope.custid,
				 userName : $scope.username,
				 password : $scope.password1
			}
		}).then(function successCallback(response) {
			$scope.errormsg="Registered successfully.Wait for confirmation"
				
		},function successCallback(response){
			console.log("Error in registration"+response.data);
		});
		}
		else
			$scope.errormsg="Passwords do not  match";
	};
	//register user ends
	
	//user registration status starts
	$scope.approve=function(status){
		if(status==1)
			alert("approved");
		else
			alert("rejectd");
	}
	//user registration status starts
	
	//getUnregisterdUsers starts
//	$scope.getUnregisteredUsers=function(){
//		$scope.unregisteredUsers=[];
//		var url='http://10.20.14.83:9000/unregistereduser/details';
//		$http.get(url).success(function(data,status){
//			angular.forEach(data.data.something,function(value,key){
////				$scope.unRegisteredUsers.push(value.something);
////			})
//			console.log(data)
//		})
//	};
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
	.when('/register', {
			controller: 'MainController',
			templateUrl: 'registerCustomer.html'
		})
	.when('/admin', {
			controller: 'MainController',
			templateUrl: 'Adminapproval.html'
		})	
	.otherwise({redirectTo:'/'})
})


