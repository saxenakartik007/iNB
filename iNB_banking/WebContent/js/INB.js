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

var oldpassword;
var userdetails;

function mainController($scope,$http,$cookieStore,$location,$timeout,$rootScope,$window,$route){
	
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
	$scope.branchmanagername=$cookieStore.get('branchmanagername');
	$scope.username=$cookieStore.get('customername');
	$scope.addmanagererror;
	console.log("Initially"+$scope.branchmanagername);
	$scope.accountdetails = false;			
	$scope.userdetails = false;			
	$scope.moneytransfer = false;			
	$scope.transfermoneyerror = "";
	$scope.changepswerror = "";
	$scope.uploaderror = "";
	$scope.breadcrumheading = "";
	$scope.ubreadcrumheading = "";
	$scope.changepasswordhead=$cookieStore.get('customername');
	$scope.regex="\INB0";
	
	$scope.showUserloginform=true;
	$scope.showAdminloginform=false;
	$scope.showBranchManagerloginform=false;
	
	
	$scope.viewUserloginForm=function(){
		
		$scope.showUserloginform=true;
		$scope.showAdminloginform=false;
		$scope.showBranchManagerloginform=false;
	}
	
$scope.viewAdminloginForm=function(){
		
		$scope.showUserloginform=false;
		$scope.showAdminloginform=true;
		$scope.showBranchManagerloginform=false;
	}
$scope.viewBranchManagerloginForm=function(){
	
	$scope.showUserloginform=false;
	$scope.showAdminloginform=false;
	$scope.showBranchManagerloginform=true;
}
	
	//settting the date parameters
	var today = new Date();
	$scope.maxDate = new Date(today.getFullYear(),today.getMonth() , today.getDate());
	  
	
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
					if(value.applicationStatus != "Rejected")
						$scope.UnregisteredUserDetails.push(value);
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
		
		$scope.breadcrumheading = "View Branches";
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
		 
		$scope.breadcrumheading = "View Branch Managers";
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
    	 $scope.uploaderror = "";
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
    	 if((file1==undefined||file1==null) && (file2==undefined||file2==null))
    	 {
    		 $scope.uploaderror = 'Please add both documents.';
    	 }
    	 else if(file1==undefined||file1==null){
	    		$scope.uploaderror = 'Please add address document.';
	     }
	     else if(file2==undefined||file2==null){
	    		$scope.uploaderror = 'Please add age document.';
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
			 bootbox.alert('Thank you '+$cookieStore.get('newusername') +' for connecting with us.We will get back to you shortly.')
			 $location.path('/');
			});
			
    	 }

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
			bootbox.confirm("Are you sure of approving the application of "+user.firstName+" "+user.lastName+" ?", function(result) {
				 if(result==true){
					 var url='http://10.20.14.83:9000/unregistereduser/email/'+user.id+'/verify';
						$http({
							method : 'PUT',
							url :url,
							headers : {
								'Content-Type' : 'application/json',
								'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
							}
						}).then(function successCallBack(response){
							bootbox.alert("Application of "+user.firstName+" "+user.lastName +" has been approved. Email sent successfully to : "+user.email);
							$location.path('/manager');
						},function errorCallBack(response){
							bootbox.alert("Some error occured").find('.modal-body').css({'color': 'red'});;
						})
				 }
				 
				}); 
			
		}
		else{
			bootbox.confirm("Are you sure of disapproving the application of "+user.firstName+" "+user.lastName+" ?", function(result) {
				 if(result==true){
					 var url='http://10.20.14.83:9000/unregistereduser/email/'+user.id+'/reject';
						$http({
							method : 'PUT',
							url :url,
							headers : {
								'Content-Type' : 'application/json',
								'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
							}
						}).then(function successCallBack(response){
							bootbox.alert("Application of "+user.firstName+" "+user.lastName +" has been disapproved.")
							$location.path('/manager');
						},function errorCallBack(response){
							bootbox.alert("Some error occured").find('.modal-body').css({'color': 'red'});;
						});
				 } 
				 });
				 
		}
	}
	
	
	$scope.createBranchMgr = function(){
		document.getElementById("Mgrform").reset(); 
		//$location.path("/BranchMgr");
		$scope.breadcrumheading = "Add Branch Manager";
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
		document.getElementById("AddBranchForm").reset(); 
		//$location.path("/addBranch");
		$scope.breadcrumheading = "Add a Branch";
		$scope.adminheading='Add New Branch';
		$scope.adminbranch=false;
		$scope.adminnewbranch=true;
		$scope.adminmanager=false;
		$scope.adminaddmanager=false;
		
	}
	

	$scope.addbranchmgr = function()
	{
		$scope.addmanagererror = "";
		var branchitem;
		var url='http://10.20.14.83:9000/branch';
		$http.get(url).success(function(data,status){
			$scope.branchDetails= data;	
		});
		
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
		if($scope.mgrpsw1==$scope.mgrpsw2)
		{
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
				}).then(function successCallback(response) 
				{	
					bootbox.alert("Branch Manager "+$scope.mgrfname+" "+$scope.mgrlname +" Added successfully.");
					$scope.getBranchManagers();
				},function errorCallback(response)
				{
					bootbox.alert("Error in Adding Branch Manager").find('.modal-body').css({'color': 'red'});	
				});
		}
		else
			$scope.addmanagererror="Passwords do not  match";		
	}
	
	//add new account
	$scope.createAccount = function(){
		
		bootbox.confirm("Information once entered cannot be changed.\n\nDo you Want to Continue ?", function(result) 
		{
			if(result==true)
			{
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
					$cookieStore.put('newusermail', $scope.useremail);
					$cookieStore.put('newusername', ($scope.userfname + " "+ $scope.userlname));
					$location.path('/uploaddoc');
						
				},function errorCallback(response) {
					bootbox.alert("Error in adding account").find('.modal-body').css({'color': 'red'});
					console.log(response.data);
				});
			}
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
						bootbox.alert(name+" branch already exists.").find('.modal-body').css({'color': 'red'});;	
					}
					else{
					var data = response.data;
						console.log(response.data);
						bootbox.alert(name +" branch added");
						$scope.getAllBranches();

					}
					
				}, function errorCallback(response) {
					bootbox.alert("Some error occoured on server side.").find('.modal-body').css({'color': 'red'});
					
				});

	}
	
	//get user details
	$scope.getUserDetails=function(){
		 
		$scope.ubreadcrumheading = "My Profile ";
		$scope.Userheading = "My Profile";
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
		 
		$scope.ubreadcrumheading = "Account Summary";
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
	
	//get user name of Recivers account
	$scope.getusername = function(){
		if($scope.uaccount != $scope.raccount)
		{
			$scope.transfermoneyerror= "";
			$scope.rname = " ";
			var url='http://10.20.14.83:9000/registeredcustomer/';
			$http.get(url).success(function(data,status){
				angular.forEach(data,function(value){
					if(value.accounthash[0].accountNumber == $scope.raccount)
					{
						$scope.rname = (value.firstName +" " + value.lastName);
						console.log(value.firstName);
					}
				})
				if($scope.rname == " ")
				{
					$scope.transfermoneyerror = "No such account Exists!"
				}
			});
		}
		else
		{
			$scope.transfermoneyerror = "Please Enter Diffrent Receiver's Account Number";
		}
	}
	
	//money transfer tab call
	$scope.transferMoney = function(){
		document.getElementById("moneytransferform").reset(); 
		$scope.ubreadcrumheading = "Money Transfer";
		$scope.Userheading="Money Transfer";
		$scope.accountdetails = false;
		$scope.userdetails = false;
		$scope.moneytransfer = true;
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			$scope.uaccount = data[0].accounthash[0].accountNumber;
			$("#moneytransferform #uaccount").val( $scope.uaccount );
		});
		
		
	}
	//money transfer tab call ends
	
	
	//money transfer function call

	$scope.moneytransferfun = function(){
		var balance;
		var id=$cookieStore.get('usertoken');
		var url='http://10.20.14.83:9000/registeredcustomer/details/'+id;
		$http.get(url).success(function(data,status){
			balance = data[0].accounthash[0].balance;
			
		});
		if($scope.mtamount > balance)
		{
			$scope.transfermoneyerror = 'Insufficient balance for Money Transfer';
		}
		else
		{
			$http({
				method : 'PUT',
				url : 'http://10.20.14.83:9000/registeredcustomer/transfer',
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
				},
				data:{
					clientAccount : $scope.uaccount,
					recevierAccount : $scope.raccount,
					amount: $scope.mtamount
				}
			}).then(function successCallback(response) {
				
				/*if(response.data["Status"]=='Failed'){
					console.log(response.data["Message"]);
					//mymessage(response.data["Message"]);
					//$scope.transfermoneyerror = "Invalid Account Number"
				}
				else*/
					bootbox.alert("Transferred Rs."+$scope.mtamount+" from account no. "+ $scope.uaccount +" to account no. "+$scope.raccount+" successfully.");
					$scope.getAccountSummary();
			},function errorCallback(response){
				bootbox.alert("Some error occured on server side.").find('.modal-body').css({'color': 'red'});	
			});
		}
	}
	//money transfer function call ends
	
	  var today = new Date();
	  var minAge = 18;
	  $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
	 minAge=100;
	 
	  $scope.minDate=new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

		  
	
	
	//loginAction find user or bm
	$scope.loginAction=function(role){
		if(($scope.uname!=null && $scope.password!=null )||($scope.buname!=null && $scope.bpassword!=null &&$scope.bbranch!=null)){
			var name,pass,branch;
			if(role==0){
				url="http://10.20.14.83:9000/registeredcustomer"
				name= $scope.uname;
			   pass= $scope.password;
				
				
				
				$http({
					method : 'PUT',
					url :url,
					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
					},
					data:{
						userName : name,
						password : pass
						
					}
				}).then(function successCallback(response) {
					if(response.data["Exception"]!=null){
						if(role==1)
						$scope.loginformalert1=response.data["Exception"];
						else
							$scope.loginformalert=response.data["Exception"];
							
						console.log(response);
					}
					else{
							console.log(response);
							$cookieStore.put('role','user');
							$cookieStore.put('username',$scope.uname);
							$cookieStore.put('customername',response.data.firstName);
							$cookieStore.put('usertoken',response.data.id)
							if($scope.password.length==4){
								oldpassword=$scope.password;
								$location.path('/password');
							}		
							else
							$location.path('/userpage');
						
					}
						
				});
				
			}
					else
				{
						
						url= "http://10.20.14.83:9000/branchmanager/login";
							name= $scope.buname;
						pass= $scope.bpassword;
							branch=$scope.bbranch;
							console.log($scope.bbranch);
							
							$http({
								method : 'PUT',
								url :url,
								headers : {
									'Content-Type' : 'application/json',
									'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
								},
								data:{
									userName : name,
									password : pass,
									branchName:branch
									
								}
							}).then(function successCallback(response) {
								if(response.data["Exception"]!=null){
									if(role==1){
									$scope.loginformalert1=response.data["Exception"];
										
									}else
										$scope.loginformalert=response.data["Exception"];
									
									console.log(response);
								}
								else{
										console.log(response);
										$cookieStore.put('role','branchmanager');
										$cookieStore.put('username',$scope.buname);
										$cookieStore.put('branchmanagername',(response.data.firstName));
										
										$cookieStore.put('branchmanagertoken',response.data.id);
										$cookieStore.put('bmbranch',$scope.bbranch);
										$location.path('/manager');
								}
									
							});
							
							
							
							
							
							
				}
		}
		else{
			if(role==0){
				if($scope.uname==null)
					$scope.loginformalert="Please enter customer id";
						else if($scope.password==null)
							$scope.loginformalert="Please enter password";
						
						}
			else{
				if(role==1){
					if($scope.buname==null)
				$scope.loginformalert1="Please enter username";
					else if($scope.bpassword==null)
						$scope.loginformalert1="Please enter password";
					else
						$scope.loginformalert1="Please Select Branch";

					
				}
				}	
		}
	}
	//loginAction find user or bm ends
	
	
	//changepassword
	$scope.changePassword=function(){
		$scope.changepswerror = "";
		if($scope.ocpassword!=oldpassword)
		{
			console.log("old pass"+$scope.ocpassword+" "+oldpassword);
			$scope.changepswerror = 'Please enter correct OTP.';
		}
		else if($scope.rcpassword!=$scope.ncpassword){
			$scope.changepswerror = 'Passwords do not match.';
		}
		else{
			$http({
				method : 'PUT',
				url :'http://10.20.14.83:9000/registeredcustomer/changepassword',
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/'
				},
				data:{
					customerId : $cookieStore.get('username'),
					newPassword : $scope.ncpassword
				}
			}).then(function successCallback(response) {
				bootbox.alert(response.data['Success']);
				$location.path('/userpage');
			})
	}
	
	}
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
			if($scope.aname==null && $scope.apassword==null)
				$scope.aloginformalert="Please enter credentials";
			else
			{
				if($scope.aname==null)
					$scope.aloginformalert="Please enter username";
				else
				{
					if($scope.apassword==null)
						$scope.aloginformalert="Please enter password";		
				}
			}
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
			//console.log(response.data);
			if(response.data.error!=null){
				//console.log(response.data);
				//console.log("An error occoured");
				bootbox.alert("Some error occured on server side.").find('.modal-body').css({'color': 'red'});
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
			//console.log(response.data);
			if(response.data.error!=null){
				/*console.log(response.data);
				console.log("An error occoured");*/
				bootbox.alert("Some error occured on server side.").find('.modal-body').css({'color': 'red'});
			}
			else{
				$cookieStore.remove('role');
				$cookieStore.remove('branchmanagername');
				$cookieStore.remove('branchmanagertoken');
				$cookieStore.remove('bmbranch');
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
							//console.log(value.branch.branchName + "\n" + branch);
							if(value.applicationStatus != "Rejected")
								UnregisteredUserDetails.push(value);
							//console.log($scope.UnregisteredUserDetails);
							 
						}
					});
					$scope.item = UnregisteredUserDetails[index];
					//console.log(index+"\n"+UnregisteredUserDetails[index]+"\n"+$scope.item);
					 
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
			        		
			        		if(msg.length!=undefined)
			        			$scope.agesrcname="data:image/png;base64,"+msg;
			        		
				        		
			        	}, function errorCallback(response) {
			        		bootbox.alert("Some error occured on server side.").find('.modal-body').css({'color': 'red'});
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
			        		if(msg.length!=undefined)
			        			$scope.addsrcname="data:image/png;base64,"+msg;
			        			
			        	}, function errorCallback(response) {
			        		bootbox.alert("Some error occured on server side.").find('.modal-body').css({'color': 'red'});
			        	});
			        }

			        //console.log("id" + $scope.item.id);
			        $scope.addsrcname="images/ina.png";
			        $scope.agesrcname="images/ina.png";
			        
					$scope.getAgeDoc($scope.item.id);
					 $scope.getAddDoc($scope.item.id);
				});
				
				
			},
			templateUrl: 'verification.html'
		})	
		.otherwise({redirectTo:'/'})
})






