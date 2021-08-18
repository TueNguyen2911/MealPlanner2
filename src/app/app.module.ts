import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {InterceptTokenService} from './intercept-token.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './User.service';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AddMealComponent } from './add-meal/add-meal.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SingleMealComponent } from './single-meal/single-meal.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddMealComponent,
    SingleMealComponent,
    MealPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule, 
    MatFormFieldModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptTokenService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
