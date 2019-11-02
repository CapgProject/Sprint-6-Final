import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/app.authenticationservice';
import { User } from '../_model/app.user';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: '../_html/app.home.html'
})

export class HomeComponent {

    user:User = null;
    username:string=null;
    password:string=null;
    name:string=null;
    registerpassword:string=null;
    invalidLogin = false

  constructor(private router: Router, private loginservice: AuthenticationService) {
   }

    error_name:string=null;
    validateUsername():boolean{
        if(this.username == null){
            this.error_name = "Username cannot be empty!";
			return false;
        }
        else{
            var length = this.username.length;
			if (length<5 || length>20) {
				this.error_name = "Username should be 5-20 characters long";
				return false;
			} else {
                this.error_name = null;
                return true;
            }
        }
    }

    error_password:string=null;
    validatePassword():boolean{
        if(this.password == null){
            this.error_password = "Password cannot be empty!";
			return false;
        }
        else{
            var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i);
            if (pattern.test(this.password)) {
                this.error_password = null;
                return true;    
            } 
            else {
                this.error_password = "Password should contain at least one upper case character, one lower case character, one numeric character, one special character and length should be at least eight characters";
                return false;
            }
        }
    }

    name_error:string=null;
    validateName():boolean{
        if(this.name == null){
            this.name_error = "Username cannot be empty!";
			return false;
        }
        else{
            var length = this.name.length;
			if (length<5 || length>20) {
				this.name_error = "Username should be 5-20 characters long";
				return false;
			} else {
                this.name_error = null;
                return true;
            }
        }
    }

    password_error:string=null;
    validatePass():boolean{
        if(this.registerpassword == null){
            this.password_error = "Password cannot be empty!";
			return false;
        }
        else{
            var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i);
            if (pattern.test(this.registerpassword)){
                this.password_error = null;
                return true;    
            } 
            else {
                this.password_error = "Password should contain at least one upper case character, one lower case character, one numeric character, one special character and length should be at least eight characters";
                return false;
            }
        }
    }

    Register(){
        if(this.validateName() && this.validatePass()){
            this.loginservice.register(this.name,this.registerpassword).subscribe((data)=>{alert("Successfully Registered!");this.router.navigate(['/home']).then(() => {
                window.location.reload();})}, error=>{alert(error.error);});
                
            
        }
    }

    checkLogin() {
        if(this.validateUsername() && this.validatePassword()){
            this.loginservice.authenticate(this.username, this.password).subscribe(
                userData => {
                    let tokenStr= 'Bearer '+userData.token;
                    sessionStorage.setItem('token', tokenStr);
                    sessionStorage.setItem('username',this.username);
                    this.loginservice.checkRole(this.username).subscribe((data:User)=>{this.user=data;this.checkRoles();});
                }, error=>{
                    alert("Invalid Credentials");
                    this.router.navigate(['/home']);
                }
          );
        }
    }
        
    
    checkRoles(){
        if(this.user.isAdmin){
            sessionStorage.setItem('role',"admin");
            sessionStorage.setItem("userId",this.user.userId);
            this.invalidLogin = false;
            this.router.navigate(['/admin']).then(() => {
                window.location.reload();
            });
        
        }
        else{
            sessionStorage.setItem('role',"user");
            sessionStorage.setItem("userId",this.user.userId);
            this.invalidLogin = false;
            this.router.navigate(['/user']).then(() => {
                window.location.reload();
            });
        }
    }
}