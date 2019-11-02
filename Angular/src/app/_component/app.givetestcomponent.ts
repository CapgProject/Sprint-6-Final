import { Component, OnInit} from '@angular/core';
import { UserService } from '../_service/app.userservice';
import { Question } from '../_model/app.question';
import { Router } from '@angular/router';

@Component({
    selector: 'givetest',
    templateUrl: '../_html/app.givetest.html'
})

export class GiveTestComponent implements OnInit{

    questions:Question[] =[];
    num:number = 0;
    question:Question;
    constructor(private service:UserService, private router:Router){
    }

    ngOnInit(){
        if(sessionStorage.getItem("role")!= "user"){
            this.router.navigate(['/error403'])
        }
        else{    
            this.service.getQuestions().subscribe((data:Question[]) =>this.questions = data);
        }
    }
    nextQuestion(){
        this.num += 1;
        if(this.num>=this.questions.length){
            alert("Test Finished Successfully");
            this.service.submitTest(this.questions).subscribe(data=>this.router.navigate(['/user']), error=>alert(error.error));
        }
    }






}