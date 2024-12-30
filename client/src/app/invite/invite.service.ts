import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private Url = 'http://localhost:3000/invite';
  constructor(private http: HttpClient) { }
  
  createInvite(role: number): any {
    return this.http.post(this.Url, {role}, {withCredentials: true});
  }
}
