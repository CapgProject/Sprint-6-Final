import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class QuestionService{
     
    headers:any;
    constructor(private myhttp:HttpClient){
        this.headers = new HttpHeaders().set("Authorization", sessionStorage.getItem("token"));
    }

    addQuestionExcel(form){
        return this.myhttp.post("http://"+window.location.hostname+":9088/addquestionsubmit",form);
    }

    addQuestionForm(id:number, question:any){
        let form = new FormData();
        form.append("questionTitle",question.questionTitle);
        form.append("questionOptions",question.questionOptions);
        form.append("questionAnswer",question.questionAnswer);
        form.append("questionMarks",question.questionMarks);
        return this.myhttp.post("http://"+window.location.hostname+":9088/addsinglequestion?testid="+id,form);
    }

    deleteQuestion(id:number){
        return this.myhttp.delete("http://"+window.location.hostname+":9088/removequestionsubmit?questionid="+id);
    }

    showAllQuestions(id:number){
        return this.myhttp.get("http://"+window.location.hostname+":9088/listquestionsubmit?testId="+id);
    }

    searchQuestion(id:number){
        return this.myhttp.get("http://"+window.location.hostname+":9088/searchquestion?id="+id);
    }

    updateQuestion(question:any){
        console.log(question);
        return this.myhttp.put("http://"+window.location.hostname+":9088/updatequestionsubmit",question);
    }
}