import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/sevices/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/sevices/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public page:number = 1;
  public searchText: String;
  private subscriptions: Subscription[] = [];

  constructor(
      private productService: ProductService, 
      private router: Router,
      private toastr: ToastrService,
      private cartService: CartService) { }

  ngOnInit(): void {
    this.getProduct();
    let subscription: Subscription;
    subscription = this.productService.productTitle.subscribe(title => {
      this.page = 1;
      this.searchText = title;
    });
    this.subscriptions.push(subscription);
  }

  private getProduct(): void {
    let subscription: Subscription;
    subscription = this.productService.getProducts().subscribe(
      requestedData => {
        this.products = requestedData;
      }
    )
    this.subscriptions.push(subscription);
  }

  public onDeleteProduct(id: string): void {
    let subscription: Subscription;
    let product: Product;
    product = this.products.find(e => e.id === id);
    if (confirm('Are you sure want to delete ?')) {
      subscription = this.productService.deleteProduct(id).subscribe(res => {
        this.products = this.products.filter(
          (value) => value.id !== id
        );
        this.toastr.warning(product.title+' was deleted!','Deleted');
      });
    }
    this.subscriptions.push(subscription);
  }

  public onEditProduct(product: Product): void {
    this.productService.editableProduct = product;
    this.router.navigate(['/product/'+product.id])
  }

  public onAddToCart(id: String): void {
    let subscription: Subscription;
    let product: Product;
    product = this.products.find(e => e.id === id);
    subscription = this.cartService.addToCart(id).subscribe(res => {
      this.toastr.success(product.title+'added successfully!','Successfull');
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
}
