import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-device-discovery',
  templateUrl: './device-discovery.component.html',
  styleUrls: ['./device-discovery.component.css']
})
export class DeviceDiscoveryComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get("http://localhost:3000").subscribe(res=>{
      console.log(res);

      var socket=io.connect('http://localhost:3000');
      
      socket.on('message',(data) =>console.log(data)
      );
  
    })
  }

}
