import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './invite/invite.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  {path: 'invite/:id', component: InviteComponent},
  {path: 'createProduct', component: CreateProductComponent}
];
