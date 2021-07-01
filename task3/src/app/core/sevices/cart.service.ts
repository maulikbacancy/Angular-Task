import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
    ) { }

  private readonly _url = 'https://fakestoreapi.com/carts';

  public getCartProducts(): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(this._url+ '/user/2');
  }

  public addToCart(id: String): Observable<ProductCart> {
    let cartProduct = new ProductCart(5, new Date(), {productId: +id,quantity: 1}[0]);
    return this.http.post<ProductCart>(this._url, cartProduct);
  }

  public deleteCart(): Observable<ProductCart> {
    return this.http.delete<ProductCart>(this._url+'/6');
  }

  public updateQuantity(productId: number, quantity: number): Observable<ProductCart> {
    return this.http.put<ProductCart>(this._url+'/7', {
      userId: 3,
      date: new Date(),
      products: [{ productId: productId, quantity: quantity }],
    });
  }
}
