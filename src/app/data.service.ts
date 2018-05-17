import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from './interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket;
  observer: Observer<any>;

  getQuotes() : Observable<any> {
    this.socket = socketIo('http://192.168.31.133:3000');

    this.socket.on('message', (res) => {
      this.observer.next(res.devId);
      console.log(res.devId);
    });

    return this.createObservable();
  }

  createObservable() : Observable<any> {
      return new Observable(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}