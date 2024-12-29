import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createBrand, RecievedBrand  } from '../create-product/interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }
  Url = 'http://localhost:3000/brand';

  create(brand:createBrand){
    return this.http.post<RecievedBrand>(this.Url, brand);
  }

  getBrand(id:string){
    return this.http.get<RecievedBrand>(`${this.Url}/${id}`);
  }
}
