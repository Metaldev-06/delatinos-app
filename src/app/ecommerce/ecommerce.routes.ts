import { Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';

export const EcommerceRoutes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.routes').then((m) => m.HomeRoutes),
      },
    ],
  },
];
