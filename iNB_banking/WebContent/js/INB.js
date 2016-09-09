var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$http,$cookieStore,$location){
	$scope.branchDetails;
	
	$scope.gotologinPage=function(){
		$location.path("/login");
	}
	
	$scope.createBranchMgr = function(){
		$location.path("/BranchMgr");
	}
	
	$scope.gotocreateBranch=function(){
		$location.path("/addBranch");
	}
	
	$scope.addbranchmgr = function(){
		var branchitem;
		$scope.getAllBranches();
		
		var branchDetails =$scope.branchDetails;
		//console.log(branchDetails+"\n\n"+$scope.branchDetails);
		
		for(i in branchDetails) {
			//console.log(branchDetails[i]+"\n"+branchDetails[i].branchName);
		    if(branchDetails[i].branchName == $scope.mgrbranch)
		    {
		    	branchitem = {ifscCode : branchDetails[i].ifscCode , branchName : branchDetails[i].branchName, address : branchDetails[i].address, contact : branchDetails[i].contact};
		    	break;
		    }
		}
		//console.log(branchitem);
		//console.log($scope.mgruname+"\n"+$scope.mgrpsw1+"\n"+$scope.mgrfname+"\n"+$scope.mgrlname+"\n"+$scope.mgremail+"\n"+$scope.mgrphone+"\n"+$scope.mgraddress+"\n"+$scope.mgrdate);
		if($scope.mgrpsw1==$scope.mgrpsw2){
			$http({
				method : 'POST',
				url :'http://10.20.14.83:9000/branchmanager/',
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
				},
				data : { 
					"userName": $scope.mgruname,
					"password": $scope.mgrpsw1,
					"firstName": $scope.mgrfname,
					"lastName": $scope.mgrlname,
					"email": $scope.mgremail,
					"phone": $scope.mgrphone,
					"address": $scope.mgraddress,
					"dateOfBirth": ($scope.mgrdate).getTime(),
					"branchPOJO": branchitem
				}
			}).then(function successCallback(response) {
				$scope.mgrerrormsg="Added Branch Manager successfully"
					
			},function successCallback(response){
				$scope.mgrerrormsg="Error in Adding Branch Manager";
			});
			}
			else
				$scope.mgrerrormsg="Passwords do not  match";
	}
	
	//getallbranches
	$scope.getAllBranches=function()
	{  
		var url='http://10.20.14.83:9000/branch';
		$http.get(url).success(function(data,status){
		$scope.branchDetails= data; 
	  })
	}
	//getallbranches
	
	$scope.getAllBranches();
	
	
	//login admin starts
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
				$scope.aerrormsg="no login";
			}
			else{
				alert("Successfull response"+response.data.id);
				
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id)
				$location.path('/admin');
			}
				
		},function successCallback(response){
			$scope.aerrormsg="no response";
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

	.when('/BranchMgr', {
			controller: 'MainController',
			templateUrl: 'BranchMgr.html'
		})	
	.when('/addBranch', {
			controller: 'MainController',
			templateUrl: 'AddBranch.html'
		})
	.otherwise({redirectTo:'/'})
})


