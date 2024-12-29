import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private Url = 'http://localhost:3000/auth'
  constructor( private http: HttpClient) { }

  public login(user:any){
    return this.http.post(this.Url, user,{withCredentials:true})  
  }
}
