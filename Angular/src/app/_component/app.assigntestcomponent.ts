import { Component, OnInit} from '@angular/core';
import { UserService } from '../_service/app.userservice';
import { e } from '@angular/core/src/render3';
import { empty } from 'rxjs';
import { AssignTestData } from '../_model/app.assigntestdata';
import { Router } from '@angular/router';

@Component({
    selector: 'assign',
    templateUrl: '../_html/app.assign.html'
})

export class AssignTestComponent implements OnInit {
    constructor(private service:UserService, private router:Router){
        console.log("In Constructor");
    }
    ngOnInit(){
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }
    }
    assign:AssignTestData = {userId: null, testId: null};
    testIdError:string = null;
    validateTestId():boolean{
        if(this.assign.testId == null){
            this.testIdError = "Test id cannot be empty";
            return false;
        }
        else{
            this.testIdError = null;
            return true;
        }
    }

    userIdError:string = null;
    validateUserId():boolean{
        if(this.assign.userId == null){
            this.userIdError = "User id cannot be empty";
            return false;
        }
        else{
            this.userIdError = null;
            return true;
        }
    }
    assignTest(){
        if(this.validateTestId() &&this.validateUserId){
            this.service.assignTest(this.assign).subscribe(data=> {alert(data); this.router.navigate(['/admin']);}, error=>{alert(error.error);});
        }
    }
}   