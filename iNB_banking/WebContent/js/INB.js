var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']);


function mainController($scope,$window,$rootScope,$http,$cookieStore,$location,$timeout){
	$scope.branchDetails;
	$scope.branchManagerDetails;
	$rootScope.userDetails;
	$scope.UnregisteredUserDetails= [];
	$scope.item;
	$scope.loginAlertMessage = true;
	$scope.adminbranch=true;
	$scope.adminnewbranch=false;
	$scope.adminmanager=false;
	$scope.adminaddmanager=false;
	$scope.unregisterusers = true;
	$scope.adminheading='Branch List';
	$scope.Branchheading='Unregistered Users';
	$scope.branchmanagername=$cookieStore.get('username');
	$scope.username=$cookieStore.get('username');
	console.log("Initially"+$scope.branchmanagername);
	$scope.userdetails = true;
	$scope.moneytransfer = false;
	$scope.transfermoneyerror;
	
	
	//money transfer tab call
	$scope.transferMoney = function(){
		$scope.userdetails = false;
		$scope.moneytransfer = true;
	}
	
	//money transfer function call
	$scope.moneytransfer = function(){
		
	}
	
	
	//getAllUnregisteredUsers
	$scope.getAllUnregisteredUsers=function(){
		$scope.unregisterusers = true;
		$scope.Branchheading='Unregistered Users';
		
		var url='http://10.20.14.83:9000/unregistereduser/details';
		$http.get(url).success(function(data,status){
			angular.forEach(data, function(value, key) {
				var branch = $cookieStore.get('bmbranch');
				if(value.branch.branchName == branch)
				{
					console.log(value.branch.branchName + "\n" + branch);
					$scope.UnregisteredUserDetails.push(value);
					console.log($scope.UnregisteredUserDetails);
				}
			});
				
		});
	}
	//getAllUnregisteredUsers
	$scope.getAllUnregisteredUsers();
	
	$scope.unregisteruserchange = function(user_i){
		console.log(user_i+"\n");
		$location.path("/verification/"+user_i);
	}
	//temporary
	//getallbranches
	$scope.getAllBranches=function(){
		$scope.adminheading='Branch List';
		$scope.adminbranch=true;
		$scope.adminnewbranch=false;
		$scope.adminmanager=false;
		$scope.adminaddmanager=false;
		var url='http://10.20.14.83:9000/branch';
		$http.get(url).success(function(data,status){
			$scope.branchDetails= data;
		});
	}
	//getallbranches
	
	//getbranchmanager
	$scope.getBranchManagers=function(){
		$scope.adminheading='Branch Managers List';
		$scope.adminbranch=false;
		$scope.adminnewbranch=false;
		$scope.adminmanager=true;
		$scope.adminaddmanager=false;
		$scope.adminview=false;
		var url='http://10.20.14.83:9000/branchmanager/';
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
	
	//gotto home page
	$scope.gotoHomePage=function(){
		$location.path("/");
	}
	
	//go to backpage
	$scope.backButton=function(){
		$window.history.back();
	}
	
	//approve or disapprove
	$scope.verifyUser=function(state,user){
		if(state==1){
			var url='http://10.20.14.83:9000/unregistereduser/email/'+user.id+'/verify';
			$http({
				method : 'PUT',
				url :url,
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
				}
			}).then(function successCallBack(response){
				mymessage("Email Sent");
				$location.path('/manager');
			},function errorCallBack(response){
				alert("Some error occured");
			})
		}
		else{
			var url='http://10.20.14.83:9000/unregistereduser/email/'+user.id+'/reject';
			$http({
				method : 'PUT',
				url :url,
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
				}
			}).then(function successCallBack(response){
				$location.path('/manager');
			},function errorCallBack(response){
				alert("Some error occured");
			})
		}
	}
	
	$scope.createBranchMgr = function(){
		//$location.path("/BranchMgr");
		$scope.adminheading='Add New Branch Manager';
		$scope.adminbranch=false;
		$scope.adminnewbranch=false;
		$scope.adminmanager=false;
		$scope.adminaddmanager=true;
	}
	
	//go to register page
	$scope.gotoregisterpage=function(){
		$location.path("/register");
	}
	
	//gotocreateBranch
	$scope.createBranch=function(){
		//$location.path("/addBranch");
		$scope.adminheading='Add New Branch';
		$scope.adminbranch=false;
		$scope.adminnewbranch=true;
		$scope.adminmanager=false;
		
	}
	
	//add manager
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
				
				$scope.getBranchManagers();
				mymessage("Branch Manager Added successfully");	
				
					
			},function successCallback(response){
				mymessage("Error in Adding Branch Manager");	
							});
			}
			else
				mymessage("Passwords do not  match");	
			
	}
	//add manager ends
	
	
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
			console.log(response);
				
		},function successCallback(response){
			$scope.mgrerrormsg="Error in adding account";
		},function errorCallback(response) {
			console.log(response.data);
		});
	}

	//add branch
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
						$scope.getAllBranches();
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
	
	//get user details
	$scope.getUserDetails=function(){
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			$rootScope.userDetails=data[0];
		});
		
	}
	
	$scope.getUserDetails($cookieStore.get('usertoken'));
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
							console.log(response);
						}
						else{
							if($scope.role=='branch_manager'){
								console.log(response);
								$cookieStore.put('role','branchmanager');
								$cookieStore.put('username',$scope.uname);
								$cookieStore.put('bmbranch',$scope.branch);
								$cookieStore.put('branchmanagertoken',response.data.id)
								$cookieStore.put('branchmanagertoken',response.data.id);
								$location.path('/manager');
							}
							else{
								$cookieStore.put('role','user');
								$cookieStore.put('username',response.data.firstName);
								$cookieStore.put('usertoken',response.data.id);
								$scope.getUserDetails();
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
				$scope.aloginformalert="Invalid credentials";
			}
			else{
				$cookieStore.put('role','admin');
				$cookieStore.put('admintoken',response.data.id);
				$location.path('/admin');
		
			}
		});
		}
		else{
			$scope.aloginformalert="Please enter credentials";
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
				$cookieStore.remove('admintoken');
				$location.path('/');
		
			}
				
		});
	};
	//admin logout ends
	
	//branch manager logout

	$scope.logoutManager=function(){
		$http({
			method : 'PUT',
			url :'http://10.20.14.83:9000/branchmanager/logout',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
			},
			data : {				
				role: $cookieStore.get('role'),
				id: $cookieStore.get('branchmanagertoken') 
			}
		}).then(function successCallback(response) {
			console.log(response.data);
			if(response.data.error!=null){
				console.log(response.data);
			console.log("An error occoured");
			}
			else{
				$cookieStore.remove('role');
				$cookieStore.remove('branchmanagertoken');
				$cookieStore.remove('branchmanagertoken');
				$cookieStore.remove('username');
				$location.path('/');
		
			}
				
		});
	};
	//branch manager logout ends
	
	//user logout

	$scope.logoutUser=function(){
		
		$cookieStore.remove('role');
		$cookieStore.remove('username');
		$cookieStore.remove('usertoken');
			$location.path('/');
		
	};
	//users logout ends
	
	
	
	
	
	function mymessage(x){
		$scope.mycustomMessage=x;
		  $scope.loginAlertMessage=false; 
	         $timeout(function () { $scope.loginAlertMessage = true;
	          }, 3000);   
		 
	}
	

}


