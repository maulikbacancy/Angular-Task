import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../core/modules/shared.module';
import { LoggedinGuard } from '../../core/guard/loggedin.guard';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SocialLoginModule,
    RouterModule.forChild([{ path: '', component: AuthComponent , canActivate: [LoggedinGuard]}])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '820330203189-fmg3lossk5q6ms8m1dkl22v7b5umrvrb.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('399011808113075')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthModule { }
