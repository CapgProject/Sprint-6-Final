import {Component, OnInit} from '@angular/core'
import { TestService } from '../_service/app.testservice'
import { Test } from '../_model/app.test';
import { Router } from '@angular/router';

@Component({
    selector:'removetest',
    templateUrl:'../_html/app.removetest.html'
})

export class RemoveTestComponent {
   testList:Test[]=[];
   
   public popoverTitle:string="Delete Confirmation";
   public popoverMessage:string="Do you really want to delete the test with testId ";
   public confirmClicked:boolean=false;
   public cancelClicked:boolean=false;
    router: any;
    constructor(private service:TestService){
    }
    ngOnInit(){
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }
    }
    // ngOnInit():void{
    //     this.service.showAllTests().subscribe((data:Test[])=>this.testList=data);
    // }
    deleteTest(testId:any):any{

        
        this.service.deleteTest(testId).subscribe((success:string)=>{alert(success);this.router.navigate(['/admin']);},error=>{alert(error.error);});
        
    }
    

}

