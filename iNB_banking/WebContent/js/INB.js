var inbapp=angular.module('iNBapp',['ngRoute','ngCookies']).directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ]);

function readURL(input,k) {
    if(k){
	if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#agepre')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
    }
    else{
    	if (input.files && input.files[0]) {
            var reader1 = new FileReader();

            reader1.onload = function (e) {
            	 $('#addpre')
                    .attr('src', e.target.result);
            };

            reader1.readAsDataURL(input.files[0]);
        }
    }
}



function mainController($scope,$http,$cookieStore,$location,$timeout,$rootScope,$window){
	
	$scope.branchDetails;
	$scope.branchManagerDetails;
	$scope.loginAlertMessage = true;
	$rootScope.userDetails;
	$rootScope.accountDetails;
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
	$scope.accountdetails = false;			
	$scope.userdetails = false;			
	$scope.moneytransfer = false;			
	$scope.transfermoneyerror;
	

	
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
	 

     // NOW UPLOAD THE FILES.
     $scope.uploadFiles = function () {

    	 var formdata = new FormData();
    	 var file1 = document.getElementById('file1').files[0];
    	 var file2 = document.getElementById('file2').files[0];
    	 //var myfile = $scope.file2;
    	 console.log("file2: " +  file1);
    	 console.log('usrmail '+$cookieStore.get('newusermail'));
    	 formdata.append("addressProof", file1);
    	 formdata.append("ageProof", file2);
    	 formdata.append("email", $cookieStore.get('newusermail'));
    	 //var myurl = 'http://10.20.14.83:9000/document?addressProof='+formdata.get("addressProof")+'&ageProof='+formdata.get("ageProof")+'&email=saxenakartik007@gmail.com';
    	 //var myurl = 'http://10.20.14.83:9000/document?email=saxenakartik007@gmail.com';
    	 if(file1==undefined||file1==null){
    		 mymessage('Please Add Address Document');
    	 }
    	 else if(file2==undefined||file2==null){
    		 mymessage('Please Add Age Document');
    	 }
    	 else{
    	 var myurl = 'http://10.20.14.83:9000/document';
         
         var request = {
                 method: 'POST',
                 url: myurl,
                 data:formdata,
//                 transformRequest: function(data, headersGetterFunction) {
//                     return data; // do nothing! FormData is very good!
//                 },
                 transformRequest: angular.identity,
                 headers: {
                     'Content-Type': undefined,
                 	'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
                 }
             };

             // SEND THE FILES.
             $http(request).then(function successCallback(response) {	
			 console.log(response);
			 bootbox.alert('Thankyou For connecting with us.We will get back to u shortly.')
			 $location.path('/');
			});
			
    	 }

     }
	

 	
   ///Get Age document, pass users objectid;     
        $scope.getAgeDoc=function(userId)
        {
        	
        	var url='http://10.20.14.83:9000/ageproofdocument/'+userId;
        	$http({
            	    method : 'GET',
        		url : url,
        		headers : {
        			'Content-Type' : 'application/json',
        			'Access-Control-Allow-Origin': 'http://10.20.14.83:9000'
        		}
        	    }).then(function successCallback(response) {
        		var msg = response.data;
        			//$scope.srcname="data:image/png;base64,"+msg;
        			
        	}, function errorCallback(response) {
        		mymessage("Server Error. Try After Some time: " + response);
        	});
        }

        
      ///Get Address document, pass users objectid;     
        $scope.getAddDoc=function(userId)
        {
        	
        	var url='http://10.20.14.83:9000/addressproofdocument/'+userId;
        	$http({
            	    method : 'GET',
        		url : url,
        		headers : {
        			'Content-Type' : 'application/json',
        			'Access-Control-Allow-Origin': 'http://10.20.14.83:9000'
        		}
        	    }).then(function successCallback(response) {
        		var msg = response.data;
        			//$scope.srcname="data:image/png;base64,"+msg;
        			
        	}, function errorCallback(response) {
        		mymessage("Server Error. Try After Some time: " + response);
        	});
        }

        
        
        
   	
   	
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
			mymessage("Registered Details.wait for confirmation");
			console.log(response);
			console.log(response);
			console.log(response.data.email)
			$cookieStore.put('newusermail', $scope.useremail); 
			$location.path('/uploaddoc');
				
		},function successCallback(response){
			mymessage("Error in adding account");
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
		$scope.Userheading = "My Details";
		$scope.userdetails = true;
		$scope.accountdetails = false;
		$scope.moneytransfer = false;
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			$rootScope.userDetails=data[0];
		});
		
	}
	//get user details ends
	
	//get account summary
	$scope.getAccountSummary=function(){
		$scope.Userheading="Account Details";
		$scope.userdetails = false;
		$scope.accountdetails = true;
		$scope.moneytransfer = false;
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			$rootScope.accountDetails=data[0].accounthash[0];
			
		});
	}
	//get account summary ends
	
	//money transfer tab call
	$scope.transferMoney = function(){
		$scope.Userheading="Money Transfer";
		$scope.accountdetails = false;
		$scope.userdetails = false;
		$scope.moneytransfer = true;
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			$scope.uaccount = data[0].accounthash[0].accountNumber;
			
		});
	}
	//money transfer tab call ends
	
	//money transfer function call
	$scope.moneytransfer = function(){
		
	}
	//money transfer function call ends
	
	
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
								$cookieStore.put('branchmanagertoken',response.data.id)
								$location.path('/manager');
							}
							else{
								console.log(response);
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
	
	
	
	
	///admin 
	
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
				$cookieStore.remove('branchmanagertoken')
				$location.path('/');
		
			}
				
		});
	};
	//branch manager logout ends
	
$scope.logoutUser=function(){
		
		$cookieStore.remove('role');
		$cookieStore.remove('username');
		$cookieStore.remove('usertoken');
			$location.path('/');
		
	};
	//users logout ends
	
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
		.when('/uploaddoc', {
			controller: 'MainController',
			templateUrl: 'uploaddocuments.html'
		})
		.when('/password', {
			controller: 'MainController',
			templateUrl: 'changepassword.html'
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
})






