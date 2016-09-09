var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$http,$cookieStore,$location,$timeout){
	$scope.branchDetails;
	$scope.branchManagerDetails;
	 $scope.loginAlertMessage = true;

	
	//getallbranches
	$scope.getAllBranches=function(){		
		var url='http://10.20.14.83:9000/branch';
		$http.get(url).success(function(data,status){
			$scope.branchDetails= data;	
		});
	}
	//getallbranches
	
	//getbranchmanager
	$scope.getBranchManagers=function(){
		var url='http://10.20.14.83:9000/branchmanager';
		$http.get(url).success(function(data,status){
			$scope.branchManagerDetails= data;	
		});
	}
	//getbranchmanager
	
	//callbranchfunction
	$scope.getAllBranches();
	//callbranchmanager
	$scope.getBranchManagers();
	
	
	//gotoadminpanel
	$scope.gotoAdminPanel=function(){
		$location.path('/admin');	
	}
	
	//go to login page
	$scope.gotologinPage=function(){
		$location.path("/login");
	}
	
	$scope.createBranchMgr = function(){
		$location.path("/BranchMgr");
	}
	
	//go to register page
	$scope.gotoregisterpage=function(){
		$location.path("/register");
	}
	
	//gotocreateBranch
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
	
	//add new account
	$scope.createAccount = function(){
		var type=$scope.accounttype.toUpperCase();
		
		var branchitem;
		$scope.getAllBranches();
		
		var branchDetails =$scope.branchDetails;
		for(i in branchDetails) {
			//console.log(branchDetails[i]+"\n"+branchDetails[i].branchName);
		    if(branchDetails[i].branchName == $scope.userbranch)
		    {
		    	branchitem = branchDetails[i];
		    	break;
		    }
		}
		$http({
			method : 'POST',
			url :'http://10.20.14.83:9000/unregistereduser',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : { 
				"firstName": $scope.userfname,
				"lastName": $scope.userlname,
				"email": $scope.useremail,
				"phone": $scope.userphone,
				"account":{
					"accountType":type+"ACCOUNT"
				},
				"address": $scope.useraddress,
				"dateOfBirth": ($scope.userdate).getTime(),
				"branchPOJO": branchitem
			}
		}).then(function successCallback(response) {
			$scope.usererrormsg="Registered Details.wait for confirmation";
				
		},function successCallback(response){
			$scope.mgrerrormsg="Error in adding account";
		},function errorCallback(response) {
			console.log(response.data);
		});
	}

	$scope.addNewBranch=function(){
		var ifsc=$scope.bifsc;
		var name=$scope.bname;
		var add=$scope.badd;
		var contact=$scope.bcontact;
	
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
					}
					
				}, function errorCallback(response) {
					alert("An Error Occoured");
					
				});

	}
	
	//loginAction find user or bm
	$scope.loginAction=function(role){
		if($scope.uname!=null && $scope.password!=null && $scope.branch!=null && $scope.role!=null){
			if($scope.role=="branch_manager")
				url="http://10.20.14.83:9000/branchmanager/login"
			else
				url="http://10.20.14.83:9000/registeredcustomer"
					$http({
						method : 'PUT',
						url :url,
						headers : {
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
						},
						data:{
							userName : $scope.uname,
							password : $scope.password,
							branchName:$scope.branch
						}
					}).then(function successCallback(response) {
						if(response.data["Exception"]!=null){
							$scope.loginformalert=response.data["Exception"];
						}
						else{
							if($scope.role=='branch_manager'){
								$cookieStore.put('role','branchmanager');
								$cookieStore.put('username',$scope.uname);
								$cookieStore.put('branchmanagertoken',response.data.id)
								$location.path('/manager');
							}
							else{
								$cookieStore.put('role','user');
								$cookieStore.put('username',$scope.uname);
								$cookieStore.put('usertoken',response.data.id)
								$location.path('/userpage');
							}
							
						}
							
					});
		}
		else{
			$scope.loginformalert="Please enter proper credentials";
		}
	}
	//loginAction find user or bm ends
	
	//login admin starts
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
				$cookieStore.put('admintoken',response.data.id);
				$location.path('/admin');
		
			}
		});
		}
		else{
			$scope.aloginformalert="Please enter credentials"
		}
	};
	//login admin ends
	
	
	
	
	
	
	
	
	///adminlogout
	
	$scope.logoutAdmin=function(){
		$http({
			method : 'PUT',
			url :'http://10.20.14.83:9000/admin/logout',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : {				
				role: $cookieStore.get('role'),
				id: $cookieStore.get('admintoken') 
			}
		}).then(function successCallback(response) {
			console.log(response.data);
			if(response.data.error!=null){
				console.log(response.data);
			console.log("An error occoured");
			}
			else{
				$cookieStore.remove('role');
				$cookieStore.remove('admintoken')
				$location.path('/');
		
			}
				
		});
	};
	//admin logout ends
	
	
	
	
	
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
	         $timeout(function () { $scope.loginAlertMessage = true;
	         $location.path('/admin'); }, 3000);   
		
	}
	

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
}
)


