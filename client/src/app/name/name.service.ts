import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createName, RecievedName } from '../create-product/interfaces/name';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(private http: HttpClient) { }
  Url = 'http://localhost:3000/name';

  create(data: createName) {
    return this.http.post<RecievedName>(this.Url, data);
  }

  getName(id: string) {
    return this.http.get<RecievedName>(`${this.Url}/${id}`);
  }
}
