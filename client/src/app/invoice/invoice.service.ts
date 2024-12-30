import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInvoiceDto } from './interfaces/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
Url='http://localhost:3000/invoice';
  constructor(private http: HttpClient) { }
  getInvoices(): any {
    return this.http.get(this.Url, {withCredentials: true});
  }

  createInvoice(invoice: CreateInvoiceDto): any {
    return this.http.post(this.Url, invoice, {withCredentials: true});
  }
}
