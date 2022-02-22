import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
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
    });
    this.username = this._userService.readToken().username;

  }
  sideNavToggle(): void {
    this.navToggled = !this.navToggled;
    var allClasses = [];
    var allElements = document.querySelectorAll('*');
    for (var i = 0; i < allElements.length; i++) {
      var classes = allElements[i].className.toString().split(/\s+/);
      for (var j = 0; j < classes.length; j++) {
        var cls = classes[j];
        if (cls && allClasses.indexOf(cls) === -1)
          allClasses.push(cls);
      }
    }
  }
  logOut() {
    this._userService.logOut();
    window.location.reload();
  }
}
