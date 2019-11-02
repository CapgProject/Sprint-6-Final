import { Component, OnInit} from '@angular/core';
import { UserService } from '../_service/app.userservice';
import { User } from '../_model/app.user';
import { Router } from '@angular/router';

@Component({
    selector: 'listuser',
    templateUrl: '../_html/app.listuser.html'
})

export class ListUserComponent implements OnInit{

    users:any[] =[];
    settings = {
        columns: {
          userId: {
            title: 'userId'
          },
          userName: {
            title: 'userName'
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
    constructor(private service:UserService, private router:Router){
    }

    ngOnInit(){
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }
        else{
            this.service.listUsers().subscribe((data:User[]) =>this.users = data);
        }
    }
}   