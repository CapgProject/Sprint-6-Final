import { Component } from "@angular/core";
import { QuestionService } from "../_service/app.questionservice";
import { Question } from "../_model/app.question";
import { Router } from "@angular/router";

@Component({
    selector:'showquestion',
    templateUrl:'../_html/app.showquestion.html'
})
export class ShowQuestion{
    questions:Question[];
    constructor(private service:QuestionService, private router:Router){}

    settings = {
        columns: {
          questionId: {
            title: 'Question Id'
          },
          questionTitle: {
            title: 'Question Title'
          },
          questionOptions: {
            title: 'Options'
          },
          questionMarks: {
            title: 'Total Marks'
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
        }
    }
    showAllQuestions(id:number){
        this.service.showAllQuestions(id).subscribe((data:Question[])=>{this.questions=data}, error=>{alert(error.error)});
    }
}