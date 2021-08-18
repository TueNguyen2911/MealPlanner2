import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(private _userService: UserService, private router: Router) { }
  canActivate(): boolean {
    if (!this._userService.isAuthenticated()) {
      this.router.navigate(['/login']); 
      return false;
    }
    else if(this._userService.isAuthenticated()) {
      console.log(this.router.url)
    }
    return true;
  }
}
