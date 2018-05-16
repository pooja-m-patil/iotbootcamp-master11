import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Model } from '../model';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  public model=new Model();
  constructor(private http: Http) { }

  addNewProduct=function(product)
  {
    
    console.log("hello");
    this.productObj={
    "devicename":product.devicename,
    "devicetype":product.devicetype,
    "deviceclass":product.classname,
    "devicedesc":product.subject
    }
    console.log(product.devicename+" "+product.devicetype+" "+product.classname+" "+product.subject);
    this.http.post("http://localhost:3000/display/add",this.productObj).subscribe((res:Response) => {
    this.model.isAdded=true;
    //console.log(res);
    this.model.auth=res['_body'];
    //console.log("$$$"+this.model.auth);

    //return this.auth;
    })
    console.log(this.model.auth);
  }

  ngOnInit() {
  }

}
