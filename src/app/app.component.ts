import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from './model';
import { UserService } from './user.service';
import { Http, Response, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
  data:object={};
  arraymsg=[];
  public model=new Model();
  username="codedamn";

  stockQuote:number;
  sub: Subscription;

  constructor(private http: Http,private router:Router,private user:UserService) {

    this.model.isFetch=false;

  }
  
 
  changeUsername(ev){
    
    this.username=ev.target.value;
  }

  // fetchData=function(){
  //   console.log("uname "+this.model.username);
  //   this.http.get("http://localhost:3000/display").subscribe(res=>{
  //     this.model.isFetch=true;
  //     this.model.devices=res.json();
  //     console.log(this.devices);
  //     //return this.devices;
  //   });
  // }

  graph=function(){
    this.router.navigate(['graph']);
  }
  
  
  ngOnInit() {
   
  }
  ngOnDestroy() {
   
  }
}



  

  

  
