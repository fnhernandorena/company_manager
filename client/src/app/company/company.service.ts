import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private Url = 'http://localhost:3000/company';
  constructor(private httpClient: HttpClient) { }

  getCompany(){
    return this.httpClient.get(this.Url, {withCredentials: true});
  }
}
