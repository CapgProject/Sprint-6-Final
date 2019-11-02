$(function(){
	$("#username_error_message").hide();
	$("#password_error_message").hide();
	var error_username = false;
	var error_password = false;

	$("#name").focusout(function(){
		check_username();
	});
	$("#password").focusout(function(){
		check_password();
	});

	function check_username(){
		var username_length = $("#name").val().length;
		if(username_length<5 || username_length>20)	{
			$("#username_error_message").html("Should be 5-20 characters long");
			$("#username_error_message").show();
			error_username = true;
		}
		else{
			$("#username_error_message").hide();	
		}
	}

	function check_password(){
		var pattern =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i);
		if(pattern.test($("#password").val())){
			$("#password_error_message").hide();
		}
		else{
			$("#password_error_message").html("Password should contain at least one upper case character, one lower case character, one numeric character, one special character and length should be at least eight characters");
			$("#password_error_message").show();
			error_password = true;	
		}
	}

	$("#updateform").submit(function(){
		error_username = false;
		error_password = false;
		check_username();
		check_password();
		if(error_username == false && error_password == false){
			return true;
		}
		else{
			return false;
		}
	});
	
});