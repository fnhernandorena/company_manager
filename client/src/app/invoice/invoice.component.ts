import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/dto/product';
import { BuyerService } from '../buyer/buyer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoiceForm: FormGroup;
  buyerList: any = [];
  productsList: any[] = [];
  brands: Record<string, string> = {};
  names: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private buyerService: BuyerService,
  ) {
    this.invoiceForm = this.fb.group({
      buyer_id: new FormControl(''),
      description: new FormControl(''),
      products: this.fb.array([]),
    });
  }
  ngOnInit() {
    this.getProductList();
    this.getBuyerList();
    this.loadLocalData();
  }
  getProductList() {
    this.productsService.getProducts().subscribe(
      async (data: any) => {
        this.productsList = await Promise.all(
          data.map(async (product: Product) => ({
            ...product,
            brandText: await this.brands[product.brand_id],
            nameText: await this.names[product.name_id],
            description: product.description?.trim()
              ? product.description
              : 'Descripción no disponible',
          })),
        );
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      },
    );
  }

  getBuyerList() {
    this.buyerService.getBuyer().subscribe((data: any) => {
      this.buyerList = data;
    });
  }

  products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  addProduct() {
    const product = this.fb.group({
      product_id: new FormControl(''),
      quantity: new FormControl(''),
    });
    this.products().push(product);
  }

  removeProduct(i: number) {
    this.products().removeAt(i);
  }

  onSubmit() {
    const products = this.products().value; // Obtenemos los productos del formulario
  
    const isStockValid = products.every((product: any) => {
      const selectedProduct = this.productsList.find((p) => p.id === product.product_id);
      return selectedProduct && product.quantity <= selectedProduct.quantity;
    });
  
    if (!isStockValid) {
      alert('La cantidad solicitada supera el stock disponible para uno o más productos.');
      return;
    }
  
    console.log(this.invoiceForm.value);
  }

  loadLocalData() {
    const brandsArray = JSON.parse(localStorage.getItem('brands') || '[]');
    const namesArray = JSON.parse(localStorage.getItem('types') || '[]');

    this.brands = brandsArray.reduce(
      (acc: Record<string, string>, item: any) => {
        acc[item.id] = item.name;
        return acc;
      },
      {},
    );

    this.names = namesArray.reduce((acc: Record<string, string>, item: any) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
  }
}
