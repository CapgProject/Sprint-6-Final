import {Component, OnInit} from '@angular/core'
import { Test } from '../_model/app.test';
import { TestService } from '../_service/app.testservice';
import {Router} from '@angular/router'


@Component({
    selector:'updatetest',
    templateUrl:'../_html/app.updatetest.html'
})

export class UpdateTestComponent implements OnInit {
    
    testId:number;
    test:Test

    constructor(private service:TestService,private router:Router){
      
    }
    ngOnInit(){
      if(sessionStorage.getItem("role")!= "admin"){
          this.router.navigate(['/error403'])
      }
  }
    nameError="";
    validateTestName(){
      var name = new RegExp(/^[A-Z][A-Za-z 0-9]{3,20}$/);
      if(!name.test(this.test.testName)){
        this.nameError = "First Letter should be capital with 3-20 characters"
        return false;
    }
    else{
        this.nameError = "";
        return true;
    }
    }
    durationError="";
    validateTestDuration():boolean{
      var pattern = new RegExp(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/i);
      if(!pattern.test(this.test.testDuration)){
        this.durationError="Enter duration in 'HH:mm:ss' format only!"
        return  false;
      }
      else{
        this.durationError="";
        return true;
      }

    }
    startTimeError="";
    validateStartTime():boolean{
     
      var startdate=Date.parse(this.test.startTime);
      var currentdate=new Date().getTime();
     
        if(this.test.startTime==null){
        this.startTimeError="Start Time cannot be empty."
        this.endTimeError=""
        return false;
        
      }
      else if(currentdate>startdate){
        this.endTimeError="Start time cannot be in the past!"
        return false;
      }
      else{
        this.startTimeError="";
        return true;
      }

    }
    
    endTimeError="";
    validateEndTime():boolean{
      var startdate=Date.parse(this.test.startTime);
      var startDateMs=startdate + 365*24*60*60*1000
      var enddate=Date.parse(this.test.endTime);
     
      if(this.test.endTime==null){
       this.endTimeError="End Time cannot be empty"
        return false;
      }
      else if(startdate>enddate){
        this.endTimeError="End time cannot be before Start Time!"
        return false;

      }
      else if(enddate>startDateMs){
        this.endTimeError="Test cannot be assigned for more than one year!"
        return false;
      }
      
      else{
        this.endTimeError="";
        return true;
      }

  } 
   
    searchTest(testId:number){
            this.service.searchTest(testId).subscribe((data:Test)=>this.test=data);
          // this.service.searchTest(testId).subscribe((data:Test)=>{this.test=data}, error=>{alert(error.error)})
            
        
    }

    updateTest(){
       if(this.validateTestName() && this.validateTestDuration() && this.validateStartTime() && this.validateEndTime()){
        this.service.updateTest(this.test).subscribe((data)=>{alert(data);this.router.navigate(['/admin']);},error=>alert(error.error));
        //this.service.updateTest(this.test).subscribe((success:string)=>{alert(success);this.router.navigate(['/admin']);},error=>{alert(error.error);})
       }
    }
}