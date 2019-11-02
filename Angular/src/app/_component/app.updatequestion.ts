import { Component, OnInit } from "@angular/core";
import { Question } from "../_model/app.question";
import { QuestionService } from "../_service/app.questionservice";
import { Test } from "../_model/app.test";
import { Router } from "@angular/router";

@Component({
    selector:'updatequestion',
    templateUrl:'../_html/app.updatequestion.html'
})
export class UpdateQuestion implements OnInit{

    questionid:number;
    question:Question;

    constructor(private service:QuestionService, private router:Router){}
    ngOnInit(){
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }
    }
    error_id = null;
    validateQuestionId():boolean{
        if(this.questionid == null){
            this.error_id = "Question Id field cannot be empty!";
            return false;
        }
        else{
            this.error_id = null;
            return true;
        }
    }

    searchQuestion(){
        if(this.validateQuestionId()){
            this.service.searchQuestion(this.questionid).subscribe((data:Question)=>{this.question=data}, error=>{alert(error.error)});
        }
    }

    updateQuestion(){
        if(this.validateTitle() && this.validateOptions() && this.validateAnswer() && this.validateMarks()){
            this.service.updateQuestion(this.question).subscribe((data:string)=>{alert(data); this.router.navigate(['/admin']);}, error=>{alert(error.error)});
            this.question=null;
        }
    }

    error_title:string=null;
    validateTitle():boolean{
        if(this.question.questionTitle.length < 6){
            this.error_title = "Length of question should be atleast 6 characters!";
            return false;
        }
        else{
            this.error_title = null;
            return true;
        }
    }

    error_options = null;
    validateOptions(){
        var values = this.question.questionOptions.toString();
        var result = values.split(",");
        var result_length = result.length;

        if(this.question.questionOptions == null){
            this.error_options = "Question Options field cannot be empty!"
            return false;
        }
        else{
            if(result_length != 4){
                this.error_options = "Only 4 comma separated options allowed!";
                return false;
            }
            else{
                this.error_options = null;
                return true;
            }
        }
    }

    error_answer:string=null;
    validateAnswer(){
        if(this.question.questionAnswer == null){
            this.error_answer = "Question Answer field cannot be empty!";
            return false;
        }
        else{
            if(this.question.questionAnswer == 1 || this.question.questionAnswer == 2 || this.question.questionAnswer == 3 || this.question.questionAnswer == 4){
                this.error_answer = null;
                return true;
            }
            else{
                this.error_answer = "Question Answer can be between 1 and 4 only!";
                return false;
            }
        }
    }

    error_marks:string=null;
    validateMarks(){
        if(this.question.questionMarks != null){
            this.error_marks = null;
            return true;
        }
        else{
            this.error_marks = "Question Marks field cannot be empty!";
            return false;
        }
    }
}