import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authenticationservice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate {
  
  constructor(
    private authSerivce: AuthenticationService,
    private router: Router
  ){}

  canActivate(): boolean{

    console.log(!this.authSerivce.isLoggedIn())
    
    if (!this.authSerivce.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }    

    return true;
  }

};
