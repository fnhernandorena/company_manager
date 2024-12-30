import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './invite/invite.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EmployesComponent } from './employes/employes.component';
import { BuyerComponent } from './buyer/buyer.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'employes', component: EmployesComponent },
  {path: 'invite/:id', component: InviteComponent},
  {path: 'createProduct', component: CreateProductComponent},
  {path: 'buyers', component: BuyerComponent},
  {path: 'invoices', component: InvoiceComponent}
];
