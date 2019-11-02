import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private myhttp:HttpClient){}
    
    updateUser(user: any){
        let form = new FormData();
        form.append("userId", user.userId);
        form.append("userName",user.userName);
        form.append("userPassword",user.userPassword);
        return this.myhttp.put("http://"+ window.location.hostname+":9088/updateuser",form);
    }

    assignTest(assign:any){
        return this.myhttp.post("http://"+ window.location.hostname+":9088/assign", assign);
    }

    listUsers(){
        return this.myhttp.get("http://"+ window.location.hostname+":9088/showusers");
    }

    getQuestions(){
        return this.myhttp.get("http://"+ window.location.hostname+":9088/givetest?userid="+ sessionStorage.getItem("userId"));
    }

    submitTest(questions:any[]){
        return this.myhttp.put("http://"+ window.location.hostname+":9088/givetest",questions);
    }

    getResult(){
        return this.myhttp.get("http://"+ window.location.hostname+":9088/getresult?userid="+ sessionStorage.getItem("userId"));
    }

    resultPdf(){
        return this.myhttp.get("http://"+ window.location.hostname+":9088/resultpdf?userid="+ sessionStorage.getItem("userId"), {
        responseType: 'blob'
        });
    }

}