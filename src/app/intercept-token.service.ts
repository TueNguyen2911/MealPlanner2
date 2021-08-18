import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor{

  constructor(private _userService: UserService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let customHeader = '';
    if(this._userService.isAuthenticated())
      customHeader = `${this._userService.readToken()._id}`; 
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this._userService.getToken()}`,
        UserId: customHeader
      }
    });
    return next.handle(request);
  }
}
