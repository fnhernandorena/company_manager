import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { DatePipe } from '@angular/common';
import { Product } from './dto/product';
import { BrandService } from '../brand/brand.service';
import { NameService } from '../name/name.service'; // Importa el servicio de nombres

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  brands: Record<string, string> = {};
  names: Record<string, string> = {};

  constructor(
    private productService: ProductsService,
    private datePipe: DatePipe,
    private brandService: BrandService,
    private nameService: NameService // Inyecta el servicio de nombres
  ) {}

  ngOnInit() {
    this.loadLocalData();
    this.getProducts();
  }

  loadLocalData() {
    const brandsArray = JSON.parse(localStorage.getItem('brands') || '[]');
    const namesArray = JSON.parse(localStorage.getItem('types') || '[]');

    this.brands = brandsArray.reduce((acc: Record<string, string>, item: any) => {
      acc[item.id] = item.name;
      return acc;
    }, {});

    this.names = namesArray.reduce((acc: Record<string, string>, item: any) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      async (data: any) => {
        this.products = await Promise.all(
          data.map(async (product: Product) => ({
            ...product,
            brandText: await this.getBrandName(product.brand_id),
            nameText: await this.getNameText(product.name_id),
            description: product.description?.trim() ? product.description : 'Descripción no disponible',
            createdAt: this.datePipe.transform(new Date(product.createdAt), 'dd/MM/yyyy HH:mm'),
            updatedAt: this.datePipe.transform(new Date(product.updatedAt), 'dd/MM/yyyy HH:mm'),
          }))
        );
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  async getBrandName(id: string): Promise<string> {
    if (this.brands[id]) {
      return this.brands[id];
    }

    try {
      const brand: any = await this.brandService.getBrand(id).toPromise();
      this.brands[id] = brand.name;
      this.saveBrandsToLocalStorage();
      return brand.name;
    } catch (error) {
      console.error('Error al obtener la marca:', error);
      return 'Unknown Brand';
    }
  }

  async getNameText(id: string): Promise<string> {
    if (this.names[id]) {
      return this.names[id];
    }

    try {
      const name: any = await this.nameService.getName(id).toPromise();
      this.names[id] = name.name;
      this.saveNamesToLocalStorage();
      return name.name;
    } catch (error) {
      console.error('Error al obtener el nombre:', error);
      return 'Unknown Name';
    }
  }

  saveBrandsToLocalStorage() {
    const brandsArray = Object.keys(this.brands).map((key) => ({
      id: key,
      name: this.brands[key],
    }));
    localStorage.setItem('brands', JSON.stringify(brandsArray));
  }

  saveNamesToLocalStorage() {
    const namesArray = Object.keys(this.names).map((key) => ({
      id: key,
      name: this.names[key],
    }));
    localStorage.setItem('types', JSON.stringify(namesArray));
  }
}
