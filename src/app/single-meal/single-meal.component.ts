import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../User.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-single-meal',
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css']
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
      console.log(this.foodPost);
    })  
    this.username = this._userService.readToken().username;
  }
  addToPlan() {
    console.log(this.foodPost.in_plan)
    if(this.foodPost.in_plan != true) {
      console.log('false');
      this.foodPost.in_plan = true;
      this._userService.updateInPlan(this.foodPostId, this.foodPost.in_plan).subscribe(
        (msg) => {
          console.log(msg);
          this.msg = "Added to plan";
        }, 
        (err) => {
          this.msg = "Error adding to plan"
          console.log(err)
        }
      );
    }
    else {
      this.msg = "Already in plan"; 
      console.log('true');
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
          console.log(err);
        }
      ); 
    }


  }
}
