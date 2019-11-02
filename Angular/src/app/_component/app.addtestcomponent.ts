import {Component, OnInit} from '@angular/core';
import { TestService } from '../_service/app.testservice';
import {Router} from '@angular/router';




@Component({
    selector:'test',
    templateUrl:'../_html/app.addtest.html'
})

export class AddTestComponent implements OnInit {
  
   model:any={testId:null,testName:null,testDuration:null, startTime:null,endTime:null};
  
   ngOnInit(){
    if(sessionStorage.getItem("role")!= "admin"){
        this.router.navigate(['/error403'])
    }
}

    constructor(private service:TestService,private router:Router){} 
    nameError="";
    validateTestName(){
      var name = new RegExp(/^[A-Z][A-Za-z 0-9]{3,20}$/);
      if(!name.test(this.model.testName)){
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
      if(!pattern.test(this.model.testDuration)){
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
        
      var startdate=Date.parse(this.model.startTime);
      var currentdate=new Date().getTime();
        if(this.model.startTime==null){
          this.startTimeError="Start Time cannot be empty."
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
      var startdate=Date.parse(this.model.startTime);
      var startDateMs=startdate + 365*24*60*60*1000
      var enddate=Date.parse(this.model.endTime);
      var currentdate=new Date().getTime();
      if(this.model.endTime==null){
          this.endTimeError="End Time cannot be empty!"
          return false;
        }
      else if(startdate>enddate){
          this.endTimeError="End time cannot be before Start Time!"
          return false;
      }
      else if(currentdate>enddate){
        this.endTimeError="End time cannot be in the past!"
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

    
   

    addTest():any{
      if(this.validateTestName() && this.validateTestDuration && this.validateStartTime && this.validateEndTime){
        if( this.model.testName!=null && this.model.testDuration!=null && this.model.startTime!=null && this.model.endTime!=null)

          this.service.addTest(this.model).subscribe((success)=>{alert(success);this.router.navigate(['/admin']);},error=>{alert(error.error);})

      }
    }
    }

    




   
  