inbapp.controller('MainController',mainController);

inbapp.directive('ngPage', function() {
	return {
		restrict: 'E',//E = element, A = attribute, C = class, M = comment
		templateUrl: 'Pagination.html',
		link: function(scope, iElement, iAttrs) {
		   //nothing
		}
	}
});
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
	.when('/manager', {
			controller: 'MainController',
			templateUrl: 'BranchManagerPanel.html'
		})
	.when('/userpage', {
			controller: 'MainController',
			templateUrl: 'Userpage.html'
		})
	.when('/verification/:i', {
			controller: function($scope, $routeParams, $http,$cookieStore) 
			{
				var UnregisteredUserDetails = [];
				var index = $routeParams.i;
				var url='http://10.20.14.83:9000/unregistereduser/details';
				$http.get(url).success(function(data,status){
					angular.forEach(data, function(value, key) {
						var branch = $cookieStore.get('bmbranch');
						if(value.branch.branchName == branch)
						{
							console.log(value.branch.branchName + "\n" + branch);
							UnregisteredUserDetails.push(value);
							console.log($scope.UnregisteredUserDetails);
						}
					});
					$scope.item = UnregisteredUserDetails[index];
					console.log(index+"\n"+UnregisteredUserDetails[index]+"\n"+$scope.item);
				});
				
				
			},
			templateUrl: 'verification.html'
		})	
		.otherwise({redirectTo:'/'})
}
)


