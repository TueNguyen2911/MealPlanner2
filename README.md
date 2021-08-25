# MealPlanner App
With this application, you can add your favorite recipe with details to your collection, plan your meals and macro. 

API for this app: https://github.com/TueNguyen2911/MealPlanAPI

Link demo: https://mealplan-d4c71.web.app

Video demo: https://www.youtube.com/watch?v=oNdq-oKJH1A&t=6s
# Lesson learnt: 

## Reactive Form: 
Take a look at add-meal component for reference. 

## Sending JWT back to server: 
Before the request is sent, we use `HttpInterceptor` to add custom authentication header (JWT token)
```javascript 
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
```

## Guarding routes: 
Using `CanActivate` interface
Specify callback canActive to use which module 
```javascript 
{path: 'home', component: HomeComponent, canActivate: [GuardAuthService]}
```


