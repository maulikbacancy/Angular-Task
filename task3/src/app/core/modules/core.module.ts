import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerInterceptor } from '../loading-spinner/loading-spinner.interceptor';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoadingSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }