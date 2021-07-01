import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../../core/sevices/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  public isLoginMode = true;
  private authObsSubscription: Subscription;
  user: any;
  loggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private _authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this._authService.authState.subscribe((user: SocialUser ) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    this.authObsSubscription = authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['product']);
        this.toastr.success(email,'Welcome!');
      }
    );

    form.reset();
  }

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.authService.handleAuthentication(res.name, res.response.access_token, res.photoUrl);
      this.router.navigate(['product']);
      this.toastr.success(res.name,'Welcome!');     
    });
  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      
      this.authService.handleAuthentication(res.name, res.authToken, res.photoUrl);
      this.router.navigate(['product']);
      this.toastr.success(res.name,'Welcome!');     
    });
  }

  ngOnDestroy(): void {
    if(this.authObsSubscription) {
      this.authObsSubscription.unsubscribe();
    }
  }


}
