import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';

@Component({
  selector: 'app-device-discovery',
  templateUrl: './device-discovery.component.html',
  styleUrls: ['./device-discovery.component.css']
})
export class DeviceDiscoveryComponent implements OnInit {

  wsdata=[];
  stockQuote=[];
  sub: Subscription;
  isAdded:boolean=false;
  temp:any
  obj:object;
  flag:number;

  constructor(private http:Http,private dataService: DataService) { }

  discdevice=function(id){
    console.log("hello");
    this.productObj={
    "devicename":id
    }
    console.log(id);
    this.http.post("http://192.168.31.133:3000/display/add",this.productObj).subscribe((res:Response) => {
    
    console.log(res);
    this.temp=res['_body'];
    console.log(this.temp);
    this.isAdded=true;
    this.obj={
      "added":this.temp,
      "id":id
    }
     this.http.post("http://192.168.31.133:3000",this.obj).subscribe((res:Response) => {
      // for(let i=0;i<this.stockQuote.length;i++){
      //   if(id==this.stockQuote[i]){
      //     for(let j=i;j<this.stockQuote.length;j++){
      //       this.stockQuote[i]=this.stockQuote[i+1];
      //     }
      //   }
      // }

      // for(let i=0;i<this.stockQuote.length;i++){
      //   if(id==this.stockQuote[i]){
      //     for(let j=i;j<this.stockQuote.length-1;j++){
      //            this.stockQuote[j]=this.stockQuote[j+1];
      //            this.stockQuote[j+1]="";
      //       }
      //   }
      // }
     
    })
     })
    
  }

  

  ngOnInit() {
   
    this.http.post("http://192.168.31.133:3000","").subscribe(res=>{
      console.log(res);
      this.flag=0;
      this.sub = this.dataService.getQuotes()
      .subscribe(quote => {
        console.log(quote);
        for(let i=0;i<this.stockQuote.length;i++)
        {
          if(quote==this.stockQuote[i]){
            this.flag=this.flag+1;
          }
        }
        console.log(this.flag);
        if(this.flag==0){
         this.stockQuote.push(quote);
        }
      });

      

      console.log(this.stockQuote);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
