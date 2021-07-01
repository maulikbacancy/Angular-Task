import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/sevices/auth.service';
import { ProductService } from '../../core/sevices/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated = false;
  private userSub: Subscription;
  public productTitle:string;
  public searchShow = true;
  public photoUrl = "";
  public email = "";

  constructor(
      private authService: AuthService, 
      private route: ActivatedRoute,
      private productService: ProductService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      
      if(!!user) {
        this.isAuthenticated = true;
        this.photoUrl = user.photoUrl;
        this.email = user.email;
      }
      else {
        this.isAuthenticated = false;
      }
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public search(): void {
    this.productService.productTitle.next(this.productTitle);
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
