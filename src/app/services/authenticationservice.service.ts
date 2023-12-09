import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  setLoggedIn(value: boolean):void {
    this.isLoggedInSubject.next(value);
  }

  isLoggedIn(): Observable<boolean>{
    return this.isLoggedInSubject.asObservable().pipe(distinctUntilChanged());;
  }

}
