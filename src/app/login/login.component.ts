import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  public warning: any;
  userData: any;
  login_form;
  submitted = false;
  found = true;
  constructor(private _userService: UserService, private router: Router) {
    if(this._userService.isAuthenticated())
    this.router.navigate(['/home']);
   }

  ngOnInit(): void {

    this.login_form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.user = new User();
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

    console.log(allClasses);
  } 
  onSubmit() {
    this.submitted = true; 
    this._userService.login(this.user).subscribe((success) => {
      localStorage.setItem('access_token', success.token);
      console.log(this._userService.readToken());

    }, (err) => {
      this.found = false;
      this.warning = err.error.message;
      console.log(err);
    }, () => {
      alert('Logging in succesfully');
      this.router.navigate(['/home']);
    })
    //this.onLoginClicked();

  }
  showForm(form: any) {
    return form.controls['username'].value;
  }
}
