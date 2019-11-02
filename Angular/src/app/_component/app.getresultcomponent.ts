import { Component, OnInit} from '@angular/core';
import { UserService } from '../_service/app.userservice';
import {saveAs} from 'file-saver';
import { Router } from '@angular/router';

@Component({
    selector: 'listuser',
    templateUrl: '../_html/app.getresult.html'
})

export class GetResultComponent implements OnInit{

    header:string;
    constructor(private service:UserService, private router:Router){
        console.log("In Constructor");
    }

    ngOnInit(){
        if(sessionStorage.getItem("role")!= "user"){
            this.router.navigate(['/error403'])
        }
        else{
            this.service.getResult().subscribe((data:string) =>this.header =data);
        }
    }
    resultPdf(){
        this.service.resultPdf().subscribe(response => {
            const blob = new Blob([response], {type: 'application/pdf'});
            saveAs(blob, 'Result.pdf');})
    }

}