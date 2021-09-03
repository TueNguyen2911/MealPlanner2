import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../User.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['../app.component.css', './meal-plan.component.css']
})
export class MealPlanComponent implements OnInit, OnDestroy {
  public navToggled = false;
  public foodPosts: Array<any>;
  public username: string;
  public macro = {
    calories: null, 
    protein: null,
    carb: null, 
    fat: null
  }; 
  constructor(private _userService: UserService) {
    this._userService.getFoodInPlan().subscribe(
      (data) => {
        if(typeof data != "string")
        this.foodPosts = data; console.log(this.foodPosts)
      }, 
      (err) => console.log(err)
    );
    this._userService.getMacro().subscribe(
      (data) => {
        console.log('macro data', data);
        if(data != null)
        this.macro = data; 
        //console.log(this.macro); 
      },
      (err) => console.log(err)
    );
  }
  logOut() { 
    this._userService.logOut();
    window.location.reload();
  }
  ngOnInit(): void {
    this.username = this._userService.readToken().username;
  }
  sideNavToggle(): void {
    this.navToggled = !this.navToggled;
  }
  removeInPlan(food_id) : void {
    this._userService.updateInPlan(food_id, false).subscribe(
      (msg) => {
        console.log(msg);
        window.location.reload();
      }, 
      (err) => console.log(err)
    );
    
  }
  ngOnDestroy(): void { 
    console.log('yeah');
    this._userService.updateMacro(this.macro).subscribe(); 
  }
}
