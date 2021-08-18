import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodPosts: any;
  public navToggled = false;
  public username: string;
  constructor(private _userService: UserService) {

   }

  ngOnInit(): void {
    this._userService.getFoodPosts().subscribe((data) => {
      this.foodPosts = data;
      console.log(this.foodPosts);
    });
    this.username = this._userService.readToken().username;

  }
  sideNavToggle(): void {
    this.navToggled = !this.navToggled;
  }
  logOut() { 
    this._userService.logOut();
    window.location.reload();
  }
}
