import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './dto/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private Url = 'http://localhost:3000/product'
  constructor( private http: HttpClient) { }

  public create(product: Product[]){
    return this.http.post(this.Url, product,{withCredentials:true})  
  }

  public getProducts(){
    return this.http.get(this.Url, {withCredentials:true})
  }
}
