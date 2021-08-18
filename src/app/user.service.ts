import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './User';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable()
export class UserService {
  api_url: string = 'https://mealplanapi.herokuapp.com/api';//'http://localhost:8080/api';
  constructor(private http: HttpClient, private router: Router) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }
  public readToken(): any{
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use this.jwtHelper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('token exists');
      console.log(this.readToken());
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }
  getFoodPosts(): Observable<any> {
    let api = this.api_url + "/food-posts";
    console.log(api);
    return this.http.get<any>(api);
  }
  getFoodPostById(id) {
    return this.http.get<any>(this.api_url + `/single-post/${id}`);
  }
  login(user: User): Observable<any> {
    console.log(this.api_url);
    return this.http.post<any>(this.api_url + "/login", user);
  }
  logOut() {
    localStorage.removeItem('access_token'); 
  }
  getImgUrl(img: File): Observable<any> {
    let formData = new FormData();
    formData.append('img', img);
    return this.http.post<any>(this.api_url + "/img-upload", formData);
  }
  addFoodPost(formData: any): Observable<any> {
    console.log('from addFoodPost ', formData);
    return this.http.post<any>(this.api_url + "/add-post", formData);
  }
  updateInPlan(food_id: any, in_plan: any): Observable<any> {
    let data = {
      in_plan: in_plan
    }
    return this.http.put<any>(this.api_url + `/update-in_plan/${food_id}`, data);
  }
  getFoodInPlan() : Observable<any> {
    return this.http.get<any>(this.api_url + "/food-in-plan");
  }
  updateMacro(macro: any) : Observable<any> {
    console.log('update', macro)
    
    return this.http.put<any>(this.api_url + "/update-macro", macro);
  }
  getMacro() : Observable<any> {
    return this.http.get<any>(this.api_url + "/macro");
  }
  //sign-up
  addNewUser(signupForm: any) : Observable<any> {
    return this.http.post<any>(this.api_url + "/sign-up", signupForm);
  }
}
