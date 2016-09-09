var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$http,$cookieStore,$location){
	//login admin starts
	
	$scope.gotologinPage=function(){
		$location.path("/login");
	}
	$scope.gotocreateBranch=function(){
		$location.path("/addBranch");
	}
	
	$scope.addNewBranch=function(){
		var ifsc=$scope.bifsc;
		var name=$scope.bname;
		var add=$scope.badd;
		var contact=$scope.contact;
	


		$http({
					method : 'POST',
					url : 'http://10.20.14.83:9000/branch',

					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin': 'http:///10.20.14.83:9000'
					},
					data : {				
						ifscCode: ifsc,
						branchName: name,
						address: add,
						contact: contact
					}
				}).then(function successCallback(response) {
					var data = response.data;
					console.log(data);
					alert("Branch Created");
					$location.path('/admin');
				}, function errorCallback(response) {
					alert("An Error Occoured");
					
				});

		
		
		
	}
	$scope.loginAdmin=function(){
		$http({
			method : 'PUT',
			url :'http://10.20.14.83:9000/admin/login',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : {				
				userName : $scope.aname,
				password : $scope.apassword
			}
		}).then(function successCallback(response) {
			if(response.data.error!=null){
				$scope.errormsg="no login";
			}
			else{
				bootbox.alert("Successfull response"+response.data.id);
				
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id)
				$location.path('/admin');
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
			$scope.errormsg="Error in registration";
		});
		}
		else
			$scope.errormsg="Passwords do not  match";
	};
	//register user ends
	
	
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
	.when('/register', {
			controller: 'MainController',
			templateUrl: 'registerCustomer.html'
		})
		.when('/admin', {
			controller: 'MainController',
			templateUrl: 'AdminPanel.html'
		})
		.when('/addBranch', {
			controller: 'MainController',
			templateUrl: 'AddBranch.html'
		})
	.otherwise({redirectTo:'/'})
})


