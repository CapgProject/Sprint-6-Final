import {Component, OnInit} from '@angular/core';
import {TestService} from '../_service/app.testservice'
import {Test} from '../_model/app.test';
import { Router } from '@angular/router';



@Component({
    selector:'showtest',
    templateUrl:'../_html/app.showalltest.html'
})

export class ShowAllTestComponent implements OnInit{
    update:any;
    tests:any[]=[];

    constructor(private service:TestService, private router:Router){
    }

    settings = {
        columns: {
          testId: {
            title: 'testId'
          },
          testName: {
            title: 'testName'
          },
          testDuration: {
              title: 'testDuration'
          },
          startTime: {
              title: 'startTime'
          },
          endTime: {
              title: 'endTime'
          }
        },
        actions: {
            delete: false,
            add: false,
            edit: false,
            position: 'right'
        },
        pager:{
            display:true,
            perPage: 5
        }
      };

    ngOnInit(){ 
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }else{
            this.service.showAllTests().subscribe((data:Test[])=>this.tests=data);
        }
    }
   
    
}