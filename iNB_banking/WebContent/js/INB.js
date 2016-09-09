var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$http,$cookieStore,$location,$timeout){
	$scope.branchDetails;
	 $scope.loginAlertMessage = true;
	
	//getallbranches
	$scope.getAllBranches=function(){
		
		var url='http://10.20.14.83:9000/branch';
		$http.get(url).success(function(data,status){
			$scope.branchDetails= data;	
		});
	}
	//getallbranches
	$scope.getAllBranches();
	$location.path("/addBranch");
	
	//gotoadminpanel
	$scope.gotoAdminPanel=function(){
		$location.path('/admin');
	}
	
	//go to login page
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
					if(response.data['Exception ']=='BranchAlreadyExistException'){
						console.log(response.data);
						
						mymessage("Branch Already Exists");	
					}
					else{
					var data = response.data;
					console.log(response.data);
					mymessage("Branch added");	
						 $location.path('/admin');
					}
					
				}, function errorCallback(response) {
					alert("An Error Occoured");
					
				});

		
		
		
	}
	$scope.loginAdmin=function(){
		if($scope.aname!=null && $scope.apassword!=null){
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
				$scope.aloginformalert="Username and password do not match";
			}
			else{
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id)
				$location.path('/admin');
			}
				
		});
		}
		else{
			$scope.aloginformalert="Please enter credentials"
		}
	};
	//login admin ends
	
	//loginuser
	$scope.loginUser=function(){
		if($scope.uname!=null && $scope.password!=null && $scope.branch!="none"){
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
					$scope.loginformalert="no login";
				}
				else{
					alert("Successfull response"+response.data.id);
					
					$cookieStore.put('role','admin');
					$cookieStore.put('admintoken',response.data.id)
					$location.path('/admin');
				}
					
			},function successCallback(response){
				$scope.loginformalert="no response";
			});
		}
		else{
			$scope.loginformalert="Please enter credentials"
		}
		
	};
	//loginuser
	
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
			$scope.aloginform="Registered successfully.Wait for confirmation"
				
		},function successCallback(response){
			console.log("Error in registration"+response.data);
		});
		}
		else
			$scope.errormsg="Passwords do not  match";
	};
	
	
	function mymessage(x){
		$scope.mycustomMessage=x;
		  $scope.loginAlertMessage=false; 
	         $timeout(function () { $scope.loginAlertMessage = true; }, 3000);   
		
	}
	
	//register user ends
	
	//user registration status starts
/*	$scope.approve=function(status){
		if(status==1)
			alert("approved");
		else
			alert("rejectd");
	}*/
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
			templateUrl: 'AdminPanel.html'
		})
		.when('/addBranch', {
			controller: 'MainController',
			templateUrl: 'AddBranch.html'
		})
	.otherwise({redirectTo:'/'})
})


