import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core'; 
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _url = 'https://fakestoreapi.com/products';
  public productTitle = new EventEmitter<String>();
  public editableProduct: Product;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url);
  }

  public getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(this._url+'/'+id);
  }

  public deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(this._url + '/' + id);
  }

  public editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this._url + '/' + product.id, product);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this._url, product);
  }

}
