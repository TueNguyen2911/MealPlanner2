import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMealComponent } from './add-meal/add-meal.component';
import { GuardAuthService } from './guard-auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';

import { SignupComponent } from './signup/signup.component';
import { SingleMealComponent } from './single-meal/single-meal.component';

const routes: Routes = [
  {path: 'sign-up', component: SignupComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [GuardAuthService]},
  {path: 'add-meal', component: AddMealComponent, canActivate: [GuardAuthService]},
  {path: 'single-meal/:foodPostId', component: SingleMealComponent, canActivate: [GuardAuthService]},
  {path: 'meal-plan', component: MealPlanComponent, canActivate: [GuardAuthService]},
  {path: '', redirectTo: '/home', pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
