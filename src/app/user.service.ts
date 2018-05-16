import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor() {
    this.isUserLoggedIn=false;
   }

   setUserLoggedIn() {
     this.isUserLoggedIn=true;
   }

   getuserLoggedin() {
     return this.isUserLoggedIn;
   }
}
