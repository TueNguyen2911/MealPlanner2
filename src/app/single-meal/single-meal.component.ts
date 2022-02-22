import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../User.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-single-meal',
  templateUrl: './single-meal.component.html',
  styleUrls: ['../app.component.css', './single-meal.component.css']
})
export class SingleMealComponent implements OnInit {
  public navToggled = false;
  public foodPostId = 0;
  public foodPost: any;
  public msg = "";
  public username;

  constructor(private _userService: UserService, private activated_route: ActivatedRoute, private route: Router) {
    this.activated_route.params.subscribe((params) => {
      this.foodPostId = params.foodPostId;
    });
   }
  sideNavToggle(): void {
    this.navToggled = !this.navToggled;
  }
  logOut() {
    this._userService.logOut();
    window.location.reload();
  }
  ngOnInit(): void {
    //get Food Post Id from service
    this.foodPost = this._userService.getFoodPostById(this.foodPostId).subscribe((data) => {
      this.foodPost = data;
    })
    this.username = this._userService.readToken().username;
  }
  addToPlan() {
    if(this.foodPost.in_plan != true) {
      this.foodPost.in_plan = true;
      this._userService.updateInPlan(this.foodPostId, this.foodPost.in_plan).subscribe(
        (msg) => {
          console.log(msg);
          this.msg = "Added to plan";
        },
        (err) => {
          this.msg = "Error adding to plan"
          console.error(err)
        }
      );
    }
    else {
      this.msg = "Already in plan";
    }
    setTimeout(() => this.msg = "", 5000);
  }
  deletePost(): void {
    if(window.confirm("Delete this meal?") === true) {
      console.log('true')
      this._userService.deletePost(this.foodPostId).subscribe(
        (msg) => {
          console.log(msg);
          window.alert(msg);
          this.route.navigate(['/home']);
        },
        (err) => {
          console.error(err);
        }
      );
    }


  }
}
