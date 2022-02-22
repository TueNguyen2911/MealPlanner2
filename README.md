# MealPlanner App
With this application, you can add your favorite recipe with details to your collection, plan your meals and macro. 

API for this app: https://github.com/TueNguyen2911/MealPlanAPI

Link demo: https://mealplan-d4c71.web.app

Video demo: https://www.youtube.com/watch?v=oNdq-oKJH1A&t=6s

## Features:

### Home page

https://user-images.githubusercontent.com/58532267/155219785-ecd5048d-0335-44c6-a1f6-48b5960bc1a5.mp4

### Sign-up & Log-in: 

https://user-images.githubusercontent.com/58532267/155219072-bb0d125f-6701-4498-bbd6-f24a4ce1a8ee.mp4

### Add meal:

https://user-images.githubusercontent.com/58532267/155219682-ef67a898-cbc8-4a16-9588-71a51898bfa9.mp4

### Meal plan and macro tracking:

https://user-images.githubusercontent.com/58532267/155220245-ba7208e5-310e-4cc5-9ec3-5cb79efab590.mp4

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


