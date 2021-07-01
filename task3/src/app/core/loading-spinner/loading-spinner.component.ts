import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  private subscription: Subscription;
  constructor(private loaderService: LoadingSpinnerService){
    this.subscription = this.loaderService.isLoading.subscribe(res => {
      this.isLoading = res;
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
