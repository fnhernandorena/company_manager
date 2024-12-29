import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private Url = 'http://localhost:3000/user' 
  constructor(private http: HttpClient) { }

  public register(user:any){
   return this.http.post(this.Url, user, {withCredentials:true})
  }
}
