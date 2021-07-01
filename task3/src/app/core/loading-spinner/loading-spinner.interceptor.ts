import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from './loading-spinner.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

  constructor(private loading: LoadingSpinnerService, private tostr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loading.show();
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.loading.hide();
      }
    },
      (err: any) => {
        this.loading.hide();
        this.tostr.error('Oops something went wrong', 'Aleart!');
    }));
  }
}
