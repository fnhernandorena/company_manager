import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BrandService } from '../brand/brand.service';
import { NameService } from '../name/name.service';
import { RecievedBrand, StorageBrand } from './interfaces/brand';
import { Modal } from 'bootstrap';
import { RecievedName, StorageName } from './interfaces/name';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  stockForm: FormGroup;
  brandForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
  });
  typeForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
  });

  brands: StorageBrand[] = [];
  types: StorageName[] = [];

  constructor(private fb: FormBuilder, private brandService: BrandService, private nameService: NameService, private productService: ProductsService) {
    this.stockForm = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(0)]],
      magnitude: ['', [Validators.required]],
      brand_id: ['', [Validators.required]],
      name_id: ['', [Validators.required]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
    });

    this.loadBrands();
    this.loadTypes();
  }

  onSubmit() {
    if (this.stockForm.valid) {
      console.log('Form submitted:', this.stockForm.value);
      this.productService.create(this.stockForm.value).subscribe((response) => {
        console.log('Product created:', response);
      }, (error) => {
        console.error('Error creating product:', error);
      });
    }
  }

  loadBrands() {
    const storedBrands = JSON.parse(localStorage.getItem('brands') || '[]');
    this.brands = storedBrands;
  }

  loadTypes() {
    const storedTypes = JSON.parse(localStorage.getItem('types') || '[]');
    this.types = storedTypes;
  }

  createBrand() {
    const brand = this.brandForm.value.brand?.trim();
    if (brand) {
      const dto = { name: brand };
      this.brandService.create(dto).subscribe((data: RecievedBrand) => {
        const brandToStore: StorageBrand = { id: data.id, name: data.name };
        const storedBrands = JSON.parse(localStorage.getItem('brands') || '[]');
        const uniqueBrands = new Map([...storedBrands, brandToStore].map(item => [item.id, item]));
        this.brands = [...uniqueBrands.values()];
        localStorage.setItem('brands', JSON.stringify(this.brands));
        const modal = document.getElementById('exampleModalToggle');
        const modalInstance = Modal.getInstance(modal!);
        modalInstance?.hide();
        this.brandForm.reset();
      });
    }
  }

  createType() {
    const type = this.typeForm.value.type?.trim();
    if (type) {
      this.nameService.create({ name: type }).subscribe((data: RecievedName) => {
        const typeToStore : StorageName= { id: data.id, name: data.name };
        const storedTypes = JSON.parse(localStorage.getItem('types') || '[]'); 

        const uniqueTypes = new Map([...storedTypes, typeToStore].map(item => [item.id, item]));
        
        this.types = [...uniqueTypes.values()];
        localStorage.setItem('types', JSON.stringify(this.types));
  
        const modal = document.getElementById('exampleModalToggle2');
        const modalInstance = Modal.getInstance(modal!);
        modalInstance?.hide();
        this.typeForm.reset();
      });
    }
  }
  
}
