import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { Invoice } from './interfaces/invoice';
import { BuyerService } from '../buyer/buyer.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup | undefined;
  invoices: Invoice[] = [];
  buyers = []; // Lista de compradores, deberías cargarla desde un servicio

  constructor(
    private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private buyerService: BuyerService
  ) {}

  ngOnInit() {
    this.getInvoices();
    this.getBuyers(); // Cargar compradores al inicio
    this.invoiceForm = this.fb.group({
      buyer_id: ['', Validators.required],
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      products: this.fb.array([this.createProduct()]),
    });
  }

  // Método para obtener las facturas
  getInvoices(): any {
    this.invoiceService.getInvoices().subscribe((data: any) => {
      this.invoices = data;
    });
  }

  // Método para obtener los compradores
  getBuyers(): void {
    this.buyerService.getBuyer().subscribe((data: any) => {
      this.buyers = data; // Asigna los compradores a la variable 'buyers'
    });
  }

  // Crear un formulario para cada producto
  createProduct(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // Método para agregar más productos al formulario
  addProduct(): void {
    if (this.invoiceForm) {
      (this.invoiceForm.get('products') as FormArray).push(this.createProduct());
    }
  }

  // Crear factura
  createInvoice(): void {
    if (this.invoiceForm?.valid) {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe((response: any) => {
        // Maneja la respuesta después de crear la factura
        console.log('Factura creada', response);
        this.getInvoices(); // Vuelve a cargar las facturas
      });
    }
  }
}
