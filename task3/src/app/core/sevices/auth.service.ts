import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  tap } from 'rxjs/operators';
import {  BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface AuthResponseData {
  token: string;
  id?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public user = new BehaviorSubject<User>(null);
  private readonly authAPI = 'https://reqres.in/api/';

  public signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        this.authAPI+'register',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        tap(resData => {
          this.handleAuthentication(email,resData.token,"");
        })
      );
  }

  public login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        this.authAPI+'login',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        tap(resData => {
          this.handleAuthentication(email,resData.token,"");
        })
      );
  }

  public isAuthenticated(): boolean {
    const userData: {
      email: string;
      _token: string;
      photoUrl: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {        
      return false;
    }
    else {
      const loadedUser = new User(
        userData.email,
        userData._token,
        userData.photoUrl
      );
  
      if (loadedUser.token) {        
        this.user.next(loadedUser);
        return true;
      }        
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  public handleAuthentication(email: string,token: string, photoUrl: string): void {
    const user = new User(email, token, photoUrl);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

 
}
