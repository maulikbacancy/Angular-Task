import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/sevices/cart.service';
import { Product, ProductCart } from '../../core//models/product.model';
import { ProductService } from '../../core/sevices/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private cartApiRes: ProductCart[];
  public products: Product[] = [];
  private index = 0;
  public searchText: String;
  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProduct();
    let subscription: Subscription;
    subscription = this.productService.productTitle.subscribe(
      (data: String) => {
        this.searchText = data;
      }
    )
    this.subscriptions.push(subscription);
  }

  private getProduct(): void {
    let subscription: Subscription;
    subscription = this.cartService.getCartProducts().subscribe(
      requestedData => {
        this.cartApiRes = requestedData;
        let n:number;
        let index = 0;
        for(let i=0;i<this.cartApiRes.length;i++) {
          let n = this.cartApiRes[i].products.length;
          let cartItem = this.cartApiRes[i].products;
          for(let j=0;j<n;j++) {
            this.getSingleProductById(cartItem[j].productId,cartItem[j].quantity);
          }
        }
      }
    )
    this.subscriptions.push(subscription);
  }

  private getSingleProductById(id: number,quantity:number): void {
    let subscription: Subscription;
    subscription = this.productService.getProductsById(id).subscribe(
      res => {
        this.products[this.index] = res;
        this.products[this.index].quantity = quantity;
        this.index++;
      }
    );
    this.subscriptions.push(subscription);
  }

  public onDelete(id: String): void {
    let subscription: Subscription;
    if (confirm('Are you sure want to delete ?')) {
      subscription = this.cartService.deleteCart().subscribe(
        res => {
          this.products = this.products.filter(
            (value) => value.id !== id
          );
          this.toastr.warning('product removed from cart!', 'Deleted!');
        }
      )
    }
    this.subscriptions.push(subscription);
  }

  public onEditQuantity(productId: number, quantity: number, productTitle: string): void {
    let subscription: Subscription;
    subscription = this.cartService.updateQuantity(productId,quantity).subscribe(res => {
      this.toastr.success(productTitle+': '+quantity, 'Quantity Updated!')
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy():void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
