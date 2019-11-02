
import { Component, OnInit } from "@angular/core";
import { Question } from "../_model/app.question";
import { QuestionService } from "../_service/app.questionservice";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";

@Component({
    selector:'addquestion',
    templateUrl:'../_html/app.addquestion.html'
})


export class AddQuestion implements OnInit{ 
    exFile:any;

    buttonVal:boolean=false;
    question:Question={
        questionId:null,
        questionTitle:"",
        questionAnswer:null,
        questionMarks:null,
        questionOptions:[],

        chosenAnswer:0,

        test:null
    };
    testid:any;
    testId:number;

    sMsg:string;

    ngOnInit(){
        if(sessionStorage.getItem("role")!= "admin"){
            this.router.navigate(['/error403'])
        }
    }

    changeButtonValue(value:boolean){
        if(value==true){
            this.buttonVal=false;
        }
        else{
            this.buttonVal=true;
        }
    }

    constructor(private service:QuestionService, private router:Router){}


    getFileDetails (e:any) {
        console.log(e.target.files);
        for (var i = 0; i < e.target.files.length; i++) { 
            this.exFile = e.target.files[i];
          }
        this.validateExcel();
      }
    uploadFiles () {
        if(this.validateExcel() && this.validateId()){
            const frmData = new FormData();
            frmData.append("exfile", this.exFile);
            frmData.append("testid", this.testid);
            this.service.addQuestionExcel(frmData).subscribe(
            success => {alert(success); this.router.navigate(['/admin']);}, error=>{ alert(error.error); });
        }

    }
    addThroughForm(){
        if(this.validateTestId() && this.validateTitle() && this.validateOptions() && this.validateAnswer() && this.validateMarks()){
            this.service.addQuestionForm(this.testId, this.question).subscribe((success:string)=>{alert(success);this.router.navigate(['/admin']);},error=>{alert(error.error);})
        }
       
    }

    iderror:string=null;
    validateId():boolean{
        if(this.testid != null){
            this.iderror = null;
            return true;
        }
        else{
            this.iderror = "Test Id field cannot be empty!";
            return false;
        }
    }
    
    file_error = null
    error_file:boolean = false
    validateExcel():boolean{
        var filename = this.exFile.name;
		var extension = filename.substr(filename.lastIndexOf(".")+1);
		if(extension != "xlsx"){
            this.error_file = true;
            this.file_error = "The extension must be .xlsx";
            return false;
        }
		else{
            this.file_error = null
            return true;
        }
    }

    error_id:string=null;
    validateTestId():boolean{
        if(this.testId != null){
            this.error_id = null;
            return true;
        }
        else{
            this.error_id = "Test Id field cannot be empty!";
            return false;
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