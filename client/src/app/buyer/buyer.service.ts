import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
Url='http://localhost:3000/buyer';
  constructor(private http: HttpClient) { }

  getBuyer(): any {
    return this.http.get(this.Url, {withCredentials: true});
  }
}
