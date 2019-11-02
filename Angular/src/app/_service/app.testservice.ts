import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn:'root'
})

export class TestService{
    constructor(private myhttp:HttpClient){}

    addTest(data:any){
        // let form =new FormData();
        // form.append("testName",test1.testName);
        // form.append("testDuration",test1.testDuration);
        // form.append("startTime",test1.startTime);
        // form.append("endTime",test1.endTime);
        // console.log(test1.testName)
        
      //return this.myhttp.post("http://localhost:9088/addtest",form);
        return this.myhttp.post("http://"+window.location.hostname+":9088/addtest",data);
        
    }

    showAllTests(){
        
        return this.myhttp.get("http://"+window.location.hostname+":9088/showalltests");

    }

    deleteTest(testId:number){
        return this.myhttp.delete("http://"+window.location.hostname+":9088/removetestsubmit?testid="+testId);
    }

    searchTest(testId:number){
       
        return this.myhttp.get("http://"+window.location.hostname+":9088/updatetestinput?testid="+testId);

    }

    updateTest(test:any){
        // console.log("Inside updateTest")
        // let form=new FormData();
        // form.append("testName",test.testName);
        // form.append("testDuration",test.testDuration);
        // form.append("startTime",test.startTime);
        // form.append("endTime",test.endTime);
        return this.myhttp.put("http://"+window.location.hostname+":9088/updatetestinput",test);
    }
}