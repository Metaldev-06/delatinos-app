import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':category',
    component: ProductsComponent,
  },
  {
    path: ':category/:subcategory',
    component: ProductsComponent,
  },
];
