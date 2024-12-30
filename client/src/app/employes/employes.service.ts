import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

private Url = 'http://localhost:3000/user'
  constructor( private http: HttpClient) { }

 getUsers(){
   return this.http.get(this.Url, {withCredentials: true});
 }
}

