import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./ecommerce/ecommerce.routes').then((m) => m.EcommerceRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
