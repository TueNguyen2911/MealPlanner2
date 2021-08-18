import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../User.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: User;
  public warning = {
    'email': '', 
    'username': '', 
    'password': '', 
    'password2': ''
  }
  public submitted = false;
  public signupForm: any;
  constructor(private _userService: UserService, private router: Router) {
    if(this._userService.isAuthenticated())
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.user = new User();
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required), 
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^[A-Za-z0-9 ]+$/)])
    })
  }
  onSubmit(): void {
    for (var member in this.warning) 
      this.warning[member] = '';
    Object.keys(this.signupForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.signupForm.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              if(keyError == "required")
                this.warning[key] = `${key} is ${keyError}`
              else if(keyError == "minlength") 
                this.warning[key] = `${key} must have at least ${controlErrors[keyError].requiredLength} characters`
              else if(keyError == "pattern")
                this.warning[key] = `${key} must have no special character`
            });
          }
        });
    //if there is no error from passwords FormControls => check 2 passwords
    if(this.warning.password == '' && this.signupForm.get('password').value != this.signupForm.get('password2').value) {
      this.warning.password2 = "Password does not match";
      this.signupForm.status = "INVALID";
      console.log(this.signupForm)
    }
    this.submitted = true;
    console.log(this.signupForm)
    console.log(this.warning)
    if(this.signupForm.status == "VALID")
      this.addNewUser();
  }
  addNewUser() {
    this._userService.addNewUser(this.signupForm.value).subscribe(
      (msg) => {
        console.log(msg); 
        //redirect to log-in
        alert(msg.message); 
        this.router.navigate(['/login'])
    },(err) => {
        console.log(err.error.message);
    })
  }
  }
