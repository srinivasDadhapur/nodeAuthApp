import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router){}

  canActivate():boolean{
    if(!this.authService.loggedIn()){
        return true;
    }else{
      this.router.navigate(['/dashboard']);
      return false;
    }

  }
}
