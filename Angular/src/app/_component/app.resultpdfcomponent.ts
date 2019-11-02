import { Component, OnInit } from '@angular/core';
import {saveAs} from 'file-saver';
import { UserService } from '../_service/app.userservice';
 
@Component({
  selector: 'example-app',
  template: `
  
  `
})
export class ResultPdfComponent implements OnInit{

    pdfSrc:File;
    constructor(private service:UserService){
        console.log("In Constructor");
    }

    ngOnInit(){
        
    }

}