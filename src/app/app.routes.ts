import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./ecommerce/ecommerce.routes').then((m) => m.EcommerceRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [publicGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
