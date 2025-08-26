import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { FormProductComponent } from './products/form-product/form-product';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/new', component: FormProductComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: FormProductComponent, canActivate: [AuthGuard] }
];
