# MealPlanner App
With this application, you can add your favorite recipe with details to your collection, plan your meals and macro. 
API for this app: https://github.com/TueNguyen2911/MealPlanAPI
Link demo: https://mealplan-d4c71.web.app
# Lesson learnt: 
## Reactive Form: 
Take a look at add-meal component for reference. 
## Sending JWT back to server: 
Before the request is sent, we use `HttpInterceptor` to add custom authentication header (JWT token)
## Guarding routes: 
Using `CanActivate` interface
Specify callback canActive to use which module 
```javascript 
{path: 'home', component: HomeComponent, canActivate: [GuardAuthService]}
```


